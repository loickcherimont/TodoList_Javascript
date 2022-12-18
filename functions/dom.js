/**
 * Customise an HTML Element
 * @param {string} tagName 
 * @param {object} attributes
 * @param {string} innerContent
 * @return {HTMLElement}
 */
export function createNewElement(tagName, attributes={}, innerContent='') {
    const newElement = document.createElement(tagName)
    newElement.innerHTML = innerContent

    for(const [attribute, value] of Object.entries(attributes)) {
        if(value !== false) {
            newElement.setAttribute(attribute, value)
        }
    }

    return newElement
}