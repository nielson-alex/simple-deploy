const mongoose = require('mongoose');

const workExperienceSchema = mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    start_mm: {
        type: String,
        required: true
    },
    start_mmmm: {
        type: String,
        required: true
    },
    start_yy: {
        type: Number,
        required: true
    },
    start_yyyy: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    responsibilities: {
        type: Array,
        required: true
    }
});

// module.exports = mongoose.model('Animal2', animalSchema);
module.exports = mongoose.model('Work-Experience', workExperienceSchema);