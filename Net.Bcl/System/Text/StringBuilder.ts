// source code from Typescriptbcl.codeplex.com
module System.Text {
    export class StringBuilder {

        private _list: Array<string>;
        constructor(length: number);
        constructor(stringValue: string);
        constructor();
        constructor(stringValueOrLength?: string|number) {
            this._list = new Array<string>();

            if (stringValueOrLength === void 0) {
                return;
            }

            var stringValue;
            var length;

            if (typeof stringValueOrLength === 'number') {
                length = stringValueOrLength;
            }

            if (typeof stringValueOrLength === 'string') {
                stringValue = stringValueOrLength;
            }

            if (stringValue !== void 0 && stringValue !== "") {
                this._list.push(stringValue);
            }
        }

        public $get$(index: number): string {
            var count: number = 0;
            //var lastCount: number = 0;
            for (var i = 0; i < this._list.length; i++) {
                var str = this._list[i];
                var length = str.length;
                if (index >= count && index < count + length) {
                    return str[index - count];
                }
                count += length;
            }

            throw new System.ArgumentOutOfRangeException("index");
        }

        public Insert(index: number, str: string): StringBuilder {
            if (index === 0) {
                this._list.Insert(0, str);
                return this;
            }
            var count: number = 0;
            for (var i = 0; i < this._list.length; i++) {
                var str = this._list[i];
                var length = str.length;
                if (index == count) {
                    this._list.Insert(i, str);
                    return this;
                }
                if (index > count && index < count + length) {
                    var localIndex = index - count;
                    var str1 = str.substr(0, localIndex);
                    var str2 = str.substr(localIndex);
                    this._list[i] = str1 + str + str2;
                    return this;
                }
                count += length;
            }

            if (index == count) {
                this._list.push(str);
                return this;
            }

            return this;
        }

        public get Length(): number {
            var count = 0;
            for (var i = 0; i < this._list.length; i++) {
                count += this._list[i].length;
            }

            return count;
        }

        public set Length(value: number) {
            if (value == 0) {
                this._list.length = 0;
                return;
            }

            throw new Error('not support');
        }

        public get Capacity(): number {
            return this.Length;
        }

        public Clear(): void {
            this._list.length = 0;
        }

        public Remove(startIndex: number, length: number): void {
            //var count = 0;
            var start = 0;
            var end = 0;
            var endIndex = startIndex + length; // not including current
            var indexToRemove = new Array<number>();;
            for (var i = 0; i < this._list.length; i++) {
                var current = this._list[i];
                end += current.length;
                var localStartIndex = -1;
                var localEndIndex = -1;

                if (startIndex >= start && startIndex < end) {
                    localStartIndex = startIndex - start;
                }

                if (endIndex >= start && endIndex < end) {
                    localEndIndex = endIndex - start;
                }

                if (localStartIndex >= 0 && localEndIndex >= 0) {
                    this._list[i] = current.substr(0, localStartIndex) + current.substr(localEndIndex);
                    return;
                }
                else if (localStartIndex >= 0) {
                    if (localStartIndex == 0) {
                        indexToRemove.push(i);
                    } else {
                        this._list[i] = current.substr(0, localStartIndex);
                    }

                }
                else if (localEndIndex >= 0) {
                    this._list[i] = current.substr(localEndIndex);
                } else if (start >= startIndex && end <= endIndex) {
                    indexToRemove.push(i);
                }
                start += current.length;
            }

            if (indexToRemove.length > 0) {
                this._list.splice(indexToRemove[0], indexToRemove.length);
            }
        }

        public AppendLine(value: string): StringBuilder {
            this.Append(value + Environment.NewLine);
            return this;
        }

        public Append(value: string, repeatCount: number): StringBuilder
        public Append(value: string): StringBuilder
        public Append(value: Object): StringBuilder
        public Append(value: string[], startIndex: number, charCount: number): StringBuilder
        public Append(value: string, startIndex: number, charCount: number): StringBuilder;
        public Append(value: any, repeatCount?: number, charCount?: number): StringBuilder {
            if (typeof charCount === 'number'){
                if (typeof value === "string") {
                    value = (<string>value).split('');
                }
                var arr = <Array<string>>value;
                var startIndex = repeatCount;

                if (startIndex != 0 || charCount != arr.length) {
                    arr = arr.slice(startIndex, charCount);
                }

                this._list.push(arr.join(''));

                return this;
            }
            if (typeof value !== 'string') {
                value = value.toString();
            }
            if (typeof repeatCount === 'undefined')
                repeatCount = 1;

            for (var i = 0; i < repeatCount; i++) {
                this._list.push(value);
            }
            return this;
        }

        public AppendFormat(value: string, ...args: Array<string>): StringBuilder {
            for (var i: number = 0; i < args.length; i++) {
                var find: string = "{" + i + "}";
                var regex: RegExp = new RegExp(this.escapeRegExp(find), "g");
                value = value.replace(regex, args[i]);
            }
            return this.Append(value);
        }
        public ToString(startIndex: number, length: number): string;
        public ToString(): string;
        public ToString(startIndex?: number, length?: number): string {
            if (typeof startIndex != 'undefined' && typeof length != 'undefined') {
                return this._list.join('').substr(startIndex, length);
            }

            return this._list.join('');
        }

        private escapeRegExp(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }

        public CopyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void {
            if (destination == null)
                throw new System.ArgumentNullException("destination");
            if (count < 0)
                throw new System.ArgumentOutOfRangeException("count", System.Environment.GetResourceString("ArgumentOutOfRange_NegativeCount"));
            if (sourceIndex < 0)
                throw new System.ArgumentOutOfRangeException("sourceIndex", System.Environment.GetResourceString("ArgumentOutOfRange_Index"));
            if (count > this.Length - sourceIndex)
                throw new System.ArgumentOutOfRangeException("sourceIndex", System.Environment.GetResourceString("ArgumentOutOfRange_IndexCount"));
            if (destinationIndex > destination.length - count || destinationIndex < 0)
                throw new System.ArgumentOutOfRangeException("destinationIndex", System.Environment.GetResourceString("ArgumentOutOfRange_IndexCount"));

            for (var i = 0; i < count; i++) {
                destination[i + destinationIndex] = this.$get$(i + sourceIndex);
            }

        }
    }
} 