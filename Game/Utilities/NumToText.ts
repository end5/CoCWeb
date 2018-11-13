export const NUMBER_WORDS_CARDINAL: string[] = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
export const NUMBER_WORDS_CARDINAL_CAPITAL: string[] = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
export const NUMBER_WORDS_ORDINAL: string[] = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];

/**
 * Converts a number to cardinal words. (eg. zero, one, two ...)
 * @param num
 */
export function numToCardinalText(num: number): string {
    if (num >= 0 && num <= 10) return NUMBER_WORDS_CARDINAL[num];
    return num.toString();
}

/**
 * Converts a number to ordinal words. (eg. first, second, third ...)
 * @param num
 */
export function numToOrdinalText(num: number): string {
    if (num < 0) return num.toString(); // Can't really have the -10th of something
    if (num <= 10) return NUMBER_WORDS_ORDINAL[num];
    switch (num % 10) {
        case 1: return num.toString() + "st";
        case 2: return num.toString() + "nd";
        case 3: return num.toString() + "rd";
        default:
    }
    return num.toString() + "th";
}

export function numToCardinalCapText(num: number): string {
    if (num >= 0 && num <= 10) return NUMBER_WORDS_CARDINAL_CAPITAL[num];
    return num.toString();
}

export function capFirstLetter(str: string): string {
    if (str.length === 0) return "";
    return str.charAt(0).toUpperCase() + str.substr(1);
}
