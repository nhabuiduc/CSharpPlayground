module System.Collections.Immutable {
    export class ImmutableStack<T>
    {
        private _head: T = null;
        private static s_EmptyField: ImmutableStack<any> = new ImmutableStack<any>();
        private _tail: ImmutableStack<T> = null;
        public Push(value: T): ImmutableStack<T> {
            return new ImmutableStack<T>(value, this);
        }
        public Peek(): T {
            return this._head;
        }
        get IsEmpty(): boolean {
            return this._tail == null;
        }
        public Pop(): ImmutableStack<T> {
            return this._tail;
        }
        static get Empty(): ImmutableStack<any> {
            return ImmutableStack.s_EmptyField;
        }
        constructor(head: T, tail: ImmutableStack<T>);
        constructor();
        constructor(param0?: T, param1?: ImmutableStack<T>) {
            if (typeof param0 == 'undefined' && typeof param1 == 'undefined') { this.constructor_ImmutableStack_overload1(); return; }
            if (typeof param0 != 'undefined' && param1 instanceof ImmutableStack) { this.constructor_ImmutableStack_overload0(param0, param1); return; }
            throw new Error('overload failed');
        }
        private constructor_ImmutableStack_overload0(head: T, tail: ImmutableStack<T>): void {
            this._head = head;
            this._tail = tail;
        }
        private constructor_ImmutableStack_overload1(): void {

        }

        public static Create<T>(): ImmutableStack<T> {
            return ImmutableStack.Empty;
        }
    }

}