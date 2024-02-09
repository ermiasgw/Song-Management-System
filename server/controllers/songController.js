const Album = require('../models/Album')
const Song = require('../models/Song')
const User = require('../models/User')


const getAllsongs = async (req, res) => {
    const songs = await Song.find().lean()

    const songsWithUser = await Promise.all(songs.map(async (song) => {
        const user = await User.findById(song.user).lean().exec()
        return { ...song, username: user.username }
    }))

    const songsWithAlbum = await Promise.all(songsWithUser.map(async (song) => {
        const album = await Album.findById(song.album).lean().exec()
        return { ...song, album_title: album.title }
    }))
    

    res.json(songsWithAlbum)
}


const createNewSong = async (req, res) => {
    const { user, title, album, genere } = req.body

    if (!user || !title || !album || !genere) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicate = await Song.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate title' })
    }

    const song = await Song.create({ user, title, album, genere })

    if (song) {  
        return res.status(201).json({ message: 'New song created' })
    } else {
        return res.status(400).json({ message: 'Invalid song data received' })
    }

}

const updateSong = async (req, res) => {
    const { _id, user, title, album, genere } = req.body

    if (!_id || !user || !title || !album || !genere) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const song = await Song.findById(_id).exec()

    if (!song) {
        return res.status(400).json({ message: 'song not found' })
    }


    song.user = user
    song.title = title
    song.album = album
    song.genere = genere

    const updatedsong = await song.save()

    res.json(`'${updatedsong.title}' updated`)
}


const deleteSong = async (req, res) => {
    const _id = req.params.id
    console.log(_id)

    if (!_id) {
        return res.status(400).json({ message: 'Song ID required' })
    }

    const song = await Song.findById(_id).exec()

    if (!song) {
        return res.status(400).json({ message: 'Song not found' })
    }

    const result = await song.deleteOne()

    const reply = `Song '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllsongs,
    createNewSong,
    updateSong,
    deleteSong
}