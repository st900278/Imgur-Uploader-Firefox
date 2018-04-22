let href = location.href;
if(href.indexOf("state=FirefoxAddonAuth") > -1){
    let infoStr = href.split("state=FirefoxAddonAuth#")[1].split("&");
    let info = {"task": "auth"};
    infoStr.forEach(item => {
        let [key, value] = item.split("=");
        info[key] = value;
    });
    console.log(info);
    browser.runtime.sendMessage(info).then(()=>{
        console.log("success");
    }, () => {
        console.log("failed");
    });
}
