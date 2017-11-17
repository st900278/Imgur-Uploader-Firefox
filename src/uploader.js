var request = require("browser-request");
module.exports = class Uploader {
    constructor() {
        browser.storage.local.get("firefox-uploader-client-id").then((result) => {

            if (result['firefox-uploader-client-id'] != "") {
                this.clientID = result['firefox-uploader-client-id'];
            } else {
                this.clientID = "f752792c52f4cdf";
            }
            console.log(this.clientID);
        });
    }
    uuid() {

        var d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

    }
    imageReader(image) {
        let reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = (event) => {
                resolve(event.target.result.split("base64,")[1]);
            };

            reader.onerror = () => {
                return reject(this);
            };

            reader.readAsDataURL(image);

        })
    }

    uploadToImgur(file) {
        var that = this;
        return new Promise((resolve, reject) => {
            console.log(this);
            console.log(that.uuid());
            var options = {
                url: "https://api.imgur.com/3/image",
                headers: {
                    authorization: "Client-ID " + that.uuid() //+ that.clientID
                },
                json: {
                    image: file
                }

            };
            console.log(options);
            request.post(options, function (error, res, body) {
                console.log(body.data);
                if (body.data.error) {
                    reject(body.data);
                } else {
                    resolve(body.data);
                }
            });
        });
    }

    uploader(image) {
        return this.imageReader(image).then(this.uploadToImgur.bind(this));
    }

}
