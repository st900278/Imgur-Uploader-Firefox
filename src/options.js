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
        $(document.getElementById("image-list")).append('\
            <div class="cell">\
              <div class="card">\
                <img src="'+x.link+'">\
                <div class="card-section">\
                    <button type="button" class="alert button delete float-right">Delete</button>\
                </div>\
              </div>\
            </div>\
        ');


    }
});

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}
document.addEventListener('click', function (e) {
    if (hasClass(e.target, 'delete')) {
        console.log(e.target);

    }
}, false);
