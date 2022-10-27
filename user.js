// 3. Sukurti naują puslapį user.html, kuriame bus atvaizduojama vartotojo informacija:
//   3.1. Pilnas vardas.
//   3.2. Vartotojo vardas / nick'as.
//   3.3. El. paštas.
//   3.4. Adresas, kuris turės gatvę, namo numerį, miestą, pašto kodą. Paspaudus ant adreso, pagal koordinates, turėtų atidaryti šios vietos Google Maps.
//   3.5. Telefono numeris.
//   3.6. Internetinio puslapio adresas.
//   3.7. Įmonės, kurioje dirba, pavadinimas.

let userID = 1

// `https://jsonplaceholder.typicode.com/users/${userID}/posts`
fetch(`https://jsonplaceholder.typicode.com/users/${userID}?_embed=posts`)
.then(response => response.json())
.then(user => {
    let usersWrapper = document.querySelector('.usersWrapper')

    let userName = user.name
    let userNickname = user.username
    let userEmail = user.email
    let userPhone = user.phone
    let userWeb = user.website
    let userWork = user.company.name
    let userStreet = user.address.street
    let userApartment = user.address.suite
    let userCity = user.address.city
    let userZipcode = user.address.zipcode
    
    let userGeoLat = user.address.geo.lat
    let userGeoLng = user.address.geo.lng
    let userGoogle = `https://maps.google.com/maps?q=${userGeoLat},${userGeoLng}`

    let userNameElement = document.createElement('h2')
    let userNicknameElement = document.createElement('p')
    let userEmailElement = document.createElement('p')
    let userPhoneElement = document.createElement('p')
    let userWebElement = document.createElement('p')
    let userWorkElement = document.createElement('p')
    let userAddressElement = document.createElement('p')
    
    let userPostUl = document.createElement('ul')
    let userPostHeader = document.createElement('h3')
    userPostHeader.textContent = 'All comments:'
    userPostUl.classList.add('postsWrap')

    let userAlbumUl = document.createElement('ul')
    let userAlbumTittle = document.createElement('h3')
    userAlbumTittle.textContent = 'All albums:'

    userNameElement.innerHTML  = userName
    userNicknameElement.innerHTML  = `<strong>Nickname: </strong>${userNickname}`
    userEmailElement.innerHTML  = `<strong>E-mail: </strong><a href='mailto:Sincere@april.biz'>${userEmail}</a>`
    userPhoneElement.innerHTML  = `<strong>Phone: </strong><a href='tel:${userPhone}'>${userPhone}</a>`
    userWebElement.innerHTML  = `<strong>Web address: </strong><a target='_blank' href='http://www.hildegard.org'>${userWeb}</a>`
    userWorkElement.innerHTML  = `<strong>Working at: </strong>${userWork}`
    userAddressElement.innerHTML = `<strong>Address: </strong><a target='_blank' href='${userGoogle}'>${userStreet}, ${userApartment}, ${userCity}, ${userZipcode}</a>`


    usersWrapper.append(userNameElement, userNicknameElement, userEmailElement, userPhoneElement, userWebElement, userWorkElement, userAddressElement,userPostHeader,userPostUl, userAlbumTittle, userAlbumUl)

    // 4. Šiame puslapyje turės būti atvaizduojama:
    //   4.1. Visi vartotojo parašyti įrašai (posts). Post'ų įrašuose nereikia atvaizduoti komentarų. Kiekvienas post'as turi turėti nuorodą.
    let userPostsArr = user.posts
    userPostsArr.forEach(post => {
        let postID = post.id
        let postTitle = post.title
        let postTitleElement = document.createElement('li')
        // console.log(postID)
        postTitleElement.innerHTML = `post id ${postID}: <a href="./index.html#${postID}">${postTitle}</a>`
        
        userPostUl.append(postTitleElement)
    });

    //   4.2. Visi vartotojo sukurti foto albumai. Kiekvienas albumas turės:
    //     4.2.1. Albumo pavadinimą, kuris turi būti nuoroda. Kol kas nuoroda gali niekur nevesti.   

    fetch(`https://jsonplaceholder.typicode.com/users/${userID}/albums`)
    .then(response => response.json())
    .then(albumsArr => {
        albumsArr.forEach(album => {
            let albumID = album.id
            let albumTitle = album.title
            let albumTitleElement = document.createElement('li')
            albumTitleElement.innerHTML = `album id ${albumID}: <a href='./albums.html'> ${albumTitle}</a>`

            userAlbumUl.append(albumTitleElement) 

        })
    })
})
