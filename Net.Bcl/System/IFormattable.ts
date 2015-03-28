module System {
    export interface IFormattable {
        ToString(format: string, formatProvider: IFormatProvider): string;
    }
}