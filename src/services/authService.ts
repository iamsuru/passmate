import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword } from 'firebase/auth'
import { TAuthenticateUser, TCreatedUser, TUpdateUserDetailsResponse, TUserDetails } from '../utils/types'
import { auth } from '../firebase/config'
import { getUser, isUsernameTaken, updateUserData } from './databaseService'
import { ResponseMessage } from '../utils/enums'
import { createHashedPassword } from '../utils/bcrypt'

export const registerUser = async (userDetails: TUserDetails): Promise<TCreatedUser> => {
    try {
        const { email, password } = userDetails

        const hashedPassword: string = await createHashedPassword(password)

        const usernameTaken = await isUsernameTaken(userDetails?.username!)

        if (usernameTaken.isUsernameTaken === true) {
            return {
                code: 400,
                message: ResponseMessage.USERNAME_NOT_AVAILABLE
            }
        }

        const newUser = await createUserWithEmailAndPassword(auth, email, hashedPassword)
        const { uid } = newUser.user

        userDetails.uid = uid
        userDetails.password = hashedPassword

        const result: TUpdateUserDetailsResponse = await updateUserData(userDetails);

        if (result.code === 201) {
            return {
                code: result.code,
                message: ResponseMessage.ACCOUNT_CREATED_SUCCESSFULLY
            }
        }

        await deleteUser(newUser.user);
        return {
            code: 400,
            message: ResponseMessage.FAILED_TO_CREATE_USER_ACCOUNT
        }

    } catch (error: any) {
        return {
            code: 500,
            message: error.message || ResponseMessage.INTERNAL_SERVER_ERROR
        }
    }
}

export const authenticateUser = async (userDetails: TUserDetails): Promise<TAuthenticateUser> => {
    try {
        const user = await getUser(userDetails);
        if (user.code === 200) {
            const authUser = await signInWithEmailAndPassword(auth, userDetails.email, user.password!)
            return {
                code: 200,
                message: ResponseMessage.AUTHENTICATION_SUCCESSFUL,
                data: authUser.user
            }
        }
        return {
            code: user.code,
            message: user.message!
        }
    } catch (error: any) {
        return {
            code: 500,
            message: error.message || ResponseMessage.INTERNAL_SERVER_ERROR
        }
    }
}