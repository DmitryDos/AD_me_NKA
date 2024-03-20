function imageRefactorModule() {
    let backImage = document.querySelector(".image_refactor_file_back");
    let frontImage = document.querySelector(".image_refactor_file_front");

    let imageBox = document.querySelector(".image_refactor_box");

    let mousePosX, mousePosY;
    let imagePosX = 0, imagePosY = 0;
    const moveImage = function(event) {
        let deltaX = event.clientX;
        let deltaY = event.clientY;

        imagePosX = (deltaX - mousePosX);
        imagePosY = (deltaY - mousePosY);

        if (2 * imagePosX > imageWidth * 0.85) {
            imagePosX = imageWidth * 0.85 / 2;
        } else if (2 * imagePosX < -imageWidth * 0.85) {
            imagePosX = -imageWidth * 0.85 / 2;
        }

        if (2 * imagePosY > imageHeight * 0.85) {
            imagePosY = imageHeight * 0.85 / 2;
        } else if (2 * imagePosY < -imageHeight * 0.85) {
            imagePosY = -imageHeight * 0.85 / 2;
        }

        let posX = "max(100%, min(0%, calc(50% + " + imagePosX + "px)))";
        let posY = "max(100%, min(0%, calc(50% + " + imagePosY + "px)))";

        backImage.style.backgroundPosition = posX + " " + posY;
        frontImage.style.backgroundPosition = posX + " " + posY;

        console.log(imagePosX + " " + imagePosY);
    }

    const imageClickDown = function(event) {
        mousePosX = event.clientX - imagePosX;
        mousePosY = event.clientY - imagePosY;

        console.log(mousePosX);
        document.addEventListener("mousemove", moveImage, event);
    }

    const imageClickUp = function() {
        document.removeEventListener("mousemove", moveImage);
    }

    backImage.style.backgroundPosition = "50% 50%";
    frontImage.style.backgroundPosition = "50% 50%";

    backImage.addEventListener("mousedown", imageClickDown);
    document.addEventListener("mouseup", imageClickUp);
}

function imageUpload() {
    let fileInput = document.querySelector(".image_upload_input");
    let imageRefactorPage = document.querySelector(".page_image_refactor");

    let fileReader = new FileReader();

    const fileChange = function() {
        imageRefactorPage.classList.remove("page_disable"); 

        fileReader.readAsDataURL(fileInput.files[0]);
        fileReader.addEventListener("load", () => {
        document.querySelector(".image_refactor_file_back").style.backgroundImage = "url('" + fileReader.result + "')";
        document.querySelector(".image_refactor_file_front").style.backgroundImage = "url('" + fileReader.result + "')";
        
        let img = new Image;
        img.src = fileReader.result;
        console.log(img.width + " " + img.height);

        imageWidth = img.width;
        imageHeight = img.height;
        });     
    };

    fileInput.addEventListener("change", fileChange);
}

function initialisation() {
    imageRefactorModule();
    imageUpload();
}

var imageWidth;
var imageHeight;
initialisation();