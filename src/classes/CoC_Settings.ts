/**
 * ...
 *
 * @author Fake-Name
 */
export class CocSettings {

    // Horrible static abuse FTW
    public static haltOnErrors = false;
    public static buttonEvents: any[] = [];
    private static bufferSize = 50;

    /**
     * trace("ERROR "+description);
     * If haltOnErrors=true, throws Error
     */
    public static error(description = ""): void {
        // trace("ERROR " + description);
        if (CocSettings.haltOnErrors) throw new Error(description);
    }

    /**
     * trace("ERROR Abstract method call: "+clazz+"."+method+"(). "+description);
     * If haltOnErrors=true, throws Error
     */
    public static errorAMC(clazz: string, method: string, description = ""): void {
        // error("Abstract method call: " + clazz + "." + method + "(). " + description);
    }

    public static appendButtonEvent(inString: string): void {
        CocSettings.buttonEvents.unshift(inString); // Push the new item onto the head of the array

        if (CocSettings.buttonEvents.length > CocSettings.bufferSize) {
            // if the array has become too long, pop the last item
            CocSettings.buttonEvents.pop();
        }
    }
    public static getButtonEvents(): string {
        let retStr = "";
        for (const x of CocSettings.buttonEvents) {
            retStr += `${CocSettings.buttonEvents[x]}\n`;
            // trace("x = ", x, "Array Val = ", CoC_Settings.buttonEvents[x]);
        }
        return retStr;
    }
}
