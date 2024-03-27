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

const createLinks = (index) => {
    const innerText = `
<h5 class="upload__card__title">Выпуск ${index + 1}</h5>
<a href="#" class="upload__card__button upload__card__button_edit upload__card__button_edit-${index}">
    <img class="image-fit" src="images/edit-button.svg" alt="Изменить"/>
</a>
<a href="#" class="upload__card__button upload__card__button_delete upload__card__button_delete-${index}">
    <img class="image-fit" src="images/delete-button.svg" alt="Удалить">
</a>`;
    const links = document.createElement("div");
    links.className = "upload__card__title-segment";
    links.innerHTML = innerText;
    return links;
}

const createFileCard = (elem, index) => {
    const card = document.createElement("div");
    card.className = `upload__card upload__card-${index}`;
    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.className = "upload__card__thumbnail";
    const thumbnail = document.createElement("img")
    thumbnail.className = "image-fit";
    thumbnail.src = URL.createObjectURL(elem);
    thumbnailDiv.append(thumbnail);
    card.append(thumbnailDiv);
    card.append(createLinks(index));
    return card;
}

const deleteFile = (index) => {
    files_.splice(index, 1);
    // const card = document.querySelector(".upload__card-" + index);
    // card.remove();
    initTable();
}

const initTable = () => {
    const field = document.querySelector(".upload__field");
    field.classList.remove("upload__field-disabled");
    const cardList = document.querySelector(".upload__list");
    cardList.innerHTML = "";
    let count = 0;
    for (let elem of files_) {
        cardList.append(createFileCard(elem, count));
        const deleteButton = document.querySelector(".upload__card__button_delete-" + count);
        const currentCount = count;
        deleteButton.addEventListener("click", () => deleteFile(currentCount));
        count++;
    }
}

const handleInnerInput = () => {
    const files = document.querySelector(".upload__button-add__input").files;
    for (let elem of files) {
        files_.push(elem);
    }
    initTable();
}

const init = () => {
    const input = document.querySelector(".upload__input");
    const add = document.querySelector(".upload__button-add__input");
    input.addEventListener("change", onFirstInput);
    add.addEventListener("change", handleInnerInput);
}


init();