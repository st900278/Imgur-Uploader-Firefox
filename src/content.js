var copy = require("./copy.js");

console.log("test");
browser.runtime.onMessage.addListener(request => {
    console.log(request);
    copy.setCopy(request.link);
});
