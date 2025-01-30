import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Box } from "@chakra-ui/react";
import { CustomButton } from "./Button";
import { ButtonName, Color, ModalType, Variant } from "../utils/enums";
import { Password } from "./Password";
import { TCustomModalProps } from "../utils/types";

const CustomModal = ({ isOpen, onClose, title, username, password, modalType }: TCustomModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} closeOnEsc={false} >
            <ModalOverlay textAlign='center' backdropFilter="blur(8px)" />
            <ModalContent m={'2'} bgColor={Color.TEAL_800} alignSelf='center' alignItems='center'>

                <ModalHeader mx={'5'} color={Color.RED_500}>{modalType === ModalType.VERIFICATION ? 'Verification required' : 'Password'}</ModalHeader>
                <ModalCloseButton ml={'5px'} bgColor={Color.PURPLE_700} />
                <ModalBody p={'5'} textAlign={'start'}>
                    {
                        modalType === ModalType.VERIFICATION ?
                            <>
                                <Text mb={'4'}>{title} : {username}</Text>
                                <Password id={""} isError={false} />
                                <Box as="div" mb={'5'}></Box>
                                <CustomButton buttonName={ButtonName.VERIFY_BUTTON} variant={Variant.SOLID} bgColor={Color.PURPLE_700} />
                            </>
                            :
                            <>
                                <Text mb={'4'}>{password}</Text>
                            </>
                    }
                </ModalBody>
            </ModalContent >
        </Modal >
    );
};

export default CustomModal;
