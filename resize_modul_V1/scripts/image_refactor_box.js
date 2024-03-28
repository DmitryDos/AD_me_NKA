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
    const crop_button = document.querySelector(".download_crop");
    const canvas = document.querySelector('.canvas_crop');

    crop_button.addEventListener("click", () => {
        canvas.width = 500;
        canvas.height = 500;
        let context = canvas.getContext('2d');
        const sourceX = (initImageWidth / (2) - imagePosX / zoom - 250 / zoom);
        const sourceY = (initImageHeight / (2) - imagePosY / zoom - 250 / zoom);
        const sourceWidth = 500 / zoom;
        const sourceHeight = 500 / zoom;
        const destWidth = 500;
        const destHeight = 500;
        const destX = 0;
        const destY = 0;
        context.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    });
    canvas.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'filename.png';
        link.href = document.querySelector('.canvas_crop').toDataURL()
        link.click();
    })
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

            img = new Image;
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

let initImageWidth;
let initImageHeight;
let imageWidth;
let imageHeight;
let img
initialisation();