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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Storage() {
        _classCallCheck(this, Storage);

        browser.storage.local.get("firefox-uploader-imgur").then(function (obj) {
            if (Object.getOwnPropertyNames(obj).length == 0) {
                console.log("test");
                browser.storage.local.set({
                    'firefox-uploader-imgur': []
                });
            }
        });
    }

    _createClass(Storage, [{
        key: "add",
        value: function add(image) {
            return new Promise(function (resolve, reject) {
                var checkStorage = browser.storage.local.get("firefox-uploader-imgur").then(function (obj) {
                    var send = obj['firefox-uploader-imgur'];

                    image['viewable'] = true;
                    console.log("testesestestestestestestestestestestestestestestestesttset");
                    console.log(image);
                    send.push(image);
                    console.log(send);
                    browser.storage.local.set({
                        'firefox-uploader-imgur': send
                    }).then(function () {
                        resolve("test");
                    });
                });
            });
        }
    }, {
        key: "remove",
        value: function remove(imageId) {
            var checkStorage = browser.storage.local.get("firefox-uploader-imgur").then(function (obj) {
                var send = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = obj['firefox-uploader-imgur'][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var img = _step.value;

                        if (img.id != imageId) {
                            send.push(img);
                        }
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

                browser.storage.local.set({
                    'firefox-uploader-imgur': send
                });
            });
        }
    }, {
        key: "change",
        value: function change(imageId, status) {
            if (!imageId instanceof Array) {
                imageId = [imageId];
            }
            var checkStorage = browser.storage.local.get("firefox-uploader-imgur").then(function (obj) {
                var send = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = obj['firefox-uploader-imgur'][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var img = _step2.value;

                        if (imageId.indexOf(img.id) >= 0) {
                            console.log(imageId);
                            console.log(status);
                            for (var property in status) {
                                if (status.hasOwnProperty(property)) {
                                    img[property] = status[property];
                                }
                            }
                            console.log(img);
                            send.push(img);
                        } else {
                            send.push(img);
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                browser.storage.local.set({
                    'firefox-uploader-imgur': send
                });
            });
        }
    }, {
        key: "removeAll",
        value: function removeAll() {
            browser.storage.local.set({
                'firefox-uploader-imgur': []
            });
        }
    }]);

    return Storage;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.setCopy = function (text) {
    var id = "clipboard-textarea-hidden-id";
    var existsTextarea = document.getElementById(id);

    if (!existsTextarea) {
        console.log("Creating textarea");
        var textarea = document.createElement("textarea");
        textarea.id = id;
        textarea.style.position = 'fixed';
        textarea.style.top = -100;
        textarea.style.left = -100;
        textarea.style.width = '1px';
        textarea.style.height = '1px';
        textarea.style.padding = 0;
        textarea.style.border = 'none';
        textarea.style.outline = 'none';
        textarea.style.boxShadow = 'none';
        textarea.style.background = 'transparent';
        document.querySelector("body").appendChild(textarea);

        existsTextarea = document.getElementById(id);
    } else {
        console.log("The textarea already exists :3");
    }
    console.log(existsTextarea);
    existsTextarea.value = text;
    existsTextarea.select();

    try {
        var status = document.execCommand('copy');
        if (!status) {
            console.error("Cannot copy text");
        } else {
            console.log("The text is now on the clipboard");
        }
    } catch (err) {
        console.log('Unable to copy.');
    }
};

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Storage = __webpack_require__(0);
var storage = new Storage();
var copy = __webpack_require__(1);

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
            $(document.getElementById("image-list")).append('<div class="callout small image-url" data-closable data-url="' + x.link + '">\
            <p><img src="https://i.imgur.com/' + x.id + '.jpg" class="preview"> <span class="link">' + x.link + '</span><button class="copy-clipboard" id="' + x.id + '-copy">Copy</button></p>\
            <button class="close-button" aria-label="Dismiss alert" type="button"  id="' + x.id + '-close" data-close>\
            <span aria-hidden="true">&times;</span>\
            </button>\
        </div>');
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

browser.storage.local.get('firefox-uploader-auto-copy').then(function (value) {
    document.getElementById('clipboard-switch').checked = value['firefox-uploader-auto-copy'];
});

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}
document.addEventListener('click', function (e) {
    if (hasClass(e.target, 'close-button')) {
        console.log(e.target.id);
        storage.change(e.target.id.split("-close")[0], { "viewable": false });
        //storage.remove(e.target.id.split("-close")[0]);
    }
    if (hasClass(e.target, 'copy-clipboard')) {
        console.log(e.target.id.split("-copy")[0]);
        var link = "https://i.imgur.com/" + e.target.id.split("-copy")[0] + ".jpg";
        copy.setCopy(link);
    }
    if (hasClass(e.target, 'clear-all')) {
        //storage.removeAll();

        var link = document.querySelectorAll(".image-url");
        var manipulateList = [];
        for (var i = 0; i < link.length; i++) {
            console.log(link[i].querySelector(".close-button").id);
            manipulateList.push(link[i].querySelector(".close-button").id.split("-close")[0]);
            link[i].parentNode.removeChild(link[i]);
        }
        storage.change(manipulateList, { "viewable": false });
    }
}, false);

document.getElementById('clipboard-switch').addEventListener('change', function (e) {
    console.log(e.target.checked);
    browser.storage.local.set({ 'firefox-uploader-auto-copy': e.target.checked });
});

document.addEventListener('mouseover', function (e) {
    if (hasClass(e.target, 'preview')) {
        console.log(e.pageX);
        console.log(e.pageY);
        console.log(e.target.attributes);
        var viewer = $(document.querySelector("div.viewer"));
        viewer.show().css({
            left: "100px",
            top: e.pageY - 30
        });

        viewer.children("img").attr("src", e.target.getAttribute("src"));
    }
}, false);

document.addEventListener('mouseout', function (e) {
    if (hasClass(e.target, 'preview')) {
        $(document.querySelector("div.viewer")).hide();
    }
}, false);

document.querySelector("#add-image").addEventListener('click', function () {

    var createData = {
        type: "detached_panel",
        titlePreface: "Upload Image",
        url: "../templates/panel.html",
        width: 400,
        height: 200,
        left: 100,
        allowScriptsToClose: true
    };
    var creating = browser.windows.create(createData);
    console.log("test");
});

document.querySelector("#options").addEventListener('click', function () {
    browser.tabs.create({
        url: "settings/options.html"
    });
});

/***/ })
/******/ ]);
//# sourceMappingURL=popup.bundle.js.map