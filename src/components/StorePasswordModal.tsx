import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, useToast } from "@chakra-ui/react";
import { CustomButton } from "./Button";
import { ButtonName, Color, IdentiferIds, PlaceHolder, Variant } from "../utils/enums";
import { TStoreModalProps } from "../utils/types";
import { Identifier } from "./Identifier";
import { useState } from "react";
import { PasswordService } from "../services/passwordService";
import { Cookie } from "../cookies/cookie";

const passwordService = new PasswordService()
const cookie = new Cookie()

const StorePasswordModal = ({ isOpen, onClose }: TStoreModalProps) => {
    const toast = useToast();

    const [platformName, setPlatformName] = useState("")
    const [accountUsername, setAccountUsername] = useState("")
    const [accountPassword, setAccountPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

    const handleStorePassword = async () => {
        setIsLoading(true);
        const uid = cookie.getCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!).uid
        const passwordCredentials = { uid, platformName, accountUsername, accountPassword };
        const response: any = await passwordService.storePasswordCredentials(passwordCredentials)

        if (response.code === 201) {
            toast({
                description: response.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            //closing the modal
            onClose();
        } else {
            const newErrors: { [key: string]: boolean } = {};
            if (response?.code === 406) {
                newErrors[`${response?.type}`] = true
                setErrors(newErrors)
            }

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
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} closeOnEsc={false} >
            <ModalOverlay textAlign='center' backdropFilter="blur(8px)" />
            <ModalContent m={'2'} bgColor={Color.TEAL_800} alignSelf='center' alignItems='center'>

                <ModalHeader mx={'5'} color={Color.RED_500}>Store Password Credentials</ModalHeader>
                <ModalCloseButton ml={'5px'} bgColor={Color.PURPLE_700} />
                <ModalBody p={'5'} textAlign={'start'}>
                    <Stack>
                        <Identifier id={IdentiferIds.PLATFORM_NAME} placeHolder={PlaceHolder.PLATFORM_NAME} onChange={(e) => { setPlatformName(e.target.value) }} isError={errors[IdentiferIds.PLATFORM_NAME]} />
                        <Identifier id={IdentiferIds.ACCOUNT_USERNAME} placeHolder={PlaceHolder.ACCOUNT_USERNAME} onChange={(e) => { setAccountUsername(e.target.value) }} isError={errors[IdentiferIds.ACCOUNT_USERNAME]} />
                        <Identifier id={IdentiferIds.ACCOUNT_PASSWORD} placeHolder={PlaceHolder.ACCOUNT_PASSWORD} onChange={(e) => { setAccountPassword(e.target.value) }} isError={errors[IdentiferIds.ACCOUNT_PASSWORD]} />
                        <CustomButton buttonName={ButtonName.SAVE_PASSWORD} variant={Variant.SOLID} bgColor={Color.PURPLE_700} onClick={handleStorePassword} isLoading={isLoading} />
                    </Stack>
                </ModalBody>
            </ModalContent >
        </Modal >
    );
};

export default StorePasswordModal;
