// 9. Tokiu pačiu principu, kaip ir vartotojų puslapį, sukurti puslapį albumams (albums.html).
//   9.1. Prie kiekvieno albumo turi būti:
//     9.1.1. Parašytas jo pavadinimas.
//     9.1.2. Parašytas vartotojo, sukūrusio šį albumą, vardas.
//     9.1.3. Albume esančių nuotraukų skaičius.
//     9.1.4. Viena nuotrauka
init()
function init(){
    let albumsWraper = document.querySelector('.albumsWraper')
    let albumsTitleElement = document.createElement('h1')
    albumsTitleElement.textContent = 'All Albums:'
    albumsWraper.append(albumsTitleElement)
    
    fetch('https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos')
    .then(response => response.json())
    .then(albumsArr => {

        albumsArr.forEach(album => {
            let {title, user, id, photos, userId} = album
            let albumWrap = document.createElement('div')
            let albumTitle = document.createElement('h3')
            let albumAuthor = document.createElement('p')
            let albumAuthorLink = document.createElement('a')
            let albumFirstPhoto = document.createElement('img')
            let albumPhotosCount = document.createElement('p')
            let albumFirstPhotoLink = document.createElement('a')

            albumTitle.textContent = title
            albumAuthor.textContent = user.name
            albumFirstPhoto.src = photos[0].thumbnailUrl
            albumAuthorLink.href=`./user.html?user_id=${userId}`
            albumFirstPhotoLink.href=`./album.html?album_id=${id}`
            albumPhotosCount.textContent = photos.length
            
            albumFirstPhotoLink.append(albumFirstPhoto)
            albumAuthorLink.append(albumAuthor)
            albumsWraper.append(albumWrap)
            albumWrap.append(albumTitle, albumAuthorLink, albumPhotosCount, albumFirstPhotoLink)
        });
    })
}
