import { InputGroup, Button } from "@chakra-ui/react";
import { TButton } from "../utils/types";
import { Color, Variant } from "../utils/enums";

export const CustomButton = ({ buttonName, bgColor, variant }: TButton) => {
    return (
        <InputGroup>
            <Button
                width="100%"
                color={variant === Variant.OUTLINE ? bgColor : Color.WHITE}
                bg={variant === Variant.OUTLINE ? Variant.TRANSPARENT : bgColor}
                variant={variant}
                borderColor={bgColor}
                _hover={{
                    bg: bgColor,
                    color: Color.WHITE,
                    borderColor: bgColor,
                }}
            >
                {buttonName}
            </Button>
        </InputGroup>
    );
};
