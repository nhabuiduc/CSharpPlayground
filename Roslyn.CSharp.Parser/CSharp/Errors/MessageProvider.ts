module Microsoft.CodeAnalysis.CSharp {
    export class MessageProvider extends CommonMessageProvider implements Roslyn.Utilities.IObjectWritable, Roslyn.Utilities.IObjectReadable {
        public static Instance: MessageProvider = new MessageProvider().ctor_2080();
        ctor_2080(): MessageProvider {
            return this;
        }
       WriteTo(writer: Roslyn.Utilities.ObjectWriter): void {

        }
        GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
            return (r) => MessageProvider.Instance;
        }
        public GetSeverity(code: number): DiagnosticSeverity {
            return ErrorFacts.GetSeverity(<ErrorCode>code);
        }
        public LoadMessage(code: number, language: System.Globalization.CultureInfo): string {
            return ErrorFacts.GetMessage_1431(<ErrorCode>code, language);
        }
        public GetMessageFormat(code: number): LocalizableString {
            return ErrorFacts.GetMessageFormat(<ErrorCode>code);
        }
        public GetDescription(code: number): LocalizableString {
            return ErrorFacts.GetDescription(<ErrorCode>code);
        }
        public GetTitle(code: number): LocalizableString {
            return ErrorFacts.GetTitle(<ErrorCode>code);
        }
        public GetHelpLink(code: number): string {
            return ErrorFacts.GetHelpLink(<ErrorCode>code);
        }
        public GetCategory(code: number): string {
            return ErrorFacts.GetCategory(<ErrorCode>code);
        }
        public get CodePrefix(): string {
            return "CS";
        }
        public GetMessagePrefix(id: string, severity: DiagnosticSeverity, isWarningAsError: boolean, culture: System.Globalization.CultureInfo): string {
            return System.String.Format(culture, "{0} {1}", severity == DiagnosticSeverity.Error || isWarningAsError ? "error" : "warning", id);
        }
        public GetWarningLevel(code: number): number {
            return ErrorFacts.GetWarningLevel(<ErrorCode>code);
        }
        public get ErrorCodeType(): System.Type {
            return /*typeof*/<any>ErrorCode;
        }
        public get ERR_FailedToCreateTempFile(): number {
            return <number>ErrorCode.ERR_CantMakeTempFile;
        }
        public get ERR_NoScriptsSpecified(): number {
            return <number>ErrorCode.ERR_NoScriptsSpecified;
        }
        public get ERR_OpenResponseFile(): number {
            return <number>ErrorCode.ERR_OpenResponseFile;
        }
        public get FTL_InputFileNameTooLong(): number {
            return <number>ErrorCode.FTL_InputFileNameTooLong;
        }
        public get ERR_FileNotFound(): number {
            return <number>ErrorCode.ERR_FileNotFound;
        }
        public get ERR_NoSourceFile(): number {
            return <number>ErrorCode.ERR_NoSourceFile;
        }
        public get ERR_CantOpenFileWrite(): number {
            return <number>ErrorCode.ERR_CantOpenFileWrite;
        }
        public get ERR_OutputWriteFailed(): number {
            return <number>ErrorCode.ERR_OutputWriteFailed;
        }
        public get WRN_NoConfigNotOnCommandLine(): number {
            return <number>ErrorCode.WRN_NoConfigNotOnCommandLine;
        }
        public get ERR_BinaryFile(): number {
            return <number>ErrorCode.ERR_BinaryFile;
        }
        public get WRN_AnalyzerCannotBeCreated(): number {
            return <number>ErrorCode.WRN_AnalyzerCannotBeCreated;
        }
        public get WRN_NoAnalyzerInAssembly(): number {
            return <number>ErrorCode.WRN_NoAnalyzerInAssembly;
        }
        public get WRN_UnableToLoadAnalyzer(): number {
            return <number>ErrorCode.WRN_UnableToLoadAnalyzer;
        }
        public get INF_UnableToLoadSomeTypesInAnalyzer(): number {
            return <number>ErrorCode.INF_UnableToLoadSomeTypesInAnalyzer;
        }
        public get ERR_CantReadRulesetFile(): number {
            return <number>ErrorCode.ERR_CantReadRulesetFile;
        }
        public get ERR_InvalidDebugInformationFormat(): number {
            return <number>ErrorCode.ERR_InvalidDebugInformationFormat;
        }
        public get ERR_InvalidOutputName(): number {
            return <number>ErrorCode.ERR_InvalidOutputName;
        }
        public get ERR_InvalidFileAlignment(): number {
            return <number>ErrorCode.ERR_InvalidFileAlignment;
        }
        public get ERR_InvalidSubsystemVersion(): number {
            return <number>ErrorCode.ERR_InvalidSubsystemVersion;
        }
        public get ERR_MetadataFileNotAssembly(): number {
            return <number>ErrorCode.ERR_ImportNonAssembly;
        }
        public get ERR_MetadataFileNotModule(): number {
            return <number>ErrorCode.ERR_AddModuleAssembly;
        }
        public get ERR_InvalidAssemblyMetadata(): number {
            return <number>ErrorCode.FTL_MetadataCantOpenFile;
        }
        public get ERR_InvalidModuleMetadata(): number {
            return <number>ErrorCode.FTL_MetadataCantOpenFile;
        }
        public get ERR_ErrorOpeningAssemblyFile(): number {
            return <number>ErrorCode.FTL_MetadataCantOpenFile;
        }
        public get ERR_ErrorOpeningModuleFile(): number {
            return <number>ErrorCode.FTL_MetadataCantOpenFile;
        }
        public get ERR_MetadataFileNotFound(): number {
            return <number>ErrorCode.ERR_NoMetadataFile;
        }
        public get ERR_MetadataReferencesNotSupported(): number {
            return <number>ErrorCode.ERR_MetadataReferencesNotSupported;
        }
        public get ERR_LinkedNetmoduleMetadataMustProvideFullPEImage(): number {
            return <number>ErrorCode.ERR_LinkedNetmoduleMetadataMustProvideFullPEImage;
        }
        public get ERR_PublicKeyFileFailure(): number {
            return <number>ErrorCode.ERR_PublicKeyFileFailure;
        }
        public get ERR_PublicKeyContainerFailure(): number {
            return <number>ErrorCode.ERR_PublicKeyContainerFailure;
        }
        public get ERR_CantReadResource(): number {
            return <number>ErrorCode.ERR_CantReadResource;
        }
        public get ERR_CantOpenWin32Resource(): number {
            return <number>ErrorCode.ERR_CantOpenWin32Res;
        }
        public get ERR_CantOpenWin32Manifest(): number {
            return <number>ErrorCode.ERR_CantOpenWin32Manifest;
        }
        public get ERR_CantOpenWin32Icon(): number {
            return <number>ErrorCode.ERR_CantOpenIcon;
        }
        public get ERR_ErrorBuildingWin32Resource(): number {
            return <number>ErrorCode.ERR_ErrorBuildingWin32Resources;
        }
        public get ERR_BadWin32Resource(): number {
            return <number>ErrorCode.ERR_BadWin32Res;
        }
        public get ERR_ResourceFileNameNotUnique(): number {
            return <number>ErrorCode.ERR_ResourceFileNameNotUnique;
        }
        public get ERR_ResourceNotUnique(): number {
            return <number>ErrorCode.ERR_ResourceNotUnique;
        }
        public get ERR_ResourceInModule(): number {
            return <number>ErrorCode.ERR_CantRefResource;
        }
        public get ERR_PermissionSetAttributeFileReadError(): number {
            return <number>ErrorCode.ERR_PermissionSetAttributeFileReadError;
        }
        public get WRN_PdbUsingNameTooLong(): number {
            return <number>ErrorCode.WRN_DebugFullNameTooLong;
        }
        public get WRN_PdbLocalNameTooLong(): number {
            return <number>ErrorCode.WRN_PdbLocalNameTooLong;
        }
        public get ERR_PdbWritingFailed(): number {
            return <number>ErrorCode.FTL_DebugEmitFailure;
        }
        public get ERR_MetadataNameTooLong(): number {
            return <number>ErrorCode.ERR_MetadataNameTooLong;
        }
        public get ERR_EncReferenceToAddedMember(): number {
            return <number>ErrorCode.ERR_EncReferenceToAddedMember;
        }
        constructor() { super(); }
    }
}