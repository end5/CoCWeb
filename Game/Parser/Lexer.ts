import { StringStream } from "./StringStream";
import { Token, ErrorToken } from "./Token";
import { TokenSymbol } from "./TokenSymbols";
import { TokenType } from "./TokenTypes";
import { parserLog } from "./Logger";

interface NestingValues {
    innerStringOnly: boolean;
    gotFuncName: boolean;
}

export class LexerState {
    public code = false;
    public escape = false;
    public nest: NestingValues[] = [];
    public errorMsg = '';
    public prevToken: TokenType | undefined;
}

function logTokens(tokens: Token[]) {
    parserLog.debug(
        '----- Tokens -----\n' +
        tokens.reduce((prev, next, index, arr) => prev + next + (index !== arr.length - 1 ? '\n' : ''), "") +
        '\n------------------\n'
    );
}

export function Lex(text: string): Token[] {
    parserLog.debug(
        '------ Text ------\n' +
        text +
        '\n------------------\n'
    );
    const state = new LexerState();

    const stream = new StringStream(text, 4);
    let tokens = [];
    let start = stream.pos;
    let result: TokenType;

    while (!stream.eos()) {
        result = tokenizer(stream, state);
        state.prevToken = result;

        if (result === TokenType.Error) {
            tokens = [new ErrorToken(state.errorMsg, text.substring(start, stream.pos), start, stream.pos)];
            logTokens(tokens);
            return tokens;
        }
        if (result !== TokenType.Ignore)
            tokens.push(new Token(result, text.substring(start, stream.pos), start, stream.pos));

        start = stream.pos;
    }

    logTokens(tokens);
    return tokens;
}

function tokenEscape(stream: StringStream, state: LexerState, escapeType: TokenType): TokenType {
    if (stream.eos && stream.eos()) {
        state.errorMsg = 'Unescaped character';
        return TokenType.Error;
    }
    state.escape = false;
    stream.pos++;
    return escapeType;
}

function tokenCode(stream: StringStream, state: LexerState): TokenType | undefined | void {
    if (stream.eat(TokenSymbol[TokenType.ParenthesisOpen])) return TokenType.ParenthesisOpen;
    if (state.nest[0] && stream.eat(TokenSymbol[TokenType.ParenthesisClose])) {
        state.nest[0].innerStringOnly = true;
        return TokenType.ParenthesisClose;
    }

    if (stream.match(TokenSymbol[TokenType.Equal])) return TokenType.Equal;
    if (stream.match(TokenSymbol[TokenType.SingleEqual])) return TokenType.SingleEqual;
    if (stream.match(TokenSymbol[TokenType.NotEqual])) return TokenType.NotEqual;
    if (stream.match(TokenSymbol[TokenType.LessThanOrEqual])) return TokenType.LessThanOrEqual;
    if (stream.match(TokenSymbol[TokenType.LessThan])) return TokenType.LessThan;
    if (stream.match(TokenSymbol[TokenType.GreaterThanOrEqual])) return TokenType.GreaterThanOrEqual;
    if (stream.match(TokenSymbol[TokenType.GreaterThan])) return TokenType.GreaterThan;

    if (stream.match(TokenSymbol[TokenType.Bar])) return TokenType.Bar;

    if (state.nest[0] && stream.eat(TokenSymbol[TokenType.BracketClose])) {
        state.nest.shift();
        if (state.nest.length === 0)
            state.code = false;
        return TokenType.BracketClose;
    }

    if (stream.eat(/[ \t\n\r]/)) {
        stream.eatWhile(/[ \t\n\r]+/);
        return TokenType.Ignore;
    }

    if (stream.match(TokenSymbol[TokenType.If])) return TokenType.If;

    if (stream.eatWhile(/\d/)) {
        return TokenType.Number;
    }

    if (state.nest[0] && state.nest[0].innerStringOnly && stream.eatWhile(/[^\]|]/)) {
        return TokenType.String;
    }

    if (stream.eatWhile(/[^\s[\]]/)) {
        if (state.nest[0] && !state.nest[0].gotFuncName) {
            state.nest[0].gotFuncName = true;
            return TokenType.Identity;
        }
        return TokenType.String;
    }

    if (stream.eat(TokenSymbol[TokenType.BracketOpen])) {
        state.nest.unshift({ gotFuncName: false, innerStringOnly: false });
        return TokenType.BracketOpen;
    }

    // if (stream.eat(/[a-zA-Z]/)) {
    //     stream.eatWhile(/[a-zA-Z\d]/);
    //     state.gotFuncName = true;
    //     return TokenType.Identity;
    // }
}

function tokenNotCode(stream: StringStream, state: LexerState): TokenType | undefined | void {
    if (state.escape) {
        return tokenEscape(stream, state, TokenType.String);
    }

    if (stream.eat(TokenSymbol[TokenType.BracketOpen])) {
        state.code = true;
        state.nest.unshift({ gotFuncName: false, innerStringOnly: false });
        return TokenType.BracketOpen;
    }

    if (stream.eat(TokenSymbol[TokenType.Escape])) {
        state.escape = true;
        return TokenType.Escape;
    }

    if (stream.eatWhile(/[^\[]/)) {
        return TokenType.String;
    }
}

export function tokenizer(stream: StringStream, state: LexerState): TokenType {
    const result = state.code ? tokenCode(stream, state) : tokenNotCode(stream, state);
    if (result !== undefined) return result;

    stream.pos++;
    state.errorMsg = 'Invalid character';
    return TokenType.Error;
}
