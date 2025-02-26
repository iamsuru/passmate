import { Box, Button, Heading, Menu, MenuButton, MenuList, MenuItem, useToast, useDisclosure } from "@chakra-ui/react";
import "../styles/navbar.css";
import { Color, RoutesUrl, Variant } from "../utils/enums";
import { TbMenu2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Cookie } from "../cookies/cookie"
import { useEffect, useState } from "react";
import StorePasswordModal from "../components/StorePasswordModal";
import { AuthService } from "../services/authService";
import { TResponse } from "../utils/types";

export const NavBar = () => {
    const cookie = new Cookie()
    const authService = new AuthService()

    const navigate = useNavigate()
    const toast = useToast()
    const [userData, setUserData] = useState(null)

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [show, setShow] = useState(false)
    const handleModalClick = () => {
        setShow(!show)
        onOpen()
    }

    const handleModalClose = () => {
        setShow(false);
        onClose();
    };

    useEffect(() => {
        //only getting email for now as it is not needed to get all data
        setUserData(cookie.getCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!)?.email || "")
        // eslint-disable-next-line
    }, [navigate])

    const handleSignOut = async () => {
        const response: TResponse = await authService.signOut(process.env.REACT_APP_USER_AUTH_SECRET_KEY!)
        if (response.code === 200) {
            navigate(RoutesUrl.HOME_PAGE)
        } else {
            toast({
                description: response.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
        }
    }
    return (
        <>
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

                {
                    userData &&
                    <Menu>
                        <MenuButton as={Button} variant={Variant.GHOST} >
                            <TbMenu2 />
                        </MenuButton>
                        <MenuList>
                            <MenuItem isDisabled>User: {userData}</MenuItem>
                            <MenuItem onClick={handleModalClick}>Add vault entry</MenuItem>
                            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                }
            </Box>

            <StorePasswordModal
                isOpen={isOpen}
                onClose={handleModalClose}
                flag={true}
            />
        </>
    );
};
