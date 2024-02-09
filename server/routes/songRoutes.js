const express = require('express')
const router = express.Router()
const songController = require('../controllers/songController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/:id')
    .delete(songController.deleteSong)

router.route('/')
    .get(songController.getAllsongs)
    .post(songController.createNewSong)
    .patch(songController.updateSong)
    

module.exports = router