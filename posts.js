let postsWraper = document.querySelector('.postsWraper')
let postsContentWrapper = document.createElement('div')
let postTitleElement = document.createElement('h1')
postTitleElement.textContent = 'All Posts:'
postsWraper.append(postTitleElement, postsContentWrapper)
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(postsArr => {

    postsArr.forEach(post => {
        let postLinkElement = document.createElement('a')
        let postTitleElement = document.createElement('p')

        let {title, id} = post
        postLinkElement.href = './post.html?post_id='+id
        postTitleElement.innerHTML = `<strong>${title} </strong>`

        postLinkElement.append(postTitleElement)
        postsContentWrapper.append(postLinkElement)
    });
    
})