const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
    {},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Reviews', ReviewSchema);
