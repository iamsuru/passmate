import { Box, FormControl, Stack, useToast } from "@chakra-ui/react";
import { CustomButton } from "../components/Button";
import { Password } from "../components/Password";
import { Identifier } from "../components/Identifier";
import { ButtonName, Color, IdentiferIds, PlaceHolder, RoutesUrl, Variant } from "../utils/enums";
import { useState } from "react";
import { TAuthenticateUser, TUserDetails } from "../utils/types";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { Cookie } from "../cookies/cookie";
import { AuthService } from "../services/authService";

export const LoginPage = () => {
    const authService = new AuthService()
    const cookie = new Cookie();
    const toast = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

    const handleLogin = async () => {
        setIsLoading(true);
        //setting all previous errors to empty if have
        setErrors({})
        const userDetails: TUserDetails = { email, password };

        const response: TAuthenticateUser = await authService.authenticateUser(userDetails);

        if (response.code === 200) {
            toast({
                description: response.message,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top'
            });

            cookie.setCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!, response.data)
            navigate(RoutesUrl.HOME_SCREEN);
        } else {
            const newErrors: { [key: string]: boolean } = {};
            if (response?.code === 406) {
                newErrors[`login-${response?.type}`] = true
                setErrors(newErrors)
            }

            toast({
                description: response.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
        }
        setIsLoading(false);
    };

    return (
        <FormControl>
            <Stack>
                <Identifier id={IdentiferIds.LOGIN_EMAIL} icon={MdEmail} placeHolder={PlaceHolder.EMAIL} onChange={(e) => setEmail(e.target.value)} isError={errors[IdentiferIds.LOGIN_EMAIL]} />
                <Password id={IdentiferIds.LOGIN_PASSWORD} onChange={(e) => setPassword(e.target.value)} isError={errors[IdentiferIds.LOGIN_PASSWORD]} />
                <CustomButton buttonName={ButtonName.LOGIN_BUTTON} bgColor={Color.TEAL_800} variant={Variant.SOLID} onClick={handleLogin} isLoading={isLoading} />
                {/* <GoogleSSOBtn buttonName={ButtonName.GOOGLE_SSO_BUTTON} bgColor={Color.TEAL_800} variant={Variant.OUTLINE} onClick={handleSSOLogin} isLoading={isLoading} /> */}
                <Box textAlign='right' color={Color.GRAY_300}>
                    <Link to={RoutesUrl.FORGOT_PASSWORD}>Forgot Password?</Link>
                </Box>
            </Stack>
        </FormControl>
    );
};
