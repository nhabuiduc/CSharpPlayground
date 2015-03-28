module Microsoft.CodeAnalysis {
    export class DiagnosticFormatter {
        public Format(diagnostic: Diagnostic, formatter: System.IFormatProvider = null): string {
            if (diagnostic == null) {
                throw new System.ArgumentNullException("diagnostic");
            }
            var culture = __as__<System.Globalization.CultureInfo>(formatter, System.Globalization.CultureInfo);
            var __tSwitch67 = diagnostic.Location.Kind;
            while (true) {
                var __tDefault98 = false;
                switch (__tSwitch67) {
                    case LocationKind.SourceFile:
                    case LocationKind.XmlFile:
                    case LocationKind.ExternalFile:
                        var span = diagnostic.Location.GetLineSpan();
                        var mappedSpan = diagnostic.Location.GetMappedLineSpan();
                        if (!span.IsValid || !mappedSpan.IsValid) {
                            __tDefault98 = true; break;
                        }
                        var path: string, basePath;
                        if (mappedSpan.HasMappedPath) {
                            path = mappedSpan.Path;
                            basePath = span.Path;
                        }
                        else {
                            path = span.Path;
                            basePath = null;
                        }
                        return System.String.Format(formatter, "{0}{1}: {2}: {3}", this.FormatSourcePath(path, basePath, formatter), this.FormatSourceSpan(mappedSpan.Span, formatter), this.GetMessagePrefix(diagnostic, culture), diagnostic.GetMessage(culture));
                    default:
                        return System.String.Format(formatter, "{0}: {1}", this.GetMessagePrefix(diagnostic, culture), diagnostic.GetMessage(culture));
                }


                if (__tDefault98) {
                    return System.String.Format(formatter, "{0}: {1}", this.GetMessagePrefix(diagnostic, culture), diagnostic.GetMessage(culture));
                }

                break;
            }

        }
        public FormatSourcePath(path: string, basePath: string, formatter: System.IFormatProvider): string {
            return path;
        }
        public FormatSourceSpan(span: Text.LinePositionSpan, formatter: System.IFormatProvider): string {
            return System.String.Format("({0},{1})", span.Start.Line + 1, span.Start.Character + 1);
        }
        public GetMessagePrefix(diagnostic: Diagnostic, culture: System.Globalization.CultureInfo): string {
            var prefix: string;
            switch (diagnostic.Severity) {
                case DiagnosticSeverity.Hidden:
                    prefix = CodeAnalysisResources.SeverityHidden;
                    break;
                case DiagnosticSeverity.Info:
                    prefix = CodeAnalysisResources.SeverityInfo;
                    break;
                case DiagnosticSeverity.Warning:
                    prefix = CodeAnalysisResources.SeverityWarning;
                    break;
                case DiagnosticSeverity.Error:
                    prefix = CodeAnalysisResources.SeverityError;
                    break;
                default:
                    throw Roslyn.Utilities.ExceptionUtilities.UnexpectedValue(diagnostic.Severity);
            }
            return System.String.Format(culture, "{0} {1}", prefix, diagnostic.Id);
        }
        public static Instance: DiagnosticFormatter = new DiagnosticFormatter();
        constructor() { }
    }
}