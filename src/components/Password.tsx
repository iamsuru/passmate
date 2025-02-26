import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Icon, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import { TbLockPassword } from "react-icons/tb"
import { Color, IdentiferIds } from "../utils/enums"
import { TPasswordField } from "../utils/types"

export const Password = ({ id, onChange, isError, fieldText }: TPasswordField) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    return (
        <InputGroup mb='10px'>
            {
                (id === IdentiferIds.LOGIN_PASSWORD || id === IdentiferIds.REGISTRATION_PASSWORD) &&
                <InputLeftElement pointerEvents='none'>
                    <Icon as={TbLockPassword} color={Color.GRAY_300} />
                </InputLeftElement>
            }
            <Input
                pr='4.5rem'
                id={id}
                type={show ? 'text' : 'password'}
                placeholder={fieldText ?? "Password"}
                onChange={onChange}
                borderColor={isError ? Color.RED : Color.GRAY_300}
            />
            <InputRightElement cursor='pointer' color={Color.GRAY_300}>
                {show ? <ViewOffIcon onClick={handleClick} /> : <ViewIcon onClick={handleClick} />}
            </InputRightElement>
        </InputGroup>
    )
}