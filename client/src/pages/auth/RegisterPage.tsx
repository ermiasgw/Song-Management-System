import { SubmitHandler, useForm } from "react-hook-form";
import { user } from "../../types/user";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux";
import { RootState, authActions } from "../../store";
import { UseSelector } from "react-redux";
import { Box, Button, Link } from "rebass";
import { useTheme } from "@emotion/react";


const schema = z.object({
  username: z.string().nonempty(),
  password: z.string().min(8),
})

const RegisterPage = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const {register, handleSubmit, formState: {errors}} = useForm<user>({
    resolver: zodResolver(schema)
  })
  
  const onSubmit: SubmitHandler<user> = (data) => {
    dispatch(authActions.registerrequest(data))
  }

  return (
    <Box  paddingY={200} >
        <Box width={"fit-content"} height={"100%"} margin={"auto"}  p={50} bg={theme.colors.secondary}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>username</label>
            <input {...register("username")} type="text"/>
            <p>{errors.username?.message}</p>
            <label>password</label>
            <input {...register("password")} type="password"/>
            <p>{errors.password?.message}</p>
            <p>{useSelector((state: RootState) => state.authReducer?.registrationerror)}</p>
            <Button bg={theme.colors.primary} type="submit">Register</Button>
          </form>
          <Link href="/signin">or Login</Link>
        </Box>
      </Box>
  )
  };
  
  export default RegisterPage;