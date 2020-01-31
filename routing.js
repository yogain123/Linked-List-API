const express = require("express");
const router = express.Router();
const multer = require("multer");
const multipart = multer().any();
const fs = require("fs");

const {
  Node,
  LinkedList,
  prepareObjectForClient,
  insertLast,
  deleteLast
} = require("./services");

const {
  saveData,
  findDataById,
  findDataByIdAndUpdate
} = require("./controller");

const Photo = require("./models/photo");

router.post("/post/photo", multipart, async (req, res, next) => {
  try {
    let buffer = req.files[0].buffer;
    fs.writeFileSync("lol.jpg", buffer);
    let photo = new Photo({ image: buffer });
    await photo.save();
    res.send("done");
  } catch (error) {
    console.log(error);
  }
});

router.get("/get/photo", multipart, async (req, res, next) => {
  let data = await Photo.findById("5e346689f1eb3c7bb9b43cbb");
  fs.writeFileSync("image.jpg", data.image);
  res.send(data.image);
});

router.post("/link", async function(req, res, next) {
  let reqData = req.body;
  let node = new Node(reqData);
  let ll = new LinkedList();
  ll.head = node;
  let _id = Date.now();
  let result = { _id, object: JSON.stringify(ll) };
  await saveData(result);
  let object = [
    {
      id: 1,
      ...ll.head.data,
      next: 2
    }
  ];
  let meta = { id: _id, length: 0 };
  res.send({ meta, object });
});

router.get("/link/:id", async function(req, res, next) {
  let id = req.params.id;
  let data = await findDataById(id);
  let meta = { id: data._id };
  let ll = JSON.parse(data.object);
  let object = prepareObjectForClient(ll);
  meta.length = object.length;
  res.send({ meta, object });
});

router.get("/link/pop/:id", async function(req, res, next) {
  //pop api
  let id = req.params.id;
  let data = await findDataById(id);
  let ll = JSON.parse(data.object);
  llObject = deleteLast(ll);
  await findDataByIdAndUpdate(id, { object: JSON.stringify(llObject.ll) });
  res.send(llObject.result);
});

router.post("/link/:id", async function(req, res, next) {
  let id = req.params.id;
  let reqData = req.body;
  let data = await findDataById(id);
  let meta = { id: data._id };
  let ll = JSON.parse(data.object);
  ll = insertLast(reqData, ll);
  await findDataByIdAndUpdate(id, { object: JSON.stringify(ll) });

  let object = prepareObjectForClient(ll);
  meta.length = object.length;

  res.send({ meta, object });
});

module.exports = router;
