module System {
    export class Assembly {
        public static Default = new Assembly();

        private static StaticConstructor(): number {
            Assembly.Default.Name = Gb.AssemblyName;
            return 1;
        }

        private static CallStaticConstructor = Assembly.StaticConstructor();

        public Name: string;

        public get FullName(): string {
            return this.Name;
        }
    }
}