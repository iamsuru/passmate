import { ResponseMessage, ValidateInputType } from "./enums";
import { TValidations } from "./types";
import validator from "validator";

export const validateEmail = (email: string): TValidations => {
    email = email.trim()
    if (!email || email.length === 0) {
        return {
            status: false,
            type: ValidateInputType.EMAIL,
            message: ResponseMessage.EMAIL_IS_NOT_PROVIDED
        }
    }

    if (!validator.isEmail(email)) {
        return {
            status: false,
            type: ValidateInputType.EMAIL,
            message: ResponseMessage.INVALID_EMAIL_IS_NOT_PROVIDED
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
            message: ResponseMessage.USERNAME_IS_NOT_PROVIDED
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
            message: ResponseMessage.PASSWORD_IS_NOT_PROVIDED
        }
    }

    if (!isLogin && !validator.isLength(password, { min: 8, max: 20 })) {
        return {
            status: false,
            type: ValidateInputType.PASSWORD,
            message: ResponseMessage.PASSWORD_LENGTH_VALIDATION_FAILED
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
            message: ResponseMessage.PASSWORD_IS_NOT_STRONG
        }
    }

    return { status: true };
}