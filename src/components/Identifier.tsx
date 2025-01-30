import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { TIconIdentifierProps } from "../utils/types";
import { Color } from "../utils/enums";

export const Identifier = ({ id, icon, placeHolder, onChange, isError }: TIconIdentifierProps) => {
    return (
        <InputGroup mb="10px">
            <InputLeftElement pointerEvents="none">
                <Icon as={icon} color={Color.GRAY_300} />
            </InputLeftElement>
            <Input
                type="text"
                id={id}
                placeholder={placeHolder}
                onChange={onChange}
                autoComplete="off"
                borderColor={isError ? Color.RED : Color.GRAY_300}
            />
        </InputGroup>
    );
};
