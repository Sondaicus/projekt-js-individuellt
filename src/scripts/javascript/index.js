function addInitialEventListeners()
{
    document.getElementById("button_fetch_api").addEventListener("click", () => buttonFetchSelectedApi(event));
    document.getElementById("button_add_new_film").addEventListener("click", () => buttonAddNewFilm(event));
}

function addIndividualGhibliFilmEventListeners(filmJsonObject)
{
    addIndividualGhibliFilmButtonListeners(filmJsonObject);
}

function addIndividualGhibliFilmButtonListeners(filmJsonObject)
{
    let filmKeyValue = filmJsonObject.id;
    let documentDeleteButtonElement = document.querySelector("button[class=delete_film_button]" && 'button[data-type="' + filmKeyValue + '"]');
    let documentDeleteButtonElement_dataType = documentDeleteButtonElement.getAttribute("data-type");
    let documentDeleteButtonElement_class = documentDeleteButtonElement.getAttribute("class");

    document.body.addEventListener('click', 
        function (event) 
        {
            let document_srcElement_attribute_0 = event.srcElement.attributes[0].value;

            try
            {
                let document_srcElement_attribute_1 = event.srcElement.attributes[1].value;

                if(document_srcElement_attribute_0 == documentDeleteButtonElement_class && document_srcElement_attribute_1 == documentDeleteButtonElement_dataType)
                {
                    if(document_srcElement_attribute_0 == "delete_film_button")
                    {
                        deleteFilmFromLocalStorage_deleteFilmFromDocument(filmKeyValue);
                    }
                };
            }
            catch
            {}
        });  
}

async function buttonFetchSelectedApi(event)
{
    event.preventDefault();
   
    let apiResultsToRunWith = await buttonChoseSelectedApi();
    addFilmsToLocalStorage(apiResultsToRunWith);
    postFilmsInLocalStorageToDocument();
}

async function buttonAddNewFilm(event)
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

function addFilmToLocalStorage_postFilmInLocalStorageToDocument(filmKeyValue, ghibliFilm_object)
{
    addFilmToLocalStorage(filmKeyValue, ghibliFilm_object)
    postFilmInLocalStorageToDocument(filmKeyValue);
}

function addFilmToLocalStorage(filmKeyValue, ghibliFilm_object)
{
    let ghibliFilm_string = stringyfyJsonContent(ghibliFilm_object);
    localStorage.setItem(filmKeyValue, ghibliFilm_string);
}

async function postFilmInLocalStorageToDocument(filmKeyValue)
{
    if(filmKeyValue != "undefined")
    {
        let extistingDocumentElement = document.getElementById(filmKeyValue);

        if(extistingDocumentElement == null)
        {
            let filmStringValue = localStorage.getItem(filmKeyValue);
            let filmJsonObject = jsonifyStringContent(filmStringValue);
            let stringElement = await addElementValuesToGhibliFilmString(filmStringValue, filmJsonObject);
            let documentPostSection = document.getElementById("main_body_section");
            documentPostSection.innerHTML = stringElement + documentPostSection.innerHTML;

            addIndividualGhibliFilmEventListeners(filmJsonObject);
        }
    }
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

function addFilmsToLocalStorage(ghibliFilms)
{
    for(let i = 0; i < ghibliFilms.length; i ++)
    {
        let currentGibliFilm = new GhibliFilm();
        currentGibliFilm.setGhibliFilm(ghibliFilms[i]);
        addFilmToLocalStorage(currentGibliFilm.id, currentGibliFilm);
    }
}

function deleteFilmFromLocalStorage_deleteFilmFromDocument(filmKeyValue)
{
    deleteFilmFromLocalStorage(filmKeyValue)
    deleteFilmFromDocument(filmKeyValue);
}

function deleteFilmFromLocalStorage(filmKeyValue)
{
    localStorage.removeItem(filmKeyValue);
}

function deleteFilmFromDocument(filmKeyValue)
{
    let documentFilmElement = document.getElementById(filmKeyValue);

    if(documentFilmElement != null)
    {
        documentFilmElement.remove();
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

    return ghibliFilmTemplateWithIds;
}

function setContentValuesToGhibliFilmHtmlElement(ghibliFilmContent, ghibliFilmDocumentElement)
{

}

async function init()
{
    addInitialEventListeners();
    postFilmsInLocalStorageToDocument();
}

init();