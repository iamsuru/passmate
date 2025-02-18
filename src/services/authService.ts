import { createUserWithEmailAndPassword, deleteUser, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, User } from 'firebase/auth'
import { TAuthenticateUser, TGetUser, TResponse, TUserDetails, TUsernameTaken } from '../utils/types'
import { auth } from '../firebase/config'
import { ErrorMessage, ResponseMessage } from '../utils/enums'
import { createHashedPassword } from '../utils/bcrypt'
import { validateEmail, validatePassword, validateUsername } from '../utils/validations'
import { Cookie } from "../cookies/cookie";
import { DatabaseService } from './databaseService'

export class AuthService {
    private databaseService: DatabaseService;
    private cookie: Cookie;

    constructor() {
        this.databaseService = new DatabaseService()
        this.cookie = new Cookie();
    }

    registerUser = async (userDetails: TUserDetails): Promise<TResponse> => {
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

            const usernameTaken: TUsernameTaken = await this.databaseService.isUsernameTaken(userDetails?.username!)
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

            const result: TResponse = await this.databaseService.createUserData(userDetails);

            if (result.code === 201) {
                const isVerificationEmailSent = await this.emailVerificationLink(newUser.user)
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
                message: ErrorMessage.FAILED_TO_CREATE_USER_ACCOUNT
            }

        } catch (error: any) {
            return {
                code: 500,
                message: error.message || ErrorMessage.INTERNAL_SERVER_ERROR
            }
        }
    }

    private emailVerificationLink = async (user: User): Promise<boolean | TResponse> => {
        try {
            await sendEmailVerification(user)
            return true
        } catch (error: any) {
            return {
                code: 500,
                message: error.message || ErrorMessage.INTERNAL_SERVER_ERROR
            }
        }
    }

    authenticateUser = async (userDetails: TUserDetails): Promise<TAuthenticateUser> => {
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

            const user: TGetUser = await this.databaseService.getUser(userDetails);
            if (user.code === 200) {
                const authUser = await signInWithEmailAndPassword(auth, userDetails.email, user.data?.password!)
                if (!authUser.user.emailVerified) {
                    this.emailVerificationLink(authUser.user)
                    return {
                        code: 400,
                        message: ErrorMessage.EMAIL_ADDRESS_IS_NOT_VERIFIED
                    }
                } else {
                    return {
                        code: 200,
                        message: ResponseMessage.AUTHENTICATION_SUCCESSFUL,
                        data: {
                            uid: authUser.user.uid,
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
                message: error.message || ErrorMessage.INTERNAL_SERVER_ERROR
            }
        }
    }

    forgotPasswordLink = async (email: string): Promise<TResponse> => {
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
                message: error.message || ErrorMessage.INTERNAL_SERVER_ERROR
            }
        }
    }

    signOut = async (key: string): Promise<TResponse> => {
        try {
            await auth.signOut();
            this.cookie.clearCookie(key);
            return { code: 200 };
        } catch (error: any) {
            return {
                code: 500,
                message: error.message ?? ErrorMessage.ERROR_OCCURRED_WHILE_SIGN_OUT,
            };
        }
    }
}