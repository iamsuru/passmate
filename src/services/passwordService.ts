import { TPasswordData } from "../utils/types";

export class PasswordService {
    storePassword = async (passwordData: TPasswordData) => {
        console.log(passwordData)
        return {
            code: 200,
            message: 'Password stored successfully,'
        }
    }
}