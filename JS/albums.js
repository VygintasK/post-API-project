import initHeader from './header.js'
import {param,renderAlbums, pegination} from './functions.js'
initHeader()
init()



async function init(){
    let searchPage = param('page')
    let total = 100
    let limit = 10
    let pagesCount = Math.ceil(total / limit)
    let pagesWrapperReturned = pegination(pagesCount, searchPage)


    let albumsWrapper = document.querySelector('.albumsWrapper')
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_page=${searchPage}&_limit=${limit}`)
    const albumsArr = await response.json()
    renderAlbums(albumsArr,albumsWrapper)
    albumsWrapper.prepend(pagesWrapperReturned)
}
// 9. Tokiu pačiu principu, kaip ir vartotojų puslapį, sukurti puslapį albumams (albums.html).
//   9.1. Prie kiekvieno albumo turi būti:
//     9.1.1. Parašytas jo pavadinimas.
//     9.1.2. Parašytas vartotojo, sukūrusio šį albumą, vardas.
//     9.1.3. Albume esančių nuotraukų skaičius.
//     9.1.4. Viena nuotrauka