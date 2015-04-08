///<reference path="TextLineCollection.ts"/>
///<reference path="SourceTextContainer.ts"/>
module Microsoft.CodeAnalysis.Text {
    export class SourceText {
        private static CharBufferSize: number = 32 * 1024;
        private static CharBufferCount: number = 5;
        private static CharArrayPool: Roslyn.Utilities.ObjectPool<string[]> =
        new Roslyn.Utilities.ObjectPool<string[]>().ctor_5203(
            //() => StructArray(TSChar, SourceText.CharBufferSize),
            () => new Array<string>( SourceText.CharBufferSize),
            SourceText.CharBufferCount);
        private checksumAlgorithm: SourceHashAlgorithm = 0;
        private lazyContainer: SourceTextContainer;
        private lazyLineInfo: SourceText.LineInfo;
        private lazyChecksum: System.Collections.Immutable.ImmutableArray<number> = structDefault(System.Collections.Immutable.ImmutableArray);
        ctor_1670(checksum: System.Collections.Immutable.ImmutableArray<number> = structDefault(System.Collections.Immutable.ImmutableArray), checksumAlgorithm: SourceHashAlgorithm = SourceHashAlgorithm.Sha1, container: SourceTextContainer = null): SourceText {
            SourceText.ValidateChecksumAlgorithm(checksumAlgorithm);
            if (!checksum.IsDefault && checksum.Length != CryptographicHashProvider.GetHashSize(checksumAlgorithm)) {
                throw new System.ArgumentException(CodeAnalysisResources.InvalidHash, 'checksum');
            }
            this.checksumAlgorithm = checksumAlgorithm;
            this.lazyChecksum = checksum;
            this.lazyContainer = container;
            return this;
        }
        public static ValidateChecksumAlgorithm(checksumAlgorithm: SourceHashAlgorithm): void {
            //if (!Cci.DebugSourceDocument.IsSupportedAlgorithm(checksumAlgorithm)) {
            //    throw new System.ArgumentException(CodeAnalysisResources.UnsupportedHashAlgorithm, 'checksumAlgorithm');
            //}
        }
        public static From_1429(text: string, encoding: System.Text.Encoding = null, checksumAlgorithm: SourceHashAlgorithm = SourceHashAlgorithm.Sha1): SourceText {
            if (text == null) {
                throw new System.ArgumentNullException('text');
            }
            return new StringText().ctor_3448(text, encoding, structDefault(System.Collections.Immutable.ImmutableArray),/*checksumAlgorithm:*/checksumAlgorithm);
        }
        //public static From_1141(stream: System.IO.Stream, encoding: System.Text.Encoding = null, checksumAlgorithm: SourceHashAlgorithm = SourceHashAlgorithm.Sha1): SourceText {
        //    if (stream == null) {
        //        throw new System.ArgumentNullException('stream');
        //    }
        //    if (!stream.CanRead || !stream.CanSeek) {
        //        throw new System.ArgumentException(CodeAnalysisResources.StreamMustSupportReadAndSeek, 'stream');
        //    }
        //    SourceText.ValidateChecksumAlgorithm(checksumAlgorithm);
        //    encoding = encoding != null ? encoding : System.Text.Encoding.UTF8;
        //    stream.Seek(0, System.IO.SeekOrigin.Begin);
        //    var text: string;
        //    var reader = new System.IO.StreamReader(stream, encoding,/*detectEncodingFromByteOrderMarks:*/true,/*bufferSize:*/1024,/*leaveOpen:*/true)
        //    try
        //    {
        //        text = reader.ReadToEnd();
        //    }
        //    finally {
        //        if (reader != null) reader.Dispose();
        //    }
        //    return new StringText().ctor_3448(text, encoding, SourceText.CalculateChecksum(stream, checksumAlgorithm), checksumAlgorithm);
        //}
        public get ChecksumAlgorithm(): SourceHashAlgorithm {
            return this.checksumAlgorithm;
        }
        public Encoding: System.Text.Encoding;
        public Length: number = 0;
        public $get$(position: number): string
        { throw new System.NotImplementedException(); }
        public CopyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void { throw new Error('not implemented'); }
        public get Container(): SourceTextContainer {
            if (this.lazyContainer == null) {
                //Interlocked.CompareExchange(ref this.lazyContainer, new StaticContainer(this), null)
                this.lazyContainer = new SourceText.StaticContainer().ctor_1615(this);
            }
            return this.lazyContainer;
        }
        public CheckSubSpan(span: TextSpan): void {
            if (span.Start < 0 || span.Start > this.Length || span.End > this.Length) {
                throw new System.ArgumentOutOfRangeException("span");
            }
        }
        public GetSubText_1692(span: TextSpan): SourceText {
            this.CheckSubSpan(span);
            var spanLength: number = span.Length;
            if (spanLength == 0) {
                return SourceText.From_1429(System.String.Empty, this.Encoding, this.ChecksumAlgorithm);
            }
            else if (spanLength == this.Length && span.Start == 0) {
                return this;
            }
            else {
                return new SubText().ctor_1484(this, span);
            }
        }
        public GetSubText_1518(start: number): SourceText {
            if (start < 0 || start > this.Length) {
                throw new System.ArgumentOutOfRangeException("start");
            }
            if (start == 0) {
                return this;
            }
            else {
                return this.GetSubText_1692(new TextSpan().ctor_1506(start, this.Length - start));
            }
        }
        public Write_1707(textWriter: System.IO.TextWriter, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): void {
            this.Write_5564(textWriter, new TextSpan().ctor_1506(0, this.Length), cancellationToken);
        }
        public Write_5564(writer: System.IO.TextWriter, span: TextSpan, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): void {
            this.CheckSubSpan(span);
            var buffer = SourceText.CharArrayPool.Allocate();
            try
            {
                var offset: number = System.Math.Min(this.Length, span.Start);
                var length: number = System.Math.Min(this.Length, span.End) - offset;
                while (offset < length) {
                    cancellationToken.ThrowIfCancellationRequested();
                    var count: number = System.Math.Min(buffer.length, length - offset);
                    this.CopyTo(offset, buffer, 0, count);
                    writer.WriteCharArray(buffer, 0, count);
                    offset += count;
                }
            }

            finally {
                SourceText.CharArrayPool.Free(buffer);
            }
        }
        // Comments
        //public GetChecksum(): System.Collections.Immutable.ImmutableArray<number> {
        //    if (this.lazyChecksum.IsDefault) {
        //        System.Diagnostics.Debug.Assert(this.Encoding != null);
        //        var stream = new System.IO.MemoryStream();
        //        var writer = new System.IO.StreamWriter(stream, this.Encoding)
        //        try
        //        {
        //            this.Write_1707(writer);
        //            writer.Flush();
        //            this.lazyChecksum = SourceText.CalculateChecksum(stream, this.checksumAlgorithm);
        //            //var lazyChecksum_ref0 = { refObj: this.lazyChecksum };
        //            //System.Collections.Immutable.ImmutableInterlocked.InterlockedInitialize(lazyChecksum_ref0, SourceText.CalculateChecksum(stream, this.checksumAlgorithm));

