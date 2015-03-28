module System.Runtime.CompilerServices {
    export class RuntimeHelpers {
        public static GetHashCode(obj: any): number {
            if (typeof obj == 'string') {
                //return RuntimeHelpers.GetStringHashCode(obj);
                return obj.GetHashCode();
            }

            if (typeof obj == 'number') {
                return obj.GetHashCode();
            }

            if (typeof obj["GetHashCode"] !== 'undefined') {
                return obj.GetHashCode();
            }

            throw new System.NotSupportedException('Get hash code');
        }

        private static GetStringHashCode(obj: string): number {
            return obj.GetHashCode();
        }

        
    }
}