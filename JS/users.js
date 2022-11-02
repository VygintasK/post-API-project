init()
function init(){
    let usersWrapper = document.querySelector('.usersWrapper')
    let usersContentWrapper = document.createElement('div')
    let userTitleElement = document.createElement('h1')
    userTitleElement.textContent = 'All Users:'

    usersWrapper.append(userTitleElement, usersContentWrapper)
    
    fetch('https://jsonplaceholder.typicode.com/users?_embed=posts')
    .then(response => response.json())
    .then(usersArr => {
        usersArr.forEach(user => {
            let {name, posts, id} = user
            let userElement = document.createElement('a')
            userElement.href = './user.html?user_id='+id
            userElement.innerHTML = `<p><strong>${name} </strong> has ${posts.length} posts</p>`

            usersContentWrapper.append(userElement)
        });
    })
}
// 8. Sukurti vartotojų puslapį (users.html), kuriame būtų atvaizduotas vartotojų sąrašas.
//   8.1. Prie vartotojo turėtu būti jo vardas ir parašytų post'ų skaičius.
//   8.2. Paspaudus ant vartotojo - nukreipiama į jo puslapį.