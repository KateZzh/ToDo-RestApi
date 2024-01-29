const { createTaskDB, getTaskDB, getTaskByIdDB, updateTaskDB, deleteTaskDB } = require('../repository/repository');

async function createTask(task) {
  return await createTaskDB(task);
}

async function getTask() {
  return await getTaskDB();
}

async function getTaskById(_id) {
  return await getTaskByIdDB(_id);
}

async function updateTask(_id, task) {
  return await updateTaskDB(_id, task);
}

async function deleteTask(_id) {
  return await deleteTaskDB(_id);
}

module.exports = { createTask, getTask, getTaskById, updateTask, deleteTask };
