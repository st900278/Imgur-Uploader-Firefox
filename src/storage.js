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
        return new Promise((resolve, reject)=>{
            var checkStorage = browser.storage.local.get("imgur").then((obj) => {
                var send = obj['imgur'];
                console.log(image);
                send.push(image);
                console.log(send);
                browser.storage.local.set({
                    'imgur': send
                }).then(()=>{
                    resolve("test");
                });
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
