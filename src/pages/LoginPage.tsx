import { Box, FormControl, Stack, Text, useToast } from "@chakra-ui/react"
import { GoogleSSOBtn } from "../components/GoogleSSOBtn"
import { CustomButton } from "../components/Button"
import { Password } from "../components/Password"
import { Identifier } from "../components/Identifier"
import { ButtonName, Color, PlaceHolder, Variant } from "../utils/enums"
import { useState } from "react"
import { TUserDetails } from "../utils/types"
import { authenticateUser } from "../services/authService"
import { useNavigate } from "react-router-dom"
import { MdEmail } from "react-icons/md"

export const LoginPage = () => {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        setIsLoading(true)
        const userDetails: TUserDetails = {
            email,
            password
        }

        const response = await authenticateUser(userDetails)
        setIsLoading(false)
        if (response.code === 200) {
            toast({
                description: response.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setTimeout(() => {
                navigate('/passmate/home-screen')
            }, 4000)
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
        <FormControl>
            <Stack>
                <Identifier icon={MdEmail} placeHolder={PlaceHolder.EMAIL} onChange={(e) => setEmail(e.target.value)} />
                <Password onChange={(e) => setPassword(e.target.value)} />
                <CustomButton buttonName={ButtonName.LOGIN_BUTTON} bgColor={Color.TEAL_800} variant={Variant.SOLID} onClick={handleLogin} isLoading={isLoading} />
                <Box display="flex" alignItems="center" my='6px'>
                    <Box flex="1" borderBottom="1px solid gray" />
                    <Text mx={4}>OR</Text>
                    <Box flex="1" borderBottom="1px solid gray" />
                </Box>
                <GoogleSSOBtn buttonName={ButtonName.GOOGLE_SSO_BUTTON} bgColor={Color.TEAL_800} variant={Variant.OUTLINE} onClick={handleLogin} isLoading={isLoading} />
            </Stack>
        </FormControl>
    )
}