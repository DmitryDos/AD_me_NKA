window.files = [];

const FirstInput = (e) => {
    let files = document.getElementById("upload__input").files;
    let dropbox = document.getElementsByClassName("upload__dropbox")[0];
    let table = document.getElementsByClassName("upload__table")[0];
    console.log(files);
    for (let elem of files) {
        window.files.push(elem);
    }
    dropbox.classList.add("upload__dropbox-disabled");
    dropbox.classList.remove("upload__dropbox-active")
    table.classList.remove("upload__table-disabled");
    table.classList.add("upload__table-active")
    InitTable();
}

const InitTable = () => {
    let table = document.getElementsByClassName("upload__table")[0];
    for (let elem of window.files) {
        let file = document.createElement("div");
        file.className = "upload__elem";
        file.innerText = elem.name;
        table.append(file);
    }
}

const init = () => {
    let input = document.getElementById("upload__input");
    input.onchange = FirstInput;
}


init();