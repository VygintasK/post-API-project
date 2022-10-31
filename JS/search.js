async function init(){
    const queryParams = document.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const searchInput = urlParams.get('form_name_search');
    console.log(queryParams)
    console.log(searchInput)
    
    let categoryArray = ['users', 'albums', 'posts']
    let searchWrapper = document.querySelector('.searchWraper')
    let inccorectSearchValue = document.createElement('h4')
    
    if (!searchInput) {
        inccorectSearchValue.textContent = 'Write something dimwit.'
        searchWrapper.append(inccorectSearchValue)
    }
    else if (!Number(searchInput) === false){
        inccorectSearchValue.textContent = 'No numbers dimwit.'
        searchWrapper.append(inccorectSearchValue)
    } else 
    {






        
        categoryArray.forEach(category => {
            let infoElement = document.createElement('h2')
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
            }) 
        });



        




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
init()





