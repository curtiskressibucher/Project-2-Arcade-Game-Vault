const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipsSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        userName: String,
        userAvatar: String,
        game: {
            type: Schema.Types.ObjectId,
            ref: 'Game',
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
        },
        comments: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
                text: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Tip', tipsSchema);
