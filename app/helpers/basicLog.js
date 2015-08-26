/**
 * Outputs a console-specific log object at the given level.
 * @param  {Number} level - 0: no logs, 1: errors only; 2: debug; 3: verbose.
 * @return {Object} logging object
 */
module.exports = function basicLog(level, moduleName){
    var moduleTxt;

    var showLogs = {
        lvl: level
    };

    moduleName = moduleName || "";
    moduleTxt = (moduleName === "") ? "" : moduleName + ":::: ";

    return {
        err: function err(input) {
            if (showLogs.lvl && showLogs.lvl >= 1) {
                console.error(input);
            }
        },
        log: function log(input) {
            if (showLogs.lvl && showLogs.lvl >= 2) {
                if (typeof input === 'string') console.log(moduleTxt + input);
                else {
                    console.log(moduleTxt);
                    console.log(input);
                }
            }
        },
        dir: function dir(input) {
            if (showLogs.lvl && showLogs.lvl >= 3) {
                console.dir(input);
            }
        }
    };
};