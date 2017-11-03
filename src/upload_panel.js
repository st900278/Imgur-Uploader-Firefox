var Uploader = require("./uploader.js");
var Storage = require("./storage.js");

var uploader = new Uploader();
var storage = new Storage();

document.querySelector("#add-image").addEventListener('click', function () {

    console.log("test");
    document.querySelector("#add-file").click();
});

document.querySelector("#add-file").addEventListener('change', function (e) {
    console.log(this.files[0]);
    if (this.files[0]) {
        uploader.uploader(this.files[0]).then(storage.add);
    } else {
        console.log("ファイルが未選択");
    }
});
