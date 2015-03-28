module System.Diagnostics.Tracing {
    /// <summary>
    /// WindowsEventLevel
    /// </summary>
    export enum EventLevel {
        /// <summary>
        /// Log always
        /// </summary>
        LogAlways = 0,
        /// <summary>
        /// Only critical errors
        /// </summary>
        Critical,
        /// <summary>
        /// All errors, including previous levels
        /// </summary>
        Error,
        /// <summary>
        /// All warnings, including previous levels
        /// </summary>
        Warning,
        /// <summary>
        /// All informational events, including previous levels
        /// </summary>
        Informational,
        /// <summary>
        /// All events, including previous levels 
        /// </summary>
        Verbose
    }
}