module System {
    export class String {

        public static Empty: string = '';
        public static Format(format: System.IFormatProvider, s: string, ...args: Array<any>): string;
        public static Format(s: string, ...args: Array<any>): string;
        public static Format(param1: any, param2: any, param3: any): string {
            var s: string;
            var args: Array<any> = [];
            var index = 0;
            if (typeof param1 == 'string') {
                s = param1;
                index = 1;
            } else {
                s = param2;
                index = 2;
            }

            //var a = [];
            for (var _i = index; _i < arguments.length; _i++) {
                args[_i - index] = arguments[_i];
            }
            // trick
            args = __unWrapArray(args);            

             // TODO: we have only one culture now
            for (var i: number = 0; i < args.length; i++) {


                var find: string = "{" + i + "}";
                var regex: RegExp = new RegExp(this.escapeRegExp(find), "g");
                s = s.replace(regex, args[i].toString());
            }
            return s.replace(/{{/g, "{").replace(/}}/g, "}");
        }

        public static Equals(str1: string, str2: string, comparison?: StringComparison): boolean {
            if (typeof comparison == 'undefined') {
                comparison = System.StringComparison.CurrentCulture;
            }

            // TODO: we have only one culture now
            if (comparison == System.StringComparison.CurrentCultureIgnoreCase
                || comparison == System.StringComparison.InvariantCultureIgnoreCase
                || comparison == System.StringComparison.OrdinalIgnoreCase) {
                str1 = System.String.ToLower(str1);
                str2 = System.String.ToLower(str2);
            }

            return str1 == str2;
        }

        public static IsUpper(value: string): boolean {
            return value === value.toUpperCase();            
        }

        public static IsLower(value: string): boolean {
            return value === value.toLowerCase();
        }

        public static ToUpper(value: string): string {
            return value.toUpperCase();
        }

        public static ToLower(value: string): string {
            return value.toLowerCase();
        }


        public static IsNullOrEmpty(value: string): boolean {
            return value == null || value == '';
        }

        public static IsNullOrWhiteSpace(value: string): boolean {
            if (value == null) {
                return true;
            }

            return /^\s*$/.test(value);
        }

        public static Join(separator: string, source: System.Collections.Generic.IEnumerable<string>): string {

            var list = new Array<string>();
            // for each
            var itemEnumerator = source.GetEnumerator();
            try {
                while (itemEnumerator.MoveNext()) {
                    var item = itemEnumerator.Current;
                    list.push(item);
                    // foreach block                   
                }
            } finally {
                if (typeof itemEnumerator['Dispose'] != 'undefined') itemEnumerator.Dispose();
            }

            return list.join(separator);
            // end foreach
        }
        public static CompareOrdinal(str1: string, str2: string) {
            return String.Compare(str1, str2, StringComparison.Ordinal);
        }

        public static Compare(str1: string, str2: string, comparison?: StringComparison|boolean): number {
            if (typeof comparison === 'boolean') {
                comparison = <boolean>comparison ? StringComparison.OrdinalIgnoreCase : StringComparison.InvariantCulture;
            }
            if (comparison === void 0) {
                comparison = StringComparison.InvariantCulture;
            }

            // TODO: we have only one culture now
            if (comparison == System.StringComparison.CurrentCultureIgnoreCase
                || comparison == System.StringComparison.InvariantCultureIgnoreCase
                || comparison == System.StringComparison.OrdinalIgnoreCase) {
                str1 = System.String.ToLower(str1);
                str2 = System.String.ToLower(str2);
            }

            return str1.localeCompare(str2);
        }

        public static Concat(...strs: string[]): string {
            return strs.join();
        }

        private static escapeRegExp(str) {
            
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
        
    }
}