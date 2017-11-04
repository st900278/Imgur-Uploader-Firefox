var Uploader = require("./uploader.js");
var Storage = require("./storage.js");

var uploader = new Uploader();
var storage = new Storage();

function onCreated() {
  if (browser.runtime.lastError) {
    console.log("error creating item:" + browser.runtime.lastError);
  } else {
    console.log("item created successfully");
  }
}

browser.menus.create({
  id: "image-select",
  type: "normal",
  title: "Upload to Imgur",
  contexts: ["all"],
  checked: false
}, onCreated);



browser.menus.onClicked.addListener(function(info, tab) {
  if(info.mediaType == "image"){
      console.log(info.srcUrl);
      console.log(info);
      uploader.uploadToImgur(info.srcUrl).then(storage.add);
  }
});
