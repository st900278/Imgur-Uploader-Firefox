var Uploader = require("./uploader.js");

var uploader = new Uploader();

//uploader.upload('/test/cat.jpg');


document.querySelector("#add-image").addEventListener('click', function() {
  console.log("test");
  document.querySelector("#add-file").click();
});

document.querySelector("#add-file").addEventListener('change', function() {
  if (this.value) {
    uploader.upload(this.value);
  } else {
    console.log("ファイルが未選択");
  }
});
