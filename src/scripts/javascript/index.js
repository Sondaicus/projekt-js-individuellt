function addInitialEventListeners()
{
    document.getElementById("button_fetch_api").addEventListener("click", () => buttonFetchSelectedApi(event));
}

function addIndividualGhibliFilmEventListeners(filmJsonObject)
{
    let correctDataTypeValue = filmJsonObject.id;
    let documentDeleteButtonElement = document.querySelector("button[class=delete_film_button]" && 'button[data-type="' + correctDataTypeValue + '"]');
 

    console.log(documentDeleteButtonElement);

    documentDeleteButtonElement.addEventListener("click", () => buttonDeleteFilm(event));


    document.querySelector("button[class=delete_film_button]" && 'button[data-type="' + correctDataTypeValue + '"]').addEventListener("click", () => buttonDeleteFilm(event));

    /*

    for(let currentButton in documentDeleteFilmButtonsArray)
    {
        let currentButtonDocumentElement = documentDeleteFilmButtonsArray[currentButton];
        let currentButtonDataTypeValue = currentButtonDocumentElement.getAttribute("data-type");

        if(currentButtonDataTypeValue == correctDataTypeValue)
        {
            currentButtonDocumentElement.addEventListener("click", () => buttonDeleteFilm(event));
            break;
        }
    }
        */
        
}

async function buttonFetchSelectedApi(event)
{
    event.preventDefault();
   
    let apiResultsToRunWith = await buttonChoseSelectedApi();
    addFilmsToLocalStorage(apiResultsToRunWith);
    postFilmsInLocalStorageToDocument();

}

function buttonDeleteFilm(event)
{
    event.preventDefault();
   
    console.log("hey");

}

async function readApi(api)
{
    let apiContent = undefined;

    await fetch(api)
    .then((res) => res.text())
    .then((text) => 
    {
        apiContent = text;
    })
    .catch((e) => console.error(e));

    return apiContent;
}

function jsonifyStringContent(stringContent)
{
    let jsonContent = JSON.parse(stringContent);
    return jsonContent;
}

function stringyfyJsonContent(jsonContent)
{
    let stringContent = JSON.stringify(jsonContent);
    return stringContent;
}

async function replaceStringValue(stringObject, startValue, newValue)
{
    let newStringObject = stringObject.replace(startValue, newValue);
    return newStringObject;
}

async function getApiJsonContent(api)
{
    let apiContent_String = await readApi(api);
    let apiContent_JSON = jsonifyStringContent(apiContent_String);

    return apiContent_JSON;
}

async function getApiJsonContent_fake()
{
    let apiContent_JSON = await getApiJsonContent("../../../src/JSON/fake-apis.json");
    return apiContent_JSON;
}

async function getApiJsonContent_real()
{
    let apiContent_JSON = await getApiJsonContent("https://ghibliapi.vercel.app/films/");
    return apiContent_JSON;
}

async function buttonChoseSelectedApi()
{
    let selectedApiType = document.getElementById("api_selector").value;
    let apiResultsToRunWith = undefined;

    switch (selectedApiType) 
    {
        case "fake_api":
            apiResultsToRunWith = await getApiJsonContent_fake();
            break;

        case "real_api":
            apiResultsToRunWith = await getApiJsonContent_real();
            break;

        default:
            break;
    }

    return apiResultsToRunWith;
}

function addFilmToLocalStorage(key, ghibliFilm_object)
{
    let ghibliFilm_string = stringyfyJsonContent(ghibliFilm_object);
    localStorage.setItem(key, ghibliFilm_string);
}

function addFilmsToLocalStorage(ghibliFilms)
{
    for(let i = 0; i < ghibliFilms.length; i ++)
    {
        let currentGibliFilm = new GhibliFilm();
        currentGibliFilm.setGhibliFilm(ghibliFilms[i]);
        addFilmToLocalStorage(currentGibliFilm.id, currentGibliFilm);
    }
}

async function postFilmInLocalStorageToDocument(filmId)
{
    let filmStringValue = localStorage.getItem(filmId);
    let filmJsonObject = jsonifyStringContent(filmStringValue);
    let stringElement = await addElementValuesToGhibliFilmString(filmStringValue, filmJsonObject);
    let documentPostSection = document.getElementById("main_body_section");
    documentPostSection.innerHTML += stringElement;
    addIndividualGhibliFilmEventListeners(filmJsonObject);
}

