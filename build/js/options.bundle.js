/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(document).foundation();

// fill in default value
browser.storage.local.get("firefox-uploader-client-id").then(function (result) {
    if (typeof result['firefox-uploader-client-id'] !== "undefined") {
        document.querySelector("#client-id").value = result['firefox-uploader-client-id'];
    }
});

document.querySelector("#save1").addEventListener('click', function () {
    var clientID = document.querySelector("#client-id").value;
    browser.storage.local.set({ "firefox-uploader-client-id": clientID });
});

browser.storage.local.get('firefox-uploader-auto-copy').then(function (value) {
    document.getElementById('clipboard-switch').checked = value['firefox-uploader-auto-copy'];
});

document.getElementById('clipboard-switch').addEventListener('change', function (e) {
    console.log(e.target.checked);
    browser.storage.local.set({ 'firefox-uploader-auto-copy': e.target.checked });
});

browser.storage.local.get('firefox-uploader-imgur').then(function (value) {
    console.log(value);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = value['firefox-uploader-imgur'].reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var x = _step.value;

            console.log(x);
            if (x == undefined || x.link == undefined || x.viewable == false) {
                continue;
            }
            $(document.getElementById("image-list")).append('\
            <div class="cell">\
              <div class="card">\
                <img src="' + x.link + '">\
                <div class="card-section">\
                    <button type="button" class="alert button delete float-right">Delete</button>\
                </div>\
              </div>\
            </div>\
        ');
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
});

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}
document.addEventListener('click', function (e) {
    if (hasClass(e.target, 'delete')) {
        console.log(e.target);
    }
}, false);

/***/ })

/******/ });
//# sourceMappingURL=options.bundle.js.map