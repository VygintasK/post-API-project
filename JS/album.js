init()

import PhotoSwipeLightbox from '/photoswipe/dist/photoswipe-lightbox.esm.js'
function init(){
    const queryParams = document.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const albumID = urlParams.get('album_id');
    console.log(queryParams)
    console.log(albumID)
    
    const albumWrap = document.querySelector('.albumWrap')
    if (albumID) {
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumID}?_expand=user&_embed=photos`)
        .then(response => response.json())
        .then(album => {
            if (!album.id){
                errorIdFunction(albumWrap,'incorrect id','albums') 
                return
            }
            let {userId, title, user, photos} = album
    
            let albumTitleElement = document.createElement('h1')
            albumTitleElement.textContent = title
            let albumAuthorElement = document.createElement('p')
            albumAuthorElement.textContent = user.name
            albumAuthorElement.href = `./user.html?user_id=${userId}`
            let albumPhotosWrapper = document.createElement('div')
            albumPhotosWrapper.classList.add("pswp-gallery", "pswp-gallery--single-column")
            albumPhotosWrapper.id='gallery--getting-started'
            let photosArr = photos
            
            albumWrap.append(albumTitleElement, albumAuthorElement, albumPhotosWrapper)
    
            photosArr.forEach(photo => {
                let albumPhoto = document.createElement('a')
                albumPhoto.setAttribute('href',photo.thumbnailUrl)
                albumPhoto.setAttribute('target','_blank')
                albumPhoto.setAttribute('data-pswp-width','1669')
                albumPhoto.setAttribute('data-pswp-height','2500')
                
                let albumPhotoImg = document.createElement('img')
                albumPhotoImg.src=photo.thumbnailUrl
    
                const lightbox = new PhotoSwipeLightbox({
                    gallery: '#gallery--getting-started',
                    children: 'a',
                    pswpModule: () => import('/photoswipe/dist/photoswipe.esm.js')
                });
                lightbox.init();
    
                albumPhoto.append(albumPhotoImg)
                albumPhotosWrapper.append(albumPhoto)
            });
        })
    } else {
        errorIdFunction(albumWrap,'no id','albums')
    }
}
function errorIdFunction(wrap,reason,redirect){
    let error = document.createElement('span')
    error.innerHTML =`<h1>ERROR - ${reason}</h1>
                      <a href=./${redirect}.html> <= Go back</a>`
    wrap.append(error)
}




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
