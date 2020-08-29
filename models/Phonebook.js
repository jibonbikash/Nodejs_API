const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PhonebookSchema = new Schema({
        name: {
            type: String,
            required: true,
            min: 3,
            max: 255,
            trim: true
        },
        mobile: {
            type: String,
            required: true,
            min: 11,
            max: 14,
            unique: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Phonebook', PhonebookSchema);