import { Box, FormControl, Stack, useToast } from "@chakra-ui/react";
import { CustomButton } from "../components/Button";
import { Identifier } from "../components/Identifier";
import { ButtonName, Color, IdentiferIds, PlaceHolder, Variant } from "../utils/enums";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { AuthService } from "../services/authService";
import { TResponse } from "../utils/types";

export const ForgotPasswordPage = () => {
    const authService = new AuthService()

    const toast = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

    const sendResetPasswordLink = async () => {
        setIsLoading(true)
        const response: TResponse = await authService.forgotPasswordLink(email)
        if (response.code === 200) {
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
                newErrors[`${response?.type}ForgotPassword`] = true
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
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="80vh"
            width="100%"
            p={5}
        >
            <Box
                p={8}
                bg={Color.GRAY_800}
                boxShadow="md"
                borderRadius="md"
                maxW="sm"
                width="full"
            >
                <FormControl>
                    <Stack>
                        <Identifier id={IdentiferIds.EMAILFORGOTPASSWORD} icon={MdEmail} placeHolder={PlaceHolder.EMAIL} onChange={(e) => setEmail(e.target.value)} isError={errors['emailForgotPassword']} />
                        <CustomButton buttonName={ButtonName.PASSWORD_RESET_LINK} bgColor={Color.TEAL_800} variant={Variant.SOLID} onClick={sendResetPasswordLink} isLoading={isLoading} />
                    </Stack>
                </FormControl>
            </Box>
        </Box>
    )
};
