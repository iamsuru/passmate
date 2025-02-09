import { Box, FormControl, Stack, Text, useToast } from "@chakra-ui/react";
import { CustomButton } from "../components/Button";
import { Password } from "../components/Password";
import { Identifier } from "../components/Identifier";
import { ButtonName, Color, IdentiferIds, PlaceHolder, Variant } from "../utils/enums";
import { useState } from "react";
import { TUserDetails } from "../utils/types";
import { authenticateUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";

export const LoginPage = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

    const handleLogin = async () => {
        setIsLoading(true);
        const userDetails: TUserDetails = { email, password };

        const response = await authenticateUser(userDetails);

        if (response.code === 200) {
            toast({
                description: response.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setTimeout(() => {
                navigate('/passmate/home-screen');
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
        setIsLoading(false);
    };

    return (
        <FormControl>
            <Stack>
                <Identifier id={IdentiferIds.EMAILLOGIN} icon={MdEmail} placeHolder={PlaceHolder.EMAIL} onChange={(e) => setEmail(e.target.value)} isError={errors['emailLogin']} />
                <Password id={IdentiferIds.PASSWORDLOGIN} onChange={(e) => setPassword(e.target.value)} isError={errors['passwordLogin']} />
                <CustomButton buttonName={ButtonName.LOGIN_BUTTON} bgColor={Color.TEAL_800} variant={Variant.SOLID} onClick={handleLogin} isLoading={isLoading} />
                <Box display="flex" alignItems="center" my='6px'>
                    <Box flex="1" borderBottom="1px solid gray" />
                    <Text mx={4}>OR</Text>
                    <Box flex="1" borderBottom="1px solid gray" />
                </Box>
                {/* <GoogleSSOBtn buttonName={ButtonName.GOOGLE_SSO_BUTTON} bgColor={Color.TEAL_800} variant={Variant.OUTLINE} onClick={handleSSOLogin} isLoading={isLoading} /> */}
            </Stack>
        </FormControl>
    );
};
