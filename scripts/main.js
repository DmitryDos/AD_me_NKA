const files_ = [];
let modalIndex = 0;

const onFirstInput = (e) => {
    const files = document.querySelector(".upload__input").files;
    const dropbox = document.querySelector(".upload__dropbox");
    console.log(files);
    let count = 0;
    for (let elem of files) {
        files_.push(createFile(elem));
        count++;
    }
    dropbox.classList.add("upload__dropbox-disabled");
    initTable();
}

const createLinks = (index) => {
    let name = "" + (index + 1);
    if (files_[index].name) {
        name = files_[index].name;
    }
    const innerText = `
<a href="#" class="upload__card__button upload__card__button_move-left upload__card__button_move-left-${index}">
    <img class="image-fit" src="images/left-arrow.svg" alt="Передвинуть влево">
</a>
<h5 class="upload__card__title">${name}</h5>
<a href="#" class="upload__card__button upload__card__button_move-right upload__card__button_move-right-${index}">
    <img class="image-fit" src="images/right-arrow.svg" alt="Передвинуть вправо">
</a>
<a href="#" data-hystmodal="#myModal" class="upload__card__button upload__card__button_edit upload__card__button_edit-${index}">
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

const createFile = (file, name = "", description = "") => {
    return {file: file, name: name, description: description};
}

const deleteFile = (index) => {
    files_.splice(index, 1);
    // const card = document.querySelector(".upload__card-" + index);
    // card.remove();
    initTable();
}

const handleSwitching = (index, direction) => {
    if (direction) {
        [files_[index], files_[index + 1]] = [files_[index + 1], files_[index]];
    } else {
        [files_[index], files_[index - 1]] = [files_[index - 1], files_[index]];
    }
    initTable();
}

const handleButtons = (index) => {
    const deleteButton = document.querySelector(".upload__card__button_delete-" + index);
    const editButton = document.querySelector(".upload__card__button_edit-" + index);
    const rightArrow = document.querySelector(".upload__card__button_move-right-" + index);
    const leftArrow = document.querySelector(".upload__card__button_move-left-" + index);
    deleteButton.addEventListener("click", () => deleteFile(index));
    editButton.addEventListener("click", () => handleEditModalOpening(index));
    rightArrow.addEventListener("click", () => handleSwitching(index, 1));
    leftArrow.addEventListener("click", () => handleSwitching(index, 0));
}

const initTable = () => {
    const field = document.querySelector(".upload__field");
    field.classList.remove("upload__field-disabled");
    const cardList = document.querySelector(".upload__list");
    cardList.innerHTML = "";
    let count = 0;
    for (let elem of files_) {
        cardList.append(createFileCard(elem.file, count));
        const currentCount = count;
        handleButtons(currentCount);
        count++;
    }
}

const handleInnerInput = () => {
    const files = document.querySelector(".upload__button-add__input").files;
    for (let elem of files) {
        files_.push(createFile(elem));
    }
    initTable();
}

const handleSaveEdit = () => {
    const textareaName = document.querySelector(".modal__edit__namespace");
    const textareaDescription = document.querySelector(".modal__edit__description");
    const index = modalIndex;
    files_[index].name = textareaName.value;
    files_[index].description = textareaDescription.value;
    initTable();
}

const init = () => {
    const input = document.querySelector(".upload__input");
    const add = document.querySelector(".upload__button-add__input");
    const saveModal = document.querySelector(".modal__edit__button");
    input.addEventListener("change", onFirstInput);
    add.addEventListener("change", handleInnerInput);
    saveModal.addEventListener("click", handleSaveEdit);
}

const handleModalClosing = () => {
    const textareaName = document.querySelector(".modal__edit__namespace");
    const textareaDescription = document.querySelector(".modal__edit__description");
    textareaName.value = "";
    textareaDescription.value = "";
}

const handleEditModalOpening = (index) => {
    const img = document.querySelector(".modal__edit__img");
    img.src = URL.createObjectURL(files_[index].file);
    modalIndex = index;
}

const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    beforeOpen: () => handleModalClosing(),
    // настройки (не обязательно), см. API
});


init();