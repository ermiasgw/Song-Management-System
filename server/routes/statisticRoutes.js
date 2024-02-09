const express = require('express')
const router = express.Router()
const statisticsController = require('../controllers/statisticsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(statisticsController.generateReport)

router.route('/song_in_genre').get(statisticsController.noSongInGenere)
      
module.exports = router
