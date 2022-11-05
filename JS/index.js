import initHeader from './header.js'
import {renderComments,renderAlbums,firstLetterUpper} from './functions.js'
initHeader()
initIndex()

async function initIndex(){  
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20?_commit&_embed=comments&_expand=user')
    const data = await response.json()
    let allPostsWrapper = document.querySelector('.allPostsWrapper')
    
    data.forEach(element => {
        let {userId, body , user, comments, title  } = element
        console.log(element)
        let postWrap = document.createElement('div')
        let postTitle = document.createElement('h2')
            postTitle.classList.add('postTitle')
            postTitle.textContent = title
        let authorUser = document.createElement('a')
            authorUser.href='./user.html?user_id='+userId
            authorUser.textContent =`article by: ${user.name}` 
        let postBody = document.createElement('p')        
            postBody.textContent = firstLetterUpper(body)
        allPostsWrapper.append(postWrap)
        let commentWrap = document.createElement('div')
            commentWrap.classList.add('comment-wraps')
        postWrap.append(postTitle,postBody,authorUser,commentWrap)
        
        renderComments(comments, commentWrap)
    })
    const response2 = await fetch ('https://jsonplaceholder.typicode.com/albums?_limit=15&_expand=user&_embed=photos')
    const albumsArr = await response2.json()
    renderAlbums(albumsArr,allPostsWrapper)


}





// API nuoroda: https://jsonplaceholder.typicode.com

// 1. Sukurti puslapį, kuriame bus atvaizduojami įrašai (posts.html). Kiekvienas įrašas turi:
//   1.1. Pavadinimą.
//   1.2. Pastraipą su įrašo (post) turiniu.
//   1.3. Autorių. Tai turi būti nuoroda. Kol kas ji gali niekur nevesti.
// 2. Po kiekvienu įrašu (post) pridėti posto komentarus. Kiekvienas komentaras turi:
//   2.1. Komentaro pavadinimą.
//   2.2. Komentaro turinį - pastraipą.
//   2.3. Komentarą parašiusio asmens el. pašto adresą.

// 5. Pagrindiniame (index.html) puslapyje pridėti skiltį, kurioje atvaizduojamas albumų sąrašas. Kiekvienas albumas turės:
//   5.1. Pavadinimą, o paspaudus ant jo - nukreipiama į albumą (album.html).
//   5.2. Albumo autoriaus vardą.
//   5.3. Nuotrauką.
