module System.Collections {
    export interface IDictionaryEnumerator extends IEnumerator {
        Key: Object;
        Value: Object;
        Entry: DictionaryEntry;
    }
}