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

const createFile = (elem) => {
    let file = document.createElement("div");
    file.className = "upload__elem";
    file.innerText = elem.name;
    return file;
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