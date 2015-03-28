module Roslyn.Utilities {
    export class StringExtensions {
        public static Join(source: System.Collections.Generic.IEnumerable<string>, separator: string): string {
            if (source == null) {
                throw new System.ArgumentNullException();
            }
            if (separator == null) {
                throw new System.ArgumentNullException();
            }
            return System.String.Join(separator, source);
        }
        public static NeedsLocalization(value: string): string {
            return value;
        }
        public static LooksLikeInterfaceName(name: string): boolean {
            return name.length >= 3 && name[0] == 'I' && System.String.IsUpper(name[1]) && System.String.IsLower(name[2]);
        }
        public static LooksLikeTypeParameterName(name: string): boolean {
            return name.length >= 3 && name[0] == 'T' && System.String.IsUpper(name[1]) && System.String.IsLower(name[2]);
        }
        private static toLower: (_: string) => string = System.String.ToLower;
        private static toUpper: (_: string) => string = System.String.ToUpper;
        public static ToPascalCase(shortName: string, trimLeadingTypePrefix: boolean = true): string {
            return StringExtensions.ConvertCase(shortName, trimLeadingTypePrefix, StringExtensions.toUpper);
        }
        public static ToCamelCase(shortName: string, trimLeadingTypePrefix: boolean = true): string {
            return StringExtensions.ConvertCase(shortName, trimLeadingTypePrefix, StringExtensions.toLower);
        }
        private static ConvertCase(shortName: string, trimLeadingTypePrefix: boolean, convert: (_: string) => string): string {
            if (!System.String.IsNullOrEmpty(shortName)) {
                if (trimLeadingTypePrefix && (StringExtensions.LooksLikeInterfaceName(shortName) || StringExtensions.LooksLikeTypeParameterName(shortName))) {
                    return convert(shortName[1]) + shortName.substr(2);
                }
                if (convert(shortName[0]) != shortName[0]) {
                    return convert(shortName[0]) + shortName.substr(1);
                }
            }
            return shortName;
        }
        public static IsValidClrTypeName(name: string): boolean {
            return !System.String.IsNullOrEmpty(name) && name.indexOf('\0') == -1;
        }
        public static IsValidClrNamespaceName(name: string): boolean {
            if (System.String.IsNullOrEmpty(name)) {
                return false;
            }
            var lastChar: string = '.';
            // for each
            var cEnumerator = name.GetEnumerator();
            try {
                while (cEnumerator.MoveNext()) {
                    var c = cEnumerator.Current;
                    // foreach block
                    if (c == '\0' || (c == '.' && lastChar == '.')) {
                        return false;
                    }
                    lastChar = c;
                }
            } finally {
                if (cEnumerator !== null && (<any>cEnumerator).Dispose !== void 0) (<any>cEnumerator).Dispose();

            }    
            // end foreach
            return lastChar != '.';
        }
        public static GetWithSingleAttributeSuffix(name: string, isCaseSensitive: boolean): string {
            var cleaned: string = name;
            while ((cleaned = StringExtensions.GetWithoutAttributeSuffix(cleaned, isCaseSensitive)) != null) {
                name = cleaned;
            }
            return name + "Attribute";
        }
        public static TryGetWithoutAttributeSuffix_1927(name: string, result: { refObj: string }): boolean {
            return StringExtensions.TryGetWithoutAttributeSuffix_1131(name,/*isCaseSensitive:*/true,/*result:*/result);
        }
        public static GetWithoutAttributeSuffix(name: string, isCaseSensitive: boolean): string {
            var result: string = null;
            //return (() => {
            var result_ref0 = { refObj: result };
            var ret_val__200 = StringExtensions.TryGetWithoutAttributeSuffix_1131(name, isCaseSensitive, result_ref0);

            result = result_ref0.refObj;
            //return ret_val__200;
            //})() ? result : null;
            return ret_val__200 ? result : null;
        }
        public static TryGetWithoutAttributeSuffix_1131(name: string, isCaseSensitive: boolean, result: { refObj: string }): boolean {
            var AttributeSuffix: string = "Attribute";
            var comparison = isCaseSensitive ? System.StringComparison.Ordinal : System.StringComparison.OrdinalIgnoreCase;
            if (name.length > AttributeSuffix.length && name.EndsWith(AttributeSuffix, comparison)) {
                result.refObj = name.substr(0, name.length - AttributeSuffix.length);
                return true;
            }
            result.refObj = null;
            return false;
        }
        public static IsValidUnicodeString(str: string): boolean {
        //    var i: number = 0;
        //    while (i < str.length) {
        //        var c: string = str[i++];
        //        if (string.IsHighSurrogate(c)) {
        //            if (i < str.length && string.IsLowSurrogate(str[i])) {
        //                i++;
        //            }
        //            else {
        //                return false;
        //            }
        //        }
        //        else if (string.IsLowSurrogate(c)) {
        //            return false;
        //        }
        //    }
            //Comments
            return true;
        }
        public static Unquote_5789(arg: string): string {
            var quoted: boolean = false;
            var quoted_ref0 = { refObj: quoted };
            var ret_val__974 = StringExtensions.Unquote_7452(arg, quoted_ref0);

            quoted = quoted_ref0.refObj;
            return ret_val__974;
        }
        public static Unquote_7452(arg: string, quoted: { refObj: boolean }): string {
            if (arg.length > 1 && arg[0] == '"' && arg[arg.length - 1] == '"') {
                quoted.refObj = true;
                return arg.substr(1, arg.length - 2);
            }
            else {
                quoted.refObj = false;
                return arg;
            }
        }
        public static First(arg: string): string {
            return arg[0];
        }
        public static Last(arg: string): string {
            return arg[arg.length - 1];
        }
        public static All(arg: string, predicate: (_: string) => boolean): boolean {
            // for each
            var cEnumerator = arg.GetEnumerator();
            try {
                while (cEnumerator.MoveNext()) {
                    var c = cEnumerator.Current;
                    // foreach block
                    if (!predicate(c)) {
                        return false;
                    }
                }
            } finally {
                if (cEnumerator !== null && (<any>cEnumerator).Dispose !== void 0) (<any>cEnumerator).Dispose();

            }    
            // end foreach
            return true;
        }
    }
}