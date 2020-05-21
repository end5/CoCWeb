import { CoC_Settings } from "../CoC_Settings";
import { bindToClass } from "../../ClassBinder";

/**
 * Created by aimozg on 18.01.14.
 */
export class Utils {
    public constructor() {
        bindToClass(this);
    }

    private static NUMBER_WORDS_NORMAL: any[] = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    private static NUMBER_WORDS_CAPITAL: any[] = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    private static NUMBER_WORDS_POSITIONAL: any[] = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];

    // curryFunction(f,args1)(args2)=f(args1.concat(args2))
    // e.g. curryFunction(f,x,y)(z,w) = f(x,y,z,w)
    public static curry(func: any, ...args: any[]) {
        if (func == undefined) CoC_Settings.error("carryFunction(undefined," + args + ")");
        return function (...args2: any[]): any {
            return func.apply(undefined, args.concat(args2));
        };
    }

    public static formatStringArray(stringList: any[]): string { //Changes an array of values into "1", "1 and 2" or "1, (x, )y and z"
        switch (stringList.length) {
            case 0: return "";
            case 1: return stringList[0];
            case 2: return stringList[0] + " and " + stringList[1];
            default:
        }
        var concat: string = stringList[0];
        for (var x: number = 1; x < stringList.length - 1; x++) concat += ", " + stringList[x];
        return concat + " and " + stringList[stringList.length - 1];
    }

    public static num2Text(number: number): string {
        if (number >= 0 && number <= 10) return Utils.NUMBER_WORDS_NORMAL[number];
        return number.toString();
    }

    public static num2Text2(number: number): string {
        if (number < 0) return number.toString(); //Can't really have the -10th of something
        if (number <= 10) return Utils.NUMBER_WORDS_POSITIONAL[number];
        switch (number % 10) {
            case 1: return number.toString() + "st";
            case 2: return number.toString() + "nd";
            case 3: return number.toString() + "rd";
            default:
        }
        return number.toString() + "th";
    }

    public static Num2Text(number: number): string {
        if (number >= 0 && number <= 10) return Utils.NUMBER_WORDS_CAPITAL[number];
        return number.toString();
    }

    // Basically, you pass an arbitrary-length list of arguments, and it returns one of them at random.
    // Accepts any type.
    // Can also accept a *single* array of items, in which case it picks from the array instead.
    // This lets you pre-construct the argument, to make things cleaner
    public static randomChoice(...args: any[]): any {
        var choice: number;
        if ((args.length == 1) && (Array.isArray(args[0]))) {
            choice = Math.floor(Math.round(Math.random() * (args[0].length - 1)));
            return args[0][choice];
        }
        else {
            choice = Math.floor(Math.round(Math.random() * (args.length - 1)));
            return args[choice];
        }
    }

    public static randomChoiceTyped<T>(optionArray: Array<T>): T {
        return optionArray[this.rand(optionArray.length)];
    }

    public static rand(max: number): number {
        return Math.floor(Math.random() * max);
    }

    public static validateNonNegativeNumberFields(o: Record<string, any>, func: string, nnf: any[]): string {
        var error: string = "";
        for (var field of nnf) {
            if (!(field in o) || !(typeof o[field] == 'number') && o[field] != undefined) error += "Misspelling in " + func + ".nnf: '" + field + "'. ";
            else if (o[field] == undefined) error += "Null '" + field + "'. ";
            else if (o[field] < 0) error += "Negative '" + field + "'. ";
        }
        return error;
    }

    public static validateNonEmptyStringFields(o: Record<string, any>, func: string, nef: any[]): string {
        var error: string = "";
        for (var field of nef) {
            if (!(field in o) || !(typeof o[field] == 'string') && o[field] != undefined) error += "Misspelling in " + func + ".nef: '" + field + "'. ";
            else if (o[field] == undefined) error += "Null '" + field + "'. ";
            else if (o[field] == "") error += "Empty '" + field + "'. ";
        }
        return error;
    }

    /* None of these functions are called anymore
    // lazy(obj,arg1,...,argN)() = obj[arg1]...[argN]
    public static  lazyIndex(obj: any,...args){
        return function(): any{
            while(args.length>0)
                obj=obj[args.shift()];
            return obj;
        };
    }
    // lazy2(func,arg1,...,argN)() = func()[arg1]...[argN]
    public static  lazyCallIndex(func,...args){
    var  _args: any[] = args.slice();
        return function(): any{
        var  obj: any=func();
        var  __args: any[] = _args.slice();
            while(__args.length>0)
                obj=obj[__args.shift()];
            return obj
        };
    }
    // lazy2(func,arg1,...,argN)(args2) = func()[arg1]...[argN](args2)
    public static  lazyCallIndexCall(func,...args){
    var  _args: any[] = args.slice();
        return function (...fargs): any{
        var  obj: any=func();
        var  __args: any[] = _args.slice();
            while(__args.length>0)
                obj=obj[__args.shift()];
            return obj.apply(undefined,fargs);
        };
    }
    */
}

