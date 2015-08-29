/**
 * Outputs a console-specific log object at the given level.
 * @param  {Number} level - 0: no logs, 1: errors only; 2: debug; 3: verbose.
 * @return {Object} logging object
 */
module.exports = function basicLog(level$713, moduleName$714) {
    var moduleTxt$715;
    var showLogs$716 = { lvl: level$713 };
    moduleName$714 = moduleName$714 || '';
    moduleTxt$715 = moduleName$714 === '' ? '' : moduleName$714 + ':::: ';
    return {
        err: function err$717(input$720) {
            if (showLogs$716.lvl && showLogs$716.lvl >= 1) {
                console.error(input$720);
            }
        },
        log: function log$718(input$721) {
            if (showLogs$716.lvl && showLogs$716.lvl >= 2) {
                if (typeof input$721 === 'string')
                    console.log(moduleTxt$715 + input$721);
                else {
                    console.log(moduleTxt$715);
                    console.log(input$721);
                }
            }
        },
        dir: function dir$719(input$722) {
            if (showLogs$716.lvl && showLogs$716.lvl >= 3) {
                console.dir(input$722);
            }
        }
    };
};