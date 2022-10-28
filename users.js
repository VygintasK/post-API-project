// 8. Sukurti vartotojų puslapį (users.html), kuriame būtų atvaizduotas vartotojų sąrašas.
//   8.1. Prie vartotojo turėtu būti jo vardas ir parašytų post'ų skaičius.
//   8.2. Paspaudus ant vartotojo - nukreipiama į jo puslapį.

let usersWraper = document.querySelector('.usersWraper')
let usersContentWrapper = document.createElement('div')
let userTitleElement = document.createElement('h1')
userTitleElement.textContent = 'All Users:'
usersWraper.append(userTitleElement, usersContentWrapper)
 
fetch('https://jsonplaceholder.typicode.com/users?_embed=posts')
.then(response => response.json())
.then(usersArr => {
    usersArr.forEach(user => {
        let userID = user.id
        let userElement = document.createElement('a')
        let userNameElement = document.createElement('p')

        let {name, posts} = user

        userElement.href = './user.html?user_id='+userID
        userNameElement.innerHTML = `<strong>${name} </strong> has ${posts.length} posts`

        userElement.append(userNameElement)
        usersContentWrapper.append(userElement)
    });
    
})