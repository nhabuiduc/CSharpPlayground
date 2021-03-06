﻿module Microsoft.CodeAnalysis {
    export class CodeAnalysisResources {
        public static AbsolutePathExpected = "Absolute path expected.";
        public static ArgumentCannotBeEmpty = "Argument cannot be empty.";
        public static ArgumentElementCannotBeNull = "Argument cannot have a null element.";
        public static ArraysWithMoreThanOneDimensionCannotBeSerialized = "Arrays with more than one dimension cannot be serialized.";
        public static Assembly = "assembly";
        public static AssemblyFileNotFound = "Assembly file not found";
        public static AssemblyMustHaveAtLeastOneModule = "Assembly must have at least one module.";
        public static AssemblySigningNotSupported = "Assembly signing not supported.";
        public static CannotAliasModule = "Can't alias a module.";
        public static CannotCreateReferenceToModule = "Can't create a reference to a module.";
        public static CannotCreateReferenceToSubmission = "Can't create a reference to a submission.";
        public static CannotEmbedInteropTypesFromModule = "Can't embed interop types from module.";
        public static CantCreateModuleReferenceToAssembly = "Can't create a module reference to an assembly.";
        public static CantCreateReferenceToDynamicAssembly = "Can't create a metadata reference to a dynamic assembly.";
        public static ChangesMustBeOrderedAndNotOverlapping = "The changes must be ordered and not overlapping.";
        public static Class1 = "class";
        public static CoffResourceInvalidRelocation = "Win32 resources, assumed to be in COFF object format, have one or more invalid relocation header values.";
        public static CoffResourceInvalidSectionSize = "Win32 resources, assumed to be in COFF object format, have an invalid section size.";
        public static CoffResourceInvalidSymbol = "Win32 resources, assumed to be in COFF object format, have one or more invalid symbol values.";
        public static CoffResourceMissingSection = "Win32 resources, assumed to be in COFF object format, are missing one or both of sections '.rsrc$01' and '.rsrc$02'";
        public static CompilationOptionsMustNotHaveErrors = "Compilation options must not have errors.";
        public static CompilerAnalyzerFailure = "Compiler Analyzer Failure";
        public static CompilerAnalyzerThrows = "The Compiler Analyzer '{0}' threw an exception with message '{1}'.";
        public static Constructor = "constructor";
        public static Delegate1 = "delegate";
        public static DiagnosticIdCantBeNullOrWhitespace = "A DiagnosticDescriptor must have an Id that is neiter null nor an empty string nor a string that only contains white space.";
        public static EmptyOrInvalidFileName = "Empty or invalid file name";
        public static EmptyOrInvalidResourceName = "Empty or invalid resource name";
        public static EndMustNotBeLessThanStart = "'end' must not be less than 'start'";
        public static Enum1 = "enum";
        public static Event1 = "event";
        public static ExpectedNonEmptyPublicKey = "Expected non-empty public key";
        public static FailedToResolveRuleSetName = "Could not locate the rule set file '{0}'.";
        public static Field = "field";
        public static FileNotFound = "File not found.";
        public static FileSizeExceedsMaximumAllowed = "File size exceeds maximum allowed size of a valid metadata file.";
        public static GetMetadataMustReturnInstance = "{0}.GetMetadata() must return an instance of {1}.";
        public static IconStreamUnexpectedFormat = "Icon stream is not in the expected format.";
        public static InMemoryAssembly = "<in-memory assembly>";
        public static InMemoryModule = "<in-memory module>";
        public static Interface1 = "interface";
        public static InvalidAlias = "Invalid alias.";
        public static InvalidAssemblyName = "Invalid assembly name: '{0}'";
        public static InvalidCharactersInAssemblyCultureName = "Invalid characters in assembly culture name";
        public static InvalidCharactersInAssemblyName = "Invalid characters in assembly name";
        public static InvalidCompilationOptions = "Invalid compilation options -- submission can't be signed.";
        public static InvalidContentType = "Invalid content type";
        public static InvalidCultureName = "Invalid culture name: '{0}'";
        public static InvalidHash = "Invalid hash.";
        public static InvalidModuleName = "Invalid module name specified in metadata module '{0}': '{1}'";
        public static InvalidOutputKindForSubmission = "Invalid output kind for submission. DynamicallyLinkedLibrary expected.";
        public static InvalidRuleSetInclude = "An error occurred while loading the included rule set file {0} - {1}";
        public static InvalidSizeOfPublicKeyToken = "Invalid size of public key token.";
        public static Method = "method";
        public static Module = "module";
        public static ModuleCopyCannotBeUsedToCreateAssemblyMetadata = "Module copy can't be used to create an assembly metadata.";
        public static NameCannotBeEmpty = "Name cannot be empty.";
        public static NameCannotStartWithWhitespace = "Name cannot start with whitespace.";
        public static NameContainsInvalidCharacter = "Name contains invalid characters.";
        public static OutputKindNotSupported = "Output kind not supported.";
        public static Parameter = "parameter";
        public static PathReturnedByResolveMetadataFileMustBeAbsolute = "Path returned by {0}.ResolveMetadataFile must be absolute: '{1}'";
        public static PathReturnedByResolveStrongNameKeyFileMustBeAbsolute = "Path returned by {0}.ResolveStrongNameKeyFile must be absolute: '{1}'";
        public static PEImageDoesntContainManagedMetadata = "PE image doesn't contain managed metadata.";
        public static PEImageNotAvailable = "PE image not available.";
        public static PreviousSubmissionHasErrors = "Previous submission has errors.";
        public static Property = "property, indexer";
        public static ReferenceResolverShouldReturnReadableNonNullStream = "Reference resolver should return readable non-null stream.";
        public static ResourceDataProviderShouldReturnNonNullStream = "Resource data provider should return non-null stream";
        public static ResourceStreamProviderShouldReturnNonNullStream = "Resource stream provider should return non-null stream.";
        public static Return1 = "return";
        public static ReturnTypeCannotBeValuePointerbyRefOrOpen = "Return type can't be a value type, pointer, by-ref or open generic type";
        public static ReturnTypeCannotBeVoidByRefOrOpen = "Return type can't be void, by-ref or open generic type";
        public static RuleSetHasDuplicateRules = "The rule set file has duplicate rules for '{0}' with differing actions '{1}' and '{2}'.";
        public static RuleSetSchemaViolation = "The file does not conform to the rule set schema - {0}";
        public static SeverityError = "error";
        public static SeverityHidden = "hidden";
        public static SeverityInfo = "info";
        public static SeverityWarning = "warning";
        public static SizeHasToBePositive = "Size has to be positive.";
        public static SpanDoesNotIncludeEndOfLine = "Then span does not include the end of a line.";
        public static SpanDoesNotIncludeStartOfLine = "The span does not include the start of a line.";
        public static StartMustNotBeNegative = "'start' must not be negative";
        public static StreamMustSupportReadAndSeek = "Stream must support read and seek operations.";
        public static Struct1 = "struct";
        public static TypeMustBeASubclassOfSyntaxAnnotation = "type must be a subclass of SyntaxAnnotation.";
        public static TypeMustBeSameAsHostObjectTypeOfPreviousSubmission = "Type must be same as host object type of previous submission.";
        public static TypeParameter = "type parameter";
        public static Unresolved = "Unresolved:";
        public static UnsupportedHashAlgorithm = "Unsupported hash algorithm.";
        public static ValueTooLargeToBeRepresented = "Value too large to be represented as a 30 bit unsigned integer.";
        public static WinRTIdentityCantBeRetargetable = "WindowsRuntime identity can't be retargetable";
        public static XmlReferencesNotSupported = "References to XML documents are not supported.";

    }
}