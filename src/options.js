$(document).foundation();

document.querySelector("#save1").addEventListener('click', function(){
    var clientID = document.querySelector("#client-id").value;
    browser.storage.local.set({"firefox-uploader-client-id": clientID});
});
