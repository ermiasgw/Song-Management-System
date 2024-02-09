const Album = require("../models/Album")

const createAlbum = async (req, res) => {
    const { title } = req.body

    if (!title) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicate = await Album.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate title' })
    }


    const albumObject = {title}

    const album = await Album.create(albumObject)

    if (album) { 
        res.status(201).json({ message: `New album ${title} created` })
    } else {
        res.status(400).json({ message: 'Invalid album data received' })
    }
}


const getAlbums = async (req, res) => {
    const albums = await Album.find().select('-password').lean()

    if (!albums?.length) {
        return res.status(400).json({ message: 'No albums found' })
    }

    res.json(albums)
}


module.exports = {
    createAlbum,
    getAlbums,
}