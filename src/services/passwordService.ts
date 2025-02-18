import { encrypt } from "../utils/crypto";
import { ErrorMessage, ResponseMessage } from "../utils/enums";
import { TDeleteVaultCredentials, TFetchPasswordResponse, TResponse, TUpdateVaultEntry, TVaultEntry } from "../utils/types";
import { validatePlatformName, validateAccountUsername, validateAccountPassword } from "../utils/validations";
import { DatabaseService } from "./databaseService";

export class PasswordService {
    private databaseService: DatabaseService;

    constructor() {
        this.databaseService = new DatabaseService()
    }

    storeVaultCredentials = async (vaultEntry: TVaultEntry): Promise<TResponse> => {
        try {
            const { uid, platformName, accountUsername, accountPassword } = vaultEntry

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

            const result: TResponse = await this.databaseService.saveVaultEntry({
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
                message: ErrorMessage.FAILED_TO_CREATE_VAULT_ENTRY
            }
        } catch (error: any) {
            return {
                code: 500,
                message: error.message || ErrorMessage.FAILED_TO_CREATE_VAULT_ENTRY
            }
        }
    }

    retrieveVaultCredentials = async (uid: string): Promise<TFetchPasswordResponse> => {
        try {
            const result: TFetchPasswordResponse = await this.databaseService.fetchVaultEntries(uid)
            return result;
        } catch (error: any) {
            return {
                code: 500,
                message: error.message || ErrorMessage.INTERNAL_SERVER_ERROR
            }
        }
    }

    updateVaultCredentials = async (updateVaultCredentials: TUpdateVaultEntry): Promise<TResponse> => {
        try {
            if (updateVaultCredentials.accountUsername) {
                const isAccountUsernameValidated = validateAccountUsername(updateVaultCredentials.accountUsername);
                if (!isAccountUsernameValidated.status) {
                    return {
                        code: 406,
                        type: isAccountUsernameValidated.type!,
                        message: isAccountUsernameValidated.message!
                    };
                }
            }

            if (updateVaultCredentials.accountPassword) {
                const isAccountPasswordValidated = validateAccountPassword(updateVaultCredentials.accountPassword);
                if (!isAccountPasswordValidated.status) {
                    return {
                        code: 406,
                        type: isAccountPasswordValidated.type!,
                        message: isAccountPasswordValidated.message!
                    };
                }
                updateVaultCredentials.accountPassword = encrypt(updateVaultCredentials.accountPassword);
            }

            // Update vault entry in the database
            const result: TResponse = await this.databaseService.updateVaultEntry(updateVaultCredentials);
            if (result.code === 200) {
                return {
                    code: result.code,
                    message: ResponseMessage.VAULT_ENTRY_UPDATED_SUCCESSFULLY
                };
            }

            return {
                code: 400,
                message: result.message ?? ErrorMessage.FAILED_TO_UPDATE_VAULT_ENTRY
            };
        } catch (error: any) {
            return {
                code: 500,
                message: error.message ?? ErrorMessage.FAILED_TO_UPDATE_VAULT_ENTRY
            };
        }
    };

    deleteVaultCredentials = async (deleteVaultCredentials: TDeleteVaultCredentials): Promise<TResponse> => {
        try {
            const result = await this.databaseService.deleteVaultEntry(deleteVaultCredentials)
            if (result.code === 200) {
                return {
                    code: result.code,
                    message: ResponseMessage.VAULT_ENTRY_DELETED_SUCCESSFULLY
                }
            }
            return {
                code: 400,
                message: result.message ?? ErrorMessage.FAILED_TO_DELETE_VAULT_ENTRY
            }
        } catch (error: any) {
            return {
                code: 500,
                message: error.message ?? ErrorMessage.FAILED_TO_DELETE_VAULT_ENTRY
            }
        }
    }
}