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

const initTable = () => {
    let table = document.querySelector(".upload__table");
    table.classList.remove("upload__table-disabled");
    for (let elem of window.files) {
        let file = document.createElement("div");
        file.className = "upload__elem";
        file.innerText = elem.name;
        table.append(file);
    }
}

const init = () => {
    let input = document.querySelector(".upload__input");
    input.addEventListener("change", onFirstInput);
}


init();