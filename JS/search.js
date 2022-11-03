import initHeader from './header.js'
import {param} from './functions.js'

initHeader()
initSearch()

async function initSearch(){
    const searchInput = param('form_name_search')
    
    let searchWrapper = document.querySelector('.searchWrapper')
    let searchResultWrap = document.querySelector('.searchResultWrap')
    
    validAndSearch(searchInput,searchResultWrap )
    searchLocal(searchWrapper, searchResultWrap)
}

async function searchLocal(searchWrapper, searchResultWrap){
    let searchFormLocal = document.createElement('form')
    searchFormLocal.id = 'searchFormLocal'
    let InputTextElementLocal = document.createElement('input')
    InputTextElementLocal.id = 'searchTextLocal'
    InputTextElementLocal.name = 'form_name_search_local'
    InputTextElementLocal.type = 'text'
    let submitLocal = document.createElement('input')
    submitLocal.type='submit'
    submitLocal.value = 'FIND'
    
    searchWrapper.prepend(searchFormLocal)
    searchFormLocal.append(InputTextElementLocal,submitLocal)
    
    searchFormLocal.addEventListener('submit', (event) => {
        event.preventDefault();
        let inputText = event.target.elements.searchTextLocal.value

        validAndSearch(inputText, searchResultWrap)
        searchFormLocal.reset()
    })
}

async function validAndSearch(searchInput, searchResultWrap){
    let incorrectSearchValue = document.createElement('h4')
    searchResultWrap.innerHTML = ''

    if (!searchInput) {
        incorrectSearchValue.textContent = 'Write something dimwit.'
        searchResultWrap.append(incorrectSearchValue)
    }
    else if (!Number(searchInput) === false){
        incorrectSearchValue.textContent = 'No numbers dimwit.'
        searchResultWrap.append(incorrectSearchValue)
    } else 
    {
        await fetchCategory('users', searchInput, searchResultWrap)
        await fetchCategory('albums', searchInput, searchResultWrap)
        await fetchCategory('posts', searchInput, searchResultWrap)
    }

}

async function fetchCategory(category, searchInput, searchResultWrap ){
    let infoElement = document.createElement('h2')
    let foundUL = document.createElement('ul')
    foundUL.classList.add('foundUL')

    const response = await fetch(`https://jsonplaceholder.typicode.com/${category}?q=${searchInput}`)
    const result = await response.json()

    if(result.length >= 1){
        infoElement.textContent =`Found ( ${result.length} ) results in "${category}" category`
        
        result.forEach(element => {
            let foundResult = document.createElement('li')
            foundResult.style.display = "block"
            
            let {title,name, id} = element                                         
            if(category === 'users'){
                foundResult.innerHTML=`<a href='user.html?user_id=${id}'>- ${name}</a>`
            } 
            else if(category === 'posts'){
                foundResult.innerHTML=`<a href='post.html?post_id=${id}'>-- ${title}</a>`
            }
            else if(category === 'albums'){
                foundResult.innerHTML=`<a href='album.html?album_id=${id}'>++ ${title}</a>`  
            }
            else {
                foundResult.textContent= `some sort of ERROR, what do i know`
            }
            foundUL.append(foundResult)
        });

    } else{
        infoElement.textContent = `Sorry, nothing found in "${category}" category`
    }
    searchResultWrap.append(infoElement, foundUL)

} 


    // 11.5. Search puslapyje turi būti paieškos forma, kuri veikia neperkraunant puslapio.