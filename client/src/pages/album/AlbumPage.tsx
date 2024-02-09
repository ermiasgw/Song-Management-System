import { album } from "../../types/album";
import { SubmitHandler, useForm } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from "react-redux";
import { albumActions } from "../../store/album";


const schema = z.object({
    title: z.string().nonempty(),
  })

const AlbumPage = () => {
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: { errors }} = useForm<album>({
        resolver: zodResolver(schema)
      })
    const onSubmit: SubmitHandler<album> = (data) => {
        dispatch(albumActions.createAlbumrequest(data))
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label>title</label>
                <input {...register("title")} type="text"/>

                <button type="submit">create</button>
            </form>
        </div>
        
      )
  };
  
  export default AlbumPage;
