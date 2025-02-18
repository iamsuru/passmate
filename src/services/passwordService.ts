import { encrypt } from "../utils/crypto";
import { ErrorMessage, ResponseMessage } from "../utils/enums";
import { TDeleteVaultCredentials, TFetchPasswordResponse, TPasswordCredentials, TSavePlatformCredentials, TStorePasswordResponse, TUpdateVaultCredentials } from "../utils/types";
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

    updateVaultCredentials = async (updateVaultCredentials: TUpdateVaultCredentials) => {
        try {
            if (updateVaultCredentials.accountUsername) {
                const isAccountUsernameValidated = validateAccountUsername(updateVaultCredentials.accountUsername)
                if (!isAccountUsernameValidated.status) {
                    return {
                        code: 406,
                        type: isAccountUsernameValidated.type!,
                        message: isAccountUsernameValidated.message!
                    }
                }
            }

            if (updateVaultCredentials.accountPassword) {
                const isAccountUsernameValidated = validateAccountPassword(updateVaultCredentials.accountPassword)
                if (!isAccountUsernameValidated.status) {
                    return {
                        code: 406,
                        type: isAccountUsernameValidated.type!,
                        message: isAccountUsernameValidated.message!
                    }
                }
            }

            updateVaultCredentials.accountPassword = encrypt(updateVaultCredentials.accountPassword!)

            const result = await this.databaseService.updateVaultEntry(updateVaultCredentials);

            if (result.code === 200) {
                return {
                    code: result.code,
                    message: ResponseMessage.VAULT_CREDENTIALS_UPDATED_SUCCESSFULLY
                }
            }
            return {
                code: 400,
                message: result.message ?? ErrorMessage.FAILED_TO_UPDATE_VAULT_CREDENTIALS
            }
        } catch (error: any) {
            return {
                code: 500,
                message: error.message ?? ErrorMessage.FAILED_TO_UPDATE_VAULT_CREDENTIALS
            }
        }
    }

    deleteVaultCredentials = async (deleteVaultCredentials: TDeleteVaultCredentials) => {
        try {
            const result = await this.databaseService.deleteVaultEntry(deleteVaultCredentials)
            if (result.code === 200) {
                return {
                    code: result.code,
                    message: ResponseMessage.VAULT_CREDENTIALS_DELETED_SUCCESSFULLY
                }
            }
            return {
                code: 400,
                message: result.message ?? ErrorMessage.FAILED_TO_UPDATE_VAULT_CREDENTIALS
            }
        } catch (error: any) {
            return {
                code: 500,
                message: error.message ?? ErrorMessage.FAILED_TO_DELETE_VAULT_CREDENTIALS
            }
        }
    }
}