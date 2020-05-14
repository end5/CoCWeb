export function trace(...text: any[]) {
    if (window && (window as any).gameTrace) console.log(text);
}
