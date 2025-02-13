import { Box, Button, Heading, Menu, MenuButton, MenuList, MenuItem, useToast } from "@chakra-ui/react";
import "../styles/navbar.css";
import { Color } from "../utils/enums";
import { BsThreeDotsVertical } from "react-icons/bs";
import { signOut } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate()
    const toast = useToast()

    const handleSignOut = async () => {
        const response = await signOut(process.env.REACT_APP_USER_AUTH_SECRET_KEY!)
        if (response.code === 200) {
            navigate('/')
        } else {
            toast({
                description: response.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            padding="5px 10px"
        >
            <Heading color={Color.TEAL_600} className="nav-name">
                PassMate
            </Heading>

            <Menu>
                <MenuButton as={Button} variant="ghost">
                    <BsThreeDotsVertical />
                </MenuButton>
                <MenuList>
                    <MenuItem>Search password</MenuItem>
                    <MenuItem>Add password</MenuItem>
                    <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
};
