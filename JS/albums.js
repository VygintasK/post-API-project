import initHeader from './header.js'
import {firstLetterUpper,renderAlbums} from './functions.js'
initHeader()
init()



async function init(){

    let albumsWrapper = document.querySelector('.albumsWrapper')
    const response = await fetch('https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos')
    const albumsArr = await response.json()
    renderAlbums(albumsArr,albumsWrapper)
}
// 9. Tokiu pačiu principu, kaip ir vartotojų puslapį, sukurti puslapį albumams (albums.html).
//   9.1. Prie kiekvieno albumo turi būti:
//     9.1.1. Parašytas jo pavadinimas.
//     9.1.2. Parašytas vartotojo, sukūrusio šį albumą, vardas.
//     9.1.3. Albume esančių nuotraukų skaičius.
//     9.1.4. Viena nuotrauka