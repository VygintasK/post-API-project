init()

async function init(){
    const queryParams = document.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const searchInput = urlParams.get('form_name_search');
    console.log(queryParams)
    console.log(searchInput)
    
    let searchWrapper = document.querySelector('.searchWrapper')
    let searchResultWrap = document.querySelector('.searchResultWrap')
    console.log(searchResultWrap)
    
    validAndSearch(searchInput, searchWrapper)

    searchLocal(searchWrapper)


}

async function validAndSearch(searchInput, searchWrapper ){
    let incorrectSearchValue = document.createElement('h4')

    if (!searchInput) {
        incorrectSearchValue.textContent = 'Write something dimwit.'
        searchWrapper.append(incorrectSearchValue)
    }
    else if (!Number(searchInput) === false){
        incorrectSearchValue.textContent = 'No numbers dimwit.'
        searchWrapper.append(incorrectSearchValue)
    } else 
    {
        await fetchCategory('users', searchInput, searchWrapper)
        await fetchCategory('albums', searchInput, searchWrapper)
        await fetchCategory('posts', searchInput, searchWrapper)
    }
}
async function fetchCategory(category, searchInput,searchWrapper ){
    let infoElement = document.createElement('h2')
    let foundWrapper = document.createElement('ul')
    foundWrapper.classList.add('foundWrapper')

    const response = await fetch(`https://jsonplaceholder.typicode.com/${category}?q=${searchInput}`)
    const result = await response.json()

    if(result.length >= 1){
        infoElement.textContent =`Found ( ${result.length} ) results in "${category}" category`
        
        result.forEach(element => {
            let foundResult = document.createElement('li')
            foundResult.style.display = "block"
            
            let {title,name, id} = element                                         
            if(category === 'posts'){
                foundResult.innerHTML=`<a href='post.html?post_id=${id}'>-- ${title}</a>`
            }
            else if(category === 'albums'){
                foundResult.innerHTML=`<a href='album.html?album_id=${id}'>++ ${title}</a>`  
            }
            else if(category === 'users'){
                foundResult.innerHTML=`<a href='user.html?user_id=${id}'>- ${name}</a>`
            } else {
                foundResult.textContent= `some sort of ERROR, what do i know`
            }
            foundWrapper.append(foundResult)
        });

    } else{
        infoElement.textContent = `Sorry, nothing found in "${category}" category`
    }
    searchWrapper.append(infoElement, foundWrapper)

} 
async function searchLocal(searchWrapper){
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

        validAndSearch(inputText, searchWrapper)
        searchFormLocal.reset()
    })
}
    // 11.5. Search puslapyje turi būti paieškos forma, kuri veikia neperkraunant puslapio.