import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Icon, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import { TbLockPassword } from "react-icons/tb"

export const Password = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    return (
        <InputGroup mb='10px'>
            <InputLeftElement pointerEvents='none'>
                <Icon as={TbLockPassword} color='gray.300' />
            </InputLeftElement>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Password'
            />
            <InputRightElement cursor='pointer' color='gray.300'>
                {show ? <ViewOffIcon onClick={handleClick} /> : <ViewIcon onClick={handleClick} />}
            </InputRightElement>
        </InputGroup>
    )
}