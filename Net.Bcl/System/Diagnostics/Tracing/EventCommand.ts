module System.Diagnostics.Tracing {
    export enum EventCommand {
        Update = 0,
        SendManifest = -1,
        Enable = -2,
        Disable = -3
    };
}