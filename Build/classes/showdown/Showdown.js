define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Showdown {
        static makeHtml(text) {
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
        static _StripLinkDefinitions(text) {
            var text = text.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|\Z)/gm, function (wholeMatch, m1, m2, m3, m4, ...args) {
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
        static _HashHTMLBlocks(text) {
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
        static hashElement(wholeMatch, m1, m2, m3, m4, ...args) {
            var blockText = m1;
            blockText = blockText.replace(/\n\n/g, "\n");
            blockText = blockText.replace(/^\n/, "");
            blockText = blockText.replace(/\n+$/g, "");
            blockText = "\n\n~K" + (Showdown.g_html_blocks.push(blockText) - 1) + "K\n\n";
            return blockText;
        }
        static _RunBlockGamut(text) {
            text = Showdown._DoHeaders(text);
            var key = Showdown.hashBlock("<hr />");
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
        static _RunSpanGamut(text) {
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
        static _EscapeSpecialCharsWithinTagAttributes(text) {
            var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
            var text = text.replace(regex, function (wholeMatch, ...args) {
                var tag = wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`");
                tag = Showdown.escapeCharacters(tag, "\\`*_");
                return tag;
            });
            return text;
        }
        static _DoAnchors(text) {
            text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, Showdown.writeAnchorTag);
            text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, Showdown.writeAnchorTag);
            text = text.replace(/(\[([^\[\]]+)\])()()()()()/g, Showdown.writeAnchorTag);
            return text;
        }
        static writeAnchorTag(wholeMatch, m1, m2, m3, m4, m5, m6, m7, m8, m9, ...args) {
            if (m7 == undefined) {
                m7 = "";
            }
            var whole_match = m1;
            var link_text = m2;
            var link_id = m3.toLowerCase();
            var url = m4;
            var title = m7;
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
            var result = "<a href=\"" + url + "\"";
            if (title != "") {
                title = title.replace(/"/g, "&quot;");
                title = Showdown.escapeCharacters(title, "*_");
                result = result + (" title=\"" + title + "\"");
            }
            result = result + (">" + link_text + "</a>");
            return result;
        }
        static _DoImages(text) {
            text = text.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, Showdown.writeImageTag);
            text = text.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, Showdown.writeImageTag);
            return text;
        }
        static writeImageTag(wholeMatch, m1, m2, m3, m4, m5, m6, m7, m8, m9) {
            var whole_match = m1;
            var alt_text = m2;
            var link_id = m3.toLowerCase();
            var url = m4;
            var title = m7;
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
            var result = "<img src=\"" + url + "\" alt=\"" + alt_text + "\"";
            title = title.replace(/"/g, "&quot;");
            title = Showdown.escapeCharacters(title, "*_");
            result = result + (" title=\"" + title + "\"");
            result = result + " />";
            return result;
        }
        static _DoHeaders(text) {
            var text = text.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function (wholeMatch, m1, ...args) {
                return Showdown.hashBlock("<h1>" + Showdown._RunSpanGamut(m1) + "</h1>");
            });
            text = text.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function (matchFound, m1, ...args) {
                return Showdown.hashBlock("<h2>" + Showdown._RunSpanGamut(m1) + "</h2>");
            });
            text = text.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function (wholeMatch, m1, m2, ...args) {
                var h_level = m1.length;
                return Showdown.hashBlock("<h" + h_level + ">" + Showdown._RunSpanGamut(m2) + "</h" + h_level + ">");
            });
            return text;
        }
        static _DoLists(text) {
            var text = text + "~0";
            var whole_list = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
            if (Showdown.g_list_level) {
                text = text.replace(whole_list, function (wholeMatch, m1, m2, ...args) {
                    var list = m1;
                    var list_type = m2.search(/[*+-]/g) > -1 ? "ul" : "ol";
                    list = list.replace(/\n{2,}/g, "\n\n\n");
                    var result = Showdown._ProcessListItems(list);
                    result = result.replace(/\s+$/, "");
                    result = "<" + list_type + ">" + result + "</" + list_type + ">\n";
                    return result;
                });
            }
            else {
                whole_list = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;
                text = text.replace(whole_list, function (wholeMatch, m1, m2, m3, ...args) {
                    var runup = m1;
                    var list = m2;
                    var list_type = m3.search(/[*+-]/g) > -1 ? "ul" : "ol";
                    list = list.replace(/\n{2,}/g, "\n\n\n");
                    var result = Showdown._ProcessListItems(list);
                    result = runup + "<" + list_type + ">\n" + result + "</" + list_type + ">\n";
                    return result;
                });
            }
            text = text.replace(/~0/, "");
            return text;
        }
        static _DoTables(text) {
            var text = text.replace(/(?:\|(?:[^\|\r\n]+\|)+\n)+/gm, function (wholeMatch, ...args) {
                return "<table>" + Showdown._DoTableRows(wholeMatch) + "</table>";
            });
            return text;
        }
        static _DoTableRows(text) {
            var text = text.replace(/\|((?:[^\|\r\n]+\|)+)\n/gm, function (wholeMatch, g1, ...args) {
                return "<tr>" + Showdown._DoTableCells(g1) + "</tr>";
            });
            return text;
        }
        static _DoTableCells(text) {
            var text = text.replace(/([^\|\r\n]+)\|/gm, function (wholeMatch, g1, ...args) {
                return "<td>" + Showdown._RunSpanGamut(g1) + "</td>";
            });
            return text;
        }
        static _ProcessListItems(list_str) {
            Showdown.g_list_level++;
            var list_str = list_str.replace(/\n{2,}$/, "\n");
            list_str = list_str + "~0";
            list_str = list_str.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm, function (wholeMatch, m1, m2, m3, m4, ...args) {
                var item = m4;
                var leading_line = m1;
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
        static _DoCodeBlocks(text) {
            var text = text + "~0";
            text = text.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function (wholeMatch, m1, m2, ...args) {
                var codeblock = m1;
                var nextChar = m2;
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
        static hashBlock(text, ...args) {
            text = text.replace(/(^\n+|\n+$)/g, "");
            return "\n\n~K" + (Showdown.g_html_blocks.push(text) - 1) + "K\n\n";
        }
        static _DoCodeSpans(text) {
            var text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function (wholeMatch, m1, m2, m3, m4, ...args) {
                var c = m3;
                c = c.replace(/^([ \t]*)/g, "");
                c = c.replace(/[ \t]*$/g, "");
                c = Showdown._EncodeCode(c);
                return m1 + "<code>" + c + "</code>";
            });
            return text;
        }
        static _EncodeCode(text) {
            text = text.replace(/&/g, "&amp;");
            text = text.replace(/</g, "&lt;");
            text = text.replace(/>/g, "&gt;");
            text = Showdown.escapeCharacters(text, "*_{}[]\\", false);
            return text;
        }
        static _DoItalicsAndBold(text) {
            text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<b>$2</b>");
            text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<i>$2</i>");
            return text;
        }
        static _DoBlockQuotes(text) {
            var text = text.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function (wholeMatch, m1, ...args) {
                var bq = m1;
                bq = bq.replace(/^[ \t]*>[ \t]?/gm, "~0");
                bq = bq.replace(/~0/g, "");
                bq = bq.replace(/^[ \t]+$/gm, "");
                bq = Showdown._RunBlockGamut(bq);
                bq = bq.replace(/(^|\n)/g, "$1  ");
                bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1, ...args) {
                    var pre = m1;
                    pre = pre.replace(/^  /mg, "~0");
                    pre = pre.replace(/~0/g, "");
                    return pre;
                });
                return Showdown.hashBlock("<blockquote>\n" + bq + "\n</blockquote>");
            });
            return text;
        }
        static _FormParagraphs(text) {
            var i = NaN;
            var str = null;
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
                    firstGroup = /~K(\d+)K/.exec(grafsOut[i])[1];
                    blockText = Showdown.g_html_blocks[parseInt(firstGroup)];
                    blockText = blockText.replace(/\$/g, "$$$$");
                    grafsOut[i] = grafsOut[i].replace(/~K\d+K/, blockText);
                }
            }
            return grafsOut.join("\n\n");
        }
        static _EncodeAmpsAndAngles(text) {
            text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");
            text = text.replace(/<(?![a-z\/?\$!])/gi, "&lt;");
            return text;
        }
        static _EncodeBackslashEscapes(text) {
            text = text.replace(/\\(\\)/g, Showdown.escapeCharacters_callback);
            text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g, Showdown.escapeCharacters_callback);
            return text;
        }
        static _DoAutoLinks(text) {
            var text = text.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi, "<a href=\"$1\">$1</a>");
            text = text.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, function (wholeMatch, m1, ...args) {
                return Showdown._EncodeEmailAddress(Showdown._UnescapeSpecialChars(m1));
            });
            return text;
        }
        static _EncodeEmailAddress(addr) {
            var char2hex = function (ch) {
                var hexDigits = "0123456789ABCDEF";
                var dec = ch.charCodeAt(0);
                return hexDigits.charAt(dec >> 4) + hexDigits.charAt(dec & 15);
            };
            var encode = [function (ch) {
                    return "&#" + ch.charCodeAt(0) + ";";
                }, function (ch) {
                    return "&#x" + char2hex(ch) + ";";
                }, function (ch) {
                    return ch;
                }];
            var addr = "mailto:" + addr;
            addr = addr.replace(/./g, function (ch, ...args) {
                var r = undefined;
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
        static _UnescapeSpecialChars(text) {
            var text = text.replace(/~E(\d+)E/g, function (wholeMatch, m1, ...args) {
                var charCodeToReplace = parseInt(m1);
                return String.fromCharCode(charCodeToReplace);
            });
            return text;
        }
        static _Outdent(text) {
            text = text.replace(/^(\t|[ ]{1,4})/gm, "~0");
            text = text.replace(/~0/g, "");
            return text;
        }
        static _Detab(text) {
            var text = text.replace(/\t(?=\t)/g, "    ");
            text = text.replace(/\t/g, "~A~B");
            text = text.replace(/~B(.+?)~A/g, function (wholeMatch, m1, m2, ...args) {
                var leadingText = m1;
                var numSpaces = 4 - leadingText.length % 4;
                for (var i = 0; i < numSpaces; leadingText = leadingText + " ", i++) {
                }
                return leadingText;
            });
            text = text.replace(/~A/g, "    ");
            text = text.replace(/~B/g, "");
            return text;
        }
        static escapeCharacters(text, charsToEscape, afterBackslash = false) {
            var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g, "\\$1") + "])";
            if (afterBackslash) {
                regexString = "\\\\" + regexString;
            }
            var regex = new RegExp(regexString, "g");
            text = text.replace(regex, Showdown.escapeCharacters_callback);
            return text;
        }
        static escapeCharacters_callback(wholeMatch, m1, m2, m3, ...args) {
            var charCodeToEscape = m1.charCodeAt(0);
            return "~E" + charCodeToEscape + "E";
        }
    }
    Showdown.g_list_level = 0;
    exports.Showdown = Showdown;
});
//# sourceMappingURL=Showdown.js.map