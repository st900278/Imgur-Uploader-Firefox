$(document).foundation();

// fill in default value
browser.storage.local.get("firefox-uploader-client-id").then(result => {
    if(typeof result['firefox-uploader-client-id'] !== "undefined"){
        document.querySelector("#client-id").value = result['firefox-uploader-client-id'];
    }
});


document.querySelector("#save1").addEventListener('click', function(){
    var clientID = document.querySelector("#client-id").value;
    browser.storage.local.set({"firefox-uploader-client-id": clientID});
});


browser.storage.local.get('firefox-uploader-auto-copy').then((value) =>{
    document.getElementById('clipboard-switch').checked = value['firefox-uploader-auto-copy'];
});

document.getElementById('clipboard-switch').addEventListener('change', (e) => {
    console.log(e.target.checked);
    browser.storage.local.set({'firefox-uploader-auto-copy': e.target.checked});
});
