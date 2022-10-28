console.log('veikia')



let postsWraper = document.querySelector('.postsWraper')
let postsContentWrapper = document.createElement('div')
let postTitleElement = document.createElement('h1')
postTitleElement.textContent = 'All Posts:'
postsWraper.append(postTitleElement, postsContentWrapper)
 /////////////////////////////////////////////////////////////
fetch('https://jsonplaceholder.typicode.com/users?_embed=posts')
.then(response => response.json())
.then(usersArr => {
    // console.log(usersArr)
    usersArr.forEach(user => {
        console.log(user.id)
        // console.log(user.posts.length)
        let userID = user.id
        let userElement = document.createElement('a')
        let userNameElement = document.createElement('p')

        let {name, posts} = user

        userElement.href = './user.html?user_id='+userID
        console.log(userElement.href)
        userNameElement.innerHTML = `<strong>${name} </strong> has ${posts.length} posts`

        userElement.append(userNameElement)
        usersContentWrapper.append(userElement)
    });
    
})