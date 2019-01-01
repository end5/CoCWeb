class Logger {
    private debugOut: ((text: string) => void)[] = [];
    private errorOut: ((text: string) => void)[] = [];
    public on = false;
    private bufferDebug = '';
    private bufferError = '';

    public flush() {
        for (const output of this.debugOut)
            output(this.bufferDebug);
        for (const output of this.errorOut)
            output(this.bufferError);

        this.bufferDebug = '';
        this.bufferError = '';
    }

    public debug(text: string) {
        this.bufferDebug += text;
    }

    public error(text: string, prefix?: string) {
        this.bufferError += (prefix ? prefix : 'Error: ') + text;
    }

    public registerOutput(logType: 'error' | 'debug', outputCallback: (str: string) => void) {
        if (logType === 'error')
            this.errorOut.push(outputCallback);
        if (logType === 'debug')
            this.debugOut.push(outputCallback);
    }
}

export const parserLog = new Logger();
