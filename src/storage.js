module.exports = class Storage {
    constructor() {
        browser.storage.local.get("firefox-uploader-imgur").then((obj) => {
            if (Object.getOwnPropertyNames(obj).length == 0) {
                console.log("test");
                browser.storage.local.set({
                    'firefox-uploader-imgur': []
                });
            }
        });

    }

    add(image) {
        return new Promise((resolve, reject) => {
            var checkStorage = browser.storage.local.get("firefox-uploader-imgur").then((obj) => {
                var send = obj['firefox-uploader-imgur'];

                image['viewable'] = true;
                console.log("testesestestestestestestestestestestestestestestestesttset");
                console.log(image);
                send.push(image);
                console.log(send);
                browser.storage.local.set({
                    'firefox-uploader-imgur': send
                }).then(() => {
                    resolve("test");
                });
            });
        });

    }

    remove(imageId) {
        var checkStorage = browser.storage.local.get("firefox-uploader-imgur").then((obj) => {
            var send = [];
            for (let img of obj['firefox-uploader-imgur']) {
                if (img.id != imageId) {
                    send.push(img);
                }
            }
            browser.storage.local.set({
                'firefox-uploader-imgur': send
            });
        });
    }
    change(imageId, status) {
        if(!imageId instanceof Array){
          imageId = [imageId];
        }
        var checkStorage = browser.storage.local.get("firefox-uploader-imgur").then((obj) => {
            var send = [];
            for (let img of obj['firefox-uploader-imgur']) {
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
            browser.storage.local.set({
                'firefox-uploader-imgur': send
            });
        });

    }
    removeAll() {
        browser.storage.local.set({
            'firefox-uploader-imgur': []
        })
    }
}
