import { get, push, ref, remove, set, update } from 'firebase/database';
import { TCommonResponse, TDeleteVaultCredentials, TFetchPasswordResponse, TGetUser, TPasswordCredentials, TSavePlatformCredentials, TUpdateUserDataResponse, TUpdateVaultCredentials, TUpdateVaultResponse, TUserDetails, TUsernameTaken } from '../utils/types';
import { db } from '../firebase/config';
import { comparePassword } from '../utils/bcrypt';
import { ErrorMessage, ResponseMessage } from '../utils/enums';
import { currentDate } from '../utils/dateUtils';

const path: string = process.env.REACT_APP_FIREBASE_USERS_UPLOAD_PATH!;
const vaultPath: string = process.env.REACT_APP_FIREBASE_VAULT_PATH!;

export class DatabaseService {
    updateUserData = async (userDetails: TUserDetails): Promise<TUpdateUserDataResponse> => {
        const { uid, email, username, password } = userDetails;
        const userRef = ref(db, `${path}/${username}`);

        try {
            await set(userRef, {
                uid,
                email,
                username,
                password,
            });

            return {
                code: 201
            };
        } catch (error: any) {
            return {
                code: 500,
                message: error.message || ErrorMessage.INTERNAL_SERVER_ERROR
            }
        }
    };

    isUsernameTaken = async (username: string): Promise<TUsernameTaken> => {
        try {
            const userRef = ref(db, `${path}/${username}`);
            const userDetails = await get(userRef);

            if (userDetails.exists()) {
                return {
                    isUsernameTaken: true,
                    code: 200
                };
            }
            return {
                isUsernameTaken: false,
                code: 200
            }
        } catch (error: any) {
            return {
                code: 500,
                message: error.message || ErrorMessage.INTERNAL_SERVER_ERROR
            }
        }
    }

    getUser = async (userDetails: TUserDetails): Promise<TGetUser> => {
        try {
            const { email, password } = userDetails
            const userRef = ref(db, path)
            const userDetailsSnapshot = await get(userRef);

            if (userDetailsSnapshot.exists()) {
                const users = userDetailsSnapshot.val()

                for (const username in users) {
                    if (users[username].email === email) {
                        const isPasswordMatched = await comparePassword(password, users[username].password)
                        return isPasswordMatched ?
                            { code: 200, data: users[username] }
                            : { code: 401, message: ResponseMessage.INCORRECT_CREDENTIALS }
                    }
                }
            }

            return { code: 400, message: ResponseMessage.USER_DOES_NOT_EXISTS };
        } catch (error: any) {
            return {
                code: 500,
                message: error.message || ErrorMessage.INTERNAL_SERVER_ERROR
            }
        }
    }

    savePlatformCredential = async (passwordCredentials: TPasswordCredentials): Promise<TSavePlatformCredentials> => {
        try {
            const { uid, platformName, accountUsername, accountPassword } = passwordCredentials
            const vaultRef = ref(db, `${vaultPath}/${uid}`);

            await push(vaultRef, {
                platformName,
                accountUsername,
                accountPassword,
                createdAt: currentDate(),
                updatedAt: currentDate(),
            });

            return {
                code: 201
            };
        } catch (error: any) {
            return {
                code: 500,
                message: error.message || ErrorMessage.INTERNAL_SERVER_ERROR
            }
        }
    }

    fetchPlatformCredentials = async (uid: string): Promise<TFetchPasswordResponse> => {
        try {
            const vaultRef = ref(db, `${vaultPath}/${uid}`);
            const result = await get(vaultRef)
            return {
                code: 200,
                data: result.val() ?? []
            }
        } catch (error: any) {
            return {
                code: 500,
                message: error.message || ErrorMessage.INTERNAL_SERVER_ERROR
            }
        }
    }

    updateVaultEntry = async (updateVaultCredentials: TUpdateVaultCredentials): Promise<TUpdateVaultResponse> => {
        try {
            const { id, uid, accountPassword, accountUsername } = updateVaultCredentials
            const updateVaultObject: Record<string, string> = {};
            if (accountUsername) updateVaultObject.accountUsername = accountUsername;
            if (accountPassword) updateVaultObject.accountPassword = accountPassword;
            updateVaultObject.updatedAt = currentDate();

            const vaultRef = ref(db, `${vaultPath}/${uid}/${id}`);

            await update(vaultRef, updateVaultObject)
            return {
                code: 200
            }
        } catch (error: any) {
            return {
                code: 500,
                message: error.message ?? ErrorMessage.INTERNAL_SERVER_ERROR,
            }
        }
    }

    deleteVaultEntry = async (deleteVaultEntry: TDeleteVaultCredentials): Promise<TCommonResponse> => {
        try {
            const { id, uid } = deleteVaultEntry;
            const vaultRef = ref(db, `${vaultPath}/${uid}/${id}`);
            await remove(vaultRef)
            return {
                code: 200
            }
        } catch (error: any) {
            return {
                code: 500,
                message: error.message ?? ErrorMessage.INTERNAL_SERVER_ERROR,
            }
        }
    }
}