        //            //this.lazyChecksum = lazyChecksum_ref0.refObj;;
        //        }
        //        finally {
        //            if (writer != null) writer.Dispose();
        //        }
        //    }
        //    return this.lazyChecksum;
        //}
        //private static CalculateChecksum(stream: System.IO.Stream, algorithmId: SourceHashAlgorithm): System.Collections.Immutable.ImmutableArray<number> {
        //    var algorithm = CryptographicHashProvider.TryGetAlgorithm_2882(algorithmId)
        //    try
        //    {
        //        System.Diagnostics.Debug.Assert(algorithm != null);
        //        stream.Seek(0, System.IO.SeekOrigin.Begin);
        //        return System.Collections.Immutable.ImmutableArray.Create(algorithm.ComputeHash_9546(stream));
        //    }
        //    finally {
        //        if (algorithm != null) algorithm.Dispose();
        //    }
        //}
        public ToString(): string {
            return this.ToString_4959(new TextSpan().ctor_1506(0, this.Length));
        }
        public ToString_4959(span: TextSpan): string {
            this.CheckSubSpan(span);
            var builder = new System.Text.StringBuilder();
            var buffer = new Array<string>( System.Math.Min(span.Length, 1024));
            var position: number = System.Math.Max(System.Math.Min(span.Start, this.Length), 0);
            var length: number = System.Math.Min(span.End, this.Length) - position;
            while (position < this.Length && length > 0) {
                var copyLength: number = System.Math.Min(buffer.length, length);
                this.CopyTo(position, buffer, 0, copyLength);
                builder.Append(buffer, 0, copyLength);
                length -= copyLength;
                position += copyLength;
            }
            return builder.ToString();
        }
        public WithChanges_5075(changes: System.Collections.Generic.IEnumerable<TextChange>): SourceText {
            if (changes == null) {
                throw new System.ArgumentNullException('changes');
            }
            if (!System.Linq.Enumerable.Any(changes)) {
                return this;
            }
            var segments = ArrayBuilder.GetInstance_1997<SourceText>();
            var changeRanges = ArrayBuilder.GetInstance_1997<TextChangeRange>();
            var position: number = 0;
            // for each
            var changeEnumerator = changes.GetEnumerator();
            try {
                while (changeEnumerator.MoveNext()) {
                    var change = changeEnumerator.Current;
                    // foreach block
                    if (change.Span.Start < position) {
                        throw new System.ArgumentException(CodeAnalysisResources.ChangesMustBeOrderedAndNotOverlapping, 'changes');
                    }
                    if (change.Span.Start > position) {
                        var subText = this.GetSubText_1692(new TextSpan().ctor_1506(position, change.Span.Start - position));
                        CompositeText.AddSegments(segments, subText);
                    }
                    if (!System.String.IsNullOrEmpty(change.NewText)) {
                        var segment = SourceText.From_1429(change.NewText, this.Encoding, this.ChecksumAlgorithm);
                        CompositeText.AddSegments(segments, segment);
                    }
                    position = change.Span.End;
                    changeRanges.Add(new TextChangeRange().ctor_4786(change.Span, change.NewText != null ? change.NewText.length : 0));
                }
            } finally {
                if (changeEnumerator !== null) changeEnumerator.Dispose();

            }    
            // end foreach
            if (position < this.Length) {
                var subText = this.GetSubText_1692(new TextSpan().ctor_1506(position, this.Length - position));
                CompositeText.AddSegments(segments, subText);
            }
            return new ChangedText().ctor_1415(this, changeRanges.ToImmutableAndFree(), segments.ToImmutableAndFree());
        }
        public WithChanges_9931(...changes: TextChange[]): SourceText {
            return this.WithChanges_5075(<System.Collections.Generic.IEnumerable<TextChange>>changes);
        }
        public Replace_1550(span: TextSpan, newText: string): SourceText {
            return this.WithChanges_9931(new TextChange().ctor_1791(span, newText));
        }
        public Replace_5382(start: number, length: number, newText: string): SourceText {
            return this.Replace_1550(new TextSpan().ctor_1506(start, length), newText);
        }
        public GetChangeRanges(oldText: SourceText): System.Collections.Generic.IReadOnlyList<TextChangeRange> {
            if (oldText == null) {
                throw new System.ArgumentNullException("oldText");
            }
            if (oldText == this) {
                return TextChangeRange.NoChanges;
            }
            else {
                return System.Collections.Immutable.ImmutableArray.Create(new TextChangeRange().ctor_4786(new TextSpan().ctor_1506(0, oldText.Length), this.Length));
            }
        }
        public GetTextChanges(oldText: SourceText): System.Collections.Generic.IReadOnlyList<TextChange> {
            var newPosDelta: number = 0;
            var ranges = System.Linq.Enumerable.ToList(this.GetChangeRanges(oldText));
            var textChanges = new System.Collections.Generic.List<TextChange>(ranges.Count);
            // for each
            var rangeEnumerator = ranges.GetEnumerator();
            try {
                while (rangeEnumerator.MoveNext()) {
                    var range = rangeEnumerator.Current;
                    // foreach block
                    var newPos = range.Span.Start + newPosDelta;
                    var newt: string;
                    if (range.NewLength > 0) {
                        var span = new TextSpan().ctor_1506(newPos, range.NewLength);
                        newt = this.ToString_4959(span);
                    }
                    else {
                        newt = System.String.Empty;
                    }
                    textChanges.Add(new TextChange().ctor_1791(range.Span, newt));
                    newPosDelta += range.NewLength - range.Span.Length;
                }
            } finally {
                if (rangeEnumerator !== null) rangeEnumerator.Dispose();

            }    
            // end foreach
            return Roslyn.Utilities.ImmutableArrayExtensions.ToImmutableArrayOrEmpty_1553(textChanges);
        }
        public get Lines(): TextLineCollection {
            if (this.lazyLineInfo == null) {
                var info = new SourceText.LineInfo().ctor_4205(this, this.ParseLineStarts());
                //Interlocked.CompareExchange(ref this.lazyLineInfo, info, null)
                this.lazyLineInfo = info;
            }
            return this.lazyLineInfo;
        }
        private ParseLineStarts(): number[] {
            var length: number = this.Length;
            if (0 == this.Length) {
                return new Array(0);
            }
            var position = 0;
            var index = 0;
            var arrayBuilder = ArrayBuilder.GetInstance_1997<number>();
            while (index < length) {
                var c: string = this.$get$(index++);
                var bias: number = '\r'.charCodeAt(0) + 1;
                if (((c.charCodeAt(0) - bias) >>> 0) <= (127 - bias)) {
                    continue;
                }
                if (c == '\r' && index < length && this.$get$(index) == '\n') {
                    index++;
                }
                else if (!TextUtilities.IsAnyLineBreakCharacter(c)) {
                    continue;
                }
                arrayBuilder.Add(position);
                position = index;
            }
            arrayBuilder.Add(position);
            return arrayBuilder.ToArrayAndFree();
        }
        public ContentEquals(other: SourceText): boolean {
            if (ReferenceEquals(this, other)) {
                return true;
            }
            var leftChecksum: System.Collections.Immutable.ImmutableArray<number> = this.lazyChecksum;
            var rightChecksum: System.Collections.Immutable.ImmutableArray<number> = other.lazyChecksum;
            if (!leftChecksum.IsDefault && !rightChecksum.IsDefault && this.Encoding == other.Encoding && this.ChecksumAlgorithm == other.ChecksumAlgorithm) {
                return System.Linq.ImmutableArrayExtensions.SequenceEqual(leftChecksum,
                    rightChecksum);
            }
            return this.ContentEqualsImpl(other);
        }
        protected  ContentEqualsImpl(other: SourceText): boolean {
            if (other == null) {
                return false;
            }
            if (ReferenceEquals(this, other)) {
                return true;
            }
            if (this.Length != other.Length) {
                return false;
            }
            var buffer1 = SourceText.CharArrayPool.Allocate();
            var buffer2 = SourceText.CharArrayPool.Allocate();
            try
            {
                var position: number = 0;
                while (position < this.Length) {
                    var n: number = System.Math.Min(this.Length - position, buffer1.length);
                    this.CopyTo(position, buffer1, 0, n);
                    other.CopyTo(position, buffer2, 0, n);
                    for (var i: number = 0; i < n; i++) {
                        if (buffer1[i] != buffer2[i]) {
                            return false;
                        }
                    }
                    position += n;
                }
                return true;
            }

            finally {
                SourceText.CharArrayPool.Free(buffer2);
                SourceText.CharArrayPool.Free(buffer1);
            }
        }
        constructor() { }
    }
    export module SourceText {
        export class LineInfo extends TextLineCollection {
            private text: SourceText;
            private lineStarts: number[];
            private lastLineNumber: number = 0;
            ctor_4205(text: SourceText, lineStarts: number[]): LineInfo {
                this.text = text;
                this.lineStarts = lineStarts;
                return this;
            }
            public get Count(): number {
                return this.lineStarts.length;
            }
            public $get$(index: number): TextLine {
                if (index < 0 || index >= this.lineStarts.length) {
                    throw new System.ArgumentOutOfRangeException("index");
                }
                var start: number = this.lineStarts[index];
                if (index == this.lineStarts.length - 1) {
                    return TextLine.FromSpan(this.text, TextSpan.FromBounds(start, this.text.Length));
                }
                else {
                    var end: number = this.lineStarts[index + 1];
                    return TextLine.FromSpan(this.text, TextSpan.FromBounds(start, end));
                }
            }
            public IndexOf(position: number): number {
                if (position < 0 || position > this.text.Length) {
                    throw new System.ArgumentOutOfRangeException("position");
                }
                var lineNumber: number = 0;
                var lastLineNumber = this.lastLineNumber;
                if (position >= this.lineStarts[lastLineNumber]) {
                    var limit = System.Math.Min(this.lineStarts.length, lastLineNumber + 4);
                    for (var i: number = lastLineNumber; i < limit; i++) {
                        if (position < this.lineStarts[i]) {
                            lineNumber = i - 1;
                            this.lastLineNumber = lineNumber;
                            return lineNumber;
                        }
                    }
                }
                lineNumber = Roslyn.Utilities.ArrayExtensions.BinarySearch(this.lineStarts,
                    position);
                if (lineNumber < 0) {
                    lineNumber = (~lineNumber) - 1;
                }
                this.lastLineNumber = lineNumber;
                return lineNumber;
            }
            public GetLineFromPosition(position: number): TextLine {
                return this.$get$(this.IndexOf(position));
            }
            constructor() { super(); }
        }
    }
    export module SourceText {
        export class StaticContainer extends SourceTextContainer {
            private text: SourceText;
            ctor_1615(text: SourceText): StaticContainer {
                this.text = text;
                return this;
            }
            public get CurrentText(): SourceText {
                return this.text;
            }
            //public override event EventHandler<TextChangeEventArgs> TextChanged
            //{
            //add
            //{
            //    // do nothing
            //}

            //remove
            //{
            //    // do nothing
            //}
            //}
            constructor() { super(); }
        }
    }
}