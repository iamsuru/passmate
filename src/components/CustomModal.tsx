import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Box, useToast } from "@chakra-ui/react";
import { CustomButton } from "./Button";
import { ButtonName, Color, IdentiferIds, ModalType, PlaceHolder, Variant } from "../utils/enums";
import { Password } from "./Password";
import { TCustomModalProps, TUserDetails } from "../utils/types";
import { useEffect, useState } from "react";
import { Cookie } from "../cookies/cookie";
import { AuthService } from "../services/authService";
import { decrypt } from "../utils/crypto";

const CustomModal = ({ isOpen, onClose, title, username, password, modalType }: TCustomModalProps) => {
    const cookie = new Cookie()
    const authService = new AuthService()

    const toast = useToast()

    const [isLoading, setIsLoading] = useState(false);
    const [modalTypeValue, setModalTypeValue] = useState(modalType);
    const [givenPassword, setGivenPassword] = useState("")
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

    useEffect(() => {
        //ensuring that everytime users needs to enter password
        setGivenPassword("")
        if (!isOpen) {
            setModalTypeValue(ModalType.VERIFICATION);
        } else {
            setModalTypeValue(modalType);
        }
    }, [isOpen, modalType]);

    const verifyGivenPassword = async () => {
        setIsLoading(true)
        //setting all previous errors to empty if have
        setErrors({})
        const email: string = cookie.getCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!).email
        const userDetails: TUserDetails = { email, password: givenPassword };

        const response = await authService.verifyUserPassword(userDetails)

        if (response.code === 200) {
            setModalTypeValue(ModalType.PASSWORD);
        } else {
            const newErrors: { [key: string]: boolean } = {};
            if (response?.code === 406) {
                newErrors[`validate-${response?.type}`] = true
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
    };

    const decryptPassword = (password: string): string => {
        const decryptedPassword = decrypt(password)
        return decryptedPassword
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} closeOnEsc={false}>
            <ModalOverlay textAlign="center" backdropFilter="blur(8px)" />
            <ModalContent m={"2"} bgColor={Color.TEAL_800} alignSelf="center" alignItems="center">
                <ModalHeader mx={"5"} color={Color.RED_500}>
                    {modalTypeValue === ModalType.VERIFICATION ? "Verify yourself" : "Password"}
                </ModalHeader>
                <ModalCloseButton ml={"5px"} bgColor={Color.PURPLE_700} />
                <ModalBody p={"5"} textAlign={"start"}>
                    {modalTypeValue === ModalType.VERIFICATION ? (
                        <>
                            <Text mb={"4"}>
                                {title} : {username}
                            </Text>
                            <Password id={IdentiferIds.VALIDATE_PASSWORD} fieldText={PlaceHolder.PASSWORD_FIELD_TEXT} onChange={(e) => setGivenPassword(e.target.value)} isError={errors[IdentiferIds.VALIDATE_PASSWORD]} />
                            <Box as="div" mb={"5"}></Box>
                            <CustomButton
                                buttonName={ButtonName.VERIFY_BUTTON}
                                variant={Variant.SOLID}
                                bgColor={Color.PURPLE_700}
                                onClick={verifyGivenPassword}
                                isLoading={isLoading}
                            />
                        </>
                    ) : (
                        <Box
                            px={4}
                            py={2}
                            borderRadius="md"
                            bg={Color.TEAL_800}
                            boxShadow="sm"
                            border="1px solid"
                            borderColor={Color.GRAY_800}
                            w="full"
                            textAlign="center"
                        >
                            <Text fontSize="md" fontWeight="medium" color={Color.WHITE}>
                                {decryptPassword(password)}
                            </Text>
                        </Box>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;
