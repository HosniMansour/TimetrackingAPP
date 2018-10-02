const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskSchema = new Schema({
    'name': {
        type: String,
        required: true
    },
    'desc' : String,
    'startDate':Date,
    'endDate':Date,
    'duration':Number,
});

module.exports = mongoose.model('task', taskSchema);