
class Uploader{
    construction(){
        this.clientID = "a6bebdd6a51f656";
        this.clientSecret = "e214c0bd81a3d82e1bdb2af5d86ac9db04851505";
    }
    upload(a){
        console.log(a)
    }
}



var uploader = new Uploader()

uploader.upload("test")
