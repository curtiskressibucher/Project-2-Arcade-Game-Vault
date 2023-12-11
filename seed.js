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
                genre: 'Action',
                platform: 'PS2',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-160-1556729296-IDis-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'Armored Core V',
                genre: 'Action',
                platform: 'Xbox 360',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-161-1556729296-nkeW-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'Star Wars: Knights Of The Old Republic',
                genre: 'Action',
                platform: 'Xbox 360',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-162-1556729297-3Scs-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'Quake III Arena ',
                genre: 'Action',
                platform: 'Xbox 360',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-164-1556729298-1RTV-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'DOOM',
                genre: 'Action',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-166-1556729299-wujx-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'Street Fighter IV',
                genre: 'Action',
                platform: 'Xbox 360',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-167-1556729300-1edW-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'Dead Space',
                genre: 'Action',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-174-1556729304-UWYO-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'Left 4 Dead',
                genre: 'Action',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-175-1556729305-1VXz-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'Mortal Kombat',
                genre: 'Action',
                platform: 'Arcade',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-177-1556729306-x7Mk-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'Metal Gear Solid ',
                genre: 'Action',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-180-1556729308-zd3g-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'Halo 4',
                genre: 'Action',
                platform: 'Xbox 360',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-186-1556729312-ZIaP-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'Diablo III',
                genre: 'Action',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-188-1556729313-h0mJ-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'BioShock',
                genre: 'Action',
                platform: 'PC',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-190-1556729314-9YOC-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'Skyrim',
                genre: 'Action',
                platform: 'xbox 360',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-192-1556729315-57Jg-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'Shadow Of The Colossus',
                genre: 'Action',
                platform: 'xbox 360',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-193-1556729316-l7pq-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'Super Mario Galaxy 2',
                genre: 'Action',
                platform: 'Wii',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-197-1556729318-Hi3y-column-width-inline.jpg',
                user: existingUser._id,
            },
            {
                title: 'Borderlands ',
                genre: 'Action',
                platform: 'Xbox',
                releaseYear: new Date('2002-01-01'),
                image: 'https://www.shortlist.com/media/images/2019/05/50-greatest-video-game-covers-197-1556729318-Hi3y-column-width-inline.jpg',
                user: existingUser._id,
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

seed();

// deleteAllGames();
