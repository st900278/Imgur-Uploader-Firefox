var Uploader = require("./imgur.js");
var Storage = require("./storage.js");
var copy = require("./copy.js");

var uploader = new Uploader();
var storage = new Storage();
browser.browserAction.setIcon({
    path: "../icons/favicon.png"
});

function onCreated() {
    if (browser.runtime.lastError) {
        console.log("error creating item:" + browser.runtime.lastError);
    } else {
        console.log("item created successfully");
    }
}

browser.storage.onChanged.addListener((changes, area) => {
    if (typeof changes['firefox-uploader-client-id'] !== "undefined") {
        uploader.update();
    }
});

function uploadSuccessNotification() {
    browser.notifications.create("Imgur Uploader", {
        "type": "basic",
        "title": "Imgur Uploader",
        "message": "Upload successful!",
        "iconUrl": "../../icons/favicon.png"
    });
}

function uploadFailNotification() {

    browser.notifications.create("Imgur Uploader", {
        "type": "basic",
        "title": "Imgur Uploader",
        "message": "Upload Failed",
        "iconUrl": "../../icons/favicon.png"
    });
}

function uploadLocalNotification(){
    browser.notifications.create("Imgur Uploader", {
        "type": "basic",
        "title": "Imgur Uploader",
        "message": "Please use 'Add image' to upload local file",
        "iconUrl": "../../icons/favicon.png"
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
        console.log(uploader);
        if (info.srcUrl.startsWith("data")) {
            uploader.uploadToImgur(info.srcUrl.split("base64,")[1]).then((e) => {
                browser.storage.local.get('firefox-uploader-auto-copy').then((value) => {
                    if (value['firefox-uploader-auto-copy'] == true) {
                        browser.tabs.query({
                            currentWindow: true,
                            active: true
                        }).then(result => {
                            console.log(result);
                            browser.tabs.sendMessage(result[0].id, {
                                link: e.link
                            });
                        })
                    }
                });

                storage.add(e);
            }).then(uploadSuccessNotification, uploadFailNotification);
        } else if (info.srcUrl.startsWith("file")) {
            uploadLocalNotification();
        } else {
            uploader.uploadToImgur(info.srcUrl).then((e) => {
                browser.storage.local.get('firefox-uploader-auto-copy').then((value) => {
                    if (value['firefox-uploader-auto-copy'] == true) {
                        browser.tabs.query({
                            currentWindow: true,
                            active: true
                        }).then(result => {
                            console.log(result);
                            browser.tabs.sendMessage(result[0].id, {
                                link: e.link
                            });
                        })
                    }
                });

                storage.add(e);
            }).then(uploadSuccessNotification, uploadFailNotification);
        }
    }

});

function handleMessage(request, sender, res) {
    if(request.task == "upload"){
        if (request.file) {
            res({
                success: true
            });
            uploader.uploader(request.file).then(e => {
                console.log(e);
                browser.storage.local.get('firefox-uploader-auto-copy').then((value) => {
                    if (value['firefox-uploader-auto-copy'] == true) {
                        browser.tabs.query({
                            active: true
                        }).then(result => {
                            console.log(result);
                            browser.tabs.sendMessage(result[0].id, {
                                link: e.link
                            });
                        })
                    }
                });

                storage.add(e);
            }).then(uploadSuccessNotification, uploadFailNotification);
        } else if (request.url) {
            res({
                success: true
            });
            uploader.uploadToImgur(request.url.split("base64,")[1]).then(e => {
                console.log(e);
                storage.add(e);
                browser.storage.local.get('firefox-uploader-auto-copy').then((value) => {
                    console.log("storing");
                    if (value['firefox-uploader-auto-copy'] == true) {
                        browser.tabs.query({
                            active: true
                        }).then(result => {
                            console.log(result);
                            browser.tabs.sendMessage(result[0].id, {
                                link: e.link
                            });
                        })
                    }
                });
            }).then(uploadSuccessNotification, uploadFailNotification);
        }


    }
    else if(request.task == "auth"){
        console.log(request);
        browser.storage.local.set({'firefox-uploader-auth': request}).then(() => {
            res({response: "auth set"});
        })
    }
}

browser.runtime.onMessage.addListener(handleMessage);
