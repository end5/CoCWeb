// Basically, you pass an arbitrary-length list of arguments, and it returns one of them at random.
// Accepts any type.
// Can also accept a *single* array of items, in which case it picks from the array instead.
// This lets you pre-construct the argument, to make things cleaner
export function randomChoice<T>(...items: T[]): T {
    return items[Math.round(Math.random() * (items.length - 1))];
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
