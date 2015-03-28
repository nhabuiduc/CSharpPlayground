module System {
    function TrimZero(text: string): string {
        if (text == null || text == '') return text;

        if (text.StartsWith("-")) {
            text = text.replace(/^-0+/, '-');
        }
        else {
            text = text.replace(/^0+/, '');
        }

        return text == '' ? '0' : text;
        
    }

    function isNumber(text: string, radix: number) {
        if (radix == 10) {
            return /^\d+$/.test(text);
        }
        return /^[\dABCDEFabcdef]+$/.test(text);
    }

    export class Int32 {
        public static MaxValue = 2147483647;
        public static MinValue = -2147483647;
        public static TryParse(text: string,
            numberStyle: System.Globalization.NumberStyles,
            cultureInfo: Globalization.CultureInfo,
            result: { refObj: number }): boolean {
            text = TrimZero(text);

            var radix = (numberStyle & System.Globalization.NumberStyles.AllowHexSpecifier) != 0 ? 16 : 10;
            if (!isNumber(text, radix)) {
                return false;
            }

            var parsedResult = parseInt(text, radix);
            //var reversedText = parsedResult.toString();
            if (!isNaN(parsedResult)) {
                result.refObj = parsedResult;
                return true;
            }

            return false;
        }
    }

    export class UInt32 {
        public static MaxValue = 4294967295;
        public static MinValue = 0;

        public static TryParse(text: string,
            numberStyle: System.Globalization.NumberStyles,
            cultureInfo: Globalization.CultureInfo,
            result: { refObj: number }): boolean {
            text = TrimZero(text);
            var radix = (numberStyle & System.Globalization.NumberStyles.AllowHexSpecifier) != 0 ? 16 : 10;
            if (!isNumber(text, radix)) {
                return false;
            }


            var parsedResult = parseInt(text, radix);
            //var reversedText = parsedResult.toString();
            if (parsedResult < 0) {
                return false;
            }
            if (!isNaN(parsedResult)) {
                result.refObj = parsedResult;
                return true;
            }

            return false;
        }
    }

    export class Int64 {
        public static MaxValue = 9223372036854775807;
        public static MinValue = -9223372036854775808;

        public static TryParse(text: string,
            numberStyle: System.Globalization.NumberStyles,
            cultureInfo: Globalization.CultureInfo,
            result: { refObj: number }): boolean {
            text = TrimZero(text);
            var radix = (numberStyle & System.Globalization.NumberStyles.AllowHexSpecifier) != 0 ? 16 : 10;

            if (!isNumber(text, radix)) {
                return false;
            }

            var parsedResult = parseInt(text, radix);
            //var reversedText = parsedResult.toString();
            if (!isNaN(parsedResult)) {
                result.refObj = parsedResult;
                return true;
            }

            return false;
        }
    }

    export class UInt64 {
        public static MaxValue = 18446744073709551615;
        public static MinValue = -9223372036854775808;

        public static TryParse(text: string,
            numberStyle: System.Globalization.NumberStyles,
            cultureInfo: Globalization.CultureInfo,
            result: { refObj: number }): boolean {
            text = TrimZero(text);
            var radix = (numberStyle & System.Globalization.NumberStyles.AllowHexSpecifier) != 0 ? 16 : 10;
            if (!isNumber(text, radix)) {
                return false;
            }

            var parsedResult = parseInt(text, radix);
            if (parsedResult < 0) {
                return false;
            }
            //var reversedText = parsedResult.toString();
            if (!isNaN(parsedResult)) {
                result.refObj = parsedResult;
                return true;
            }

            return false;
        }
    }

    export class Double {
        public static TryParse(text: string,
            numberStyle: System.Globalization.NumberStyles,
            cultureInfo: Globalization.CultureInfo,
            result: { refObj: number }): boolean {
            text = TrimZero(text);
            var parsedResult = parseFloat(text);
            var reversedText = parsedResult.toString();
            if (text == reversedText) {
                result.refObj = parsedResult;
                return true;
            }

            return false;
        }
    }

    export class Single {
        public static TryParse(text: string,
            numberStyle: System.Globalization.NumberStyles,
            cultureInfo: Globalization.CultureInfo,
            result: { refObj: number }): boolean {
            text = TrimZero(text);
            var parsedResult = parseFloat(text);
            var reversedText = parsedResult.toString();
            if (text == reversedText) {
                result.refObj = parsedResult;
                return true;
            }

            return false;
        }
    }

    export class Decimal {
        public static TryParse(text: string,
            numberStyle: System.Globalization.NumberStyles,
            cultureInfo: Globalization.CultureInfo,
            result: { refObj: number }): boolean {
            text = TrimZero(text);
            var parsedResult = parseFloat(text);
            var reversedText = parsedResult.toString();
            if (text == reversedText) {
                result.refObj = parsedResult;
                return true;
            }

            return false;
        }
    }

    export class Boolean {
        public static TryParse(text: string,
            result: { refObj: boolean }): boolean {

            text = text.trim().toUpperCase();

            if (text === "TRUE") {
                result.refObj = true;
                return true;
            }

            if (text === "FALSE") {
                result.refObj = false;
                return true;
            }

            return false;
        }
    }
}