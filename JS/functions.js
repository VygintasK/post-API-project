// Galima taip rasyt
// function firstLetterUpper(text){
//     return text[0].toUpperCase() + text.slice(1)
// }
// export {firstLetterUpper}

export function firstLetterUpper(text){
    return text[0].toUpperCase() + text.slice(1)
}


export function param(getName_Id){
    const queryParams = document.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const resultId = urlParams.get(getName_Id);
    return resultId
}