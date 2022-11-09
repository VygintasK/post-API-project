import initHeader from './header.js'
import {firstLetterUpper, param, pegination} from './functions.js'
initHeader()
init()

async function init(){
    let searchPage = param('page')
    let limit = param('limit')
    let defaultLimit = 25
    defaultLimit=(limit)?limit:defaultLimit
    

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${searchPage}&_limit=${defaultLimit}`)
    const postsArr = await response.json()
    const totalItems = response.headers.get('x-total-count')

    let pagesWrapperReturned = pegination(searchPage,totalItems,defaultLimit)

    let postsWrapper = document.querySelector('.postsWrapper')
    let postsContentWrapper = document.createElement('div')
    let postTitleElement = document.createElement('h1')
        postTitleElement.textContent = 'All Posts:'
    let createPost = document.createElement('a')
        createPost.textContent = '|CREATE NEW POST|' 
        createPost.href = './create-post.html'
    postsWrapper.append(pagesWrapperReturned,createPost, postTitleElement, postsContentWrapper)



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

