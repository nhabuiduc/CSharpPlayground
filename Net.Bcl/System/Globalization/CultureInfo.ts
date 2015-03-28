module System.Globalization {
    export class CultureInfo implements IFormatProvider {
        public static CurrentUICulture = new CultureInfo();
        public static InvariantCulture = new CultureInfo();
        public GetFormat(formatType: Type): Object {
            return null;
        }
    }
}