module Microsoft.CodeAnalysis.CSharp {
    export enum LanguageVersion {
        CSharp1 = 1,
        CSharp2 = 2,
        CSharp3 = 3,
        CSharp4 = 4,
        CSharp5 = 5,
        CSharp6 = 6
    }
    export class LanguageVersionExtensions {
        public static IsValid(value: LanguageVersion): boolean {
            return value >= LanguageVersion.CSharp1 && value <= LanguageVersion.CSharp6;
        }
        public static Localize(value: LanguageVersion): Object {
            return <number>value;
        }
        public static GetErrorCode(version: LanguageVersion): ErrorCode {
            switch (version) {
                case LanguageVersion.CSharp1:
                    return ErrorCode.ERR_FeatureNotAvailableInVersion1;
                case LanguageVersion.CSharp2:
                    return ErrorCode.ERR_FeatureNotAvailableInVersion2;
                case LanguageVersion.CSharp3:
                    return ErrorCode.ERR_FeatureNotAvailableInVersion3;
                case LanguageVersion.CSharp4:
                    return ErrorCode.ERR_FeatureNotAvailableInVersion4;
                case LanguageVersion.CSharp5:
                    return ErrorCode.ERR_FeatureNotAvailableInVersion5;
                case LanguageVersion.CSharp6:
                    return ErrorCode.ERR_FeatureNotAvailableInVersion6;
                default:
                    throw Roslyn.Utilities.ExceptionUtilities.UnexpectedValue(version);
            }
        }
    }
}