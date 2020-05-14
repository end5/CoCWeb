/**
 * ...
 * @author Fake-Name
 */
export class CoC_Settings {
    public static debugBuild: boolean = true;

    // Horrible static abuse FTW
    public static haltOnErrors: boolean = false;
    public static buttonEvents: any[] = [];
    private static bufferSize: number = 50;

    /**
     * trace("ERROR "+description);
     * If haltOnErrors=true, throws Error
     */
    public static error(description: string = ""): void {
        // trace("ERROR " + description);
        if (CoC_Settings.haltOnErrors) throw new Error(description);
    }

    /**
     * trace("ERROR Abstract method call: "+clazz+"."+method+"(). "+description);
     * If haltOnErrors=true, throws Error
     */
    public static errorAMC(clazz: string, method: string, description: string = ""): void {
        // error("Abstract method call: " + clazz + "." + method + "(). " + description);
    }

    public static appendButtonEvent(inString: string): void {
        CoC_Settings.buttonEvents.unshift(inString); // Push the new item onto the head of the array

        if (CoC_Settings.buttonEvents.length > CoC_Settings.bufferSize) {
            // if the array has become too long, pop the last item
            CoC_Settings.buttonEvents.pop();
        }
    }
    public static getButtonEvents(): string {
        var retStr: string = "";
        for (var x of CoC_Settings.buttonEvents) {
            retStr += CoC_Settings.buttonEvents[x] + "\n";
            // trace("x = ", x, "Array Val = ", CoC_Settings.buttonEvents[x]);
        }
        return retStr;
    }
}
