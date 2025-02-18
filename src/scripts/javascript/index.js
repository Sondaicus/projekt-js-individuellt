function addInitialEventListeners()
{
    document.getElementById("button_fetch_api").addEventListener("click", () => buttonFetchSelectedApi(event));
    document.getElementById("button_add_new_film").addEventListener("click", () => buttonAddNewFilm(event));
    saveNewFilmSubmit();
}

function addIndividualGhibliFilmEventListeners(filmJsonObject)
{
    addIndividualGhibliFilmButtonListeners(filmJsonObject);
}

function addIndividualGhibliFilmButtonListeners(filmJsonObject)
{
    addIndividualGhibliFilmButtonListeners_delete(filmJsonObject);
    addIndividualGhibliFilmButtonListeners_updateShow(filmJsonObject);
    addIndividualGhibliFilmButtonListeners_updateSave(filmJsonObject);
}

function addIndividualGhibliFilmButtonListeners_delete(filmJsonObject)
{
    individualGhibliFilmButtonListeners_miscellaneous("delete_film_button", filmJsonObject);
}

function addIndividualGhibliFilmButtonListeners_updateShow(filmJsonObject)
{
    individualGhibliFilmButtonListeners_miscellaneous("update_film_button", filmJsonObject); 
}

function addIndividualGhibliFilmButtonListeners_updateSave(filmJsonObject)
{
    individualGhibliFilmButtonListeners_miscellaneous("save_film_updates_button", filmJsonObject); 
}

function individualGhibliFilmButtonListeners_miscellaneous(classType, jsonObject)
{
    let filmKeyValue = jsonObject.id;
    let buttonClassType = 'button[class="' + classType + '"]';
    let buttonDataType = 'button[data-type="' + filmKeyValue + '"]';
    let documentButtonElement = document.querySelector(buttonClassType, buttonDataType);
    let documentButtonElement_dataType = documentButtonElement.getAttribute("data-type");
    let documentButtonElement_class = documentButtonElement.getAttribute("class");

    document.body.addEventListener('click', () => allEventListenersDynamicFunctions(event, filmKeyValue, documentButtonElement_dataType, documentButtonElement_class));
}

function allEventListenersDynamicFunctions(event, filmKeyValue, documentButtonElement_dataType, documentButtonElement_class)
{
    let document_srcElement_attribute_0 = event.srcElement.attributes[0].value;

    try
    {
        let document_srcElement_attribute_1 = event.srcElement.attributes[1].value;

        if(document_srcElement_attribute_0 == documentButtonElement_class && document_srcElement_attribute_1 == documentButtonElement_dataType)
        {
            if(document_srcElement_attribute_0 == "delete_film_button")
            {
                deleteFilmFromLocalStorage_deleteFilmFromDocument(filmKeyValue);
            }
            if(document_srcElement_attribute_0 == "update_film_button")
            {
                showFilmUpdateFieldsInDocumentElement(filmKeyValue);
            }
            if(document_srcElement_attribute_0 == "save_film_updates_button")
            {
                updateFilmInLocalStorage(filmKeyValue);
            }
        };
    }
    catch
    {}
}

function styleIndividualGhibliFilmsWithScript()
{
    setSpanInsideInputBoxStylings();
    hideUserUpdateInputFields();
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

function replaceStringValue(stringObject, startValue, newValue)
{
    let newStringObject = stringObject.replace(startValue, newValue);
    return newStringObject;
}

function getFilmValue(filmJsonObject, valueType)
{
    let filmValue = filmJsonObject[valueType];
    return filmValue;
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
            styleIndividualGhibliFilmsWithScript();
        }
    }
}

