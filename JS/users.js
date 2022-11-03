import initHeader from './header.js'
import {} from './functions.js'
initHeader()

init()
async function init(){
    let usersWrapper = document.querySelector('.usersWrapper')
    let usersContentWrapper = document.createElement('div')
    let userTitleElement = document.createElement('h1')
    userTitleElement.textContent = 'All Users:'

    usersWrapper.append(userTitleElement, usersContentWrapper)
    
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_embed=posts')
    const usersArr = await response.json()

    renderUsers(usersArr, usersWrapper)

}
function renderUsers(usersArr, usersContentWrapper ){
    usersArr.forEach(user => {
        let {name, posts, id} = user
        let userElement = document.createElement('a')
        userElement.href = './user.html?user_id='+id
        userElement.innerHTML = `<p><strong>${name} </strong> has ${posts.length} posts</p>`

        usersContentWrapper.append(userElement)
    });
}

// 8. Sukurti vartotojų puslapį (users.html), kuriame būtų atvaizduotas vartotojų sąrašas.
//   8.1. Prie vartotojo turėtu būti jo vardas ir parašytų post'ų skaičius.
//   8.2. Paspaudus ant vartotojo - nukreipiama į jo puslapį.