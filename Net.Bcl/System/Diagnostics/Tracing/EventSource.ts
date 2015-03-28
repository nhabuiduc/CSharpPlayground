module System.Diagnostics.Tracing {
    export class EventSource {
        public WriteEvent(code: number, arg1: string|number, arg2?: number, arg3?: number): void {

        }

        protected  OnEventCommand(command: System.Diagnostics.Tracing.EventCommandEventArgs): void {
        }

        public IsEnabled(level?: EventLevel, keyword?: EventKeywords): boolean {
            return false;
        }
    }
}