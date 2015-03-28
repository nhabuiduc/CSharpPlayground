module System.Diagnostics.Tracing {
    /// <summary>
    /// WindowsEventLevel
    /// </summary>
    export enum EventKeywords {
        /// <summary>
        /// Wild card value
        /// </summary>
        None = 0x0,
        /// <summary>
        /// WDI context events
        /// </summary>
        WdiContext = 0x02000000000000,
        /// <summary>
        /// WDI diagnostic events
        /// </summary>
        WdiDiagnostic = 0x04000000000000,
        /// <summary>
        /// SQM events
        /// </summary>
        Sqm = 0x08000000000000,
        /// <summary>
        /// FAiled security audits
        /// </summary>
        AuditFailure = 0x10000000000000,
        /// <summary>
        /// Successful security audits
        /// </summary>
        AuditSuccess = 0x20000000000000,
        /// <summary>
        /// Transfer events where the related Activity ID is a computed value and not a GUID
        /// </summary>
        CorrelationHint = 0x10000000000000,
        /// <summary>
        /// Events raised using classic eventlog API
        /// </summary>
        EventLogClassic = 0x80000000000000
    }
}