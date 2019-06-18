define(["require", "exports", "../../console", "./conditionalConverters", "./singleArgLookups", "./doubleArgLookups", "../../showdown/Showdown", "../../ClassBinder"], function (require, exports, console_1, conditionalConverters_1, singleArgLookups_1, doubleArgLookups_1, Showdown_1, ClassBinder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Parser {
        constructor(ownerClass, settingsClass) {
            this.sceneParserDebug = false;
            this.mainParserDebug = false;
            this.lookupParserDebug = false;
            this.conditionalDebug = false;
            this.printCcntentDebug = false;
            this.printConditionalEvalDebug = false;
            this.printIntermediateParseStateDebug = false;
            this.logErrors = true;
            /*
            Parser Syntax:
        
            // Querying simple PC stat nouns:
                [noun]
        
            Conditional statements:
            // Simple if statement:
                [if (condition) OUTPUT_IF_TRUE]
            // If-Else statement
                [if (condition) OUTPUT_IF_TRUE | OUTPUT_IF_FALSE]
                // Note - Implicit else indicated by presence of the "|"
        
            // Object aspect descriptions
                [object aspect]
                // gets the description of aspect "aspect" of object/NPC/PC "object"
                // Eventually, I want this to be able to use introspection to access class attributes directly
                // Maybe even manipulate them, though I haven't thought that out much at the moment.
        
            // Gender Pronoun Weirdness:
            // PRONOUNS: The parser uses Elverson/Spivak Pronouns specifically to allow characters to be written with non-specific genders.
            // http://en.wikipedia.org/wiki/Spivak_pronoun
            //
            // Cheat Table:
            //           | Subject    | Object       | Possessive Adjective | Possessive Pronoun | Reflexive         |
            // Agendered | ey laughs  | I hugged em  | eir heart warmed     | that is eirs       | ey loves emself   |
            // Masculine | he laughs  | I hugged him | his heart warmed     | that is his        | he loves himself  |
            // Feminine  | she laughs | I hugged her | her heart warmed     | that is hers       | she loves herself |
        
        
        
            [screen (SCREEN_NAME) | screen text]
                // creates a new screen/page.
        
            [button (SCREEN_NAME)| button_text]
                // Creates a button which jumps to SCREEN_NAME when clicked
        
            */
            // this.parserState is used to store the scene-parser state.
            // it is cleared every time recursiveParser is called, and then any scene tags are added
            // as parserState["sceneName"] = "scene content"
            this.parserState = new Object();
            this.buttonNum = 0;
            this._ownerClass = ownerClass;
            this._settingsClass = settingsClass;
            ClassBinder_1.bindToClass(this);
        }
        // provides singleArgConverters
        // include "./singleArgLookups.as";
        // Does lookup of single argument tags ("[cock]", "[armor]", etc...) in singleArgConverters
        // Supported variables are the options listed in the above
        // singleArgConverters object. If the passed argument is found in the above object,
        // the corresponding anonymous function is called, and it's return-value is returned.
        // If the arg is not present in the singleArgConverters object, an error message is
        // returned.
        // ALWAYS returns a string
        convertSingleArg(arg) {
            var argResult;
            var capitalize = this.isUpperCase(arg.charAt(0));
            var argLower;
            argLower = arg.toLowerCase();
            if (argLower in singleArgLookups_1.singleArgConverters) {
                //if (logErrors) trace("WARNING: Found corresponding anonymous function");
                argResult = singleArgLookups_1.singleArgConverters[argLower](this._ownerClass);
                if (this.lookupParserDebug)
                    console_1.trace("WARNING: Called, return = ", argResult);
                if (capitalize)
                    argResult = this.capitalizeFirstWord(argResult);
                return argResult;
            }
            else {
                // ---------------------------------------------------------------------------------
                // TODO: Get rid of this shit.
                // UGLY hack to patch legacy functionality in TiTS
                // This needs to go eventually
                var descriptorArray = arg.split(".");
                obj = this.getObjectFromString(this._ownerClass, descriptorArray[0]);
                if (obj == undefined) // Completely bad tag
                 {
                    if (this.lookupParserDebug || this.logErrors)
                        console_1.trace("WARNING: Unknown subject in " + arg);
                    return "<b>!Unknown subject in \"" + arg + "\"!</b>";
                }
                if (obj.hasOwnProperty("getDescription") && arg.indexOf(".") > 0) {
                    return obj.getDescription(descriptorArray[1], "");
                }
                // end hack
                // ---------------------------------------------------------------------------------
                if (this.lookupParserDebug)
                    console_1.trace("WARNING: Lookup Arg = ", arg);
                var obj;
                obj = this.getObjectFromString(this._ownerClass, arg);
                if (obj != undefined) {
                    if (typeof obj == 'function') {
                        if (this.lookupParserDebug)
                            console_1.trace("WARNING: Found corresponding function in owner class");
                        return obj();
                    }
                    else {
                        if (this.lookupParserDebug)
                            console_1.trace("WARNING: Found corresponding aspect in owner class");
                        return String(obj); // explicit cast probably not needed
                    }
                }
                else {
                    if (this.lookupParserDebug || this.logErrors)
                        console_1.trace("WARNING: No lookup found for", arg, " search result is: ", obj);
                    return "<b>!Unknown tag \"" + arg + "\"!</b>";
                }
            }
        }
        // provides twoWordNumericTagsLookup and twoWordTagsLookup, which use
        // cockLookups/cockHeadLookups, and rubiLookups/arianLookups respectively
        // include "./doubleArgLookups.as";
        convertDoubleArg(inputArg) {
            var argResult;
            var thing;
            var argTemp = inputArg.split(" ");
            if (argTemp.length != 2) {
                if (this.logErrors)
                    console_1.trace("WARNING: Not actually a two word tag! " + inputArg);
                return "<b>!Not actually a two-word tag!\"" + inputArg + "\"!</b>";
            }
            var subject = argTemp[0];
            var aspect = argTemp[1];
            var subjectLower = argTemp[0].toLowerCase();
            var aspectLower = argTemp[1].toLowerCase();
            if (this.lookupParserDebug)
                console_1.trace("WARNING: Doing lookup for subject", subject, " aspect ", aspect);
            // Figure out if we need to capitalize the resulting text
            var capitalize = this.isUpperCase(aspect.charAt(0));
            // Only perform lookup in twoWordNumericTagsLookup if aspect can be cast to a valid number
            if ((subjectLower in doubleArgLookups_1.twoWordNumericTagsLookup) && !isNaN(Number(aspect))) {
                aspectLower = Number(aspectLower);
                if (this.lookupParserDebug)
                    console_1.trace("WARNING: Found corresponding anonymous function");
                argResult = doubleArgLookups_1.twoWordNumericTagsLookup[subjectLower](this._ownerClass, aspectLower);
                if (capitalize)
                    argResult = this.capitalizeFirstWord(argResult);
                if (this.lookupParserDebug)
                    console_1.trace("WARNING: Called two word numeric lookup, return = ", argResult);
                return argResult;
            }
            // aspect isn't a number. Look for subject in the normal twoWordTagsLookup
            if (subjectLower in doubleArgLookups_1.twoWordTagsLookup) {
                if (aspectLower in doubleArgLookups_1.twoWordTagsLookup[subjectLower]) {
                    if (this.lookupParserDebug)
                        console_1.trace("WARNING: Found corresponding anonymous function");
                    argResult = doubleArgLookups_1.twoWordTagsLookup[subjectLower][aspectLower](this._ownerClass);
                    if (capitalize)
                        argResult = this.capitalizeFirstWord(argResult);
                    if (this.lookupParserDebug)
                        console_1.trace("WARNING: Called two word lookup, return = ", argResult);
                    return argResult;
                }
                else {
                    if (this.logErrors)
                        console_1.trace("WARNING: Unknown aspect in two-word tag. Arg: " + inputArg + " Aspect: " + aspectLower);
                    return "<b>!Unknown aspect in two-word tag \"" + inputArg + "\"! ASCII Aspect = \"" + aspectLower + "\"</b>";
                }
            }
            if (this.lookupParserDebug)
                console_1.trace("WARNING: trying to look-up two-word tag in parent");
            // ---------------------------------------------------------------------------------
            // TODO: Get rid of this shit.
            // UGLY hack to patch legacy functionality in TiTS
            // This needs to go eventually
            var descriptorArray = subject.split(".");
            thing = this.getObjectFromString(this._ownerClass, descriptorArray[0]);
            if (thing == undefined) // Completely bad tag
             {
                if (this.logErrors)
                    console_1.trace("WARNING: Unknown subject in " + inputArg);
                return "<b>!Unknown subject in \"" + inputArg + "\"!</b>";
            }
            if (thing.hasOwnProperty("getDescription") && subject.indexOf(".") > 0) {
                if (argTemp.length > 1) {
                    return thing.getDescription(descriptorArray[1], aspect);
                }
                else {
                    return thing.getDescription(descriptorArray[1], "");
                }
            }
            // end hack
            // ---------------------------------------------------------------------------------
            var aspectLookup = this.getObjectFromString(this._ownerClass, aspect);
            if (thing != undefined) {
                if (typeof thing == 'function') {
                    if (this.lookupParserDebug)
                        console_1.trace("WARNING: Found corresponding function in owner class");
                    return thing(aspect);
                }
                else if (Array.isArray(typeof thing)) {
                    var indice = Number(aspectLower);
                    if (isNaN(indice)) {
                        if (this.logErrors)
                            console_1.trace("WARNING: Cannot use non-number as indice to Array. Arg " + inputArg + " Subject: " + subject + " Aspect: " + aspect);
                        return "<b>Cannot use non-number as indice to Array \"" + inputArg + "\"! Subject = \"" + subject + ", Aspect = " + aspect + "\</b>";
                    }
                    else
                        return thing[indice];
                }
                else if (typeof thing == 'object') {
                    if (thing.hasOwnProperty(aspectLookup))
                        return thing[aspectLookup];
                    else if (thing.hasOwnProperty(aspect))
                        return thing[aspect];
                    else {
                        if (this.logErrors)
                            console_1.trace("WARNING: Record<string, any> does not have aspect as a member. Arg: " + inputArg + " Subject: " + subject + " Aspect:" + aspect + " or " + aspectLookup);
                        return "<b>Object does not have aspect as a member \"" + inputArg + "\"! Subject = \"" + subject + ", Aspect = " + aspect + " or " + aspectLookup + "\</b>";
                    }
                }
                else {
                    // This will work, but I don't know why you'd want to
                    // the aspect is just ignored
                    if (this.lookupParserDebug)
                        console_1.trace("WARNING: Found corresponding aspect in owner class");
                    return String(thing);
                }
            }
            if (this.lookupParserDebug || this.logErrors)
                console_1.trace("WARNING: No lookup found for", inputArg, " search result is: ", thing);
            return "<b>!Unknown subject in two-word tag \"" + inputArg + "\"! Subject = \"" + subject + ", Aspect = " + aspect + "\</b>";
            // return "<b>!Unknown tag \"" + arg + "\"!</b>";
            return argResult;
        }
        // Provides the conditionalOptions object
        // include "./conditionalConverters.as";
        // converts a single argument to a conditional to
        // the relevant value, either by simply converting to a Number, or
        // through lookup in the above conditionalOptions oject, and then calling the
        // relevant function
        // Realistally, should only return either boolean or numbers.
        convertConditionalArgumentFromStr(arg) {
            // convert the string contents of a conditional argument into a meaningful variable.
            var argLower = arg.toLowerCase();
            var argResult = -1;
            // Note: Case options MUST be ENTIRELY lower case. The comparaison string is converted to
            // lower case before the switch:case section
            // Try to cast to a number. If it fails, go on with the switch/case statement.
            if (!isNaN(Number(arg))) {
                if (this.printConditionalEvalDebug)
                    console_1.trace("WARNING: Converted to float. Number = ", Number(arg));
                return Number(arg);
            }
            if (argLower in conditionalConverters_1.conditionalOptions) {
                if (this.printConditionalEvalDebug)
                    console_1.trace("WARNING: Found corresponding anonymous function");
                argResult = conditionalConverters_1.conditionalOptions[argLower](this._ownerClass);
                if (this.printConditionalEvalDebug)
                    console_1.trace("WARNING: Called, return = ", argResult);
                return argResult;
            }
            var obj = this.getObjectFromString(this._ownerClass, arg);
            if (this.printConditionalEvalDebug)
                console_1.trace("WARNING: Looked up ", arg, " in ", this._ownerClass, "Result was:", obj);
            if (obj != undefined) {
                if (this.printConditionalEvalDebug)
                    console_1.trace("WARNING: Found corresponding function for conditional argument lookup.");
                if (typeof obj == 'function') {
                    if (this.printConditionalEvalDebug)
                        console_1.trace("WARNING: Found corresponding function in owner class");
                    argResult = Number(obj());
                    return argResult;
                }
                else {
                    if (this.printConditionalEvalDebug)
                        console_1.trace("WARNING: Found corresponding aspect in owner class");
                    argResult = Number(obj);
                    return argResult;
                }
            }
            else {
                if (this.printConditionalEvalDebug || this.logErrors)
                    console_1.trace("WARNING: No lookups found!");
                return undefined;
            }
            // if (this.printConditionalEvalDebug || LogErrors) trace("WARNING: Could not convert to number. Evaluated ", arg, " as", argResult)
            // return argResult;
        }
        // Evaluates the conditional section of an if-statement.
        // Does the proper parsing and look-up of any of the special nouns
        // which can be present in the conditional
        evalConditionalStatementStr(textCond) {
            // Evaluates a conditional statement:
            // (varArg1 [conditional] varArg2)
            // varArg1 & varArg2 can be either numbers, or any of the
            // strings in the "conditionalOptions" object above.
            // numbers (which are in string format) are converted to a Number type
            // prior to comparison.
            // supports multiple comparison operators:
            // "=", "=="  - Both are Equals or equivalent-to operators
            // "<", ">    - Less-Than and Greater-Than
            // "<=", ">=" - Less-than or equal, greater-than or equal
            // "!="       - Not equal
            // proper, nested parsing of statements is a WIP
            // and not supported at this time.
            var isExp = /([\w\.]+)\s?(==|=|!=|<|>|<=|>=)\s?([\w\.]+)/;
            var expressionResult = isExp.exec(textCond);
            if (!expressionResult) {
                var condArg = this.convertConditionalArgumentFromStr(textCond);
                if (condArg != undefined) {
                    if (this.printConditionalEvalDebug)
                        console_1.trace("WARNING: Conditional \"", textCond, "\" Evalueated to: \"", condArg, "\"");
                    return condArg;
                }
                else {
                    if (this.logErrors)
                        console_1.trace("WARNING: Invalid conditional! \"(", textCond, ")\" Conditionals must be in format:");
                    if (this.logErrors)
                        console_1.trace("WARNING:  \"({statment1} (==|=|!=|<|>|<=|>=) {statement2})\" or \"({valid variable/function name})\". ");
                    return false;
                }
            }
            if (this.printConditionalEvalDebug)
                console_1.trace("WARNING: Expression = ", textCond, "Expression result = [", expressionResult, "], length of = ", expressionResult.length);
            var condArgStr1 = expressionResult[1];
            var operator = expressionResult[2];
            var condArgStr2 = expressionResult[3];
            var retVal = false;
            var condArg1 = this.convertConditionalArgumentFromStr(condArgStr1);
            var condArg2 = this.convertConditionalArgumentFromStr(condArgStr2);
            //Perform check
            if (operator == "=")
                retVal = (condArg1 == condArg2);
            else if (operator == ">")
                retVal = (condArg1 > condArg2);
            else if (operator == "==")
                retVal = (condArg1 == condArg2);
            else if (operator == "<")
                retVal = (condArg1 < condArg2);
            else if (operator == ">=")
                retVal = (condArg1 >= condArg2);
            else if (operator == "<=")
                retVal = (condArg1 <= condArg2);
            else if (operator == "!=")
                retVal = (condArg1 != condArg2);
            else
                retVal = (condArg1 != condArg2);
            if (this.printConditionalEvalDebug)
                console_1.trace("WARNING: Check: " + condArg1 + " " + operator + " " + condArg2 + " result: " + retVal);
            return retVal;
        }
        // Splits the result from an if-statement.
        // ALWAYS returns an array with two strings.
        // if there is no else, the second string is empty.
        splitConditionalResult(textCtnt) {
            // Splits the conditional section of an if-statemnt in to two results:
            // [if (condition) OUTPUT_IF_TRUE]
            //                 ^ This Bit   ^
            // [if (condition) OUTPUT_IF_TRUE | OUTPUT_IF_FALSE]
            //                 ^          This Bit            ^
            // If there is no OUTPUT_IF_FALSE, returns an empty string for the second option.
            if (this.conditionalDebug)
                console_1.trace("WARNING: ------------------4444444444444444444444444444444444444444444444444444444444-----------------------");
            if (this.conditionalDebug)
                console_1.trace("WARNING: Split Conditional input string: ", textCtnt);
            if (this.conditionalDebug)
                console_1.trace("WARNING: ------------------4444444444444444444444444444444444444444444444444444444444-----------------------");
            var ret = new Array("", "");
            var i;
            var sectionStart = 0;
            var section = 0;
            var nestLevel = 0;
            for (i = 0; i < textCtnt.length; i += 1) {
                switch (textCtnt.charAt(i)) {
                    case "[": //Statement is nested one level deeper
                        nestLevel += 1;
                        break;
                    case "]": //exited one level of nesting.
                        nestLevel -= 1;
                        break;
                    case "|": // At a conditional split
                        if (nestLevel == 0) // conditional split is only valid in this context if we're not in a nested bracket.
                         {
                            if (section == 1) // barf if we hit a second "|" that's not in brackets
                             {
                                if (this._settingsClass.haltOnErrors)
                                    throw new Error("Nested IF statements still a WIP");
                                ret = ["<b>Error! Too many options in if statement!</b>",
                                    "<b>Error! Too many options in if statement!</b>"];
                            }
                            else {
                                ret[section] = textCtnt.substring(sectionStart, i);
                                sectionStart = i + 1;
                                section += 1;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            ret[section] = textCtnt.substring(sectionStart, textCtnt.length);
            if (this.conditionalDebug)
                console_1.trace("WARNING: ------------------5555555555555555555555555555555555555555555555555555555555-----------------------");
            if (this.conditionalDebug)
                console_1.trace("WARNING: Outputs: ", ret);
            if (this.conditionalDebug)
                console_1.trace("WARNING: ------------------5555555555555555555555555555555555555555555555555555555555-----------------------");
            return ret;
        }
        // Called to evaluate a if statment string, and return the evaluated result.
        // Returns an empty string ("") if the conditional rvaluates to false, and there is no else
        // option.
        parseConditional(textCtnt, depth) {
            // NOTE: enclosing brackets are *not* included in the actual textCtnt string passed into this function
            // they're shown in the below examples simply for clarity's sake.
            // And because that's what the if-statements look like in the raw string passed into the parser
            // The brackets are actually removed earlier on by the recParser() step.
            // parseConditional():
            // Takes the contents of an if statement:
            // [if (condition) OUTPUT_IF_TRUE]
            // [if (condition) OUTPUT_IF_TRUE | OUTPUT_IF_FALSE]
            // splits the contents into an array as such:
            // ["condition", "OUTPUT_IF_TRUE"]
            // ["condition", "OUTPUT_IF_TRUE | OUTPUT_IF_FALSE"]
            // Finally, evalConditionalStatementStr() is called on the "condition", the result
            // of which is used to determine which content-section is returned
            //
            // TODO: (NOT YET) Allows nested condition parenthesis, because I'm masochistic
            // POSSIBLE BUG: A actual statement starting with "if" could be misinterpreted as an if-statement
            // It's unlikely, but I *could* see it happening.
            // I need to do some testing
            // ~~~~Fake-Name
            if (this.conditionalDebug)
                console_1.trace("WARNING: ------------------2222222222222222222222222222222222222222222222222222222222-----------------------");
            if (this.conditionalDebug)
                console_1.trace("WARNING: If input string: ", textCtnt);
            if (this.conditionalDebug)
                console_1.trace("WARNING: ------------------2222222222222222222222222222222222222222222222222222222222-----------------------");
            var ret = new Array("", "", ""); // first string is conditional, second string is the output
            var i = 0;
            var parenthesisCount = 0;
            //var ifText;
            var conditional;
            var output;
            var condStart = textCtnt.indexOf("(");
            if (condStart != -1) // If we have any open parenthesis
             {
                for (i = condStart; i < textCtnt.length; i += 1) {
                    if (textCtnt.charAt(i) == "(") {
                        parenthesisCount += 1;
                    }
                    else if (textCtnt.charAt(i) == ")") {
                        parenthesisCount -= 1;
                    }
                    if (parenthesisCount == 0) // We've found the matching closing bracket for the opening bracket at textCtnt[condStart]
                     {
                        // Pull out the conditional, and then evaluate it.
                        conditional = textCtnt.substring(condStart + 1, i);
                        conditional = this.evalConditionalStatementStr(conditional);
                        // Make sure the contents of the if-statement have been evaluated to a plain-text string before trying to
                        // split the base-level if-statement on the "|"
                        output = textCtnt.substring(i + 1, textCtnt.length);
                        // And now do the actual splitting.
                        output = this.splitConditionalResult(output);
                        // LOTS of debugging
                        if (this.conditionalDebug)
                            console_1.trace("WARNING: prefix = '", ret[0], "' conditional = ", conditional, " content = ", output);
                        if (this.conditionalDebug)
                            console_1.trace("WARNING: -0--------------------------------------------------");
                        if (this.conditionalDebug)
                            console_1.trace("WARNING: Content Item 1 = ", output[0]);
                        if (this.conditionalDebug)
                            console_1.trace("WARNING: -1--------------------------------------------------");
                        if (this.conditionalDebug)
                            console_1.trace("WARNING: Item 2 = ", output[1]);
                        if (this.conditionalDebug)
                            console_1.trace("WARNING: -2--------------------------------------------------");
                        if (conditional)
                            return this.recParser(output[0], depth);
                        else
                            return this.recParser(output[1], depth);
                    }
                }
            }
            else {
                if (this._settingsClass.haltOnErrors)
                    throw new Error("Invalid if statement!" + textCtnt);
                return "<b>Invalid IF Statement<b/>" + textCtnt;
            }
            return "";
        }
        // ---------------------------------------------------------------------------------------------------------------------------------------
        // SCENE PARSING ---------------------------------------------------------------------------------------------------------------
        // ---------------------------------------------------------------------------------------------------------------------------------------
        // attempt to return function "inStr" that is a member of "localThis"
        // Properly handles nested classes/objects, e.g. localThis.herp.derp
        // is returned by getFuncFromString(localThis, "herp.derp");
        // returns the relevant function if it exists, undefined if it does not.
        getObjectFromString(localThis, inStr) {
            if (inStr in localThis) {
                if (this.lookupParserDebug)
                    console_1.trace("WARNING: item: ", inStr, " in: ", localThis);
                return localThis[inStr];
            }
            if (inStr.indexOf('.') > 0) // *should* be > -1, but if the string starts with a dot, it can't be a valid reference to a nested class anyways.
             {
                var localReference;
                var itemName;
                localReference = inStr.substr(0, inStr.indexOf('.'));
                itemName = inStr.substr(inStr.indexOf('.') + 1);
                // Debugging, what debugging?
                if (this.lookupParserDebug)
                    console_1.trace("WARNING: localReference = ", localReference);
                if (this.lookupParserDebug)
                    console_1.trace("WARNING: itemName = ", itemName);
                if (this.lookupParserDebug)
                    console_1.trace("WARNING: localThis = \"", localThis, "\"");
                if (this.lookupParserDebug)
                    console_1.trace("WARNING: dereferenced = ", localThis[localReference]);
                // If we have the localReference as a member of the localThis, call this function again to further for
                // the item itemName in localThis[localReference]
                // This allows arbitrarily-nested data-structures, by recursing over the . structure in inStr
                if (localReference in localThis) {
                    if (this.lookupParserDebug)
                        console_1.trace("WARNING: have localReference:", localThis[localReference]);
                    return this.getObjectFromString(localThis[localReference], itemName);
                }
                else {
                    return undefined;
                }
            }
            if (this.lookupParserDebug)
                console_1.trace("WARNING: item: ", inStr, " NOT in: ", localThis);
            return undefined;
        }
        getSceneSectionToInsert(inputArg) {
            var argTemp = inputArg.split(" ");
            if (argTemp.length != 2) {
                return "<b>!Not actually a valid insertSection tag:!\"" + inputArg + "\"!</b>";
            }
            var callName = argTemp[0];
            var sceneName = argTemp[1];
            var callNameLower = argTemp[0].toLowerCase();
            if (this.sceneParserDebug)
                console_1.trace("WARNING: Doing lookup for sceneSection tag:", callName, " scene name: ", sceneName);
            // this should have been checked before calling.
            if (callNameLower != "insertsection")
                throw new Error("Wat?");
            if (sceneName in this.parserState) {
                if (this.sceneParserDebug)
                    console_1.trace("WARNING: Have sceneSection \"" + sceneName + "\". Parsing and setting up menu");
                this.buttonNum = 0; // Clear the button number, so we start adding buttons from button 0
                // Split up into multiple variables for debugging (it was crashing at one point. Separating the calls let me delineate what was crashing)
                var tmp1 = this.parserState[sceneName];
                var tmp2 = this.recParser(tmp1, 0); // we have to actually parse the scene now
                var tmp3 = Showdown_1.Showdown.makeHtml(tmp2);
                return tmp3; // and then stick it on the display
                //if (sceneParserDebug) trace("WARNING: Scene contents: \"" + tmp1 + "\" as parsed: \"" + tmp2 + "\"")
            }
            else {
                return "Insert sceneSection called with unknown arg \"" + sceneName + "\". falling back to the debug pane";
            }
        }
        // TODO: Make failed scene button lookups fail in a debuggable manner!
        // Parser button event handler
        // This is the event bound to all button events, as well as the function called
        // to enter the parser's cached scenes. If you pass recursiveParser a set of scenes including a scene named
        // "startup", the parser will not exit normally, and will instead enter the "startup" scene at the completion of parsing the
        // input string.
        //
        // the passed seneName string is preferentially looked-up in the cached scene array, and if there is not a cached scene of name sceneName
        // in the cache, it is then looked for as a member of _ownerClass.
        // if the function name is not found in either context, an error *should* be thrown, but at the moment,
        // it just returns to the debugPane
        //
        enterParserScene(sceneName) {
            /*
            if (sceneParserDebug) trace("WARNING: this.parserStateContents:")
            for (var prop in this.parserState)
            {
                if (sceneParserDebug) trace("WARNING: this.parserState."+prop+" = "+this.parserState[prop]);
            }
            */
            var ret = "";
            if (this.sceneParserDebug)
                console_1.trace("WARNING: Entering parser scene: \"" + sceneName + "\"");
            if (this.sceneParserDebug)
                console_1.trace("WARNING: Do we have the scene name? ", sceneName in this.parserState);
            if (sceneName == "exit") {
                if (this.sceneParserDebug)
                    console_1.trace("WARNING: Enter scene called to exit");
                //doNextClear(debugPane);
                // TODO:
                // This needs to change to something else anyways. I need to add the ability to
                // tell the parser where to exit to at some point
                this._ownerClass.debugPane();
            }
            else if (sceneName in this.parserState) {
                if (this.sceneParserDebug)
                    console_1.trace("WARNING: Have scene \"" + sceneName + "\". Parsing and setting up menu");
                this._ownerClass.menu();
                this.buttonNum = 0; // Clear the button number, so we start adding buttons from button 0
                var tmp1 = this.parserState[sceneName];
                var tmp2 = this.recParser(tmp1, 0); // we have to actually parse the scene now
                ret = Showdown_1.Showdown.makeHtml(tmp2);
                this._ownerClass.rawOutputText(ret, true); // and then stick it on the display
                //if (sceneParserDebug) trace("WARNING: Scene contents: \"" + tmp1 + "\" as parsed: \"" + tmp2 + "\"")
                if (this.sceneParserDebug)
                    console_1.trace("WARNING: Scene contents after markdown: \"" + ret + "\"");
            }
            else if (this.getObjectFromString(this._ownerClass, sceneName) != undefined) {
                if (this.sceneParserDebug)
                    console_1.trace("WARNING: Have function \"" + sceneName + "\" in this!. Calling.");
                this.getObjectFromString(this._ownerClass, sceneName)();
            }
            else {
                console_1.trace("WARNING: Enter scene called with unknown arg/function \"" + sceneName + "\". falling back to the debug pane");
                this._ownerClass.doNext(this._ownerClass.debugPane);
            }
            return ret;
        }
        // Parses the contents of a scene tag, shoves the unprocessed text in the scene object (this.parserState)
        // under the proper name.
        // Scenes tagged as such:
        //
        // [sceneName | scene contents blaugh]
        //
        // This gets placed in this.parserState so this.parserState["sceneName"] == "scene contents blaugh"
        //
        // Note that parsing of the actual scene contents is deferred untill it's actually called for display.
        parseSceneTag(textCtnt) {
            var sceneName;
            var sceneCont;
            sceneName = textCtnt.substring(textCtnt.indexOf(' '), textCtnt.indexOf('|'));
            sceneCont = textCtnt.substr(textCtnt.indexOf('|') + 1);
            sceneName = this.stripStr(sceneName);
            if (this.sceneParserDebug)
                console_1.trace("WARNING: Adding scene with name \"" + sceneName + "\"");
            // Cleanup the scene content from spurious leading and trailing space.
            sceneCont = this.trimStr(sceneCont, "\n");
            sceneCont = this.trimStr(sceneCont, "	");
            this.parserState[sceneName] = this.stripStr(sceneCont);
        }
        // Evaluates the contents of a button tag, and instantiates the relevant button
        // Current syntax:
        //
        // [button function_name | Button Name]
        // where "button" is a constant string, "function_name" is the name of the function pressing the button will call,
        // and "Button Name" is the text that will be shown on the button.
        // Note that the function name cannot contain spaces (actionscript requires this), and is case-sensitive
        // "Button name" can contain arbitrary spaces or characters, excepting "]", "[" and "|"
        parseButtonTag(textCtnt) {
            // TODO: Allow button positioning!
            var arr = textCtnt.split("|");
            if (arr.length > 2) {
                if (this._settingsClass.haltOnErrors)
                    throw new Error("");
                throw new Error("Too many items in button");
            }
            var buttonName = this.stripStr(arr[1]);
            var buttonFunc = this.stripStr(arr[0].substring(arr[0].indexOf(' ')));
            //trace("WARNING: adding a button with name\"" + buttonName + "\" and function \"" + buttonFunc + "\"");
            this._ownerClass.addButton(this.buttonNum, buttonName, this.enterParserScene, buttonFunc);
            this.buttonNum += 1;
        }
        // pushes the contents of the passed string into the scene list object if it's a scene, or instantiates the named button if it's a button
        // command and returns an empty string.
        // if the contents are not a button or scene contents, returns the contents.
        evalForSceneControls(textCtnt) {
            if (this.sceneParserDebug)
                console_1.trace("WARNING: Checking for scene tags.");
            if (textCtnt.toLowerCase().indexOf("screen") == 0) {
                if (this.sceneParserDebug)
                    console_1.trace("WARNING: It's a scene");
                this.parseSceneTag(textCtnt);
                return "";
            }
            else if (textCtnt.toLowerCase().indexOf("button") == 0) {
                if (this.sceneParserDebug)
                    console_1.trace("WARNING: It's a button add statement");
                this.parseButtonTag(textCtnt);
                return "";
            }
            return textCtnt;
        }
        isIfStatement(textCtnt) {
            if (textCtnt.toLowerCase().indexOf("if") == 0)
                return true;
            else
                return false;
        }
        // Called to determine if the contents of a bracket are a parseable statement or not
        // If the contents *are* a parseable, it calls the relevant function to evaluate it
        // if not, it simply returns the contents as passed
        parseNonIfStatement(textCtnt, depth) {
            var retStr = "";
            if (this.printCcntentDebug)
                console_1.trace("WARNING: Parsing content string: ", textCtnt);
            if (this.mainParserDebug)
                console_1.trace("WARNING: Not an if statement");
            // Match a single word, with no leading or trailing space
            var singleWordTagRegExp = /^[\w\.]+$/;
            var doubleWordTagRegExp = /^[\w\.]+\s[\w\.]+$/;
            if (this.mainParserDebug)
                console_1.trace("WARNING: string length = ", textCtnt.length);
            if (textCtnt.toLowerCase().indexOf("insertsection") == 0) {
                if (this.sceneParserDebug)
                    console_1.trace("WARNING: It's a scene section insert tag!");
                retStr = this.getSceneSectionToInsert(textCtnt);
            }
            else if (singleWordTagRegExp.exec(textCtnt)) {
                if (this.mainParserDebug)
                    console_1.trace("WARNING: It's a single word!");
                retStr += this.convertSingleArg(textCtnt);
            }
            else if (doubleWordTagRegExp.exec(textCtnt)) {
                if (this.mainParserDebug)
                    console_1.trace("WARNING: Two-word tag!");
                retStr += this.convertDoubleArg(textCtnt);
            }
            else {
                if (this.mainParserDebug)
                    console_1.trace("WARNING: Cannot parse content. What?", textCtnt);
                retStr += "<b>!Unknown multi-word tag \"" + retStr + "\"!</b>";
            }
            return retStr;
        }
        // Actual internal parser function.
        // textCtnt is the text you want parsed, depth is a number that reflects the current recursion depth
        // You pass in the string you want parsed, and the parsed result is returned as a string.
        recParser(textCtnt, depth) {
            if (this.mainParserDebug)
                console_1.trace("WARNING: Recursion call", depth, "---------------------------------------------+++++++++++++++++++++");
            if (this.printIntermediateParseStateDebug)
                console_1.trace("WARNING: Parsing contents = ", textCtnt);
            // Depth tracks our recursion depth
            // Basically, we need to handle things differently on the first execution, so we don't mistake single-word print-statements for
            // a tag. Therefore, every call of recParser increments depth by 1
            depth += 1;
            textCtnt = String(textCtnt);
            if (textCtnt.length == 0) // Short circuit if we've been passed an empty string
                return "";
            var i = 0;
            var bracketCnt = 0;
            var lastBracket = -1;
            var retStr = "";
            do {
                lastBracket = textCtnt.indexOf("[", lastBracket + 1);
                if (textCtnt.charAt(lastBracket - 1) == "\\") {
                    // trace("WARNING: bracket is escaped 1", lastBracket);
                }
                else if (lastBracket != -1) {
                    // trace("WARNING: need to parse bracket", lastBracket);
                    break;
                }
            } while (lastBracket != -1);
            if (lastBracket != -1) // If we have any open brackets
             {
                for (i = lastBracket; i < textCtnt.length; i += 1) {
                    if (textCtnt.charAt(i) == "[") {
                        if (textCtnt.charAt(i - 1) != "\\") {
                            //trace("WARNING: bracket is not escaped - 2");
                            bracketCnt += 1;
                        }
                    }
                    else if (textCtnt.charAt(i) == "]") {
                        if (textCtnt.charAt(i - 1) != "\\") {
                            //trace("WARNING: bracket is not escaped - 3");
                            bracketCnt -= 1;
                        }
                    }
                    if (bracketCnt == 0) // We've found the matching closing bracket for the opening bracket at textCtnt[lastBracket]
                     {
                        var prefixTmp, postfixTmp;
                        // Only prepend the prefix if it actually has content.
                        prefixTmp = textCtnt.substring(0, lastBracket);
                        if (this.mainParserDebug)
                            console_1.trace("WARNING: prefix content = ", prefixTmp);
                        if (prefixTmp)
                            retStr += prefixTmp;
                        // We know there aren't any brackets in the section before the first opening bracket.
                        // therefore, we just add it to the returned string
                        var tmpStr = textCtnt.substring(lastBracket + 1, i);
                        tmpStr = this.evalForSceneControls(tmpStr);
                        // evalForSceneControls swallows scene controls, so they won't get parsed further now.
                        // therefore, you could *theoretically* have nested scene pages, though I don't know WHY you'd ever want that.
                        if (this.isIfStatement(tmpStr)) {
                            if (this.conditionalDebug)
                                console_1.trace("WARNING: early eval as if");
                            retStr += this.parseConditional(tmpStr, depth);
                            if (this.conditionalDebug)
                                console_1.trace("WARNING: ------------------0000000000000000000000000000000000000000000000000000000000000000-----------------------");
                            //trace("WARNING: Parsed Ccnditional - ", retStr)
                        }
                        else if (tmpStr) {
                            if (this.printCcntentDebug)
                                console_1.trace("WARNING: Parsing bracket contents = ", tmpStr);
                            retStr += this.parseNonIfStatement(this.recParser(tmpStr, depth), depth);
                        }
                        // First parse into the text in the brackets (to resolve any nested brackets)
                        // then, eval their contents, in case they're an if-statement or other control-flow thing
                        // I haven't implemented yet
                        // Only parse the trailing string if it has brackets in it.
                        // if not, we need to just return the string as-is.
                        // Parsing the trailing string if it doesn't have brackets could lead to it being
                        // incorrectly interpreted as a multi-word tag (and shit would asplode and shit)
                        postfixTmp = textCtnt.substring(i + 1, textCtnt.length);
                        if (postfixTmp.indexOf("[") != -1) {
                            if (this.printCcntentDebug)
                                console_1.trace("WARNING: Need to parse trailing text", postfixTmp);
                            retStr += this.recParser(postfixTmp, depth); // Parse the trailing text (if any)
                            // Note: This leads to LOTS of recursion. Since we basically call recParser once per
                            // tag, it means that if a body of text has 30 tags, we'll end up recursing at least
                            // 29 times before finishing.
                            // Making this tail-call reursive, or just parsing it flatly may be a much better option in
                            // the future, if this does become an issue.
                        }
                        else {
                            if (this.printCcntentDebug)
                                console_1.trace("WARNING: No brackets in trailing text", postfixTmp);
                            retStr += postfixTmp;
                        }
                        return retStr;
                        // and return the parsed string
                    }
                }
            }
            else {
                // DERP. We should never have brackets around something that ISN'T a tag intended to be parsed. Therefore, we just need
                // to determine what type of parsing should be done do the tag.
                if (this.printCcntentDebug)
                    console_1.trace("WARNING: No brackets present in text passed to recParse", textCtnt);
                retStr += textCtnt;
            }
            return retStr;
        }
        // Main parser function.
        // textCtnt is the text you want parsed, depth is a number, which should be 0
        // or not passed at all.
        // You pass in the string you want parsed, and the parsed result is returned as a string.
        recursiveParser(contents, parseAsMarkdown = false, prettyQuotes = true) {
            if (this.mainParserDebug)
                console_1.trace("WARNING: ------------------ Parser called on string -----------------------");
            // Eventually, when this goes properly class-based, we'll add a period, and have this.parserState.
            // Reset the parser's internal state, since we're parsing a new string:
            // trace("WARNING: Purging scene parser contents")
            this.parserState = new Object();
            var ret = "";
            // Run through the parser
            contents = contents.replace(/\\n/g, "\n");
            ret = this.recParser(contents, 0);
            if (this.printIntermediateParseStateDebug)
                console_1.trace("WARNING: Parser intermediate contents = ", ret);
            // Currently, not parsing text as markdown by default because it's fucking with the line-endings.
            if (prettyQuotes) {
                // Convert quotes to prettyQuotes
                ret = this.makeQuotesPrettah(ret);
                // Quote conversion has to go before markdown calls
            }
            // $> Dunno if showdown should be in here
            if (parseAsMarkdown) {
                // trace("WARNING: markdownificating");
                ret = Showdown_1.Showdown.makeHtml(ret);
                var regexPCloseTag = /<\/p>/gi;
                ret = ret.replace(regexPCloseTag, "</p>\n");
                // Finally, add a additional newline after each closing P tag, because flash only
                // outputs one newline per <p></p> tag, apparently flash again feels the need to be a special snowflake
            }
            // cleanup escaped brackets
            ret = ret.replace(/\\\]/g, "]");
            ret = ret.replace(/\\\[/g, "[");
            // And repeated spaces (this has to be done after markdown processing)
            ret = ret.replace(/  +/g, " ");
            /*
            for (var prop in this.parserState)
            {
                trace("WARNING: this.parserState."+prop+" = "+this.parserState[prop]);
            }
            */
            // Finally, if we have a parser-based scene. enter the "startup" scene.
            if ("startup" in this.parserState) {
                ret = this.enterParserScene("startup");
                // HORRIBLE HACK
                // since we're initially called via a outputText command, the content of the first page's text will be overwritten
                // when we return. Therefore, in a horrible hack, we return the contents of mainTest.htmlText as the ret value, so
                // the outputText call overwrites the window content with the exact same content.
                // trace("WARNING: Returning: ", ret);
                this._ownerClass.currentText = ret;
            }
            //trace(ret);
            // trace("WARNING: Maintext content @ recursiveParser = ", mainText.htmlText.length)
            return ret;
        }
        // ---------------------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------------------------------------------------------------------------------------------------------
        // Make shit look nice
        makeQuotesPrettah(inStr) {
            inStr = inStr.replace(/(\w)'(\w)/g, "$1\u2019$2") // Apostrophes
                .replace(/(^|[\r\n 	\.\!\,\?])"([a-zA-Z<>\.\!\,\?])/g, "$1\u201c$2") // Opening doubles
                .replace(/([a-zA-Z<>\.\!\,\?])"([\r\n 	\.\!\,\?]|$)/g, "$1\u201d$2") // Closing doubles
                .replace(/--/g, "\u2014"); // em-dashes
            return inStr;
        }
        // ---------------------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------------------------------------------------------------------------------------------------------
        // ---------------------------------------------------------------------------------------------------------------------------------------
        // Stupid string utility functions, because actionscript doesn't have them (WTF?)
        stripStr(str) {
            return this.trimStrBack(this.trimStrFront(str, " "), " ");
            return this.trimStrBack(this.trimStrFront(str, "	"), "	");
        }
        trimStr(str, char = " ") {
            return this.trimStrBack(this.trimStrFront(str, char), char);
        }
        trimStrFront(str, char = " ") {
            char = this.stringToCharacter(char);
            if (str.charAt(0) == char) {
                str = this.trimStrFront(str.substring(1), char);
            }
            return str;
        }
        trimStrBack(str, char = " ") {
            char = this.stringToCharacter(char);
            if (str.charAt(str.length - 1) == char) {
                str = this.trimStrBack(str.substring(0, str.length - 1), char);
            }
            return str;
        }
        stringToCharacter(str) {
            if (str.length == 1) {
                return str;
            }
            return str.slice(0, 1);
        }
        isUpperCase(char) {
            if (!isNaN(Number(char))) {
                return false;
            }
            else if (char == char.toUpperCase()) {
                return true;
            }
            return false;
        }
        capitalizeFirstWord(str) {
            str = str.charAt(0).toUpperCase() + str.slice(1);
            return str;
        }
    }
    exports.Parser = Parser;
});
//# sourceMappingURL=Parser.js.map