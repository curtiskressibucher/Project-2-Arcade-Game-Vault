const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        platform: {
            type: String,
            required: true,
        },
        releaseYear: {
            type: Date,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Games', GameSchema);
