
import { Box, FormControl, Stack, Text } from "@chakra-ui/react"
import { GoogleSSOBtn } from "../components/GoogleSSOBtn"
import { CustomButton } from "../components/Button"
import { Password } from "../components/Password"
import { Identifier } from "../components/Identifier"
import { ButtonName, PlaceHolder } from "../utils/enums"
import { TfiUser } from "react-icons/tfi"

export const LoginPage = () => {
    return (
        <FormControl>
            <Stack>
                <Identifier icon={TfiUser} placeHolder={PlaceHolder.EMAIL_OR_USERNAME} />
                <Password />
                <CustomButton buttonName={ButtonName.LOGIN_BUTTON} bgColor='teal.800' />
                <Box display="flex" alignItems="center" my='6px'>
                    <Box flex="1" borderBottom="1px solid gray" />
                    <Text mx={4}>OR</Text>
                    <Box flex="1" borderBottom="1px solid gray" />
                </Box>
                <GoogleSSOBtn buttonName={ButtonName.GOOGLE_SSO_BUTTON} bgColor='teal.800' />
            </Stack>
        </FormControl>
    )
}