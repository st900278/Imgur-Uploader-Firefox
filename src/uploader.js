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
                resolve(event.target.result.split("base64,")[1]);
            };

            reader.onerror = () => {
                return reject(this);
            };

            reader.readAsDataURL(image);

        })
    }

    uploadToImgur(file){
        var that = this;
        return new Promise((resolve, reject) => {
            console.log(this);
            var options = {
                url: "https://api.imgur.com/3/image",
                headers: {
                    authorization: "Client-ID " + that.clientID
                },
                json: {
                    image: file
                }

            };
            console.log(options);
            request.post(options, function (error, res, body) {
                console.log(body.data);
                if(body.data.error){
                    reject(body.data);
                }
                else{
                    resolve(body.data);
                }
            });
        });
    }

    uploader(image) {
        return this.imageReader(image).then(this.uploadToImgur.bind(this));
    }

}
