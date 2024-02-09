const Album = require("../models/Album")
const Song = require("../models/Song")
const User = require("../models/User")

const generateReport = async (req, res) => {

    no_users = await User.countDocuments()
    no_albums = await Album.countDocuments()
    no_songs = await Song.countDocuments()
    
    generes = await Song.distinct("genere")
    no_generes = generes.length

    generes = await Song.aggregate([
        {
          $group: {
            _id: '$genere', 
            count: { $sum: 1 } 
          }
        }
      ])

      no_song_in_each_generes = []
      generes.forEach(genere => {
          no_song_in_each_generes.push({
              count: genere.count,
              genere: genere._id
          })
      })

    artists = await Song.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'artistInfo'
          }
        },
        {
          $unwind: '$artistInfo'
        },
        {
          $group: {
            _id: '$artistInfo.username', 
            count: { $sum: 1 } 
          }
        }
      ])

    no_song_in_each_artist = []
    artists.forEach(artist => {
        no_song_in_each_artist.push({
            count: artist.count,
            artist: artist._id
        })
    })

    albumsWithArtist = await Song.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'artistInfo'
          }
        },
        {
            $unwind: '$artistInfo'
        },
        {
            $lookup: {
              from: 'albums',
              localField: 'album',
              foreignField: '_id',
              as: 'albumInfo'
            }
        },
        {
          $group: {
            _id: '$artistInfo.username', 
            count: { $sum: {$size: "$albumInfo"} } 
          }
        }
      ])

      no_album_in_each_artist = []
      albumsWithArtist.forEach(artist => {
          no_album_in_each_artist.push({
              count: artist.count,
              artist: artist._id
          })
      })


      albums = await Song.aggregate([
        {
          $lookup: {
            from: 'albums',
            localField: 'album',
            foreignField: '_id',
            as: 'albumInfo'
          }
        },
        {
          $unwind: '$albumInfo'
        },
        {
          $group: {
            _id: '$albumInfo.title', 
            count: { $sum: 1 } 
          }
        }
      ])

    no_song_in_each_album = []
    albums.forEach(album => {
        no_song_in_each_album.push({
            count: album.count,
            album: album._id
        })
    })

    statistics = {
        no_users: no_users,
        no_albums: no_albums,
        no_songs: no_songs,
        no_generes: no_generes,
        no_song_in_each_artist: no_song_in_each_artist,
        no_song_in_each_generes: no_song_in_each_generes,
        no_album_in_each_artist: no_album_in_each_artist,
        no_song_in_each_album: no_song_in_each_album
    }


    res.json(statistics)
}

const noSongInGenere = async (req, res) => {

    no_song_in_each_generes = []
    generes.forEach(genere => {
        no_song_in_each_generes.push({
            count: Song.countDocuments({ genere: genere }),
            genere: genere
        })
    })

    
    res.json(no_song_in_each_generes)
}


module.exports = {
    generateReport,
    noSongInGenere,
}