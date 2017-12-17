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

browser.storage.local.get('firefox-uploader-imgur').then((value) =>{
    console.log(value);
    for(let x of value['firefox-uploader-imgur'].reverse()){
        console.log(x);
        if(x == undefined || x.link == undefined || x.viewable == false){
            continue;
        }
        $(document.getElementById("image-list")).append('<div class="callout small image-url" data-closable data-url="'+x.link+'">\
            <p><img src="https://i.imgur.com/'+x.id+'.jpg" class="preview"> <span class="link">'+x.link+'</span><button class="copy-clipboard" id="'+x.id+'-copy">Copy</button></p>\
            <button class="close-button" aria-label="Dismiss alert" type="button"  id="'+x.id+'-close" data-close>\
            <span aria-hidden="true">&times;</span>\
            </button>\
        </div>');

    }
});
