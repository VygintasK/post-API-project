
// 6. Sukurti naują puslapį album.html ir jame atvaizduoti:
//   6.1. Albumo pavadinimą.
//   6.2. Album autoriaus vardą. Paspaudus ant vardo - nukreipiama į autoriaus puslapį.
//   6.3. Skiltis, kurioje atvaizduojamos visos albumo nuotraukos.


// 6.3. Skiltis, kurioje atvaizduojamos visos albumo nuotraukos. Panaudoti library (biblioteką), kuri skirta gražiam galerijos atvaizdavimui, pvz.:
// 6.3.1. https://photoswipe.com/
// 6.3.2. https://nanogallery2.nanostudio.org/
// 6.3.3. https://sachinchoolur.github.io/lightgallery.js/
// 6.3.4. Arba bet kurią kitą.

// unsplash.com/documentation.

const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const albumID = urlParams.get('album_id');
console.log(queryParams)
console.log(urlParams)
console.log(albumID)

const albumWrap = document.querySelector('.albumWrap')
if (albumID) {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumID}?_expand=user&_embed=photos`)
    .then(response => response.json())
    .then(album => {
        if (!album.id){
            errorIdFunction(albumWrap,'inccorect id','albums') 
            return
        }

        let {userId, title, user } = album

        let userID = userId
        let albumTitle = title
        let albumAuthor = user.name

        let albumTitleElement = document.createElement('h1')
        let albumAuthorElement = document.createElement('p')
        albumAuthorElement.href = `./user.html?user_id=${userID}`
        let albumPhotosWrapper = document.createElement('div')
        ////////////////////////////
        albumPhotosWrapper.classList.add("pswp-gallery", "pswp-gallery--single-column")
        albumPhotosWrapper.id='gallery--getting-started'
        /////////////////////////////////////
        albumTitleElement.textContent = albumTitle
        albumAuthorElement.textContent = albumAuthor

        albumWrap.append(albumTitleElement, albumAuthorElement, albumPhotosWrapper)

        let photosArr = album.photos
        photosArr.forEach(photo => {
            let albumPhoto = document.createElement('a')
            // console.log(photo.thumbnailUrl)
            // console.log(albumPhoto)
            ////////////////////////////////////////////////////////
            // albumPhoto.setAttribute('href','./123.jpg')
            albumPhoto.setAttribute('href',photo.thumbnailUrl)
            albumPhoto.setAttribute('data-pswp-width','1669')
            albumPhoto.setAttribute('data-pswp-height','2500')
            albumPhoto.setAttribute('target','_blank')
            let albumPhotoimg = document.createElement('img')
            albumPhotoimg.src='./123small.jpg'
            // albumPhotoimg.src=photo.thumbnailUrl
            ////////////////////////////////////////
            const lightbox = new PhotoSwipeLightbox({
                gallery: '#gallery--getting-started',
                children: 'a',
                pswpModule: () => import('/photoswipe/dist/photoswipe.esm.js')
            });
            lightbox.init();
            //////////////////////////////////////////////////////////
            albumPhoto.append(albumPhotoimg)
            albumPhotosWrapper.append(albumPhoto)
        });
    })
} else {
    errorIdFunction(albumWrap,'no id','albums')
}
function errorIdFunction(wrap,reason,redirect){
    let error = document.createElement('span')
    error.innerHTML =`<h1>ERROR - ${reason}</h1>
                      <a href=./${redirect}.html> <= Go back</a>`
    wrap.append(error)
}

// Include Lightbox 
import PhotoSwipeLightbox from '/photoswipe/dist/photoswipe-lightbox.esm.js';

console.dir(document)