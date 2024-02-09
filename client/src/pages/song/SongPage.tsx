import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user";
import { RootState } from "../../store";
import { albumActions } from "../../store/album";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { song, songwithuser } from "../../types/song";
import { songActions } from "../../store/song";
import { useTheme } from "@emotion/react";
import { Box, Button, Heading } from "rebass";

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
    const theme = useTheme()
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
    const error = useSelector((state: RootState) => state.errorReducer.songError);
    

    return (
      <Box p={20} width={"100%"}>
        <Heading>songs</Heading>
        <form onSubmit={handleSubmit(onSubmit)} id="form">
            <Box p={2}>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" {...register('title')}  />
            </Box>
            
            <Box p={2}>
                <label htmlFor="user">Artist: </label>
                <select {...register('user')}>
                    <option value={""}></option>
                    {users.map((user) => (
                        <option value={user._id}>{user.username}</option>
                    ))}
                </select>
            </Box>
            

            <Box p={2}>
                <label htmlFor="album">Album: </label>
                <select {...register('album')}>
                    <option value={""}></option>
                    {albums.map((album) => (
                        <option value={album._id}>{album.title}</option>
                    ))}
                </select>
            </Box>
            
            <Box p={2}>
                <label htmlFor="genere">Genre: </label>
                <select {...register('genere')} >
                    {genres.map((genere) => (
                        <option value={genere}>{genere}</option>
                    ))}
                </select>
            </Box>
            
            {error && <Box color={theme.colors.danger}><p>{error}</p></Box>}
            
            <Button bg={theme.colors.primary} ml={4} type="submit">submit</Button>
        </form>

        <Box p={20} mt={20}>
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
                            <td><Button color={theme.colors.danger} onClick={() => handleDelete(song._id)}>delete</Button></td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>

        </Box>
      </Box>
    )
  };
  
export default SongPage;