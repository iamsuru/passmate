import { useEffect, useState } from "react";
import { Password } from "../components/Password"
import { ButtonName, Color, IdentiferIds, RoutesUrl, Variant } from "../utils/enums"
import { CustomButton } from "../components/Button";
import { Box, Input, useToast } from "@chakra-ui/react";
import { AuthService } from "../services/authService";
import { TResponse } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { Cookie } from "../cookies/cookie";

export const CreatePassmatePassword = () => {
    const cookie = new Cookie();
    const toast = useToast()
    const navigate = useNavigate()

    const [password, setPassword] = useState("");
    const [userEmail, setUserEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

    useEffect(() => {
        const userTempData = cookie.getCookie(process.env.REACT_APP_USER_AUTH_TEMP_SECRET_KEY!);
        const userEmail = userTempData?.email
        setUserEmail(userEmail)
        // eslint-disable-next-line
    }, [navigate])

    const handlePasswordCreation = async () => {
        setIsLoading(true);
        try {
            const response: TResponse = await new AuthService().createPassmatePassword(password);
            if (response.code === 201) {
                toast({
                    description: response.message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                })
                const tempData = cookie.getCookie(process.env.REACT_APP_USER_AUTH_TEMP_SECRET_KEY!)
                cookie.setCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!, tempData)
                cookie.clearCookie(process.env.REACT_APP_USER_AUTH_TEMP_SECRET_KEY!)
                navigate(RoutesUrl.HOME_SCREEN)
            } else {
                const newErrors: { [key: string]: boolean } = {};
                if (response?.code === 406) {
                    newErrors[`login-${response?.type}`] = true
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
        } catch (error: any) {
            toast({
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
        }
        setIsLoading(false)
    }
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="80vh"
            width="100%"
            p={4}
        >
            <Box
                p={8}
                bg={Color.GRAY_800}
                boxShadow="md"
                borderRadius="md"
                maxW="sm"
                width="full"
            >
                <Input value={userEmail} isReadOnly bg={Color.GRAY_600} mb='5' />
                <Password id={IdentiferIds.LOGIN_PASSWORD} onChange={(e) => setPassword(e.target.value)} isError={errors[IdentiferIds.LOGIN_PASSWORD]} />
                <CustomButton buttonName={ButtonName.CREATE_PASSWORD} bgColor={Color.TEAL_800} variant={Variant.SOLID} onClick={handlePasswordCreation} isLoading={isLoading} />
            </Box>
        </Box >
    )
}