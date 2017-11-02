var request = require("browser-request");
module.exports = class Uploader {
    constructor(id = "a6bebdd6a51f656", secret = "e214c0bd81a3d82e1bdb2af5d86ac9db04851505") {
        this.clientID = id;
        this.clientSecret = secret;
    }

    imageReader(image) {
        let reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = (event) => {
                resolve(event.target.result);
            };

            reader.onerror = () => {
                return reject(this);
            };

            reader.readAsDataURL(image);

        })
    }

    uploadToImgur(base64){
        var that = this;
        return new Promise((resolve, reject) => {
            console.log(this);
            var options = {
                url: "https://api.imgur.com/3/image",
                headers: {
                    authorization: "Client-ID " + that.clientID
                },
                json: {
                    image: base64.split("base64,")[1]
                }

            };
            console.log(options);
            request.post(options, function (error, res, body) {
                resolve(body.data);
            });
        });
    }

    uploader(image) {
        var uploadId = this.imageReader(image).then(this.uploadToImgur.bind(this));
        var checkStorage = browser.storage.local.get("imgur");
        Promise.all([uploadId, checkStorage]).then(([uploadId, storage]) => {
            console.log(storage);
            var send = [];
            if(Object.getOwnPropertyNames(storage).length > 0){
                send = storage['imgur'];
                console.log("not empty");
                console.log(send);
            }
            console.log(send);
            send.push(uploadId);
            //console.log(storage);
            browser.storage.local.set({'imgur': send}).then(value => {
                window.close();
            });
        });
    }

}
