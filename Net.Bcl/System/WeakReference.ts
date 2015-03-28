module System {
    // TODO: simulate .net WeakReference
    export class WeakReference<T>{
        private target: T;
        constructor(target: T) {
            this.target = target;
        }

        public TryGetTarget(target: { refObj: T }): boolean {
            target.refObj = this.target;
            return this.target != null;
        }
    }
}