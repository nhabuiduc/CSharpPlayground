window.log = function (args) {
    //log.history = log.history || [];   // store logs to an array for reference
    //log.history.push(arguments);
    if (this.console) {
        console.log(args);
    }
};

function Run(testClass) {
    var obj = new testClass();
    for (var t in obj) {
        try {
            if (t.indexOf("Test") == 0 && typeof obj[t] == 'function') {
                obj[t]();
            }
            log(t + ": pass \r\n");
        } catch (ex) {
            log(t + ": failed \r\n");
        }
    }
}