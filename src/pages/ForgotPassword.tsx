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
        //setting all previous errors to empty if have
        setErrors({})
        const response: TResponse = await authService.forgotPasswordLink(email)
        if (response.code === 200) {
            toast({
                description: response.message,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            navigate('/');
        } else {
            const newErrors: { [key: string]: boolean } = {};
            if (response?.code === 406) {
                newErrors[`forgot-password-${response?.type}`] = true
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
                        <Identifier id={IdentiferIds.FORGOT_PASSWORD_EMAIL} icon={MdEmail} placeHolder={PlaceHolder.EMAIL} onChange={(e) => setEmail(e.target.value)} isError={errors[IdentiferIds.FORGOT_PASSWORD_EMAIL]} />
                        <CustomButton buttonName={ButtonName.PASSWORD_RESET_LINK} bgColor={Color.TEAL_800} variant={Variant.SOLID} onClick={sendResetPasswordLink} isLoading={isLoading} />
                    </Stack>
                </FormControl>
            </Box>
        </Box>
    )
};
