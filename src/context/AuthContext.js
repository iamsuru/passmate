import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../helpers/token.helper";
import { ResponseMessage } from "../utils/enums";
import { signOut } from "../services/authService";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [token, setToken] = useState("")

    const navigate = useNavigate()
    const toast = useToast();

    useEffect(() => {
        const validateToken = async (token) => {
            try {
                if (!isTokenExpired(token)) {
                    navigate('/home-screen')
                } else {
                    await signOut();
                    toast({
                        description: ResponseMessage.SESSION_HAS_EXPIRED,
                        status: "error",
                        duration: 4000,
                        isClosable: true,
                        position: 'bottom'
                    });
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                }
            } catch (error) {
                console.log(error)
            }
        }

        const currentUser = localStorage.getItem(process.env.REACT_APP_LS_USERDATA_KEY);
        const parsedUser = currentUser ? JSON.parse(currentUser) : null;

        const { token, ...restUserDetails } = parsedUser
        setToken(token)
        setUser(restUserDetails)

        if (token) validateToken(token)

        if (!user && window.location.pathname === '/home-screen') {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [navigate])

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthState = () => { return useContext(AuthContext) }
export default AuthProvider