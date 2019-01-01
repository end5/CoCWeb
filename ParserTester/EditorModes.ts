import { HighlightLexer } from './HighlightLexer';

export const cocMode = {
    name: "CoC",
    factoryFunc: (config: CodeMirror.EditorConfiguration, modeOptions?: any) => {
        if (config.mode === "CoC" || (modeOptions && modeOptions.mode === "CoC")) return new HighlightLexer();
        return;
    }
};
