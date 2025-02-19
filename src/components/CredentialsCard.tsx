import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure, useToast } from "@chakra-ui/react";
import CustomModal from "./CustomModal";
import { Color, IdentiferIds, ModalType } from "../utils/enums";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FocusableElement, TCredentialsCard } from "../utils/types";
import { BsThreeDotsVertical } from "react-icons/bs";
import StorePasswordModal from "./StorePasswordModal";
import { PasswordService } from "../services/passwordService";
import { Cookie } from "../cookies/cookie";
import { eventBus } from "../utils/eventBus";

export const CredentialsCard = ({ id, platformName, accountUsername, accountPassword }: TCredentialsCard) => {
    const toast = useToast();

    //for confirming deletion
    const { isOpen: alertDialogIsOpen, onOpen: alertDialogOnOpen, onClose: alertDialogOnClose } = useDisclosure()
    const cancelRef = React.useRef<HTMLButtonElement>(null);

    //for password showing
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [show, setShow] = useState(false)
    const [modalTypeValue, setModalTypeValue] = useState(ModalType.VERIFICATION)

    //for store password modal
    const [passwordShowModal, setPasswordShowModal] = useState(false)
    const { isOpen: isStorePasswordModal, onOpen: onOpenStorePasswordModal, onClose: onCloseStorePasswordModal } = useDisclosure();
    const [identifierId, setIdentifierId] = useState("")

    const handleClick = () => {
        setShow(!show)
        onOpen()
    }

    const handleModalClose = () => {
        setModalTypeValue(ModalType.VERIFICATION)
        setShow(false);
        onClose();
    };

    const handleStorePasswordModal = () => {
        setPasswordShowModal(!passwordShowModal)
        onOpenStorePasswordModal()
    }

    const [credentialToDelete, setCredentialToDelete] = useState<string | null>(null);

    // Function to confirm deletion
    const confirmDelete = (id: string) => {
        setCredentialToDelete(id);
        alertDialogOnOpen();
    };

    const handleDeleteVaultCredentials = async () => {
        if (!credentialToDelete) return;

        const uid = await new Cookie().getCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!)?.uid;
        const deleteObject = { id: credentialToDelete, uid };

        const response = await new PasswordService().deleteVaultCredentials(deleteObject);

        if (response.code === 200) {
            toast({
                description: response.message,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
            eventBus.emit("refresh");
        } else {
            toast({
                description: response.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
        }
        // Close the alert and reset ID
        setCredentialToDelete(null);
        alertDialogOnClose();
    };

    return (
        <>
            <Box
                mx="1"
                p="3"
                bg="rgba(0, 128, 128, 0.14)"
                textAlign="center"
                borderRadius="sm"
                borderWidth="1px"
                borderColor="gray"
            >
                <Flex justify="space-between" align="center">
                    <Text fontWeight="bold">{platformName}</Text>
                    <Flex align="center">
                        <Text fontWeight="bold" color={Color.GRAY_600}>
                            {accountUsername}
                        </Text>
                        {!show ? (
                            <ViewOffIcon _hover={{ cursor: 'pointer' }} ms={'3'} onClick={handleClick} />
                        ) : (
                            <ViewIcon _hover={{ cursor: 'pointer' }} ms={'3'} onClick={handleClick} />
                        )}
                        <Menu>
                            <MenuButton ml='2'>
                                <BsThreeDotsVertical />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => { setIdentifierId(IdentiferIds.ACCOUNT_USERNAME); handleStorePasswordModal() }}>Update username</MenuItem>
                                <MenuItem onClick={() => { setIdentifierId(IdentiferIds.ACCOUNT_PASSWORD); handleStorePasswordModal() }}>Update password</MenuItem>
                                <MenuItem onClick={() => { confirmDelete(id!) }}>Delete credentials</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Box>

            <CustomModal
                isOpen={isOpen}
                onClose={handleModalClose}
                title={platformName}
                username={accountUsername}
                password={accountPassword}
                modalType={modalTypeValue}
            />

            <StorePasswordModal
                id={id}
                isOpen={isStorePasswordModal}
                onClose={onCloseStorePasswordModal}
                flag={identifierId}
            />

            <AlertDialog
                isOpen={alertDialogIsOpen}
                leastDestructiveRef={cancelRef as React.RefObject<FocusableElement>}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogBody>
                            Are you sure you want to delete?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={alertDialogOnClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleDeleteVaultCredentials} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};
