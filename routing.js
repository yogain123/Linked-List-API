const express = require("express");
const router = express.Router();

const Nodes = require("./models/nodes");

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
}

router.post("/link", async function(req, res, next) {
  let reqData = req.body;
  let node = new Node(reqData);
  let ll = new LinkedList();
  ll.head = node;
  let _id = Date.now();
  let result = { _id, object: JSON.stringify(ll) };
  let nodes = new Nodes(result);
  await nodes.save(nodes);
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

function prepareObjectForClient(ll) {
  let temp = ll.head;
  let result = [];
  let id = 1;
  while (temp != null) {
    temp.data.id = id;
    id++;
    result.push(temp.data);
    temp = temp.next;
  }

  result = result.map(item => {
    item.next = item.id + 1;
    if (item.id == result.length) {
      item.next = null;
    }
    return item;
  });

  return result;
}

router.get("/link/:id", async function(req, res, next) {
  //Get LinkedList for that Id from Database, and then parse it
  let id = req.params.id;
  let data = await Nodes.findById(id);
  let meta = { id: data._id };
  let ll = JSON.parse(data.object);
  let object = prepareObjectForClient(ll);
  meta.length = object.length;
  res.send({ meta, object });
});

router.get("/link/pop/:id", async function(req, res, next) {
  //pop api
  let id = req.params.id;
  let reqData = req.body;
  let data = await Nodes.findById(id);
  let meta = { id: data._id };
  let ll = JSON.parse(data.object);
  llObject = deleteLast(ll);
  await Nodes.findByIdAndUpdate(id, { object: JSON.stringify(llObject.ll) });
  res.send(llObject.result);
});

router.post("/link/:id", async function(req, res, next) {
  let id = req.params.id;
  let reqData = req.body;
  let data = await Nodes.findById(id);
  let meta = { id: data._id };
  let ll = JSON.parse(data.object);
  ll = insertLast(reqData, ll);
  await Nodes.findByIdAndUpdate(id, { object: JSON.stringify(ll) });

  let object = prepareObjectForClient(ll);
  meta.length = object.length;

  res.send({ meta, object });
});

function insertLast(data, ll) {
  let temp = ll.head;
  while (temp.next != null) {
    temp = temp.next;
  }
  temp.next = new Node(data);
  return ll;
}

function deleteLast(ll) {
  let temp = ll.head;
  while (temp && temp.next && temp.next.next != null) {
    temp = temp.next;
  }
  let result = temp.next.data;
  temp.next = null;
  return { result, ll };
}

function getSize(nodetoOperate) {
  let count = 0;
  while (nodetoOperate.head != null) {
    count++;
    nodetoOperate.head = nodetoOperate.head.next;
  }
  return count;
}

module.exports = router;
