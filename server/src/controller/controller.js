const express = require('express');
const buildResponse = require('../helper/buildResponse');
const { createTask, getTask, getTaskById, updateTask, deleteTask } = require('../service/service');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    buildResponse(res, 200, await createTask(req.body));
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    buildResponse(res, 200, await getTask());
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

router.get('/:_id', async (req, res) => {
  try {
    buildResponse(res, 200, await getTaskById(req.params._id));
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

router.put('/:_id', async (req, res) => {
  try {
    buildResponse(res, 200, await updateTask(req.params._id, req.body));
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

router.delete('/:_id', async (req, res) => {
  try {
    buildResponse(res, 200, await deleteTask(req.params._id));
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

module.exports = router;
