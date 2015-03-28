
module System {
    export class Guid {

        private guidStr: string = null;

        public static Default = new Guid();
        public static TryParse(str: string, guid: { refObj: Guid }): boolean {
            if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str)) {
                var newGuid = new Guid();
                newGuid.guidStr = str;
                guid.refObj = newGuid;
                return true;
            }

            return false;
        }

        public static NewGuid(): Guid {

            var guid = new Guid();

            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + GbMath.random() * 16) % 16 | 0;
                d = GbMath.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            guid.guidStr = uuid;
            return guid;
        }
    }
}