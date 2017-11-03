module.exports = class Storage {
    constructor() {
        browser.storage.local.get("imgur").then((obj) => {
            if (Object.getOwnPropertyNames(obj).length == 0) {
                console.log("test");
                browser.storage.local.set({
                    'imgur': []
                });
            }
        })

    }

    add(image) {
        var checkStorage = browser.storage.local.get("imgur").then((obj) => {
            var send = obj['imgur'];

            send.push(image);
            browser.storage.local.set({
                'imgur': send
            });
        });

    }

    remove(imageId) {
        var checkStorage = browser.storage.local.get("imgur").then((obj) => {
            var send = [];
            for(let img of obj['imgur']){
                if(img.id != imageId){
                    send.push(img);
                }
            }
            browser.storage.local.set({
                'imgur': send
            });
        });
    }

}
