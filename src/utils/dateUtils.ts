export const currentDate = () => {
    const ISTOffset = 5.5 * 60 * 60 * 1000;
    const now = new Date();
    const ISTTime = new Date(now.getTime() + ISTOffset).toISOString();
    return ISTTime;
}