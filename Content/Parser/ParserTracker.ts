import { TokenStream } from './TokenStream';
import { TokenType } from './TokenTypes';
import { TokenSymbol } from './TokenSymbols';

export class ParserTracker<T> {
    private stream: TokenStream;
    private expected: Set<string> = new Set();
    private results: T[] = [];
    private failIndex: number = 0;
    private error: T;
    private indent = 0;
    private debugStack: string[] = [];

    public constructor(stream: TokenStream, error: T) {
        this.stream = stream;
        this.error = error;
    }

    public call(obj: any, func: (...args: any[]) => T, ...args: any[]): T {
        const start = this.stream.pos;

        this.indent++;

        this.debugStack.push('  '.repeat(this.indent) + '> ' + func.name + ': ' + this.stream.current);

        const value = func.apply(obj, args);

        let debugStr = '  '.repeat(this.indent) + '< ' + func.name + ': ';
        if (('' + value).includes('\n')) {
            debugStr += '\n' + value;
            debugStr = debugStr.replace(/\n/g, '\n' + '  '.repeat(this.indent + 2));
        }
        else
            debugStr += value;
        this.debugStack.push(debugStr);

        this.indent--;

        if (value === this.error) {
            this.stream.pos = start;
            return this.error;
        }
        else {
            this.results.push(value);
            return value;
        }
    }

    public expect(type: TokenType): boolean {
        const visibleType: TokenType | string = TokenSymbol[type] ? TokenSymbol[type] : type;
        if (this.stream.pos >= this.failIndex) {
            if (this.stream.pos > this.failIndex) {
                this.failIndex = this.stream.pos;
                this.expected.clear();
            }
            this.expected.add(visibleType);
        }
        if (!this.stream.eos() && this.stream.current.type === type) {
            this.debugStack.push('  '.repeat(this.indent + 1) + '= true: ' + visibleType);
        }
        else {
            this.debugStack.push('  '.repeat(this.indent + 1) + '= false: ' + visibleType);
        }
        return !this.stream.eos() && this.stream.current.type === type;
    }

    public addSuggestion(type: string, symbol?: string) {
        if (symbol && /[\w\d]+/.test(symbol))
            this.expected.add(symbol);
        else
            this.expected.add(type);
    }

    public toString(): string {
        return this.getError() + "\n" + this.getExpected();
    }

    public getError(): string {
        const index = this.failIndex === 0 ? 0 : this.failIndex - 1;
        return "Error at " + (this.stream.current ? this.stream.at(index) : "End of Line");
    }

    public getResult(): T {
        return this.results[0];
    }

    public getExpected(): string {
        return "Expected: " + Array.from(this.expected).reduce((prev, curr) => prev + ", " + (Array.isArray(curr) ? curr.join(", ") : curr));
    }

    public getStackTrace(): string {
        return this.debugStack.reduce((prev, next, index, arr) => prev + next + (index !== arr.length - 1 ? '\n' : ''), "");
    }
}
