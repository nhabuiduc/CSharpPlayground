///<reference path="WellKnownDiagnosticTags.ts"/>
module Microsoft.CodeAnalysis {
    export class DiagnosticInfo implements System.IFormattable, Roslyn.Utilities.IObjectWritable, Roslyn.Utilities.IObjectReadable, IMessageSerializable {
        private messageProvider: CommonMessageProvider;
        private errorCode: number = 0;
        private defaultSeverity: DiagnosticSeverity = 0;
        private effectiveSeverity: DiagnosticSeverity = 0;
        private arguments: Object[];
        private static errorCodeToDescriptorMap: System.Collections.Immutable.ImmutableDictionary<number, DiagnosticDescriptor> = System.Collections.Immutable.ImmutableDictionary.Empty;
        private static CompilerErrorCustomTags: System.Collections.Immutable.ImmutableArray<string> = System.Collections.Immutable.ImmutableArray.Create(WellKnownDiagnosticTags.Telemetry, WellKnownDiagnosticTags.NotConfigurable);
        private static CompilerNonErrorCustomTags: System.Collections.Immutable.ImmutableArray<string> = System.Collections.Immutable.ImmutableArray.Create(WellKnownDiagnosticTags.Telemetry);
        ctor_9510(messageProvider: CommonMessageProvider, errorCode: number): DiagnosticInfo {
            this.messageProvider = messageProvider;
            this.errorCode = errorCode;
            this.defaultSeverity = messageProvider.GetSeverity(errorCode);
            this.effectiveSeverity = this.defaultSeverity;
            return this;
        }
        ctor_4145(messageProvider: CommonMessageProvider, errorCode: number, ...argumentsRest: Object[]): DiagnosticInfo {
            this.ctor_9510(messageProvider, errorCode);
            DiagnosticInfo.AssertMessageSerializable(argumentsRest);
            this.arguments = argumentsRest;
            return this;
        }
        ctor_1200(original: DiagnosticInfo, overridenSeverity: DiagnosticSeverity): DiagnosticInfo {
            this.messageProvider = original.MessageProvider;
            this.errorCode = original.errorCode;
            this.defaultSeverity = original.DefaultSeverity;
            this.arguments = original.arguments;
            this.effectiveSeverity = overridenSeverity;
            return this;
        }
        public static GetDescriptor(errorCode: number, messageProvider: CommonMessageProvider): DiagnosticDescriptor {
            var defaultSeverity = messageProvider.GetSeverity(errorCode);
            return DiagnosticInfo.GetOrCreateDescriptor(errorCode, defaultSeverity, messageProvider);
        }
        private static GetOrCreateDescriptor(errorCode: number, defaultSeverity: DiagnosticSeverity, messageProvider: CommonMessageProvider): DiagnosticDescriptor {
            var value: { refObj: DiagnosticDescriptor } = { refObj : null };
            if (DiagnosticInfo.errorCodeToDescriptorMap.TryGetValue(errorCode, value)) {
                return value.refObj;
            }

            value.refObj = DiagnosticInfo.CreateDescriptor(errorCode, defaultSeverity, messageProvider);
            DiagnosticInfo.errorCodeToDescriptorMap.SetItem(errorCode, value.refObj);
            return value.refObj;
            //var errorCodeToDescriptorMap_ref0 = { refObj: DiagnosticInfo.errorCodeToDescriptorMap };
            //var ret_val__224 = System.Collections.Immutable.ImmutableInterlocked.GetOrAdd(
            //    errorCodeToDescriptorMap_ref0,
            //    errorCode,
            //    code => DiagnosticInfo.CreateDescriptor(code, defaultSeverity, messageProvider));

            //DiagnosticInfo.errorCodeToDescriptorMap = errorCodeToDescriptorMap_ref0.refObj;
            //return ret_val__224;
        }
        private static CreateDescriptor(errorCode: number, defaultSeverity: DiagnosticSeverity, messageProvider: CommonMessageProvider): DiagnosticDescriptor {
            var id = messageProvider.GetIdForErrorCode(errorCode);
            var title = messageProvider.GetTitle(errorCode);
            var description = messageProvider.GetDescription(errorCode);
            var messageFormat = messageProvider.GetMessageFormat(errorCode);
            var helpLink = messageProvider.GetHelpLink(errorCode);
            var category = messageProvider.GetCategory(errorCode);
            var customTags = DiagnosticInfo.GetCustomTags(defaultSeverity);
            return new DiagnosticDescriptor().ctor_3991(id, title, messageFormat, category, defaultSeverity,/*isEnabledByDefault:*/true,/*description:*/description,/*helpLink:*/helpLink,/*customTags:*/customTags);
        }
        public static AssertMessageSerializable(args: Object[]): void {
            // for each
            var argEnumerator = args.GetEnumerator();

            while (argEnumerator.MoveNext()) {
                var arg = argEnumerator.Current;
                // foreach block
                System.Diagnostics.Debug.Assert(arg != null);
                //if (arg instanceof IMessageSerializable) {
                //    continue;
                //}
                //var type = arg.GetType();
                //var info = System.Reflection.IntrospectionExtensions.GetTypeInfo(type);
                //if (info.IsPrimitive) {
                //    continue;
                //}
                //System.Diagnostics.Debug.Assert(false, "Unexpected type: " + type);
            }    
            // end foreach
        }
        ctor_6897(messageProvider: CommonMessageProvider, isWarningAsError: boolean, errorCode: number, ...argumentsRest: Object[]): DiagnosticInfo {
            this.ctor_4145(messageProvider, errorCode, argumentsRest);
            System.Diagnostics.Debug.Assert(!isWarningAsError || this.defaultSeverity == DiagnosticSeverity.Warning);
            if (isWarningAsError) {
                this.effectiveSeverity = DiagnosticSeverity.Error;
            }
            return this;
        }
        public GetInstanceWithSeverity(severity: DiagnosticSeverity): DiagnosticInfo {
            return new DiagnosticInfo().ctor_1200(this, severity);
        }
        //Roslyn.Utilities.IObjectWritable.WriteTo(writer: Roslyn.Utilities.ObjectWriter): void {
        //    this.WriteTo(writer);
        //}
        public WriteTo(writer: Roslyn.Utilities.ObjectWriter): void {
            writer.WriteValue(this.messageProvider);
            writer.WriteCompressedUInt(<number>this.errorCode);
            writer.WriteInt32(<number>this.effectiveSeverity);
            writer.WriteInt32(<number>this.defaultSeverity);
            var count: number = (this.arguments != null) ? this.arguments.length : 0;
            writer.WriteCompressedUInt(<number>count);
            if (count > 0) {
                // for each
                var argEnumerator = this.arguments.GetEnumerator();

                while (argEnumerator.MoveNext()) {
                    var arg = argEnumerator.Current;
                    // foreach block
                    writer.WriteString(__ToString( arg));
                }    
                // end foreach
            }
        }
        //Roslyn.Utilities.IObjectReadable.GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
        //    return this.GetReader();
        //}
        public  GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
            return (r) => new DiagnosticInfo().ctor_1156(r);
        }
        ctor_1156(reader: Roslyn.Utilities.ObjectReader): DiagnosticInfo {
            this.messageProvider = <CommonMessageProvider>reader.ReadValue();
            this.errorCode = <number>reader.ReadCompressedUInt();
            this.effectiveSeverity = <DiagnosticSeverity>reader.ReadInt32();
            this.defaultSeverity = <DiagnosticSeverity>reader.ReadInt32();
            var count = <number>reader.ReadCompressedUInt();
            if (count == 0) {
                this.arguments = Roslyn.Utilities.SpecializedCollections.EmptyObjects;
            }
            else if (count > 0) {
                this.arguments = new Array(count);
                for (var i: number = 0; i < count; i++) {
                    this.arguments[i] = reader.ReadString_7160();
                }
            }
            return this;
        }
        public get Code(): number {
            return this.errorCode;
        }
        public get Descriptor(): DiagnosticDescriptor {
            return DiagnosticInfo.GetOrCreateDescriptor(this.errorCode, this.defaultSeverity, this.messageProvider);
        }
        public get Severity(): DiagnosticSeverity {
            return this.effectiveSeverity;
        }
        public get DefaultSeverity(): DiagnosticSeverity {
            return this.defaultSeverity;
        }
        public get WarningLevel(): number {
            if (this.effectiveSeverity != this.defaultSeverity) {
                return Diagnostic.GetDefaultWarningLevel(this.effectiveSeverity);
            }
            return this.messageProvider.GetWarningLevel(this.errorCode);
        }
        public get IsWarningAsError(): boolean {
            return this.DefaultSeverity == DiagnosticSeverity.Warning && this.Severity == DiagnosticSeverity.Error;
        }
        public get Category(): string {
            return this.messageProvider.GetCategory(this.errorCode);
        }
        public get CustomTags(): System.Collections.Immutable.ImmutableArray<string> {
            return DiagnosticInfo.GetCustomTags(this.defaultSeverity);
        }
        private static GetCustomTags(defaultSeverity: DiagnosticSeverity): System.Collections.Immutable.ImmutableArray<string> {
            return defaultSeverity == DiagnosticSeverity.Error ? DiagnosticInfo.CompilerErrorCustomTags : DiagnosticInfo.CompilerNonErrorCustomTags;
        }
        public IsNotConfigurable(): boolean {
            return this.defaultSeverity == DiagnosticSeverity.Error;
        }
        public get AdditionalLocations(): System.Collections.Generic.IReadOnlyList<Location> {
            return Roslyn.Utilities.SpecializedCollections.EmptyReadOnlyList<Location>();
        }
        public get MessageIdentifier(): string {
            return this.messageProvider.GetIdForErrorCode(this.errorCode);
        }
        public GetMessage(formatProvider: System.IFormatProvider = null): string {
            var culture = __as__<System.Globalization.CultureInfo>(formatProvider, System.Globalization.CultureInfo);
            if (culture == null) {
                culture = System.Globalization.CultureInfo.InvariantCulture;
            }
            var message: string = this.messageProvider.LoadMessage(this.errorCode, culture);
            if (System.String.IsNullOrEmpty(message)) {
                return System.String.Empty;
            }
            if (this.arguments == null || this.arguments.length == 0) {
                return message;
            }
            return System.String.Format(formatProvider, message, this.GetArgumentsToUse(culture));
        }
        private GetArgumentsToUse(culture: System.Globalization.CultureInfo): Object[] {
            var argumentsToUse: Object[] = null;
            for (var i: number = 0; i < this.arguments.length; i++) {
                var embedded = __as__<DiagnosticInfo>(this.arguments[i], DiagnosticInfo);
                if (embedded != null) {
                    argumentsToUse = this.InitializeArgumentListIfNeeded(argumentsToUse);
                    argumentsToUse[i] = embedded.GetMessage(culture);
                    continue;
                }
            }
            return argumentsToUse != null ? argumentsToUse : this.arguments;
        }
        private InitializeArgumentListIfNeeded(argumentsToUse: Object[]): Object[] {
            if (argumentsToUse != null) {
                return argumentsToUse;
            }
            var newArguments = new Array(this.arguments.length);
            TSArray.Copy(this.arguments, newArguments, newArguments.length);
            return newArguments;
        }
        public get Arguments(): Object[] {
            return this.arguments;
        }
        public get MessageProvider(): CommonMessageProvider {
            return this.messageProvider;
        }
        //public ToString(): string {
        //    return this.ToString_1106(null);
        //}
        public ToString_1106(formatProvider: System.IFormatProvider): string {
            return (<System.IFormattable>this).ToString(null, formatProvider);
        }
        public ToString(format?: string, formatProvider?: System.IFormatProvider): string {

            return System.String.Format(formatProvider, "{0}: {1}", this.messageProvider.GetMessagePrefix(this.MessageIdentifier, this.Severity, this.IsWarningAsError, __as__<System.Globalization.CultureInfo>(formatProvider, System.Globalization.CultureInfo)), this.GetMessage(formatProvider));
        }
        public GetHashCode(): number {
            var hashCode: number = this.errorCode;
            if (this.arguments != null) {
                for (var i: number = 0; i < this.arguments.length; i++) {
                    hashCode = Roslyn.Utilities.Hash.Combine_7656(this.arguments[i], hashCode);
                }
            }
            return hashCode;
        }
        public Equals(obj: Object): boolean {
            var other: DiagnosticInfo = __as__<DiagnosticInfo>(obj, DiagnosticInfo);
            var result: boolean = false;
            if (other != null && other.errorCode == this.errorCode && __classOf(this) == __classOf(obj)) {
                if (this.arguments == null && other.arguments == null) {
                    result = true;
                }
                else if (this.arguments != null && other.arguments != null && this.arguments.length == other.arguments.length) {
                    result = true;
                    for (var i: number = 0; i < this.arguments.length; i++) {
                        if (this.arguments[i] != other.arguments[i]) {
                            result = false;
                            break;
                        }
                    }
                }
            }
            return result;
        }
        private GetDebuggerDisplay(): string {
            switch (this.Code) {
                case InternalErrorCode.Unknown:
                    return "Unresolved DiagnosticInfo";
                case InternalErrorCode.Void:
                    return "Void DiagnosticInfo";
                default:
                    return this.ToString();
            }
        }
        public GetResolvedInfo(): DiagnosticInfo {
            throw Roslyn.Utilities.ExceptionUtilities.Unreachable;
        }
        constructor() { }
    }
}