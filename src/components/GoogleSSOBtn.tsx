import { Button, Icon, InputGroup } from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc"
import { ButtonName, Color, Variant } from "../utils/enums"
import { TButton } from "../utils/types"

export const GoogleSSOBtn = ({ bgColor }: TButton) => {
    return (
        <InputGroup>
            <Button
                leftIcon={<Icon as={FcGoogle} />}
                width='100%'
                color={bgColor}
                variant={Variant.OUTLINE}
                borderColor={bgColor}
                _hover={{
                    bg: bgColor,
                    color: Color.WHITE,
                    borderColor: bgColor,
                }}
            >
                {ButtonName.GOOGLE_SSO_BUTTON}
            </Button>
        </InputGroup>
    )
}