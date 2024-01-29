const { Table, ObjectId } = require('../db');

async function createTaskDB(task) {
  return await Table.create(task);
}

async function getTaskDB() {
  return await Table.find();
}

async function getTaskByIdDB(_id) {
  return await Table.find({ _id: new ObjectId(_id) });
}

async function updateTaskDB(_id, task) {
  return await Table.updateOne({ _id: new ObjectId(_id) }, { $set: task });
}

async function deleteTaskDB(_id) {
  return await Table.deleteOne({ _id: new ObjectId(_id) });
}

module.exports = { createTaskDB, getTaskDB, getTaskByIdDB, updateTaskDB, deleteTaskDB };
