module Microsoft.CodeAnalysis.Text {
    export class SourceTextContainer {
        public CurrentText: SourceText;
        //public abstract event EventHandler<TextChangeEventArgs> TextChanged;
        public event: TSEvent<(sender: Object, e: TextChangeEventArgs) => void>;
    }
}