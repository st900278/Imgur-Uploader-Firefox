var Storage = require("./storage.js");
var storage = new Storage();

browser.storage.local.get('imgur').then((value) =>{
    console.log(value);
    for(let x of value['imgur'].reverse()){
        $(document.getElementById("image-list")).append('<div class="callout small image-url" data-closable >\
            <p><img src="https://i.imgur.com/'+x.id+'.jpg" class="preview">'+x.link+'</p>\
            <button class="close-button" aria-label="Dismiss alert" type="button"  id="'+x.id+'" data-close>\
            <span aria-hidden="true">&times;</span>\
            </button>\
        </div>');
    }
});

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}

document.addEventListener('click', function (e) {
    if (hasClass(e.target, 'close-button')) {
        console.log(e.target.id);
        storage.remove(e.target.id);
    }
}, false);

document.addEventListener('mouseover', function (e) {
    if (hasClass(e.target, 'preview')) {
        console.log(e.pageX);
        console.log(e.pageY);
        var viewer = $(document.querySelector("div.viewer"));
        viewer.show().css({
            left: "100px",
            top: e.pageY-30
        });
        viewer.children("img").attr("src", "https://i.imgur.com/qebpT9M.jpg");


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
        url: "../templates/panel.html",
        width: 250,
        height: 100
    };
    var creating = browser.windows.create(createData);
    console.log("test");
});
