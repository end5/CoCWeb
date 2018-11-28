import { HighlightSymbol } from "./HighlightSymbol";
import { LexerState, tokenizer } from "../Game/Parser/Lexer";

export class HighlightLexer implements CodeMirror.Mode<LexerState> {
    public startState(): LexerState {
        return new LexerState();
    }

    public token(stream: CodeMirror.StringStream, state: LexerState): string {
        return HighlightSymbol[tokenizer(stream as any, state)];
    }
}
