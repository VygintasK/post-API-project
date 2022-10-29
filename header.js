
const headerElement = document.createElement('header') 
const logoElement = document.createElement('img')
const navElement = document.createElement('nav')
const navUlElement = document.createElement('ul')
navUlElement.style.display = "flex"
navUlElement.style.listStyleType = "none"
navUlElement.classList.add('navigation')



let homeElement = document.createElement('li')
let usersElement = document.createElement('li')
let albumsElement = document.createElement('li')
let postsElement = document.createElement('li')

homeElement.innerHTML = `<a href='index.html'>HOME</a><>`
usersElement.innerHTML = `<a href='users.html'>USERS</a> <>`
albumsElement.innerHTML = `<a href='albums.html'>ALBUMS</a> <>`
postsElement.innerHTML = `<a href='posts.html'>POSTS</a>`

///////- cia gal reiktu su switch pabandyt prisimint kaip daros.
let currentPage = document.location.pathname
if (currentPage.includes('index')){
homeElement.style.fontWeight = "900"
}
if (currentPage.includes('users')){
usersElement.style.fontWeight = "900"
}
if (currentPage.includes('albums')){
albumsElement.style.fontWeight = "900"
}
if (currentPage.includes('posts')){
postsElement.style.fontWeight = "900"
}

document.body.prepend(headerElement)
headerElement.append(logoElement,navElement)
navElement.append(navUlElement)
navUlElement.append(homeElement,usersElement,albumsElement,postsElement)



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
searchForm.id = 'searchForm'

let InputTextElement = document.createElement('input')
InputTextElement.id = 'searchText'
InputTextElement.name = 'form_name_search'
InputTextElement.type = 'text'
navElement.append(navUlElement,searchForm)

let submit = document.createElement('input')
submit.type='submit'
submit.value = 'Search'

searchForm.append(InputTextElement,submit)

// searchForm.action = './search.html'
searchForm.action = './search.html?search_input='+InputTextElement.name



// {/* <input type="submit" value="Create Student"> */}
// form.addEventListener('submit', (event) => {