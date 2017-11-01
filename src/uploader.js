var request = require("browser-request");
module.exports = class Uploader {
  constructor(id = "a6bebdd6a51f656", secret = "e214c0bd81a3d82e1bdb2af5d86ac9db04851505") {
    this.clientID = id;
    this.clientSecret = secret;
  }


  upload(image) {
    var reader = new FileReader();
    var that = this;
    console.log("test");
    reader.onload = function(e) {
      var dataURL = e.target.result;
      console.log(dataURL);
      var options = {
        url: "https://api.imgur.com/3/image",
        headers: {
          authorization: "Client-ID " + that.clientID
        },
        json: {
          image: dataURL.split("base64,")[1]
        }

      };
      console.log(options);
      request.post(options, function(error, res, body) {
          console.log(body.data);
        return body.data.link;
      });

    }

    reader.readAsDataURL(image);


  }

}