async function updateFilmInLocalStorageToDocument(filmKeyValue)
{
    if(filmKeyValue != "undefined")
    {
        let extistingDocumentElement = document.getElementById(filmKeyValue);

        if(extistingDocumentElement != null)
        {
            updateFilmInDocumentFromLocalStorage(extistingDocumentElement, filmKeyValue)
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

function showFilmUpdateFieldsInDocumentElement(filmKeyValue)
{
    let thisElement = document.getElementById(filmKeyValue);
    recursiveChildNodesFinder_loop(thisElement, "updateFilm_showInput", undefined);
}

function updateFilmInLocalStorage(filmKeyValue)
{
    let thisElement = document.getElementById(filmKeyValue);
    recursiveChildNodesFinder_loop(thisElement, "updateFilm_saveInput", filmKeyValue);
}

function updateFilmInDocumentFromLocalStorage(documentParentElement, filmKeyValue)
{
    recursiveChildNodesFinder_loop(documentParentElement, "updateFilm_postInput", filmKeyValue);
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
    reutrnValueStringElement = await replaceStringValue(reutrnValueStringElement, '<button class="update_film_button" data-type="">', '<button class="update_film_button" data-type="' + filmJsonObject.id + '">');
    reutrnValueStringElement = await replaceStringValue(reutrnValueStringElement, '<button class="save_film_updates_button" data-type="" data-user-display="show/hide">', '<button class="save_film_updates_button" data-type="' + filmJsonObject.id + '" data-user-display="show/hide">');

    return reutrnValueStringElement;
}

function recursiveChildNodesFinder_documentStart()
{
    let documentBody = document.body;
    recursiveChildNodesFinder_loop(documentBody, undefined, undefined);
}

function recursiveChildNodesFinder_loop(parentElement, searchRules, filmKeyValue)
{
    
    let parentElement_childNodes = parentElement.childNodes;
    let parentElement_childNodes_length = parentElement_childNodes.length;

  
    for(let i_0 = 0; i_0 < parentElement_childNodes_length; i_0++)
    {
        let currentNewChildNode = parentElement_childNodes[i_0];
        let currentNewChildNode_name = currentNewChildNode.nodeName;

        if(currentNewChildNode_name != "#text")
        {
            if(currentNewChildNode_name != "#comment")
            {
                let currentNewChildNode_attributes_length = currentNewChildNode.attributes.length;
                let currentNewChildNode_attributes = undefined;
                let currentNewChildNode_classType = undefined;
                
                if(currentNewChildNode_attributes_length > 0)
                {
                    currentNewChildNode_attributes = currentNewChildNode.attributes;

                    for(let i_1 = 0; i_1 < currentNewChildNode_attributes_length; i_1++)
                    {
                        let currentNewChildNode_attribute = currentNewChildNode_attributes[i_1];
                        let currentNewChildNode_attribute_name = currentNewChildNode_attribute.name;

                        if(currentNewChildNode_attribute_name == "class")
                        {
                            currentNewChildNode_classType = currentNewChildNode_attribute.nodeValue;
                        }
                    } 
                }

                if(searchRules == "updateFilm_showInput")
                {
                    recursiveChildNodesFinder_loop_updateFilm_showInput(currentNewChildNode, currentNewChildNode_name, currentNewChildNode_attributes, currentNewChildNode_attributes_length, currentNewChildNode_classType, searchRules);
                }
                else if(searchRules == "updateFilm_saveInput")
                {
                    recursiveChildNodesFinder_loop_updateFilm_saveInput(currentNewChildNode, filmKeyValue, currentNewChildNode_attributes, currentNewChildNode_attributes_length, currentNewChildNode_classType, searchRules);
                }
                else if(searchRules == "updateFilm_postInput")
                {
                    recursiveChildNodesFinder_loop_updateFilm_postInput(currentNewChildNode, currentNewChildNode_classType, currentNewChildNode_attributes, currentNewChildNode_attributes_length, searchRules, filmKeyValue);
                }
                else
                {
                    recursiveChildNodesFinder_loop(currentNewChildNode, searchRules, filmKeyValue);
                }
            }
        }
    }
}

async function recursiveChildNodesFinder_loop_updateFilm_showInput(currentNewChildNode, currentNewChildNode_name, currentNewChildNode_attributes, currentNewChildNode_attributes_length, currentNewChildNode_classType, searchRules)
{
    if(currentNewChildNode_name != "U" && currentNewChildNode_name != "I" && currentNewChildNode_name != "IMG" && currentNewChildNode_name != "BR" && currentNewChildNode_name != "B" && currentNewChildNode_name != "P" && currentNewChildNode_name != "H2" && currentNewChildNode_name != "H3")
    {
        if(currentNewChildNode_classType != "ghibli-film-document-element_user-inputs")
        {
            if(currentNewChildNode_attributes_length > 0)
            {
                for(let i_0 = 0; i_0 < currentNewChildNode_attributes_length; i_0++)
                {
                    let currentNewChildNode_attribute = await currentNewChildNode_attributes[i_0];
                    let currentNewChildNode_attribute_name = await currentNewChildNode_attribute.name;
                    let currentNewChildNode_attribute_value = await currentNewChildNode_attribute.value;

                    if(currentNewChildNode_attribute_name == "data-user-display" && currentNewChildNode_attribute_value == "show/hide")
                    {
                        showAndHide_genericDocumentElement_oppositeDisplay(currentNewChildNode);
                        break;
                    }
                } 
            }       
            recursiveChildNodesFinder_loop(currentNewChildNode, searchRules, undefined);
        }     
    }
}

function recursiveChildNodesFinder_loop_updateFilm_saveInput(currentNewChildNode, filmKeyValue, currentNewChildNode_attributes, currentNewChildNode_attributes_length, currentNewChildNode_classType, searchRules)
{
    if(currentNewChildNode_classType == "film_user_input")
    {
        if(currentNewChildNode_attributes_length > 0)
        {
            let currentNewChildNode_dataName = undefined;
            let currentNewChildNode_dataNameValue = undefined;
            let currentNewChildNode_value = "";

            for(let i_0 = 0; i_0 < currentNewChildNode_attributes_length; i_0++)
            {
                let currentNewChildNode_attribute = currentNewChildNode_attributes[i_0];
                let currentNewChildNode_attribute_name = currentNewChildNode_attribute.name;

                if(currentNewChildNode_attribute_name == "data-name")
                {
                    currentNewChildNode_dataName = currentNewChildNode_attribute_name;
                    currentNewChildNode_dataNameValue = currentNewChildNode_attribute.value;
                    break;
                }
            }

            if(currentNewChildNode_dataName != undefined && currentNewChildNode_dataNameValue != undefined)
            {
                currentNewChildNode_value = currentNewChildNode.value;
            }

            if(currentNewChildNode_value != "")
            {
                let filmStringValue = localStorage.getItem(filmKeyValue);
                let filmJsonObject = jsonifyStringContent(filmStringValue);
                filmJsonObject[currentNewChildNode_dataNameValue] = currentNewChildNode_value;

                addFilmToLocalStorage(filmKeyValue, filmJsonObject);
                updateFilmInLocalStorageToDocument(filmKeyValue);
            }
        }
    }
    else
    {
        recursiveChildNodesFinder_loop(currentNewChildNode, searchRules, filmKeyValue);
    }
}

function recursiveChildNodesFinder_loop_updateFilm_postInput(currentNewChildNode, currentNewChildNode_classType, currentNewChildNode_attributes, currentNewChildNode_attributes_length, searchRules, filmKeyValue)
{
    switch (currentNewChildNode_classType)
    {
        case "ghibli-film-document-element_title":
        {
            checkFilmElementForUpdateToDocumentFromLocalStorage(currentNewChildNode, currentNewChildNode_classType, undefined, undefined, filmKeyValue, "Title: ");
            break;
        }
        case "ghibli-film-document-element_original_title":
        {
            checkFilmElementForUpdateToDocumentFromLocalStorage(currentNewChildNode, currentNewChildNode_classType, undefined, undefined, filmKeyValue, "Original title: ");
            break;
        }
        case "ghibli-film-document-element_original_title_romanised":
        {
            checkFilmElementForUpdateToDocumentFromLocalStorage(currentNewChildNode, currentNewChildNode_classType, undefined, undefined, filmKeyValue, "Original title romanised: ");
            break;
        }
        case "ghibli-film-document-element_director":
        {
            checkFilmElementForUpdateToDocumentFromLocalStorage(currentNewChildNode, currentNewChildNode_classType, undefined, undefined, filmKeyValue, "Director: ");
            break;
        }
        case "ghibli-film-document-element_producer":
        {
            checkFilmElementForUpdateToDocumentFromLocalStorage(currentNewChildNode, currentNewChildNode_classType, undefined, undefined, filmKeyValue, "Producer: ");
            break;
        }
        case "ghibli-film-document-element_release_date":
        {
            checkFilmElementForUpdateToDocumentFromLocalStorage(currentNewChildNode, currentNewChildNode_classType, undefined, undefined, filmKeyValue, "Release date: ");
            break;
        }
        case "ghibli-film-document-element_description":
        {
            checkFilmElementForUpdateToDocumentFromLocalStorage(currentNewChildNode, currentNewChildNode_classType, undefined, undefined, filmKeyValue, "Description:");
            break;
        }
        case "ghibli-film-document-element_image":
        {
            checkFilmElementForUpdateToDocumentFromLocalStorage(currentNewChildNode, currentNewChildNode_classType, currentNewChildNode_attributes, currentNewChildNode_attributes_length, filmKeyValue, undefined);
            break;
        }
        case "ghibli-film-document-element_movie_banner":
        {
            checkFilmElementForUpdateToDocumentFromLocalStorage(currentNewChildNode, currentNewChildNode_classType, currentNewChildNode_attributes, currentNewChildNode_attributes_length, filmKeyValue, undefined);
            break;
        }
        default:
        {
            recursiveChildNodesFinder_loop(currentNewChildNode, searchRules, filmKeyValue);
            break;
        }
    }
}

function checkFilmElementForUpdateToDocumentFromLocalStorage(currentNewChildNode, currentNewChildNode_classType, currentNewChildNode_attributes, currentNewChildNode_attributes_length, filmKeyValue, textContentCutOff)
{
    let filmStringValue = localStorage.getItem(filmKeyValue);
    let filmJsonObject = jsonifyStringContent(filmStringValue);

    if(
        currentNewChildNode_classType == "ghibli-film-document-element_title" || 
        currentNewChildNode_classType == "ghibli-film-document-element_original_title" || 
        currentNewChildNode_classType == "ghibli-film-document-element_original_title_romanised" || 
        currentNewChildNode_classType == "ghibli-film-document-element_director" || 
        currentNewChildNode_classType == "ghibli-film-document-element_producer" || 
        currentNewChildNode_classType == "ghibli-film-document-element_release_date" || 
        currentNewChildNode_classType == "ghibli-film-document-element_description"
    )
    {
        let currentNewChildNode_textContent = currentNewChildNode.textContent;
        let currentNewChildNode_textContent_length = currentNewChildNode_textContent.length;
        let currentNewChildNode_textContent_indexOfCutOff = currentNewChildNode_textContent.indexOf(textContentCutOff);
        let textContentCutOff_length = textContentCutOff.length;
        let newStartingIndexForSubstring = currentNewChildNode_textContent_indexOfCutOff + textContentCutOff_length;
        let currentNewChildNode_textContent_cutOff = currentNewChildNode_textContent.substring(newStartingIndexForSubstring, currentNewChildNode_textContent_length);
        let attributeValueType = undefined;
        let newDocumentValueInnerHtmlAddon = undefined;

        if(currentNewChildNode_classType == "ghibli-film-document-element_title")
        {
            attributeValueType = "title";
            newDocumentValueInnerHtmlAddon = "<u>Title:</u> ";
        }
        else if(currentNewChildNode_classType == "ghibli-film-document-element_original_title")
        {
            attributeValueType = "original_title";
            newDocumentValueInnerHtmlAddon = "<u>Original title:</u> ";
        }
        else if(currentNewChildNode_classType == "ghibli-film-document-element_original_title_romanised")
        {
            attributeValueType = "original_title_romanised";
            newDocumentValueInnerHtmlAddon = "<u>Original title romanised:</u> ";
        }
        else if(currentNewChildNode_classType == "ghibli-film-document-element_director")
        {
            attributeValueType = "director";
            newDocumentValueInnerHtmlAddon = "<u><b>Director:</b></u> ";
        }
        else if(currentNewChildNode_classType == "ghibli-film-document-element_producer")
        {
            attributeValueType = "producer";
            newDocumentValueInnerHtmlAddon = "<u><b>Producer:</b></u> ";
        }
        else if(currentNewChildNode_classType == "ghibli-film-document-element_release_date")
        {
            attributeValueType = "release_date";
            newDocumentValueInnerHtmlAddon = "<u><b>Release date:</b></u> ";
        }
        else if(currentNewChildNode_classType == "ghibli-film-document-element_description")
        {
            attributeValueType = "description";
            newDocumentValueInnerHtmlAddon = "<u><b>Description:</b></u><br>";
        }
 
        let filmAttributeValue = getFilmValue(filmJsonObject, attributeValueType);

        if(filmAttributeValue != currentNewChildNode_textContent_cutOff)
        {
            let newDocumentElementInnerHtmlValue = newDocumentValueInnerHtmlAddon + filmAttributeValue;
            changeDocumentElementInnerHtmlValue(currentNewChildNode, newDocumentElementInnerHtmlValue);
        }
    }
    else if(
        currentNewChildNode_classType == "ghibli-film-document-element_image" || 
        currentNewChildNode_classType == "ghibli-film-document-element_movie_banner"
    )
    {
        let dataNameAttributeValue = undefined;
        let srcAttributeValue_documentElement = undefined;
        let srcAttributeValue_localStorageElement = undefined;

        for(let i_0 = 0; i_0 < currentNewChildNode_attributes_length; i_0++)
        {
            let currentNewChildNode_currentAtribute = currentNewChildNode_attributes[i_0];
            let currentNewChildNode_currentAtribute_type = currentNewChildNode_currentAtribute.name;

            if(currentNewChildNode_currentAtribute_type == "src")
            {
                srcAttributeValue_documentElement = currentNewChildNode_currentAtribute.value;
                break;
            }
        }
  
        if(currentNewChildNode_classType == "ghibli-film-document-element_image")
        {
            dataNameAttributeValue = "image";
        }
        else if(currentNewChildNode_classType == "ghibli-film-document-element_movie_banner")
        {
            dataNameAttributeValue = "movie_banner";
        }

        srcAttributeValue_localStorageElement = getFilmValue(filmJsonObject, dataNameAttributeValue);

        if(srcAttributeValue_documentElement != "")
        {
            if(srcAttributeValue_documentElement != srcAttributeValue_localStorageElement)
            {
                changeDocumentElementSrcValue(currentNewChildNode, srcAttributeValue_localStorageElement);
            }
        }
    }
}

function changeDocumentElementSrcValue(currentDocumentElement, newSrcValue)
{
    currentDocumentElement.attributes["src"].value = newSrcValue;
}

function changeDocumentElementInnerHtmlValue(currentDocumentElement, newInnerHtmlValue)
{
    currentDocumentElement.innerHTML = newInnerHtmlValue;
}

function saveNewFilmSubmit()
{
    let saveNewFilm_form = document.getElementById("add_new_film_user_input_parent_element");
    saveNewFilm_form.addEventListener("submit", () => saveNewFilm(event));
}

function saveNewFilm(event)
{
    event.preventDefault();

    let newFilm_document_id = document.getElementById("input_add_new_id");
    let newFilm_document_title = document.getElementById("input_add_new_title");
    let newFilm_document_originalTitle = document.getElementById("input_add_new_original_title");
    let newFilm_document_originalTitleRomanised = document.getElementById("input_add_new_original_title_romanised");
    let newFilm_document_director = document.getElementById("input_add_new_director");
    let newFilm_document_producer = document.getElementById("input_add_new_producer");
    let newFilm_document_releaseDate = document.getElementById("input_add_new_release_date");
    let newFilm_document_description = document.getElementById("input_add_new_description");
    let newFilm_document_image = document.getElementById("input_add_new_image");
    let newFilm_document_movieBanner = document.getElementById("input_add_new_movie_banner");

    let newFilm_value_id = newFilm_document_id.value;
    let newFilm_value_title = newFilm_document_title.value;
    let newFilm_value_originalTitle = newFilm_document_originalTitle.value;
    let newFilm_value_originalTitleRomanised = newFilm_document_originalTitleRomanised.value;
    let newFilm_value_director = newFilm_document_director.value;
    let newFilm_value_producer = newFilm_document_producer.value;
    let newFilm_value_releaseDate = newFilm_document_releaseDate.value;
    let newFilm_value_description = newFilm_document_description.value;
    let newFilm_value_image = newFilm_document_image.value;
    let newFilm_value_movieBanner = newFilm_document_movieBanner.value;

    let newGibliFilm = new GhibliFilm();
    newGibliFilm.setGhibliFilmValues(
        newFilm_value_id, 
        newFilm_value_title, 
        newFilm_value_originalTitle, 
        newFilm_value_originalTitleRomanised, 
        newFilm_value_director, 
        newFilm_value_producer, 
        newFilm_value_releaseDate, 
        newFilm_value_description, 
        newFilm_value_image, 
        newFilm_value_movieBanner
    );

    addFilmToLocalStorage_postFilmInLocalStorageToDocument(newFilm_value_id, newGibliFilm);
    clearNewFilmUserInputs();
}

function clearNewFilmUserInputs()
{
    document.getElementById("input_add_new_id").value = "";
    document.getElementById("input_add_new_title").value = "";
    document.getElementById("input_add_new_original_title").value = "";
    document.getElementById("input_add_new_original_title_romanised").value = "";
    document.getElementById("input_add_new_director").value = "";
    document.getElementById("input_add_new_producer").value = "";
    document.getElementById("input_add_new_release_date").value = "";
    document.getElementById("input_add_new_description").value = "";
    document.getElementById("input_add_new_image").value = "";
    document.getElementById("input_add_new_movie_banner").value = "";
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
    let ghibliFilmTemplateWithIds = await replaceStringValue(ghibliFilmTemplate, '<div class="ghibli-film-document-element" id="">', '<div class="ghibli-film-document-element" id="' + key + '">');

    return ghibliFilmTemplateWithIds;
}

async function init()
{
    addInitialEventListeners();
    postFilmsInLocalStorageToDocument();
}

init();