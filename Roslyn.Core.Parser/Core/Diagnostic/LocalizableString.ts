module Microsoft.CodeAnalysis {
    export class LocalizableString implements System.IFormattable {
        public ToString_1106(formatProvider: System.IFormatProvider): string { throw new Error('not implemented'); }
        public static op_Explicit_9899(localizableResource: LocalizableString): string {
            return localizableResource.ToString_1106(null);
        }
        public static op_Implicit_1404(fixedResource: string): LocalizableString {
            return new LocalizableString.FixedLocalizableString().ctor_8981(fixedResource);
        }
        //public ToString(): string {
        //    return this.ToString_1106(null);
        //}
        ToString(ignored: string, formatProvider: System.IFormatProvider): string {
            return this.ToString_1106(formatProvider);
        }
        private myHash: number = Gb.NextHashCode();
        public GetHashCode(): number {
            return this.myHash;
        }
        constructor() { }
    }
    export module LocalizableString {
        export class FixedLocalizableString extends LocalizableString {
            private fixedString: string;
            ctor_8981(fixedResource: string): FixedLocalizableString {
                this.fixedString = fixedResource;
                return this;
            }
            public ToString_1106(formatProvider: System.IFormatProvider): string {
                return this.fixedString;
            }
            constructor() { super(); }
        }
    }
}