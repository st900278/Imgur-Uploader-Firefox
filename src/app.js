browser.storage.local.get('imgur').then((value) =>{
    console.log(value);
    for(let x of value['imgur'].reverse()){
        $(document.getElementById("image-list")).append('<div class="callout small" data-closable >\
            <p>'+x.link+'</p>\
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
        // .bu clicked
        // Do your thing
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
