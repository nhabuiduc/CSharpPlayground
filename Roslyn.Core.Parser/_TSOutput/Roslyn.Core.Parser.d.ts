declare module Microsoft.CodeAnalysis {
    class CodeAnalysisResources {
        static AbsolutePathExpected: string;
        static ArgumentCannotBeEmpty: string;
        static ArgumentElementCannotBeNull: string;
        static ArraysWithMoreThanOneDimensionCannotBeSerialized: string;
        static Assembly: string;
        static AssemblyFileNotFound: string;
        static AssemblyMustHaveAtLeastOneModule: string;
        static AssemblySigningNotSupported: string;
        static CannotAliasModule: string;
        static CannotCreateReferenceToModule: string;
        static CannotCreateReferenceToSubmission: string;
        static CannotEmbedInteropTypesFromModule: string;
        static CantCreateModuleReferenceToAssembly: string;
        static CantCreateReferenceToDynamicAssembly: string;
        static ChangesMustBeOrderedAndNotOverlapping: string;
        static Class1: string;
        static CoffResourceInvalidRelocation: string;
        static CoffResourceInvalidSectionSize: string;
        static CoffResourceInvalidSymbol: string;
        static CoffResourceMissingSection: string;
        static CompilationOptionsMustNotHaveErrors: string;
        static CompilerAnalyzerFailure: string;
        static CompilerAnalyzerThrows: string;
        static Constructor: string;
        static Delegate1: string;
        static DiagnosticIdCantBeNullOrWhitespace: string;
        static EmptyOrInvalidFileName: string;
        static EmptyOrInvalidResourceName: string;
        static EndMustNotBeLessThanStart: string;
        static Enum1: string;
        static Event1: string;
        static ExpectedNonEmptyPublicKey: string;
        static FailedToResolveRuleSetName: string;
        static Field: string;
        static FileNotFound: string;
        static FileSizeExceedsMaximumAllowed: string;
        static GetMetadataMustReturnInstance: string;
        static IconStreamUnexpectedFormat: string;
        static InMemoryAssembly: string;
        static InMemoryModule: string;
        static Interface1: string;
        static InvalidAlias: string;
        static InvalidAssemblyName: string;
        static InvalidCharactersInAssemblyCultureName: string;
        static InvalidCharactersInAssemblyName: string;
        static InvalidCompilationOptions: string;
        static InvalidContentType: string;
        static InvalidCultureName: string;
        static InvalidHash: string;
        static InvalidModuleName: string;
        static InvalidOutputKindForSubmission: string;
        static InvalidRuleSetInclude: string;
        static InvalidSizeOfPublicKeyToken: string;
        static Method: string;
        static Module: string;
        static ModuleCopyCannotBeUsedToCreateAssemblyMetadata: string;
        static NameCannotBeEmpty: string;
        static NameCannotStartWithWhitespace: string;
        static NameContainsInvalidCharacter: string;
        static OutputKindNotSupported: string;
        static Parameter: string;
        static PathReturnedByResolveMetadataFileMustBeAbsolute: string;
        static PathReturnedByResolveStrongNameKeyFileMustBeAbsolute: string;
        static PEImageDoesntContainManagedMetadata: string;
        static PEImageNotAvailable: string;
        static PreviousSubmissionHasErrors: string;
        static Property: string;
        static ReferenceResolverShouldReturnReadableNonNullStream: string;
        static ResourceDataProviderShouldReturnNonNullStream: string;
        static ResourceStreamProviderShouldReturnNonNullStream: string;
        static Return1: string;
        static ReturnTypeCannotBeValuePointerbyRefOrOpen: string;
        static ReturnTypeCannotBeVoidByRefOrOpen: string;
        static RuleSetHasDuplicateRules: string;
        static RuleSetSchemaViolation: string;
        static SeverityError: string;
        static SeverityHidden: string;
        static SeverityInfo: string;
        static SeverityWarning: string;
        static SizeHasToBePositive: string;
        static SpanDoesNotIncludeEndOfLine: string;
        static SpanDoesNotIncludeStartOfLine: string;
        static StartMustNotBeNegative: string;
        static StreamMustSupportReadAndSeek: string;
        static Struct1: string;
        static TypeMustBeASubclassOfSyntaxAnnotation: string;
        static TypeMustBeSameAsHostObjectTypeOfPreviousSubmission: string;
        static TypeParameter: string;
        static Unresolved: string;
        static UnsupportedHashAlgorithm: string;
        static ValueTooLargeToBeRepresented: string;
        static WinRTIdentityCantBeRetargetable: string;
        static XmlReferencesNotSupported: string;
    }
}
declare module Roslyn.Utilities {
    class ObjectPool<T> {
        private firstItem;
        private items;
        private factory;
        ctor_3306(factory: () => T): ObjectPool<T>;
        ctor_5203(factory: () => T, size: number): ObjectPool<T>;
        private CreateInstance();
        Allocate(): T;
        private AllocateSlow();
        Free(obj: T): void;
        private FreeSlow(obj);
        ForgetTrackedObject(old: T, replacement?: T): void;
        private Validate(obj);
        constructor();
    }
    module ObjectPool {
        class Element<T> implements IStruct {
            Value: T;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class ArrayBuilder<T> implements System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlyList<T> {
        builder: System.Collections.Immutable.ImmutableArray.Builder<T>;
        private pool;
        ctor_1158(size: number): ArrayBuilder<T>;
        ctor_2019(): ArrayBuilder<T>;
        ctor_1444(pool: Roslyn.Utilities.ObjectPool<ArrayBuilder<T>>): ArrayBuilder<T>;
        ToImmutable(): System.Collections.Immutable.ImmutableArray<T>;
        Count: number;
        $get$(index: number): T;
        $set$(index: number, value: T): void;
        Add(item: T): void;
        Insert(index: number, item: T): void;
        EnsureCapacity(capacity: number): void;
        Clear(): void;
        Contains(item: T): boolean;
        RemoveAt(index: number): void;
        RemoveLast(): void;
        ToArray(): T[];
        Last(): T;
        First(): T;
        Any(): boolean;
        ToImmutableOrNull(): System.Collections.Immutable.ImmutableArray<T>;
        ToDowncastedImmutable<U extends T>(): System.Collections.Immutable.ImmutableArray<U>;
        ToImmutableAndFree(): System.Collections.Immutable.ImmutableArray<T>;
        ToArrayAndFree(): T[];
        Free(): void;
        private static PoolInstance;
        static GetInstance_1997<T>(): ArrayBuilder<T>;
        static GetInstance_9802<T>(capacity: number): ArrayBuilder<T>;
        static GetInstance_7127<T>(capacity: number, fillWithValue: T): ArrayBuilder<T>;
        static CreatePool_2004<T>(): Roslyn.Utilities.ObjectPool<ArrayBuilder<T>>;
        static CreatePool_7738<T>(size: number): Roslyn.Utilities.ObjectPool<ArrayBuilder<T>>;
        GetEnumerator(): ArrayBuilder.Enumerator<T>;
        AddRange_1909(items: System.Collections.Immutable.ImmutableArray<T>): void;
        AddRange_2893(items: System.Collections.Immutable.ImmutableArray<T>, length: number): void;
        AddRange_6776(items: System.Collections.Generic.IEnumerable<T>): void;
        AddRange_1179(...items: T[]): void;
        AddRange_1745(items: T[], length: number): void;
        Clip(limit: number): void;
        ZeroInit(count: number): void;
        AddMany(item: T, count: number): void;
        constructor();
    }
    module ArrayBuilder {
        class DebuggerProxy<T> {
            private builder;
            ctor_1459(builder: ArrayBuilder<T>): DebuggerProxy<T>;
            A: T[];
            constructor();
        }
        class Enumerator<T> implements System.Collections.Generic.IEnumerator<T>, IStruct {
            private builder;
            private index;
            ctor_9504(builder: ArrayBuilder<T>): Enumerator<T>;
            Current: T;
            MoveNext(): boolean;
            Dispose(): void;
            Reset(): void;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class ArrayBuilderExtensions {
        static Any<T>(builder: ArrayBuilder<T>, predicate: (_: T) => boolean): boolean;
        static All<T>(builder: ArrayBuilder<T>, predicate: (_: T) => boolean): boolean;
        static SelectAsArray_1569<TItem, TResult>(items: ArrayBuilder<TItem>, map: (_: TItem) => TResult): System.Collections.Immutable.ImmutableArray<TResult>;
        static SelectAsArray_3004<TItem, TArg, TResult>(items: ArrayBuilder<TItem>, map: (_: TItem, __: TArg) => TResult, arg: TArg): System.Collections.Immutable.ImmutableArray<TResult>;
        static AddOptional<T>(builder: ArrayBuilder<T>, item: T): void;
        static Push<T>(builder: ArrayBuilder<T>, e: T): void;
        static Pop<T>(builder: ArrayBuilder<T>): T;
        static Peek<T>(builder: ArrayBuilder<T>): T;
    }
}
declare module Microsoft.CodeAnalysis {
    class ArrayElement<T> {
        Value: T;
        static MakeElementArray<T>(items: T[]): ArrayElement<T>[];
        static MakeArray<T>(items: ArrayElement<T>[]): T[];
    }
}
declare module Microsoft.CodeAnalysis {
    class CachingBase<TEntry> {
        protected mask: number;
        protected entries: TEntry[];
        ctor_1934(size: number): CachingBase<TEntry>;
        private static AlignSize(size);
        constructor();
    }
    class CachingFactory<TKey, TValue> extends CachingBase<CachingFactory.Entry<TKey, TValue>> {
        private size;
        private valueFactory;
        private keyHash;
        private keyValueEquality;
        ctor_1794(size: number, valueFactory: (_: TKey) => TValue, keyHash: (_: TKey) => number, keyValueEquality: (_: TKey, __: TValue) => boolean): CachingFactory<TKey, TValue>;
        Add(key: TKey, value: TValue): void;
        TryGetValue(key: TKey, value: {
            refObj: TValue;
        }): boolean;
        GetOrMakeValue(key: TKey): TValue;
        private GetKeyHash(key);
        constructor();
    }
    class CachingIdentityFactory<TKey, TValue> extends CachingBase<CachingIdentityFactory.Entry<TKey, TValue>> {
        private valueFactory;
        private pool;
        ctor_1901(size: number, valueFactory: (_: TKey) => TValue): CachingIdentityFactory<TKey, TValue>;
        ctor_3951(size: number, valueFactory: (_: TKey) => TValue, pool: Roslyn.Utilities.ObjectPool<CachingIdentityFactory<TKey, TValue>>): CachingIdentityFactory<TKey, TValue>;
        Add(key: TKey, value: TValue): void;
        TryGetValue(key: TKey, value: {
            refObj: TValue;
        }): boolean;
        GetOrMakeValue(key: TKey): TValue;
        static CreatePool<TKey, TValue>(size: number, valueFactory: (_: TKey) => TValue): Roslyn.Utilities.ObjectPool<CachingIdentityFactory<TKey, TValue>>;
        Free(): void;
        constructor();
    }
    module CachingFactory {
        class Entry<TKey, TValue> implements IStruct {
            hash: number;
            value: TValue;
            constructor();
        }
    }
    module CachingIdentityFactory {
        class Entry<TKey, TValue> implements IStruct {
            key: TKey;
            value: TValue;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class ImmutableArrayExtensions {
        static AsImmutable_7446<T>(items: System.Collections.Generic.IEnumerable<T>): System.Collections.Immutable.ImmutableArray<T>;
        static AsImmutableOrEmpty_1620<T>(items: System.Collections.Generic.IEnumerable<T>): System.Collections.Immutable.ImmutableArray<T>;
        static AsImmutableOrNull_2024<T>(items: System.Collections.Generic.IEnumerable<T>): System.Collections.Immutable.ImmutableArray<T>;
        static AsImmutable_1998<T>(items: T[]): System.Collections.Immutable.ImmutableArray<T>;
        static AsImmutableOrNull_9386<T>(items: T[]): System.Collections.Immutable.ImmutableArray<T>;
        static AsImmutableOrEmpty_1316<T>(items: T[]): System.Collections.Immutable.ImmutableArray<T>;
        static SelectAsArray_1026<TItem, TArg, TResult>(items: System.Collections.Immutable.ImmutableArray<TItem>, map: (_: TItem, __: number, ___: TArg) => TResult, arg: TArg): System.Collections.Immutable.ImmutableArray<TResult>;
        static WhereAsArray<T>(array: System.Collections.Immutable.ImmutableArray<T>, predicate: (_: T) => boolean): System.Collections.Immutable.ImmutableArray<T>;
        static NullToEmpty<T>(array: System.Collections.Immutable.ImmutableArray<T>): System.Collections.Immutable.ImmutableArray<T>;
        static HasAnyErrors<T extends Diagnostic>(diagnostics: System.Collections.Immutable.ImmutableArray<T>): boolean;
    }
}
declare module Microsoft.CodeAnalysis.Collections {
    class PooledStringBuilder {
        Builder: System.Text.StringBuilder;
        private pool;
        ctor_1297(pool: Roslyn.Utilities.ObjectPool<PooledStringBuilder>): PooledStringBuilder;
        Length: number;
        Free(): void;
        ToString(): string;
        ToStringAndFree_3093(): string;
        ToStringAndFree_5388(startIndex: number, length: number): string;
        private static PoolInstance;
        static CreatePool(): Roslyn.Utilities.ObjectPool<PooledStringBuilder>;
        static GetInstance(): PooledStringBuilder;
        static op_Implicit_1714(obj: PooledStringBuilder): System.Text.StringBuilder;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    class ParseOptions {
        Kind: SourceCodeKind;
        DocumentationMode: DocumentationMode;
        ctor_2205(kind: SourceCodeKind, documentationMode: DocumentationMode): ParseOptions;
        WithKind(kind: SourceCodeKind): ParseOptions;
        protected CommonWithKind(kind: SourceCodeKind): ParseOptions;
        WithDocumentationMode(documentationMode: DocumentationMode): ParseOptions;
        protected CommonWithDocumentationMode(documentationMode: DocumentationMode): ParseOptions;
        WithFeatures(features: System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, string>>): ParseOptions;
        protected CommonWithFeatures(features: System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, string>>): ParseOptions;
        Features: System.Collections.Generic.IReadOnlyDictionary<string, string>;
        PreprocessorSymbolNames: System.Collections.Generic.IEnumerable<string>;
        Equals(obj: Object): boolean;
        protected EqualsHelper(other: ParseOptions): boolean;
        GetHashCode(): number;
        protected GetHashCodeHelper(): number;
        private HashFeatures(features);
        op_Equality(right: ParseOptions): boolean;
        op_Inequality(right: ParseOptions): boolean;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    class SourceReferenceResolver {
        constructor();
        Equals(other: Object): boolean;
        GetHashCode(): number;
        NormalizePath(path: string, baseFilePath: string): string;
        ResolveReference(path: string, baseFilePath: string): string;
        OpenRead(resolvedPath: string): System.IO.Stream;
        OpenReadChecked(fullPath: string): System.IO.Stream;
    }
}
declare module Microsoft.CodeAnalysis {
    class CryptographicHashProvider {
        private lazySHA1Hash;
        private lazySHA256Hash;
        private lazySHA384Hash;
        private lazySHA512Hash;
        private lazyMD5Hash;
        constructor();
        static GetHashSize(algorithmId: Microsoft.CodeAnalysis.Text.SourceHashAlgorithm): number;
        static Sha1HashSize: number;
    }
}
declare module Microsoft.CodeAnalysis {
    class CommonDiagnosticComparer implements System.Collections.Generic.IEqualityComparer<Diagnostic> {
        Equals(x: Diagnostic, y: Diagnostic): boolean;
        GetHashCode(obj: Diagnostic): number;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    class CommonMessageProvider {
        GetSeverity(code: number): DiagnosticSeverity;
        LoadMessage(code: number, language: System.Globalization.CultureInfo): string;
        GetTitle(code: number): LocalizableString;
        GetDescription(code: number): LocalizableString;
        GetMessageFormat(code: number): LocalizableString;
        GetHelpLink(code: number): string;
        GetCategory(code: number): string;
        CodePrefix: string;
        GetWarningLevel(code: number): number;
        ErrorCodeType: System.Type;
        GetMessagePrefix(id: string, severity: DiagnosticSeverity, isWarningAsError: boolean, culture: System.Globalization.CultureInfo): string;
        GetIdForErrorCode(errorCode: number): string;
        ERR_FailedToCreateTempFile: number;
        ERR_NoScriptsSpecified: number;
        ERR_OpenResponseFile: number;
        FTL_InputFileNameTooLong: number;
        ERR_FileNotFound: number;
        ERR_NoSourceFile: number;
        ERR_CantOpenFileWrite: number;
        ERR_OutputWriteFailed: number;
        WRN_NoConfigNotOnCommandLine: number;
        ERR_BinaryFile: number;
        WRN_UnableToLoadAnalyzer: number;
        INF_UnableToLoadSomeTypesInAnalyzer: number;
        WRN_AnalyzerCannotBeCreated: number;
        WRN_NoAnalyzerInAssembly: number;
        ERR_CantReadRulesetFile: number;
        ERR_InvalidDebugInformationFormat: number;
        ERR_InvalidFileAlignment: number;
        ERR_InvalidSubsystemVersion: number;
        ERR_InvalidOutputName: number;
        ERR_MetadataFileNotAssembly: number;
        ERR_MetadataFileNotModule: number;
        ERR_InvalidAssemblyMetadata: number;
        ERR_InvalidModuleMetadata: number;
        ERR_ErrorOpeningAssemblyFile: number;
        ERR_ErrorOpeningModuleFile: number;
        ERR_MetadataFileNotFound: number;
        ERR_MetadataReferencesNotSupported: number;
        ERR_LinkedNetmoduleMetadataMustProvideFullPEImage: number;
        ERR_PublicKeyFileFailure: number;
        ERR_PublicKeyContainerFailure: number;
        ERR_CantReadResource: number;
        ERR_CantOpenWin32Resource: number;
        ERR_CantOpenWin32Manifest: number;
        ERR_CantOpenWin32Icon: number;
        ERR_BadWin32Resource: number;
        ERR_ErrorBuildingWin32Resource: number;
        ERR_ResourceNotUnique: number;
        ERR_ResourceFileNameNotUnique: number;
        ERR_ResourceInModule: number;
        ERR_PermissionSetAttributeFileReadError: number;
        WRN_PdbUsingNameTooLong: number;
        WRN_PdbLocalNameTooLong: number;
        ERR_PdbWritingFailed: number;
        ERR_MetadataNameTooLong: number;
        ERR_EncReferenceToAddedMember: number;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    class Diagnostic implements System.IEquatable<Diagnostic>, System.IFormattable {
        static CompilerDiagnosticCategory: string;
        static HighestValidWarningLevel: number;
        static Create_2896(descriptor: DiagnosticDescriptor, location: Location, ...messageArgs: Object[]): Diagnostic;
        static Create_1146(descriptor: DiagnosticDescriptor, location: Location, additionalLocations: System.Collections.Generic.IEnumerable<Location>, ...messageArgs: Object[]): Diagnostic;
        static Create_1175(id: string, category: string, message: LocalizableString, severity: DiagnosticSeverity, defaultSeverity: DiagnosticSeverity, isEnabledByDefault: boolean, warningLevel: number, title?: LocalizableString, description?: LocalizableString, helpLink?: string, location?: Location, additionalLocations?: System.Collections.Generic.IEnumerable<Location>, customTags?: System.Collections.Generic.IEnumerable<string>): Diagnostic;
        static Create_2350(messageProvider: CommonMessageProvider, errorCode: number): Diagnostic;
        static Create_1351(messageProvider: CommonMessageProvider, errorCode: number, ...argumentsRest: Object[]): Diagnostic;
        static Create_1806(info: DiagnosticInfo): Diagnostic;
        Descriptor: DiagnosticDescriptor;
        Id: string;
        Category: string;
        GetMessage(formatProvider?: System.IFormatProvider): string;
        DefaultSeverity: DiagnosticSeverity;
        Severity: DiagnosticSeverity;
        WarningLevel: number;
        IsEnabledByDefault: boolean;
        IsWarningAsError: boolean;
        Location: Location;
        AdditionalLocations: System.Collections.Generic.IReadOnlyList<Location>;
        CustomTags: System.Collections.Generic.IReadOnlyList<string>;
        ToString(ignored?: string, formatProvider?: System.IFormatProvider): string;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        Equals_8787(obj: Diagnostic): boolean;
        WithLocation(location: Location): Diagnostic;
        WithSeverity(severity: DiagnosticSeverity): Diagnostic;
        Code: number;
        Arguments: System.Collections.Generic.IReadOnlyList<Object>;
        ContainsLocation(tree: SyntaxTree, filterSpanWithinTree?: Text.TextSpan): boolean;
        private GetDiagnosticLocationsWithinTree(tree);
        WithReportDiagnostic(reportAction: ReportDiagnostic): Diagnostic;
        static GetDefaultWarningLevel(severity: DiagnosticSeverity): number;
        IsNotConfigurable(): boolean;
        constructor();
    }
    module Diagnostic {
        class SimpleDiagnostic extends Diagnostic {
            private descriptor;
            private severity;
            private warningLevel;
            private location;
            private additionalLocations;
            private messageArgs;
            ctor_1463(descriptor: DiagnosticDescriptor, severity: DiagnosticSeverity, warningLevel: number, location: Location, additionalLocations: System.Collections.Generic.IEnumerable<Location>, messageArgs: Object[]): SimpleDiagnostic;
            static Create_1471(descriptor: DiagnosticDescriptor, severity: DiagnosticSeverity, warningLevel: number, location: Location, additionalLocations: System.Collections.Generic.IEnumerable<Location>, messageArgs: Object[]): SimpleDiagnostic;
            static Create_3980(id: string, title: LocalizableString, category: string, message: LocalizableString, description: LocalizableString, helpLink: string, severity: DiagnosticSeverity, defaultSeverity: DiagnosticSeverity, isEnabledByDefault: boolean, warningLevel: number, location: Location, additionalLocations: System.Collections.Generic.IEnumerable<Location>, customTags: System.Collections.Generic.IEnumerable<string>): SimpleDiagnostic;
            Descriptor: DiagnosticDescriptor;
            Id: string;
            GetMessage(formatProvider?: System.IFormatProvider): string;
            Arguments: System.Collections.Generic.IReadOnlyList<Object>;
            Severity: DiagnosticSeverity;
            WarningLevel: number;
            Location: Location;
            AdditionalLocations: System.Collections.Generic.IReadOnlyList<Location>;
            Equals_8787(obj: Diagnostic): boolean;
            Equals(obj: Object): boolean;
            GetHashCode(): number;
            WithLocation(location: Location): Diagnostic;
            WithSeverity(severity: DiagnosticSeverity): Diagnostic;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis {
}
declare module Microsoft.CodeAnalysis {
    class DiagnosticBag {
        lazyBag: System.Collections.Concurrent.ConcurrentQueue<Diagnostic>;
        IsEmptyWithoutResolution: boolean;
        HasAnyErrors(): boolean;
        Add(diag: Diagnostic): void;
        AddRange_8543<T extends Diagnostic>(diagnostics: System.Collections.Immutable.ImmutableArray<T>): void;
        AddRange_1233(diagnostics: System.Collections.Generic.IEnumerable<Diagnostic>): void;
        AddRange_7045(bag: DiagnosticBag): void;
        AddRangeAndFree(bag: DiagnosticBag): void;
        ToReadOnlyAndFree_8611<TDiagnostic extends Diagnostic>(): System.Collections.Immutable.ImmutableArray<TDiagnostic>;
        ToReadOnlyAndFree_9919(): System.Collections.Immutable.ImmutableArray<Diagnostic>;
        ToReadOnly_6177<TDiagnostic extends Diagnostic>(): System.Collections.Immutable.ImmutableArray<TDiagnostic>;
        ToReadOnly_8964(): System.Collections.Immutable.ImmutableArray<Diagnostic>;
        private static ToReadOnlyCore<TDiagnostic>(oldBag);
        AsEnumerable(): System.Collections.Generic.IEnumerable<Diagnostic>;
        private AsEnumerableFiltered();
        AsEnumerableWithoutResolution(): System.Collections.Generic.IEnumerable<Diagnostic>;
        ToString(): string;
        private Bag;
        Clear(): void;
        static GetInstance(): DiagnosticBag;
        Free(): void;
        private static poolInstance;
        private static CreatePool(size);
        private GetDebuggerDisplay();
        constructor();
    }
    module DiagnosticBag {
        class DebuggerProxy {
            private bag;
            ctor_2011(bag: DiagnosticBag): DebuggerProxy;
            Diagnostics: Object[];
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class DiagnosticDescriptor {
        Id: string;
        Title: LocalizableString;
        Description: LocalizableString;
        HelpLink: string;
        MessageFormat: LocalizableString;
        Category: string;
        DefaultSeverity: DiagnosticSeverity;
        IsEnabledByDefault: boolean;
        CustomTags: System.Collections.Generic.IEnumerable<string>;
        ctor_1011(id: string, title: string, messageFormat: string, category: string, defaultSeverity: DiagnosticSeverity, isEnabledByDefault: boolean, description?: string, helpLink?: string, ...customTags: string[]): DiagnosticDescriptor;
        ctor_1931(id: string, title: LocalizableString, messageFormat: LocalizableString, category: string, defaultSeverity: DiagnosticSeverity, isEnabledByDefault: boolean, description?: LocalizableString, helpLink?: string, ...customTags: string[]): DiagnosticDescriptor;
        ctor_3991(id: string, title: LocalizableString, messageFormat: LocalizableString, category: string, defaultSeverity: DiagnosticSeverity, isEnabledByDefault: boolean, description: LocalizableString, helpLink: string, customTags: System.Collections.Immutable.ImmutableArray<string>): DiagnosticDescriptor;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        IsNotConfigurable_1344(): boolean;
        static IsNotConfigurable_2122(customTags: System.Collections.Generic.IEnumerable<string>): boolean;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    class DiagnosticFormatter {
        Format(diagnostic: Diagnostic, formatter?: System.IFormatProvider): string;
        FormatSourcePath(path: string, basePath: string, formatter: System.IFormatProvider): string;
        FormatSourceSpan(span: Text.LinePositionSpan, formatter: System.IFormatProvider): string;
        GetMessagePrefix(diagnostic: Diagnostic, culture: System.Globalization.CultureInfo): string;
        static Instance: DiagnosticFormatter;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    class WellKnownDiagnosticTags {
        static Unnecessary: string;
        static EditAndContinue: string;
        static Build: string;
        static Telemetry: string;
        static NotConfigurable: string;
        static AnalyzerException: string;
    }
}
declare module Microsoft.CodeAnalysis {
    class DiagnosticInfo implements System.IFormattable, Roslyn.Utilities.IObjectWritable, Roslyn.Utilities.IObjectReadable, IMessageSerializable {
        private messageProvider;
        private errorCode;
        private defaultSeverity;
        private effectiveSeverity;
        private arguments;
        private static errorCodeToDescriptorMap;
        private static CompilerErrorCustomTags;
        private static CompilerNonErrorCustomTags;
        ctor_9510(messageProvider: CommonMessageProvider, errorCode: number): DiagnosticInfo;
        ctor_4145(messageProvider: CommonMessageProvider, errorCode: number, ...argumentsRest: Object[]): DiagnosticInfo;
        ctor_1200(original: DiagnosticInfo, overridenSeverity: DiagnosticSeverity): DiagnosticInfo;
        static GetDescriptor(errorCode: number, messageProvider: CommonMessageProvider): DiagnosticDescriptor;
        private static GetOrCreateDescriptor(errorCode, defaultSeverity, messageProvider);
        private static CreateDescriptor(errorCode, defaultSeverity, messageProvider);
        static AssertMessageSerializable(args: Object[]): void;
        ctor_6897(messageProvider: CommonMessageProvider, isWarningAsError: boolean, errorCode: number, ...argumentsRest: Object[]): DiagnosticInfo;
        GetInstanceWithSeverity(severity: DiagnosticSeverity): DiagnosticInfo;
        WriteTo(writer: Roslyn.Utilities.ObjectWriter): void;
        GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object;
        ctor_1156(reader: Roslyn.Utilities.ObjectReader): DiagnosticInfo;
        Code: number;
        Descriptor: DiagnosticDescriptor;
        Severity: DiagnosticSeverity;
        DefaultSeverity: DiagnosticSeverity;
        WarningLevel: number;
        IsWarningAsError: boolean;
        Category: string;
        CustomTags: System.Collections.Immutable.ImmutableArray<string>;
        private static GetCustomTags(defaultSeverity);
        IsNotConfigurable(): boolean;
        AdditionalLocations: System.Collections.Generic.IReadOnlyList<Location>;
        MessageIdentifier: string;
        GetMessage(formatProvider?: System.IFormatProvider): string;
        private GetArgumentsToUse(culture);
        private InitializeArgumentListIfNeeded(argumentsToUse);
        Arguments: Object[];
        MessageProvider: CommonMessageProvider;
        ToString_1106(formatProvider: System.IFormatProvider): string;
        ToString(format?: string, formatProvider?: System.IFormatProvider): string;
        GetHashCode(): number;
        Equals(obj: Object): boolean;
        private GetDebuggerDisplay();
        GetResolvedInfo(): DiagnosticInfo;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    enum DiagnosticSeverity {
        Hidden = 0,
        Info = 1,
        Warning = 2,
        Error = 3,
    }
    class InternalErrorCode {
        static Unknown: number;
        static Void: number;
    }
    class InternalDiagnosticSeverity {
        static Unknown: DiagnosticSeverity;
        static Void: DiagnosticSeverity;
    }
}
declare module Microsoft.CodeAnalysis {
    class DiagnosticWithInfo extends Diagnostic {
        private info;
        private location;
        ctor_3747(info: DiagnosticInfo, location: Location): DiagnosticWithInfo;
        Location: Location;
        AdditionalLocations: System.Collections.Generic.IReadOnlyList<Location>;
        CustomTags: System.Collections.Generic.IReadOnlyList<string>;
        Descriptor: DiagnosticDescriptor;
        Id: string;
        Category: string;
        Code: number;
        Severity: DiagnosticSeverity;
        DefaultSeverity: DiagnosticSeverity;
        IsEnabledByDefault: boolean;
        WarningLevel: number;
        GetMessage(formatProvider?: System.IFormatProvider): string;
        Arguments: System.Collections.Generic.IReadOnlyList<Object>;
        Info: DiagnosticInfo;
        HasLazyInfo: boolean;
        GetHashCode(): number;
        Equals(obj: Object): boolean;
        Equals_8787(obj: Diagnostic): boolean;
        WithLocation(location: Location): Diagnostic;
        WithSeverity(severity: DiagnosticSeverity): Diagnostic;
        IsNotConfigurable(): boolean;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    class Location {
        ctor_1148(): Location;
        Kind: LocationKind;
        IsInSource: boolean;
        SourceTree: SyntaxTree;
        SourceSpan: Text.TextSpan;
        GetLineSpan(): FileLinePositionSpan;
        GetMappedLineSpan(): FileLinePositionSpan;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        ToString(): string;
        op_Equality(right: Location): boolean;
        op_Inequality(right: Location): boolean;
        static None: Location;
        static Create_2122(syntaxTree: SyntaxTree, textSpan: Text.TextSpan): Location;
        static Create_1465(filePath: string, textSpan: Text.TextSpan, lineSpan: Text.LinePositionSpan): Location;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    class ExternalFileLocation extends Location implements System.IEquatable<ExternalFileLocation> {
        private sourceSpan;
        private lineSpan;
        ctor_1166(filePath: string, sourceSpan: Text.TextSpan, lineSpan: Text.LinePositionSpan): ExternalFileLocation;
        SourceSpan: Text.TextSpan;
        GetLineSpan(): FileLinePositionSpan;
        GetMappedLineSpan(): FileLinePositionSpan;
        Kind: LocationKind;
        Equals(obj: Object): boolean;
        Equals_1713(obj: ExternalFileLocation): boolean;
        GetHashCode(): number;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    class FileLinePositionSpan implements System.IEquatable<FileLinePositionSpan>, IStruct {
        private path;
        private span;
        private hasMappedPath;
        Path: string;
        HasMappedPath: boolean;
        StartLinePosition: Text.LinePosition;
        EndLinePosition: Text.LinePosition;
        Span: Text.LinePositionSpan;
        ctor_1503(path: string, start: Text.LinePosition, end: Text.LinePosition): FileLinePositionSpan;
        ctor_2529(path: string, span: Text.LinePositionSpan): FileLinePositionSpan;
        ctor_1079(path: string, span: Text.LinePositionSpan, hasMappedPath: boolean): FileLinePositionSpan;
        IsValid: boolean;
        Equals_2972(other: FileLinePositionSpan): boolean;
        Equals(other: Object): boolean;
        GetHashCode(): number;
        ToString(): string;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    interface IMessageSerializable {
    }
}
declare module Microsoft.CodeAnalysis {
    class LocalizableString implements System.IFormattable {
        ToString_1106(formatProvider: System.IFormatProvider): string;
        static op_Explicit_9899(localizableResource: LocalizableString): string;
        static op_Implicit_1404(fixedResource: string): LocalizableString;
        ToString(ignored: string, formatProvider: System.IFormatProvider): string;
        private myHash;
        GetHashCode(): number;
        constructor();
    }
    module LocalizableString {
        class FixedLocalizableString extends LocalizableString {
            private fixedString;
            ctor_8981(fixedResource: string): FixedLocalizableString;
            ToString_1106(formatProvider: System.IFormatProvider): string;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class LocalizableResourceString extends LocalizableString implements Roslyn.Utilities.IObjectReadable, Roslyn.Utilities.IObjectWritable {
        private nameOfLocalizableResource;
        private resourceManager;
        private resourceSource;
        private formatArguments;
        private static EmptyArguments;
        ctor_1830(nameOfLocalizableResource: string, resourceManager: System.Resources.ResourceManager, resourceSource: System.Type, ...formatArguments: string[]): LocalizableResourceString;
        ctor_9714(reader: Roslyn.Utilities.ObjectReader): LocalizableResourceString;
        GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object;
        WriteTo(writer: Roslyn.Utilities.ObjectWriter): void;
        ToString_1106(formatProvider: System.IFormatProvider): string;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    enum LocationKind {
        None = 0,
        SourceFile = 1,
        MetadataFile = 2,
        XmlFile = 3,
        ExternalFile = 4,
    }
}
declare module Microsoft.CodeAnalysis {
    class NoLocation extends Location {
        static Singleton: Location;
        constructor();
        Kind: LocationKind;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
    }
}
declare module Microsoft.CodeAnalysis {
    enum ReportDiagnostic {
        Default = 0,
        Error = 1,
        Warn = 2,
        Info = 3,
        Hidden = 4,
        Suppress = 5,
    }
}
declare module Microsoft.CodeAnalysis {
    class SourceLocation extends Location implements System.IEquatable<SourceLocation> {
        private syntaxTree;
        private span;
        ctor_1003(syntaxTree: SyntaxTree, span: Text.TextSpan): SourceLocation;
        ctor_1875(node: SyntaxNode): SourceLocation;
        ctor_1902(token: SyntaxToken): SourceLocation;
        ctor_1192(nodeOrToken: SyntaxNodeOrToken): SourceLocation;
        ctor_2008(trivia: SyntaxTrivia): SourceLocation;
        ctor_1638(syntaxRef: SyntaxReference): SourceLocation;
        Kind: LocationKind;
        SourceSpan: Text.TextSpan;
        SourceTree: SyntaxTree;
        GetLineSpan(): FileLinePositionSpan;
        GetMappedLineSpan(): FileLinePositionSpan;
        Equals_2017(other: SourceLocation): boolean;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    enum DocumentationMode {
        None = 0,
        Parse = 1,
        Diagnose = 2,
    }
    class DocumentationModeEnumBounds {
        static IsValid(value: DocumentationMode): boolean;
    }
}
declare module Microsoft.CodeAnalysis.Instrumentation {
    enum FunctionId {
        CSharp_SyntaxTree_FullParse = 1,
        CSharp_SyntaxTree_IncrementalParse = 2,
        CSharp_SyntaxTree_GetText = 3,
        CSharp_SyntaxNode_SerializeTo = 4,
        CSharp_SyntaxNode_DeserializeFrom = 5,
        CSharp_Compilation_Create = 6,
        CSharp_Compilation_AddSyntaxTrees = 7,
        CSharp_Compilation_RemoveSyntaxTrees = 8,
        CSharp_Compilation_ReplaceSyntaxTree = 9,
        CSharp_Compilation_FindEntryPoint = 10,
        CSharp_Compilation_ClassifyConversion = 11,
        CSharp_Compilation_GetDiagnostics = 12,
        CSharp_Compilation_Emit = 13,
        CSharp_Compilation_CreateSourceAssembly = 14,
        CSharp_Compilation_GetGlobalNamespace = 15,
        CSharp_Compiler_CompileMethodBodies = 16,
        CSharp_Compiler_CompileSynthesizedMethodMetadata = 17,
        CSharp_DocumentationCommentCompiler_WriteDocumentationCommentXml = 18,
        CSharp_CommandLineParser_Parse = 19,
        CSharp_SemanticModel_GetTypeInfo = 20,
        CSharp_SemanticModel_GetConversion = 21,
        CSharp_SemanticModel_GetSpeculativeTypeInfo = 22,
        CSharp_SemanticModel_GetSymbolInfo = 23,
        CSharp_SemanticModel_GetSpeculativeSymbolInfo = 24,
        CSharp_SemanticModel_LookupSymbols = 25,
        CSharp_SemanticModel_AnalyzeControlFlow = 26,
        CSharp_SemanticModel_AnalyzeDataFlow = 27,
        CSharp_SemanticModel_ClassifyConversion = 28,
        CSharp_SemanticModel_ClassifyConversionForCast = 29,
        CSharp_SemanticModel_GetDeclaredSymbol = 30,
        CSharp_SemanticModel_GetDeclaredConstructorSymbol = 31,
        CSharp_SemanticModel_ResolveOverloads = 32,
        CSharp_SemanticModel_ResolveIndexerOverloads = 33,
        CSharp_SemanticModel_GetDiagnostics = 34,
        CSharp_SemanticModel_GetMemberGroup = 35,
        CSharp_SemanticModel_GetIndexerGroup = 36,
        CSharp_SemanticModel_GetConstantValue = 37,
        CSharp_SemanticModel_GetQueryClauseInfo = 38,
        CSharp_SemanticModel_GetAwaitExpressionInfo = 39,
        CSharp_SemanticModel_GetForEachStatementInfo = 40,
        CSharp_SemanticModel_GetAliasInfo = 41,
        CSharp_SemanticModel_GetSpeculativeAliasInfo = 42,
        CSharp_SemanticModel_GetEnclosingSymbol = 43,
        CSharp_SemanticModel_IsAccessible = 44,
        CSharp_SemanticModel_GetPreprocessorSymbolInfo = 45,
        VisualBasic_SyntaxTree_FullParse = 46,
        VisualBasic_SyntaxTree_IncrementalParse = 47,
        VisualBasic_SyntaxTree_GetText = 48,
        VisualBasic_SyntaxNode_SerializeTo = 49,
        VisualBasic_SyntaxNode_DeserializeFrom = 50,
        VisualBasic_Compilation_Create = 51,
        VisualBasic_Compilation_AddSyntaxTrees = 52,
        VisualBasic_Compilation_RemoveSyntaxTrees = 53,
        VisualBasic_Compilation_ReplaceSyntaxTree = 54,
        VisualBasic_Compilation_FindEntryPoint = 55,
        VisualBasic_Compilation_ClassifyConversion = 56,
        VisualBasic_Compilation_GetDiagnostics = 57,
        VisualBasic_Compilation_Emit = 58,
        VisualBasic_Compilation_CreateSourceAssembly = 59,
        VisualBasic_Compilation_GetGlobalNamespace = 60,
        VisualBasic_Compiler_CompileMethodBodies = 61,
        VisualBasic_DocumentationCommentCompiler_WriteDocumentationCommentXml = 62,
        VisualBasic_CommandLineParser_Parse = 63,
        VisualBasic_SemanticModel_GetTypeInfo = 64,
        VisualBasic_SemanticModel_GetSpeculativeTypeInfo = 65,
        VisualBasic_SemanticModel_GetSymbolInfo = 66,
        VisualBasic_SemanticModel_GetSpeculativeSymbolInfo = 67,
        VisualBasic_SemanticModel_LookupSymbols = 68,
        VisualBasic_SemanticModel_AnalyzeControlFlow = 69,
        VisualBasic_SemanticModel_AnalyzeDataFlow = 70,
        VisualBasic_SemanticModel_ClassifyConversion = 71,
        VisualBasic_SemanticModel_GetDeclaredSymbol = 72,
        VisualBasic_SemanticModel_ResolveOverloads = 73,
        VisualBasic_SemanticModel_GetDiagnostics = 74,
        VisualBasic_SemanticModel_GetMemberGroup = 75,
        VisualBasic_SemanticModel_GetSpeculativeMemberGroup = 76,
        VisualBasic_SemanticModel_GetConstantValue = 77,
        VisualBasic_SemanticModel_GetSpeculativeConstantValue = 78,
        VisualBasic_SemanticModel_GetForEachStatementInfo = 79,
        VisualBasic_SemanticModel_GetAliasInfo = 80,
        VisualBasic_SemanticModel_GetSpeculativeAliasInfo = 81,
        VisualBasic_SemanticModel_GetEnclosingSymbol = 82,
        VisualBasic_SemanticModel_IsAccessible = 83,
        VisualBasic_SemanticModel_GetPreprocessorSymbolInfo = 84,
        Common_Compilation_SerializeToPeStream = 85,
        Common_CommandLineCompiler_ResolveMetadataReferences = 86,
        Count = 87,
    }
}
declare module Microsoft.CodeAnalysis.Instrumentation {
    class Logger {
        private static lastUniqueBlockId;
        private static GetNextUniqueBlockId();
        private static IsEnabled(functionId);
        private static IsVerbose();
        static LogString_1794(functionId: FunctionId, message?: string): void;
        static LogString_1877(functionId: FunctionId, messageGetter: () => string): void;
        static LogString_1018<TArg0>(functionId: FunctionId, messageGetter: (_: TArg0) => string, arg0: TArg0): void;
        static LogString_1002<TArg0, TArg1>(functionId: FunctionId, messageGetter: (_: TArg0, __: TArg1) => string, arg0: TArg0, arg1: TArg1): void;
        static LogString_2002<TArg0, TArg1, TArg2>(functionId: FunctionId, messageGetter: (_: TArg0, __: TArg1, ___: TArg2) => string, arg0: TArg0, arg1: TArg1, arg2: TArg2): void;
        static LogString_1771<TArg0, TArg1, TArg2, TArg3>(functionId: FunctionId, messageGetter: (_: TArg0, __: TArg1, ___: TArg2, ____: TArg3) => string, arg0: TArg0, arg1: TArg1, arg2: TArg2, arg3: TArg3): void;
        static LogBlock_1335(functionId: FunctionId, message?: string, number?: number, cancellationToken?: System.Threading.CancellationToken): Logger.Block;
        static LogBlock_1676(functionId: FunctionId, messageGetter: () => string, number?: number, cancellationToken?: System.Threading.CancellationToken): Logger.Block;
        static LogBlock_1399<TArg0>(functionId: FunctionId, messageGetter: (_: TArg0) => string, arg0: TArg0, number?: number, cancellationToken?: System.Threading.CancellationToken): Logger.Block;
        static LogBlock_1215<TArg0, TArg1>(functionId: FunctionId, messageGetter: (_: TArg0, __: TArg1) => string, arg0: TArg0, arg1: TArg1, number?: number, cancellationToken?: System.Threading.CancellationToken): Logger.Block;
        static LogBlock_1471<TArg0, TArg1, TArg2>(functionId: FunctionId, messageGetter: (_: TArg0, __: TArg1, ___: TArg2) => string, arg0: TArg0, arg1: TArg1, arg2: TArg2, number?: number, cancellationToken?: System.Threading.CancellationToken): Logger.Block;
        static LogBlock_8586<TArg0, TArg1, TArg2, TArg3>(functionId: FunctionId, messageGetter: (_: TArg0, __: TArg1, ___: TArg2, ____: TArg3) => string, arg0: TArg0, arg1: TArg1, arg2: TArg2, arg3: TArg3, number?: number, cancellationToken?: System.Threading.CancellationToken): Logger.Block;
    }
    module Logger {
        class Block implements System.IDisposable, IStruct {
            private functionId;
            private number;
            private blockId;
            private cancellationToken;
            ctor_6625(functionId: FunctionId, number: number, message: string, blockId: number, cancellationToken: System.Threading.CancellationToken): Block;
            Dispose(): void;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis.Instrumentation {
    class PerformanceGoals {
        static Goals: string[];
        static Undefined: string;
        static static_ctor_PerformanceGoals(): number;
        static static_construct: number;
    }
}
declare module Microsoft.CodeAnalysis.Instrumentation {
    class RoslynCompilerEventSource extends System.Diagnostics.Tracing.EventSource {
        static Instance: RoslynCompilerEventSource;
        private initialized;
        ctor_1071(): RoslynCompilerEventSource;
        LogString(message: string, functionId: FunctionId): void;
        BlockStart(message: string, functionId: FunctionId, blockId: number): void;
        BlockStop(functionId: FunctionId, number: number, blockId: number): void;
        BlockCanceled(functionId: FunctionId, number: number, blockId: number): void;
        SendFunctionDefinitions_1251(definitions: string): void;
        protected OnEventCommand(command: System.Diagnostics.Tracing.EventCommandEventArgs): void;
        private FunctionDefinitionRequested(command);
        private SendFunctionDefinitionsAsync();
        private SendFunctionDefinitions_6303();
        static GenerateFunctionDefinitions(): string;
        constructor();
    }
}
declare module Roslyn.Utilities {
    class ArrayExtensions {
        static Copy<T>(array: T[], start: number, length: number): T[];
        static ValueEquals(array: number[], other: number[]): boolean;
        static InsertAt_2794<T>(array: T[], position: number, item: T): T[];
        static Append_1186<T>(array: T[], item: T): T[];
        static InsertAt_1940<T>(array: T[], position: number, items: T[]): T[];
        static Append_1863<T>(array: T[], items: T[]): T[];
        static RemoveAt_1797<T>(array: T[], position: number): T[];
        static RemoveAt_1286<T>(array: T[], position: number, length: number): T[];
        static ReplaceAt_8851<T>(array: T[], position: number, item: T): T[];
        static ReplaceAt_9303<T>(array: T[], position: number, length: number, items: T[]): T[];
        static ReverseContents_4458<T>(array: T[]): void;
        static ReverseContents_5048<T>(array: T[], start: number, count: number): void;
        static BinarySearch(array: number[], value: number): number;
    }
}
declare module Roslyn.Utilities {
    class ConsList<T> implements System.Collections.Generic.IEnumerable<T> {
        static Empty: ConsList<any>;
        head: T;
        tail: ConsList<T>;
        ctor_4411(): ConsList<T>;
        ctor_9301(head: T, tail: ConsList<T>): ConsList<T>;
        Head: T;
        Tail: ConsList<T>;
        Any(): boolean;
        Push(value: T): ConsList<T>;
        GetEnumerator(): ConsList.Enumerator<T>;
        ToString(): string;
        constructor();
    }
    module ConsList {
        class Enumerator<T> implements System.Collections.Generic.IEnumerator<T>, IStruct {
            private current;
            private tail;
            ctor_9667(list: ConsList<T>): Enumerator<T>;
            Current: T;
            MoveNext(): boolean;
            Dispose(): void;
            Reset(): void;
            constructor();
        }
    }
}
declare module Roslyn.Utilities {
    class DocumentationCommentXmlNames {
        static CElementName: string;
        static CodeElementName: string;
        static CompletionListElementName: string;
        static ExampleElementName: string;
        static ExceptionElementName: string;
        static IncludeElementName: string;
        static ListElementName: string;
        static ParaElementName: string;
        static ParameterElementName: string;
        static ParameterReferenceElementName: string;
        static PermissionElementName: string;
        static RemarksElementName: string;
        static ReturnsElementName: string;
        static SeeElementName: string;
        static SeeAlsoElementName: string;
        static SummaryElementName: string;
        static TypeParameterElementName: string;
        static TypeParameterReferenceElementName: string;
        static ValueElementName: string;
        static CrefAttributeName: string;
        static NameAttributeName: string;
        static FileAttributeName: string;
        static PathAttributeName: string;
        static TypeAttributeName: string;
        static ElementEquals(name1: string, name2: string, fromVb?: boolean): boolean;
        static AttributeEquals(name1: string, name2: string): boolean;
        static Equals(left: Object, right: Object): boolean;
    }
}
declare module Roslyn.Utilities {
    class EnumerableExtensions {
        static Do<T>(source: System.Collections.Generic.IEnumerable<T>, action: (_: T) => void): System.Collections.Generic.IEnumerable<T>;
        static Concat<T>(source: System.Collections.Generic.IEnumerable<T>, value: T): System.Collections.Generic.IEnumerable<T>;
        private static ConcatWorker<T>(source, value);
        static IsSingle<T>(list: System.Collections.Generic.IEnumerable<T>): boolean;
        static IsEmpty_9700<T>(source: System.Collections.Generic.IEnumerable<T>): boolean;
        static IsEmpty_1287<T>(source: System.Collections.Generic.IReadOnlyCollection<T>): boolean;
        static IsEmpty_7933<T>(source: System.Collections.Generic.ICollection<T>): boolean;
        static IsEmpty_2124(source: string): boolean;
        static IsEmpty_1491<T>(source: T[]): boolean;
        static IsEmpty_7926<T>(source: System.Collections.Generic.List<T>): boolean;
        private static NotNullTest;
        static WhereNotNull<T>(source: System.Collections.Generic.IEnumerable<T>): System.Collections.Generic.IEnumerable<T>;
        static All(source: System.Collections.Generic.IEnumerable<boolean>): boolean;
        static IsSorted<T>(enumerable: System.Collections.Generic.IEnumerable<T>, comparer: System.Collections.Generic.IComparer<T>): boolean;
        static SequenceEqual<T>(first: System.Collections.Generic.IEnumerable<T>, second: System.Collections.Generic.IEnumerable<T>, comparer: (_: T, __: T) => boolean): boolean;
        static Contains<T>(sequence: System.Collections.Generic.IEnumerable<T>, predicate: (_: T) => boolean): boolean;
    }
    module EnumerableExtensions {
        class ComparisonComparer<T> extends System.Collections.Generic.Comparer<T> {
            private compare;
            ctor_7564(compare: (_: T, __: T) => number): ComparisonComparer<T>;
            Compare(x: T, y: T): number;
            constructor();
        }
    }
}
declare module Roslyn.Utilities {
    class ExceptionUtilities {
        static UnexpectedValue(o: Object): System.Exception;
        static Unreachable: System.Exception;
    }
}
declare module Roslyn.Utilities {
    class Hash {
        static Combine_1641(newKey: number, currentKey: number): number;
        static Combine_1020(newKeyPart: boolean, currentKey: number): number;
        static Combine_7656<T>(newKeyPart: T, currentKey: number): number;
        static CombineValues_1752(values: System.Collections.Generic.IEnumerable<string>, stringComparer: System.StringComparer, maxItemsToHash?: number): number;
        static FnvOffsetBias: number;
        static FnvPrime: number;
        static GetFNVHashCode_1519(data: number[]): number;
        static GetFNVHashCode_6282(data: System.Collections.Immutable.ImmutableArray<number>): number;
        static GetFNVHashCode_8424(text: string, start: number, length: number): number;
        static GetFNVHashCode_6588(text: string, start: number): number;
        static GetFNVHashCode_6086(text: string): number;
        static GetFNVHashCode_1874(text: System.Text.StringBuilder): number;
        static GetFNVHashCode_1270(text: string[], start: number, length: number): number;
        static GetFNVHashCode_1818(ch: string): number;
        static CombineFNVHash_1688(hashCode: number, text: string): number;
        static CombineFNVHash_8743(hashCode: number, ch: string): number;
    }
}
declare module Roslyn.Utilities {
    class HashAlgorithm {
    }
    class SHA1CryptoServiceProvider extends HashAlgorithm {
    }
    class SHA256CryptoServiceProvider extends HashAlgorithm {
    }
}
declare module Roslyn.Utilities {
    class ImmutableArrayExtensions {
        static ToImmutableArrayOrEmpty_1791<T>(items: T[]): System.Collections.Immutable.ImmutableArray<T>;
        static ToImmutableArrayOrEmpty_1553<T>(items: System.Collections.Generic.IEnumerable<T>): System.Collections.Immutable.ImmutableArray<T>;
        static ToImmutableArrayOrEmpty_1007<T>(items: System.Collections.Immutable.ImmutableArray<T>): System.Collections.Immutable.ImmutableArray<T>;
    }
}
declare module Roslyn.Utilities {
    class KeyValuePair {
        static Create<K, V>(key: K, value: V): System.Collections.Generic.KeyValuePair<K, V>;
    }
}
declare module Roslyn.Utilities {
    class SpecializedCollections {
        static EmptyBytes: number[];
        static EmptyObjects: Object[];
        static EmptyArray<T>(): T[];
        static EmptyEnumerator<T>(): System.Collections.Generic.IEnumerator<T>;
        static EmptyEnumerable<T>(): System.Collections.Generic.IEnumerable<T>;
        static EmptyCollection<T>(): System.Collections.Generic.ICollection<T>;
        static EmptyList<T>(): System.Collections.Generic.IList<T>;
        static EmptyReadOnlyList<T>(): System.Collections.Generic.IReadOnlyList<T>;
        static EmptySet<T>(): System.Collections.Generic.ISet<T>;
        static EmptyDictionary<TKey, TValue>(): System.Collections.Generic.IDictionary<TKey, TValue>;
        static SingletonEnumerable<T>(value: T): System.Collections.Generic.IEnumerable<T>;
        static SingletonCollection<T>(value: T): System.Collections.Generic.ICollection<T>;
        static SingletonEnumerator<T>(value: T): System.Collections.Generic.IEnumerator<T>;
        static ReadOnlyEnumerable<T>(values: System.Collections.Generic.IEnumerable<T>): System.Collections.Generic.IEnumerable<T>;
        static ReadOnlyCollection<T>(collection: System.Collections.Generic.ICollection<T>): System.Collections.Generic.ICollection<T>;
    }
    module SpecializedCollections {
        class Empty {
        }
        module Empty {
            class Array<T> {
                static Instance: any[];
            }
            class Enumerator<T> implements System.Collections.IEnumerator, System.Collections.Generic.IEnumerator<T> {
                static Instance: System.Collections.Generic.IEnumerator<any>;
                constructor();
                Current: any;
                MoveNext(): boolean;
                Reset(): void;
                Dispose(): void;
            }
            class Enumerable<T> implements System.Collections.Generic.IEnumerable<T> {
                private enumerator;
                GetEnumerator(): System.Collections.IEnumerator;
                GetEnumerator(): System.Collections.Generic.IEnumerator<T>;
                private GetEnumerator_overload0();
                private GetEnumerator_overload1();
            }
            class Collection<T> extends Roslyn.Utilities.SpecializedCollections.Empty.Enumerable<T> implements Roslyn.Utilities.SpecializedCollections.Empty.Enumerable<T>, System.Collections.Generic.ICollection<T> {
                static Instance: System.Collections.Generic.ICollection<any>;
                constructor();
                Add(item: T): void;
                Clear(): void;
                Contains(item: T): boolean;
                CopyTo(array: T[], arrayIndex: number): void;
                Count: number;
                IsReadOnly: boolean;
                Remove(item: T): boolean;
            }
            class Dictionary<TKey, TValue> extends Collection<System.Collections.Generic.KeyValuePair<TKey, TValue>> implements Collection<System.Collections.Generic.KeyValuePair<TKey, TValue>>, System.Collections.Generic.IDictionary<TKey, TValue> {
                static Instance: any;
                constructor();
                Add(key: TKey, value: TValue): void;
                Add(value: System.Collections.Generic.KeyValuePair<TKey, TValue>): void;
                ContainsKey(key: TKey): boolean;
                Keys: System.Collections.Generic.ICollection<TKey>;
                Remove(key: TKey, value: TValue): void;
                Remove(key: TKey): boolean;
                Remove(value: System.Collections.Generic.KeyValuePair<TKey, TValue>): boolean;
                TryGetValue(key: TKey, value: {
                    refObj: TValue;
                }): boolean;
                Values: System.Collections.Generic.ICollection<TValue>;
                $get$(key: TKey): TValue;
                $set$(key: TKey, value: TValue): void;
            }
            class List<T> extends Roslyn.Utilities.SpecializedCollections.Empty.Collection<T> implements Roslyn.Utilities.SpecializedCollections.Empty.Collection<T>, System.Collections.Generic.IList<T>, System.Collections.Generic.IReadOnlyList<T> {
                static Instance: Roslyn.Utilities.SpecializedCollections.Empty.List<any>;
                constructor();
                IndexOf(item: T): number;
                Insert(index: number, item: T): void;
                RemoveAt(index: number): void;
                $get$(index: number): T;
                $set$(index: number, value: T): void;
            }
            class Set<T> extends Roslyn.Utilities.SpecializedCollections.Empty.Collection<T> implements Roslyn.Utilities.SpecializedCollections.Empty.Collection<T>, System.Collections.Generic.ISet<T> {
                static Instance: System.Collections.Generic.ISet<any>;
                constructor();
                Add(item: T): boolean;
                ExceptWith(other: System.Collections.Generic.IEnumerable<T>): void;
                IntersectWith(other: System.Collections.Generic.IEnumerable<T>): void;
                IsProperSubsetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
                IsProperSupersetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
                IsSubsetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
                IsSupersetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
                Overlaps(other: System.Collections.Generic.IEnumerable<T>): boolean;
                SetEquals(other: System.Collections.Generic.IEnumerable<T>): boolean;
                SymmetricExceptWith(other: System.Collections.Generic.IEnumerable<T>): void;
                UnionWith(other: System.Collections.Generic.IEnumerable<T>): void;
                GetEnumerator(): System.Collections.IEnumerator;
                GetEnumerator(): System.Collections.Generic.IEnumerator<T>;
            }
        }
        module ReadOnly {
            class Enumerable<TUnderlying extends System.Collections.IEnumerable, T> implements System.Collections.IEnumerable, System.Collections.Generic.IEnumerable<T> {
                protected Underlying: TUnderlying;
                constructor(underlying: TUnderlying);
                GetEnumerator(): System.Collections.IEnumerator;
                GetEnumerator(): System.Collections.Generic.IEnumerator<T>;
            }
            class Collection<TUnderlying extends System.Collections.Generic.ICollection<any>, T> extends Roslyn.Utilities.SpecializedCollections.ReadOnly.Enumerable<TUnderlying, T> implements Roslyn.Utilities.SpecializedCollections.ReadOnly.Enumerable<TUnderlying, T>, System.Collections.Generic.ICollection<T> {
                constructor(underlying: TUnderlying);
                Add(item: T): void;
                Clear(): void;
                Contains(item: T): boolean;
                CopyTo(array: T[], arrayIndex: number): void;
                Count: number;
                IsReadOnly: boolean;
                Remove(item: T): boolean;
            }
            class Set<TUnderlying extends System.Collections.Generic.ISet<any>, T> extends Roslyn.Utilities.SpecializedCollections.ReadOnly.Collection<TUnderlying, T> implements Roslyn.Utilities.SpecializedCollections.ReadOnly.Collection<TUnderlying, T>, System.Collections.Generic.ISet<T> {
                constructor(underlying: TUnderlying);
                Add(item: T): boolean;
                ExceptWith(other: System.Collections.Generic.IEnumerable<T>): void;
                IntersectWith(other: System.Collections.Generic.IEnumerable<T>): void;
                IsProperSubsetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
                IsProperSupersetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
                IsSubsetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
                IsSupersetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
                Overlaps(other: System.Collections.Generic.IEnumerable<T>): boolean;
                SetEquals(other: System.Collections.Generic.IEnumerable<T>): boolean;
                SymmetricExceptWith(other: System.Collections.Generic.IEnumerable<T>): void;
                UnionWith(other: System.Collections.Generic.IEnumerable<T>): void;
            }
        }
        module Singleton {
            class Collection<T> implements System.Collections.Generic.ICollection<T>, System.Collections.Generic.IReadOnlyCollection<T> {
                private loneValue;
                constructor(value: T);
                Add(item: T): void;
                Clear(): void;
                Contains(item: T): boolean;
                CopyTo(array: T[], arrayIndex: number): void;
                Count: number;
                IsReadOnly: boolean;
                Remove(item: T): boolean;
                GetEnumerator(): System.Collections.IEnumerator;
                GetEnumerator(): System.Collections.Generic.IEnumerator<T>;
            }
            class Enumerator<T> implements System.Collections.Generic.IEnumerator<T> {
                private loneValue;
                private moveNextCalled;
                constructor(value: T);
                Current: any;
                Dispose(): void;
                MoveNext(): boolean;
                Reset(): void;
            }
        }
    }
}
declare module Roslyn.Utilities {
    class StringExtensions {
        static Join(source: System.Collections.Generic.IEnumerable<string>, separator: string): string;
        static NeedsLocalization(value: string): string;
        static LooksLikeInterfaceName(name: string): boolean;
        static LooksLikeTypeParameterName(name: string): boolean;
        private static toLower;
        private static toUpper;
        static ToPascalCase(shortName: string, trimLeadingTypePrefix?: boolean): string;
        static ToCamelCase(shortName: string, trimLeadingTypePrefix?: boolean): string;
        private static ConvertCase(shortName, trimLeadingTypePrefix, convert);
        static IsValidClrTypeName(name: string): boolean;
        static IsValidClrNamespaceName(name: string): boolean;
        static GetWithSingleAttributeSuffix(name: string, isCaseSensitive: boolean): string;
        static TryGetWithoutAttributeSuffix_1927(name: string, result: {
            refObj: string;
        }): boolean;
        static GetWithoutAttributeSuffix(name: string, isCaseSensitive: boolean): string;
        static TryGetWithoutAttributeSuffix_1131(name: string, isCaseSensitive: boolean, result: {
            refObj: string;
        }): boolean;
        static IsValidUnicodeString(str: string): boolean;
        static Unquote_5789(arg: string): string;
        static Unquote_7452(arg: string, quoted: {
            refObj: boolean;
        }): string;
        static First(arg: string): string;
        static Last(arg: string): string;
        static All(arg: string, predicate: (_: string) => boolean): boolean;
    }
}
declare module Roslyn.Utilities {
    class StringTable {
        private static LocalSizeBits;
        private static LocalSize;
        private static LocalSizeMask;
        private static SharedSizeBits;
        static SharedSize: number;
        private static SharedSizeMask;
        private static SharedBucketBits;
        private static SharedBucketSize;
        private static SharedBucketSizeMask;
        private localTable;
        static sharedTable: StringTable.Entry[];
        private localRandom;
        private static sharedRandom;
        ctor_1032(): StringTable;
        ctor_2526(pool: ObjectPool<StringTable>): StringTable;
        private pool;
        private static StaticPool;
        private static CreatePool();
        static GetInstance(): StringTable;
        Free(): void;
        Add_5745(chars: string[], start: number, len: number): string;
        Add_2770(chars: string, start: number, len: number): string;
        Add_1301(chars: string): string;
        Add_1270(chars: System.Text.StringBuilder): string;
        Add_2003(chars: string): string;
        private static FindSharedEntry_8276(chars, start, len, hashCode);
        private static FindSharedEntry_1588(chars, start, len, hashCode);
        private static FindSharedEntry_2038(chars, hashCode);
        private static FindSharedEntry_1080(chars, hashCode);
        private static FindSharedEntry_2102(chars, hashCode);
        private AddItem_1779(chars, start, len, hashCode);
        private AddItem_2078(chars, start, len, hashCode);
        private AddItem_1837(chars, hashCode);
        private AddItem_1988(chars, hashCode);
        private AddCore(chars, hashCode);
        private AddSharedEntry(hashCode, text);
        static AddShared(chars: System.Text.StringBuilder): string;
        private static AddSharedSlow_9166(hashCode, builder);
        private static AddSharedSlow_6583(hashCode, text);
        private static LocalIdxFromHash(hash);
        private static SharedIdxFromHash(hash);
        private LocalNextRandom();
        private static SharedNextRandom();
        static TextEquals_1395(array: string, text: string, start: number, length: number): boolean;
        static TextEquals_1689(array: string, text: System.Text.StringBuilder): boolean;
        static TextEquals_2659(array: string, text: string[], start: number, length: number): boolean;
        private static TextEqualsCore(array, text, start);
        constructor();
    }
    module StringTable {
        class Entry implements IStruct {
            HashCode: number;
            Text: string;
            constructor();
        }
    }
}
declare module Roslyn.Utilities {
    class TextChangeRangeExtensions {
        static Accumulate(accumulatedTextChangeSoFar: Microsoft.CodeAnalysis.Text.TextChangeRange, changesInNextVersion: System.Collections.Generic.IEnumerable<Microsoft.CodeAnalysis.Text.TextChangeRange>): Microsoft.CodeAnalysis.Text.TextChangeRange;
    }
}
declare module Roslyn.Utilities {
    class TextKeyedCache<T> {
        private static LocalSizeBits;
        private static LocalSize;
        private static LocalSizeMask;
        private static SharedSizeBits;
        private static SharedSize;
        private static SharedSizeMask;
        private static SharedBucketBits;
        private static SharedBucketSize;
        private static SharedBucketSizeMask;
        private localTable;
        private static wrap_sharedTable;
        private static wrap_StaticPool;
        private sharedTableInst;
        private static StaticConstructor();
        private static StaticConstructorVar;
        private strings;
        private random;
        ctor_1063(): TextKeyedCache<T>;
        ctor_3603(pool: ObjectPool<TextKeyedCache<T>>): TextKeyedCache<T>;
        private pool;
        private static CreatePool<T>();
        static GetInstance<T>(clss: any): TextKeyedCache<T>;
        Free(): void;
        FindItem(chars: string[], start: number, len: number, hashCode: number): T;
        private FindSharedEntry(chars, start, len, hashCode);
        AddItem(chars: string[], start: number, len: number, hashCode: number, item: T): void;
        private AddSharedEntry(hashCode, e);
        private static LocalIdxFromHash(hash);
        private static SharedIdxFromHash(hash);
        private NextRandom();
        constructor();
    }
    module TextKeyedCache {
        class LocalEntry<T> implements IStruct {
            Text: string;
            HashCode: number;
            Item: T;
            constructor();
        }
    }
    module TextKeyedCache {
        class SharedEntry<T> implements IStruct {
            HashCode: number;
            Entry: SharedEntryValue<T>;
            constructor();
        }
    }
    module TextKeyedCache {
        class SharedEntryValue<T> {
            Text: string;
            Item: T;
            ctor_2137(Text: string, item: T): SharedEntryValue<T>;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis {
    enum ThreeState {
        Unknown = 0,
        False = 1,
        True = 2,
    }
    class ThreeStateHelpers {
        static ToThreeState(value: boolean): ThreeState;
        static HasValue(value: ThreeState): boolean;
        static Value(value: ThreeState): boolean;
    }
}
declare module Roslyn.Utilities {
    class ValueTuple {
        static Create_1047<T1, T2>(item1: T1, item2: T2): G2.ValueTuple<T1, T2>;
        static Create_7791<T1, T2, T3>(item1: T1, item2: T2, item3: T3): G3.ValueTuple<T1, T2, T3>;
    }
}
declare module Roslyn.Utilities.G2 {
    class ValueTuple<T1, T2> implements System.IEquatable<ValueTuple<T1, T2>>, IStruct {
        private static comparer1;
        private static comparer2;
        Item1: T1;
        Item2: T2;
        ctor_6194(item1: T1, item2: T2): ValueTuple<T1, T2>;
        Equals_5155(other: ValueTuple<T1, T2>): boolean;
        Equals(obj: Object): boolean;
        Equals_1491(obj: Object): boolean;
        GetHashCode(): number;
        op_Equality(right: ValueTuple<T1, T2>): boolean;
        op_Inequality(right: ValueTuple<T1, T2>): boolean;
        constructor();
    }
}
declare module Roslyn.Utilities.G3 {
    class ValueTuple<T1, T2, T3> implements System.IEquatable<ValueTuple<T1, T2, T3>>, IStruct {
        private static comparer1;
        private static comparer2;
        private static comparer3;
        Item1: T1;
        Item2: T2;
        Item3: T3;
        ctor_1594(item1: T1, item2: T2, item3: T3): ValueTuple<T1, T2, T3>;
        Equals_1335(other: ValueTuple<T1, T2, T3>): boolean;
        Equals(obj: Object): boolean;
        Equals_1491(obj: Object): boolean;
        GetHashCode(): number;
        op_Equality(right: ValueTuple<T1, T2, T3>): boolean;
        op_Inequality(right: ValueTuple<T1, T2, T3>): boolean;
        constructor();
    }
}
declare module Roslyn.Utilities {
    class ObjectBinder {
        GetType(assemblyName: string, typeName: string): System.Type;
        GetReader(type: System.Type): (_: ObjectReader) => Object;
        constructor();
    }
    module ObjectBinder {
        class TypeKey implements System.IEquatable<TypeKey>, IStruct {
            AssemblyName: string;
            TypeName: string;
            ctor_1051(assemblyName: string, typeName: string): TypeKey;
            Equals_1132(other: TypeKey): boolean;
            Equals(obj: Object): boolean;
            GetHashCode(): number;
            constructor();
        }
    }
}
declare module Roslyn.Utilities {
    class RecordingObjectBinder extends ObjectBinder {
        Record_1251(type: System.Type): void;
        Record_2061(instance: Object): void;
        constructor();
    }
}
declare module Roslyn.Utilities {
    class ConcurrentRecordingObjectBinder extends RecordingObjectBinder {
        private typeMap;
        private readerMap;
        GetType(assemblyName: string, typeName: string): System.Type;
        GetReader(type: System.Type): (_: ObjectReader) => Object;
        private HasConstructor(type);
        Record_1251(type: System.Type): void;
        Record_2061(instance: Object): void;
        constructor();
    }
}
declare module Roslyn.Utilities {
    interface IObjectReadable {
        GetReader(): (_: ObjectReader) => Object;
    }
}
declare module Roslyn.Utilities {
    interface IObjectWritable {
        WriteTo(writer: ObjectWriter): void;
    }
}
declare module Roslyn.Utilities {
    class ObjectReaderWriterBase {
        static ByteMarkerMask: number;
        static Byte1Marker: number;
        static Byte2Marker: number;
        static Byte4Marker: number;
    }
    module ObjectReaderWriterBase {
        enum DataKind {
            Null = 0,
            Type = 1,
            TypeRef = 2,
            TypeRef_B = 3,
            TypeRef_S = 4,
            Object_W = 5,
            ObjectRef = 6,
            ObjectRef_B = 7,
            ObjectRef_S = 8,
            StringUtf8 = 9,
            StringUtf16 = 10,
            StringRef = 11,
            StringRef_B = 12,
            StringRef_S = 13,
            Boolean_T = 14,
            Boolean_F = 15,
            Char = 16,
            Int8 = 17,
            Int16 = 18,
            Int32 = 19,
            Int32_B = 20,
            Int32_S = 21,
            Int32_Z = 22,
            Int64 = 23,
            UInt8 = 24,
            UInt16 = 25,
            UInt32 = 26,
            UInt64 = 27,
            Float4 = 28,
            Float8 = 29,
            Decimal = 30,
            DateTime = 31,
            Enum = 32,
            Array = 33,
            Array_0 = 34,
            Array_1 = 35,
            Array_2 = 36,
            Array_3 = 37,
        }
    }
}
declare module Roslyn.Utilities {
    class ObjectReader extends ObjectReaderWriterBase implements System.IDisposable {
        private reader;
        private dataMap;
        private binder;
        ctor_3403(stream: System.IO.Stream, defaultData?: ObjectReaderData, binder?: ObjectBinder): ObjectReader;
        Dispose(): void;
        ReadBoolean(): boolean;
        ReadByte(): number;
        ReadChar(): string;
        ReadDecimal(): number;
        ReadDouble(): number;
        ReadSingle(): number;
        ReadInt32(): number;
        ReadInt64(): number;
        ReadSByte(): number;
        ReadInt16(): number;
        ReadUInt32(): number;
        ReadUInt16(): number;
        ReadDateTime(): Date;
        ReadCompressedUInt(): number;
        private static Int32Zero;
        private static BooleanTrue;
        private static BooleanFalse;
        ReadValue(): Object;
        ReadString_7160(): string;
        private ReadString_4398(kind);
        private ReadStringLiteral(kind);
        private ReadArray(kind);
        private ReadType_7814();
        private ReadType_2536(kind);
        private ReadObject(kind);
        private ReadReadableObject();
        private CreateInstance(type);
        private NoBinderException(typeName);
        private NoReaderException(typeName);
        constructor();
    }
}
declare module Roslyn.Utilities {
    class ObjectReaderData implements System.IDisposable {
        static ListPool: ObjectPool<System.Collections.Generic.List<Object>>;
        private baseData;
        private values;
        private baseDataCount;
        ctor_3282(...items: Object[]): ObjectReaderData;
        ctor_1102(items: System.Collections.Generic.IEnumerable<Object>): ObjectReaderData;
        ctor_1681(baseData: ObjectReaderData): ObjectReaderData;
        Dispose(): void;
        GetNextId(): number;
        AddValue(id: number, value: Object): void;
        GetValue(id: number): Object;
        constructor();
    }
}
declare module Roslyn.Utilities {
    class ObjectWriter extends ObjectReaderWriterBase implements System.IDisposable {
        private writer;
        private dataMap;
        private binder;
        private cancellationToken;
        ctor_4283(stream: System.IO.Stream, defaultData?: ObjectWriterData, binder?: RecordingObjectBinder, cancellationToken?: System.Threading.CancellationToken): ObjectWriter;
        Binder: ObjectBinder;
        Dispose(): void;
        WriteBoolean(value: boolean): void;
        WriteByte(value: number): void;
        WriteChar(ch: string): void;
        WriteDecimal(value: number): void;
        WriteDouble(value: number): void;
        WriteSingle(value: number): void;
        WriteInt32(value: number): void;
        WriteInt64(value: number): void;
        WriteSByte(value: number): void;
        WriteInt16(value: number): void;
        WriteUInt32(value: number): void;
        WriteUInt64(value: number): void;
        WriteUInt16(value: number): void;
        WriteDateTime(value: Date): void;
        WriteCompressedUInt(value: number): void;
        WriteString(value: string): void;
        WriteValue(value: Object): void;
        private WriteArray(instance);
        private WriteType(clssType);
        private WriteObject(instance);
        private WriteWritableObject(instance);
        private NotWritableException(typeName);
        constructor();
    }
}
declare module Roslyn.Utilities {
    class ObjectWriterData implements System.IDisposable {
        static DictionaryPool: ObjectPool<System.Collections.Generic.ObjectDictionary<Object, number>>;
        private baseData;
        private valueToIdMap;
        private nextId;
        ctor_5212(...items: Object[]): ObjectWriterData;
        ctor_7515(items: System.Collections.Generic.IEnumerable<Object>): ObjectWriterData;
        ctor_6162(baseData: ObjectWriterData): ObjectWriterData;
        Dispose(): void;
        TryGetId(value: Object, id: {
            refObj: number;
        }): boolean;
        private GetNextId();
        Add(value: Object): number;
        constructor();
    }
}
declare module Roslyn.Utilities {
    class SimpleRecordingObjectBinder extends RecordingObjectBinder {
        private typeMap;
        private readerMap;
        GetType(assemblyName: string, typeName: string): System.Type;
        GetReader(type: System.Type): (_: ObjectReader) => Object;
        private HasConstructor(type);
        Record_1251(type: System.Type): void;
        Record_2061(instance: Object): void;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    enum SourceCodeKind {
        Regular = 0,
        Script = 1,
        Interactive = 2,
    }
    class SourceCodeKindExtensions {
        static IsValid(value: SourceCodeKind): boolean;
    }
}
declare module Microsoft.CodeAnalysis {
    enum SpecialType {
        None = 0,
        System_Object = 1,
        System_Enum = 2,
        System_MulticastDelegate = 3,
        System_Delegate = 4,
        System_ValueType = 5,
        System_Void = 6,
        System_Boolean = 7,
        System_Char = 8,
        System_SByte = 9,
        System_Byte = 10,
        System_Int16 = 11,
        System_UInt16 = 12,
        System_Int32 = 13,
        System_UInt32 = 14,
        System_Int64 = 15,
        System_UInt64 = 16,
        System_Decimal = 17,
        System_Single = 18,
        System_Double = 19,
        System_String = 20,
        System_IntPtr = 21,
        System_UIntPtr = 22,
        System_Array = 23,
        System_Collections_IEnumerable = 24,
        System_Collections_Generic_IEnumerable_T = 25,
        System_Collections_Generic_IList_T = 26,
        System_Collections_Generic_ICollection_T = 27,
        System_Collections_IEnumerator = 28,
        System_Collections_Generic_IEnumerator_T = 29,
        System_Collections_Generic_IReadOnlyList_T = 30,
        System_Collections_Generic_IReadOnlyCollection_T = 31,
        System_Nullable_T = 32,
        System_DateTime = 33,
        System_Runtime_CompilerServices_IsVolatile = 34,
        System_IDisposable = 35,
        System_TypedReference = 36,
        System_ArgIterator = 37,
        System_RuntimeArgumentHandle = 38,
        System_RuntimeFieldHandle = 39,
        System_RuntimeMethodHandle = 40,
        System_RuntimeTypeHandle = 41,
        System_IAsyncResult = 42,
        System_AsyncCallback = 43,
        Count,
    }
}
declare module Microsoft.CodeAnalysis {
    class ObjectDisplayExtensions {
        static IncludesOption(options: ObjectDisplayOptions, flag: ObjectDisplayOptions): boolean;
    }
}
declare module Microsoft.CodeAnalysis {
    enum ObjectDisplayOptions {
        None = 0,
        IncludeCodePoints,
        IncludeTypeSuffix,
        UseHexadecimalNumbers,
        UseQuotes,
    }
}
declare module Microsoft.CodeAnalysis {
    class LanguageNames {
        static CSharp: string;
        static VisualBasic: string;
    }
}
declare module Microsoft.CodeAnalysis {
    class WellKnownMemberNames {
        static EnumBackingFieldName: string;
        static InstanceConstructorName: string;
        static StaticConstructorName: string;
        static Indexer: string;
        static DestructorName: string;
        static DelegateInvokeName: string;
        static DelegateBeginInvokeName: string;
        static DelegateEndInvokeName: string;
        static EntryPointMethodName: string;
        static DefaultScriptClassName: string;
        static ObjectToString: string;
        static ObjectEquals: string;
        static ObjectGetHashCode: string;
        static ImplicitConversionName: string;
        static ExplicitConversionName: string;
        static AdditionOperatorName: string;
        static BitwiseAndOperatorName: string;
        static BitwiseOrOperatorName: string;
        static DecrementOperatorName: string;
        static DivisionOperatorName: string;
        static EqualityOperatorName: string;
        static ExclusiveOrOperatorName: string;
        static FalseOperatorName: string;
        static GreaterThanOperatorName: string;
        static GreaterThanOrEqualOperatorName: string;
        static IncrementOperatorName: string;
        static InequalityOperatorName: string;
        static LeftShiftOperatorName: string;
        static UnsignedLeftShiftOperatorName: string;
        static LessThanOperatorName: string;
        static LessThanOrEqualOperatorName: string;
        static LogicalNotOperatorName: string;
        static LogicalOrOperatorName: string;
        static LogicalAndOperatorName: string;
        static ModulusOperatorName: string;
        static MultiplyOperatorName: string;
        static OnesComplementOperatorName: string;
        static RightShiftOperatorName: string;
        static UnsignedRightShiftOperatorName: string;
        static SubtractionOperatorName: string;
        static TrueOperatorName: string;
        static UnaryNegationOperatorName: string;
        static UnaryPlusOperatorName: string;
        static ConcatenateOperatorName: string;
        static ExponentOperatorName: string;
        static IntegerDivisionOperatorName: string;
        static LikeOperatorName: string;
        static GetEnumeratorMethodName: string;
        static MoveNextMethodName: string;
        static CurrentPropertyName: string;
        static ValuePropertyName: string;
        static CollectionInitializerAddMethodName: string;
        static GetAwaiter: string;
        static IsCompleted: string;
        static GetResult: string;
        static OnCompleted: string;
    }
}
declare module Microsoft.CodeAnalysis {
    class AbstractSyntaxNavigator {
        private static None;
        protected GetStepIntoFunction(skipped: boolean, directives: boolean, docComments: boolean): (_: SyntaxTrivia) => boolean;
        private GetPredicateFunction(includeZeroWidth);
        private Matches(predicate, token);
        GetFirstToken_1312(current: SyntaxNode, includeZeroWidth: boolean, includeSkipped: boolean, includeDirectives: boolean, includeDocumentationComments: boolean): SyntaxToken;
        GetLastToken_4205(current: SyntaxNode, includeZeroWidth: boolean, includeSkipped: boolean, includeDirectives: boolean, includeDocumentationComments: boolean): SyntaxToken;
        GetPreviousToken_1070(current: SyntaxToken, includeZeroWidth: boolean, includeSkipped: boolean, includeDirectives: boolean, includeDocumentationComments: boolean): SyntaxToken;
        GetNextToken_1578(current: SyntaxToken, includeZeroWidth: boolean, includeSkipped: boolean, includeDirectives: boolean, includeDocumentationComments: boolean): SyntaxToken;
        GetPreviousToken_1392(current: SyntaxToken, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken;
        GetNextToken_1071(current: SyntaxToken, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken;
        GetFirstToken_2110(current: SyntaxNode, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken;
        GetLastToken_1389(current: SyntaxNode, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken;
        private GetFirstToken_1704(triviaList, predicate, stepInto);
        private GetLastToken_1461(list, predicate, stepInto);
        private TryGetLastTokenForStructuredTrivia(trivia, predicate, stepInto, token);
        private GetFirstToken_6850(token, predicate, stepInto);
        private GetLastToken_1408(token, predicate, stepInto);
        GetNextToken_1439(current: SyntaxTrivia, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken;
        GetPreviousToken_1349(current: SyntaxTrivia, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken;
        private GetNextToken_1982(current, list, predicate, stepInto, returnNext);
        private GetPreviousToken_1405(current, list, predicate, stepInto, returnPrevious);
        GetNextToken_1474(node: SyntaxNode, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken;
        GetPreviousToken_6217(node: SyntaxNode, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken;
        GetNextToken_1799(current: SyntaxToken, predicate: (_: SyntaxToken) => boolean, searchInsideCurrentTokenTrailingTrivia: boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken;
        GetPreviousToken_3425(current: SyntaxToken, predicate: (_: SyntaxToken) => boolean, searchInsideCurrentTokenLeadingTrivia: boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis.Syntax {
    class AbstractWarningStateMap {
        private warningStateMapEntries;
        ctor_9031(syntaxTree: SyntaxTree): AbstractWarningStateMap;
        protected CreateWarningStateMapEntries(syntaxTree: SyntaxTree): AbstractWarningStateMap.WarningStateMapEntry[];
        GetWarningState(id: string, position: number): ReportDiagnostic;
        private GetEntryAtOrBeforePosition(position);
        constructor();
    }
    module AbstractWarningStateMap {
        class WarningStateMapEntry implements System.Generic.IComparable<WarningStateMapEntry>, IStruct {
            Position: number;
            GeneralWarningOption: ReportDiagnostic;
            SpecificWarningOption: System.Collections.Immutable.ImmutableDictionary<string, ReportDiagnostic>;
            ctor_1040(position: number): WarningStateMapEntry;
            ctor_1499(position: number, general: ReportDiagnostic, specific: System.Collections.Immutable.ImmutableDictionary<string, ReportDiagnostic>): WarningStateMapEntry;
            CompareTo(other: WarningStateMapEntry): number;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class AnnotationExtensions {
        static WithAdditionalAnnotations_6931<TNode extends SyntaxNode>(node: TNode, ...annotations: SyntaxAnnotation[]): TNode;
        static WithAdditionalAnnotations_2071<TNode extends SyntaxNode>(node: TNode, annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): TNode;
        static WithoutAnnotations_1188<TNode extends SyntaxNode>(node: TNode, ...annotations: SyntaxAnnotation[]): TNode;
        static WithoutAnnotations_1188_Arr<TNode extends SyntaxNode>(node: TNode, annotations: SyntaxAnnotation[]): TNode;
        static WithoutAnnotations_1837<TNode extends SyntaxNode>(node: TNode, annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): TNode;
        static WithoutAnnotations_7581<TNode extends SyntaxNode>(node: TNode, annotationKind: string): TNode;
    }
}
declare module Microsoft.CodeAnalysis {
    class ChildSyntaxList implements System.IEquatable<ChildSyntaxList>, System.Collections.Generic.IReadOnlyList<SyntaxNodeOrToken>, IStruct {
        private node;
        private count;
        ctor_5028(node: SyntaxNode): ChildSyntaxList;
        Count: number;
        static CountNodes(green: GreenNode): number;
        $get$(index: number): SyntaxNodeOrToken;
        Node: SyntaxNode;
        private static Occupancy(green);
        static ItemInternal(node: SyntaxNode, index: number): SyntaxNodeOrToken;
        static ChildThatContainsPosition(node: SyntaxNode, targetPosition: number): SyntaxNodeOrToken;
        static ItemInternalAsNode(node: SyntaxNode, index: number): SyntaxNode;
        private Nodes;
        Any(): boolean;
        First(): SyntaxNodeOrToken;
        Last(): SyntaxNodeOrToken;
        Reverse(): ChildSyntaxList.Reversed;
        GetEnumerator(): System.Collections.Generic.IEnumerator<SyntaxNodeOrToken>;
        Equals(obj: Object): boolean;
        Equals_4638(other: ChildSyntaxList): boolean;
        GetHashCode(): number;
        op_Equality(list2: ChildSyntaxList): boolean;
        op_Inequality(list2: ChildSyntaxList): boolean;
        constructor();
    }
    module ChildSyntaxList {
        class Enumerator implements IStruct {
            private node;
            private count;
            private childIndex;
            ctor_2091(node: SyntaxNode, count: number): Enumerator;
            InitializeFrom(node: SyntaxNode): void;
            MoveNext(): boolean;
            Current: SyntaxNodeOrToken;
            Reset(): void;
            TryMoveNextAndGetCurrent(current: {
                refObj: SyntaxNodeOrToken;
            }): boolean;
            TryMoveNextAndGetCurrentAsNode(): SyntaxNode;
            constructor();
        }
    }
    module ChildSyntaxList {
        class EnumeratorImpl implements System.Collections.Generic.IEnumerator<SyntaxNodeOrToken> {
            private enumerator;
            ctor_1716(node: SyntaxNode, count: number): EnumeratorImpl;
            Current: SyntaxNodeOrToken;
            MoveNext(): boolean;
            Reset(): void;
            Dispose(): void;
            constructor();
        }
        class Reversed implements System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>, System.IEquatable<Reversed>, IStruct {
            private node;
            private count;
            ctor_4304(node: SyntaxNode, count: number): Reversed;
            GetEnumerator(): System.Collections.Generic.IEnumerator<SyntaxNodeOrToken>;
            GetHashCode(): number;
            Equals(obj: Object): boolean;
            Equals_1958(other: Reversed): boolean;
            constructor();
        }
        module Reversed {
            class Enumerator implements IStruct {
                private node;
                private count;
                private childIndex;
                ctor_2091(node: SyntaxNode, count: number): Enumerator;
                MoveNext(): boolean;
                Current: SyntaxNodeOrToken;
                Reset(): void;
                constructor();
            }
        }
        module Reversed {
            class EnumeratorImpl implements System.Collections.Generic.IEnumerator<SyntaxNodeOrToken> {
                private enumerator;
                ctor_1716(node: SyntaxNode, count: number): EnumeratorImpl;
                Current: SyntaxNodeOrToken;
                MoveNext(): boolean;
                Reset(): void;
                Dispose(): void;
                constructor();
            }
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class GreenNode implements Roslyn.Utilities.IObjectWritable, Roslyn.Utilities.IObjectReadable {
        static ListKind: number;
        private kind;
        protected flags: GreenNode.NodeFlags;
        private slotCount;
        private fullWidth;
        private static diagnosticsTable;
        private static annotationsTable;
        private static NoDiagnostics;
        private static NoAnnotations;
        private static NoAnnotationsEnumerable;
        ctor_1817(kind: number): GreenNode;
        ctor_1801(kind: number, fullWidth: number): GreenNode;
        ctor_1879(kind: number, diagnostics: DiagnosticInfo[], fullWidth: number): GreenNode;
        ctor_1355(kind: number, diagnostics: DiagnosticInfo[]): GreenNode;
        ctor_6664(kind: number, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[]): GreenNode;
        ctor_7650(kind: number, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[], fullWidth: number): GreenNode;
        protected AdjustFlagsAndWidth(node: GreenNode): void;
        Language: string;
        RawKind: number;
        IsList: boolean;
        KindText: string;
        IsStructuredTrivia: boolean;
        IsDirective: boolean;
        IsToken: boolean;
        SlotCount: number;
        GetSlot(index: number): GreenNode;
        protected GetSlotCount(): number;
        GetSlotOffset(index: number): number;
        Flags: GreenNode.NodeFlags;
        SetFlags(flags: GreenNode.NodeFlags): void;
        ClearFlags(flags: GreenNode.NodeFlags): void;
        IsMissing: boolean;
        ParsedInAsync: boolean;
        ParsedInQuery: boolean;
        ParsedInIterator: boolean;
        ContainsSkippedText: boolean;
        ContainsStructuredTrivia: boolean;
        ContainsDirectives: boolean;
        ContainsDiagnostics: boolean;
        ContainsAnnotations: boolean;
        FullWidth: number;
        Width: number;
        GetLeadingTriviaWidth(): number;
        GetTrailingTriviaWidth(): number;
        HasLeadingTrivia: boolean;
        HasTrailingTrivia: boolean;
        private static ExtendedSerializationInfoMask;
        ctor_1105(reader: Roslyn.Utilities.ObjectReader): GreenNode;
        WriteTo(writer: Roslyn.Utilities.ObjectWriter): void;
        WriteTo_2123(writer: Roslyn.Utilities.ObjectWriter): void;
        GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object;
        HasAnnotations_4203(annotationKind: string): boolean;
        HasAnnotations_9693(annotationKinds: System.Collections.Generic.IEnumerable<string>): boolean;
        HasAnnotation(annotation: SyntaxAnnotation): boolean;
        GetAnnotations_1417(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxAnnotation>;
        private static GetAnnotationsSlow_1547(annotations, annotationKind);
        GetAnnotations_2034(annotationKinds: System.Collections.Generic.IEnumerable<string>): System.Collections.Generic.IEnumerable<SyntaxAnnotation>;
        private static GetAnnotationsSlow_1032(annotations, annotationKinds);
        GetAnnotations_1741(): SyntaxAnnotation[];
        SetAnnotations(annotations: SyntaxAnnotation[]): GreenNode;
        GetDiagnostics(): DiagnosticInfo[];
        SetDiagnostics(diagnostics: DiagnosticInfo[]): GreenNode;
        ToFullString(): string;
        WriteTo_1120(writer: System.IO.TextWriter): void;
        WriteTo_1077(writer: System.IO.TextWriter, leading: boolean, trailing: boolean): void;
        RawContextualKind: number;
        GetValue(): Object;
        GetValueText(): string;
        GetLeadingTriviaCore(): GreenNode;
        GetTrailingTriviaCore(): GreenNode;
        Navigator: AbstractSyntaxNavigator;
        WithLeadingTrivia(trivia: GreenNode): GreenNode;
        WithTrailingTrivia(trivia: GreenNode): GreenNode;
        GetFirstTerminal(): GreenNode;
        GetLastTerminal(): GreenNode;
        GetLastNonmissingTerminal(): GreenNode;
        IsEquivalentTo(other: GreenNode): boolean;
        private static EquivalentToInternal(node1, node2);
        GetStructure(parentTrivia: SyntaxTrivia): SyntaxNode;
        CreateList(nodes: System.Collections.Generic.IEnumerable<GreenNode>, alwaysCreateListNode?: boolean): GreenNode;
        CreateSeparator<TNode extends SyntaxNode>(element: SyntaxNode): SyntaxToken;
        IsTriviaWithEndOfLine(): boolean;
        CreateRed_5702(): SyntaxNode;
        CreateRed_9614(parent: SyntaxNode, position: number): SyntaxNode;
        static MaxCachedChildNum: number;
        IsCacheable: boolean;
        GetCacheHash(): number;
        IsCacheEquivalent_1054(kind: number, flags: GreenNode.NodeFlags, child1: GreenNode): boolean;
        IsCacheEquivalent_1226(kind: number, flags: GreenNode.NodeFlags, child1: GreenNode, child2: GreenNode): boolean;
        IsCacheEquivalent_5779(kind: number, flags: GreenNode.NodeFlags, child1: GreenNode, child2: GreenNode, child3: GreenNode): boolean;
        ToString(): string;
        constructor();
    }
    module GreenNode {
        enum NodeFlags {
            None = 0,
            ContainsDiagnostics,
            ContainsStructuredTrivia,
            ContainsDirectives,
            ContainsSkippedText,
            ContainsAnnotations,
            IsNotMissing,
            FactoryContextIsInAsync,
            FactoryContextIsInQuery,
            FactoryContextIsInIterator,
            FactoryContextMask,
            InheritMask,
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class GreenNodeExtensions {
        static WithAnnotationsGreen<TNode extends GreenNode>(node: TNode, annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): TNode;
        static WithAdditionalAnnotationsGreen<TNode extends GreenNode>(node: TNode, annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): TNode;
        static WithoutAnnotationsGreen<TNode extends GreenNode>(node: TNode, annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): TNode;
        static WithDiagnosticsGreen<TNode extends GreenNode>(node: TNode, diagnostics: DiagnosticInfo[]): TNode;
        static WithoutDiagnosticsGreen<TNode extends GreenNode>(node: TNode): TNode;
    }
}
declare module Microsoft.CodeAnalysis {
    interface IStructuredTriviaSyntax {
        ParentTrivia: SyntaxTrivia;
    }
}
declare module Microsoft.CodeAnalysis {
    class LineDirectiveMap<TDirective extends SyntaxNode> {
        protected Entries: LineDirectiveMap.LineMappingEntry[];
        protected ShouldAddDirective(directive: TDirective): boolean;
        protected GetEntry(directive: TDirective, sourceText: Text.SourceText, previous: LineDirectiveMap.LineMappingEntry): LineDirectiveMap.LineMappingEntry;
        protected InitializeFirstEntry(): LineDirectiveMap.LineMappingEntry;
        ctor_1651(syntaxTree: SyntaxTree): LineDirectiveMap<TDirective>;
        TranslateSpan_2705(sourceText: Text.SourceText, treeFilePath: string, span: Text.TextSpan): FileLinePositionSpan;
        protected TranslateSpan_1274(entry: LineDirectiveMap.LineMappingEntry, treeFilePath: string, unmappedStartPos: Text.LinePosition, unmappedEndPos: Text.LinePosition): FileLinePositionSpan;
        GetLineVisibility(sourceText: Text.SourceText, position: number): LineVisibility;
        TranslateSpanAndVisibility(sourceText: Text.SourceText, treeFilePath: string, span: Text.TextSpan, isHiddenPosition: {
            refObj: boolean;
        }): FileLinePositionSpan;
        HasAnyHiddenRegions(): boolean;
        protected FindEntry(lineNumber: number): LineDirectiveMap.LineMappingEntry;
        protected FindEntryIndex(lineNumber: number): number;
        private CreateEntryMap(sourceText, directives);
        constructor();
    }
    module LineDirectiveMap {
        enum PositionState {
            Unknown = 0,
            Unmapped = 1,
            Remapped = 2,
            RemappedAfterUnknown = 3,
            RemappedAfterHidden = 4,
            Hidden = 5,
        }
    }
    module LineDirectiveMap {
        class LineMappingEntry implements System.Generic.IComparable<LineMappingEntry>, IStruct {
            UnmappedLine: number;
            MappedLine: number;
            MappedPathOpt: string;
            State: PositionState;
            ctor_9372(unmappedLine: number): LineMappingEntry;
            ctor_1477(unmappedLine: number, mappedLine: number, mappedPathOpt: string, state: PositionState): LineMappingEntry;
            CompareTo(other: LineMappingEntry): number;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis {
    enum LineVisibility {
        BeforeFirstLineDirective = 0,
        Hidden = 1,
        Visible = 2,
    }
}
declare module Microsoft.CodeAnalysis {
    class SeparatedSyntaxList<TNode extends SyntaxNode> implements System.IEquatable<SeparatedSyntaxList<TNode>>, System.Collections.Generic.IReadOnlyList<TNode>, IStruct {
        private list;
        private count;
        private separatorCount;
        ctor_1274(list: SyntaxNodeOrTokenList): SeparatedSyntaxList<TNode>;
        private static Validate(list);
        ctor_9044(node: SyntaxNode, index: number): SeparatedSyntaxList<TNode>;
        Node: SyntaxNode;
        Count: number;
        SeparatorCount: number;
        $get$(index: number): TNode;
        GetSeparator(index: number): SyntaxToken;
        GetSeparators(): System.Collections.Generic.IEnumerable<SyntaxToken>;
        FullSpan: Text.TextSpan;
        Span: Text.TextSpan;
        ToString(): string;
        ToFullString(): string;
        First(): TNode;
        FirstOrDefault(): TNode;
        Last(): TNode;
        LastOrDefault(): TNode;
        Contains(node: TNode): boolean;
        IndexOf_1996(node: TNode): number;
        IndexOf_1153(predicate: (_: TNode) => boolean): number;
        IndexOf_9119(rawKind: number): number;
        LastIndexOf_2121(node: TNode): number;
        LastIndexOf_2446(predicate: (_: TNode) => boolean): number;
        Any(): boolean;
        GetWithSeparators(): SyntaxNodeOrTokenList;
        op_Equality(right: SeparatedSyntaxList<TNode>): boolean;
        op_Inequality(right: SeparatedSyntaxList<TNode>): boolean;
        Equals_1373(other: SeparatedSyntaxList<TNode>): boolean;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        Add(node: TNode): SeparatedSyntaxList<TNode>;
        AddRange(nodes: System.Collections.Generic.IEnumerable<TNode>): SeparatedSyntaxList<TNode>;
        Insert(index: number, node: TNode): SeparatedSyntaxList<TNode>;
        InsertRange(index: number, nodes: System.Collections.Generic.IEnumerable<TNode>): SeparatedSyntaxList<TNode>;
        private static KeepSeparatorWithPreviousNode(separator);
        RemoveAt(index: number): SeparatedSyntaxList<TNode>;
        Remove(node: TNode): SeparatedSyntaxList<TNode>;
        Replace(nodeInList: TNode, newNode: TNode): SeparatedSyntaxList<TNode>;
        ReplaceRange(nodeInList: TNode, newNodes: System.Collections.Generic.IEnumerable<TNode>): SeparatedSyntaxList<TNode>;
        ReplaceSeparator(separatorToken: SyntaxToken, newSeparator: SyntaxToken): SeparatedSyntaxList<TNode>;
        private Nodes;
        private NodesWithSeparators;
        GetEnumerator(): System.Collections.Generic.IEnumerator<TNode>;
        constructor();
    }
    module SeparatedSyntaxList {
        class Enumerator<TNode extends SyntaxNode> implements IStruct {
            private list;
            private index;
            ctor_1104(list: SeparatedSyntaxList<TNode>): Enumerator<TNode>;
            MoveNext(): boolean;
            Current: TNode;
            Reset(): void;
            Equals(obj: Object): boolean;
            GetHashCode(): number;
            constructor();
        }
    }
    module SeparatedSyntaxList {
        class EnumeratorImpl<TNode extends SyntaxNode> implements System.Collections.Generic.IEnumerator<TNode> {
            private e;
            ctor_7599(list: SeparatedSyntaxList<TNode>): EnumeratorImpl<TNode>;
            Current: TNode;
            Dispose(): void;
            MoveNext(): boolean;
            Reset(): void;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class SyntaxAnnotation implements Roslyn.Utilities.IObjectWritable, Roslyn.Utilities.IObjectReadable, System.IEquatable<SyntaxAnnotation> {
        static ElasticAnnotation: SyntaxAnnotation;
        private id;
        private static nextId;
        Kind: string;
        Data: string;
        ctor_1690(): SyntaxAnnotation;
        ctor_7926(kind: string): SyntaxAnnotation;
        ctor_8539(kind: string, data: string): SyntaxAnnotation;
        ctor_1772(reader: Roslyn.Utilities.ObjectReader): SyntaxAnnotation;
        WriteTo(writer: Roslyn.Utilities.ObjectWriter): void;
        GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object;
        Equals_1427(other: SyntaxAnnotation): boolean;
        op_Equality(right: SyntaxAnnotation): boolean;
        op_Inequality(right: SyntaxAnnotation): boolean;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    class SyntaxDiffer {
        private static InitialStackSize;
        private static MaxSearchLength;
        private oldNodes;
        private newNodes;
        private changes;
        private oldSpan;
        private computeNewText;
        private nodeSimilaritySet;
        private tokenTextSimilaritySet;
        ctor_1162(oldNode: SyntaxNode, newNode: SyntaxNode, computeNewText: boolean): SyntaxDiffer;
        static GetTextChanges_8869(before: SyntaxTree, after: SyntaxTree): System.Collections.Generic.IList<Text.TextChange>;
        static GetTextChanges_1735(oldNode: SyntaxNode, newNode: SyntaxNode): System.Collections.Generic.IList<Text.TextChange>;
        private ComputeTextChangesFromOld();
        static GetPossiblyDifferentTextSpans_6752(before: SyntaxTree, after: SyntaxTree): System.Collections.Generic.IList<Text.TextSpan>;
        static GetPossiblyDifferentTextSpans_1819(oldNode: SyntaxNode, newNode: SyntaxNode): System.Collections.Generic.IList<Text.TextSpan>;
        private ComputeSpansInNew();
        private ComputeChangeRecords();
        private GetNextAction();
        private static ReplaceFirstWithChildren(stack);
        private FindBestMatch(stack, node, index, similarity);
        private GetSimilarity(node1, node2);
        private static AreIdentical(node1, node2);
        private static AreSimilar(node1, node2);
        private RecordDeleteOld(oldNodeCount);
        private RecordReplaceOldWithNew(oldNodeCount, newNodeCount);
        private RecordInsertNew(newNodeCount);
        private RecordChange(change);
        private static GetSpan(stack, first, length);
        private static Combine(first, next);
        private static CopyFirst(stack, n);
        private static ToArray(stack, n);
        private static RemoveFirst(stack, count);
        private ReduceChanges(changeRecords);
        private static GetCommonEdgeLengths(oldText, newText, commonLeadingCount, commonTrailingCount);
        private static GetText(stack);
        private static CopyText(stack, builder);
        constructor();
    }
    module SyntaxDiffer {
        enum DiffOp {
            None = 0,
            SkipBoth = 1,
            ReduceOld = 2,
            ReduceNew = 3,
            ReduceBoth = 4,
            InsertNew = 5,
            DeleteOld = 6,
            ReplaceOldWithNew = 7,
        }
    }
    module SyntaxDiffer {
        class DiffAction implements IStruct {
            Operation: DiffOp;
            Count: number;
            ctor_7831(operation: DiffOp, count: number): DiffAction;
            constructor();
        }
    }
    module SyntaxDiffer {
        class ChangeRecord implements IStruct {
            Range: Text.TextChangeRange;
            OldNodes: System.Collections.Generic.Stack<SyntaxNodeOrToken>;
            NewNodes: System.Collections.Generic.Stack<SyntaxNodeOrToken>;
            ctor_2028(range: Text.TextChangeRange, oldNodes: System.Collections.Generic.Stack<SyntaxNodeOrToken>, newNodes: System.Collections.Generic.Stack<SyntaxNodeOrToken>): ChangeRecord;
            constructor();
        }
    }
    module SyntaxDiffer {
        class ChangeRangeWithText implements IStruct {
            Range: Text.TextChangeRange;
            NewText: string;
            ctor_1862(range: Text.TextChangeRange, newText: string): ChangeRangeWithText;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class SyntaxList<TNode extends SyntaxNode> implements System.Collections.Generic.IReadOnlyList<TNode>, System.IEquatable<SyntaxList<TNode>>, IStruct {
        private node;
        ctor_6698(node: SyntaxNode): SyntaxList<TNode>;
        Node: SyntaxNode;
        Count: number;
        $get$(index: number): TNode;
        ItemInternal(index: number): SyntaxNode;
        FullSpan: Text.TextSpan;
        Span: Text.TextSpan;
        ToString(): string;
        ToFullString(): string;
        Add(node: TNode): SyntaxList<TNode>;
        AddRange(nodes: System.Collections.Generic.IEnumerable<TNode>): SyntaxList<TNode>;
        Insert(index: number, node: TNode): SyntaxList<TNode>;
        InsertRange(index: number, nodes: System.Collections.Generic.IEnumerable<TNode>): SyntaxList<TNode>;
        RemoveAt(index: number): SyntaxList<TNode>;
        Remove(node: TNode): SyntaxList<TNode>;
        Replace(nodeInList: TNode, newNode: TNode): SyntaxList<TNode>;
        ReplaceRange(nodeInList: TNode, newNodes: System.Collections.Generic.IEnumerable<TNode>): SyntaxList<TNode>;
        private static CreateList_1946<TNode>(items);
        private static CreateList_6694<TNode>(creator, items);
        First(): TNode;
        FirstOrDefault(): TNode;
        Last(): TNode;
        LastOrDefault(): TNode;
        Any(): boolean;
        private Nodes;
        GetEnumerator(): System.Collections.Generic.IEnumerator<TNode>;
        op_Equality(right: SyntaxList<TNode>): boolean;
        op_Inequality(right: SyntaxList<TNode>): boolean;
        Equals_1466(other: SyntaxList<TNode>): boolean;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        static op_Implicit_1229<TNode extends SyntaxNode>(nodes: SyntaxList<SyntaxNode>): SyntaxList<TNode>;
        static op_Implicit_9594<TNode extends SyntaxNode>(nodes: SyntaxList<TNode>): SyntaxList<SyntaxNode>;
        IndexOf_1996(node: TNode): number;
        IndexOf_1153(predicate: (_: TNode) => boolean): number;
        IndexOf_9119(rawKind: number): number;
        LastIndexOf_2121(node: TNode): number;
        LastIndexOf_2446(predicate: (_: TNode) => boolean): number;
        constructor();
    }
    module SyntaxList {
        class Enumerator<TNode extends SyntaxNode> implements IStruct {
            private list;
            private index;
            ctor_4311(list: SyntaxList<TNode>): Enumerator<TNode>;
            MoveNext(): boolean;
            Current: TNode;
            Reset(): void;
            Equals(obj: Object): boolean;
            GetHashCode(): number;
            constructor();
        }
    }
    module SyntaxList {
        class EnumeratorImpl<TNode extends SyntaxNode> implements System.Collections.Generic.IEnumerator<TNode> {
            e: Enumerator<TNode>;
            ctor_1415(list: SyntaxList<TNode>): EnumeratorImpl<TNode>;
            MoveNext(): boolean;
            Current: TNode;
            Dispose(): void;
            Reset(): void;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class SyntaxNode {
        private green;
        private parent;
        _syntaxTree: SyntaxTree;
        private position;
        private myHash;
        ctor_5435(green: GreenNode, parent: SyntaxNode, position: number): SyntaxNode;
        ctor_8973(green: GreenNode, position: number, syntaxTree: SyntaxTree): SyntaxNode;
        GetHashCode(): number;
        Navigator: AbstractSyntaxNavigator;
        RawKind: number;
        KindText: string;
        Language: string;
        Green: GreenNode;
        Position: number;
        EndPosition: number;
        SyntaxTree: SyntaxTree;
        IsList: boolean;
        FullSpan: Text.TextSpan;
        SlotCount: number;
        Span: Text.TextSpan;
        SpanStart: number;
        Width: number;
        FullWidth: number;
        GetRed_1713(field: {
            refObj: SyntaxNode;
        }, slot: number): SyntaxNode;
        GetRedAtZero_1834(field: {
            refObj: SyntaxNode;
        }): SyntaxNode;
        protected GetRed_2015<T extends SyntaxNode>(field: {
            refObj: T;
        }, slot: number): T;
        protected GetRedAtZero_2231<T extends SyntaxNode>(field: {
            refObj: T;
        }): T;
        GetRedElement(element: {
            refObj: SyntaxNode;
        }, slot: number): SyntaxNode;
        GetRedElementIfNotToken(element: {
            refObj: SyntaxNode;
        }): SyntaxNode;
        GetWeakRedElement(slot: {
            refObj: System.WeakReference<SyntaxNode>;
        }, index: number): SyntaxNode;
        private CreateWeakItem(slot, index);
        ToString(): string;
        ToFullString(): string;
        WriteTo(writer: System.IO.TextWriter): void;
        GetText(encoding?: System.Text.Encoding, checksumAlgorithm?: Text.SourceHashAlgorithm): Text.SourceText;
        IsEquivalentTo_9689(other: SyntaxNode): boolean;
        IsMissing: boolean;
        IsPartOfStructuredTrivia(): boolean;
        IsStructuredTrivia: boolean;
        HasStructuredTrivia: boolean;
        ContainsSkippedText: boolean;
        ContainsDirectives: boolean;
        ContainsDiagnostics: boolean;
        HasLeadingTrivia: boolean;
        HasTrailingTrivia: boolean;
        GetCachedSlot(index: number): SyntaxNode;
        GetChildIndex(slot: number): number;
        GetChildPosition(index: number): number;
        GetLocation(): Location;
        GetDiagnostics(): System.Collections.Generic.IEnumerable<Diagnostic>;
        GetReference(): SyntaxReference;
        getParent(): SyntaxNode;
        Parent: SyntaxNode;
        ParentTrivia: SyntaxTrivia;
        getParentOrStructuredTriviaParent(): SyntaxNode;
        ParentOrStructuredTriviaParent: SyntaxNode;
        ChildNodesAndTokens(): ChildSyntaxList;
        ChildThatContainsPosition(position: number): SyntaxNodeOrToken;
        GetNodeSlot(slot: number): SyntaxNode;
        ChildNodes(): System.Collections.Generic.IEnumerable<SyntaxNode>;
        Ancestors(ascendOutOfTrivia?: boolean): System.Collections.Generic.IEnumerable<SyntaxNode>;
        AncestorsAndSelf(ascendOutOfTrivia?: boolean): System.Collections.Generic.IEnumerable<SyntaxNode>;
        private static GetParent(node, ascendOutOfTrivia);
        FirstAncestorOrSelf<TNode extends SyntaxNode>(type: {
            prototype: TNode;
        }, predicate?: (_: TNode) => boolean, ascendOutOfTrivia?: boolean): TNode;
        DescendantNodes_1576(descendIntoChildren?: (_: SyntaxNode) => boolean, descendIntoTrivia?: boolean): System.Collections.Generic.IEnumerable<SyntaxNode>;
        DescendantNodes_9625(span: Text.TextSpan, descendIntoChildren?: (_: SyntaxNode) => boolean, descendIntoTrivia?: boolean): System.Collections.Generic.IEnumerable<SyntaxNode>;
        DescendantNodesAndSelf_4808(descendIntoChildren?: (_: SyntaxNode) => boolean, descendIntoTrivia?: boolean): System.Collections.Generic.IEnumerable<SyntaxNode>;
        DescendantNodesAndSelf_5609(span: Text.TextSpan, descendIntoChildren?: (_: SyntaxNode) => boolean, descendIntoTrivia?: boolean): System.Collections.Generic.IEnumerable<SyntaxNode>;
        DescendantNodesAndTokens_1161(descendIntoChildren?: (_: SyntaxNode) => boolean, descendIntoTrivia?: boolean): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>;
        DescendantNodesAndTokens_3345(span: Text.TextSpan, descendIntoChildren?: (_: SyntaxNode) => boolean, descendIntoTrivia?: boolean): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>;
        DescendantNodesAndTokensAndSelf_1678(descendIntoChildren?: (_: SyntaxNode) => boolean, descendIntoTrivia?: boolean): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>;
        DescendantNodesAndTokensAndSelf_4591(span: Text.TextSpan, descendIntoChildren?: (_: SyntaxNode) => boolean, descendIntoTrivia?: boolean): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>;
        FindNode(span: Text.TextSpan, findInsideTrivia?: boolean, getInnermostNodeForTie?: boolean): SyntaxNode;
        FindToken(position: number, findInsideTrivia?: boolean): SyntaxToken;
        GetFirstToken(includeZeroWidth?: boolean, includeSkipped?: boolean, includeDirectives?: boolean, includeDocumentationComments?: boolean): SyntaxToken;
        GetLastToken(includeZeroWidth?: boolean, includeSkipped?: boolean, includeDirectives?: boolean, includeDocumentationComments?: boolean): SyntaxToken;
        ChildTokens(): System.Collections.Generic.IEnumerable<SyntaxToken>;
        DescendantTokens_9785(descendIntoChildren?: (_: SyntaxNode) => boolean, descendIntoTrivia?: boolean): System.Collections.Generic.IEnumerable<SyntaxToken>;
        DescendantTokens_9576(span: Text.TextSpan, descendIntoChildren?: (_: SyntaxNode) => boolean, descendIntoTrivia?: boolean): System.Collections.Generic.IEnumerable<SyntaxToken>;
        GetLeadingTrivia(): SyntaxTriviaList;
        GetTrailingTrivia(): SyntaxTriviaList;
        FindTrivia(position: number, findInsideTrivia?: boolean): SyntaxTrivia;
        DescendantTrivia_7298(descendIntoChildren?: (_: SyntaxNode) => boolean, descendIntoTrivia?: boolean): System.Collections.Generic.IEnumerable<SyntaxTrivia>;
        DescendantTrivia_9080(span: Text.TextSpan, descendIntoChildren?: (_: SyntaxNode) => boolean, descendIntoTrivia?: boolean): System.Collections.Generic.IEnumerable<SyntaxTrivia>;
        ContainsAnnotations: boolean;
        HasAnnotations_4203(annotationKind: string): boolean;
        HasAnnotations_9693(annotationKinds: System.Collections.Generic.IEnumerable<string>): boolean;
        HasAnnotation(annotation: SyntaxAnnotation): boolean;
        GetAnnotations_1417(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxAnnotation>;
        GetAnnotations_2034(annotationKinds: System.Collections.Generic.IEnumerable<string>): System.Collections.Generic.IEnumerable<SyntaxAnnotation>;
        GetAnnotations_1741(): SyntaxAnnotation[];
        GetAnnotatedNodesAndTokens_1420(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>;
        GetAnnotatedNodesAndTokens_6260(...annotationKinds: string[]): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>;
        GetAnnotatedNodesAndTokens_1187(annotation: SyntaxAnnotation): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>;
        GetAnnotatedNodes_9485(syntaxAnnotation: SyntaxAnnotation): System.Collections.Generic.IEnumerable<SyntaxNode>;
        GetAnnotatedNodes_1519(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxNode>;
        GetAnnotatedTokens_1936(syntaxAnnotation: SyntaxAnnotation): System.Collections.Generic.IEnumerable<SyntaxToken>;
        GetAnnotatedTokens_4443(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxToken>;
        GetAnnotatedTrivia_1911(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxTrivia>;
        GetAnnotatedTrivia_1609(...annotationKinds: string[]): System.Collections.Generic.IEnumerable<SyntaxTrivia>;
        GetAnnotatedTrivia_1355(annotation: SyntaxAnnotation): System.Collections.Generic.IEnumerable<SyntaxTrivia>;
        WithAdditionalAnnotationsInternal(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxNode;
        GetNodeWithoutAnnotations(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxNode;
        CopyAnnotationsTo<T extends SyntaxNode>(node: T): T;
        IsEquivalentTo_2068(node: SyntaxNode, topLevel?: boolean): boolean;
        SerializeTo(stream: System.IO.Stream, cancellationToken?: System.Threading.CancellationToken): void;
        protected EquivalentToCore(other: SyntaxNode): boolean;
        SyntaxTreeCore: SyntaxTree;
        protected FindTokenCore_1334(position: number, findInsideTrivia: boolean): SyntaxToken;
        protected FindTokenCore_1204(position: number, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken;
        protected FindTriviaCore(position: number, findInsideTrivia: boolean): SyntaxTrivia;
        ReplaceCore<TNode extends SyntaxNode>(nodes?: System.Collections.Generic.IEnumerable<TNode>, computeReplacementNode?: (_: TNode, __: TNode) => SyntaxNode, tokens?: System.Collections.Generic.IEnumerable<SyntaxToken>, computeReplacementToken?: (_: SyntaxToken, __: SyntaxToken) => SyntaxToken, trivia?: System.Collections.Generic.IEnumerable<SyntaxTrivia>, computeReplacementTrivia?: (_: SyntaxTrivia, __: SyntaxTrivia) => SyntaxTrivia): SyntaxNode;
        ReplaceNodeInListCore(originalNode: SyntaxNode, replacementNodes: System.Collections.Generic.IEnumerable<SyntaxNode>): SyntaxNode;
        InsertNodesInListCore(nodeInList: SyntaxNode, nodesToInsert: System.Collections.Generic.IEnumerable<SyntaxNode>, insertBefore: boolean): SyntaxNode;
        ReplaceTokenInListCore(originalToken: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>): SyntaxNode;
        InsertTokensInListCore(originalToken: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>, insertBefore: boolean): SyntaxNode;
        ReplaceTriviaInListCore(originalTrivia: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxNode;
        InsertTriviaInListCore(originalTrivia: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>, insertBefore: boolean): SyntaxNode;
        RemoveNodesCore(nodes: System.Collections.Generic.IEnumerable<SyntaxNode>, options: SyntaxRemoveOptions): SyntaxNode;
        NormalizeWhitespaceCore(indentation: string, elasticTrivia: boolean): SyntaxNode;
        protected IsEquivalentToCore(node: SyntaxNode, topLevel?: boolean): boolean;
        private DescendantNodesImpl(span, descendIntoChildren, descendIntoTrivia, includeSelf);
        private DescendantNodesAndTokensImpl(span, descendIntoChildren, descendIntoTrivia, includeSelf);
        private DescendantTriviaImpl(span, descendIntoChildren?, descendIntoTrivia?);
        static IsInSpan(span: {
            refObj: Text.TextSpan;
        }, childSpan: Text.TextSpan): boolean;
        private DescendantNodesOnly(span, descendIntoChildren, includeSelf);
        private DescendantNodesAndTokensOnly(span, descendIntoChildren, includeSelf);
        private DescendantNodesAndTokensIntoTrivia(span, descendIntoChildren, includeSelf);
        private DescendantTriviaOnly(span, descendIntoChildren);
        private DescendantTriviaIntoTrivia(span, descendIntoChildren);
        constructor();
    }
    module SyntaxNode {
        class ChildSyntaxListEnumeratorStack implements System.IDisposable, IStruct {
            private static StackPool;
            private stack;
            private stackPtr;
            ctor_1506(startingNode: SyntaxNode, descendIntoChildren: (_: SyntaxNode) => boolean): ChildSyntaxListEnumeratorStack;
            IsNotEmpty: boolean;
            TryGetNextInSpan(span: {
                refObj: Text.TextSpan;
            }, value: {
                refObj: SyntaxNodeOrToken;
            }): boolean;
            TryGetNextAsNodeInSpan(span: {
                refObj: Text.TextSpan;
            }): SyntaxNode;
            PushChildren_4828(node: SyntaxNode): void;
            PushChildren_1656(node: SyntaxNode, descendIntoChildren: (_: SyntaxNode) => boolean): void;
            Dispose(): void;
            constructor();
        }
    }
    module SyntaxNode {
        class TriviaListEnumeratorStack implements System.IDisposable, IStruct {
            private static StackPool;
            private stack;
            private stackPtr;
            TryGetNext(value: {
                refObj: SyntaxTrivia;
            }): boolean;
            PushLeadingTrivia(token: {
                refObj: SyntaxToken;
            }): void;
            PushTrailingTrivia(token: {
                refObj: SyntaxToken;
            }): void;
            private Grow();
            Dispose(): void;
            constructor();
        }
    }
    module SyntaxNode {
        class TwoEnumeratorListStack implements System.IDisposable, IStruct {
            private nodeStack;
            private triviaStack;
            private discriminatorStack;
            ctor_3899(startingNode: SyntaxNode, descendIntoChildren: (_: SyntaxNode) => boolean): TwoEnumeratorListStack;
            IsNotEmpty: boolean;
            PeekNext(): TwoEnumeratorListStack.Which;
            TryGetNextInSpan(span: {
                refObj: Text.TextSpan;
            }, value: {
                refObj: SyntaxNodeOrToken;
            }): boolean;
            TryGetNext(value: {
                refObj: SyntaxTrivia;
            }): boolean;
            PushChildren(node: SyntaxNode, descendIntoChildren: (_: SyntaxNode) => boolean): void;
            PushLeadingTrivia(token: {
                refObj: SyntaxToken;
            }): void;
            PushTrailingTrivia(token: {
                refObj: SyntaxToken;
            }): void;
            Dispose(): void;
            constructor();
        }
        module TwoEnumeratorListStack {
            enum Which {
                Node = 0,
                Trivia = 1,
            }
        }
    }
    module SyntaxNode {
        class ThreeEnumeratorListStack implements System.IDisposable, IStruct {
            private nodeStack;
            private triviaStack;
            private tokenStack;
            private discriminatorStack;
            ctor_4049(startingNode: SyntaxNode, descendIntoChildren: (_: SyntaxNode) => boolean): ThreeEnumeratorListStack;
            IsNotEmpty: boolean;
            PeekNext(): ThreeEnumeratorListStack.Which;
            TryGetNextInSpan(span: {
                refObj: Text.TextSpan;
            }, value: {
                refObj: SyntaxNodeOrToken;
            }): boolean;
            TryGetNext(value: {
                refObj: SyntaxTrivia;
            }): boolean;
            PopToken(): SyntaxNodeOrToken;
            PushChildren(node: SyntaxNode, descendIntoChildren: (_: SyntaxNode) => boolean): void;
            PushLeadingTrivia(token: {
                refObj: SyntaxToken;
            }): void;
            PushTrailingTrivia(token: {
                refObj: SyntaxToken;
            }): void;
            PushToken(value: {
                refObj: SyntaxNodeOrToken;
            }): void;
            Dispose(): void;
            constructor();
        }
        module ThreeEnumeratorListStack {
            enum Which {
                Node = 0,
                Trivia = 1,
                Token = 2,
            }
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class SyntaxNodeExtensions {
        static ReplaceSyntax<TRoot extends SyntaxNode>(root: TRoot, nodes: System.Collections.Generic.IEnumerable<SyntaxNode>, computeReplacementNode: (_: SyntaxNode, __: SyntaxNode) => SyntaxNode, tokens: System.Collections.Generic.IEnumerable<SyntaxToken>, computeReplacementToken: (_: SyntaxToken, __: SyntaxToken) => SyntaxToken, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>, computeReplacementTrivia: (_: SyntaxTrivia, __: SyntaxTrivia) => SyntaxTrivia): TRoot;
        static ReplaceNodes<TRoot extends SyntaxNode, TNode extends SyntaxNode>(root: TRoot, nodes: System.Collections.Generic.IEnumerable<TNode>, computeReplacementNode: (_: TNode, __: TNode) => SyntaxNode): TRoot;
        static ReplaceNode_3137<TRoot extends SyntaxNode>(root: TRoot, oldNode: SyntaxNode, newNode: SyntaxNode): TRoot;
        static ReplaceNode_1914<TRoot extends SyntaxNode>(root: TRoot, oldNode: SyntaxNode, newNodes: System.Collections.Generic.IEnumerable<SyntaxNode>): TRoot;
        static InsertNodesBefore<TRoot extends SyntaxNode>(root: TRoot, nodeInList: SyntaxNode, newNodes: System.Collections.Generic.IEnumerable<SyntaxNode>): TRoot;
        static InsertNodesAfter<TRoot extends SyntaxNode>(root: TRoot, nodeInList: SyntaxNode, newNodes: System.Collections.Generic.IEnumerable<SyntaxNode>): TRoot;
        static ReplaceToken_1116<TRoot extends SyntaxNode>(root: TRoot, tokenInList: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>): TRoot;
        static InsertTokensBefore<TRoot extends SyntaxNode>(root: TRoot, tokenInList: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>): TRoot;
        static InsertTokensAfter<TRoot extends SyntaxNode>(root: TRoot, tokenInList: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>): TRoot;
        static ReplaceTrivia_2582<TRoot extends SyntaxNode>(root: TRoot, oldTrivia: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): TRoot;
        static InsertTriviaBefore<TRoot extends SyntaxNode>(root: TRoot, trivia: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): TRoot;
        static InsertTriviaAfter<TRoot extends SyntaxNode>(root: TRoot, trivia: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): TRoot;
        static ReplaceTokens<TRoot extends SyntaxNode>(root: TRoot, tokens: System.Collections.Generic.IEnumerable<SyntaxToken>, computeReplacementToken: (_: SyntaxToken, __: SyntaxToken) => SyntaxToken): TRoot;
        static ReplaceToken_1612<TRoot extends SyntaxNode>(root: TRoot, oldToken: SyntaxToken, newToken: SyntaxToken): TRoot;
        static ReplaceTrivia_7706<TRoot extends SyntaxNode>(root: TRoot, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>, computeReplacementTrivia: (_: SyntaxTrivia, __: SyntaxTrivia) => SyntaxTrivia): TRoot;
        static ReplaceTrivia_1991<TRoot extends SyntaxNode>(root: TRoot, trivia: SyntaxTrivia, newTrivia: SyntaxTrivia): TRoot;
        static RemoveNode<TRoot extends SyntaxNode>(root: TRoot, node: SyntaxNode, options: SyntaxRemoveOptions): TRoot;
        static RemoveNodes<TRoot extends SyntaxNode>(root: TRoot, nodes: System.Collections.Generic.IEnumerable<SyntaxNode>, options: SyntaxRemoveOptions): TRoot;
        static DefaultIndentation: string;
        static NormalizeWhitespace<TNode extends SyntaxNode>(node: TNode, indentation?: string, elasticTrivia?: boolean): TNode;
        static WithLeadingTrivia_9576<TSyntax extends SyntaxNode>(node: TSyntax, trivia: SyntaxTriviaList): TSyntax;
        static WithLeadingTrivia_1499<TSyntax extends SyntaxNode>(node: TSyntax, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): TSyntax;
        static WithoutLeadingTrivia<TSyntax extends SyntaxNode>(node: TSyntax): TSyntax;
        static WithLeadingTrivia_2040<TSyntax extends SyntaxNode>(node: TSyntax, ...trivia: SyntaxTrivia[]): TSyntax;
        static WithTrailingTrivia_5344<TSyntax extends SyntaxNode>(node: TSyntax, trivia: SyntaxTriviaList): TSyntax;
        static WithTrailingTrivia_1964<TSyntax extends SyntaxNode>(node: TSyntax, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): TSyntax;
        static WithoutTrailingTrivia<TSyntax extends SyntaxNode>(node: TSyntax): TSyntax;
        static WithTrailingTrivia_7421<TSyntax extends SyntaxNode>(node: TSyntax, ...trivia: SyntaxTrivia[]): TSyntax;
    }
}
declare module Microsoft.CodeAnalysis {
}
declare module Microsoft.CodeAnalysis {
    class SyntaxNodeOrToken implements System.IEquatable<SyntaxNodeOrToken>, IStruct {
        private nodeOrParent;
        private token;
        private position;
        private tokenIndex;
        ctor_1281(node: SyntaxNode): SyntaxNodeOrToken;
        ctor_1484(parent: SyntaxNode, token: GreenNode, position: number, index: number): SyntaxNodeOrToken;
        private KindText;
        RawKind: number;
        Language: string;
        IsMissing: boolean;
        Parent: SyntaxNode;
        UnderlyingNode: GreenNode;
        Position: number;
        IsToken: boolean;
        IsNode: boolean;
        AsToken(): SyntaxToken;
        AsNode(): SyntaxNode;
        ChildNodesAndTokens(): ChildSyntaxList;
        Span: Text.TextSpan;
        SpanStart: number;
        FullSpan: Text.TextSpan;
        ToString(): string;
        ToFullString(): string;
        WriteTo(writer: System.IO.TextWriter): void;
        HasLeadingTrivia: boolean;
        GetLeadingTrivia(): SyntaxTriviaList;
        HasTrailingTrivia: boolean;
        GetTrailingTrivia(): SyntaxTriviaList;
        WithLeadingTrivia_2002(trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxNodeOrToken;
        WithLeadingTrivia_1694(...trivia: SyntaxTrivia[]): SyntaxNodeOrToken;
        WithTrailingTrivia_5961(trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxNodeOrToken;
        WithTrailingTrivia_3457(...trivia: SyntaxTrivia[]): SyntaxNodeOrToken;
        ContainsDiagnostics: boolean;
        GetDiagnostics(): System.Collections.Generic.IEnumerable<Diagnostic>;
        ContainsDirectives: boolean;
        ContainsAnnotations: boolean;
        HasAnnotations_4203(annotationKind: string): boolean;
        HasAnnotations_9693(annotationKinds: System.Collections.Generic.IEnumerable<string>): boolean;
        HasAnnotation(annotation: SyntaxAnnotation): boolean;
        GetAnnotations_1417(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxAnnotation>;
        GetAnnotations_2034(annotationKinds: System.Collections.Generic.IEnumerable<string>): System.Collections.Generic.IEnumerable<SyntaxAnnotation>;
        WithAdditionalAnnotations_2051(...annotations: SyntaxAnnotation[]): SyntaxNodeOrToken;
        WithAdditionalAnnotations_1967(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxNodeOrToken;
        WithoutAnnotations_6685(...annotations: SyntaxAnnotation[]): SyntaxNodeOrToken;
        WithoutAnnotations_2101(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxNodeOrToken;
        WithoutAnnotations_1777(annotationKind: string): SyntaxNodeOrToken;
        Equals_2291(other: SyntaxNodeOrToken): boolean;
        op_Equality(right: SyntaxNodeOrToken): boolean;
        op_Inequality(right: SyntaxNodeOrToken): boolean;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        IsEquivalentTo(other: SyntaxNodeOrToken): boolean;
        static op_Implicit_7398(token: SyntaxToken): SyntaxNodeOrToken;
        static op_Explicit_3521(nodeOrToken: SyntaxNodeOrToken): SyntaxToken;
        static op_Implicit_1792(node: SyntaxNode): SyntaxNodeOrToken;
        static op_Explicit_1741(nodeOrToken: SyntaxNodeOrToken): SyntaxNode;
        SyntaxTree: SyntaxTree;
        GetLocation(): Location;
        GetDirectives_1318<TDirective extends SyntaxNode>(typeDirective: {
            prototype: TDirective;
        }, filter?: (_: TDirective) => boolean): System.Collections.Generic.IList<TDirective>;
        private static GetDirectives_1988<TDirective>(typeDirective, node, filter, directives);
        private static GetDirectives_1246<TDirective>(typeDirective, node, filter, directives);
        private static GetDirectives_1443<TDirective>(typeDirective, token, filter, directives);
        private static GetDirectives_4779<TDirective>(typeDirective, trivia, filter, directives);
        Width: number;
        FullWidth: number;
        EndPosition: number;
        static GetFirstChildIndexSpanningPosition_6215(node: SyntaxNode, position: number): number;
        static GetFirstChildIndexSpanningPosition_2019(list: ChildSyntaxList, position: number): number;
        GetNextSibling(): SyntaxNodeOrToken;
        GetPreviousSibling(): SyntaxNodeOrToken;
        private GetNextSiblingFromStart(siblings);
        private GetNextSiblingWithSearch(siblings);
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    class SyntaxNodeOrTokenList implements System.IEquatable<SyntaxNodeOrTokenList>, System.Collections.Generic.IReadOnlyCollection<SyntaxNodeOrToken>, IStruct {
        private node;
        index: number;
        ctor_1240(node: SyntaxNode, index: number): SyntaxNodeOrTokenList;
        Node: SyntaxNode;
        Position: number;
        Parent: SyntaxNode;
        Count: number;
        $get$(index: number): SyntaxNodeOrToken;
        FullSpan: Text.TextSpan;
        Span: Text.TextSpan;
        ToString(): string;
        ToFullString(): string;
        First(): SyntaxNodeOrToken;
        FirstOrDefault(): SyntaxNodeOrToken;
        Last(): SyntaxNodeOrToken;
        LastOrDefault(): SyntaxNodeOrToken;
        IndexOf(nodeOrToken: SyntaxNodeOrToken): number;
        Any(): boolean;
        CopyTo(offset: number, array: GreenNode[], arrayOffset: number, count: number): void;
        Add(nodeOrToken: SyntaxNodeOrToken): SyntaxNodeOrTokenList;
        AddRange(nodesOrTokens: System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>): SyntaxNodeOrTokenList;
        Insert(index: number, nodeOrToken: SyntaxNodeOrToken): SyntaxNodeOrTokenList;
        InsertRange(index: number, nodesAndTokens: System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>): SyntaxNodeOrTokenList;
        private static CreateList(creator, items);
        RemoveAt(index: number): SyntaxNodeOrTokenList;
        Remove(nodeOrTokenInList: SyntaxNodeOrToken): SyntaxNodeOrTokenList;
        Replace(nodeOrTokenInList: SyntaxNodeOrToken, newNodeOrToken: SyntaxNodeOrToken): SyntaxNodeOrTokenList;
        ReplaceRange(nodeOrTokenInList: SyntaxNodeOrToken, newNodesAndTokens: System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>): SyntaxNodeOrTokenList;
        private Nodes;
        GetEnumerator(): System.Collections.Generic.IEnumerator<SyntaxNodeOrToken>;
        op_Equality(right: SyntaxNodeOrTokenList): boolean;
        op_Inequality(right: SyntaxNodeOrTokenList): boolean;
        Equals_1312(other: SyntaxNodeOrTokenList): boolean;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        constructor();
    }
    module SyntaxNodeOrTokenList {
        class Enumerator implements System.Collections.Generic.IEnumerator<SyntaxNodeOrToken>, IStruct {
            private list;
            private index;
            ctor_2058(list: SyntaxNodeOrTokenList): Enumerator;
            MoveNext(): boolean;
            Current: SyntaxNodeOrToken;
            Reset(): void;
            Dispose(): void;
            Equals(obj: Object): boolean;
            GetHashCode(): number;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class SyntaxReference {
        SyntaxTree: SyntaxTree;
        Span: Microsoft.CodeAnalysis.Text.TextSpan;
        GetSyntax(cancellationToken?: System.Threading.CancellationToken): SyntaxNode;
        GetLocation(): Location;
    }
}
declare module Microsoft.CodeAnalysis {
    enum SyntaxRemoveOptions {
        KeepNoTrivia = 0,
        KeepLeadingTrivia = 1,
        KeepTrailingTrivia = 2,
        KeepExteriorTrivia,
        KeepUnbalancedDirectives = 4,
        KeepDirectives = 8,
        KeepEndOfLine = 16,
        AddElasticMarker = 32,
    }
}
declare module Microsoft.CodeAnalysis {
    class SyntaxToken implements System.IEquatable<SyntaxToken>, IStruct {
        static NonZeroWidth: (_: SyntaxToken) => boolean;
        static Any: (_: SyntaxToken) => boolean;
        private parent;
        private token;
        private position;
        private index;
        ctor_1108(parent: SyntaxNode, token: GreenNode, position: number, index: number): SyntaxToken;
        ctor_1607(token: GreenNode): SyntaxToken;
        RawKind: number;
        Language: string;
        RawContextualKind: number;
        Parent: SyntaxNode;
        Node: GreenNode;
        Index: number;
        Position: number;
        Width: number;
        FullWidth: number;
        Span: Text.TextSpan;
        EndPosition: number;
        SpanStart: number;
        FullSpan: Text.TextSpan;
        IsMissing: boolean;
        Value: Object;
        ValueText: string;
        Text: string;
        ToString(): string;
        ToFullString(): string;
        WriteTo_1120(writer: System.IO.TextWriter): void;
        WriteTo_1077(writer: System.IO.TextWriter, leading: boolean, trailing: boolean): void;
        HasLeadingTrivia: boolean;
        HasTrailingTrivia: boolean;
        LeadingWidth: number;
        TrailingWidth: number;
        ContainsDiagnostics: boolean;
        ContainsDirectives: boolean;
        IsPartOfStructuredTrivia(): boolean;
        HasStructuredTrivia: boolean;
        ContainsAnnotations: boolean;
        HasAnnotations_4203(annotationKind: string): boolean;
        HasAnnotations_1739(...annotationKinds: string[]): boolean;
        HasAnnotation(annotation: SyntaxAnnotation): boolean;
        GetAnnotations_1417(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxAnnotation>;
        GetAnnotations_6794(...annotationKinds: string[]): System.Collections.Generic.IEnumerable<SyntaxAnnotation>;
        GetAnnotations_2034(annotationKinds: System.Collections.Generic.IEnumerable<string>): System.Collections.Generic.IEnumerable<SyntaxAnnotation>;
        WithAdditionalAnnotations_8112(...annotations: SyntaxAnnotation[]): SyntaxToken;
        WithAdditionalAnnotations_1605(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxToken;
        WithoutAnnotations_1344(...annotations: SyntaxAnnotation[]): SyntaxToken;
        WithoutAnnotations_1841(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxToken;
        WithoutAnnotations_1141(annotationKind: string): SyntaxToken;
        CopyAnnotationsTo(token: SyntaxToken): SyntaxToken;
        LeadingTrivia: SyntaxTriviaList;
        TrailingTrivia: SyntaxTriviaList;
        WithLeadingTrivia_1905(trivia: SyntaxTriviaList): SyntaxToken;
        WithTrailingTrivia_6264(trivia: SyntaxTriviaList): SyntaxToken;
        WithLeadingTrivia_1185(...trivia: SyntaxTrivia[]): SyntaxToken;
        WithLeadingTrivia_1496(trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxToken;
        WithTrailingTrivia_8808(...trivia: SyntaxTrivia[]): SyntaxToken;
        WithTrailingTrivia_1187(trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxToken;
        GetAllTrivia(): System.Collections.Generic.IEnumerable<SyntaxTrivia>;
        op_Equality(right: SyntaxToken): boolean;
        op_Inequality(right: SyntaxToken): boolean;
        Equals_1664(other: SyntaxToken): boolean;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        GetNextToken_1522(includeZeroWidth?: boolean, includeSkipped?: boolean, includeDirectives?: boolean, includeDocumentationComments?: boolean): SyntaxToken;
        GetNextToken_2254(predicate: (_: SyntaxToken) => boolean, stepInto?: (_: SyntaxTrivia) => boolean): SyntaxToken;
        GetPreviousToken_2067(includeZeroWidth?: boolean, includeSkipped?: boolean, includeDirectives?: boolean, includeDocumentationComments?: boolean): SyntaxToken;
        GetPreviousToken_8036(predicate: (_: SyntaxToken) => boolean, stepInto?: (_: SyntaxTrivia) => boolean): SyntaxToken;
        SyntaxTree: SyntaxTree;
        GetLocation(): Location;
        GetDiagnostics(): System.Collections.Generic.IEnumerable<Diagnostic>;
        IsEquivalentTo(token: SyntaxToken): boolean;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    class SyntaxTokenList implements System.IEquatable<SyntaxTokenList>, System.Collections.Generic.IReadOnlyList<SyntaxToken>, IStruct {
        parent: SyntaxNode;
        node: GreenNode;
        position: number;
        index: number;
        ctor_9846(parent: SyntaxNode, tokenOrList: GreenNode, position: number, index: number): SyntaxTokenList;
        ctor_9126(token: SyntaxToken): SyntaxTokenList;
        Node: GreenNode;
        Position: number;
        Count: number;
        $get$(index: number): SyntaxToken;
        FullSpan: Text.TextSpan;
        Span: Text.TextSpan;
        ToString(): string;
        ToFullString(): string;
        First(): SyntaxToken;
        Last(): SyntaxToken;
        Any(): boolean;
        Reverse(): SyntaxTokenList.Reversed;
        CopyTo(offset: number, array: GreenNode[], arrayOffset: number, count: number): void;
        private GetGreenNodeAt_3176(i);
        static GetGreenNodeAt_1419(node: GreenNode, i: number): GreenNode;
        IndexOf_1948(tokenInList: SyntaxToken): number;
        IndexOf_9119(rawKind: number): number;
        Add(token: SyntaxToken): SyntaxTokenList;
        AddRange(tokens: System.Collections.Generic.IEnumerable<SyntaxToken>): SyntaxTokenList;
        Insert(index: number, token: SyntaxToken): SyntaxTokenList;
        InsertRange(index: number, tokens: System.Collections.Generic.IEnumerable<SyntaxToken>): SyntaxTokenList;
        RemoveAt(index: number): SyntaxTokenList;
        Remove(tokenInList: SyntaxToken): SyntaxTokenList;
        Replace(tokenInList: SyntaxToken, newToken: SyntaxToken): SyntaxTokenList;
        ReplaceRange(tokenInList: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>): SyntaxTokenList;
        private Nodes;
        GetEnumerator(): System.Collections.Generic.IEnumerator<SyntaxToken>;
        op_Equality(right: SyntaxTokenList): boolean;
        op_Inequality(right: SyntaxTokenList): boolean;
        Equals_9666(other: SyntaxTokenList): boolean;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        static Create(token: SyntaxToken): SyntaxTokenList;
        constructor();
    }
    module SyntaxTokenList {
        class Enumerator implements IStruct {
            private parent;
            private singleNodeOrList;
            private baseIndex;
            private count;
            private index;
            private current;
            private position;
            ctor_1786(list: SyntaxTokenList): Enumerator;
            MoveNext(): boolean;
            Current: SyntaxToken;
            Equals(obj: Object): boolean;
            GetHashCode(): number;
            constructor();
        }
    }
    module SyntaxTokenList {
        class EnumeratorImpl implements System.Collections.Generic.IEnumerator<SyntaxToken> {
            private enumerator;
            ctor_1809(list: SyntaxTokenList): EnumeratorImpl;
            Current: SyntaxToken;
            MoveNext(): boolean;
            Reset(): void;
            Dispose(): void;
            constructor();
        }
    }
    module SyntaxTokenList {
        class Reversed implements System.Collections.Generic.IEnumerable<SyntaxToken>, System.IEquatable<Reversed>, IStruct {
            private list;
            ctor_1073(list: SyntaxTokenList): Reversed;
            GetEnumerator(): System.Collections.Generic.IEnumerator<SyntaxToken>;
            Equals(obj: Object): boolean;
            Equals_1958(other: Reversed): boolean;
            GetHashCode(): number;
            constructor();
        }
        module Reversed {
            class Enumerator implements IStruct {
                private parent;
                private singleNodeOrList;
                private baseIndex;
                private count;
                private index;
                private current;
                private position;
                ctor_1786(list: SyntaxTokenList): Enumerator;
                MoveNext(): boolean;
                Current: SyntaxToken;
                Equals(obj: Object): boolean;
                GetHashCode(): number;
                constructor();
            }
        }
        module Reversed {
            class EnumeratorImpl implements System.Collections.Generic.IEnumerator<SyntaxToken> {
                private enumerator;
                ctor_1809(list: SyntaxTokenList): EnumeratorImpl;
                Current: SyntaxToken;
                MoveNext(): boolean;
                Reset(): void;
                Dispose(): void;
                constructor();
            }
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class SyntaxTree {
        private lazyChecksum;
        private lazyHashAlgorithm;
        FilePath: string;
        HasCompilationUnitRoot: boolean;
        Options: ParseOptions;
        OptionsCore: ParseOptions;
        Length: number;
        TryGetText(text: {
            refObj: Text.SourceText;
        }): boolean;
        GetText(cancellationToken?: System.Threading.CancellationToken): Text.SourceText;
        TryGetRoot(root: {
            refObj: SyntaxNode;
        }): boolean;
        protected TryGetRootCore(root: {
            refObj: SyntaxNode;
        }): boolean;
        GetRoot(cancellationToken?: System.Threading.CancellationToken): SyntaxNode;
        protected GetRootCore(cancellationToken: System.Threading.CancellationToken): SyntaxNode;
        WithChangedText(newText: Text.SourceText): SyntaxTree;
        GetDiagnostics_4066(cancellationToken?: System.Threading.CancellationToken): System.Collections.Generic.IEnumerable<Diagnostic>;
        GetDiagnostics_1067(node: SyntaxNode): System.Collections.Generic.IEnumerable<Diagnostic>;
        GetDiagnostics_9583(token: SyntaxToken): System.Collections.Generic.IEnumerable<Diagnostic>;
        GetDiagnostics_1774(trivia: SyntaxTrivia): System.Collections.Generic.IEnumerable<Diagnostic>;
        GetDiagnostics_6963(nodeOrToken: SyntaxNodeOrToken): System.Collections.Generic.IEnumerable<Diagnostic>;
        GetLineSpan(span: Text.TextSpan, cancellationToken?: System.Threading.CancellationToken): FileLinePositionSpan;
        GetMappedLineSpan(span: Text.TextSpan, cancellationToken?: System.Threading.CancellationToken): FileLinePositionSpan;
        GetLineVisibility(position: number, cancellationToken?: System.Threading.CancellationToken): LineVisibility;
        GetMappedLineSpanAndVisibility(span: Text.TextSpan, isHiddenPosition: {
            refObj: boolean;
        }): FileLinePositionSpan;
        GetDisplayPath(span: Text.TextSpan, resolver: SourceReferenceResolver): string;
        GetDisplayLineNumber(span: Text.TextSpan): number;
        HasHiddenRegions(): boolean;
        GetChangedSpans(syntaxTree: SyntaxTree): System.Collections.Generic.IList<Text.TextSpan>;
        GetLocation(span: Text.TextSpan): Location;
        IsEquivalentTo(tree: SyntaxTree, topLevel?: boolean): boolean;
        GetReference(node: SyntaxNode): SyntaxReference;
        GetChanges(oldTree: SyntaxTree): System.Collections.Generic.IList<Text.TextChange>;
        WithRootAndOptions(root: SyntaxNode, options: ParseOptions): SyntaxTree;
        WithFilePath(path: string): SyntaxTree;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    class SyntaxTreeExtensions {
        static VerifySource(tree: SyntaxTree, changes?: System.Collections.Generic.IEnumerable<Text.TextChangeRange>): void;
        private static FindFirstDifference(s1, s2);
    }
}
declare module Microsoft.CodeAnalysis {
    class SyntaxTrivia implements System.IEquatable<SyntaxTrivia>, IStruct {
        static Any: (_: SyntaxTrivia) => boolean;
        private token;
        private triviaNode;
        private position;
        private index;
        ctor_1046(token: SyntaxToken, triviaNode: GreenNode, position: number, index: number): SyntaxTrivia;
        RawKind: number;
        Language: string;
        Token: SyntaxToken;
        UnderlyingNode: GreenNode;
        Position: number;
        Index: number;
        Width: number;
        FullWidth: number;
        Span: Text.TextSpan;
        SpanStart: number;
        FullSpan: Text.TextSpan;
        ContainsDiagnostics: boolean;
        HasStructure: boolean;
        IsPartOfStructuredTrivia(): boolean;
        ContainsAnnotations: boolean;
        HasAnnotations_4203(annotationKind: string): boolean;
        HasAnnotations_1739(...annotationKinds: string[]): boolean;
        HasAnnotations_1739_Arr(annotationKinds: string[]): boolean;
        HasAnnotation(annotation: SyntaxAnnotation): boolean;
        GetAnnotations_1417(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxAnnotation>;
        GetAnnotations_6794(...annotationKinds: string[]): System.Collections.Generic.IEnumerable<SyntaxAnnotation>;
        IsDirective: boolean;
        GetStructure(): SyntaxNode;
        ToString(): string;
        ToFullString(): string;
        WriteTo(writer: System.IO.TextWriter): void;
        op_Equality(right: SyntaxTrivia): boolean;
        op_Inequality(right: SyntaxTrivia): boolean;
        Equals_3529(other: SyntaxTrivia): boolean;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        WithAdditionalAnnotations_1767(...annotations: SyntaxAnnotation[]): SyntaxTrivia;
        WithAdditionalAnnotations_2069(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxTrivia;
        WithoutAnnotations_9940(...annotations: SyntaxAnnotation[]): SyntaxTrivia;
        WithoutAnnotations_4941(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxTrivia;
        WithoutAnnotations_4599(annotationKind: string): SyntaxTrivia;
        CopyAnnotationsTo(trivia: SyntaxTrivia): SyntaxTrivia;
        SyntaxTree: SyntaxTree;
        GetLocation(): Location;
        GetDiagnostics(): System.Collections.Generic.IEnumerable<Diagnostic>;
        IsEquivalentTo(trivia: SyntaxTrivia): boolean;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    class SyntaxTriviaList implements System.IEquatable<SyntaxTriviaList>, System.Collections.Generic.IReadOnlyList<SyntaxTrivia>, IStruct {
        token: SyntaxToken;
        node: GreenNode;
        position: number;
        index: number;
        static Empty: SyntaxTriviaList;
        ctor_5254(token: SyntaxToken, node: GreenNode, position: number, index?: number): SyntaxTriviaList;
        ctor_1248(token: SyntaxToken, node: GreenNode): SyntaxTriviaList;
        ctor_2284(trivia: SyntaxTrivia): SyntaxTriviaList;
        Token: SyntaxToken;
        Node: GreenNode;
        Position: number;
        Index: number;
        Count: number;
        ElementAt(index: number): SyntaxTrivia;
        $get$(index: number): SyntaxTrivia;
        FullSpan: Text.TextSpan;
        Span: Text.TextSpan;
        First(): SyntaxTrivia;
        Last(): SyntaxTrivia;
        Any(): boolean;
        Reverse(): SyntaxTriviaList.Reversed;
        IndexOf_1053(triviaInList: SyntaxTrivia): number;
        IndexOf_9119(rawKind: number): number;
        Add(trivia: SyntaxTrivia): SyntaxTriviaList;
        AddRange(trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxTriviaList;
        Insert(index: number, trivia: SyntaxTrivia): SyntaxTriviaList;
        InsertRange(index: number, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxTriviaList;
        RemoveAt(index: number): SyntaxTriviaList;
        Remove(triviaInList: SyntaxTrivia): SyntaxTriviaList;
        Replace(triviaInList: SyntaxTrivia, newTrivia: SyntaxTrivia): SyntaxTriviaList;
        ReplaceRange(triviaInList: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxTriviaList;
        private Nodes;
        GetEnumerator(): System.Collections.Generic.IEnumerator<SyntaxTrivia>;
        private GetGreenNodeAt_3176(i);
        static GetGreenNodeAt_1419(node: GreenNode, i: number): GreenNode;
        Equals_1854(other: SyntaxTriviaList): boolean;
        op_Equality(right: SyntaxTriviaList): boolean;
        op_Inequality(right: SyntaxTriviaList): boolean;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        CopyTo(offset: number, array: SyntaxTrivia[], arrayOffset: number, count: number): void;
        ToString(): string;
        ToFullString(): string;
        static Create(trivia: SyntaxTrivia): SyntaxTriviaList;
        constructor();
    }
    module SyntaxTriviaList {
        class Reversed implements System.Collections.Generic.IEnumerable<SyntaxTrivia>, System.IEquatable<Reversed>, IStruct {
            private list;
            ctor_2098(list: SyntaxTriviaList): Reversed;
            GetEnumerator(): System.Collections.Generic.IEnumerator<SyntaxTrivia>;
            GetHashCode(): number;
            Equals(obj: Object): boolean;
            Equals_1958(other: Reversed): boolean;
            constructor();
        }
        module Reversed {
            class Enumerator implements IStruct {
                private token;
                private singleNodeOrList;
                private baseIndex;
                private count;
                private index;
                private current;
                private position;
                ctor_9491(list: SyntaxTriviaList): Enumerator;
                MoveNext(): boolean;
                Current: SyntaxTrivia;
                constructor();
            }
        }
        module Reversed {
            class ReversedEnumeratorImpl implements System.Collections.Generic.IEnumerator<SyntaxTrivia> {
                private enumerator;
                ctor_1247(list: SyntaxTriviaList): ReversedEnumeratorImpl;
                Current: SyntaxTrivia;
                MoveNext(): boolean;
                Reset(): void;
                Dispose(): void;
                constructor();
            }
        }
    }
    module SyntaxTriviaList {
        class Enumerator implements IStruct {
            private token;
            private singleNodeOrList;
            private baseIndex;
            private count;
            private index;
            private current;
            private position;
            ctor_9491(list: SyntaxTriviaList): Enumerator;
            private InitializeFrom(token, greenNode, index, position);
            InitializeFromLeadingTrivia(token: {
                refObj: SyntaxToken;
            }): void;
            InitializeFromTrailingTrivia(token: {
                refObj: SyntaxToken;
            }): void;
            MoveNext(): boolean;
            Current: SyntaxTrivia;
            TryMoveNextAndGetCurrent(current: {
                refObj: SyntaxTrivia;
            }): boolean;
            constructor();
        }
    }
    module SyntaxTriviaList {
        class EnumeratorImpl implements System.Collections.Generic.IEnumerator<SyntaxTrivia> {
            private enumerator;
            ctor_1471(list: SyntaxTriviaList): EnumeratorImpl;
            Current: SyntaxTrivia;
            MoveNext(): boolean;
            Reset(): void;
            Dispose(): void;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis {
    class SyntaxWalker {
        protected Depth: SyntaxWalkerDepth;
        ctor_1744(depth?: SyntaxWalkerDepth): SyntaxWalker;
        Visit(node: SyntaxNode): void;
        protected VisitToken(token: SyntaxToken): void;
        private VisitLeadingTrivia(token);
        private VisitTrailingTrivia(token);
        protected VisitTrivia(trivia: SyntaxTrivia): void;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis {
    enum SyntaxWalkerDepth {
        Node = 0,
        Token = 1,
        Trivia = 2,
        StructuredTrivia = 3,
    }
}
declare module Microsoft.CodeAnalysis.Syntax {
    class TranslationSyntaxReference extends SyntaxReference {
        private reference;
        ctor_1683(reference: SyntaxReference): TranslationSyntaxReference;
        Span: Text.TextSpan;
        SyntaxTree: SyntaxTree;
        GetSyntax(cancellationToken?: System.Threading.CancellationToken): SyntaxNode;
        protected Translate(reference: SyntaxReference, cancellationToken: System.Threading.CancellationToken): SyntaxNode;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class TextLineCollection implements System.Collections.Generic.IReadOnlyList<TextLine> {
        Count: number;
        $get$(index: number): TextLine;
        IndexOf(position: number): number;
        GetLineFromPosition(position: number): TextLine;
        GetLinePosition(position: number): LinePosition;
        GetLinePositionSpan(span: TextSpan): LinePositionSpan;
        GetPosition(position: LinePosition): number;
        GetTextSpan(span: LinePositionSpan): TextSpan;
        GetEnumerator(): TextLineCollection.Enumerator;
        constructor();
    }
    module TextLineCollection {
        class Enumerator implements System.Collections.Generic.IEnumerator<TextLine>, System.Collections.IEnumerator, IStruct {
            private lines;
            private index;
            ctor_1673(lines: TextLineCollection, index?: number): Enumerator;
            Current: TextLine;
            MoveNext(): boolean;
            Reset(): void;
            Dispose(): void;
            Equals(obj: Object): boolean;
            GetHashCode(): number;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class SourceTextContainer {
        CurrentText: SourceText;
        event: TSEvent<(sender: Object, e: TextChangeEventArgs) => void>;
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class SourceText {
        private static CharBufferSize;
        private static CharBufferCount;
        private static CharArrayPool;
        private checksumAlgorithm;
        private lazyContainer;
        private lazyLineInfo;
        private lazyChecksum;
        ctor_1670(checksum?: System.Collections.Immutable.ImmutableArray<number>, checksumAlgorithm?: SourceHashAlgorithm, container?: SourceTextContainer): SourceText;
        static ValidateChecksumAlgorithm(checksumAlgorithm: SourceHashAlgorithm): void;
        static From_1429(text: string, encoding?: System.Text.Encoding, checksumAlgorithm?: SourceHashAlgorithm): SourceText;
        ChecksumAlgorithm: SourceHashAlgorithm;
        Encoding: System.Text.Encoding;
        Length: number;
        $get$(position: number): string;
        CopyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void;
        Container: SourceTextContainer;
        CheckSubSpan(span: TextSpan): void;
        GetSubText_1692(span: TextSpan): SourceText;
        GetSubText_1518(start: number): SourceText;
        Write_1707(textWriter: System.IO.TextWriter, cancellationToken?: System.Threading.CancellationToken): void;
        Write_5564(writer: System.IO.TextWriter, span: TextSpan, cancellationToken?: System.Threading.CancellationToken): void;
        ToString(): string;
        ToString_4959(span: TextSpan): string;
        WithChanges_5075(changes: System.Collections.Generic.IEnumerable<TextChange>): SourceText;
        WithChanges_9931(...changes: TextChange[]): SourceText;
        Replace_1550(span: TextSpan, newText: string): SourceText;
        Replace_5382(start: number, length: number, newText: string): SourceText;
        GetChangeRanges(oldText: SourceText): System.Collections.Generic.IReadOnlyList<TextChangeRange>;
        GetTextChanges(oldText: SourceText): System.Collections.Generic.IReadOnlyList<TextChange>;
        Lines: TextLineCollection;
        private ParseLineStarts();
        ContentEquals(other: SourceText): boolean;
        protected ContentEqualsImpl(other: SourceText): boolean;
        constructor();
    }
    module SourceText {
        class LineInfo extends TextLineCollection {
            private text;
            private lineStarts;
            private lastLineNumber;
            ctor_4205(text: SourceText, lineStarts: number[]): LineInfo;
            Count: number;
            $get$(index: number): TextLine;
            IndexOf(position: number): number;
            GetLineFromPosition(position: number): TextLine;
            constructor();
        }
    }
    module SourceText {
        class StaticContainer extends SourceTextContainer {
            private text;
            ctor_1615(text: SourceText): StaticContainer;
            CurrentText: SourceText;
            constructor();
        }
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class ChangedText extends SourceText {
        private oldText;
        private newText;
        private changes;
        ctor_1415(oldText: SourceText, changeRanges: System.Collections.Immutable.ImmutableArray<TextChangeRange>, segments: System.Collections.Immutable.ImmutableArray<SourceText>): ChangedText;
        Encoding: System.Text.Encoding;
        OldText: SourceText;
        NewText: SourceText;
        Changes: System.Collections.Generic.IEnumerable<TextChangeRange>;
        Length: number;
        $get$(position: number): string;
        ToString_4959(span: TextSpan): string;
        GetSubText_1692(span: TextSpan): SourceText;
        CopyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void;
        GetChangeRanges(oldText: SourceText): System.Collections.Generic.IReadOnlyList<TextChangeRange>;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class CompositeText extends SourceText {
        private texts;
        private length;
        ctor_1839(texts: System.Collections.Immutable.ImmutableArray<SourceText>): CompositeText;
        Encoding: System.Text.Encoding;
        Length: number;
        $get$(position: number): string;
        GetSubText_1692(span: TextSpan): SourceText;
        private GetIndexAndOffset(position, index, offset);
        private CheckCopyToArguments(sourceIndex, destination, destinationIndex, count);
        CopyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void;
        static AddSegments(builder: ArrayBuilder<SourceText>, text: SourceText): void;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class LinePosition implements System.IEquatable<LinePosition>, System.Generic.IComparable<LinePosition>, IStruct {
        static Zero: LinePosition;
        private line;
        private character;
        ctor_1367(line: number, character: number): LinePosition;
        ctor_9638(character: number): LinePosition;
        Line: number;
        Character: number;
        op_Equality(right: LinePosition): boolean;
        op_Inequality(right: LinePosition): boolean;
        Equals_6178(other: LinePosition): boolean;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        ToString(): string;
        CompareTo(other: LinePosition): number;
        op_GreaterThan(right: LinePosition): boolean;
        op_GreaterThanOrEqual(right: LinePosition): boolean;
        op_LessThan(right: LinePosition): boolean;
        op_LessThanOrEqual(right: LinePosition): boolean;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class LinePositionSpan implements System.IEquatable<LinePositionSpan>, IStruct {
        private start;
        private end;
        ctor_1348(start: LinePosition, end: LinePosition): LinePositionSpan;
        Start: LinePosition;
        End: LinePosition;
        Equals(obj: Object): boolean;
        Equals_2915(other: LinePositionSpan): boolean;
        GetHashCode(): number;
        op_Equality(right: LinePositionSpan): boolean;
        op_Inequality(right: LinePositionSpan): boolean;
        ToString(): string;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis.Text {
    enum SourceHashAlgorithm {
        None = 0,
        Sha1 = 1,
        Sha256 = 2,
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class StringBuilderText extends SourceText {
        private builder;
        private encodingOpt;
        ctor_1446(builder: System.Text.StringBuilder, encodingOpt: System.Text.Encoding, checksumAlgorithm: SourceHashAlgorithm): StringBuilderText;
        Encoding: System.Text.Encoding;
        Builder: System.Text.StringBuilder;
        Length: number;
        $get$(position: number): string;
        ToString_4959(span: TextSpan): string;
        CopyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class StringText extends SourceText {
        private source;
        private encodingOpt;
        ctor_3448(source: string, encodingOpt: System.Text.Encoding, checksum?: System.Collections.Immutable.ImmutableArray<number>, checksumAlgorithm?: SourceHashAlgorithm): StringText;
        Encoding: System.Text.Encoding;
        Source: string;
        Length: number;
        $get$(position: number): string;
        ToString_4959(span: TextSpan): string;
        CopyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void;
        Write_5564(textWriter: System.IO.TextWriter, span: TextSpan, cancellationToken?: System.Threading.CancellationToken): void;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class SubText extends SourceText {
        private text;
        private span;
        ctor_1484(text: SourceText, span: TextSpan): SubText;
        Encoding: System.Text.Encoding;
        UnderlyingText: SourceText;
        UnderlyingSpan: TextSpan;
        Length: number;
        $get$(position: number): string;
        ToString_4959(span: TextSpan): string;
        GetSubText_1692(span: TextSpan): SourceText;
        CopyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void;
        private GetCompositeSpan(start, length);
        constructor();
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class TextChange implements System.IEquatable<TextChange>, IStruct {
        Span: TextSpan;
        NewText: string;
        ctor_1791(span: TextSpan, newText: string): TextChange;
        ToString(): string;
        Equals(obj: Object): boolean;
        Equals_8738(other: TextChange): boolean;
        GetHashCode(): number;
        op_Equality(right: TextChange): boolean;
        op_Inequality(right: TextChange): boolean;
        static op_Implicit_9951(change: TextChange): TextChangeRange;
        static NoChanges: System.Collections.Generic.IReadOnlyList<TextChange>;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class TextChangeEventArgs extends System.EventArgs {
        ctor_1051(oldText: SourceText, newText: SourceText, changes: System.Collections.Generic.IEnumerable<TextChangeRange>): TextChangeEventArgs;
        ctor_1283(oldText: SourceText, newText: SourceText, ...changes: TextChangeRange[]): TextChangeEventArgs;
        OldText: SourceText;
        NewText: SourceText;
        Changes: System.Collections.Generic.IReadOnlyList<TextChangeRange>;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class TextChangeRange implements System.IEquatable<TextChangeRange>, IStruct {
        Span: TextSpan;
        NewLength: number;
        ctor_4786(span: TextSpan, newLength: number): TextChangeRange;
        Equals_5196(other: TextChangeRange): boolean;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        op_Equality(right: TextChangeRange): boolean;
        op_Inequality(right: TextChangeRange): boolean;
        static NoChanges: System.Collections.Generic.IReadOnlyList<TextChangeRange>;
        static Collapse(changes: System.Collections.Generic.IEnumerable<TextChangeRange>): TextChangeRange;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class TextLine implements System.IEquatable<TextLine>, IStruct {
        private text;
        private start;
        private endIncludingBreaks;
        ctor_9479(text: SourceText, start: number, endIncludingBreaks: number): TextLine;
        static FromSpan(text: SourceText, span: TextSpan): TextLine;
        Text: SourceText;
        LineNumber: number;
        Start: number;
        End: number;
        private LineBreakLength;
        EndIncludingLineBreak: number;
        Span: TextSpan;
        SpanIncludingLineBreak: TextSpan;
        ToString(): string;
        op_Equality(right: TextLine): boolean;
        op_Inequality(right: TextLine): boolean;
        Equals_4451(other: TextLine): boolean;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class TextSpan implements System.IEquatable<TextSpan>, System.Generic.IComparable<TextSpan>, IStruct {
        private start;
        private length;
        ctor_1506(start: number, length: number): TextSpan;
        Start: number;
        End: number;
        Length: number;
        IsEmpty: boolean;
        Contains_2103(position: number): boolean;
        Contains_1915(span: TextSpan): boolean;
        OverlapsWith(span: TextSpan): boolean;
        Overlap(span: TextSpan): TextSpan;
        IntersectsWith_1989(span: TextSpan): boolean;
        IntersectsWith_1739(position: number): boolean;
        Intersection(span: TextSpan): TextSpan;
        static FromBounds(start: number, end: number): TextSpan;
        op_Equality(right: TextSpan): boolean;
        op_Inequality(right: TextSpan): boolean;
        Equals_9598(other: TextSpan): boolean;
        Equals(obj: Object): boolean;
        GetHashCode(): number;
        ToString(): string;
        CompareTo(other: TextSpan): number;
        constructor();
    }
}
declare module Microsoft.CodeAnalysis.Text {
    class TextUtilities {
        static GetLengthOfLineBreak(text: SourceText, index: number): number;
        private static GetLengthOfLineBreakSlow(text, index, c);
        static GetStartAndLengthOfLineBreakEndingAt(text: SourceText, index: number, startLinebreak: {
            refObj: number;
        }, lengthLinebreak: {
            refObj: number;
        }): void;
        static IsAnyLineBreakCharacter(c: string): boolean;
    }
}
declare module Microsoft.CodeAnalysis {
    class XmlCharType {
        static SurHighStart: number;
        static SurHighEnd: number;
        static SurLowStart: number;
        static SurLowEnd: number;
        static SurMask: number;
        static fWhitespace: number;
        static fLetter: number;
        static fNCStartNameSC: number;
        static fNCNameSC: number;
        static fCharData: number;
        static fNCNameXml4e: number;
        static fText: number;
        static fAttrValue: number;
        private static s_PublicIdBitmap;
        private static CharPropertiesSize;
        private static innerSizeBits;
        private static innerSize;
        private static innerSizeMask;
        private static s_charPropertiesIndex;
        private static s_charProperties;
        private static charProperties(i);
        static IsWhiteSpace(ch: string): boolean;
        static IsExtender(ch: string): boolean;
        static IsNCNameSingleChar(ch: string): boolean;
        static IsStartNCNameSingleChar(ch: string): boolean;
        static IsNameSingleChar(ch: string): boolean;
        static IsStartNameSingleChar(ch: string): boolean;
        static IsCharData(ch: string): boolean;
        static IsPubidChar(ch: string): boolean;
        static IsTextChar(ch: string): boolean;
        static IsAttributeValueChar(ch: string): boolean;
        static IsLetter(ch: string): boolean;
        static IsNCNameCharXml4e(ch: string): boolean;
        static IsStartNCNameCharXml4e(ch: string): boolean;
        static IsNameCharXml4e(ch: string): boolean;
        static IsStartNameCharXml4e(ch: string): boolean;
        static IsDigit(ch: string): boolean;
        static IsHexDigit(ch: string): boolean;
        static IsHighSurrogate(ch: number): boolean;
        static IsLowSurrogate(ch: number): boolean;
        static IsSurrogate(ch: number): boolean;
        static CombineSurrogateChar(lowChar: number, highChar: number): number;
        static SplitSurrogateChar(combinedChar: number, lowChar: {
            refObj: string;
        }, highChar: {
            refObj: string;
        }): void;
        static IsOnlyWhitespace(str: string): boolean;
        static IsOnlyWhitespaceWithPos(str: string): number;
        static IsOnlyCharData(str: string): number;
        static IsPublicId(str: string): number;
        static IsOnlyDigits(chars: string[], startPos: number, len: number): boolean;
        static IsOnlyDigits(str: string, startPos: number, len: number): boolean;
        private static IsOnlyDigits_overload0(chars, startPos, len);
        private static IsOnlyDigits_overload1(str, startPos, len);
        private static InRange(value, start, end);
        private static InRangePrivate(value, start, end);
    }
}
