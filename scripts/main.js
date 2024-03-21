const files_ = [];

const onFirstInput = (e) => {
    const files = document.querySelector(".upload__input").files;
    const dropbox = document.querySelector(".upload__dropbox");
    console.log(files);
    for (let elem of files) {
        files_.push(elem);
    }
    dropbox.classList.add("upload__dropbox-disabled");
    initTable();
}

const INNER_TEXT = `
<h5 class="upload__card__title">Выпуск N</h5>
<a href="#" class="upload__card__button">
    <img class="image-fit" src="images/edit-button.svg" alt="Изменить"/>
</a>
<a href="#" class="upload__card__button">
    <img class="image-fit" src="images/delete-button.svg" alt="Удалить">
</a>`;

const createFileCard = (elem) => {
    const card = document.createElement("div");
    card.className = "upload__card";
    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.className = "upload__card__thumbnail";
    const thumbnail = document.createElement("img")
    thumbnail.className = "image-fit";
    thumbnail.src = URL.createObjectURL(elem);
    const title = document.createElement("div");
    title.className = "upload__card__title-segment";
    title.innerHTML = INNER_TEXT;
    thumbnailDiv.append(thumbnail);
    card.append(thumbnailDiv);
    card.append(title);
    return card;
}

const initTable = () => {
    const field = document.querySelector(".upload__field");
    field.classList.remove("upload__field-disabled");
    const cardList = document.querySelector(".upload__list");
    for (let elem of files_) {
        cardList.append(createFileCard(elem));
    }
}

const handleInnerInput = () => {
    const cardList = document.querySelector(".upload__list");
    const files = document.querySelector(".upload__button-add__input").files;
    for (let elem of files) {
        files_.push(elem);
        cardList.append(createFileCard(elem));
    }
}

const init = () => {
    const input = document.querySelector(".upload__input");
    const add = document.querySelector(".upload__button-add__input");
    input.addEventListener("change", onFirstInput);
    add.addEventListener("change", handleInnerInput);
}


init();