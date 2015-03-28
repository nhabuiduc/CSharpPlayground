module Microsoft.CodeAnalysis.CSharp {
    export class ErrorFacts {
        private static TitleSuffix: string = "_Title";
        private static DescriptionSuffix: string = "_Description";
        private static helpLinksMap: System.Lazy<System.Collections.Immutable.ImmutableDictionary<ErrorCode, string>> = new System.Lazy<System.Collections.Immutable.ImmutableDictionary<ErrorCode, string>>(ErrorFacts.CreateHelpLinks);
        private static categoriesMap: System.Lazy<System.Collections.Immutable.ImmutableDictionary<ErrorCode, string>> = new System.Lazy<System.Collections.Immutable.ImmutableDictionary<ErrorCode, string>>(ErrorFacts.CreateCategoriesMap);
        private static CreateHelpLinks(): System.Collections.Immutable.ImmutableDictionary<ErrorCode, string> {
            var map = __init(new System.Collections.Generic.Dictionary<ErrorCode, string>(), {});
            return System.Collections.Immutable.ImmutableDictionary.ToImmutableDictionary(map);
        }
        private static CreateCategoriesMap(): System.Collections.Immutable.ImmutableDictionary<ErrorCode, string> {
            var map = __init(new System.Collections.Generic.Dictionary<ErrorCode, string>(), {});
            return System.Collections.Immutable.ImmutableDictionary.ToImmutableDictionary(map);
        }
        public static GetSeverity(code: ErrorCode): DiagnosticSeverity {
            if (code == ErrorCode.Void) {
                return InternalDiagnosticSeverity.Void;
            }
            else if (code == ErrorCode.Unknown) {
                return InternalDiagnosticSeverity.Unknown;
            }
            else if (ErrorFacts.IsWarning(code)) {
                return DiagnosticSeverity.Warning;
            }
            else if (ErrorFacts.IsInfo(code)) {
                return DiagnosticSeverity.Info;
            }
            else if (ErrorFacts.IsHidden(code)) {
                return DiagnosticSeverity.Hidden;
            }
            else {
                return DiagnosticSeverity.Error;
            }
        }
        public static GetMessage_1340(code: MessageID, culture: System.Globalization.CultureInfo): string {
            var message: string = ErrorFacts.ResourceManager.GetString(code.ToString(), culture);
            System.Diagnostics.Debug.Assert(!System.String.IsNullOrEmpty(message));
            return message;
        }
        public static GetMessage_1431(code: ErrorCode, culture: System.Globalization.CultureInfo): string {
            var message: string = ErrorFacts.ResourceManager.GetString(ErrorCode[code], culture);
            System.Diagnostics.Debug.Assert(message != null);
            return message;
        }
        public static GetMessageFormat(code: ErrorCode): LocalizableResourceString {
            return new LocalizableResourceString().ctor_1830(code.ToString(), ErrorFacts.ResourceManager,/*typeof*/<any>ErrorFacts);
        }
        public static GetTitle(code: ErrorCode): LocalizableResourceString {
            return new LocalizableResourceString().ctor_1830(code.ToString() + ErrorFacts.TitleSuffix, ErrorFacts.ResourceManager,/*typeof*/<any>ErrorFacts);
        }
        public static GetDescription(code: ErrorCode): LocalizableResourceString {
            return new LocalizableResourceString().ctor_1830(code.ToString() + ErrorFacts.DescriptionSuffix, ErrorFacts.ResourceManager,/*typeof*/<any>ErrorFacts);
        }
        public static GetHelpLink(code: ErrorCode): string {
            var helpLink: string;
            var helpLink_ref0 = { refObj: helpLink };
            var ret_val__424 = ErrorFacts.helpLinksMap.Value.TryGetValue(code, helpLink_ref0);

            helpLink = helpLink_ref0.refObj;
            if (ret_val__424) {
                return helpLink;
            }
            return System.String.Empty;
        }
        public static GetCategory(code: ErrorCode): string {
            var category: string;
            var category_ref0 = { refObj: category };
            var ret_val__15 = ErrorFacts.categoriesMap.Value.TryGetValue(code, category_ref0);

            category = category_ref0.refObj;
            if (ret_val__15) {
                return category;
            }
            return Diagnostic.CompilerDiagnosticCategory;
        }
        public static GetMessage_1609(id: XmlParseErrorCode, culture: System.Globalization.CultureInfo): string {
            return ErrorFacts.ResourceManager.GetString(id.ToString(), culture);
        }
        private static resourceManager: System.Resources.ResourceManager;
        private static get ResourceManager(): System.Resources.ResourceManager {
            if (ErrorFacts.resourceManager == null) {
                //ErrorFacts.resourceManager = new System.Resources.ResourceManager("Microsoft.CodeAnalysis.CSharp.CSharpResources",
                //    System.Reflection.IntrospectionExtensions.GetTypeInfo(/*typeof*/ErrorCode).Assembly);
                ErrorFacts.resourceManager =
                new System.Resources.ResourceManager("Microsoft.CodeAnalysis.CSharp.CSharpResources", CSharpResources);
            }
            return ErrorFacts.resourceManager;
        }
        public static GetWarningLevel(code: ErrorCode): number {
            if (ErrorFacts.IsInfo(code) || ErrorFacts.IsHidden(code)) {
                return Diagnostic.HighestValidWarningLevel;
            }
            switch (code) {
                case ErrorCode.WRN_OldWarning_AccessibleReadonly:
                case ErrorCode.WRN_OldWarning_DocFileGenAndIncr:
                case ErrorCode.WRN_OldWarning_FeatureDefaultDeprecated:
                case ErrorCode.WRN_OldWarning_MultipleTypeDefs:
                case ErrorCode.WRN_OldWarning_ProtectedInternal:
                case ErrorCode.WRN_OldWarning_ReservedIdentifier:
                case ErrorCode.WRN_OldWarning_UnsafeProp:
                    return 4;
                case ErrorCode.WRN_InvalidMainSig:
                case ErrorCode.WRN_LowercaseEllSuffix:
                case ErrorCode.WRN_NewNotRequired:
                case ErrorCode.WRN_MainCantBeGeneric:
                case ErrorCode.WRN_IncrSwitchObsolete:
                case ErrorCode.WRN_UnreachableExpr:
                case ErrorCode.WRN_ProtectedInSealed:
                case ErrorCode.WRN_UnassignedInternalField:
                case ErrorCode.WRN_MissingParamTag:
                case ErrorCode.WRN_MissingXMLComment:
                case ErrorCode.WRN_DeleteAutoResFailed:
                case ErrorCode.WRN_MissingTypeParamTag:
                case ErrorCode.WRN_InvalidVersionFormat:
                    return 4;
                case ErrorCode.WRN_UnreferencedEvent:
                case ErrorCode.WRN_DuplicateUsing:
                case ErrorCode.WRN_UnreferencedVar:
                case ErrorCode.WRN_UnreferencedField:
                case ErrorCode.WRN_UnreferencedVarAssg:
                case ErrorCode.WRN_SequentialOnPartialClass:
                case ErrorCode.WRN_UnreferencedFieldAssg:
                case ErrorCode.WRN_AmbiguousXMLReference:
                case ErrorCode.WRN_PossibleMistakenNullStatement:
                case ErrorCode.WRN_EqualsWithoutGetHashCode:
                case ErrorCode.WRN_EqualityOpWithoutEquals:
                case ErrorCode.WRN_EqualityOpWithoutGetHashCode:
                case ErrorCode.WRN_IncorrectBooleanAssg:
                case ErrorCode.WRN_BitwiseOrSignExtend:
                case ErrorCode.WRN_TypeParameterSameAsOuterTypeParameter:
                case ErrorCode.WRN_InvalidAssemblyName:
                case ErrorCode.WRN_UnifyReferenceBldRev:
                case ErrorCode.WRN_AssignmentToSelf:
                case ErrorCode.WRN_ComparisonToSelf:
                case ErrorCode.WRN_IsDynamicIsConfusing:
                case ErrorCode.WRN_DebugFullNameTooLong:
                case ErrorCode.WRN_PdbLocalNameTooLong:
                    return 3;
                case ErrorCode.WRN_NewRequired:
                case ErrorCode.WRN_NewOrOverrideExpected:
                case ErrorCode.WRN_UnreachableCode:
                case ErrorCode.WRN_UnreferencedLabel:
                case ErrorCode.WRN_NegativeArrayIndex:
                case ErrorCode.WRN_BadRefCompareLeft:
                case ErrorCode.WRN_BadRefCompareRight:
                case ErrorCode.WRN_PatternIsAmbiguous:
                case ErrorCode.WRN_PatternStaticOrInaccessible:
                case ErrorCode.WRN_PatternBadSignature:
                case ErrorCode.WRN_SameFullNameThisNsAgg:
                case ErrorCode.WRN_SameFullNameThisAggAgg:
                case ErrorCode.WRN_SameFullNameThisAggNs:
                case ErrorCode.WRN_GlobalAliasDefn:
                case ErrorCode.WRN_UnexpectedPredefTypeLoc:
                case ErrorCode.WRN_AlwaysNull:
                case ErrorCode.WRN_CmpAlwaysFalse:
                case ErrorCode.WRN_AmbigLookupMeth:
                case ErrorCode.WRN_GotoCaseShouldConvert:
                case ErrorCode.WRN_NubExprIsConstBool:
                case ErrorCode.WRN_NubExprIsConstBool2:
                case ErrorCode.WRN_ExplicitImplCollision:
                case ErrorCode.WRN_DeprecatedSymbolStr:
                case ErrorCode.WRN_VacuousIntegralComp:
                case ErrorCode.WRN_AssignmentToLockOrDispose:
                case ErrorCode.WRN_DeprecatedCollectionInitAddStr:
                case ErrorCode.WRN_DeprecatedCollectionInitAdd:
                case ErrorCode.WRN_DuplicateParamTag:
                case ErrorCode.WRN_UnmatchedParamTag:
                case ErrorCode.WRN_UnprocessedXMLComment:
                case ErrorCode.WRN_InvalidSearchPathDir:
                case ErrorCode.WRN_AssumedMatchThis:
                case ErrorCode.WRN_UnifyReferenceMajMin:
                case ErrorCode.WRN_DuplicateTypeParamTag:
                case ErrorCode.WRN_UnmatchedTypeParamTag:
                case ErrorCode.WRN_UnmatchedParamRefTag:
                case ErrorCode.WRN_UnmatchedTypeParamRefTag:
                case ErrorCode.WRN_CantHaveManifestForModule:
                case ErrorCode.WRN_DynamicDispatchToConditionalMethod:
                case ErrorCode.WRN_NoSources:
                case ErrorCode.WRN_CLS_MeaninglessOnPrivateType:
                case ErrorCode.WRN_CLS_AssemblyNotCLS2:
                case ErrorCode.WRN_MainIgnored:
                case ErrorCode.WRN_UnqualifiedNestedTypeInCref:
                case ErrorCode.WRN_NoRuntimeMetadataVersion:
                    return 2;
                case ErrorCode.WRN_IsAlwaysTrue:
                case ErrorCode.WRN_IsAlwaysFalse:
                case ErrorCode.WRN_ByRefNonAgileField:
                case ErrorCode.WRN_VolatileByRef:
                case ErrorCode.WRN_FinalizeMethod:
                case ErrorCode.WRN_FeatureDeprecated:
                case ErrorCode.WRN_DeprecatedSymbol:
                case ErrorCode.WRN_ExternMethodNoImplementation:
                case ErrorCode.WRN_AttributeLocationOnBadDeclaration:
                case ErrorCode.WRN_InvalidAttributeLocation:
                case ErrorCode.WRN_NonObsoleteOverridingObsolete:
                case ErrorCode.WRN_CoClassWithoutComImport:
                case ErrorCode.WRN_ObsoleteOverridingNonObsolete:
                case ErrorCode.WRN_ExternCtorNoImplementation:
                case ErrorCode.WRN_WarningDirective:
                case ErrorCode.WRN_UnreachableGeneralCatch:
                case ErrorCode.WRN_UninitializedField:
                case ErrorCode.WRN_DefaultValueForUnconsumedLocation:
                case ErrorCode.WRN_FeatureDeprecated2:
                case ErrorCode.WRN_FeatureDeprecated3:
                case ErrorCode.WRN_FeatureDeprecated4:
                case ErrorCode.WRN_FeatureDeprecated5:
                case ErrorCode.WRN_EmptySwitch:
                case ErrorCode.WRN_XMLParseError:
                case ErrorCode.WRN_BadXMLRef:
                case ErrorCode.WRN_BadXMLRefParamType:
                case ErrorCode.WRN_BadXMLRefReturnType:
                case ErrorCode.WRN_BadXMLRefSyntax:
                case ErrorCode.WRN_FailedInclude:
                case ErrorCode.WRN_InvalidInclude:
                case ErrorCode.WRN_XMLParseIncludeError:
                case ErrorCode.WRN_XMLParserNotFound:
                case ErrorCode.WRN_ALinkWarn:
                case ErrorCode.WRN_AssemblyAttributeFromModuleIsOverridden:
                case ErrorCode.WRN_CmdOptionConflictsSource:
                case ErrorCode.WRN_IllegalPragma:
                case ErrorCode.WRN_IllegalPPWarning:
                case ErrorCode.WRN_BadRestoreNumber:
                case ErrorCode.WRN_NonECMAFeature:
                case ErrorCode.WRN_ErrorOverride:
                case ErrorCode.WRN_MissingTypeNested:
                case ErrorCode.WRN_MissingTypeInSource:
                case ErrorCode.WRN_MissingTypeInAssembly:
                case ErrorCode.WRN_MultiplePredefTypes:
                case ErrorCode.WRN_TooManyLinesForDebugger:
                case ErrorCode.WRN_CallOnNonAgileField:
                case ErrorCode.WRN_BadWarningNumber:
                case ErrorCode.WRN_InvalidNumber:
                case ErrorCode.WRN_FileNameTooLong:
                case ErrorCode.WRN_IllegalPPChecksum:
                case ErrorCode.WRN_EndOfPPLineExpected:
                case ErrorCode.WRN_ConflictingChecksum:
                case ErrorCode.WRN_UseSwitchInsteadOfAttribute:
                case ErrorCode.WRN_DelegateNewMethBind:
                case ErrorCode.WRN_EmptyFileName:
                case ErrorCode.WRN_DotOnDefault:
                case ErrorCode.WRN_BadXMLRefTypeVar:
                case ErrorCode.WRN_ReferencedAssemblyReferencesLinkedPIA:
                case ErrorCode.WRN_TypeNotFoundForNoPIAWarning:
                case ErrorCode.WRN_MultipleRuntimeImplementationMatches:
                case ErrorCode.WRN_MultipleRuntimeOverrideMatches:
                case ErrorCode.WRN_FileAlreadyIncluded:
                case ErrorCode.WRN_UseNewSwitch:
                case ErrorCode.WRN_NoConfigNotOnCommandLine:
                case ErrorCode.WRN_AnalyzerCannotBeCreated:
                case ErrorCode.WRN_NoAnalyzerInAssembly:
                case ErrorCode.WRN_UnableToLoadAnalyzer:
                case ErrorCode.WRN_DefineIdentifierRequired:
                case ErrorCode.WRN_CLS_NoVarArgs:
                case ErrorCode.WRN_CLS_BadArgType:
                case ErrorCode.WRN_CLS_BadReturnType:
                case ErrorCode.WRN_CLS_BadFieldPropType:
                case ErrorCode.WRN_CLS_BadUnicode:
                case ErrorCode.WRN_CLS_BadIdentifierCase:
                case ErrorCode.WRN_CLS_OverloadRefOut:
                case ErrorCode.WRN_CLS_OverloadUnnamed:
                case ErrorCode.WRN_CLS_BadIdentifier:
                case ErrorCode.WRN_CLS_BadBase:
                case ErrorCode.WRN_CLS_BadInterfaceMember:
                case ErrorCode.WRN_CLS_NoAbstractMembers:
                case ErrorCode.WRN_CLS_NotOnModules:
                case ErrorCode.WRN_CLS_ModuleMissingCLS:
                case ErrorCode.WRN_CLS_AssemblyNotCLS:
                case ErrorCode.WRN_CLS_BadAttributeType:
                case ErrorCode.WRN_CLS_ArrayArgumentToAttribute:
                case ErrorCode.WRN_CLS_NotOnModules2:
                case ErrorCode.WRN_CLS_IllegalTrueInFalse:
                case ErrorCode.WRN_CLS_MeaninglessOnParam:
                case ErrorCode.WRN_CLS_MeaninglessOnReturn:
                case ErrorCode.WRN_CLS_BadTypeVar:
                case ErrorCode.WRN_CLS_VolatileField:
                case ErrorCode.WRN_CLS_BadInterface:
                case ErrorCode.WRN_UnobservedAwaitableExpression:
                case ErrorCode.WRN_CallerLineNumberParamForUnconsumedLocation:
                case ErrorCode.WRN_CallerFilePathParamForUnconsumedLocation:
                case ErrorCode.WRN_CallerMemberNameParamForUnconsumedLocation:
                case ErrorCode.WRN_CallerFilePathPreferredOverCallerMemberName:
                case ErrorCode.WRN_CallerLineNumberPreferredOverCallerMemberName:
                case ErrorCode.WRN_CallerLineNumberPreferredOverCallerFilePath:
                case ErrorCode.WRN_DelaySignButNoKey:
                case ErrorCode.WRN_UnimplementedCommandLineSwitch:
                case ErrorCode.WRN_AsyncLacksAwaits:
                case ErrorCode.WRN_BadUILang:
                case ErrorCode.WRN_RefCultureMismatch:
                case ErrorCode.WRN_ConflictingMachineAssembly:
                case ErrorCode.WRN_FilterIsConstant:
                case ErrorCode.WRN_IdentifierOrNumericLiteralExpected:
                case ErrorCode.WRN_ReferencedAssemblyDoesNotHaveStrongName:
                    return 1;
                default:
                    return 0;
            }
        }
        public static PreventsSuccessfulDelegateConversion_1298(code: ErrorCode): boolean {
            if (code == ErrorCode.Void || code == ErrorCode.Unknown) {
                return false;
            }
            if (ErrorFacts.IsWarning(code)) {
                return false;
            }
            switch (code) {
                case ErrorCode.ERR_DuplicateParamName:
                case ErrorCode.ERR_LocalDuplicate:
                case ErrorCode.ERR_LocalIllegallyOverrides:
                case ErrorCode.ERR_LocalSameNameAsTypeParam:
                case ErrorCode.ERR_QueryRangeVariableOverrides:
                case ErrorCode.ERR_QueryRangeVariableSameAsTypeParam:
                case ErrorCode.ERR_DeprecatedCollectionInitAddStr:
                case ErrorCode.ERR_DeprecatedSymbolStr:
                    return false;
                default:
                    return true;
            }
        }
        public static PreventsSuccessfulDelegateConversion_1946(diagnostics: DiagnosticBag): boolean {
            // for each
            var diagEnumerator = diagnostics.AsEnumerable().GetEnumerator();
            try {
                while (diagEnumerator.MoveNext()) {
                    var diag = diagEnumerator.Current;
                    // foreach block
                    if (ErrorFacts.PreventsSuccessfulDelegateConversion_1298(<ErrorCode>diag.Code)) {
                        return true;
                    }
                }
            } finally {
                if (diagEnumerator !== null) diagEnumerator.Dispose();

            }    
            // end foreach
            return false;
        }
        public static PreventsSuccessfulDelegateConversion_1840(diagnostics: System.Collections.Immutable.ImmutableArray<Diagnostic>): boolean {
            // for each
            var diagEnumerator = diagnostics.GetEnumerator();
            try {
                while (diagEnumerator.MoveNext()) {
                    var diag = diagEnumerator.Current;
                    // foreach block
                    if (ErrorFacts.PreventsSuccessfulDelegateConversion_1298(<ErrorCode>diag.Code)) {
                        return true;
                    }
                }
            } finally {
                if (diagEnumerator !== null) diagEnumerator.Dispose();

            }    
            // end foreach
            return false;
        }


        public static IsWarning(code: ErrorCode): boolean {
            switch (code) {
                case ErrorCode.WRN_InvalidMainSig:
                case ErrorCode.WRN_UnreferencedEvent:
                case ErrorCode.WRN_LowercaseEllSuffix:
                case ErrorCode.WRN_DuplicateUsing:
                case ErrorCode.WRN_NewRequired:
                case ErrorCode.WRN_NewNotRequired:
                case ErrorCode.WRN_NewOrOverrideExpected:
                case ErrorCode.WRN_UnreachableCode:
                case ErrorCode.WRN_UnreferencedLabel:
                case ErrorCode.WRN_UnreferencedVar:
                case ErrorCode.WRN_UnreferencedField:
                case ErrorCode.WRN_IsAlwaysTrue:
                case ErrorCode.WRN_IsAlwaysFalse:
                case ErrorCode.WRN_ByRefNonAgileField:
                case ErrorCode.WRN_OldWarning_UnsafeProp:
                case ErrorCode.WRN_UnreferencedVarAssg:
                case ErrorCode.WRN_NegativeArrayIndex:
                case ErrorCode.WRN_BadRefCompareLeft:
                case ErrorCode.WRN_BadRefCompareRight:
                case ErrorCode.WRN_PatternIsAmbiguous:
                case ErrorCode.WRN_PatternStaticOrInaccessible:
                case ErrorCode.WRN_PatternBadSignature:
                case ErrorCode.WRN_SequentialOnPartialClass:
                case ErrorCode.WRN_MainCantBeGeneric:
                case ErrorCode.WRN_UnreferencedFieldAssg:
                case ErrorCode.WRN_AmbiguousXMLReference:
                case ErrorCode.WRN_VolatileByRef:
                case ErrorCode.WRN_IncrSwitchObsolete:
                case ErrorCode.WRN_UnreachableExpr:
                case ErrorCode.WRN_SameFullNameThisNsAgg:
                case ErrorCode.WRN_SameFullNameThisAggAgg:
                case ErrorCode.WRN_SameFullNameThisAggNs:
                case ErrorCode.WRN_GlobalAliasDefn:
                case ErrorCode.WRN_UnexpectedPredefTypeLoc:
                case ErrorCode.WRN_AlwaysNull:
                case ErrorCode.WRN_CmpAlwaysFalse:
                case ErrorCode.WRN_FinalizeMethod:
                case ErrorCode.WRN_AmbigLookupMeth:
                case ErrorCode.WRN_GotoCaseShouldConvert:
                case ErrorCode.WRN_NubExprIsConstBool:
                case ErrorCode.WRN_ExplicitImplCollision:
                case ErrorCode.WRN_FeatureDeprecated:
                case ErrorCode.WRN_DeprecatedSymbol:
                case ErrorCode.WRN_DeprecatedSymbolStr:
                case ErrorCode.WRN_ExternMethodNoImplementation:
                case ErrorCode.WRN_ProtectedInSealed:
                case ErrorCode.WRN_PossibleMistakenNullStatement:
                case ErrorCode.WRN_UnassignedInternalField:
                case ErrorCode.WRN_VacuousIntegralComp:
                case ErrorCode.WRN_AttributeLocationOnBadDeclaration:
                case ErrorCode.WRN_InvalidAttributeLocation:
                case ErrorCode.WRN_EqualsWithoutGetHashCode:
                case ErrorCode.WRN_EqualityOpWithoutEquals:
                case ErrorCode.WRN_EqualityOpWithoutGetHashCode:
                case ErrorCode.WRN_IncorrectBooleanAssg:
                case ErrorCode.WRN_NonObsoleteOverridingObsolete:
                case ErrorCode.WRN_BitwiseOrSignExtend:
                case ErrorCode.WRN_OldWarning_ProtectedInternal:
                case ErrorCode.WRN_OldWarning_AccessibleReadonly:
                case ErrorCode.WRN_CoClassWithoutComImport:
                case ErrorCode.WRN_TypeParameterSameAsOuterTypeParameter:
                case ErrorCode.WRN_AssignmentToLockOrDispose:
                case ErrorCode.WRN_ObsoleteOverridingNonObsolete:
                case ErrorCode.WRN_DebugFullNameTooLong:
                case ErrorCode.WRN_ExternCtorNoImplementation:
                case ErrorCode.WRN_WarningDirective:
                case ErrorCode.WRN_UnreachableGeneralCatch:
                case ErrorCode.WRN_UninitializedField:
                case ErrorCode.WRN_DeprecatedCollectionInitAddStr:
                case ErrorCode.WRN_DeprecatedCollectionInitAdd:
                case ErrorCode.WRN_DefaultValueForUnconsumedLocation:
                case ErrorCode.WRN_IdentifierOrNumericLiteralExpected:
                case ErrorCode.WRN_FeatureDeprecated2:
                case ErrorCode.WRN_FeatureDeprecated3:
                case ErrorCode.WRN_FeatureDeprecated4:
                case ErrorCode.WRN_FeatureDeprecated5:
                case ErrorCode.WRN_OldWarning_FeatureDefaultDeprecated:
                case ErrorCode.WRN_EmptySwitch:
                case ErrorCode.WRN_XMLParseError:
                case ErrorCode.WRN_DuplicateParamTag:
                case ErrorCode.WRN_UnmatchedParamTag:
                case ErrorCode.WRN_MissingParamTag:
                case ErrorCode.WRN_BadXMLRef:
                case ErrorCode.WRN_BadXMLRefParamType:
                case ErrorCode.WRN_BadXMLRefReturnType:
                case ErrorCode.WRN_BadXMLRefSyntax:
                case ErrorCode.WRN_UnprocessedXMLComment:
                case ErrorCode.WRN_FailedInclude:
                case ErrorCode.WRN_InvalidInclude:
                case ErrorCode.WRN_MissingXMLComment:
                case ErrorCode.WRN_XMLParseIncludeError:
                case ErrorCode.WRN_OldWarning_MultipleTypeDefs:
                case ErrorCode.WRN_OldWarning_DocFileGenAndIncr:
                case ErrorCode.WRN_XMLParserNotFound:
                case ErrorCode.WRN_ALinkWarn:
                case ErrorCode.WRN_DeleteAutoResFailed:
                case ErrorCode.WRN_CmdOptionConflictsSource:
                case ErrorCode.WRN_IllegalPragma:
                case ErrorCode.WRN_IllegalPPWarning:
                case ErrorCode.WRN_BadRestoreNumber:
                case ErrorCode.WRN_NonECMAFeature:
                case ErrorCode.WRN_ErrorOverride:
                case ErrorCode.WRN_OldWarning_ReservedIdentifier:
                case ErrorCode.WRN_InvalidSearchPathDir:
                case ErrorCode.WRN_MissingTypeNested:
                case ErrorCode.WRN_MissingTypeInSource:
                case ErrorCode.WRN_MissingTypeInAssembly:
                case ErrorCode.WRN_MultiplePredefTypes:
                case ErrorCode.WRN_TooManyLinesForDebugger:
                case ErrorCode.WRN_CallOnNonAgileField:
                case ErrorCode.WRN_BadWarningNumber:
                case ErrorCode.WRN_InvalidNumber:
                case ErrorCode.WRN_FileNameTooLong:
                case ErrorCode.WRN_IllegalPPChecksum:
                case ErrorCode.WRN_EndOfPPLineExpected:
                case ErrorCode.WRN_ConflictingChecksum:
                case ErrorCode.WRN_AssumedMatchThis:
                case ErrorCode.WRN_UseSwitchInsteadOfAttribute:
                case ErrorCode.WRN_InvalidAssemblyName:
                case ErrorCode.WRN_UnifyReferenceMajMin:
                case ErrorCode.WRN_UnifyReferenceBldRev:
                case ErrorCode.WRN_DelegateNewMethBind:
                case ErrorCode.WRN_EmptyFileName:
                case ErrorCode.WRN_DuplicateTypeParamTag:
                case ErrorCode.WRN_UnmatchedTypeParamTag:
                case ErrorCode.WRN_MissingTypeParamTag:
                case ErrorCode.WRN_AssignmentToSelf:
                case ErrorCode.WRN_ComparisonToSelf:
                case ErrorCode.WRN_DotOnDefault:
                case ErrorCode.WRN_BadXMLRefTypeVar:
                case ErrorCode.WRN_UnmatchedParamRefTag:
                case ErrorCode.WRN_UnmatchedTypeParamRefTag:
                case ErrorCode.WRN_ReferencedAssemblyReferencesLinkedPIA:
                case ErrorCode.WRN_TypeNotFoundForNoPIAWarning:
                case ErrorCode.WRN_CantHaveManifestForModule:
                case ErrorCode.WRN_MultipleRuntimeImplementationMatches:
                case ErrorCode.WRN_MultipleRuntimeOverrideMatches:
                case ErrorCode.WRN_DynamicDispatchToConditionalMethod:
                case ErrorCode.WRN_IsDynamicIsConfusing:
                case ErrorCode.WRN_AsyncLacksAwaits:
                case ErrorCode.WRN_FileAlreadyIncluded:
                case ErrorCode.WRN_NoSources:
                case ErrorCode.WRN_UseNewSwitch:
                case ErrorCode.WRN_NoConfigNotOnCommandLine:
                case ErrorCode.WRN_DefineIdentifierRequired:
                case ErrorCode.WRN_BadUILang:
                case ErrorCode.WRN_CLS_NoVarArgs:
                case ErrorCode.WRN_CLS_BadArgType:
                case ErrorCode.WRN_CLS_BadReturnType:
                case ErrorCode.WRN_CLS_BadFieldPropType:
                case ErrorCode.WRN_CLS_BadUnicode:
                case ErrorCode.WRN_CLS_BadIdentifierCase:
                case ErrorCode.WRN_CLS_OverloadRefOut:
                case ErrorCode.WRN_CLS_OverloadUnnamed:
                case ErrorCode.WRN_CLS_BadIdentifier:
                case ErrorCode.WRN_CLS_BadBase:
                case ErrorCode.WRN_CLS_BadInterfaceMember:
                case ErrorCode.WRN_CLS_NoAbstractMembers:
                case ErrorCode.WRN_CLS_NotOnModules:
                case ErrorCode.WRN_CLS_ModuleMissingCLS:
                case ErrorCode.WRN_CLS_AssemblyNotCLS:
                case ErrorCode.WRN_CLS_BadAttributeType:
                case ErrorCode.WRN_CLS_ArrayArgumentToAttribute:
                case ErrorCode.WRN_CLS_NotOnModules2:
                case ErrorCode.WRN_CLS_IllegalTrueInFalse:
                case ErrorCode.WRN_CLS_MeaninglessOnPrivateType:
                case ErrorCode.WRN_CLS_AssemblyNotCLS2:
                case ErrorCode.WRN_CLS_MeaninglessOnParam:
                case ErrorCode.WRN_CLS_MeaninglessOnReturn:
                case ErrorCode.WRN_CLS_BadTypeVar:
                case ErrorCode.WRN_CLS_VolatileField:
                case ErrorCode.WRN_CLS_BadInterface:
                case ErrorCode.WRN_UnobservedAwaitableExpression:
                case ErrorCode.WRN_CallerLineNumberParamForUnconsumedLocation:
                case ErrorCode.WRN_CallerFilePathParamForUnconsumedLocation:
                case ErrorCode.WRN_CallerMemberNameParamForUnconsumedLocation:
                case ErrorCode.WRN_MainIgnored:
                case ErrorCode.WRN_DelaySignButNoKey:
                case ErrorCode.WRN_InvalidVersionFormat:
                case ErrorCode.WRN_CallerFilePathPreferredOverCallerMemberName:
                case ErrorCode.WRN_CallerLineNumberPreferredOverCallerMemberName:
                case ErrorCode.WRN_CallerLineNumberPreferredOverCallerFilePath:
                case ErrorCode.WRN_AssemblyAttributeFromModuleIsOverridden:
                case ErrorCode.WRN_FilterIsConstant:
                case ErrorCode.WRN_UnimplementedCommandLineSwitch:
                case ErrorCode.WRN_ReferencedAssemblyDoesNotHaveStrongName:
                case ErrorCode.WRN_RefCultureMismatch:
                case ErrorCode.WRN_ConflictingMachineAssembly:
                case ErrorCode.WRN_UnqualifiedNestedTypeInCref:
                case ErrorCode.WRN_NoRuntimeMetadataVersion:
                case ErrorCode.WRN_PdbLocalNameTooLong:
                case ErrorCode.WRN_AnalyzerCannotBeCreated:
                case ErrorCode.WRN_NoAnalyzerInAssembly:
                case ErrorCode.WRN_UnableToLoadAnalyzer:
                case ErrorCode.WRN_NubExprIsConstBool2:
                    return true;
                default:
                    return false;
            }
        }
        public static IsFatal(code: ErrorCode): boolean {
            switch (code) {
                case ErrorCode.FTL_MetadataCantOpenFile:
                case ErrorCode.FTL_DebugEmitFailure:
                case ErrorCode.FTL_BadCodepage:
                case ErrorCode.FTL_InvalidTarget:
                case ErrorCode.FTL_InputFileNameTooLong:
                case ErrorCode.FTL_OutputFileExists:
                case ErrorCode.FTL_BadChecksumAlgorithm:
                    return true;
                default:
                    return false;
            }
        }
        public static IsInfo(code: ErrorCode): boolean {
            switch (code) {
                case ErrorCode.INF_UnableToLoadSomeTypesInAnalyzer:
                    return true;
                default:
                    return false;
            }
        }
        public static IsHidden(code: ErrorCode): boolean {
            switch (code) {
                case ErrorCode.HDN_UnusedUsingDirective:
                case ErrorCode.HDN_UnusedExternAlias:
                    return true;
                default:
                    return false;
            }
        } 
    }
}