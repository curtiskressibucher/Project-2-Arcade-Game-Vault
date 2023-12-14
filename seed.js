const mongoose = require('mongoose');
require('dotenv').config();
require('./config/database');

const User = require('./models/user');
const Game = require('./models/game');

async function deleteAllGames() {
    try {
        // Delete all documents in the games collection
        const result = await Game.deleteMany({});

        console.log(`Deleted ${result.deletedCount} games from the database.`);
    } catch (error) {
        console.error('Error deleting games:', error);
    } finally {
        mongoose.connection.close();
    }
}

async function seed() {
    try {
        const existingUser = await User.findOne({
            googleId: '103931172876620279348',
        });

        if (!existingUser) {
            console.error('User not found');
            return;
        }
        const gamesData = [
            {
                title: 'Grand Theft Auto: Vice City',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-160-1556729296-IDis-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'Armored Core V',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-161-1556729296-nkeW-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'Star Wars: Knights Of The Old Republic',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-162-1556729297-3Scs-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'Quake III Arena ',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-164-1556729298-1RTV-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'DOOM',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-166-1556729299-wujx-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'Street Fighter IV',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-167-1556729300-1edW-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'Dead Space',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-174-1556729304-UWYO-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'Left 4 Dead',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-175-1556729305-1VXz-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'Mortal Kombat',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-177-1556729306-x7Mk-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'Metal Gear Solid ',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-180-1556729308-zd3g-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'Halo 4',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-186-1556729312-ZIaP-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'Diablo III',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-188-1556729313-h0mJ-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'BioShock',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-190-1556729314-9YOC-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'Skyrim',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-192-1556729315-57Jg-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'Shadow Of The Colossus',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-193-1556729316-l7pq-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'Super Mario Galaxy 2',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-197-1556729318-Hi3y-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
            {
                title: 'Borderlands ',
                genre: 'fps',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-197-1556729318-Hi3y-column-width-inline.jpg',
                user: existingUser._id,
                reviews: [],
            },
        ];
        const games = await Game.insertMany(gamesData);

        console.log('Seed data inserted successfully:', {
            existingUser,
            games,
        });
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close();
    }
}

// seed();

// deleteAllGames();
