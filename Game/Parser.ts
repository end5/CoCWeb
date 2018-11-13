export function parseCoC(text: string): string {
    return text.replace(/\n/g, '<br>');
}
