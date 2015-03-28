module Roslyn.Utilities {
    export class ObjectPool<T>
    {        
        private firstItem: T ;
        private items: T[] ;
        private factory: () => T ;
        ctor_3306(factory: () => T): ObjectPool<T> {
            this.ctor_5203(factory, System.Environment.ProcessorCount * 2);
            return this;
        }
        ctor_5203(factory: () => T, size: number): ObjectPool<T> {
            System.Diagnostics.Debug.Assert(size >= 1);
            this.factory = factory;
            this.items = new Array<T>( size - 1);
            return this;
        }
        private CreateInstance(): T {
            var inst = this.factory();
            return inst;
        }
        public Allocate(): T {
            var inst: T = this.firstItem;
            if (inst == null) {
                inst = this.AllocateSlow();
            } else {
                this.firstItem = null;
            }
            return inst;
        }
        private AllocateSlow(): T {
            var items = this.items;
            var inst: T = null;
            for (var i: number = 0; i < items.length; i++) {
                inst = items[i];
                if (inst != null) {
                                        
                    items[i] = null;
                    return inst;

                }
            }
            return this.CreateInstance();
        }
        public Free(obj: T): void {
            this.Validate(obj);
            this.ForgetTrackedObject(obj);
            if (this.firstItem == null) {
                this.firstItem = obj;
            }
            else {
                this.FreeSlow(obj);
            }
        }
        private FreeSlow(obj: T): void {
            var items = this.items;
            for (var i: number = 0; i < items.length; i++) {
                if (items[i] == null) {
                    items[i] = obj;
                    break;
                }
            }
        }
        public ForgetTrackedObject(old: T, replacement: T = null): void {

        }
        private Validate(obj: Object): void {
            System.Diagnostics.Debug.Assert(obj != null, "freeing null?");
            var items = this.items;
            for (var i: number = 0; i < items.length; i++) {
                var value = items[i];
                if (value == null) {
                    return
                }
                System.Diagnostics.Debug.Assert(value != obj, "freeing twice?");
            }
        }
        constructor() { }
    }
    export module ObjectPool {
        export class Element<T> implements IStruct {
            public Value: T = null;
            constructor() { }
        }
    }
}