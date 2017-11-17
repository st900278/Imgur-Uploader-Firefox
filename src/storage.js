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
        return new Promise((resolve, reject)=>{
            var checkStorage = browser.storage.local.get("firefox-uploader-imgur").then((obj) => {
                var send = obj['firefox-uploader-imgur'];
                console.log(image);
                send.push(image);
                console.log(send);
                browser.storage.local.set({
                    'firefox-uploader-imgur': send
                }).then(()=>{
                    resolve("test");
                });
            });
        });


    }

    remove(imageId) {
        var checkStorage = browser.storage.local.get("firefox-uploader-imgur").then((obj) => {
            var send = [];
            for(let img of obj['firefox-uploader-imgur']){
                if(img.id != imageId){
                    send.push(img);
                }
            }
            browser.storage.local.set({
                'firefox-uploader-imgur': send
            });
        });
    }

}
