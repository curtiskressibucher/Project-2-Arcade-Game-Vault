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
            enum: [
                'fps',
                'rpg',
                'adventure',
                'simulation',
                'strategy',
                'sports',
                'fighting',
                'platformers',
                'survival_horror',
                'stealth',
                'interactive_movie',
                'puzzlers_party',
                'social_deduction',
                'educational',
                'augmented_reality',
            ],
        },
        platform: {
            type: String,
            enum: [
                'PC',
                'PlayStation',
                'Xbox',
                'Nintendo Switch',
                'Mobile',
                'Virtual Reality',
            ],
        },
        releaseYear: {
            type: Date,
            required: true,
        },
        image: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review',
            },
        ],
        tips: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Tip',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Game', GameSchema);
