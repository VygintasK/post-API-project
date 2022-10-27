
// 6. Sukurti naują puslapį album.html ir jame atvaizduoti:
//   6.1. Albumo pavadinimą.
//   6.2. Album autoriaus vardą. Paspaudus ant vardo - nukreipiama į autoriaus puslapį.
//   6.3. Skiltis, kurioje atvaizduojamos visos albumo nuotraukos.

const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const albumID = urlParams.get('album_id');
console.log(queryParams)
console.log(urlParams)
console.log(albumID)


let albumWrap = document.querySelector('.albumWrap')
fetch(`https://jsonplaceholder.typicode.com/albums/${albumID}?_expand=user&_embed=photos`)
.then(response => response.json())
.then(album => {
let userID = album.userId
let albumTitle = album.title
let albumAuthor = album.user.name


let albumTitleElement = document.createElement('h2')
let albumAuthorElement = document.createElement('a')
albumAuthorElement.href = `./user.html?user_id=${userID}`

let albumPhotosWrapper = document.createElement('div')
albumTitleElement.textContent = albumTitle
albumAuthorElement.textContent = albumAuthor

albumWrap.append(albumTitleElement, albumAuthorElement, albumPhotosWrapper)


let photosArr = album.photos
photosArr.forEach(photo => {
    let albumPhoto = document.createElement('img')
    albumPhoto.src =photo.url
    albumPhotosWrapper.append(albumPhoto)
});



})
// posts?_limit=15?_commit&_embed=comments&_expand=user