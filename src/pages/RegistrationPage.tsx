import { FormControl, Stack, useToast } from "@chakra-ui/react"
import { Identifier } from "../components/Identifier"
import { Password } from "../components/Password"
import { CustomButton } from "../components/Button"
import { ButtonName, Color, IdentiferIds, PlaceHolder, Variant } from "../utils/enums"
import { MdAlternateEmail, MdEmail } from 'react-icons/md'
import { useState } from "react"
import { registerUser } from "../services/authService"
import { TCreatedUser, TUserDetails } from "../utils/types"
import { useNavigate } from "react-router-dom"

export const RegistrationPage = () => {
    const toast = useToast()
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

    const handleUserCreation = async () => {
        setIsLoading(true)
        const userDetails: TUserDetails = {
            email,
            username,
            password
        }
        const response: TCreatedUser = await registerUser(userDetails)
        if (response.code === 201) {
            toast({
                description: response.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setTimeout(() => {
                navigate('/');
            }, 4000);
        } else {
            const newErrors: { [key: string]: boolean } = {};
            if (response?.code === 406) {
                newErrors[`${response?.type}Login`] = true
            }
            setErrors(newErrors)
            toast({
                description: response.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
        setIsLoading(false)
    }
    return (
        <FormControl>
            <Stack>
                <Identifier id={IdentiferIds.EMAILREGISTRATION} icon={MdEmail} placeHolder={PlaceHolder.EMAIL} onChange={(e) => setEmail(e.target.value)} isError={errors['emailRegistration']} />
                <Identifier id={IdentiferIds.USERNAMEREGISTRATION} icon={MdAlternateEmail} placeHolder={PlaceHolder.USERNAME} onChange={(e) => setUsername(e.target.value)} isError={errors['usernameRegistration']} />
                <Password id={IdentiferIds.PASSWORDREGISTRATION} onChange={(e) => setPassword(e.target.value)} isError={errors['passwordRegistration']} />
                <CustomButton buttonName={ButtonName.SIGN_UP_BUTTON} bgColor={Color.PURPLE_700} variant={Variant.SOLID} onClick={handleUserCreation} isLoading={isLoading} />
                {/* <GoogleSSOBtn buttonName={ButtonName.GOOGLE_SSO_BUTTON} bgColor={Color.PURPLE_700} variant={Variant.OUTLINE} onClick={handleUserCreation} isLoading={isLoading} /> */}
            </Stack>
        </FormControl>
    )
}