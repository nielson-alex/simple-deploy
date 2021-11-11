// const fs = require('fs');
// const path = require('path');
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    species: {
        type: String,
        required: false
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// module.exports = mongoose.model('Animal2', animalSchema);
module.exports = mongoose.model('Animal3', animalSchema);