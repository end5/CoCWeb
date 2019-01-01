import { TokenType } from './TokenTypes';

export class Token {
    public constructor(
        /** The token type the mode assigned to the token, such as "keyword" or "comment" (may also be null). */
        public type: string,
        /** The token's string. */
        public text: string,
        /** The character(on the given line) at which the token starts. */
        public start: number,
        /** The character at which the token ends. */
        public end: number,
    ) { }

    public toString() {
        return "\"" + (this.text === '\n' ? '\\n' : this.text) + "\" : [" + this.type + ":" + this.start + ":" + this.end + "]";
    }
}

export class ErrorToken extends Token {
    public constructor(
        /** The reason for the error. */
        public reason: string,
        /** The token's string. */
        public text: string,
        /** The line which this toke is on */
        public start: number,
        /** The character at which the token ends. */
        public end: number,
    ) { super(TokenType.Error, text, start, end); }

    public toString() {
        return this.reason + ' - ' + super.toString();
    }
}
