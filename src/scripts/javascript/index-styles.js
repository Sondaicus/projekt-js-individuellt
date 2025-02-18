function getElementWidth(element)
{
    let elementWidth = element.offsetWidth;
    return elementWidth;
}

function changeDocumentElementInnerHtmlValue(documentElement, newInnerHtmlValue)
{
    documentElement.innerHTML = newInnerHtmlValue;
}

function setSpanInsideInputBoxStylings()
{
    let spansNextToInputEcompasingElements= document.querySelectorAll("[class=span_input_info_to_user_encomapsing_element_tag]");

    for(let i_0 = 0; i_0 < spansNextToInputEcompasingElements.length; i_0++)
    {
        let currentEncompasingElement = spansNextToInputEcompasingElements[i_0];
        let currentEncompasingElement_width = getElementWidth(currentEncompasingElement);
        let currentEncompasingElement_children = currentEncompasingElement.children;
        let childSpanElement = undefined;
        let childInputElement = undefined;

        for(let i_1 = 0; i_1 < currentEncompasingElement_children.length; i_1++)
        {
            let currentChildElement = currentEncompasingElement_children[i_1];
 
            if(currentChildElement.localName == "span" && childSpanElement == undefined)
            {
                childSpanElement = currentChildElement;
            }
            if(currentChildElement.localName == "input" && childInputElement == undefined)
            {
                childInputElement = currentChildElement;
            }
            if(childSpanElement != undefined && childInputElement != undefined)
            {
                break;
            }
        }

        if(childSpanElement != undefined && childInputElement != undefined)
        {
            let childSpanElementDataIntdentedValue = childSpanElement.attributes["data-indented"].value;
            
            if(childSpanElementDataIntdentedValue == "false")
            {
                childSpanElement.attributes["data-indented"].value = "true";
                placeholderSpanAndInputStylings(childSpanElement, childInputElement, currentEncompasingElement_width);
            }
        }
    }
}

function placeholderSpanAndInputStylings(childSpanElement, childInputElement, parentElement_width)
{
    placeSpanInsideInputBox(childSpanElement, parentElement_width);
    showAndHideSpanPlaceholder(childInputElement, childSpanElement);
}

function placeSpanInsideInputBox(spanElement, parentElement_width)
{
    let spanElement_width = getElementWidth(spanElement);
    let indentSize = parentElement_width - spanElement_width - 4;
    let indentSizeStringValue = indentSize + "px"

    spanElement.style["right"] = indentSizeStringValue;
}

function showAndHideSpanPlaceholder(inputElement, spanElement)
{
    inputElement.addEventListener("input", function (event) 
        {
            let inputElement_value = inputElement.value

            if(inputElement_value.length == 0)
            {
                showSpanPlaceholderOnClear(spanElement);
            }
            else
            {
                hideSpanPlaceholderOnInput(spanElement);
            }
        });  
}

function showSpanPlaceholderOnClear(spanElement)
{
    spanElement.style.display = 'inline';
}

function hideSpanPlaceholderOnInput(spanElement)
{
    spanElement.style.display = 'none'; 
}

function hideUserUpdateInputFields()
{
    let dataUserDisplay_showHideElements = document.querySelectorAll('[data-user-display="show/hide"]');

    
    for(let i_0 = 0; i_0 < dataUserDisplay_showHideElements.length; i_0++)
    {
        let current_dataUserDisplay_showHideElement = dataUserDisplay_showHideElements[i_0];
        let current_dataUserDisplay_showHideElement_display = current_dataUserDisplay_showHideElement.style["display"];
       
        if(current_dataUserDisplay_showHideElement_display === "")
        {
            hide_genericDocumentElement(current_dataUserDisplay_showHideElement);
        }
    }
}

function showAndHideAddNewFilmSection()
{
    let addNewFilmButton = document.getElementById("button_add_new_film");

    addNewFilmButton.addEventListener("click", function (event) 
    {
        let newFilmSectionElement = document.getElementById("add_new_film_user_input_parent_element");
        let newFilmSectionElement_display = newFilmSectionElement.style.display;

        if(newFilmSectionElement_display === "none")
        {
            showAddNewFilmSection();
        }
        else if(newFilmSectionElement_display === "inline")
        {
            hideAddNewFilmSection();
        }
    });  
}

function hideAddNewFilmSection()
{
    let newFilmSectionElement = document.getElementById("add_new_film_user_input_parent_element");
    hide_genericDocumentElement(newFilmSectionElement);
}

function showAddNewFilmSection()
{
    let newFilmSectionElement = document.getElementById("add_new_film_user_input_parent_element");
    show_genericDocumentElement(newFilmSectionElement);
}

function showAndHide_genericDocumentElement_oppositeDisplay(documentElement)
{
    let documentElement_display = documentElement.style.display;

    if(documentElement_display === "none")
    {
        show_genericDocumentElement(documentElement);
    }
    else if(documentElement_display === "inline")
    {
        hide_genericDocumentElement(documentElement);
    }
}

function hide_genericDocumentElement(documentElement)
{
    documentElement.style["display"] = "none";
}

function show_genericDocumentElement(documentElement)
{
    documentElement.style["display"] = "inline";
}

async function init()
{
    setSpanInsideInputBoxStylings();
    showAndHideAddNewFilmSection();
    hideAddNewFilmSection();;
}

init();