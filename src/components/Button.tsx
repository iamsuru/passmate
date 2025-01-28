import { InputGroup, Button, Spinner } from "@chakra-ui/react";
import { TButton } from "../utils/types";
import { Color } from "../utils/enums";

export const CustomButton = ({ buttonName, bgColor, variant, onClick, isLoading }: TButton) => {
    return (
        <InputGroup>
            <Button
                width="100%"
                color={Color.WHITE}
                bg={bgColor}
                variant={variant}
                onClick={onClick}
                _hover={{
                    bg: bgColor,
                    color: Color.WHITE,
                    borderColor: bgColor,
                }}
            >
                {isLoading ? <Spinner /> : buttonName}
            </Button>
        </InputGroup >
    );
};
