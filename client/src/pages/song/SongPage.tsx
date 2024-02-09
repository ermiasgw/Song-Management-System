import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user";
import { RootState } from "../../store";
import { albumActions } from "../../store/album";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { song, songwithuser } from "../../types/song";
import { songActions } from "../../store/song";

const genres = [
    "Pop",
    "Rock",
    "Hip Hop",
    "R&B",
    "Country",
    "Jazz",
    "Electronic",
    "Classical",
    "Folk",
    "Reggae",
  ]

const schema = z.object({
    _id: z.string().optional(),
    user: z.string().nonempty(),
    title: z.string().nonempty(),
    album: z.string().nonempty(),
    genere: z.string().nonempty()
})

const SongPage = () => {
    const dispatch = useDispatch()

    const {register, handleSubmit, setValue, formState: { errors }} = useForm<song>({
        resolver: zodResolver(schema)
      })
    const onSubmit: SubmitHandler<song> = (data) => {
        dispatch(songActions.createSongRequest(data))
    }
    useEffect(() => {
        dispatch(userActions.getusersrequest())
        dispatch(albumActions.getAlbumsRequest())
        dispatch(songActions.getSongRequest())
    }, [])

    const handleEdit = (song: songwithuser) => {
        setValue('_id', song._id)
        setValue('title', song.title)
        setValue('user', song.user)
        setValue('album', song.album)
        setValue('genere', song.genere)
    }

    const handleDelete = (_id: string) => {
        dispatch(songActions.deleteSongRequest({_id: _id}))
    }

    const users = useSelector((state: RootState) => state.userReducer.items)
    const albums = useSelector((state: RootState) => state.albumReducer.items)
    const songs = useSelector((state: RootState) => state.songReducer.items)

    return (
      <div>
        <h1>songs</h1>
        <form onSubmit={handleSubmit(onSubmit)} id="form">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" {...register('title')}  />

            <label htmlFor="user">Artist</label>
            <select {...register('user')}>
                <option value={""}></option>
                {users.map((user) => (
                    <option value={user._id}>{user.username}</option>
                ))}
            </select>
            <label htmlFor="album">Album</label>
            <select {...register('album')}>
                <option value={""}></option>
                {albums.map((album) => (
                    <option value={album._id}>{album.title}</option>
                ))}
            </select>
            
            <label htmlFor="genere">Genre</label>
            <select {...register('genere')} >
                {genres.map((genere) => (
                    <option value={genere}>{genere}</option>
                ))}
            </select>
            
            <button type="submit">submit</button>
        </form>

        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Genre</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {songs.map((song) => (
                    <tr>
                        <td>{song.title}</td>
                        <td>{song.username}</td>
                        <td>{song.album_title}</td>
                        <td>{song.genere}</td>
                        <td><a href="#form" onClick={() => handleEdit(song)}>edit</a></td>
                        <td><button onClick={() => handleDelete(song._id)}>delete</button></td>
                    </tr>
                ))}
                
            </tbody>
        </table>
      </div>
    )
  };
  
export default SongPage;