/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// define(['dashboard-client'], function(log){
	//     log.setLevel(levelOfLog);
	//     log.info('in dashboard-client.js!');
	//
	//     return {
	//         helloMainJS: function helloMainJS(){
	//             alert("Hello main.js!");
	//         }
	//     };
	////
	// });

	__webpack_require__(1);

	__webpack_require__(2);

/***/ },
/* 1 */
/***/ function(module, exports) {

	(function clientDashboard2(){

	    if (typeof window !== 'undefined') {
	      console.log('hello');
	      console.log('in cdb2.js!');
	    }

	    return({ });

	}());

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = (function(dust){dust.register("app\/components\/dashboard\/tpl-dashboard",body_0);var blocks={"head_extend":body_1,"body_content":body_2};function body_0(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.p("base",ctx,ctx,{});}body_0.__dustBody=!0;function body_1(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.w("<title>Dashboard Template for Bootstrap</title><!-- Custom styles for this template --><link href=\"public/bootstrap/css/dashboard.css\" rel=\"stylesheet\">");}body_1.__dustBody=!0;function body_2(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.w("<!-- ************* TOPBAR / HAMBURGER ************* --><nav class=\"navbar navbar-inverse navbar-fixed-top\"><div class=\"container-fluid\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a class=\"navbar-brand\" href=\"#\">Project name</a></div><div id=\"navbar\" class=\"navbar-collapse collapse\"><ul class=\"nav navbar-nav navbar-right\"><li><a href=\"#\">Dashboard</a></li><li><a href=\"#\">Settings</a></li><li><a href=\"#\">Profile</a></li><li><a href=\"#\">Help</a></li></ul><form class=\"navbar-form navbar-right\"><input type=\"text\" class=\"form-control\" placeholder=\"Search...\"></form></div></div></nav><!-- ************* SIDEBAR ************* --><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-3 col-md-2 sidebar\"><ul class=\"nav nav-sidebar\"><li class=\"active\"><a href=\"#\">Overview <span class=\"sr-only\">(current)</span></a></li><li><a href=\"#\">Reports</a></li><li><a href=\"#\">Analytics</a></li><li><a href=\"#\">Export</a></li></ul><ul class=\"nav nav-sidebar\"><li><a href=\"\">Nav item</a></li><li><a href=\"\">Nav item again</a></li><li><a href=\"\">One more nav</a></li><li><a href=\"\">Another nav item</a></li><li><a href=\"\">More navigation</a></li></ul><ul class=\"nav nav-sidebar\"><li><a href=\"\">Nav item again</a></li><li><a href=\"\">One more nav</a></li><li><a href=\"\">Another nav item</a></li></ul></div><!-- ************************** CONTENT BEGINS ************************** --><div class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\"><!-- ******** PAGE TITLE ******** --><h1 class=\"page-header\">Dashboard</h1><br/><br/><br/><!-- ***************************** BACKBONE ***************************** --><div id=\"container\">Loading...</div><!-- ******************************************************************** --><br/><br/><br/><br/><div class=\"row placeholders\"><div class=\"col-xs-6 col-sm-3 placeholder\"><img data-src=\"holder.js/200x200/auto/sky\" class=\"img-responsive\" alt=\"Generic placeholder thumbnail\"><h4>Label</h4><span class=\"text-muted\">Something else</span></div><div class=\"col-xs-6 col-sm-3 placeholder\"><img data-src=\"holder.js/200x200/auto/vine\" class=\"img-responsive\" alt=\"Generic placeholder thumbnail\"><h4>Label</h4><span class=\"text-muted\">Something else</span></div><div class=\"col-xs-6 col-sm-3 placeholder\"><img data-src=\"holder.js/200x200/auto/sky\" class=\"img-responsive\" alt=\"Generic placeholder thumbnail\"><h4>Label</h4><span class=\"text-muted\">Something else</span></div><div class=\"col-xs-6 col-sm-3 placeholder\"><img data-src=\"holder.js/200x200/auto/vine\" class=\"img-responsive\" alt=\"Generic placeholder thumbnail\"><h4>Label</h4><span class=\"text-muted\">Something else</span></div></div><!-- ************* DATA TABLE ************* --><h2 class=\"sub-header\">Section title</h2><div class=\"table-responsive\"><table class=\"table table-striped\"><thead><tr><th>#</th><th>Header</th><th>Header</th><th>Header</th><th>Header</th></tr></thead><tbody><tr><td>1,001</td><td>Lorem</td><td>ipsum</td><td>dolor</td><td>sit</td></tr><tr><td>1,002</td><td>amet</td><td>consectetur</td><td>adipiscing</td><td>elit</td></tr><tr><td>1,003</td><td>Integer</td><td>nec</td><td>odio</td><td>Praesent</td></tr><tr><td>1,003</td><td>libero</td><td>Sed</td><td>cursus</td><td>ante</td></tr><tr><td>1,004</td><td>dapibus</td><td>diam</td><td>Sed</td><td>nisi</td></tr><tr><td>1,005</td><td>Nulla</td><td>quis</td><td>sem</td><td>at</td></tr><tr><td>1,006</td><td>nibh</td><td>elementum</td><td>imperdiet</td><td>Duis</td></tr><tr><td>1,007</td><td>sagittis</td><td>ipsum</td><td>Praesent</td><td>mauris</td></tr><tr><td>1,008</td><td>Fusce</td><td>nec</td><td>tellus</td><td>sed</td></tr><tr><td>1,009</td><td>augue</td><td>semper</td><td>porta</td><td>Mauris</td></tr><tr><td>1,010</td><td>massa</td><td>Vestibulum</td><td>lacinia</td><td>arcu</td></tr><tr><td>1,011</td><td>eget</td><td>nulla</td><td>Class</td><td>aptent</td></tr><tr><td>1,012</td><td>taciti</td><td>sociosqu</td><td>ad</td><td>litora</td></tr><tr><td>1,013</td><td>torquent</td><td>per</td><td>conubia</td><td>nostra</td></tr><tr><td>1,014</td><td>per</td><td>inceptos</td><td>himenaeos</td><td>Curabitur</td></tr><tr><td>1,015</td><td>sodales</td><td>ligula</td><td>in</td><td>libero</td></tr></tbody></table></div></div></div></div>");}body_2.__dustBody=!0;return body_0}(dust));

/***/ }
/******/ ]);