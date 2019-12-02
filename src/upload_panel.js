const Uploader = require("./imgur.js");
const Storage = require("./storage.js");

const uploader = new Uploader();
const storage = new Storage();

function getExtension(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
}

function isImage(filename) {
    const ext = getExtension(filename);
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
    document.querySelector("#add-image").removeEventListener('drop', uploadFile, false);
    document.querySelector("#add-file").removeEventListener('change', uploadFile, false);
}

function uploadFile(e) {
    e.stopPropagation();
    e.preventDefault();
    const files = e.target.files || e.dataTransfer.files;
    if (isImage(files[0].name)) {
        removeEvent();
        document.querySelector("#drag-icon").setAttribute("src", "../build/image/loading.png");
        console.log(document.querySelector("#drag-icon").getAttribute("src"));
        browser.runtime.sendMessage({
            task: "upload",
            file: files[0]
        }).then((msg) => {
            if (msg.success == true) {
                const winId = browser.windows.WINDOW_ID_CURRENT;
                const removing = browser.windows.remove(winId);
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
        task: "upload",
        url: url
    }).then((msg) => {
        if (msg.success == true) {
            const winId = browser.windows.WINDOW_ID_CURRENT;
            const removing = browser.windows.remove(winId);
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
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") == -1) continue;
        console.log("test");
        const blob = items[i].getAsFile();

        const mycanvas = document.createElement("canvas");
        const ctx = mycanvas.getContext('2d');
        const img = new Image();
        img.onload = function () {
            mycanvas.width = this.width;
            mycanvas.height = this.height;
            ctx.drawImage(img, 0, 0);
            console.log(mycanvas.toDataURL());
            uploadUrl(mycanvas.toDataURL());
        };

        const URLObj = window.URL || window.webkitURL;

        img.src = URLObj.createObjectURL(blob);
    }
});
