
import { Box, FormControl, Stack, Text } from "@chakra-ui/react"
import { GoogleSSOBtn } from "../components/GoogleSSOBtn"
import { HomePageButton } from "../components/Button"
import { Password } from "../components/Password"
import { Identifier } from "../components/Identifier"

export const LoginPage = () => {
    return (
        <FormControl>
            <Stack>
                <Identifier />
                <Password />
                <HomePageButton />
                <Box display="flex" alignItems="center" my='6px'>
                    <Box flex="1" borderBottom="1px solid gray" />
                    <Text mx={4}>OR</Text>
                    <Box flex="1" borderBottom="1px solid gray" />
                </Box>
                <GoogleSSOBtn />
            </Stack>
        </FormControl>
    )
}