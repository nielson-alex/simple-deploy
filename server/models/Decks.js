const mongoose = require('mongoose');

const deckSchema = mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    deck_name: {
        type: String,
        required: true
    },
    cards: {
        type: [{
            deck_name: {
                type: String,
                required: true
            },
            english: {
                type: String,
                required: false
            },
            chinese: {
                type: String,
                required: true
            },
            pinyin: {
                type: String,
                required: false
            },
            number: {
                type: Number,
                required: true
            }
        }],
        required: true
    },
});

module.exports = mongoose.model('Deck', deckSchema);