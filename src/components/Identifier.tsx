import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { TIconIdentifierProps } from "../utils/types";
import { Color } from "../utils/enums";

export const Identifier = ({ icon, placeHolder, onChange }: TIconIdentifierProps) => {
    return (
        <InputGroup mb="10px">
            <InputLeftElement pointerEvents="none">
                <Icon as={icon} color={Color.GRAY_300} />
            </InputLeftElement>
            <Input type="text" id="emailAndUsername" placeholder={placeHolder} onChange={onChange} />
        </InputGroup>
    );
};
