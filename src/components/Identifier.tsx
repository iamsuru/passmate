import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { TfiUser } from "react-icons/tfi"

export const Identifier = () => {
    return (
        <InputGroup mt='10px' mb='10px'>
            <InputLeftElement pointerEvents='none'>
                <Icon as={TfiUser} color='gray.300' />
            </InputLeftElement>
            <Input type='text' placeholder='Email or Username' />
        </InputGroup>
    )
}