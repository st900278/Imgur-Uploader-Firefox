$(document).foundation();
const Uploader = require("./../imgur.js");
const Storage = require("./../storage.js");
// fill in default value
const uploader = new Uploader();
const storage = new Storage();

browser.storage.local.get("firefox-uploader-client-id").then(result => {
    if(typeof result['firefox-uploader-client-id'] !== "undefined"){
        document.querySelector("#client-id").value = result['firefox-uploader-client-id'];
    }
});

/*
document.querySelector("#save-id").addEventListener('click', function(){
    var clientID = document.querySelector("#client-id").value;
    browser.storage.local.set({"firefox-uploader-client-id": clientID});
});
*/

browser.storage.local.get("firefox-uploader-auth").then((item)=>{
    let info = item['firefox-uploader-auth'];
    if(info !== undefined && info['access_token'] !== undefined){
        $(document.querySelector("#account")).append('<h4 id="username">'+info['account_username']+'</h4>');
        $(document.querySelector("#login-btn")).append('<button type="button" class="button warning" id="logout">Logout</button>');
        document.querySelector("#logout").addEventListener('click', function(){
            browser.storage.local.set({"firefox-uploader-auth":{}});
            location.reload();
        })
    }
    else{
        $(document.querySelector("#account")).append('<button class="success button" id="auth" >Click to Login</button>');
        document.querySelector("#auth").addEventListener('click', function(){
            browser.storage.local.set({"firefox-uploader-auth":{}});
            window.open("https://api.imgur.com/oauth2/authorize?client_id=d4488c5d2f5c917&response_type=token&state=FirefoxAddonAuth", '_blank');
            const getAuth = setInterval(() => {
                browser.storage.local.get("firefox-uploader-auth").then((item) => {
                    console.log(item['firefox-uploader-auth']);
                    if (item['firefox-uploader-auth']['access_token'] !== undefined) {
                        location.reload();
                    }

                }, () => {
                });
            }, 3000);
        });
    }
});




browser.storage.local.get('firefox-uploader-auto-copy').then((value) =>{
    document.getElementById('clipboard-switch').checked = value['firefox-uploader-auto-copy'];
});

document.getElementById('clipboard-switch').addEventListener('change', (e) => {
    console.log(e.target.checked);
    browser.storage.local.set({'firefox-uploader-auto-copy': e.target.checked});
});
