import bcrypt from 'bcryptjs'
const saltRounds = Number(process.env.REACT_APP_BCRYPT_SALT_ROUNDS)

export const createHashedPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
    return isCorrectPassword
}
