import { FormControl, Stack, useToast } from "@chakra-ui/react"
import { Identifier } from "../components/Identifier"
import { Password } from "../components/Password"
import { CustomButton } from "../components/Button"
import { ButtonName, Color, IdentiferIds, PlaceHolder, Variant } from "../utils/enums"
import { MdAlternateEmail, MdEmail } from 'react-icons/md'
import { TResponse, TUserDetails } from "../utils/types"
import { AuthService } from "../services/authService"
import { useState } from "react"

export const RegistrationPage = ({ onRegistrationSuccess }: { onRegistrationSuccess: () => void }) => {
    const authService = new AuthService()

    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

    const handleUserCreation = async () => {
        setIsLoading(true)
        //setting all previous errors to empty if have
        setErrors({})
        const userDetails: TUserDetails = {
            email,
            username,
            password
        }
        const response: TResponse = await authService.registerUser(userDetails)
        if (response.code === 201) {
            toast({
                description: response.message,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            onRegistrationSuccess();
        } else {
            const newErrors: { [key: string]: boolean } = {};
            if (response?.code === 406) {
                newErrors[`registration-${response?.type}`] = true
            }
            setErrors(newErrors)
            toast({
                description: response.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
        }
        setIsLoading(false)
    }
    return (
        <FormControl>
            <Stack>
                <Identifier id={IdentiferIds.REGISTRATION_EMAIL} icon={MdEmail} placeHolder={PlaceHolder.EMAIL} onChange={(e) => setEmail(e.target.value)} isError={errors[IdentiferIds.REGISTRATION_EMAIL]} />
                <Identifier id={IdentiferIds.REGISTRATION_USERNAME} icon={MdAlternateEmail} placeHolder={PlaceHolder.USERNAME} onChange={(e) => setUsername(e.target.value)} isError={errors[IdentiferIds.REGISTRATION_USERNAME]} />
                <Password id={IdentiferIds.REGISTRATION_PASSWORD} onChange={(e) => setPassword(e.target.value)} isError={errors[IdentiferIds.REGISTRATION_PASSWORD]} />
                <CustomButton buttonName={ButtonName.SIGN_UP_BUTTON} bgColor={Color.PURPLE_700} variant={Variant.SOLID} onClick={handleUserCreation} isLoading={isLoading} />
                {/* <GoogleSSOBtn buttonName={ButtonName.GOOGLE_SSO_BUTTON} bgColor={Color.PURPLE_700} variant={Variant.OUTLINE} onClick={handleUserCreation} isLoading={isLoading} /> */}
            </Stack>
        </FormControl>
    )
}