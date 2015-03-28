module System.Resources {
    export class ResourceManager {
        private resourceObj: Object;
        constructor(name: string, resourceObj: any) {
            this.resourceObj = resourceObj;
        }

        public GetString(code: string, format: IFormatProvider): string {
            var resource = this.resourceObj[code];
            if (resource === void 0) {
                throw new SystemException('resource not found');
            }
            return resource;
        }
    }
}