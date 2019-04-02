var Storage = require("./storage.js");
var storage = new Storage();
var copy = require("./copy.js");

browser.storage.local.get('firefox-uploader-imgur').then((value) =>{
    console.log(value);
    for(let x of value['firefox-uploader-imgur'].reverse()){
        console.log(x);
        if(x == undefined || x.link == undefined || x.viewable == false){
            continue;
        }
        $(document.getElementById("image-list")).append('<div class="callout small image-url" data-closable data-url="'+x.link+'">\
            <p><img src="https://i.imgur.com/'+x.id+'.jpg" class="preview"> <span class="link">'+x.link+'</span><button class="copy-clipboard" id="'+x.link+'-copy">Copy</button></p>\
            <button class="close-button" aria-label="Dismiss alert" type="button"  id="'+x.id+'-close" data-close>\
            <span aria-hidden="true" class="close-button-bubble">&times;</span>\
            </button>\
        </div>');

    }
});

browser.storage.local.get('firefox-uploader-auto-copy').then((value) =>{
    document.getElementById('clipboard-switch').checked = value['firefox-uploader-auto-copy'];
});

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}
document.addEventListener('click', function (e) {
    if (hasClass(e.target, 'close-button')) {
        console.log(e.target.id);
        storage.change(e.target.id.split("-close")[0], {"viewable": false});
        //storage.remove(e.target.id.split("-close")[0]);
    }
    if(hasClass(e.target, 'close-button-bubble')){
        console.log(e.target.id);
        storage.change(e.target.parentNode.id.split("-close")[0], {"viewable": false});
    }
    if(hasClass(e.target, 'copy-clipboard')){
        //var link = "https://i.imgur.com/"+e.target.id.split("-copy")[0]+".jpg";
        var link = e.target.id.split("-copy")[0];
        copy.setCopy(link);
    }
    if (hasClass(e.target, 'clear-all')){
        //storage.removeAll();

        var link = document.querySelectorAll(".image-url");
        var manipulateList = []
        for(let i = 0;i<link.length;i++){
            console.log(link[i].querySelector(".close-button").id);
            manipulateList.push(link[i].querySelector(".close-button").id.split("-close")[0]);
            link[i].parentNode.removeChild(link[i]);
        }
        storage.change(manipulateList, {"viewable": false});
    }
}, false);

document.getElementById('clipboard-switch').addEventListener('change', (e) => {
    console.log(e.target.checked);
    browser.storage.local.set({'firefox-uploader-auto-copy': e.target.checked});
});

document.addEventListener('mouseover', function (e) {
    if (hasClass(e.target, 'preview')) {
        console.log(e.pageX);
        console.log(e.pageY);
        console.log(e.target.attributes);
        var viewer = $(document.querySelector("div.viewer"));
        viewer.show().css({
            left: "100px",
            top: e.pageY-30
        });

        viewer.children("img").attr("src", e.target.getAttribute("src"));


    }
}, false);

document.addEventListener('mouseout', function (e) {
    if (hasClass(e.target, 'preview')) {
        $(document.querySelector("div.viewer")).hide();

    }
}, false);

document.querySelector("#add-image").addEventListener('click', function () {

    var createData = {
        type: "detached_panel",
        titlePreface: "Upload Image",
        url: "../templates/panel.html",
        width: 400,
        height: 200,
        left:100,
        allowScriptsToClose: true
    };
    var creating = browser.windows.create(createData);
    console.log("test");
});

document.querySelector("#options").addEventListener('click', function(){
  browser.tabs.create({
    url:"settings/options.html"
  })

})
