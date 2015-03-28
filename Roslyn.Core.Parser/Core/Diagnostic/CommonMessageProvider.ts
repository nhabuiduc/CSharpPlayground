module Microsoft.CodeAnalysis {
    export class CommonMessageProvider {
        public GetSeverity(code: number): DiagnosticSeverity { throw new Error('not implemented'); }
        public LoadMessage(code: number, language: System.Globalization.CultureInfo): string { throw new Error('not implemented'); }
        public GetTitle(code: number): LocalizableString { throw new Error('not implemented'); }
        public GetDescription(code: number): LocalizableString { throw new Error('not implemented'); }
        public GetMessageFormat(code: number): LocalizableString { throw new Error('not implemented'); }
        public GetHelpLink(code: number): string { throw new Error('not implemented'); }
        public GetCategory(code: number): string { throw new Error('not implemented'); }
        public CodePrefix: string;
        public GetWarningLevel(code: number): number { throw new Error('not implemented'); }
        public ErrorCodeType: System.Type;
        public GetMessagePrefix(id: string, severity: DiagnosticSeverity, isWarningAsError: boolean, culture: System.Globalization.CultureInfo): string { throw new Error('not implemented'); }
        public GetIdForErrorCode(errorCode: number): string {
            return this.CodePrefix + errorCode.ToString("0000");
        }
        public ERR_FailedToCreateTempFile: number;
        public ERR_NoScriptsSpecified: number;
        public ERR_OpenResponseFile: number;
        public FTL_InputFileNameTooLong: number;
        public ERR_FileNotFound: number;
        public ERR_NoSourceFile: number;
        public ERR_CantOpenFileWrite: number;
        public ERR_OutputWriteFailed: number;
        public WRN_NoConfigNotOnCommandLine: number;
        public ERR_BinaryFile: number;
        public WRN_UnableToLoadAnalyzer: number;
        public INF_UnableToLoadSomeTypesInAnalyzer: number;
        public WRN_AnalyzerCannotBeCreated: number;
        public WRN_NoAnalyzerInAssembly: number;
        public ERR_CantReadRulesetFile: number;
        public ERR_InvalidDebugInformationFormat: number;
        public ERR_InvalidFileAlignment: number;
        public ERR_InvalidSubsystemVersion: number;
        public ERR_InvalidOutputName: number;
        public ERR_MetadataFileNotAssembly: number;
        public ERR_MetadataFileNotModule: number;
        public ERR_InvalidAssemblyMetadata: number;
        public ERR_InvalidModuleMetadata: number;
        public ERR_ErrorOpeningAssemblyFile: number;
        public ERR_ErrorOpeningModuleFile: number;
        public ERR_MetadataFileNotFound: number;
        public ERR_MetadataReferencesNotSupported: number;
        public ERR_LinkedNetmoduleMetadataMustProvideFullPEImage: number;
        public ERR_PublicKeyFileFailure: number;
        public ERR_PublicKeyContainerFailure: number;
        public ERR_CantReadResource: number;
        public ERR_CantOpenWin32Resource: number;
        public ERR_CantOpenWin32Manifest: number;
        public ERR_CantOpenWin32Icon: number;
        public ERR_BadWin32Resource: number;
        public ERR_ErrorBuildingWin32Resource: number;
        public ERR_ResourceNotUnique: number;
        public ERR_ResourceFileNameNotUnique: number;
        public ERR_ResourceInModule: number;
        public ERR_PermissionSetAttributeFileReadError: number;
        public WRN_PdbUsingNameTooLong: number;
        public WRN_PdbLocalNameTooLong: number;
        public ERR_PdbWritingFailed: number;
        public ERR_MetadataNameTooLong: number;
        public ERR_EncReferenceToAddedMember: number;
        constructor() { }
    }
}