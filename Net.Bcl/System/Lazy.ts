module System {
    export class Lazy<T> {
        private func: () => T;
        private value: T;
        constructor(func: () => T) {
            this.func = func;
        }
        public get Value(): T {
            if (this.value === void 0) {
                this.value = this.func();
            }

            return this.value;
        }
    }
}