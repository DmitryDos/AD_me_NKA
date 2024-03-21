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
    let field = document.querySelector(".upload__field");
    field.classList.remove("upload__field-disabled");
    let list = document.querySelector(".upload__list");
    for (let elem of window.files) {
        let file = document.createElement("div");
        file.className = "upload__elem";
        file.innerText = elem.name;
        list.append(file);
    }
}

const init = () => {
    let input = document.querySelector(".upload__input");
    input.addEventListener("change", onFirstInput);
}


init();