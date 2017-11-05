var Uploader = require("./uploader.js");
var Storage = require("./storage.js");

var uploader = new Uploader();
var storage = new Storage();

browser.browserAction.setIcon({path: "../icons/favicon.png"});

function onCreated() {
    if (browser.runtime.lastError) {
        console.log("error creating item:" + browser.runtime.lastError);
    } else {
        console.log("item created successfully");
    }
}

function uploadSuccessNotification(){
    browser.notifications.create("Imgur Uploader", {
        "type": "basic",
        "title": "Imgur Uploader",
        "message": "Upload successfully!"
    });
}
function uploadFailNotification(){
    browser.notifications.create("Imgur Uploader", {
        "type": "basic",
        "title": "Imgur Uploader",
        "message": "Upload Failed"
    });
}

browser.menus.create({
    id: "image-select",
    type: "normal",
    title: "Upload to Imgur",
    contexts: ["all"],
    checked: false
}, onCreated);

browser.menus.onClicked.addListener(function (info, tab) {
    if (info.mediaType == "image") {

        console.log(info.srcUrl);
        console.log(info);
        if(info.srcUrl.startsWith("data")){
            uploader.uploadToImgur(info.srcUrl.split("base64,")[1]).then(storage.add).then(uploadSuccessNotification, uploadFailNotification);
        }
        else{
            uploader.uploadToImgur(info.srcUrl).then(storage.add).then(uploadSuccessNotification, uploadFailNotification);
        }
    }
});
