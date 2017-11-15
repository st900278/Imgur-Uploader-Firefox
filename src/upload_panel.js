var Uploader = require("./uploader.js");
var Storage = require("./storage.js");

var uploader = new Uploader();
var storage = new Storage();

function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'png':
        //etc
        return true;
    }
    return false;
}

function removeEvent(){
    document.querySelector("#add-image").removeEventListener('drop', uploadEvent, false);
    document.querySelector("#add-file").removeEventListener('change', uploadEvent, false);
}

function uploadEvent(e){
    e.stopPropagation();
    e.preventDefault();
    var files = e.target.files || e.dataTransfer.files;
    if(isImage(files[0].name)){
        removeEvent();
        document.querySelector("#drag-icon").setAttribute("src", "../build/image/loading.png");
        console.log(document.querySelector("#drag-icon").getAttribute("src"));
        browser.runtime.sendMessage({
            file: files[0]
        }).then((msg)=>{
            if(msg.success == true){
                var winId = browser.windows.WINDOW_ID_CURRENT;
                var removing = browser.windows.remove(winId);
            }
        });
    }
    else{
        document.querySelector(".error").innerHTML = "Invalid file format. Please try again";
    }

}

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
}, false);

document.querySelector("#add-image").addEventListener('drop', uploadEvent, false);


document.querySelector("#click-image").addEventListener('click', function(){

    document.querySelector("#add-file").click();
    return false;
}, false);

document.querySelector("#add-file").addEventListener('change', uploadEvent, false);
