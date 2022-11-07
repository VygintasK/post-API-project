import initHeader from './header.js'
import {firstLetterUpper} from './functions.js'

initHeader()
init()
async function init(){
    let postsWrapper = document.querySelector('.postsWrapper')
    let postsContentWrapper = document.createElement('div')
    let postTitleElement = document.createElement('h1')
        postTitleElement.textContent = 'All Posts:'
    let createPost = document.createElement('a')
        createPost.textContent = '|CREATE NEW POST|' 
        createPost.href = './create-post.html'
    postsWrapper.append(createPost, postTitleElement, postsContentWrapper)

    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const postsArr = await response.json()

    renderPostsOrUsers(postsArr, postsContentWrapper)

}

function renderPostsOrUsers(postsArr, postsContentWrapper){
    postsArr.forEach(post => {
        let postLinkElement = document.createElement('a')
        let postTitleElement = document.createElement('p')

        let {title, id} = post
        postLinkElement.href = './post.html?post_id='+id
        postTitleElement.innerHTML = `<strong>${firstLetterUpper(title)} </strong>`

        postLinkElement.append(postTitleElement)
        postsContentWrapper.append(postLinkElement)
    });
}
