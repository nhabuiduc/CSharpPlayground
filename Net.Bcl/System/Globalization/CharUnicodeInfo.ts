////<reference path="../../../Scripts/Libaries/unicode-categories.js"/>

declare class Unicode {
    public Lu: RegExp;
    public Ll: RegExp;
    public Lt: RegExp;
    public Lm: RegExp;
    public Lo: RegExp;
    public Nl: RegExp;
    public Mn: RegExp;
    public Mc: RegExp;
    public Nd: RegExp;
    public Pc: RegExp;
}
declare var unicode: Unicode;
module System.Globalization {
    export class CharUnicodeInfo {
        public static GetUnicodeCategory(ch: string): UnicodeCategory {
            if (unicode.Lu.test(ch)) return UnicodeCategory.UppercaseLetter;
            if (unicode.Ll.test(ch)) return UnicodeCategory.LowercaseLetter;
            if (unicode.Lt.test(ch)) return UnicodeCategory.TitlecaseLetter;
            if (unicode.Lm.test(ch)) return UnicodeCategory.ModifierLetter;
            if (unicode.Lo.test(ch)) return UnicodeCategory.OtherLetter;
            if (unicode.Nl.test(ch)) return UnicodeCategory.LetterNumber;
            if (unicode.Mn.test(ch)) return UnicodeCategory.NonSpacingMark;
            if (unicode.Mc.test(ch)) return UnicodeCategory.SpacingCombiningMark;
            if (unicode.Nd.test(ch)) return UnicodeCategory.DecimalDigitNumber;
            if (unicode.Pc.test(ch)) return UnicodeCategory.ConnectorPunctuation;

            return UnicodeCategory.OtherSymbol;
            throw new NotImplementedException("not support");
        }
    }
}