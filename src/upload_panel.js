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

function removeEvent() {
    document.querySelector("#add-image").removeEventListener('drop', uploadEvent, false);
    document.querySelector("#add-file").removeEventListener('change', uploadEvent, false);
}

function uploadFile(e) {
    e.stopPropagation();
    e.preventDefault();
    var files = e.target.files || e.dataTransfer.files;
    if (isImage(files[0].name)) {
        removeEvent();
        document.querySelector("#drag-icon").setAttribute("src", "../build/image/loading.png");
        console.log(document.querySelector("#drag-icon").getAttribute("src"));
        browser.runtime.sendMessage({
            file: files[0]
        }).then((msg) => {
            if (msg.success == true) {
                var winId = browser.windows.WINDOW_ID_CURRENT;
                var removing = browser.windows.remove(winId);
            }
        });
    } else {
        document.querySelector(".error").innerHTML = "Invalid file format. Please try again";
    }

}

function uploadUrl(url){
    document.querySelector("#drag-icon").setAttribute("src", "../build/image/loading.png");
    console.log(document.querySelector("#drag-icon").getAttribute("src"));
    browser.runtime.sendMessage({
        url: url
    }).then((msg) => {
        if (msg.success == true) {
            var winId = browser.windows.WINDOW_ID_CURRENT;
            var removing = browser.windows.remove(winId);
        }
    });
}

document.querySelector("#add-image").addEventListener('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
    this.style.background = "grey";
}, false);

document.querySelector("#add-image").addEventListener('dragleave', function () {
    this.style.background = "white";
});

document.querySelector("#add-image").addEventListener('drop', function (e) {
    this.style.background = "white";
}, false);

document.querySelector("#add-image").addEventListener('drop', uploadFile, false);

document.querySelector("#click-image").addEventListener('click', function () {

    document.querySelector("#add-file").click();
    return false;
}, false);

document.querySelector("#add-file").addEventListener('change', uploadFile, false);

window.addEventListener("paste", (e) => {
    var items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        console.log(items[i]);
        if (items[i].type.indexOf("image") == -1) continue;
        console.log("test");
        var blob = items[i].getAsFile();

        var mycanvas = document.createElement("canvas");
        var ctx = mycanvas.getContext('2d');
        var img = new Image();
        img.onload = function () {
            mycanvas.width = this.width;
            mycanvas.height = this.height;
            ctx.drawImage(img, 0, 0);
            console.log(mycanvas.toDataURL());
            uploadUrl(mycanvas.toDataURL());
        };

        var URLObj = window.URL || window.webkitURL;

        img.src = URLObj.createObjectURL(blob);
    }
});
