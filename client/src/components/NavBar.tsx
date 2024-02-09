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
    <Flex flexDirection={"column"} width={200} bg={theme.colors.light} height={"100%"} p={20} py={100} alignItems={"center"} justifyContent={"space-between"} >
        <Flex flexDirection={"column"} width={"100%"} alignItems={"center"}>
            {links.map((link) =>(
                <Link href={link.href} p={10} >{link.title}</Link>
            ))}   
        </Flex>

        <Button bg={theme.colors.primary} onClick={() => dispatch(authActions.logoutrequest())}>logout</Button>
         
    </Flex>
  )
 };
  
  export default NavBar;