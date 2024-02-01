require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB);

const Table = mongoose.model('tasks', {
  title: String,
  description: String,
});

const ObjectId = mongoose.Types.ObjectId;

module.exports = { Table, ObjectId };
