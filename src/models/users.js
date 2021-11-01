const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);