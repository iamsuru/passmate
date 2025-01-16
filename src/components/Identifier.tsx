import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { TIconIdentifierProps } from "../utils/types"

export const Identifier = ({ icon, placeHolder }: TIconIdentifierProps) => {
    return (
        <InputGroup mb='10px'>
            <InputLeftElement pointerEvents='none'>
                <Icon as={icon} color='gray.300' />
            </InputLeftElement>
            <Input type='text' placeholder={placeHolder} />
        </InputGroup>
    )
}