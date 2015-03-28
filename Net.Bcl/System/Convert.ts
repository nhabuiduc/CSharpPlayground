module System {
    export class Convert {
        public static ToString(object: Object, format: IFormatProvider) {
            if ((<any>object).ToString !== void 0) {
                return (<any> object).ToString();
            }
            return object.toString();
        }
    }
}