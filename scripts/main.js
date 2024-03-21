window.files = [];

const onFirstInput = (e) => {
    let files = document.querySelector(".upload__input").files;
    let dropbox = document.querySelector(".upload__dropbox");
    console.log(files);
    for (let elem of files) {
        window.files.push(elem);
    }
    dropbox.classList.add("upload__dropbox-disabled");
    initTable();
}

const inner_text = `
                    <h5 class="upload__card__title">Выпуск N</h5>
                    <a href="#" class="upload__card__button">
                        <img class="image-fit" src="images/edit-button.svg">
                    </a>
                    <a href="#" class="upload__card__button">
                        <img class="image-fit" src="images/delete-button.svg">
                    </a>
                `

const createFile = (elem) => {
    let card = document.createElement("div");
    card.className = "upload__card";
    let thumbnail_div = document.createElement("div");
    thumbnail_div.className = "upload__card__thumbnail";
    let thumbnail = document.createElement("img")
    thumbnail.className = "image-fit";
    thumbnail.src = URL.createObjectURL(elem);
    thumbnail_div.append(thumbnail);
    card.append(thumbnail_div);
    let title = document.createElement("div");
    title.className = "upload__card__title-segment";
    title.innerHTML = inner_text;
    card.append(title);
    return card;
}

const initTable = () => {
    let field = document.querySelector(".upload__field");
    field.classList.remove("upload__field-disabled");
    let list = document.querySelector(".upload__list");
    for (let elem of window.files) {
        list.append(createFile(elem));
    }
}

const handleInnerInput = () => {
    let list = document.querySelector(".upload__list");
    let files = document.querySelector(".upload__button-add__input").files;
    for (let elem of files) {
        window.files.push(elem);
        list.append(createFile(elem));
    }
}

const init = () => {
    let input = document.querySelector(".upload__input");
    let add = document.querySelector(".upload__button-add__input");
    input.addEventListener("change", onFirstInput);
    add.addEventListener("change", handleInnerInput);
}


init();