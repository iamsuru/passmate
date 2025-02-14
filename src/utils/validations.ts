import { ErrorMessage, ValidateInputType } from "./enums";
import { TValidations } from "./types";
import validator from "validator";

export const validateEmail = (email: string): TValidations => {
    email = email.trim()
    if (!email || email.length === 0) {
        return {
            status: false,
            type: ValidateInputType.EMAIL,
            message: ErrorMessage.EMAIL_ID_NOT_PROVIDED
        }
    }

    if (!validator.isEmail(email)) {
        return {
            status: false,
            type: ValidateInputType.EMAIL,
            message: ErrorMessage.INVALID_EMAIL_ID_NOT_PROVIDED
        }
    }

    return { status: true }
}

export const validateUsername = (username: string): TValidations => {
    username = username.trim()
    if (!username || username.length === 0) {
        return {
            status: false,
            type: ValidateInputType.USERNAME,
            message: ErrorMessage.USERNAME_IS_NOT_PROVIDED
        }
    }
    return { status: true };
}

export const validatePassword = (password: string, isLogin?: boolean): TValidations => {
    password = password.trim()
    if (!password || password.length === 0) {
        return {
            status: false,
            type: ValidateInputType.PASSWORD,
            message: ErrorMessage.PASSWORD_IS_NOT_PROVIDED
        }
    }

    if (!isLogin && !validator.isLength(password, { min: 8, max: 20 })) {
        return {
            status: false,
            type: ValidateInputType.PASSWORD,
            message: ErrorMessage.PASSWORD_LENGTH_VALIDATION_FAILED
        }
    }

    const isStringPassword = validator.isStrongPassword(password, {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    });

    if (!isLogin && !isStringPassword) {
        return {
            status: false,
            type: ValidateInputType.PASSWORD,
            message: ErrorMessage.PASSWORD_IS_NOT_STRONG
        }
    }

    return { status: true };
}

export const validatePlatformName = (platformName: string): TValidations => {
    platformName = platformName.trim()
    if (!platformName || platformName.length === 0) {
        return {
            status: false,
            type: ValidateInputType.PLATFORM_NAME,
            message: ErrorMessage.PLATFORM_NAME_NOT_PROVIDED
        }
    }
    return { status: true };
}

export const validateAccountUsername = (accountUsername: string): TValidations => {
    accountUsername = accountUsername.trim()
    if (!accountUsername || accountUsername.length === 0) {
        return {
            status: false,
            type: ValidateInputType.ACCOUNT_USERNAME,
            message: ErrorMessage.ACCOUNT_USERNAME_NOT_PROVIDED
        }
    }
    return { status: true };
}

export const validateAccountPassword = (accountPassword: string): TValidations => {
    accountPassword = accountPassword.trim()
    if (!accountPassword || accountPassword.length === 0) {
        return {
            status: false,
            type: ValidateInputType.ACCOUNT_PASSWORD,
            message: ErrorMessage.ACCOUNT_PASSWORD_NOT_PROVIDED
        }
    }
    return { status: true };
}