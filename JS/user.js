import initHeader from './header.js'
import { param, errorIdFunction, firstLetterUpper} from './functions.js'

initHeader()
init()

function init(){
    const userID = param('user_id')
    
    const usersWrapper = document.querySelector('.usersWrapper')
    if(userID) {
        fetch(`https://jsonplaceholder.typicode.com/users/${userID}?_embed=posts`)
        .then(response => response.json())
        .then(user => {
            if(!user.id) {
                errorIdFunction(usersWrapper,'incorrect id','users')
                return
            }
            let {name, username, email, phone, website, company, address } = user
            let {street, suite, city, zipcode, geo } = address
    
            let userGoogle = `https://maps.google.com/maps?q=${geo.lat},${geo.lng}`
            let editUser = document.createElement('a')
            editUser.textContent = '|EDIT USER|'
            editUser.href = './edit-user.html'
            let userPostUl = document.createElement('ul')
            let userPostHeader = document.createElement('h3')
            userPostHeader.textContent = 'All comments:'
            userPostUl.classList.add('postsWrap')
            let userAlbumUl = document.createElement('ul')
            let userAlbumTittle = document.createElement('h3')
            userAlbumTittle.textContent = 'All albums:'
    
            usersWrapper.innerHTML= `
            <h2>${name}</h2>
            <p><strong>Nickname: </strong>${username}</p>
            <p><strong>E-mail: </strong><a href='mailto:Sincere@april.biz'>${email}</a></p>
            <p><strong>Phone: </strong><a href='tel:${phone}'>${phone}</a></p>
            <p><strong>Web address: </strong><a target='_blank' href='http://www.hildegard.org'>${website}</a></p>
            <p><strong>Working at: </strong>${company.name}</p>
            <p><strong>Address: </strong><a target='_blank' href='${userGoogle}'>${street}, ${suite}, ${city}, ${zipcode}</a></p>`
            usersWrapper.prepend(editUser)
            usersWrapper.append(userPostHeader,userPostUl, userAlbumTittle, userAlbumUl)
    
            let userPostsArr = user.posts
            userPostsArr.forEach(post => {
                let postTitleElement = document.createElement('li')
                postTitleElement.innerHTML = `post id ${post.id}: <a href="./post.html?post_id=${post.id}">${firstLetterUpper(post.title)}</a>`
                userPostUl.append(postTitleElement)
            });
    
            fetch(`https://jsonplaceholder.typicode.com/users/${userID}/albums`)
            .then(response => response.json())
            .then(albumsArr => {
                albumsArr.forEach(album => {
                    let albumTitleElement = document.createElement('li')
                    albumTitleElement.innerHTML = `album id ${album.id}: <a href='./album.html?album_id=${album.id}'> ${firstLetterUpper(album.title)}</a>`
                    userAlbumUl.append(albumTitleElement) 
                })
            })
        })
    
    } else {
        errorIdFunction(usersWrapper,'no id','users')
    }
}

// 3. Sukurti nauj?? puslap?? user.html, kuriame bus atvaizduojama vartotojo informacija:
//   3.1. Pilnas vardas.
//   3.2. Vartotojo vardas / nick'as.
//   3.3. El. pa??tas.
//   3.4. Adresas, kuris tur??s gatv??, namo numer??, miest??, pa??to kod??. Paspaudus ant adreso, pagal koordinates, tur??t?? atidaryti ??ios vietos Google Maps.
//   3.5. Telefono numeris.
//   3.6. Internetinio puslapio adresas.
//   3.7. ??mon??s, kurioje dirba, pavadinimas.
  // 4. ??iame puslapyje tur??s b??ti atvaizduojama:
        //   4.1. Visi vartotojo para??yti ??ra??ai (posts). Post'?? ??ra??uose nereikia atvaizduoti komentar??. Kiekvienas post'as turi tur??ti nuorod??.