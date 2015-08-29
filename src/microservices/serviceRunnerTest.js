var //Logger
log$4564 = require('app/helpers/winston-logger').seneca;
var superlog$4565 = (err$4566, result$4567) => err$4566 ? log$4564.error(err$4566) : log$4564.info(result$4567);
module.exports = seneca$4568 => seneca$4568.act('role:math,cmd:sum,' + 'left:1, right:2', superlog$4565).act('role:math,cmd:multiply,' + 'left:5, right: 4', superlog$4565).act('role:math,cmd:subtract,' + 'left:20,right:5', superlog$4565).act('role:math,cmd:sum,' + 'left:4,right:211', superlog$4565);