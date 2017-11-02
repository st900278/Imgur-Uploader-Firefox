var Uploader = require("./uploader.js");

var uploader = new Uploader();
window.moveTo(0, 0);
document.querySelector("#add-image").addEventListener('click', function () {

    console.log("test");
    document.querySelector("#add-file").click();
});

document.querySelector("#add-file").addEventListener('change', function (e) {
    console.log(this.files[0]);
    if (this.files[0]) {
        uploader.uploader(this.files[0]);
    } else {
        console.log("ファイルが未選択");
    }
});
