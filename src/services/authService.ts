import { createUserWithEmailAndPassword, deleteUser, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, User } from 'firebase/auth'
import { TAuthenticateUser, TCreatedUser, TSignout, TUpdateUserDetailsResponse, TUserDetails } from '../utils/types'
import { auth } from '../firebase/config'
import { getUser, isUsernameTaken, updateUserData } from './databaseService'
import { ErrorMessages, ResponseMessage } from '../utils/enums'
import { createHashedPassword } from '../utils/bcrypt'
import { validateEmail, validatePassword, validateUsername } from '../utils/validations'
import { Cookie } from "../cookies/cookie";

const cookie = new Cookie();

export const registerUser = async (userDetails: TUserDetails): Promise<TCreatedUser> => {
    try {
        const { email, username, password } = userDetails

        const isEmailValidated = validateEmail(email)
        const isUsernameValidated = validateUsername(username!)
        const isPasswordValidated = validatePassword(password, false)

        if (!isEmailValidated.status || !isUsernameValidated.status || !isPasswordValidated.status) {
            return {
                code: 406,
                type: isEmailValidated?.type! || isUsernameValidated.type! || isPasswordValidated?.type!,
                message: isEmailValidated?.message! || isUsernameValidated.message! || isPasswordValidated?.message!
            }
        }

        const usernameTaken = await isUsernameTaken(userDetails?.username!)
        if (usernameTaken.isUsernameTaken === true) {
            return {
                code: 400,
                message: ResponseMessage.USERNAME_NOT_AVAILABLE
            }
        }

        const hashedPassword: string = await createHashedPassword(password)

        const newUser = await createUserWithEmailAndPassword(auth, email, hashedPassword)
        const { uid } = newUser.user

        userDetails.uid = uid
        userDetails.password = hashedPassword

        const result: TUpdateUserDetailsResponse = await updateUserData(userDetails);

        if (result.code === 201) {
            const isVerificationEmailSent = await emailVerificationLink(newUser.user)
            if (isVerificationEmailSent) {
                return {
                    code: result.code,
                    message: ResponseMessage.EMAIL_VERIFICATION_SENT_SUCCESSFULLY
                }
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

const emailVerificationLink = async (user: User) => {
    try {
        await sendEmailVerification(user)
        return true
    } catch (error: any) {
        return {
            code: 500,
            message: error.message || ResponseMessage.INTERNAL_SERVER_ERROR
        }
    }
}

export const authenticateUser = async (userDetails: TUserDetails): Promise<TAuthenticateUser> => {
    try {
        const isEmailValidated = validateEmail(userDetails?.email)
        const isPasswordValidated = validatePassword(userDetails?.password, true)

        if (!isEmailValidated.status || !isPasswordValidated.status) {
            return {
                code: 406,
                type: isEmailValidated?.type || isPasswordValidated?.type,
                message: isEmailValidated?.message! || isPasswordValidated?.message!
            }
        }

        const user = await getUser(userDetails);
        if (user.code === 200) {
            const authUser = await signInWithEmailAndPassword(auth, userDetails.email, user.data?.password!)
            if (!authUser.user.emailVerified) {
                emailVerificationLink(authUser.user)
                return {
                    code: 400,
                    message: ResponseMessage.EMAIL_ADDRESS_IS_NOT_VERIFIED
                }
            } else {
                return {
                    code: 200,
                    message: ResponseMessage.AUTHENTICATION_SUCCESSFUL,
                    data: {
                        email: user.data?.email,
                        username: user.data?.username,
                        token: await authUser.user.getIdToken()
                    }
                }
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

export const forgotPasswordLink = async (email: string) => {
    try {
        const isEmailValidated = validateEmail(email)
        if (!isEmailValidated.status) {
            return {
                code: 406,
                type: isEmailValidated?.type,
                message: isEmailValidated?.message!
            }
        }

        await sendPasswordResetEmail(auth, email)

        return {
            code: 200,
            message: ResponseMessage.PASSWORD_RESET_LINK_SENT_SUCCESSFULLY
        }

    } catch (error: any) {
        return {
            code: 500,
            message: error.message || ResponseMessage.INTERNAL_SERVER_ERROR
        }
    }
}

export const signOut = async (key: string): Promise<TSignout> => {
    try {
        await auth.signOut();
        cookie.clearCookie(key);
        return { code: 200 };
    } catch (error: any) {
        return {
            code: 500,
            message: error.message ?? ErrorMessages.ERROR_OCCURRED_WHILE_SIGN_OUT,
        };
    }
};
