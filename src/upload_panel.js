var Uploader = require("./uploader.js");
var Storage = require("./storage.js");

var uploader = new Uploader();
var storage = new Storage();

document.querySelector("#add-image").addEventListener('click', function () {

});

document.querySelector("#add-image").addEventListener('dragover', function(e){
    e.stopPropagation();
    e.preventDefault();
    this.style.background = "grey";
}, false);

document.querySelector("#add-image").addEventListener('dragleave', function(){
    this.style.background = "white";
});

document.querySelector("#add-image").addEventListener('drop', function(e){
    this.style.background = "white";
    e.preventDefault();
    var files = e.target.files || e.dataTransfer.files;
    uploader.uploader(files[0]).then(storage.add).then(()=>{
        window.close();
    });

}, false);

document.querySelector("#click-image").addEventListener('click', function(){

    document.querySelector("#add-file").click();
    return false;
}, false);

document.querySelector("#add-file").addEventListener('change', function (e) {
    console.log(this.files[0]);
    if (this.files[0]) {
        uploader.uploader(this.files[0]).then(storage.add).then(()=>{
            window.close();
        });
    } else {
        console.log("ファイルが未選択");
    }
});
