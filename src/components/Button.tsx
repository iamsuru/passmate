import { InputGroup, Button } from "@chakra-ui/react";
import { TButton } from "../utils/types";

export const CustomButton = ({ buttonName, bgColor }: TButton) => {
    return (
        <InputGroup>
            <Button
                width="100%"
                color={bgColor}
                variant="outline"
                borderColor={bgColor}
                _hover={{
                    bg: bgColor,
                    color: "white",
                    borderColor: bgColor,
                }}
            >
                {buttonName}
            </Button>
        </InputGroup>
    );
};
