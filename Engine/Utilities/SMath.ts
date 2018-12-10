/**
 * Returns a random value from either multiple arguements or a single array.
 * @param item Single value or an array of values
 * @param items Multiple values
 */
export function randomChoice<T>(item: T[]): T;
export function randomChoice<T>(...items: T[]): T;
export function randomChoice<T>(item: T, ...items: T[]): T {
    if (Array.isArray(item) && items.length === 0) {
        return item[Math.round(Math.random() * (item.length - 1))];
    }
    return (items.concat(item))[Math.round(Math.random() * (items.length - 1))];
}

/**
 * Returns the floor of a random number from 0 to max. The maximum is exclusive and the minimum is inclusive.
 * @param max
 */
export function randInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

export function percentChance(percent: number): boolean {
    if (percent > 100)
        percent = Math.random() * 100;
    return Math.random() * 100 < percent;
}

export function round(value: number, place: number = 1): number {
    return Math.round(value * Math.pow(10, Math.floor(place))) / Math.pow(10, Math.floor(place));
}
