import { SubmitHandler, useForm } from "react-hook-form";
import { user } from "../../types/user";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from "react-redux";
import { RootState, authActions } from "../../store";
import { useSelector } from "react-redux";
import { Box, Button, Flex, Link } from "rebass";
import { useTheme } from "@emotion/react";

const schema = z.object({
  username: z.string().nonempty(),
  password: z.string().min(8),
})


const LoginPage = () => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const {register, handleSubmit, formState: {errors}} = useForm<user>({
      resolver: zodResolver(schema)
    })
    
    const onSubmit: SubmitHandler<user> = (data) => {
      dispatch(authActions.loginrequest(data))
    }

    return (
      <Box width={"fit-content"} height={"100%"} margin={"auto"} mt={100}  p={50} bg={theme.colors.light}>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <label>username: </label>
          <input {...register("username")} type="text"/>
          <p>{errors.username?.message}</p>

          <label>password: </label>
          <input {...register("password")} type="password"/>
          <p>{errors.password?.message}</p>
          <p>{useSelector((state: RootState) => state.authReducer?.loginerror)}</p>

          <Button bg={theme.colors.primary} type="submit">Login</Button>
      
        </form>
        <Link href="/register">or Register</Link>
      </Box>
    )
  };

  
export default LoginPage;

