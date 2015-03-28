module Microsoft.CodeAnalysis.Instrumentation {
    export class RoslynCompilerEventSource extends System.Diagnostics.Tracing.EventSource {
        public static Instance: RoslynCompilerEventSource = new RoslynCompilerEventSource().ctor_1071();
        private initialized: boolean = false;
        ctor_1071(): RoslynCompilerEventSource {
            this.initialized = true;
            return this;
        }
        public LogString(message: string, functionId: FunctionId): void {
            this.WriteEvent(1, message != null ? message : System.String.Empty, <number>functionId);
        }
        public BlockStart(message: string, functionId: FunctionId, blockId: number): void {
            this.WriteEvent(2, message != null ? message : System.String.Empty, <number>functionId, blockId);
        }
        public BlockStop(functionId: FunctionId, number: number, blockId: number): void {
            this.WriteEvent(3, <number>functionId, number, blockId);
        }
        public BlockCanceled(functionId: FunctionId, number: number, blockId: number): void {
            this.WriteEvent(4, <number>functionId, number, blockId);
        }
        public SendFunctionDefinitions_1251(definitions: string): void {
            this.WriteEvent(5, definitions);
        }
        protected  OnEventCommand(command: System.Diagnostics.Tracing.EventCommandEventArgs): void {
            super.OnEventCommand(command);
            if (command.Command == System.Diagnostics.Tracing.EventCommand.SendManifest || command.Command != System.Diagnostics.Tracing.EventCommand.Disable || this.FunctionDefinitionRequested(command)) {
                if (this.initialized) {
                    this.SendFunctionDefinitionsAsync();
                }
                else {
                    //Comments
                    //System.Threading.Tasks.Task.Yield().GetAwaiter().OnCompleted(this.SendFunctionDefinitionsAsync.bind(this));
                }
            }
        }
        private FunctionDefinitionRequested(command: System.Diagnostics.Tracing.EventCommandEventArgs): boolean {
            return command.Arguments != null && System.Linq.Enumerable.FirstOrDefault(command.Arguments.Keys) == "SendFunctionDefinitions";
        }
        private SendFunctionDefinitionsAsync(): void {
            //Comments
            //System.Threading.Tasks.Task.Run(<() => void>SendFunctionDefinitions);
        }
        private SendFunctionDefinitions_6303(): void {
            this.SendFunctionDefinitions_1251(RoslynCompilerEventSource.GenerateFunctionDefinitions());
        }
        public static GenerateFunctionDefinitions(): string {
            var output = new System.Text.StringBuilder();
            //Comments
            //var assembly = System.Reflection.IntrospectionExtensions.GetTypeInfo(/*typeof*/FunctionId).Assembly;
            //output.AppendLine(System.Reflection.CustomAttributeExtensions.GetCustomAttribute(assembly).Version);
            //var functionIds = from field in typeof (FunctionId).GetTypeInfo().DeclaredFields
            //where !field.IsSpecialName && field.Name != "Count"
            //select KeyValuePair.Create(field.Name,(int)field.GetValue(null));
            // for each
            var output = new System.Text.StringBuilder();
            var arr = Gb.GetEnumMembers(<any>FunctionId);
            for (var i = 0; i < arr.length; i++) {
                var func = arr[i];
                output.Append(func.value);
                output.Append(' ');
                output.Append(func.key);
                output.Append(' ');
                output.AppendLine(PerformanceGoals.Goals[func.value] == null ? PerformanceGoals.Undefined : PerformanceGoals.Goals[func.value]);
            }
            return output.ToString();
        }
        constructor() { super(); }
    }
}