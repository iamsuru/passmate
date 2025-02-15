import { Box, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from "@chakra-ui/react";
import CustomModal from "./CustomModal";
import { Color, ModalType } from "../utils/enums";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { TCredentialsCard } from "../utils/types";
import { BsThreeDotsVertical } from "react-icons/bs";

export const CredentialsCard = ({ platformName, accountUsername, accountPassword }: TCredentialsCard) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [show, setShow] = useState(false)
    const [modalTypeValue, setModalTypeValue] = useState(ModalType.VERIFICATION)
    const handleClick = () => {
        setShow(!show)
        onOpen()
    }

    const handleModalClose = () => {
        setModalTypeValue(ModalType.VERIFICATION)
        setShow(false);
        onClose();
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
                                <MenuItem>Update username</MenuItem>
                                <MenuItem>Update password</MenuItem>
                                <MenuItem>Delete credentials</MenuItem>
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
        </>
    );
};
