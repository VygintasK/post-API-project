let header = document.querySelector('header') 
let headerUlElement = document.createElement('ul')
headerUlElement.style.display = "flex"
headerUlElement.style.listStyleType = "none"

let homeElement = document.createElement('li')
let usersElement = document.createElement('li')
let albumsElement = document.createElement('li')
let postsElement = document.createElement('li')
homeElement.innerHTML = `<a href='index.html'>HOME</a><>`
usersElement.innerHTML = `<a href='users.html'>USERS</a> <>`
albumsElement.innerHTML = `<a href='albums.html'>ALBUMS</a> <>`
postsElement.innerHTML = `<a href='posts.html'>POSTS</a>`

headerUlElement.append(homeElement, usersElement, albumsElement, postsElement)

// 11. Sukurti paieškos funkcionalumą navigacijos elemente:
// 11.1. Navigacijos elemente sukurti formą, kuri turi text tipo input elementą (nepamiršti pridėti name atributą).
// 11.2. Formos submit metu, naudojant action atributą, nukreipti į naują puslapį (search.html).

// 11.3. Šiame puslapyje atvaizduoti paieškos rezultatą.
// 11.3.1. Jeigu nėra tinkamų rezultatų, tai parašyti jog rezultatų pagal užklausą nerasta.

// 11.4. Filtruoti pagal šias kategorijas:
// 11.4.1. Vartotojus.
// 11.4.2. Postus.
// 11.4.2. Albumus.
let searchForm = document.createElement('form')
searchForm.setAttribute('id','searchForm')

let formInputText = document.createElement('input')
formInputText.setAttribute('id','formInputText')
formInputText.setAttribute('type','text')

let submit = document.createElement('input')
submit.setAttribute('type','submit')
submit.setAttribute('value','Search')

searchForm.addEventListener('submit', (event) => {

    searchForm.action = './search.html'

})


searchForm.append(formInputText,submit)

header.append(headerUlElement,searchForm)


{/* <input type="submit" value="Create Student"> */}
// form.addEventListener('submit', (event) => {