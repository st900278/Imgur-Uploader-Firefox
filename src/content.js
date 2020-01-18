const copy = require("./copy.js");

browser.runtime.onMessage.addListener(request => {
    console.log(request);
    copy.setCopy(request.link);
});
