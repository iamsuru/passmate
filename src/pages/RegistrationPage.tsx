import { FormControl, Stack, useToast } from "@chakra-ui/react"
import { GoogleSSOBtn } from "../components/GoogleSSOBtn"
import { Identifier } from "../components/Identifier"
import { Password } from "../components/Password"
import { CustomButton } from "../components/Button"
import { Separater } from "../components/Separater"
import { ButtonName, Color, PlaceHolder, Variant } from "../utils/enums"
import { MdAlternateEmail, MdEmail } from 'react-icons/md'
import { useState } from "react"
import { registerUser } from "../services/authService"
import { TCreatedUser, TUserDetails } from "../utils/types"

export const RegistrationPage = () => {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUserCreation = async () => {
        setIsLoading(true)
        const userDetails: TUserDetails = {
            email,
            username,
            password
        }
        const response: TCreatedUser = await registerUser(userDetails)
        setIsLoading(false)
        if (response.code === 201) {
            toast({
                description: response.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        } else {
            toast({
                description: response.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
    }
    return (
        <FormControl>
            <Stack>
                <Identifier icon={MdEmail} placeHolder={PlaceHolder.EMAIL} onChange={(e) => setEmail(e.target.value)} />
                <Identifier icon={MdAlternateEmail} placeHolder={PlaceHolder.USERNAME} onChange={(e) => setUsername(e.target.value)} />
                <Password onChange={(e) => setPassword(e.target.value)} />
                <CustomButton buttonName={ButtonName.SIGN_UP_BUTTON} bgColor={Color.PURPLE_700} variant={Variant.SOLID} onClick={handleUserCreation} isLoading={isLoading} />
                <Separater />
                <GoogleSSOBtn buttonName={ButtonName.GOOGLE_SSO_BUTTON} bgColor={Color.PURPLE_700} variant={Variant.OUTLINE} onClick={handleUserCreation} isLoading={isLoading} />
            </Stack>
        </FormControl>
    )
}