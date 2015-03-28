module Microsoft.CodeAnalysis.CSharp {
    export class ObjectDisplay {
        public static FormatPrimitive(obj: Object, options: ObjectDisplayOptions): string {
            if (obj == null) {
                return ObjectDisplay.NullLiteral;
            }
            var type: System.Type = __classOf(obj);
            //if (System.Reflection.IntrospectionExtensions.GetTypeInfo(type).IsEnum) {
            //    type = System.Enum.GetUnderlyingType(type);
            //}
            if (type == /*typeof*/ <any>Number) {
                return ObjectDisplay.FormatLiteral_6182(<number>(<number>obj | 0), options);
            }
            if (type == /*typeof*/ <any>String) {
                return ObjectDisplay.FormatLiteral_1258(<string>obj, options);
            }
            if (type == /*typeof*/ <any>Boolean) {
                return ObjectDisplay.FormatLiteral_1325(<boolean>obj);
            }
            if (type == /*typeof*/ <any>String) {
                return ObjectDisplay.FormatLiteral_1513(<string>obj, options);
            }
            if (type == /*typeof*/ <any>Number) {
                return ObjectDisplay.FormatLiteral_3219(<number>(<number>obj | 0), options);
            }
            if (type == /*typeof*/ <any>Number) {
                return ObjectDisplay.FormatLiteral_3560(<number>(<number>obj | 0), options);
            }
            if (type == /*typeof*/ <any>Number) {
                return ObjectDisplay.FormatLiteral_2865(<number>(<number>obj | 0), options);
            }
            if (type == /*typeof*/ <any>Number) {
                return ObjectDisplay.FormatLiteral_1188(<number>obj, options);
            }
            if (type == /*typeof*/ <any>Number) {
                return ObjectDisplay.FormatLiteral_5056(<number>(<number>obj | 0), options);
            }
            if (type == /*typeof*/ <any>Number) {
                return ObjectDisplay.FormatLiteral_8940(<number>(<number>obj | 0), options);
            }
            if (type == /*typeof*/ <any>Number) {
                return ObjectDisplay.FormatLiteral_1078(<number>(<number>obj | 0), options);
            }
            if (type == /*typeof*/ <any>Number) {
                return ObjectDisplay.FormatLiteral_7314(<number>obj, options);
            }
            if (type == /*typeof*/ <any>Number) {
                return ObjectDisplay.FormatLiteral_1087(<number>obj, options);
            }
            if (type == /*typeof*/ <any>Number) {
                return ObjectDisplay.FormatLiteral_8649(<number>obj, options);
            }
            return null;
        }
        public static get NullLiteral(): string {
            return "null";
        }
        public static FormatLiteral_1325(value: boolean): string {
            return value ? "true" : "false";
        }
        public static FormatString(str: string, quote: string, escapeNonPrintable: boolean): string {
            var pooledBuilder: Collections.PooledStringBuilder = null;
            var sb: System.Text.StringBuilder = null;
            var lastEscape: number = -1;
            for (var i: number = 0; i < str.length; i++) {
                var c: string = str[i];
                var replaceWith: string = '\0';
                var unicodeEscape: boolean = false;
                switch (c) {
                    case '\\':
                        replaceWith = c;
                        break;
                    case '\0':
                        replaceWith = '0';
                        break;
                    case '\r':
                        replaceWith = 'r';
                        break;
                    case '\n':
                        replaceWith = 'n';
                        break;
                    case '\t':
                        replaceWith = 't';
                        break;
                    case '\b':
                        replaceWith = 'b';
                        break;
                    case '\v':
                        replaceWith = 'v';
                        break;
                    default:
                        if (quote == c) {
                            replaceWith = c;
                            break;
                        }
                        if (escapeNonPrintable) {
                            switch (System.Globalization.CharUnicodeInfo.GetUnicodeCategory(c)) {
                                case System.Globalization.UnicodeCategory.OtherNotAssigned:
                                case System.Globalization.UnicodeCategory.ParagraphSeparator:
                                case System.Globalization.UnicodeCategory.Control:
                                    unicodeEscape = true;
                                    break;
                            }
                        }
                        break;
                }
                if (unicodeEscape || replaceWith != '\0') {
                    if (pooledBuilder == null) {
                        pooledBuilder = Collections.PooledStringBuilder.GetInstance();
                        sb = pooledBuilder.Builder;
                        if (quote.charCodeAt(0) != 0) {
                            sb.Append(quote);
                        }
                    }
                    sb.Append(str, lastEscape + 1, i - (lastEscape + 1));
                    sb.Append('\\');
                    if (unicodeEscape) {
                        sb.Append('u');
                        sb.Append((c.charCodeAt(0)).ToString("x4"));
                    }
                    else {
                        sb.Append(replaceWith);
                    }
                    lastEscape = i;
                }
            }
            if (sb != null) {
                sb.Append(str, lastEscape + 1, str.length - (lastEscape + 1));
                if (quote.charCodeAt(0) != 0) {
                    sb.Append(quote);
                }
                return pooledBuilder.ToStringAndFree_3093();
            }
            switch (quote) {
                case '"':
                    return System.String.Concat("\"", str, "\"");
                case '\'':
                    return System.String.Concat("'", str, "'");
                case '\0':
                    return str;
            }
            throw Roslyn.Utilities.ExceptionUtilities.Unreachable;
        }
        public static FormatLiteral_1258(value: string, options: ObjectDisplayOptions): string {
            ObjectDisplay.ValidateOptions(options);
            if (value == null) {
                throw new System.ArgumentNullException("value");
            }
            return ObjectDisplay.FormatString(value, ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.UseQuotes) ? '"' : '\0',/*escapeNonPrintable:*/true);
        }
        public static FormatLiteral_1513(c: string, options: ObjectDisplayOptions): string {
            var includeCodePoints = ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.IncludeCodePoints);
            var result = ObjectDisplay.FormatString(c.ToString(),/*quote:*/ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.UseQuotes) ? '\'' : '\0',/*escapeNonPrintable:*/!includeCodePoints);
            if (includeCodePoints) {
                var codepoint = ObjectDisplayExtensions.IncludesOption(options,
                    ObjectDisplayOptions.UseHexadecimalNumbers) ? "0x" + (c.charCodeAt(0)).ToString("x4") : (c.charCodeAt(0)).ToString();
                return codepoint + " " + result;
            }
            return result;
        }
        public static FormatLiteral_7314(value: number, options: ObjectDisplayOptions): string {
            ObjectDisplay.ValidateOptions(options);
            if (ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.UseHexadecimalNumbers)) {
                return "0x" + (value >= 0 ? value.ToString("x2") : (<number>(<number>value | 0)).ToString("x8"));
            }
            else {
                return value.ToString(System.Globalization.CultureInfo.InvariantCulture);
            }
        }
        public static FormatLiteral_3219(value: number, options: ObjectDisplayOptions): string {
            ObjectDisplay.ValidateOptions(options);
            if (ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.UseHexadecimalNumbers)) {
                return "0x" + value.ToString("x2");
            }
            else {
                return value.ToString(System.Globalization.CultureInfo.InvariantCulture);
            }
        }
        public static FormatLiteral_3560(value: number, options: ObjectDisplayOptions): string {
            ObjectDisplay.ValidateOptions(options);
            if (ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.UseHexadecimalNumbers)) {
                return "0x" + (value >= 0 ? value.ToString("x4") : (<number>value).ToString("x8"));
            }
            else {
                return value.ToString(System.Globalization.CultureInfo.InvariantCulture);
            }
        }
        public static FormatLiteral_1078(value: number, options: ObjectDisplayOptions): string {
            ObjectDisplay.ValidateOptions(options);
            if (ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.UseHexadecimalNumbers)) {
                return "0x" + value.ToString("x4");
            }
            else {
                return value.ToString(System.Globalization.CultureInfo.InvariantCulture);
            }
        }
        public static FormatLiteral_6182(value: number, options: ObjectDisplayOptions): string {
            ObjectDisplay.ValidateOptions(options);
            if (ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.UseHexadecimalNumbers)) {
                return "0x" + value.ToString("x8");
            }
            else {
                return value.ToString(System.Globalization.CultureInfo.InvariantCulture);
            }
        }
        public static FormatLiteral_8940(value: number, options: ObjectDisplayOptions): string {
            ObjectDisplay.ValidateOptions(options);
            var pooledBuilder = Collections.PooledStringBuilder.GetInstance();
            var sb = pooledBuilder.Builder;
            if (ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.UseHexadecimalNumbers)) {
                sb.Append("0x");
                sb.Append(value.ToString("x8"));
            }
            else {
                sb.Append(value.ToString(System.Globalization.CultureInfo.InvariantCulture));
            }
            if (ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.IncludeTypeSuffix)) {
                sb.Append('U');
            }
            return pooledBuilder.ToStringAndFree_3093();
        }
        public static FormatLiteral_2865(value: number, options: ObjectDisplayOptions): string {
            ObjectDisplay.ValidateOptions(options);
            var pooledBuilder = Collections.PooledStringBuilder.GetInstance();
            var sb = pooledBuilder.Builder;
            if (ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.UseHexadecimalNumbers)) {
                sb.Append("0x");
                sb.Append(value.ToString("x16"));
            }
            else {
                sb.Append(value.ToString(System.Globalization.CultureInfo.InvariantCulture));
            }
            if (ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.IncludeTypeSuffix)) {
                sb.Append('L');
            }
            return pooledBuilder.ToStringAndFree_3093();
        }
        public static FormatLiteral_5056(value: number, options: ObjectDisplayOptions): string {
            ObjectDisplay.ValidateOptions(options);
            var pooledBuilder = Collections.PooledStringBuilder.GetInstance();
            var sb = pooledBuilder.Builder;
            if (ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.UseHexadecimalNumbers)) {
                sb.Append("0x");
                sb.Append(value.ToString("x16"));
            }
            else {
                sb.Append(value.ToString(System.Globalization.CultureInfo.InvariantCulture));
            }
            if (ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.IncludeTypeSuffix)) {
                sb.Append("UL");
            }
            return pooledBuilder.ToStringAndFree_3093();
        }
        public static FormatLiteral_1188(value: number, options: ObjectDisplayOptions): string {
            ObjectDisplay.ValidateOptions(options);
            var result = value.ToString("R", System.Globalization.CultureInfo.InvariantCulture);
            return ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.IncludeTypeSuffix) ? result + "D" : result;
        }
        public static FormatLiteral_1087(value: number, options: ObjectDisplayOptions): string {
            ObjectDisplay.ValidateOptions(options);
            var result = value.ToString("R", System.Globalization.CultureInfo.InvariantCulture);
            return ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.IncludeTypeSuffix) ? result + "F" : result;
        }
        public static FormatLiteral_8649(value: number, options: ObjectDisplayOptions): string {
            ObjectDisplay.ValidateOptions(options);
            var result = value.ToString(System.Globalization.CultureInfo.InvariantCulture);
            return ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.IncludeTypeSuffix) ? result + "M" : result;
        }
        private static ValidateOptions(options: ObjectDisplayOptions): void {
            System.Diagnostics.Debug.Assert(!(ObjectDisplayExtensions.IncludesOption(options,
                ObjectDisplayOptions.UseQuotes) && ObjectDisplayExtensions.IncludesOption(options,
                    ObjectDisplayOptions.UseHexadecimalNumbers)));
        }
    }
}