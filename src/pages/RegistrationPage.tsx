import { FormControl, Stack, useToast } from "@chakra-ui/react"
import { Identifier } from "../components/Identifier"
import { Password } from "../components/Password"
import { CustomButton } from "../components/Button"
import { ButtonName, Color, IdentiferIds, PlaceHolder, RoutesUrl, Variant } from "../utils/enums"
import { MdEmail } from 'react-icons/md'
import { TAuthenticateUser, TResponse, TUserDetails } from "../utils/types"
import { AuthService } from "../services/authService"
import { useState } from "react"
import { GoogleSSOBtn } from "../components/GoogleSSOBtn"
import { Separater } from "../components/Separater"
import { Cookie } from "../cookies/cookie"
import { useNavigate } from "react-router-dom"

export const RegistrationPage = ({ onRegistrationSuccess }: { onRegistrationSuccess: () => void }) => {
    const authService = new AuthService()
    const cookie = new Cookie();

    const toast = useToast()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isSSOLoading, setIsSSOLoading] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

    const handleUserCreation = async () => {
        setIsLoading(true)
        //setting all previous errors to empty if have
        setErrors({})
        const userDetails: TUserDetails = {
            email,
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

    const handleSSOLogin = async () => {
        setIsSSOLoading(true);
        const response: TAuthenticateUser = await authService.authenticateUserWithSSO();
        if (response.code === 200) {
            toast({
                description: response.message,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            //setting temporary cookie
            if (!response.data.isNewUser) {
                cookie.setCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!, response.data);
                navigate(RoutesUrl.HOME_SCREEN)
            } else {
                cookie.setCookie(process.env.REACT_APP_USER_AUTH_TEMP_SECRET_KEY!, response.data, true);
                navigate(RoutesUrl.CREATE_PASSMATE_PASSWORD);
            }
        } else if (response.code === 404) {
            toast({
                description: response.message,
                status: "info",
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            cookie.setCookie(process.env.REACT_APP_USER_AUTH_TEMP_SECRET_KEY!, response.data, true);
            navigate(RoutesUrl.CREATE_PASSMATE_PASSWORD);
        }
        else {
            toast({
                description: response.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        }
        setIsSSOLoading(false);
    };

    return (
        <FormControl>
            <Stack>
                <Identifier id={IdentiferIds.REGISTRATION_EMAIL} icon={MdEmail} placeHolder={PlaceHolder.EMAIL} onChange={(e) => setEmail(e.target.value)} isError={errors[IdentiferIds.REGISTRATION_EMAIL]} />
                <Password id={IdentiferIds.REGISTRATION_PASSWORD} onChange={(e) => setPassword(e.target.value)} isError={errors[IdentiferIds.REGISTRATION_PASSWORD]} />
                <CustomButton buttonName={ButtonName.SIGN_UP_BUTTON} bgColor={Color.PURPLE_700} variant={Variant.SOLID} onClick={handleUserCreation} isLoading={isLoading} />
                <Separater />
                <GoogleSSOBtn buttonName={ButtonName.GOOGLE_SSO_BUTTON} bgColor={Color.PURPLE_700} variant={Variant.OUTLINE} onClick={handleSSOLogin} isLoading={isSSOLoading} />
            </Stack>
        </FormControl>
    )
}