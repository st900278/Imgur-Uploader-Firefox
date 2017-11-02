
//uploader.upload('/test/cat.jpg');

browser.storage.local.get('imgur').then((value) =>{
    console.log(value);
    for(let x of value['imgur'].reverse()){
        var trNode = document.createElement("tr");
        var tdNode = document.createElement("td");
        var textNode = document.createTextNode(x.link);
        tdNode.appendChild(textNode);
        trNode.appendChild(tdNode);
        document.getElementById("image-list").appendChild(trNode);
    }


});

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
