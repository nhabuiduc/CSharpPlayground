module System.Collections.Immutable {
    export class SecureObjectPoolBase {
        private static s_poolUserIdCounter: number = 0;
        public static UnassignedId: number = -1;
        public static NewId(): number {
            var result: number = 0;
            do {
                SecureObjectPoolBase.s_poolUserIdCounter++;
                result = SecureObjectPoolBase.s_poolUserIdCounter;
            }
            while (result == SecureObjectPoolBase.UnassignedId);
            return result;
        }
    }
    export class SecureObjectPool<T, TCaller extends ISecurePooledObjectUser>
    {
        public TryAdd(caller: TCaller, item: SecurePooledObject<T>): void {
            if (caller.PoolUserId == item.Owner) {
                item.Owner = SecureObjectPoolBase.UnassignedId;
                AllocFreeConcurrentStack.TryAdd(item);
            }
        }
        public TryTake(caller: TCaller, item: { refObj: SecurePooledObject<T> }): boolean {
            if (caller.PoolUserId != SecureObjectPoolBase.UnassignedId && (() => {
                var item_ref = { refObj: item.refObj };
                var ret_val_ = AllocFreeConcurrentStack.TryTake(item_ref);
                item.refObj = item_ref.refObj;
                return ret_val_;
            })()) {
                item.refObj.Owner = caller.PoolUserId;
                return true;
            }
            else {
                item.refObj = null;
                return false;
            }
        }
        public PrepNew(caller: TCaller, newValue: T): SecurePooledObject<T> {
            //Validation.Requires.NotNullAllowStructs(newValue, "newValue");
            var pooledObject = new SecurePooledObject<T>(newValue);
            pooledObject.Owner = caller.PoolUserId;
            return pooledObject;
        }
    }
    export interface ISecurePooledObjectUser {
        PoolUserId: number;
    }
    export class SecurePooledObject<T>
    {
        private _value: T = null;
        private _owner: number = 0;
        constructor(newValue: T) {
            //Validation.Requires.NotNullAllowStructs(newValue, "newValue");
            this._value = newValue;
        }
        get Owner(): number {
            return this._owner;
        }
        set Owner(value: number) {
            this._owner = value;
        }
        public Use<TCaller extends ISecurePooledObjectUser>(caller: TCaller): T {
           // if (!this.IsOwned(caller))
               // Validation.Requires.FailObjectDisposed(caller);
            return this._value;
        }
        public TryUse<TCaller extends ISecurePooledObjectUser>(caller: TCaller, value: { refObj: T }): boolean {
            if (this.IsOwned(caller)) {
                value.refObj = this._value;
                return true;
            }
            else {
                value.refObj = null;
                return false;
            }
        }
        public IsOwned<TCaller extends ISecurePooledObjectUser>(caller: TCaller): boolean {
            return caller.PoolUserId == this._owner;
        }
    }
}