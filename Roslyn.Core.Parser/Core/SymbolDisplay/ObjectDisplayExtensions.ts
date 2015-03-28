module Microsoft.CodeAnalysis {
    export class ObjectDisplayExtensions {
        public static IncludesOption(options: ObjectDisplayOptions, flag: ObjectDisplayOptions): boolean {
            return (options & flag) == flag;
        }
    }
}