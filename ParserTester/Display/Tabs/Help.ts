export function loadHelpContent(helpContent: HTMLElement) {
    const info = document.createElement('pre');
    info.className = "content";
    helpContent.appendChild(info);
    info.innerHTML = `
    Parser Syntax
    Surrounding anything in [] activates the parser.

    Tags
    Their are two type of tags: Functional and Conditional.

    Functional tags get values from the game or transform arguments that are given to them.
    [&lt;tag name&gt; &lt;argument&gt; &lt;argument&gt; &lt;argument&gt;...]
    Arguments are separated by spaces and are words, symbols or numbers.
    Arguments can also have any number of [] inside of them.
    Examples:
        The player's strength is at 50.
        -- My strength score is [str].
        -&gt; My strength score is 50.

        The player has long red hair.
        -- [say: her [hairLength], [color: red [hairColor]]
        -&gt; <i>"her long, <span style="color:red">red</span> hair"</i>

    Conditional Statements
    If statements are used to determine what to show if the condition is true or false.

    [if (condition) &lt;true statement&gt;]
    If the condition is true, show the true statement.

    [if (condition) &lt;true statement&gt; | &lt;false statement&gt;]
    Optionally, you can add a | and a false statement. This evaluates to:
        When the condition is true, show true statement.
        When the condition is false, show false statement.

    Conditions
    (&lt;left argument&gt; &lt;conditional operator&gt; &lt;right argument&gt;)
    The left and right arguments can be either numbers, or any of the Conditional tags.

    Conditional Operators
    ==      Left is equal to right
    =       Left is equal to right
    &lt;       Left is less than right
    &lt;=      Left is less than or equal to right
    &gt;       Left is greater than right
    &gt;=      Left is greater than or equal to right
    !=      Left is not equal to right

    Conditional tags are used to compare values.
    Example:
        The player's strength is at 18.
        -- You lift the stone [if (str &lt;= 20)with much difficulty][if (str &gt; 50)with ease].
        -&gt; You lift the stone with much difficulty.

        The player has white skin.
        -- [say: her [if (skinColor == white)[color: white ghostly white] skin]
        -&gt; <i>"her <span style="color:white">ghostly white</span> skin"</i>

    Escaping characters
    Lets say you want to type [see], but don't want to the parser to process it.
    \\ escapes the character so it won't be processed by the parser.
    Example:
        -- Then you \\[see] the tree on the horizon.
        -&gt; Then you [see] the tree on the horizon.

    Tags List
        * means not universally supported
        Functional:
            Color*
            [color: &lt;color&gt; &lt;text&gt; ...]
            Accepts a CSS color and colors the following text that color.
            -- [color: red tree leaves]
            -&gt; <span style="color:red">tree leaves</span>

            Say*
            [say: &lt;text&gt; ...]
            Surrounds with "" and italicizes
            -- [say: Wowweee!]
            -&gt; <i>"Wowweee!"</i>

            Bold*
            [b: &lt;text&gt; ...]
            Bolds following text
            -- [b: Hard]
            -&gt; <b>Hard</b>

            Italic*
            [i: &lt;text&gt; ...]
            Italicizes following text
            -- [i: smooth]
            -&gt; <i>smooth</i>

            Underline*
            [u: &lt;text&gt; ...]
            Underlines following text
            -- [say: Title]
            -&gt; <u>Title</u>

    `;
}
