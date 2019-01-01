export function isValentine(): boolean {
    const date = new Date(Date.now());
    const day = date.getDay();
    const month = date.getMonth();
    return (day >= 13 && day <= 15 && month === 1);
}

export function isEaster(): boolean {
    const date = new Date(Date.now());
    const day = date.getDay();
    const month = date.getMonth();
    return (day >= 30 && day <= 31 && month === 2) || (month === 3 && day <= 1);
}

export function isHalloween(): boolean {
    const date = new Date(Date.now());
    const day = date.getDay();
    const month = date.getMonth();
    return ((day >= 28 && month === 9) || (day < 2 && month === 10));
}

export function isThanksgiving(): boolean {
    const date = new Date(Date.now());
    const day = date.getDay();
    const month = date.getMonth();
    return ((day >= 21 && month === 10) && (day < 30 && month === 10));
}

export function isHolidays(): boolean {
    const date = new Date(Date.now());
    const day = date.getDay();
    const month = date.getMonth();
    return (day >= 25 && month === 11);
}
