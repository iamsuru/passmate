import { get, push, ref, remove, set, update } from 'firebase/database';
import { TDeleteVaultCredentials, TFetchPasswordResponse, TGetUser, TResponse, TUpdateVaultEntry, TUserDetails, TUsernameTaken, TVaultEntry } from '../utils/types';
import { db } from '../firebase/config';
import { comparePassword } from '../utils/bcrypt';
import { ResponseMessage } from '../utils/enums';
import { currentDate } from '../utils/dateUtils';

const path: string = process.env.REACT_APP_FIREBASE_USERS_UPLOAD_PATH!;
const vaultPath: string = process.env.REACT_APP_FIREBASE_VAULT_PATH!;

export class DatabaseService {
    createUserData = async (userDetails: TUserDetails): Promise<TResponse> => {
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
        } catch (error) {
            throw error
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
        } catch (error) {
            throw error
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
        } catch (error) {
            throw error;
        }
    }

    saveVaultEntry = async (vaultEntry: TVaultEntry): Promise<TResponse> => {
        try {
            const { uid, platformName, accountUsername, accountPassword } = vaultEntry
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
        } catch (error) {
            throw error
        }
    }

    fetchVaultEntries = async (uid: string): Promise<TFetchPasswordResponse> => {
        try {
            const vaultRef = ref(db, `${vaultPath}/${uid}`);
            const result = await get(vaultRef)
            return {
                code: 200,
                data: result.val() ?? []
            }
        } catch (error) {
            throw error
        }
    }

    updateVaultEntry = async (updateVaultEntry: TUpdateVaultEntry): Promise<TResponse> => {
        try {
            const { id, uid, accountPassword, accountUsername } = updateVaultEntry
            const updateVaultObject: Record<string, string> = {};
            if (accountUsername) updateVaultObject.accountUsername = accountUsername;
            if (accountPassword) updateVaultObject.accountPassword = accountPassword;
            updateVaultObject.updatedAt = currentDate();

            const vaultRef = ref(db, `${vaultPath}/${uid}/${id}`);

            await update(vaultRef, updateVaultObject)
            return {
                code: 200
            }
        } catch (error) {
            throw error
        }
    }

    deleteVaultEntry = async (deleteVaultEntry: TDeleteVaultCredentials): Promise<TResponse> => {
        try {
            const { id, uid } = deleteVaultEntry;
            const vaultRef = ref(db, `${vaultPath}/${uid}/${id}`);
            await remove(vaultRef)
            return {
                code: 200
            }
        } catch (error) {
            throw error
        }
    }
}