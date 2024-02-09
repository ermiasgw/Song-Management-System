import { album } from "../../types/album";
import { SubmitHandler, useForm } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from "react-redux";
import { albumActions } from "../../store/album";
import { Box, Button, Heading } from "rebass";
import { useTheme } from "@emotion/react";


const schema = z.object({
    title: z.string().nonempty(),
  })

const AlbumPage = () => {
    const theme = useTheme()

    const dispatch = useDispatch()
    const {register, handleSubmit, formState: { errors }} = useForm<album>({
        resolver: zodResolver(schema)
      })
    const onSubmit: SubmitHandler<album> = (data) => {
        dispatch(albumActions.createAlbumrequest(data))
    }
    
    return (
        <Box p={20} width={"100%"} >
            <Heading mb={20}>Albums</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <label>title: </label>
                    <input {...register("title")} type="text"/>
                </Box>
                <Button m={3} ml={4} bg={theme.colors.primary} type="submit">Create</Button>
            </form>
        </Box>
        
      )
  };
  
  export default AlbumPage;
