export enum ButtonName {
    LOGIN_BUTTON = 'Login',
    SIGN_UP_BUTTON = 'Sign up',
    GOOGLE_SSO_BUTTON = 'Continue with Google',
    VERIFY_BUTTON = 'Verify',
    PASSWORD_RESET_LINK = 'Send Reset Password Link',
    SAVE_PASSWORD = 'Save Password',
}

export enum PlaceHolder {
    EMAIL = 'Email',
    USERNAME = 'Username',
    EMAIL_OR_USERNAME = 'Email or Username',
    PLATFORM_NAME = 'Platform name',
    ACCOUNT_USERNAME = 'Account username',
    ACCOUNT_PASSWORD = 'Account password',
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
    INCORRECT_CREDENTIALS = 'Incorrect Credentials',
    USERNAME_NOT_AVAILABLE = 'Username not available',
    USER_DOES_NOT_EXISTS = 'User does not exists with these credentials',
    AUTHENTICATION_SUCCESSFUL = 'Authentication successful',
    SOME_INPUT_FIELDS_ARE_NOT_PROVIDED = 'Some input fields are not provided',
    PASSWORD_RESET_LINK_SENT_SUCCESSFULLY = 'Password reset link sent successfully',
    SESSION_HAS_EXPIRED = 'Your session has expired. Please log in again to continue',
    PASSWORD_STORED_SUCCESSFULLY = 'Password stored successfully in vault',
}

export enum ErrorMessage {
    FAILED_TO_CREATE_USER_ACCOUNT = 'Failed to create user account',
    EMAIL_ID_NOT_PROVIDED = 'Email id is not provided',
    USERNAME_IS_NOT_PROVIDED = 'Username is not provided',
    PASSWORD_IS_NOT_PROVIDED = 'Password is not provided',
    INTERNAL_SERVER_ERROR = 'Internal server error',
    FAILED_TO_STORE_PASSWORD = 'Failed to stored password in vault',
    ACCOUNT_USERNAME_NOT_PROVIDED = 'Account username not provided',
    ACCOUNT_PASSWORD_NOT_PROVIDED = 'Account password not provided',
    ERROR_OCCURRED_WHILE_SIGN_OUT = "Error occurred while signing out",
    PASSWORD_LENGTH_VALIDATION_FAILED = 'Password must be 8-20 characters long',
    PASSWORD_IS_NOT_STRONG = 'Password is not strong. Please create a strong password',
    INVALID_EMAIL_ID_NOT_PROVIDED = 'Invalid email id provided',
    EMAIL_ADDRESS_IS_NOT_VERIFIED = 'Email address is not verified',
    PLATFORM_NAME_NOT_PROVIDED = 'Platform name is not provided',
}

export enum ValidateInputType {
    EMAIL = 'email',
    USERNAME = 'username',
    PASSWORD = 'password',
    PLATFORM_NAME = 'platform_name',
    ACCOUNT_USERNAME = 'account_username',
    ACCOUNT_PASSWORD = 'account_password',
}

export enum IdentiferIds {
    EMAILLOGIN = 'emailLogin',
    PASSWORDLOGIN = 'passwordLogin',
    EMAILREGISTRATION = 'emailRegistration',
    USERNAMEREGISTRATION = 'usernameRegistration',
    PASSWORDREGISTRATION = 'passwordRegistration',
    EMAILFORGOTPASSWORD = 'emailForgotPassword',
    PLATFORM_NAME = 'platform_name',
    ACCOUNT_USERNAME = 'account_username',
    ACCOUNT_PASSWORD = 'account_password',
}