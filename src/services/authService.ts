import { createUserWithEmailAndPassword, EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, User } from 'firebase/auth'
import { TAuthenticateUser, TResponse, TUserDetails } from '../utils/types'
import { auth } from '../firebase/config'
import { ErrorMessage, ResponseMessage } from '../utils/enums'
import { validateEmail, validatePassword } from '../utils/validations'
import { Cookie } from "../cookies/cookie";

export class AuthService {
    private cookie: Cookie;

    constructor() {
        this.cookie = new Cookie();
    }

    registerUser = async (userDetails: TUserDetails): Promise<TResponse> => {
        try {
            const { email, password } = userDetails

            const isEmailValidated = validateEmail(email)
            const isPasswordValidated = validatePassword(password, false)

            if (!isEmailValidated.status || !isPasswordValidated.status) {
                return {
                    code: 406,
                    type: isEmailValidated?.type! || isPasswordValidated?.type!,
                    message: isEmailValidated?.message! || isPasswordValidated?.message!
                }
            }

            await createUserWithEmailAndPassword(auth, email, password)
            return {
                code: 201,
                message: ResponseMessage.EMAIL_VERIFICATION_SENT_SUCCESSFULLY
            }
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                return {
                    code: 400,
                    message: ResponseMessage.EMAIL_ID_ALREADY_IN_USE
                };
            }
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

            const authUser = await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
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
                        email: authUser.user.email,
                        token: await authUser.user.getIdToken()
                    }
                }
            }
        } catch (error: any) {
            if (error.code === 'auth/invalid-credential') {
                return {
                    code: 400,
                    message: ResponseMessage.INCORRECT_CREDENTIALS
                };
            }
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

    verifyUserPassword = async (userDetails: TUserDetails): Promise<TAuthenticateUser> => {
        try {
            const isPasswordValidated = validatePassword(userDetails.password, true)
            if (!isPasswordValidated.status) {
                return {
                    code: 406,
                    type: isPasswordValidated?.type,
                    message: isPasswordValidated?.message!
                }
            }

            const credential = EmailAuthProvider.credential(userDetails.email, userDetails.password);

            await reauthenticateWithCredential(auth.currentUser!, credential)

            return {
                code: 200,
                message: ResponseMessage.AUTHENTICATION_SUCCESSFUL
            }
        } catch (error: any) {
            if (error.code === 'auth/invalid-credential') {
                return {
                    code: 400,
                    message: ResponseMessage.INCORRECT_CREDENTIALS
                };
            }

            return {
                code: 500,
                message: error.message || ErrorMessage.INTERNAL_SERVER_ERROR
            }
        }
    }
}