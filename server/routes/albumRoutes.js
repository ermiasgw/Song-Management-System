const express = require('express')
const router = express.Router()
const albumController = require('../controllers/albumController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(albumController.getAlbums)
    .post(albumController.createAlbum)
    
module.exports = router