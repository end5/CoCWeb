export class Showdown {

    private static g_urls: any[];

    private static g_titles: any[];

    private static g_html_blocks: any[];

    private static g_list_level: number = 0;

    public static makeHtml(text: string): string {
        Showdown.g_urls = [];
        Showdown.g_titles = [];
        Showdown.g_html_blocks = [];
        text = text.replace(/~/g, "~T");
        text = text.replace(/\$/g, "~D");
        text = text.replace(/\r\n/g, "\n");
        text = text.replace(/\r/g, "\n");
        text = "\n\n" + text + "\n\n";
        text = Showdown._Detab(text);
        text = text.replace(/^[ \t]+$/mg, "");
        text = Showdown._HashHTMLBlocks(text);
        text = Showdown._StripLinkDefinitions(text);
        text = Showdown._RunBlockGamut(text);
        text = Showdown._UnescapeSpecialChars(text);
        text = text.replace(/~D/g, "$$");
        text = text.replace(/~T/g, "~");
        text = text.replace(/\n/g, "");
        return text;
    }

    private static _StripLinkDefinitions(text: string): string {
        var text: string = text.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|\Z)/gm, function (wholeMatch: string, m1: any, m2: any, m3: any, m4: any, ...args): string {
            m1 = m1.toLowerCase();
            Showdown.g_urls[m1] = Showdown._EncodeAmpsAndAngles(m2);
            if (m3) {
                return m3 + m4;
            }
            if (m4) {
                Showdown.g_titles[m1] = m4.replace(/"/g, "&quot;");
            }
            return "";
        });
        return text;
    }

    private static _HashHTMLBlocks(text: string): string {
        text = text.replace(/\n/g, "\n\n");
        // var block_tags_a: string = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del";
        // var block_tags_b: string = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math";
        text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, Showdown.hashElement);
        text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, Showdown.hashElement);
        text = text.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, Showdown.hashElement);
        text = text.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g, Showdown.hashElement);
        text = text.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, Showdown.hashElement);
        text = text.replace(/\n\n/g, "\n");
        return text;
    }

    private static hashElement(wholeMatch: string, m1: any, m2: any, m3: any, m4: any, ...args: any[]): string {
        var blockText: any = m1;
        blockText = blockText.replace(/\n\n/g, "\n");
        blockText = blockText.replace(/^\n/, "");
        blockText = blockText.replace(/\n+$/g, "");
        blockText = "\n\n~K" + (Showdown.g_html_blocks.push(blockText) - 1) + "K\n\n";
        return blockText;
    }

    private static _RunBlockGamut(text: string): string {
        text = Showdown._DoHeaders(text);
        var key: string = Showdown.hashBlock("<hr />");
        text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, key);
        text = text.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, key);
        text = text.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm, key);
        text = Showdown._DoTables(text);
        text = Showdown._DoLists(text);
        text = Showdown._DoCodeBlocks(text);
        text = Showdown._DoBlockQuotes(text);
        text = Showdown._HashHTMLBlocks(text);
        text = Showdown._FormParagraphs(text);
        return text;
    }

    private static _RunSpanGamut(text: string): string {
        text = Showdown._DoCodeSpans(text);
        text = Showdown._EscapeSpecialCharsWithinTagAttributes(text);
        text = Showdown._EncodeBackslashEscapes(text);
        text = Showdown._DoImages(text);
        text = Showdown._DoAnchors(text);
        text = Showdown._DoAutoLinks(text);
        text = Showdown._EncodeAmpsAndAngles(text);
        text = Showdown._DoItalicsAndBold(text);
        text = text.replace(/  +\n/g, " <br />\n");
        return text;
    }

    private static _EscapeSpecialCharsWithinTagAttributes(text: string): string {
        var regex: RegExp = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
        var text: string = text.replace(regex, function (wholeMatch: string, ...args): string {
            var tag: any = wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`");
            tag = Showdown.escapeCharacters(tag, "\\`*_");
            return tag;
        });
        return text;
    }

    private static _DoAnchors(text: string): string {
        text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, Showdown.writeAnchorTag);
        text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, Showdown.writeAnchorTag);
        text = text.replace(/(\[([^\[\]]+)\])()()()()()/g, Showdown.writeAnchorTag);
        return text;
    }

    private static writeAnchorTag(wholeMatch: string, m1: any, m2: any, m3: any, m4: any, m5: any, m6: any, m7: any, m8: any, m9: any, ...args: any[]): string {
        if (m7 == undefined) {
            m7 = "";
        }
        var whole_match: string = m1;
        var link_text: string = m2;
        var link_id: string = m3.toLowerCase();
        var url: string = m4;
        var title: string = m7;
        if (url == "") {
            if (link_id == "") {
                link_id = link_text.toLowerCase().replace(/ ?\n/g, " ");
            }
            url = "#" + link_id;
            if (Showdown.g_urls[parseInt(link_id)] != undefined) {
                url = Showdown.g_urls[parseInt(link_id)];
                if (Showdown.g_titles[parseInt(link_id)] != undefined) {
                    title = Showdown.g_titles[parseInt(link_id)];
                }
            }
            else if (whole_match.search(/\(\s*\)$/m) > -1) {
                url = "";
            }
            else {
                return whole_match;
            }
        }
        url = Showdown.escapeCharacters(url, "*_");
        var result: any = "<a href=\"" + url + "\"";
        if (title != "") {
            title = title.replace(/"/g, "&quot;");
            title = Showdown.escapeCharacters(title, "*_");
            result = result + (" title=\"" + title + "\"");
        }
        result = result + (">" + link_text + "</a>");
        return result;
    }

    private static _DoImages(text: string): string {
        text = text.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, Showdown.writeImageTag);
        text = text.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, Showdown.writeImageTag);
        return text;
    }

    private static writeImageTag(wholeMatch: string, m1: any, m2: any, m3: any, m4: any, m5: any, m6: any, m7: any, m8: any, m9: any): string {
        var whole_match: string = m1;
        var alt_text: string = m2;
        var link_id: string = m3.toLowerCase();
        var url: string = m4;
        var title: string = m7;
        if (!title) {
            title = "";
        }
        if (url == "") {
            if (link_id == "") {
                link_id = alt_text.toLowerCase().replace(/ ?\n/g, " ");
            }
            url = "#" + link_id;
            if (Showdown.g_urls[parseInt(link_id)] != undefined) {
                url = Showdown.g_urls[parseInt(link_id)];
                if (Showdown.g_titles[parseInt(link_id)] != undefined) {
                    title = Showdown.g_titles[parseInt(link_id)];
                }
            }
            else {
                return whole_match;
            }
        }
        alt_text = alt_text.replace(/"/g, "&quot;");
        url = Showdown.escapeCharacters(url, "*_");
        var result: any = "<img src=\"" + url + "\" alt=\"" + alt_text + "\"";
        title = title.replace(/"/g, "&quot;");
        title = Showdown.escapeCharacters(title, "*_");
        result = result + (" title=\"" + title + "\"");
        result = result + " />";
        return result;
    }

    private static _DoHeaders(text: string): string {
        var text: string = text.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function (wholeMatch: string, m1: string, ...args): string {
            return Showdown.hashBlock("<h1>" + Showdown._RunSpanGamut(m1) + "</h1>");
        });
        text = text.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function (matchFound: string, m1: string, ...args): string {
            return Showdown.hashBlock("<h2>" + Showdown._RunSpanGamut(m1) + "</h2>");
        });
        text = text.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function (wholeMatch: string, m1: string, m2: string, ...args): string {
            var h_level: any = m1.length;
            return Showdown.hashBlock("<h" + h_level + ">" + Showdown._RunSpanGamut(m2) + "</h" + h_level + ">");
        });
        return text;
    }

    private static _DoLists(text: string): string {
        var text: string = text + "~0";
        var whole_list: RegExp = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
        if (Showdown.g_list_level) {
            text = text.replace(whole_list, function (wholeMatch: string, m1: string, m2: string, ...args): string {
                var list: any = m1;
                var list_type: any = m2.search(/[*+-]/g) > -1 ? "ul" : "ol";
                list = list.replace(/\n{2,}/g, "\n\n\n");
                var result: any = Showdown._ProcessListItems(list);
                result = result.replace(/\s+$/, "");
                result = "<" + list_type + ">" + result + "</" + list_type + ">\n";
                return result;
            });
        }
        else {
            whole_list = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;
            text = text.replace(whole_list, function (wholeMatch: string, m1: string, m2: string, m3: string, ...args): string {
                var runup: any = m1;
                var list: any = m2;
                var list_type: any = m3.search(/[*+-]/g) > -1 ? "ul" : "ol";
                list = list.replace(/\n{2,}/g, "\n\n\n");
                var result: any = Showdown._ProcessListItems(list);
                result = runup + "<" + list_type + ">\n" + result + "</" + list_type + ">\n";
                return result;
            });
        }
        text = text.replace(/~0/, "");
        return text;
    }

    private static _DoTables(text: string): string {
        var text: string = text.replace(/(?:\|(?:[^\|\r\n]+\|)+\n)+/gm, function (wholeMatch: string, ...args): string {
            return "<table>" + Showdown._DoTableRows(wholeMatch) + "</table>";
        });
        return text;
    }

    private static _DoTableRows(text: string): string {
        var text: string = text.replace(/\|((?:[^\|\r\n]+\|)+)\n/gm, function (wholeMatch: string, g1: string, ...args): string {
            return "<tr>" + Showdown._DoTableCells(g1) + "</tr>";
        });
        return text;
    }

    private static _DoTableCells(text: string): string {
        var text: string = text.replace(/([^\|\r\n]+)\|/gm, function (wholeMatch: string, g1: string, ...args): string {
            return "<td>" + Showdown._RunSpanGamut(g1) + "</td>";
        });
        return text;
    }

    private static _ProcessListItems(list_str: string): string {
        Showdown.g_list_level++;
        var list_str: string = list_str.replace(/\n{2,}$/, "\n");
        list_str = list_str + "~0";
        list_str = list_str.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm, function (wholeMatch: string, m1: string, m2: string, m3: string, m4: string, ...args): string {
            var item: any = m4;
            var leading_line: any = m1;
            // var leading_space: any = m2;
            if (leading_line || item.search(/\n{2,}/) > -1) {
                item = Showdown._RunBlockGamut(Showdown._Outdent(item));
            }
            else {
                item = Showdown._DoLists(Showdown._Outdent(item));
                item = item.replace(/\n$/, "");
                item = Showdown._RunSpanGamut(item);
            }
            return "<li>" + item + "</li>\n";
        });
        list_str = list_str.replace(/~0/g, "");
        Showdown.g_list_level--;
        return list_str;
    }

    private static _DoCodeBlocks(text: string): string {
        var text: string = text + "~0";
        text = text.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function (wholeMatch: string, m1: string, m2: string, ...args): string {
            var codeblock: any = m1;
            var nextChar: any = m2;
            codeblock = Showdown._EncodeCode(Showdown._Outdent(codeblock));
            codeblock = Showdown._Detab(codeblock);
            codeblock = codeblock.replace(/^\n+/g, "");
            codeblock = codeblock.replace(/\n+$/g, "");
            codeblock = "<p>" + codeblock + "\n</p>";
            return Showdown.hashBlock(codeblock) + nextChar;
        });
        text = text.replace(/~0/, "");
        return text;
    }

    private static hashBlock(text: string, ...args: any[]): string {
        text = text.replace(/(^\n+|\n+$)/g, "");
        return "\n\n~K" + (Showdown.g_html_blocks.push(text) - 1) + "K\n\n";
    }

    private static _DoCodeSpans(text: string): string {
        var text: string = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function (wholeMatch: string, m1: any, m2: any, m3: any, m4: any, ...args): string {
            var c: any = m3;
            c = c.replace(/^([ \t]*)/g, "");
            c = c.replace(/[ \t]*$/g, "");
            c = Showdown._EncodeCode(c);
            return m1 + "<code>" + c + "</code>";
        });
        return text;
    }

    private static _EncodeCode(text: string): string {
        text = text.replace(/&/g, "&amp;");
        text = text.replace(/</g, "&lt;");
        text = text.replace(/>/g, "&gt;");
        text = Showdown.escapeCharacters(text, "*_{}[]\\", false);
        return text;
    }

    private static _DoItalicsAndBold(text: string): string {
        text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<b>$2</b>");
        text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<i>$2</i>");
        return text;
    }

    private static _DoBlockQuotes(text: string): string {
        var text: string = text.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function (wholeMatch: string, m1: any, ...args): string {
            var bq: any = m1;
            bq = bq.replace(/^[ \t]*>[ \t]?/gm, "~0");
            bq = bq.replace(/~0/g, "");
            bq = bq.replace(/^[ \t]+$/gm, "");
            bq = Showdown._RunBlockGamut(bq);
            bq = bq.replace(/(^|\n)/g, "$1  ");
            bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch: string, m1: string, ...args: any[]): string {
                var pre: any = m1;
                pre = pre.replace(/^  /mg, "~0");
                pre = pre.replace(/~0/g, "");
                return pre;
            });
            return Showdown.hashBlock("<blockquote>\n" + bq + "\n</blockquote>");
        });
        return text;
    }

    private static _FormParagraphs(text: string): string {
        var i: number = NaN;
        var str: any = null;
        var firstGroup;
        var blockText;
        text = text.replace(/^\n+/g, "");
        text = text.replace(/\n+$/g, "");
        var grafs = text.split(/\n{2,}/g);
        var grafsOut = [];
        var end = grafs.length;
        for (i = 0; i < end; i++) {
            str = grafs[i];
            if (str.search(/~K(\d+)K/g) >= 0) {
                grafsOut.push(str);
            }
            else if (str.search(/\S/) >= 0) {
                str = Showdown._RunSpanGamut(str);
                str = str.replace(/^([ \t]*)/g, "<p>");
                str = str + "</p>";
                grafsOut.push(str);
            }
        }
        end = grafsOut.length;
        for (i = 0; i < end; i++) {
            while (grafsOut[i].search(/~K(\d+)K/) >= 0) {
                firstGroup = /~K(\d+)K/.exec(grafsOut[i])![1];
                blockText = Showdown.g_html_blocks[parseInt(firstGroup)];
                blockText = blockText.replace(/\$/g, "$$$$");
                grafsOut[i] = grafsOut[i].replace(/~K\d+K/, blockText);
            }
        }
        return grafsOut.join("\n\n");
    }

    private static _EncodeAmpsAndAngles(text: string): string {
        text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");
        text = text.replace(/<(?![a-z\/?\$!])/gi, "&lt;");
        return text;
    }

    private static _EncodeBackslashEscapes(text: string): string {
        text = text.replace(/\\(\\)/g, Showdown.escapeCharacters_callback);
        text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g, Showdown.escapeCharacters_callback);
        return text;
    }

    private static _DoAutoLinks(text: string): string {
        var text: string = text.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi, "<a href=\"$1\">$1</a>");
        text = text.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, function (wholeMatch: string, m1: any, ...args): string {
            return Showdown._EncodeEmailAddress(Showdown._UnescapeSpecialChars(m1));
        });
        return text;
    }

    private static _EncodeEmailAddress(addr: string): string {
        var char2hex = function (ch: string): string {
            var hexDigits: string = "0123456789ABCDEF";
            var dec: number = ch.charCodeAt(0);
            return hexDigits.charAt(dec >> 4) + hexDigits.charAt(dec & 15);
        };
        var encode = [function (ch: string): string {
            return "&#" + ch.charCodeAt(0) + ";";
        }, function (ch: string): string {
            return "&#x" + char2hex(ch) + ";";
        }, function (ch: string): string {
            return ch;
        }];
        var addr: string = "mailto:" + addr;
        addr = addr.replace(/./g, function (ch: string, ...args: any[]): string {
            var r: any = undefined;
            if (ch == "@") {
                ch = encode[Math.floor(Math.random() * 2)](ch);
            }
            else if (ch != ":") {
                r = Math.random();
                ch = r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch);
            }
            return ch;
        });
        addr = "<a href=\"" + addr + "\">" + addr + "</a>";
        addr = addr.replace(/">.+:/g, "\">");
        return addr;
    }

    private static _UnescapeSpecialChars(text: string): string {
        var text: string = text.replace(/~E(\d+)E/g, function (wholeMatch: string, m1: string, ...args): string {
            var charCodeToReplace: any = parseInt(m1);
            return String.fromCharCode(charCodeToReplace);
        });
        return text;
    }

    private static _Outdent(text: string): string {
        text = text.replace(/^(\t|[ ]{1,4})/gm, "~0");
        text = text.replace(/~0/g, "");
        return text;
    }

    private static _Detab(text: string): string {
        var text: string = text.replace(/\t(?=\t)/g, "    ");
        text = text.replace(/\t/g, "~A~B");
        text = text.replace(/~B(.+?)~A/g, function (wholeMatch: string, m1: string, m2: any, ...args): string {
            var leadingText: any = m1;
            var numSpaces: any = 4 - leadingText.length % 4;
            for (var i: any = 0; i < numSpaces; leadingText = leadingText + " ", i++) {
            }
            return leadingText;
        });
        text = text.replace(/~A/g, "    ");
        text = text.replace(/~B/g, "");
        return text;
    }

    private static escapeCharacters(text: string, charsToEscape: string, afterBackslash: Boolean = false): string {
        var regexString: any = "([" + charsToEscape.replace(/([\[\]\\])/g, "\\$1") + "])";
        if (afterBackslash) {
            regexString = "\\\\" + regexString;
        }
        var regex: RegExp = new RegExp(regexString, "g");
        text = text.replace(regex, Showdown.escapeCharacters_callback);
        return text;
    }

    private static escapeCharacters_callback(wholeMatch: string, m1: any, m2: any, m3: any, ...args: any[]): string {
        var charCodeToEscape: number = m1.charCodeAt(0);
        return "~E" + charCodeToEscape + "E";
    }
}
