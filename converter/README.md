This is a script that helps converting from Actionscript to Typescript.

It splits file into lines and matches the following patterns (ignoring the starting whitespace) to transform the text.

`[]` = optional

`<>` = name

`...` = repeating

`package`

> Remove line and its matching braces

`import`

> Remove line

`[dynamic] [public | internal] [final] class <className> [ extends <superClass> ] [ implements <interfaceName>[, <interfaceName>... ] ]`

> Remove `dynamic`, `internal`, `final`. Switch `public` to `export`.

`[public | protected | private | internal] [override] [static | final] [const | function | var] <name>`

> Switch `internal` to `public`. Remove `override` and `final`. If `public`, `protected`, `private`, or `internal` do not exist, keep `const`, `function`, or `var`, otherwise remove them.

