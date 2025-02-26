import { Button, Icon, InputGroup, Spinner } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { ButtonName, Color, Variant } from "../utils/enums";
import { TButton } from "../utils/types";

export const GoogleSSOBtn = ({ isLoading, bgColor, onClick }: TButton) => {
    return (
        <InputGroup>
            <Button
                leftIcon={!isLoading ? <Icon as={FcGoogle} /> : undefined}
                width='100%'
                color={bgColor}
                variant={Variant.OUTLINE}
                borderColor={bgColor}
                onClick={onClick}
                _hover={{
                    bg: bgColor,
                    color: Color.WHITE,
                    borderColor: bgColor,
                }}
                isLoading={isLoading}
                spinner={<Spinner />}
            >
                {ButtonName.GOOGLE_SSO_BUTTON}
            </Button>
        </InputGroup>
    )
}