async function postFilmsInLocalStorageToDocument()
{
    let localStorageElements = await getLocalStorageElements();
 
    for(let filmId in localStorageElements)
    {
        if(filmId == "length")
        {
            break;
        }
        else
        {
            postFilmInLocalStorageToDocument(filmId);
        }
    }
}

async function addElementValuesToGhibliFilmString(filmStringValue, filmJsonObject)
{
    let reutrnValueStringElement = await setKeyValuesToGhibliFilmHtmlElement(filmJsonObject.id);
    reutrnValueStringElement = await replaceStringValue(reutrnValueStringElement, '<h2 class="ghibli-film-document-element_title"><u>Title:</u></h2>', '<h2 class="ghibli-film-document-element_title"><u>Title:</u>' + " " + filmJsonObject.title + '</h2>');
    reutrnValueStringElement = await replaceStringValue(reutrnValueStringElement, '<h3 class="ghibli-film-document-element_original_title"><u>Original title:</u></h3>', '<h3 class="ghibli-film-document-element_original_title"><u>Original title:</u>' + " " + filmJsonObject.original_title + '</h3>');
    reutrnValueStringElement = await replaceStringValue(reutrnValueStringElement, '<h3 class="ghibli-film-document-element_original_title_romanised"><u>Original title romanised:</u></h3>', '<h3 class="ghibli-film-document-element_original_title_romanised"><u>Original title romanised:</u>' + " " + filmJsonObject.original_title_romanised + '</h3>');
    reutrnValueStringElement = await replaceStringValue(reutrnValueStringElement, '<p class="ghibli-film-document-element_director"><u><b>Director:</b></u></p>', '<p class="ghibli-film-document-element_director"><u><b>Director:</b></u>' + " " + filmJsonObject.director + '</p>');
    reutrnValueStringElement = await replaceStringValue(reutrnValueStringElement, '<p class="ghibli-film-document-element_producer"><u><b>Producer:</b></u></p>', '<p class="ghibli-film-document-element_producer"><u><b>Producer:</b></u>' + " " + filmJsonObject.producer + '</p>');
    reutrnValueStringElement = await replaceStringValue(reutrnValueStringElement, '<p class="ghibli-film-document-element_release_date"><u><b>Release date:</b></u></p>', '<p class="ghibli-film-document-element_release_date"><u><b>Release date:</b></u>' + " " + filmJsonObject.release_date + '</p>');
    reutrnValueStringElement = await replaceStringValue(reutrnValueStringElement, '<p class="ghibli-film-document-element_description"><u><b>Description:</b></u><br /></p>', '<p class="ghibli-film-document-element_description"><u><b>Description:</b></u><br />' + filmJsonObject.description + '</p>');
    reutrnValueStringElement = await replaceStringValue(reutrnValueStringElement, '<img class="ghibli-film-document-element_image" src="" />', '<img class="ghibli-film-document-element_image" src="' + filmJsonObject.image + '" />');
    reutrnValueStringElement = await replaceStringValue(reutrnValueStringElement, '<img class="ghibli-film-document-element_movie_banner" src="" />', '<img class="ghibli-film-document-element_movie_banner" src="' + filmJsonObject.movie_banner + '" />');
    reutrnValueStringElement = await replaceStringValue(reutrnValueStringElement, '<button class="delete_film_button" data-type="">', '<button class="delete_film_button" data-type="' + filmJsonObject.id + '">');

    return reutrnValueStringElement;
}

function matchLocalStorageKey(key)
{

}

function matchLocalStorageObject(object)
{

}

async function getLocalStorageElements()
{
    let localStorageElements = window.localStorage;
    return localStorageElements;
}

async function getGhibliFilmHtmlTemplate()
{
    let ghibliFilmTemplate = await readApi("../html/ghibli-film.html");
    return ghibliFilmTemplate;
}

async function setKeyValuesToGhibliFilmHtmlElement(key)
{
    let ghibliFilmTemplate = await getGhibliFilmHtmlTemplate();
    let ghibliFilmTemplateWithIds = replaceStringValue(ghibliFilmTemplate, '<div class="ghibli-film-document-element" id="">', '<div class="ghibli-film-document-element" id="' + key + '">');

    /*
        while(ghibliFilmTemplateWithIds.indexOf('data-type=""') != -1)
        {
            ghibliFilmTemplateWithIds = ghibliFilmTemplateWithIds.replace('data-type=""', 'data-type="' + key + '"');
        }
    */

    return ghibliFilmTemplateWithIds;
}

function setContentValuesToGhibliFilmHtmlElement(ghibliFilmContent, ghibliFilmDocumentElement)
{

}

async function init()
{
    addInitialEventListeners();
}

init();