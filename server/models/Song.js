const mongoose = require('mongoose')

const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        album: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Album'
        },
        genere: {
            type: String,
            default: 'Country'
        }
    }
)

module.exports = mongoose.model('Song', songSchema)