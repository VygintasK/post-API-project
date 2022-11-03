

export let namedExport1 = 'labas cia NamedExport1' 
//arba
 let namedExport2 = 'labas cia NamedExport2' 
 export{namedExport2}


// galima exportint funkcija kurios gauna argumenta ar beliaka
export function duKart(input){
    let result = 'Atsakymas: '+ 2 * input
    return result
}



// pvz:
export function firstLetterUpper(text){
    return text[0].toUpperCase() + text.slice(1)
}


export function param(getName_Id){
    const queryParams = document.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const resultId = urlParams.get(getName_Id);
    return resultId
}