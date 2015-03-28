module Microsoft.CodeAnalysis.Instrumentation {
    export class PerformanceGoals {
        public static Goals: string[];
        public static Undefined: string = "Undefined";
        static static_ctor_PerformanceGoals() {
            var Throughput_100: string = "Throughput_100";
            PerformanceGoals.Goals = new Array(<number>FunctionId.Count);
            PerformanceGoals.Goals[<number>FunctionId.CSharp_SyntaxTree_FullParse] = Throughput_100;
            PerformanceGoals.Goals[<number>FunctionId.VisualBasic_SyntaxTree_FullParse] = Throughput_100;
            return 0;
        }

        static static_construct = PerformanceGoals.static_ctor_PerformanceGoals();
    }
}