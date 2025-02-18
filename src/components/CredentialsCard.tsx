import { Box, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure, useToast } from "@chakra-ui/react";
import CustomModal from "./CustomModal";
import { Color, IdentiferIds, ModalType } from "../utils/enums";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { TCredentialsCard } from "../utils/types";
import { BsThreeDotsVertical } from "react-icons/bs";
import StorePasswordModal from "./StorePasswordModal";
import { PasswordService } from "../services/passwordService";
import { Cookie } from "../cookies/cookie";
import { eventBus } from "../utils/eventBus";

export const CredentialsCard = ({ id, platformName, accountUsername, accountPassword }: TCredentialsCard) => {
    const toast = useToast();

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

    const handleDeleteVaultCredentials = async (id: string) => {
        const uid = await new Cookie().getCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!)?.uid;
        const deleteObject = { id, uid }

        const response = await new PasswordService().deleteVaultCredentials(deleteObject);

        if (response.code === 200) {
            toast({
                description: response.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            eventBus.emit("refresh")
            //closing the modal
            onClose();
        } else {
            toast({
                description: response.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }

    }

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
                                <MenuItem onClick={() => { handleDeleteVaultCredentials(id!) }}>Delete credentials</MenuItem>
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
        </>
    );
};
