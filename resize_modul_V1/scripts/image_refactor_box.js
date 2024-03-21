function imageRefactorModule() {
    let backImage = document.querySelector(".image_refactor_file_back");
    let frontImage = document.querySelector(".image_refactor_file_front");

    //let imageBox = document.querySelector(".image_refactor_box");
    let mousePosX, mousePosY;
    let imagePosX = 0, imagePosY = 0;
    const moveImage = function (event) {
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

    const imageClickDown = function (event) {
        mousePosX = event.clientX - imagePosX;
        mousePosY = event.clientY - imagePosY;

        console.log(mousePosX);
        document.addEventListener("mousemove", moveImage, event);
    }

    const imageClickUp = function () {
        document.removeEventListener("mousemove", moveImage);
    }

    let zoom = 1;
    const imageScroll = function (event) {
        zoom -= event.deltaY / 2400;
        imageWidth = initImageWidth * zoom;
        imageHeight = initImageHeight * zoom;
        backImage.style.backgroundSize = `${imageWidth}px`;
        frontImage.style.backgroundSize = backImage.style.backgroundSize;
        console.log(event.deltaY);
    }
    backImage.style.backgroundSize = `${initImageWidth}px`;
    frontImage.style.backgroundSize = `${initImageWidth}px`;
    backImage.style.backgroundPosition = "50% 50%";
    frontImage.style.backgroundPosition = "50% 50%";


    if ('onwheel' in document) {
        // IE9+, FF17+, Ch31+
        backImage.addEventListener("wheel", imageScroll);
    } else if ('onmousewheel' in document) {
        // устаревший вариант события
        backImage.addEventListener("mousewheel", imageScroll);
    } else {
        // Firefox < 17
        backImage.addEventListener("MozMousePixelScroll", imageScroll);
    }
    backImage.addEventListener("mousedown", imageClickDown);
    document.addEventListener("mouseup", imageClickUp);
}

function imageUpload() {
    let fileInput = document.querySelector(".image_upload_input");
    let imageRefactorPage = document.querySelector(".page_image_refactor");

    let fileReader = new FileReader();

    const fileChange = function () {
        imageRefactorPage.classList.remove("page_disable");

        fileReader.readAsDataURL(fileInput.files[0]);
        fileReader.addEventListener("load", () => {
            document.querySelector(".image_refactor_file_back").style.backgroundImage = "url('" + fileReader.result + "')";
            document.querySelector(".image_refactor_file_front").style.backgroundImage = "url('" + fileReader.result + "')";

            let img = new Image;
            img.src = fileReader.result;
            console.log(img.width + " " + img.height);

            imageWidth = img.width;
            initImageWidth = imageWidth;
            imageHeight = img.height;
            initImageHeight = imageHeight;
        });
    };

    fileInput.addEventListener("change", fileChange);
}

function initialisation() {
    imageRefactorModule();
    imageUpload();
}

var initImageWidth;
var initImageHeight;
var imageWidth;
var imageHeight;
initialisation();