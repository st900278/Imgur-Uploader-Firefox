module.exports.setCopy = function(text){
    var id = "clipboard-textarea-hidden-id";
    var existsTextarea = document.getElementById(id);

    if(!existsTextarea){
        console.log("Creating textarea");
        var textarea = document.createElement("textarea");
        textarea.id = id;
        textarea.style.position = 'fixed';
        textarea.style.top = -100;
        textarea.style.left = -100;
        textarea.style.width = '1px';
        textarea.style.height = '1px';
        textarea.style.padding = 0;
        textarea.style.border = 'none';
        textarea.style.outline = 'none';
        textarea.style.boxShadow = 'none';
        textarea.style.background = 'transparent';
        document.querySelector("#image-list").appendChild(textarea);

        existsTextarea = document.getElementById(id);
    }else{
        console.log("The textarea already exists :3")
    }
    console.log(existsTextarea);
    existsTextarea.value = text;
    existsTextarea.select();

    try {
        var status = document.execCommand('copy');
        if(!status){
            console.error("Cannot copy text");
        }else{
            console.log("The text is now on the clipboard");
        }
    } catch (err) {
        console.log('Unable to copy.');
    }
}
