import { encrypt } from "../utils/crypto";
import { ErrorMessage, ResponseMessage } from "../utils/enums";
import { TFetchPasswordResponse, TPasswordCredentials, TSavePlatformCredentials, TStorePasswordResponse } from "../utils/types";
import { validatePlatformName, validateAccountUsername, validateAccountPassword } from "../utils/validations";
import { DatabaseService } from "./databaseService";

export class PasswordService {
    private databaseService: DatabaseService;

    constructor() {
        this.databaseService = new DatabaseService()
    }

    storePasswordCredentials = async (passwordCredentials: TPasswordCredentials): Promise<TStorePasswordResponse> => {
        try {
            const { uid, platformName, accountUsername, accountPassword } = passwordCredentials

            const isPlatformNameValidated = validatePlatformName(platformName)
            const isAccountUsernameValidated = validateAccountUsername(accountUsername)
            const isAccountPasswordValidated = validateAccountPassword(accountPassword)

            if (!isPlatformNameValidated.status || !isAccountUsernameValidated.status || !isAccountPasswordValidated.status) {
                return {
                    code: 406,
                    type: isPlatformNameValidated?.type! || isAccountUsernameValidated.type! || isAccountPasswordValidated?.type!,
                    message: isPlatformNameValidated?.message! || isAccountUsernameValidated.message! || isAccountPasswordValidated?.message!,
                }
            }

            const result: TSavePlatformCredentials = await this.databaseService.savePlatformCredential({
                uid,
                platformName,
                accountUsername,
                accountPassword: encrypt(accountPassword)
            })

            if (result.code === 201) {
                return {
                    code: result.code,
                    message: ResponseMessage.PASSWORD_STORED_SUCCESSFULLY
                }
            }
            return {
                code: 400,
                message: ErrorMessage.FAILED_TO_STORE_PASSWORD
            }
        } catch (error: any) {
            return {
                code: 500,
                message: error.message || ErrorMessage.INTERNAL_SERVER_ERROR
            }
        }
    }

    fetchPasswordCredentials = async (uid: string): Promise<TFetchPasswordResponse> => {
        try {
            const result: TFetchPasswordResponse = await this.databaseService.fetchPlatformCredentials(uid)
            return result;
        } catch (error: any) {
            return {
                code: 500,
                message: error.message || ErrorMessage.INTERNAL_SERVER_ERROR
            }
        }
    }
}