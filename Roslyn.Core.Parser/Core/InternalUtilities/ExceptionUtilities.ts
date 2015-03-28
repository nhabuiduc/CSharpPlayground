module Roslyn.Utilities {
    export class ExceptionUtilities {
        public static UnexpectedValue(o: Object): System.Exception {
            var output: string = System.String.Format("Unexpected value '{0}' of type '{1}'", o,(o != null) ? typeof o: "<unknown>");
            System.Diagnostics.Debug.Assert(false, output);
            return new System.InvalidOperationException(output);
        }
        public static get Unreachable(): System.Exception {
            return new System.InvalidOperationException("This program location is thought to be unreachable.");
        }
    }
}