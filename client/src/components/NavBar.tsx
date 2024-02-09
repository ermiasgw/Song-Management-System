import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { Button, Flex, Link } from "rebass";
import { useTheme } from "@emotion/react";




const NavBar = () => {
    const theme = useTheme()

    const dispatch = useDispatch();

    const links = [
        {
            title: "Songs",
            href: "/",
        },
        {
            title: "Albums",
            href: "/albums"
        },
        {
            title: "statistics",
            href: "/statistics"
        }
    ]
  return (
    <Flex flexDirection={"column"} width={100} bg={"red"} height={"100%"} p={10} >
        {links.map((link) =>(
            <Link href={link.href}>{link.title}</Link>
         ))}

        <Button onClick={() => dispatch(authActions.logoutrequest())}>logout</Button>
         
    </Flex>
  )
 };
  
  export default NavBar;