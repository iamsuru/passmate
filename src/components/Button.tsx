import { InputGroup, Button } from "@chakra-ui/react"

export const HomePageButton = () => {
    return (
        <InputGroup>
            <Button
                width="100%"
                colorScheme="teal"
                variant="outline"
                _hover={{ bg: "teal.800", color: "white", borderColor: 'teal.800' }}
            >
                Sign in
            </Button>
        </InputGroup>
    )
}