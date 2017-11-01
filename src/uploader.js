var request = require("browser-request");
module.exports = class Uploader {
  constructor(id = "a6bebdd6a51f656", secret = "e214c0bd81a3d82e1bdb2af5d86ac9db04851505") {
    this.clientID = id;
    this.clientSecret = secret;
  }


  upload(image) {
      console.log("image");
      console.log(image);
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      var tempImg = new Image();
      tempImg.onload = function(){
          canvas.width = tempImg.width;
          canvas.height = tempImg.height;
          ctx.drawImage(tempImg, 0, 0, tempImg.width, tempImg.height);
          console.log(canvas.toDataURL());
      }
      reader.onload = function() {
          var result = reader.result;
      };
      reader.readAsDataURL(image)
      /*
    console.log(image);
    var xhr = new XMLHttpRequest();
    var that = this;
    console.log("test");
    xhr.open("GET", image, true);
    xhr.responseType = "blob";
    xhr.onload = function(e) {
      console.log(this.response);
      var reader = new FileReader();
      reader.onload = function(event) {
        var res = event.target.result;
        console.log(res)
        var options = {
          url: "https://api.imgur.com/3/image",
          headers: {
            authorization: "Client-ID " + that.clientID
          },
          json: {
            image: res.split("data:application/xml;base64,")[1]
          }

        };
        console.log(options);
        request.post(options, function(error, res, body) {
            console.log(body.data);
          return body.data.link;
        });

      }
      var file = this.response;
      reader.readAsDataURL(file)
    };
    xhr.send()
    */

  }

}
