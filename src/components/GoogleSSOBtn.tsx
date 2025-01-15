import { Button, Icon, InputGroup } from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc"

export const GoogleSSOBtn = () => {
    return (
        <InputGroup>
            <Button
                leftIcon={<Icon as={FcGoogle} />}
                colorScheme="teal"
                variant="outline"
                width="100%"
                _hover={{ bg: "teal.800", color: "white", borderColor: 'teal.800' }}
            >
                Continue with Google
            </Button>
        </InputGroup>
    )
}