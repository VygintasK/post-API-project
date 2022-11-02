init()

async function init(){
    const queryParams = document.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const searchInput = urlParams.get('form_name_search');
    console.log(queryParams)
    console.log(searchInput)
    
    let searchWrapper = document.querySelector('.searchWrapper')
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
        await fetchingCategory('users', searchInput, searchWrapper)
        await fetchingCategory('albums', searchInput, searchWrapper)
        await fetchingCategory('posts', searchInput, searchWrapper)

        //////////////////////BACKUP BE ASYNC/////////////////////////////////
        // categoryArray.forEach(category => {
        //     let infoElement = document.createElement('h2')
        //     let foundWrapper = document.createElement('div')
        //     foundWrapper.classList.add('foundWrapper')

        //     fetch(`https://jsonplaceholder.typicode.com/${category}?q=${searchInput}`)
        //     .then(response => response.json())
        //     .then(result => {
                
        //         if(result.length >= 1){
                    
        //             infoElement.textContent =`Found ( ${result.length} ) results in "${category}" category`
                    
        //             result.forEach(element => {
        //                 let foundResult = document.createElement('p')
        //                 foundResult.style.display = "block"
                        
        //                 let {title,name, id} = element                                         
    
        //                 if(category === 'posts'){
        //                     foundResult.innerHTML=`<a href='post.html?post_id=${id}'>-- ${title}</a>`
        //                 }
        //                 else if(category === 'albums'){
        //                     foundResult.innerHTML=`<a href='album.html?album_id=${id}'>++ ${title}</a>`  
        //                 }
        //                 else if(category === 'users'){
        //                     foundResult.innerHTML=`<a href='user.html?user_id=${id}'>- ${name}</a>`
        //                 } else {
        //                     foundResult.textContent= `some sort of ERROR, what do i know`
        //                 }
        //                 foundWrapper.append(foundResult)
        //             });
        
        //         } else{
        //             infoElement.textContent = `Sorry, nothing found in "${category}" category`
        //         }
        //         searchWrapper.append(infoElement, foundWrapper)
        //     }) 
        // });
        //////////////////////////////////////////////////////
    }
}

async function fetchingCategory(category, searchInput,searchWrapper ){
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

