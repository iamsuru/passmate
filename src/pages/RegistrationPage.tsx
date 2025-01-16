import { FormControl, Stack } from "@chakra-ui/react"
import { GoogleSSOBtn } from "../components/GoogleSSOBtn"
import { Identifier } from "../components/Identifier"
import { Password } from "../components/Password"
import { CustomButton } from "../components/Button"
import { Separater } from "../components/Separater"
import { ButtonName, PlaceHolder } from "../utils/enums"
import { MdAlternateEmail, MdEmail } from 'react-icons/md'

export const RegistrationPage = () => {
    return (
        <FormControl>
            <Stack>
                <Identifier icon={MdEmail} placeHolder={PlaceHolder.EMAIL} />
                <Identifier icon={MdAlternateEmail} placeHolder={PlaceHolder.USERNAME} />
                <Password />
                <CustomButton buttonName={ButtonName.SIGN_UP_BUTTON} bgColor='purple.700' />
                <Separater />
                <GoogleSSOBtn buttonName={ButtonName.GOOGLE_SSO_BUTTON} bgColor='purple.700' />
            </Stack>
        </FormControl>
    )
}