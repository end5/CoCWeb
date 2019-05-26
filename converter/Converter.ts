type ReplaceFunc = (match: string, ...args: string[]) => string;

function check(searchValue: string | RegExp, strOrFunc: string | ReplaceFunc) {
    return (match: string, ...args: string[]) => {
        if (match.split('\n').length > 1)
            console.error('Warning: Large match\nSearch Value: ' + searchValue + '\n' + match);

        if (typeof strOrFunc === 'string')
            return strOrFunc;
        else if (typeof strOrFunc === 'function')
            return strOrFunc(match, ...args);
        return '';
    };
}

function replace(text: string, searchValue: string | RegExp, replaceValue: string | ReplaceFunc): string {
    return text.replace(searchValue, check(searchValue, replaceValue));
}

// [dynamic] [public | internal] [final] class className [ extends superClass ] [ implements interfaceName[, interfaceName... ] ] {
const classDeclareRegExp = /^(\s*)((?:dynamic\s+)?(?:(?:(public)|internal)\s+)?(?:final\s+)?)class\s+([\w\d_]+)/;

// [override] [public | protected | private | internal] [static | final] [const | function | var] name
const declareRegExp = /^(\s*)((?:override\s+)?(?:(public|protected|private|internal)?\s+)(?:(?:(static)|final)\s+)?(const|function|var))/;

export function fixText(text: string): string {
    const lines = text.split('\n');

    let removeCurlyBraceOpen = 0;
    let removeCurlyBraceClose = 0;
    // let className: string | undefined;
    let index = 0;
    while (index < lines.length) {
        // Remove - package ...
        if (lines[index].trimLeft().startsWith('package')) {
            if (!lines[index].includes('{'))
                removeCurlyBraceOpen++;
            removeCurlyBraceClose++;
            lines.splice(index, 1);
            continue;
        }

        // Remove - {
        if (removeCurlyBraceOpen > 0 && lines[index].trimLeft().startsWith('{')) {
            lines.splice(index, 1);
            removeCurlyBraceOpen--;
            continue;
        }

        // Remove - import ...
        if (lines[index].trimLeft().startsWith('import')) {
            lines.splice(index, 1);
            continue;
        }

        // [match, whitespace, pre class, public?, class name]
        const classDeclareMatch = lines[index].match(classDeclareRegExp);
        if (classDeclareMatch) {
            let start = classDeclareMatch[1];

            if (classDeclareMatch[3]) // public
                start += 'export ';

            lines[index] = start + lines[index].slice(classDeclareMatch[1].length + classDeclareMatch[2].length);
        }

        // [match, whitespace, pre declare, (public | protected | private | internal)?, static?, (const | function | var)]
        const declareMatch = lines[index].match(declareRegExp);
        if (declareMatch) {
            let line = declareMatch[1];

            if (declareMatch[3]) // public | protected | private | internal
                if (declareMatch[3] === 'internal')
                    line += 'public ';
                else
                    line += declareMatch[3] + ' ';

            if (declareMatch[4]) // static
                line += declareMatch[4] + ' ';

            if (!declareMatch[3] && declareMatch[5])
                line += declareMatch[5] + ' ';

            lines[index] = line + lines[index].slice(declareMatch[1].length + declareMatch[2].length);
        }

        index++;
    }

    text = lines.join('\n');

    index = text.length - 1;
    while (removeCurlyBraceClose > 0) {
        if (text[index] === '}') {
            text = text.slice(0, index) + text.substr(index + 1);
            removeCurlyBraceClose--;
        }
        index--;
    }

    text = replace(text, /:\s*Function/g, '');
    text = replace(text, /:\s*Array/g, ': any[]');
    text = replace(text, /:\s*Object/g, ': Record<string, any>');
    text = replace(text, /:\s*Boolean/g, ': boolean');
    text = replace(text, /:\s*Number/g, ': number');
    text = replace(text, /:\s*int/g, ': number');
    text = replace(text, /:\s*String/g, ': string');
    text = replace(text, /:\s*void/g, ': void');
    text = replace(text, /:\s*\*/g, ': any');
    text = replace(text, /null/g, 'undefined');

    return text;
}
