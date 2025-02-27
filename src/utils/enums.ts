export enum RoutesUrl {
    HOME_PAGE = '/',
    HOME_SCREEN = '/home-screen',
    FORGOT_PASSWORD = '/forgot-password',
    CREATE_PASSMATE_PASSWORD = '/create/passmate-password',
}

export enum ButtonName {
    LOGIN_BUTTON = 'Login',
    SIGN_UP_BUTTON = 'Sign up',
    GOOGLE_SSO_BUTTON = 'Continue with Google',
    VERIFY_BUTTON = 'Verify',
    PASSWORD_RESET_LINK = 'Send Reset Password Link',
    SAVE_PASSWORD = 'Save Password',
    UPDATE = 'Verify & Update',
    CREATE_PASSWORD = 'Create Passmate Password',
}

export enum PlaceHolder {
    EMAIL = 'Email',
    PLATFORM_NAME = 'Platform name',
    ACCOUNT_USERNAME = 'Account username',
    ACCOUNT_PASSWORD = 'Account password',
    PASSWORD_FIELD_TEXT = 'Passmate password',
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
    SUBTLE = 'subtle',
    GHOST = 'ghost'
}

export enum ModalType {
    VERIFICATION = 'verification',
    PASSWORD = 'password',
    VAULT_ENTRY = 'vault-entry',
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
    AUTHENTICATION_SUCCESSFUL = 'Authentication successful',
    PASSWORD_RESET_LINK_SENT_SUCCESSFULLY = 'Password reset link sent successfully',
    SESSION_HAS_EXPIRED = 'Your session has expired. Please log in again to continue',
    PASSWORD_STORED_SUCCESSFULLY = 'Password stored successfully in vault',
    VAULT_ENTRY_UPDATED_SUCCESSFULLY = 'Vault entry updated successfully',
    VAULT_ENTRY_DELETED_SUCCESSFULLY = 'Vault entry deleted successfully',
    EMAIL_ID_ALREADY_IN_USE = 'Email id already in use',
    VAULT_IS_EMPTY = 'Nothing stored in passmate',
    PASSWORD_CREATED_SUCCESSFULLY = 'Password created successfully',
}

export enum ErrorMessage {
    EMAIL_ID_NOT_PROVIDED = 'Email id is not provided',
    PASSWORD_IS_NOT_PROVIDED = 'Password is not provided',
    INTERNAL_SERVER_ERROR = 'Internal server error',
    SSO_LOGIN_FAILED = 'SSO Login failed',
    PASSMATE_PASSWORD_IS_NOT_CREATED = 'Passmate password is not created',
    ACCOUNT_USERNAME_NOT_PROVIDED = 'Account username not provided',
    ACCOUNT_PASSWORD_NOT_PROVIDED = 'Account password not provided',
    ERROR_OCCURRED_WHILE_SIGN_OUT = "Error occurred while signing out",
    PASSWORD_LENGTH_VALIDATION_FAILED = 'Password must be 8-20 characters long',
    PASSWORD_IS_NOT_STRONG = 'Password is not strong. Please create a strong password',
    INVALID_EMAIL_ID_NOT_PROVIDED = 'Invalid email id provided',
    EMAIL_ADDRESS_IS_NOT_VERIFIED = 'Email address is not verified',
    PLATFORM_NAME_NOT_PROVIDED = 'Platform name is not provided',
    FAILED_TO_FETCH_VAULT_ENTRIES = 'Failed to fetch vault entries',
    FAILED_TO_CREATE_VAULT_ENTRY = 'Failed to create vault entry',
    FAILED_TO_UPDATE_VAULT_ENTRY = 'Failed to update vault credentials',
    FAILED_TO_DELETE_VAULT_ENTRY = 'Failed to delete vault credentials',
    FIELD_CAN_NOT_BE_EMPTY = 'Field can not be empty',
}

export enum ValidateInputType {
    EMAIL = 'email',
    PASSWORD = 'password',
    PLATFORM_NAME = 'platform-name',
    ACCOUNT_USERNAME = 'account-username',
    ACCOUNT_PASSWORD = 'account-password',
}

export enum IdentiferIds {
    LOGIN_EMAIL = 'login-email',
    LOGIN_PASSWORD = 'login-password',
    REGISTRATION_EMAIL = 'registration-email',
    REGISTRATION_PASSWORD = 'registration-password',
    FORGOT_PASSWORD_EMAIL = 'forgot-password-email',
    PLATFORM_NAME = 'platform-name',
    ACCOUNT_USERNAME = 'account-username',
    ACCOUNT_PASSWORD = 'account-password',
    VALIDATE_PASSWORD = 'validate-password'
}