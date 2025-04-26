const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    isDeleted: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        unique: true
    },
    user: {
        type: String
    },
    class: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String
    },
    inserted_at: {
        type: Date
    },
    modified_at: {
        type: Date
    }
});


module.exports = mongoose.model('Listener', Schema);