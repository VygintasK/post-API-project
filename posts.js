console.log('veikia')



let postsWraper = document.querySelector('.postsWraper')
let postsContentWrapper = document.createElement('div')
let postTitleElement = document.createElement('h1')
postTitleElement.textContent = 'All Posts:'
postsWraper.append(postTitleElement, postsContentWrapper)
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(postsArr => {

    postsArr.forEach(post => {
        let postID = post.id
        let postLinkElement = document.createElement('a')
        let postTitleElement = document.createElement('p')

        let {title} = post
        console.log(title)
        postLinkElement.href = './post.html?post_id='+postID
        console.log(postLinkElement.href)
        postTitleElement.innerHTML = `<strong>${title} </strong>`

        postLinkElement.append(postTitleElement)
        postsContentWrapper.append(postLinkElement)
    });
    
})