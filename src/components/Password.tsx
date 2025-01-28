import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Icon, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import { TbLockPassword } from "react-icons/tb"
import { Color } from "../utils/enums"
import { TPasswordField } from "../utils/types"

export const Password = ({ onChange }: TPasswordField) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    return (
        <InputGroup mb='10px'>
            <InputLeftElement pointerEvents='none'>
                <Icon as={TbLockPassword} color={Color.GRAY_300} />
            </InputLeftElement>
            <Input
                pr='4.5rem'
                id="password"
                type={show ? 'text' : 'password'}
                placeholder='Password'
                onChange={onChange}
            />
            <InputRightElement cursor='pointer' color={Color.GRAY_300}>
                {show ? <ViewOffIcon onClick={handleClick} /> : <ViewIcon onClick={handleClick} />}
            </InputRightElement>
        </InputGroup>
    )
}