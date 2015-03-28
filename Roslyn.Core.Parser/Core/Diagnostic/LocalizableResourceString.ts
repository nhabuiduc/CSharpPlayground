///<reference path="LocalizableString.ts"/>
module Microsoft.CodeAnalysis {
    export class LocalizableResourceString extends LocalizableString implements Roslyn.Utilities.IObjectReadable, Roslyn.Utilities.IObjectWritable {
        private nameOfLocalizableResource: string;
        private resourceManager: System.Resources.ResourceManager;
        private resourceSource: System.Type;
        private formatArguments: string[];
        private static EmptyArguments: string[] = new Array(0);
        ctor_1830(nameOfLocalizableResource: string, resourceManager: System.Resources.ResourceManager, resourceSource: System.Type, ...formatArguments: string[]): LocalizableResourceString {
            if (nameOfLocalizableResource == null) {
                throw new System.ArgumentNullException('nameOfLocalizableResource');
            }
            if (resourceManager == null) {
                throw new System.ArgumentNullException('resourceManager');
            }
            if (resourceSource == null) {
                throw new System.ArgumentNullException('resourceSource');
            }
            if (formatArguments == null) {
                throw new System.ArgumentNullException('formatArguments');
            }
            this.resourceManager = resourceManager;
            this.nameOfLocalizableResource = nameOfLocalizableResource;
            this.resourceSource = resourceSource;
            this.formatArguments = formatArguments;
            return this;
        }
        ctor_9714(reader: Roslyn.Utilities.ObjectReader): LocalizableResourceString {
            this.resourceSource = <System.Type>reader.ReadValue();
            this.nameOfLocalizableResource = reader.ReadString_7160();
            this.resourceManager = new System.Resources.ResourceManager("",this.resourceSource);
            var length = <number>reader.ReadCompressedUInt();
            if (length == 0) {
                this.formatArguments = LocalizableResourceString.EmptyArguments;
            }
            else {
                var argumentsBuilder = ArrayBuilder.GetInstance_9802<string>(length);
                for (var i: number = 0; i < length; i++) {
                    argumentsBuilder.Add(reader.ReadString_7160());
                }
                this.formatArguments = argumentsBuilder.ToArrayAndFree();
            }
            return this;
        }
        GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
            return reader => <Object><any>(new LocalizableResourceString().ctor_9714(reader));
        }
        WriteTo(writer: Roslyn.Utilities.ObjectWriter): void {
            writer.WriteValue(this.resourceSource);
            writer.WriteString(this.nameOfLocalizableResource);
            var length = <number>this.formatArguments.length;
            writer.WriteCompressedUInt(length);
            for (var i: number = 0; i < length; i++) {
                writer.WriteString(this.formatArguments[i]);
            }
        }
        public ToString_1106(formatProvider: System.IFormatProvider): string {
            var temp = __as__<System.Globalization.CultureInfo>(formatProvider, System.Globalization.CultureInfo);
            var culture = temp !=null ? temp
                : System.Globalization.CultureInfo.CurrentUICulture;
            var resourceString = this.resourceManager.GetString(this.nameOfLocalizableResource, culture);
            return resourceString != null ? (this.formatArguments.length > 0 ? System.String.Format(resourceString, this.formatArguments) : resourceString) : System.String.Empty;
        }
        constructor() { super(); }
    }
}