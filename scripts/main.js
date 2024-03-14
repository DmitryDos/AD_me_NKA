window.files = [];

const FirstInput = (e) => {
    let files = document.getElementById("upload__input").files;
    let dropbox = document.getElementsByClassName("upload__dropbox")[0];
    let table = document.getElementsByClassName("upload__table")[0];
    console.log(files);
    for (let elem of files) {
        window.files.push(elem);
    }
    dropbox.className = "upload__dropbox upload__dropbox-disabled";
    table.className = "upload__table upload__table-active";
    InitTable();
}

const InitTable = () => {
    let table = document.getElementsByClassName("upload__table")[0];
    for (let elem of window.files) {
        let file = document.createElement("div");
        file.className = "upload__elem";
        file.innerHTML = elem.name;
        table.append(file);
    }
}

const init = () => {
    let input = document.getElementById("upload__input");
}


init();