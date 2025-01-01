const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films")

// UI objesini başlatma 

const ui = new UI();

// storageye ekleme

const storage = new Storage();

// tüm eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === ""){
        //hata
        ui.displayMessages("tüm alanları doldurun", "danger");
    }

    else {
        // yeni film
        const newFilm = new Film(title,director,url);
        
        ui.addFilmToUI(newFilm);
        storage.addFilmToStorage(newFilm); // storageye film ekleme
        ui.displayMessages("film başarıyla eklendi", "success");
    }


    ui.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e){
    if (e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("silme işlemi başarılı...", "success");
    }
}
function clearAllFilms(){
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStroage();
}