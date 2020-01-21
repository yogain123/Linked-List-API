const Nodes = require("../models/nodes");

async function saveData(data) {
  let nodes = new Nodes(data);
  await nodes.save();
}

async function findDataById(id) {
  let data = await Nodes.findById(id);
  return data;
}

async function findDataByIdAndUpdate(id, data) {
  await Nodes.findByIdAndUpdate(id, data);
}

module.exports = { saveData, findDataById, findDataByIdAndUpdate };
