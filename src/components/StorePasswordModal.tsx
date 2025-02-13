import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, useToast } from "@chakra-ui/react";
import { CustomButton } from "./Button";
import { ButtonName, Color, IdentiferIds, PlaceHolder, Variant } from "../utils/enums";
import { TStoreModalProps } from "../utils/types";
import { Identifier } from "./Identifier";
import { useState } from "react";
import { PasswordService } from "../services/passwordService";
const passwordService = new PasswordService()

const StorePasswordModal = ({ isOpen, onClose }: TStoreModalProps) => {
    const toast = useToast();

    const [appName, setAppName] = useState("")
    const [appUsername, setAppUsername] = useState("")
    const [appPassword, setAppPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

    const handleStorePassword = async () => {
        setIsLoading(true);
        const data = { appName, appUsername, appPassword };

        const response: any = await passwordService.storePassword(data)

        if (response.code === 200) {
            toast({
                description: response.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
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
        //closing the modal
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} closeOnEsc={false} >
            <ModalOverlay textAlign='center' backdropFilter="blur(8px)" />
            <ModalContent m={'2'} bgColor={Color.TEAL_800} alignSelf='center' alignItems='center'>

                <ModalHeader mx={'5'} color={Color.RED_500}>Store Password</ModalHeader>
                <ModalCloseButton ml={'5px'} bgColor={Color.PURPLE_700} />
                <ModalBody p={'5'} textAlign={'start'}>
                    <Stack>
                        <Identifier id={IdentiferIds.APPNAME} placeHolder={PlaceHolder.APP_NAME} onChange={(e) => { setAppName(e.target.value) }} isError={errors[IdentiferIds.APPNAME]} />
                        <Identifier id={IdentiferIds.APPUSERNAME} placeHolder={PlaceHolder.APP_USERNAME} onChange={(e) => { setAppUsername(e.target.value) }} isError={errors[IdentiferIds.APPUSERNAME]} />
                        <Identifier id={IdentiferIds.APPPASSWORD} placeHolder={PlaceHolder.APP_PASSWORD} onChange={(e) => { setAppPassword(e.target.value) }} isError={errors[IdentiferIds.APPPASSWORD]} />
                        <CustomButton buttonName={ButtonName.SAVE_PASSWORD} variant={Variant.SOLID} bgColor={Color.PURPLE_700} onClick={handleStorePassword} isLoading={isLoading} />
                    </Stack>
                </ModalBody>
            </ModalContent >
        </Modal >
    );
};

export default StorePasswordModal;
