module Microsoft.CodeAnalysis {
    export enum ThreeState {
        Unknown = 0, False = 1, True = 2
    }
    export class ThreeStateHelpers {
        public static ToThreeState(value: boolean): ThreeState {
            return value ? ThreeState.True : ThreeState.False;
        }
        public static HasValue(value: ThreeState): boolean {
            return value != ThreeState.Unknown;
        }
        public static Value(value: ThreeState): boolean {
            System.Diagnostics.Debug.Assert(value != ThreeState.Unknown);
            return value == ThreeState.True;
        }
    }
}