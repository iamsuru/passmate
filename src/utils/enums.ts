export enum ButtonName {
    LOGIN_BUTTON = 'Login',
    SIGN_UP_BUTTON = 'Sign up',
    GOOGLE_SSO_BUTTON = 'Continue with Google',
    VERIFY_BUTTON = 'Verify',
    PASSWORD_RESET_LINK = 'Send Reset Password Link'
}

export enum PlaceHolder {
    EMAIL = 'Email',
    USERNAME = 'Username',
    EMAIL_OR_USERNAME = 'Email or Username'
}

export enum TabName {
    SIGN_IN = 'Sign-in',
    SIGN_UP = 'Sign-up'
}

export enum Variant {
    SOLID = 'solid',
    OUTLINE = 'outline',
    TRANSPARENT = 'transparent',
    UNSTYLED = 'unstyled',
    SUBTLE = 'subtle'
}

export enum ModalType {
    VERIFICATION = 'verification',
    PASSWORD = 'password'
}

export enum Color {
    TEAL_600 = 'teal.600',
    TEAL_800 = 'teal.800',
    PURPLE_700 = 'purple.700',
    GRAY_300 = 'gray.300',
    GRAY_600 = 'gray.600',
    GRAY_800 = 'gray.800',
    WHITE = 'white',
    GREEN = 'green',
    RED_500 = 'red.500',
    RED = 'red',
}

export enum ResponseMessage {
    EMAIL_VERIFICATION_SENT_SUCCESSFULLY = 'Email verification link sent',
    FAILED_TO_CREATE_USER_ACCOUNT = 'Failed to create user account',
    USERNAME_NOT_AVAILABLE = 'Username not available',
    INTERNAL_SERVER_ERROR = 'Internal server error',
    INCORRECT_CREDENTIALS = 'Incorrect Credentials',
    USER_DOES_NOT_EXISTS = 'User does not exists with these credentials',
    AUTHENTICATION_SUCCESSFUL = 'Authentication successful',
    EMAIL_IS_NOT_PROVIDED = 'Email id is not provided',
    USERNAME_IS_NOT_PROVIDED = 'Username is not provided',
    PASSWORD_IS_NOT_PROVIDED = 'Password is not provided',
    PASSWORD_LENGTH_VALIDATION_FAILED = 'Password must be 8-20 characters long',
    PASSWORD_IS_NOT_STRONG = 'Password is not strong. Please create a strong password',
    SOME_INPUT_FIELDS_ARE_NOT_PROVIDED = 'Some input fields are not provided',
    INVALID_EMAIL_IS_NOT_PROVIDED = 'Invalid email id provided',
    PASSWORD_RESET_LINK_SENT_SUCCESSFULLY = 'Password reset link sent successfully',
    EMAIL_ADDRESS_IS_NOT_VERIFIED = 'Email address is not verified',
    SESSION_HAS_EXPIRED = 'Your session has expired. Please log in again to continue'
}

export enum ErrorMessages {
    ERROR_OCCURRED_WHILE_SIGN_OUT = "Error occurred while signing out"
}

export enum ValidateInputType {
    EMAIL = 'email',
    USERNAME = 'username',
    PASSWORD = 'password',
}

export enum IdentiferIds {
    EMAILLOGIN = 'emailLogin',
    PASSWORDLOGIN = 'passwordLogin',
    EMAILREGISTRATION = 'emailRegistration',
    USERNAMEREGISTRATION = 'usernameRegistration',
    PASSWORDREGISTRATION = 'passwordRegistration',
    EMAILFORGOTPASSWORD = 'emailForgotPassword'
}