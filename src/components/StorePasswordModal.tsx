import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, useToast } from "@chakra-ui/react";
import { CustomButton } from "./Button";
import { ButtonName, Color, ErrorMessage, IdentiferIds, PlaceHolder, Variant } from "../utils/enums";
import { TResponse, TStoreModalProps, TUpdateVaultEntry, TUserDetails } from "../utils/types";
import { Identifier } from "./Identifier";
import { useEffect, useState } from "react";
import { PasswordService } from "../services/passwordService";
import { Cookie } from "../cookies/cookie";
import { eventBus } from "../utils/eventBus";
import { Password } from "./Password";
import { AuthService } from "../services/authService";

const passwordService = new PasswordService()
const cookie = new Cookie()

const StorePasswordModal = ({ id, flag, isOpen, onClose }: TStoreModalProps) => {
    const toast = useToast();

    const [givenPassword, setGivenPassword] = useState("")
    const [platformName, setPlatformName] = useState("")
    const [accountUsername, setAccountUsername] = useState("")
    const [accountPassword, setAccountPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

    useEffect(() => {
        setGivenPassword("")
    }, [])

    const handleStorePassword = async () => {
        setIsLoading(true);
        //setting all previous errors to empty if have
        setErrors({})
        const uid = cookie.getCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!).uid
        const passwordCredentials = { uid, platformName, accountUsername, accountPassword };
        const response: TResponse = await passwordService.storeVaultCredentials(passwordCredentials)

        if (response.code === 201) {
            toast({
                description: response.message,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
            eventBus.emit("refresh")
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
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
        }
        setIsLoading(false);
    };

    const handleUpdateVaultCredentials = async () => {
        setIsLoading(true);
        //setting all previous errors to empty if have
        setErrors({})
        const uid = cookie.getCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!)?.uid;

        let updateVaultCredentials: TUpdateVaultEntry = { id: id!, uid };

        if (accountUsername) updateVaultCredentials.accountUsername = accountUsername;
        else if (accountPassword) updateVaultCredentials.accountPassword = accountPassword;

        //validating that either accountUsername or accountPassowrd will be sent to service
        if (!updateVaultCredentials.accountUsername && !updateVaultCredentials.accountPassword) {
            toast({
                description: ErrorMessage.FIELD_CAN_NOT_BE_EMPTY,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
            setIsLoading(false);
            return;
        }

        const isValidAuth = await verifyGivenPassword(givenPassword)

        if (!isValidAuth) return

        const response: TResponse = await passwordService.updateVaultCredentials(updateVaultCredentials);

        if (response.code === 200) {
            toast({
                description: response.message,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
            eventBus.emit("refresh")
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
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
        }
        setIsLoading(false);
    };

    const verifyGivenPassword = async (password: string) => {
        setIsLoading(true)
        //setting all previous errors to empty if have
        setErrors({})
        const email: string = cookie.getCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!).email
        const userDetails: TUserDetails = { email, password };

        const response = await new AuthService().authenticateUser(userDetails)

        if (response.code === 200) {
            return true;
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
        return false;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} closeOnEsc={false} >
            <ModalOverlay textAlign='center' backdropFilter="blur(8px)" />
            <ModalContent m={'2'} bgColor={Color.TEAL_800} alignSelf='center' alignItems='center'>

                <ModalHeader mx={'5'} color={Color.RED_500}>Store Password Credentials</ModalHeader>
                <ModalCloseButton ml={'5px'} bgColor={Color.PURPLE_700} />
                <ModalBody p={'5'} textAlign={'start'}>
                    <Stack>
                        {(flag === true || flag === IdentiferIds.PLATFORM_NAME) && (
                            <Identifier
                                id={IdentiferIds.PLATFORM_NAME}
                                placeHolder={PlaceHolder.PLATFORM_NAME}
                                onChange={(e) => setPlatformName(e.target.value)}
                                isError={errors[IdentiferIds.PLATFORM_NAME]}
                            />
                        )}

                        {(flag === true || flag === IdentiferIds.ACCOUNT_USERNAME) && (
                            <Identifier
                                id={IdentiferIds.ACCOUNT_USERNAME}
                                placeHolder={PlaceHolder.ACCOUNT_USERNAME}
                                onChange={(e) => setAccountUsername(e.target.value)}
                                isError={errors[IdentiferIds.ACCOUNT_USERNAME]}
                            />
                        )}

                        {(flag === true || flag === IdentiferIds.ACCOUNT_PASSWORD) && (
                            <Identifier
                                id={IdentiferIds.ACCOUNT_PASSWORD}
                                placeHolder={PlaceHolder.ACCOUNT_PASSWORD}
                                onChange={(e) => setAccountPassword(e.target.value)}
                                isError={errors[IdentiferIds.ACCOUNT_PASSWORD]}
                            />
                        )}

                        {typeof flag === 'string' &&
                            <Password id={IdentiferIds.VALIDATE_PASSWORD} fieldText={PlaceHolder.PASSWORD_FIELD_TEXT} onChange={(e) => setGivenPassword(e.target.value)} isError={errors[IdentiferIds.VALIDATE_PASSWORD]} />
                        }

                        <CustomButton
                            buttonName={flag === true ? ButtonName.SAVE_PASSWORD : ButtonName.UPDATE}
                            variant={Variant.SOLID}
                            bgColor={Color.PURPLE_700}
                            onClick={flag === true ? handleStorePassword : handleUpdateVaultCredentials}
                            isLoading={isLoading}
                        />
                    </Stack>
                </ModalBody>
            </ModalContent >
        </Modal >
    );
};

export default StorePasswordModal;
