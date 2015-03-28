module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SlidingTextWindow implements System.IDisposable {
        public static InvalidCharacter: string = TSChar.MaxValue;
        private static DefaultWindowLength: number = 2048;
        private text: Text.SourceText;
        private basis: number = 0;
        private offset: number = 0;
        private textEnd: number = 0;
        private characterWindow: string[];
        private characterWindowCount: number = 0;
        private lexemeStart: number = 0;
        private strings: Roslyn.Utilities.StringTable;
        // TODO: still not init here, but not sure
        private static windowPool: Roslyn.Utilities.ObjectPool<string[]>
        = new Roslyn.Utilities.ObjectPool<string[]>().ctor_3306(
            () => new Array<string>( SlidingTextWindow.DefaultWindowLength));
        ctor_9238(text: Text.SourceText): SlidingTextWindow {            
            this.text = text;
            this.basis = 0;
            this.offset = 0;
            this.textEnd = text.Length;
            this.strings = Roslyn.Utilities.StringTable.GetInstance();
            this.characterWindow = SlidingTextWindow.windowPool.Allocate();
            this.lexemeStart = 0;
            return this;
        }
        public Dispose(): void {
            if (this.characterWindow != null) {
                SlidingTextWindow.windowPool.Free(this.characterWindow);
                this.characterWindow = null;
                this.strings.Free();
            }
        }
        public get Text(): Text.SourceText {
            return this.text;
        }
        public get Position(): number {
            return this.basis + this.offset;
        }
        public get Offset(): number {
            return this.offset;
        }
        public get CharacterWindow(): string[] {
            return this.characterWindow;
        }
        public get LexemeRelativeStart(): number {
            return this.lexemeStart;
        }
        public get CharacterWindowCount(): number {
            return this.characterWindowCount;
        }
        public get LexemeStartPosition(): number {
            return this.basis + this.lexemeStart;
        }
        public get Width(): number {
            return this.offset - this.lexemeStart;
        }
        public Start(): void {
            this.lexemeStart = this.offset;
        }
        public Reset(position: number): void {
            var relative: number = position - this.basis;
            if (relative >= 0 && relative <= this.characterWindowCount) {
                this.offset = relative;
            }
            else {
                var amountToRead: number = System.Math.Min(this.text.Length, position + this.characterWindow.length) - position;
                amountToRead = System.Math.Max(amountToRead, 0);
                if (amountToRead > 0) {
                    this.text.CopyTo(position, this.characterWindow, 0, amountToRead);
                }
                this.lexemeStart = 0;
                this.offset = 0;
                this.basis = position;
                this.characterWindowCount = amountToRead;
            }
        }
        private MoreChars(): boolean {
            if (this.offset >= this.characterWindowCount) {
                if (this.Position >= this.textEnd) {
                    return false;
                }
                if (this.lexemeStart > ((this.characterWindowCount / 4 | 0))) {
                    TSArray.Copy(this.characterWindow, this.lexemeStart, this.characterWindow, 0, this.characterWindowCount - this.lexemeStart);
                    this.characterWindowCount -= this.lexemeStart;
                    this.offset -= this.lexemeStart;
                    this.basis += this.lexemeStart;
                    this.lexemeStart = 0;
                }
                if (this.characterWindowCount >= this.characterWindow.length) {
                    var oldWindow: string[] = this.characterWindow;
                    var newWindow: string[] = new Array<string>( this.characterWindow.length * 2);
                    TSArray.Copy(oldWindow, 0, newWindow, 0, this.characterWindowCount);
                    SlidingTextWindow.windowPool.ForgetTrackedObject(oldWindow, newWindow);
                    this.characterWindow = newWindow;
                }
                var amountToRead: number = System.Math.Min(this.textEnd - (this.basis + this.characterWindowCount), this.characterWindow.length - this.characterWindowCount);
                this.text.CopyTo(this.basis + this.characterWindowCount, this.characterWindow, this.characterWindowCount, amountToRead);
                this.characterWindowCount += amountToRead;
                return amountToRead > 0;
            }
            return true;
        }
        public IsReallyAtEnd(): boolean {
            return this.offset >= this.characterWindowCount && this.Position >= this.textEnd;
        }
        public AdvanceChar_1426(): void {
            this.offset++;
        }
        public AdvanceChar_5713(n: number): void {
            this.offset += n;
        }
        public NextChar(): string {
            var c: string = this.PeekChar_2423();
            if (c != SlidingTextWindow.InvalidCharacter) {
                this.AdvanceChar_1426();
            }
            return c;
        }
        public PeekChar_2423(): string {
            if (this.offset >= this.characterWindowCount && !this.MoreChars()) {
                return SlidingTextWindow.InvalidCharacter;
            }
            return this.characterWindow[this.offset];
        }
        public PeekChar_4867(delta: number): string {
            var position: number = this.Position;
            this.AdvanceChar_5713(delta);
            var ch: string = '';
            if (this.offset >= this.characterWindowCount && !this.MoreChars()) {
                ch = SlidingTextWindow.InvalidCharacter;
            }
            else {
                ch = this.characterWindow[this.offset];
            }
            this.Reset(position);
            return ch;
        }
        public IsUnicodeEscape(): boolean {
            if (this.PeekChar_2423() == '\\') {
                var ch2 = this.PeekChar_4867(1);
                if (ch2 == 'U' || ch2 == 'u') {
                    return true;
                }
            }
            return false;
        }
        public PeekCharOrUnicodeEscape(surrogateCharacter: { refObj: string }): string {
            if (this.IsUnicodeEscape()) {
                return this.PeekUnicodeEscape(surrogateCharacter);
            }
            else {
                surrogateCharacter.refObj = SlidingTextWindow.InvalidCharacter;
                return this.PeekChar_2423();
            }
        }
        public PeekUnicodeEscape(surrogateCharacter: { refObj: string }): string {
            var position: number = this.Position;
            var info: SyntaxDiagnosticInfo;
            var info_ref0 = { refObj: info };
            var ret_val__641 = this.ScanUnicodeEscape(/*peek:*/true,/*surrogateCharacter:*/surrogateCharacter,/*info:*/info_ref0);

            info = info_ref0.refObj;
            var ch = ret_val__641;
            System.Diagnostics.Debug.Assert(info == null, "Never produce a diagnostic while peeking.");
            this.Reset(position);
            return ch;
        }
        public NextCharOrUnicodeEscape(surrogateCharacter: { refObj: string }, info: { refObj: SyntaxDiagnosticInfo }): string {
            var ch = this.PeekChar_2423();
            System.Diagnostics.Debug.Assert(ch != SlidingTextWindow.InvalidCharacter, "Precondition established by all callers; required for correctness of AdvanceChar() call.");
            if (ch == '\\') {
                var ch2 = this.PeekChar_4867(1);
                if (ch2 == 'U' || ch2 == 'u') {
                    return this.ScanUnicodeEscape(/*peek:*/false,/*surrogateCharacter:*/surrogateCharacter,/*info:*/info);
                }
            }
            surrogateCharacter.refObj = SlidingTextWindow.InvalidCharacter;
            info.refObj = null;
            this.AdvanceChar_1426();
            return ch;
        }
        public NextUnicodeEscape(surrogateCharacter: { refObj: string }, info: { refObj: SyntaxDiagnosticInfo }): string {
            return this.ScanUnicodeEscape(/*peek:*/false,/*surrogateCharacter:*/surrogateCharacter,/*info:*/info);
        }
        private ScanUnicodeEscape(peek: boolean, surrogateCharacter: { refObj: string }, info: { refObj: SyntaxDiagnosticInfo }): string {
            surrogateCharacter.refObj = SlidingTextWindow.InvalidCharacter;
            info.refObj = null;
            var start: number = this.Position;
            var character: string = this.PeekChar_2423();
            System.Diagnostics.Debug.Assert(character == '\\');
            this.AdvanceChar_1426();
            character = this.PeekChar_2423();
            if (character == 'U') {
                var uintChar: number = 0;
                this.AdvanceChar_1426();
                if (!SyntaxFacts.IsHexDigit(this.PeekChar_2423())) {
                    if (!peek) {
                        info.refObj = this.CreateIllegalEscapeDiagnostic(start);
                    }
                }
                else {
                    for (var i: number = 0; i < 8; i++) {
                        character = this.PeekChar_2423();
                        if (!SyntaxFacts.IsHexDigit(character)) {
                            if (!peek) {
                                info.refObj = this.CreateIllegalEscapeDiagnostic(start);
                            }
                            break;
                        }
                        uintChar = <number>((uintChar << 4) + SyntaxFacts.HexValue(character));
                        this.AdvanceChar_1426();
                    }
                    if (uintChar > 0x0010FFFF) {
                        if (!peek) {
                            info.refObj = this.CreateIllegalEscapeDiagnostic(start);
                        }
                    }
                    else {
                        character = SlidingTextWindow.GetCharsFromUtf32(uintChar, surrogateCharacter);
                    }
                }
            }
            else {
                System.Diagnostics.Debug.Assert(character == 'u' || character == 'x');
                var intChar: number = 0;
                this.AdvanceChar_1426();
                if (!SyntaxFacts.IsHexDigit(this.PeekChar_2423())) {
                    if (!peek) {
                        info.refObj = this.CreateIllegalEscapeDiagnostic(start);
                    }
                }
                else {
                    for (var i: number = 0; i < 4; i++) {
                        var ch2: string = this.PeekChar_2423();
                        if (!SyntaxFacts.IsHexDigit(ch2)) {
                            if (character == 'u') {
                                if (!peek) {
                                    info.refObj = this.CreateIllegalEscapeDiagnostic(start);
                                }
                            }
                            break;
                        }
                        intChar = (intChar << 4) + SyntaxFacts.HexValue(ch2);
                        this.AdvanceChar_1426();
                    }
                    character = String.fromCharCode(intChar);
                }
            }
            return character;
        }
        public TryScanXmlEntity(ch: { refObj: string }, surrogate: { refObj: string }): boolean {
            System.Diagnostics.Debug.Assert(this.PeekChar_2423() == '&');
            ch.refObj = '&';
            this.AdvanceChar_1426();
            surrogate.refObj = SlidingTextWindow.InvalidCharacter;
            switch (this.PeekChar_2423()) {
                case 'l':
                    if (this.AdvanceIfMatches("lt;")) {
                        ch.refObj = '<';
                        return true;
                    }
                    break;
                case 'g':
                    if (this.AdvanceIfMatches("gt;")) {
                        ch.refObj = '>';
                        return true;
                    }
                    break;
                case 'a':
                    if (this.AdvanceIfMatches("amp;")) {
                        ch.refObj = '&';
                        return true;
                    }
                    else if (this.AdvanceIfMatches("apos;")) {
                        ch.refObj = '\'';
                        return true;
                    }
                    break;
                case 'q':
                    if (this.AdvanceIfMatches("quot;")) {
                        ch.refObj = '"';
                        return true;
                    }
                    break;
                case '#':
                    {
                        this.AdvanceChar_1426();
                        var uintChar: number = 0;
                        if (this.AdvanceIfMatches("x")) {
                            var digit: string = '';
                            while (SyntaxFacts.IsHexDigit(digit = this.PeekChar_2423())) {
                                this.AdvanceChar_1426();
                                if (uintChar <= 0x7FFFFFF) {
                                    uintChar = (uintChar << 4) + <number>SyntaxFacts.HexValue(digit);
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                        else {
                            var digit: string = '';
                            while (SyntaxFacts.IsDecDigit(digit = this.PeekChar_2423())) {
                                this.AdvanceChar_1426();
                                if (uintChar <= 0x7FFFFFF) {
                                    uintChar = (uintChar << 3) + (uintChar << 1) + <number>SyntaxFacts.DecValue(digit);
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                        if (this.AdvanceIfMatches(";")) {
                            ch.refObj = SlidingTextWindow.GetCharsFromUtf32(uintChar, surrogate);
                            return true;
                        }
                        break;
                    }
            }
            return false;
        }
        private AdvanceIfMatches(desired: string): boolean {
            var length: number = desired.length;
            for (var i: number = 0; i < length; i++) {
                if (this.PeekChar_4867(i) != desired[i]) {
                    return false;
                }
            }
            this.AdvanceChar_5713(length);
            return true;
        }
        private CreateIllegalEscapeDiagnostic(start: number): SyntaxDiagnosticInfo {
            return new SyntaxDiagnosticInfo().ctor_1813(start - this.LexemeStartPosition, this.Position - start, ErrorCode.ERR_IllegalEscape);
        }
        public Intern_1886(text: System.Text.StringBuilder): string {
            return this.strings.Add_1270(text);
        }
        public Intern_1831(array: string[], start: number, length: number): string {
            return this.strings.Add_5745(array, start, length);
        }
        public GetInternedText(): string {
            return this.Intern_1831(this.characterWindow, this.lexemeStart, this.Width);
        }
        public GetText_5693(intern: boolean): string {
            return this.GetText_2126(this.LexemeStartPosition, this.Width, intern);
        }
        public GetText_2126(position: number, length: number, intern: boolean): string {
            var offset: number = position - this.basis;
            switch (length) {
                case 0:
                    return System.String.Empty;
                case 1:
                    if (this.characterWindow[offset] == ' ') {
                        return " ";
                    }
                    break;
                case 2:
                    var firstChar: string = this.characterWindow[offset];
                    if (firstChar == '\r' && this.characterWindow[offset + 1] == '\n') {
                        return "\r\n";
                    }
                    if (firstChar == '/' && this.characterWindow[offset + 1] == '/') {
                        return "//";
                    }
                    break;
                case 3:
                    if (this.characterWindow[offset] == '/' && this.characterWindow[offset + 1] == '/' && this.characterWindow[offset + 2] == ' ') {
                        return "// ";
                    }
                    break;
            }
            if (intern) {
                return this.Intern_1831(this.characterWindow, offset, length);
            }
            else {
                return Gb.StringFromCharArray(this.characterWindow, offset, length);
            }
        }
        public static GetCharsFromUtf32(codepoint: number, lowSurrogate: { refObj: string }): string {
            if (codepoint < <number>0x00010000) {
                lowSurrogate.refObj = SlidingTextWindow.InvalidCharacter;
                return String.fromCharCode(codepoint);
            }
            else {
                System.Diagnostics.Debug.Assert(codepoint > 0x0000FFFF && codepoint <= 0x0010FFFF);
                lowSurrogate.refObj = String.fromCharCode((codepoint - 0x00010000) % 0x0400 + 0xDC00);
                return String.fromCharCode(((codepoint - 0x00010000) / 0x0400 | 0) + 0xD800);
            }
        }
        constructor() { }
    }
}