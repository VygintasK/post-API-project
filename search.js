
const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const searchInput = urlParams.get('form_name_search');
console.log(queryParams)
console.log(searchInput)

let searchArray = ['users', 'albums', 'posts']
let searchWrapper = document.querySelector('.searchWraper')
let inccorectSearchValue = document.createElement('h4')

searchArray.forEach(category => {
    if (!searchInput) {
        inccorectSearchValue.textContent = 'Write something dimwit.'
        searchWrapper.append(inccorectSearchValue)
        return
    }
    if (!Number(searchInput) === false){
        inccorectSearchValue.textContent = 'No numbers dimwit.'
        searchWrapper.append(inccorectSearchValue)
        return
    }
    let infoElement = document.createElement('h4')
    let foundWrapper = document.createElement('div')
    foundWrapper.classList.add('foundWrapper')
    fetch(`https://jsonplaceholder.typicode.com/${category}?q=${searchInput}`)
    .then(response => response.json())
    .then(result => {
        if(result.length >= 1){
            infoElement.textContent =`Found ( ${result.length} ) results in "${category}" category`
            
            result.forEach(element => {
                let foundResult = document.createElement('p')
                foundResult.style.display = "block"

                if(element.body){
                    let postID = element.id
                    foundResult.innerHTML=`<a href='post.html?post_id=${postID}'>-- ${element.title}</a>`
                }
                else if(element.title){
                    let albumID = element.id
                    foundResult.innerHTML=`<a href='album.html?album_id=${albumID}'>++ ${element.title}</a>`  
                }
                else if(element.name){
                    let userID = element.id
                    foundResult.innerHTML=`<a href='user.html?user_id=${userID}'>- ${element.name}</a>`
                } else {
                    foundResult.textContent= `some sort of ERROR, what do i know`
                }
                foundWrapper.append(foundResult)
            });

        } else{
            infoElement.textContent = `Sorry, nothing found in "${category}" category`
        }

        searchWrapper.append(infoElement, foundWrapper)
    }) 
});
