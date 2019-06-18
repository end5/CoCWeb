define(["require", "exports", "../CoC_Settings", "../../ClassBinder"], function (require, exports, CoC_Settings_1, ClassBinder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 18.01.14.
     */
    class Utils {
        constructor() {
            ClassBinder_1.bindToClass(this);
        }
        // curryFunction(f,args1)(args2)=f(args1.concat(args2))
        // e.g. curryFunction(f,x,y)(z,w) = f(x,y,z,w)
        static curry(func, ...args) {
            if (func == undefined)
                CoC_Settings_1.CoC_Settings.error("carryFunction(undefined," + args + ")");
            return function (...args2) {
                return func.apply(undefined, args.concat(args2));
            };
        }
        static formatStringArray(stringList) {
            switch (stringList.length) {
                case 0: return "";
                case 1: return stringList[0];
                case 2: return stringList[0] + " and " + stringList[1];
                default:
            }
            var concat = stringList[0];
            for (var x = 1; x < stringList.length - 1; x++)
                concat += ", " + stringList[x];
            return concat + " and " + stringList[stringList.length - 1];
        }
        static num2Text(number) {
            if (number >= 0 && number <= 10)
                return Utils.NUMBER_WORDS_NORMAL[number];
            return number.toString();
        }
        static num2Text2(number) {
            if (number < 0)
                return number.toString(); //Can't really have the -10th of something
            if (number <= 10)
                return Utils.NUMBER_WORDS_POSITIONAL[number];
            switch (number % 10) {
                case 1: return number.toString() + "st";
                case 2: return number.toString() + "nd";
                case 3: return number.toString() + "rd";
                default:
            }
            return number.toString() + "th";
        }
        static Num2Text(number) {
            if (number >= 0 && number <= 10)
                return Utils.NUMBER_WORDS_CAPITAL[number];
            return number.toString();
        }
        // Basically, you pass an arbitrary-length list of arguments, and it returns one of them at random.
        // Accepts any type.
        // Can also accept a *single* array of items, in which case it picks from the array instead.
        // This lets you pre-construct the argument, to make things cleaner
        static randomChoice(...args) {
            var choice;
            if ((args.length == 1) && (Array.isArray(args[0]))) {
                choice = Math.floor(Math.round(Math.random() * (args[0].length - 1)));
                return args[0][choice];
            }
            else {
                choice = Math.floor(Math.round(Math.random() * (args.length - 1)));
                return args[choice];
            }
        }
        static rand(max) {
            return Math.floor(Math.random() * max);
        }
        static validateNonNegativeNumberFields(o, func, nnf) {
            var error = "";
            for (var field of nnf) {
                if (!(field in o) || !(typeof o[field] == 'number') && o[field] != undefined)
                    error += "Misspelling in " + func + ".nnf: '" + field + "'. ";
                else if (o[field] == undefined)
                    error += "Null '" + field + "'. ";
                else if (o[field] < 0)
                    error += "Negative '" + field + "'. ";
            }
            return error;
        }
        static validateNonEmptyStringFields(o, func, nef) {
            var error = "";
            for (var field of nef) {
                if (!(field in o) || !(typeof o[field] == 'string') && o[field] != undefined)
                    error += "Misspelling in " + func + ".nef: '" + field + "'. ";
                else if (o[field] == undefined)
                    error += "Null '" + field + "'. ";
                else if (o[field] == "")
                    error += "Empty '" + field + "'. ";
            }
            return error;
        }
    }
    Utils.NUMBER_WORDS_NORMAL = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    Utils.NUMBER_WORDS_CAPITAL = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    Utils.NUMBER_WORDS_POSITIONAL = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
    exports.Utils = Utils;
});
//# sourceMappingURL=Utils.js.map