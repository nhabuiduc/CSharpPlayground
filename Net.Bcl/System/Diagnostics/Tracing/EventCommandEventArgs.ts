module System.Diagnostics.Tracing {
    export class EventCommandEventArgs {
        public Command: EventCommand;
        public Arguments: System.Collections.Generic.IDictionary<string, string>;
    }
}