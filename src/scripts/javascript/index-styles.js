function setItalicStylesInDocumentInsideTags()
{
    let documentBody = document.body;
    recursiveChildNodesFinder(documentBody);
}

function recursiveChildNodesFinder(parentElement)
{
    let parentElement_childNodes = parentElement.childNodes;
    let parentElement_childNodes_length = parentElement_childNodes.length;

    for(let i = 0; i < parentElement_childNodes_length; i++)
    {
        let currentNewChildNode = parentElement_childNodes[i];
        let currentNewChildNode_name = currentNewChildNode.nodeName;

        if(currentNewChildNode_name != "#text")
        {
            if(currentNewChildNode_name != "#comment")
            {
                checkNodeAttributesAndValues(currentNewChildNode);
                recursiveChildNodesFinder(currentNewChildNode);
            }
        }
    }
   

}

function checkNodeAttributesAndValues(currentNewChildNode)
{
    let currentNewChildNode_childNodes = currentNewChildNode.childNodes;
    let currentNewChildNode_childNodes_length = currentNewChildNode_childNodes.length;

    let currentNewChildNode_boolean_attribute_placeholder = currentNewChildNode.hasAttribute("placeholder");

    let currentNewChildNode_boolean_hasChildren = true;
    if(currentNewChildNode_childNodes_length == 0)
    {
        currentNewChildNode_boolean_hasChildren = false;
    }

    let currentNewChildNode_value = currentNewChildNode.innerHTML;

    /*
    console.log("");
    console.log(currentNewChildNode);
    console.log(currentNewChildNode_boolean_hasChildren);
    console.log(currentNewChildNode_boolean_attribute_placeholder);
    console.log(currentNewChildNode_value);
    */

    if(currentNewChildNode_boolean_attribute_placeholder)
    {
        let currentNewChildNode_value_attribute_placeholder = currentNewChildNode.getAttribute("placeholder");

        findItalicStyleIdentifyiers(currentNewChildNode_value_attribute_placeholder);

    }
    recursiveChildNodesFinder(currentNewChildNode);
}

function findItalicStyleIdentifyiers(currentTextValue)
{

}

async function init()
{
    setItalicStylesInDocumentInsideTags();
}

init();