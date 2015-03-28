module Microsoft.CodeAnalysis.Instrumentation {
    export class Logger {
        private static lastUniqueBlockId: number = 0;
        private static GetNextUniqueBlockId(): number {
            Logger.lastUniqueBlockId++;
            return Logger.lastUniqueBlockId;
            //var lastUniqueBlockId_ref0 = { refObj: Logger.lastUniqueBlockId };
            //var ret_val__557 = System.Threading.Interlocked.Increment(lastUniqueBlockId_ref0);

            //Logger.lastUniqueBlockId = lastUniqueBlockId_ref0.refObj;
            //return ret_val__557;
        }
        private static IsEnabled(functionId: FunctionId): boolean {
            return RoslynCompilerEventSource.Instance.IsEnabled();
        }
        private static IsVerbose(): boolean {
            return RoslynCompilerEventSource.Instance.IsEnabled(System.Diagnostics.Tracing.EventLevel.Verbose,(<System.Diagnostics.Tracing.EventKeywords>(-1)));
        }
        public static LogString_1794(functionId: FunctionId, message: string = null): void {
            if (!Logger.IsEnabled(functionId)) {
                return
            }
            message = Logger.IsVerbose() ? message : System.String.Empty;
            RoslynCompilerEventSource.Instance.LogString(message != null ? message : System.String.Empty, functionId);
        }
        public static LogString_1877(functionId: FunctionId, messageGetter: () => string): void {
            if (!Logger.IsEnabled(functionId)) {
                return
            }
            var message = Logger.IsVerbose() ? messageGetter() : System.String.Empty;
            RoslynCompilerEventSource.Instance.LogString(message, functionId);
        }
        public static LogString_1018<TArg0>(functionId: FunctionId, messageGetter: (_: TArg0) => string, arg0: TArg0): void {
            if (!Logger.IsEnabled(functionId)) {
                return
            }
            var message = Logger.IsVerbose() ? messageGetter(arg0) : System.String.Empty;
            RoslynCompilerEventSource.Instance.LogString(message, functionId);
        }
        public static LogString_1002<TArg0, TArg1>(functionId: FunctionId, messageGetter: (_: TArg0, __: TArg1) => string, arg0: TArg0, arg1: TArg1): void {
            if (!Logger.IsEnabled(functionId)) {
                return
            }
            var message = Logger.IsVerbose() ? messageGetter(arg0, arg1) : System.String.Empty;
            RoslynCompilerEventSource.Instance.LogString(message, functionId);
        }
        public static LogString_2002<TArg0, TArg1, TArg2>(functionId: FunctionId, messageGetter: (_: TArg0, __: TArg1, ___: TArg2) => string, arg0: TArg0, arg1: TArg1, arg2: TArg2): void {
            if (!Logger.IsEnabled(functionId)) {
                return
            }
            var message = Logger.IsVerbose() ? messageGetter(arg0, arg1, arg2) : System.String.Empty;
            RoslynCompilerEventSource.Instance.LogString(message, functionId);
        }
        public static LogString_1771<TArg0, TArg1, TArg2, TArg3>(functionId: FunctionId, messageGetter: (_: TArg0, __: TArg1, ___: TArg2, ____: TArg3) => string, arg0: TArg0, arg1: TArg1, arg2: TArg2, arg3: TArg3): void {
            if (!Logger.IsEnabled(functionId)) {
                return
            }
            var message = Logger.IsVerbose() ? messageGetter(arg0, arg1, arg2, arg3) : System.String.Empty;
            RoslynCompilerEventSource.Instance.LogString(message, functionId);
        }
        public static LogBlock_1335(functionId: FunctionId, message: string = null, number: number = 0, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): Logger.Block {
            if (!Logger.IsEnabled(functionId)) {
                return structDefault(Logger.Block);
            }
            message = Logger.IsVerbose() ? message : System.String.Empty;
            return new Logger.Block().ctor_6625(functionId, number, message != null ? message : System.String.Empty, Logger.GetNextUniqueBlockId(), cancellationToken);
        }
        public static LogBlock_1676(functionId: FunctionId, messageGetter: () => string, number: number = 0, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): Logger.Block {
            if (!Logger.IsEnabled(functionId)) {
                return structDefault(Logger.Block);
            }
            var message = Logger.IsVerbose() ? messageGetter() : System.String.Empty;
            return new Logger.Block().ctor_6625(functionId, number, message, Logger.GetNextUniqueBlockId(), cancellationToken);
        }
        public static LogBlock_1399<TArg0>(functionId: FunctionId, messageGetter: (_: TArg0) => string, arg0: TArg0, number: number = 0, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): Logger.Block {
            if (!Logger.IsEnabled(functionId)) {
                return structDefault(Logger.Block);
            }
            var message = Logger.IsVerbose() ? messageGetter(arg0) : System.String.Empty;
            return new Logger.Block().ctor_6625(functionId, number, message, Logger.GetNextUniqueBlockId(), cancellationToken);
        }
        public static LogBlock_1215<TArg0, TArg1>(functionId: FunctionId, messageGetter: (_: TArg0, __: TArg1) => string, arg0: TArg0, arg1: TArg1, number: number = 0, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): Logger.Block {
            if (!Logger.IsEnabled(functionId)) {
                return structDefault(Logger.Block);
            }
            var message = Logger.IsVerbose() ? messageGetter(arg0, arg1) : System.String.Empty;
            return new Logger.Block().ctor_6625(functionId, number, message, Logger.GetNextUniqueBlockId(), cancellationToken);
        }
        public static LogBlock_1471<TArg0, TArg1, TArg2>(functionId: FunctionId, messageGetter: (_: TArg0, __: TArg1, ___: TArg2) => string, arg0: TArg0, arg1: TArg1, arg2: TArg2, number: number = 0, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): Logger.Block {
            if (!Logger.IsEnabled(functionId)) {
                return structDefault(Logger.Block);
            }
            var message = Logger.IsVerbose() ? messageGetter(arg0, arg1, arg2) : System.String.Empty;
            return new Logger.Block().ctor_6625(functionId, number, message, Logger.GetNextUniqueBlockId(), cancellationToken);
        }
        public static LogBlock_8586<TArg0, TArg1, TArg2, TArg3>(functionId: FunctionId, messageGetter: (_: TArg0, __: TArg1, ___: TArg2, ____: TArg3) => string, arg0: TArg0, arg1: TArg1, arg2: TArg2, arg3: TArg3, number: number = 0, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): Logger.Block {
            if (!Logger.IsEnabled(functionId)) {
                return structDefault(Logger.Block);
            }
            var message = Logger.IsVerbose() ? messageGetter(arg0, arg1, arg2, arg3) : System.String.Empty;
            return new Logger.Block().ctor_6625(functionId, number, message, Logger.GetNextUniqueBlockId(), cancellationToken);
        }
    }
    export module Logger {
        export class Block implements System.IDisposable, IStruct {
            private functionId: FunctionId = 0;
            private number: number = 0;
            private blockId: number = 0;
            private cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken);
            ctor_6625(functionId: FunctionId, number: number, message: string, blockId: number, cancellationToken: System.Threading.CancellationToken): Block {
                System.Diagnostics.Debug.Assert(functionId > 0);
                this.functionId = functionId;
                this.number = number;
                this.blockId = blockId;
                this.cancellationToken = cancellationToken;
                RoslynCompilerEventSource.Instance.BlockStart(message, functionId, blockId);
                return this;
            }
            public Dispose(): void {
                if (this.functionId == 0) {
                    return
                }
                if (this.cancellationToken.IsCancellationRequested) {
                    RoslynCompilerEventSource.Instance.BlockCanceled(this.functionId, this.number, this.blockId);
                }
                else {
                    RoslynCompilerEventSource.Instance.BlockStop(this.functionId, this.number, this.blockId);
                }
            }
            constructor() { }
        }
    }
}