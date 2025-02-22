import Cookies from "js-cookie";
const hours: number = Number(process.env.REACT_APP_COOKIE_HOURS)

export class Cookie {
    setCookie = (key: string, value: object, infinite?: boolean) => {
        let expires;

        if (infinite) {
            expires = 365 * 100; // 100 years
        } else {
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + hours * 60 * 60 * 1000);
            expires = expirationDate;
        }
        Cookies.set(key, JSON.stringify(value), {
            expires: expires,
            secure: true,
            sameSite: "Strict"
        })
    }

    getCookie = (key: string) => {
        const data = Cookies.get(key)
        if (!data) {
            this.clearCookie(key);
            return null;
        }

        try {
            return JSON.parse(data);
        } catch {
            return data;
        }
    }

    clearCookie = (key: string) => {
        Cookies.remove(key);
    }
}