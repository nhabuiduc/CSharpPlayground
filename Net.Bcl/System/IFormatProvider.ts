module System {
    export interface IFormatProvider {
        GetFormat(formatType: Type): Object;
    }
}