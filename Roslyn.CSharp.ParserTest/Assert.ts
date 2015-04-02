class Assert {
    public static AreEqual<T>(value1: T, value2: T): void {
        if (value1 != value2) {
            throw new Error("not equal");
        }
    }

    public static IsTrue(value: boolean): void {
        if (!value) {
            throw new Error("not equal");
        }
    }
} 