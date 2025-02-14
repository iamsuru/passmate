import { get, ref, set } from 'firebase/database';
import { TGetUser, TUpdateUserDetailsResponse, TUserDetails, TUsernameTaken } from '../utils/types';
import { db } from '../firebase/config';
import { comparePassword } from '../utils/bcrypt';
import { ResponseMessage } from '../utils/enums';

const path: string = process.env.REACT_APP_FIREBASE_USERS_UPLOAD_PATH!;

export const updateUserData = async (userDetails: TUserDetails): Promise<TUpdateUserDetailsResponse> => {
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
            message: error.message || ResponseMessage.INTERNAL_SERVER_ERROR
        }
    }
};

export const isUsernameTaken = async (username: string): Promise<TUsernameTaken> => {
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
        console.error("Error checking email or username:", error);
        return {
            code: 500,
            message: error.message || ResponseMessage.INTERNAL_SERVER_ERROR
        }
    }
}

export const getUser = async (userDetails: TUserDetails): Promise<TGetUser> => {
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

        return { code: 401, message: ResponseMessage.USER_DOES_NOT_EXISTS };
    } catch (error: any) {
        return {
            code: 500,
            message: error.message || ResponseMessage.INTERNAL_SERVER_ERROR
        }
    }
}