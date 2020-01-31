const express = require("express");
const router = express.Router();
const multer = require("multer");
const multipart = multer().any();
const fs = require("fs");
const Customer = require("./models/customer");
const redis = require("./controller/redis");

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

router.post("/customer", (req, res, next) => {
  const data = req.body;
  Customer(data).save();
  redis.cacheCustomerDataPost(data);
  res.send("Done");
});

router.get("/customer/:name", async (req, res, next) => {
  const { name } = req.params;
  let result;
  result = await redis.cacheCustomerDataGet({ name });
  if (result) {
    console.log("From Redis");
    return res.send(JSON.parse(result));
  }
  result = await Customer.findOne({ name });
  console.log("From DB");
  res.send(result);
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
