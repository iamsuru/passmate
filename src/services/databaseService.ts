import { get, push, ref, remove, set, update } from 'firebase/database';
import { TDeleteVaultCredentials, TFetchPasswordResponse, TResponse, TUpdateVaultEntry, TVaultEntry } from '../utils/types';
import { db } from '../firebase/config';
import { currentDate } from '../utils/dateUtils';

const vaultPath: string = process.env.REACT_APP_FIREBASE_VAULT_PATH!;
const flagUpdationPath: string = process.env.REACT_APP_FIREBASE_USERS_FLAG_UPDATION_PATH!;

export class DatabaseService {
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

    updatePassmatePasswordFlag = async (uid: string, isCreated: boolean): Promise<TResponse> => {
        try {
            const flagUpdationRef = ref(db, `${flagUpdationPath}/${uid}`);
            await set(flagUpdationRef, {
                isCreated: isCreated
            })
            return {
                code: 200
            }
        } catch (error) {
            throw error
        }
    }

    fetchPassmatePasswordFlag = async (uid: string): Promise<TResponse> => {
        try {
            const flagUpdationRef = ref(db, `${flagUpdationPath}/${uid}`);
            const result = await get(flagUpdationRef);

            if (!result.exists()) {
                return {
                    code: 404,
                    message: "No data found"
                };
            }

            return {
                code: 200,
                message: String(result.val().isCreated)
            };
        } catch (error) {
            throw error;
        }
    };

}