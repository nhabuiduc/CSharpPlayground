module System {

    export class ThrowHelper {
        //public static ThrowWrongKeyTypeArgumentException(key: Object, targetType: Type): void {
        //    throw new ArgumentException(SR.GetString(SR.Arg_WrongType, key, targetType), "key");

        //}
        public static ThrowWrongValueTypeArgumentException(value: Object, targetType: string): void {
            throw new ArgumentException("wrong value type");

        }
        public static ThrowKeyNotFoundException(): void {
            throw new KeyNotFoundException("");

        }
        public static ThrowArgumentException(resource: ExceptionResource): void {
            throw new ArgumentException("");

        }
        public static ThrowArgumentNullException(argument: ExceptionArgument): void {
            throw new ArgumentNullException("");

        }
        public static ThrowInvalidOperationException(resource: ExceptionResource): void {
            throw new InvalidOperationException("");

        }
        public static ThrowSerializationException(resource: ExceptionResource): void {
            throw new Error("");

        }
        public static ThrowNotSupportedException(resource: ExceptionResource): void {
            throw new NotSupportedException("");

        }
        public static IfNullAndNullsAreIllegalThenThrow<T>(value: Object, argName: ExceptionArgument): void {
            // Note that default(T) is not equal to null for value types except when T is Nullable<U>. 
            if (value == null )
                ThrowHelper.ThrowArgumentNullException(argName);

        }
        public static GetArgumentName(argument: ExceptionArgument): string {
            var argumentName: string = null;

            switch (argument) {
                case ExceptionArgument.array:
                    argumentName = "array";
                    break;

                case ExceptionArgument.arrayIndex:
                    argumentName = "arrayIndex";
                    break;

                case ExceptionArgument.capacity:
                    argumentName = "capacity";
                    break;

                case ExceptionArgument.collection:
                    argumentName = "collection";
                    break;

                case ExceptionArgument.converter:
                    argumentName = "converter";
                    break;

                case ExceptionArgument.count:
                    argumentName = "count";
                    break;

                case ExceptionArgument.dictionary:
                    argumentName = "dictionary";
                    break;

                case ExceptionArgument.index:
                    argumentName = "index";
                    break;

                case ExceptionArgument.info:
                    argumentName = "info";
                    break;

                case ExceptionArgument.key:
                    argumentName = "key";
                    break;

                case ExceptionArgument.match:
                    argumentName = "match";
                    break;

                case ExceptionArgument.obj:
                    argumentName = "obj";
                    break;

                case ExceptionArgument.queue:
                    argumentName = "queue";
                    break;

                case ExceptionArgument.stack:
                    argumentName = "stack";
                    break;

                case ExceptionArgument.startIndex:
                    argumentName = "startIndex";
                    break;

                case ExceptionArgument.value:
                    argumentName = "value";
                    break;

                case ExceptionArgument.item:
                    argumentName = "item";
                    break;

                default:
                    System.Diagnostics.Debug.Assert(false, "The enum value is not defined, please checked ExceptionArgumentName Enum.");
                    return "";
            }

            return argumentName;
        }
        public static GetResourceName(resource: ExceptionResource): string {
            var resourceName: string = null;

            switch (resource) {
                case ExceptionResource.Argument_ImplementIComparable:
                    resourceName = "Argument_ImplementIComparable";
                    break;

                case ExceptionResource.Argument_AddingDuplicate:
                    resourceName = "Argument_AddingDuplicate";
                    break;

                case ExceptionResource.ArgumentOutOfRange_Index:
                    resourceName = "ArgumentOutOfRange_Index";
                    break;

                case ExceptionResource.ArgumentOutOfRange_NeedNonNegNum:
                    resourceName = "ArgumentOutOfRange_NeedNonNegNum";
                    break;

                case ExceptionResource.ArgumentOutOfRange_NeedNonNegNumRequired:
                    resourceName = "ArgumentOutOfRange_NeedNonNegNumRequired";
                    break;

                case ExceptionResource.ArgumentOutOfRange_SmallCapacity:
                    resourceName = "ArgumentOutOfRange_SmallCapacity";
                    break;

                case ExceptionResource.Arg_ArrayPlusOffTooSmall:
                    resourceName = "Arg_ArrayPlusOffTooSmall";
                    break;

                case ExceptionResource.Arg_RankMultiDimNotSupported:
                    resourceName = "Arg_MultiRank";
                    break;

                case ExceptionResource.Arg_NonZeroLowerBound:
                    resourceName = "Arg_NonZeroLowerBound";
                    break;

                case ExceptionResource.Argument_InvalidArrayType:
                    resourceName = "Invalid_Array_Type";
                    break;

                case ExceptionResource.Argument_InvalidOffLen:
                    resourceName = "Argument_InvalidOffLen";
                    break;

                case ExceptionResource.InvalidOperation_CannotRemoveFromStackOrQueue:
                    resourceName = "InvalidOperation_CannotRemoveFromStackOrQueue";
                    break;

                case ExceptionResource.InvalidOperation_EmptyCollection:
                    resourceName = "InvalidOperation_EmptyCollection";
                    break;

                case ExceptionResource.InvalidOperation_EmptyQueue:
                    resourceName = "InvalidOperation_EmptyQueue";
                    break;

                case ExceptionResource.InvalidOperation_EnumOpCantHappen:
                    resourceName = "InvalidOperation_EnumOpCantHappen";
                    break;

                case ExceptionResource.InvalidOperation_EnumFailedVersion:
                    resourceName = "InvalidOperation_EnumFailedVersion";
                    break;

                case ExceptionResource.InvalidOperation_EmptyStack:
                    resourceName = "InvalidOperation_EmptyStack";
                    break;

                case ExceptionResource.InvalidOperation_EnumNotStarted:
                    resourceName = "InvalidOperation_EnumNotStarted";
                    break;

                case ExceptionResource.InvalidOperation_EnumEnded:
                    resourceName = "InvalidOperation_EnumEnded";
                    break;

                case ExceptionResource.NotSupported_KeyCollectionSet:
                    resourceName = "NotSupported_KeyCollectionSet";
                    break;

                case ExceptionResource.NotSupported_SortedListNestedWrite:
                    resourceName = "NotSupported_SortedListNestedWrite";
                    break;

                case ExceptionResource.Serialization_InvalidOnDeser:
                    resourceName = "Serialization_InvalidOnDeser";
                    break;

                case ExceptionResource.Serialization_MissingValues:
                    resourceName = "Serialization_MissingValues";
                    break;

                case ExceptionResource.Serialization_MismatchedCount:
                    resourceName = "Serialization_MismatchedCount";
                    break;

                case ExceptionResource.NotSupported_ValueCollectionSet:
                    resourceName = "NotSupported_ValueCollectionSet";
                    break;

                default:
                    System.Diagnostics.Debug.Assert(false, "The enum value is not defined, please checked ExceptionArgumentName Enum.");
                    return "";
            }

            return resourceName;
        }
        public static ThrowArgumentOutOfRangeException(): void;
        public static ThrowArgumentOutOfRangeException(argument: ExceptionArgument, resource: ExceptionResource): void;
        public static ThrowArgumentOutOfRangeException(argument: ExceptionArgument): void;
        public static ThrowArgumentOutOfRangeException(argument?: ExceptionArgument, resource?: ExceptionResource): void {
            if (typeof argument == 'undefined') {
                throw new Error("argument out or range");
            }
            if (argument && resource) { return this.ThrowArgumentOutOfRangeException_overload0(argument, resource); }
            if (argument && !resource) { return this.ThrowArgumentOutOfRangeException_overload1(argument); }
        }
        private static ThrowArgumentOutOfRangeException_overload0(argument: ExceptionArgument, resource: ExceptionResource): void {
            throw new Error(ThrowHelper.GetArgumentName(argument) + ThrowHelper.GetResourceName(resource));

        }
        private static ThrowArgumentOutOfRangeException_overload1(argument: ExceptionArgument): void {
            throw new Error(ThrowHelper.GetArgumentName(argument));

        }
    }

    export enum ExceptionArgument {
        obj,
        dictionary,
        array,
        info,
        key,
        collection,
        match,
        converter,
        queue,
        stack,
        capacity,
        index,
        startIndex,
        value,
        count,
        arrayIndex,
        item,

    }
    export enum ExceptionResource {
        Argument_ImplementIComparable,
        ArgumentOutOfRange_NeedNonNegNum,
        ArgumentOutOfRange_NeedNonNegNumRequired,
        Arg_ArrayPlusOffTooSmall,
        Argument_AddingDuplicate,
        Serialization_InvalidOnDeser,
        Serialization_MismatchedCount,
        Serialization_MissingValues,
        Arg_RankMultiDimNotSupported,
        Arg_NonZeroLowerBound,
        Argument_InvalidArrayType,
        NotSupported_KeyCollectionSet,
        ArgumentOutOfRange_SmallCapacity,
        ArgumentOutOfRange_Index,
        Argument_InvalidOffLen,
        NotSupported_ReadOnlyCollection,
        InvalidOperation_CannotRemoveFromStackOrQueue,
        InvalidOperation_EmptyCollection,
        InvalidOperation_EmptyQueue,
        InvalidOperation_EnumOpCantHappen,
        InvalidOperation_EnumFailedVersion,
        InvalidOperation_EmptyStack,
        InvalidOperation_EnumNotStarted,
        InvalidOperation_EnumEnded,
        NotSupported_SortedListNestedWrite,
        NotSupported_ValueCollectionSet,
        ArgumentOutOfRange_BiggerThanCollection,
        ArgumentOutOfRange_ListInsert,
        ArgumentOutOfRange_Count,
    }
}