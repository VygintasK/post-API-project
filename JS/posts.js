import initHeader from './header.js'
import {firstLetterUpper,createElement,param} from './functions.js'

initHeader()
init()
async function init(){
    let whatCurrentPage = param('page')

    let postsWrapper = document.querySelector('.postsWrapper')
    let fetchAddress = pegination(whatCurrentPage,postsWrapper)
    
    

    let postsContentWrapper = document.createElement('div')
    let postTitleElement = document.createElement('h1')
        postTitleElement.textContent = 'All Posts:'
    let createPost = document.createElement('a')
        createPost.textContent = '|CREATE NEW POST|' 
        createPost.href = './create-post.html'
    postsWrapper.append(createPost, postTitleElement, postsContentWrapper)

    const response = await fetch(fetchAddress)
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

function pegination(whatCurrentPage,postsWrapper){
    let fetchAddress = ''
    let total =100
    let limit = 25
    let pages = Math.ceil(total / limit)
    console.log(pages)
    if (!whatCurrentPage){
        whatCurrentPage = 1
    }

    let pagesWrapper = createElement('div','pagesWrapper')
    for (let i=1; i<=pages; i+=1){
        
        let cyclePageNumber = i
        let page = ''
        
        if (cyclePageNumber == whatCurrentPage){
            page = createElement('span',`page${i}`,`${i}`)
        } else{
            page = createElement('a',`page${i}`,`${i}`)
        }
        page.href = `./posts.html?page=${i}`
        pagesWrapper.append(page)
        
        if (whatCurrentPage==cyclePageNumber){
            fetchAddress = `https://jsonplaceholder.typicode.com/posts?_page=${cyclePageNumber}&_limit=${limit}`

        }
    }
    let firstPage = 1
    let first
    let last

        if (firstPage == whatCurrentPage){
            first = createElement('span','first',' First ')
        } else{
            first = createElement('a','first',' First ')
            first.href = '/posts.html?page=1'
        }

        if (pages == whatCurrentPage){
         last = createElement('span','last',' Last ')
        }else{
            last = createElement('a','last',' Last ')
            last.href = `/posts.html?page=${pages}`
        }
        

    pagesWrapper.prepend(first)
    pagesWrapper.append(last)
    postsWrapper.append(pagesWrapper)

    return fetchAddress
} 