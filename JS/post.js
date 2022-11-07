import initHeader from './header.js'
import {param, errorIdFunction, firstLetterUpper as upperCase, renderComments} from './functions.js'

initHeader()
init()
async function init(){
    const PostID = param('post_id')
    console.log(PostID)
    
    const postWrapper = document.querySelector('.PostWrapper')
    if (PostID) {

        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${PostID}&_expand=user&_embed=comments`)
        const postsArr = await response.json()

        if (!postsArr[0].id){
            errorIdFunction(postWrapper,'incorrect id','index') 
            return
        }
        let {title, user, body, comments, userId} = postsArr[0]
        postWrapper.innerHTML = `
        <a href='./edit-post.html?post_id=${PostID}'>|EDIT POST|</a>
        <h1>${upperCase(title)}</h1>
        <a href='http://${user.website}'> <h4>${user.name} website</h4> </a>
        <p>${upperCase(body)}</p>
        <a href='./user.html?user_id=${userId}'>Kiti autoriaus įrašai</a>`
        let postComments = document.createElement('div')
            postComments.classList.add('commentsWrap')
        renderComments(comments, postComments)
        postWrapper.append(postComments)

            
    } else {
        errorIdFunction(postWrapper,'no id','index')
    }   
}




// 7. Sukurti naują puslapį post.html ir jame atvaizduoti:
//   7.1. Įrašo (post) pavadinimą.
//   7.2. Autoriaus vardą. Paspaudus ant autoriaus vardo, turėtų atidaryti autoriaus puslapį.
//   7.3. Įrašo turinį.
//   7.4. Įrašo komentarus. Komentarai turi būti atvaizduojami tokiu pačiu principu kaip ir pagrindiniame puslapyje.
//   7.5. Nuoroda „Kiti autoriaus įrašai", kurią paspaudus bus nukreipiama į naują puslapį posts.html. Jame bus atvaizduojami visi šio vartotojo įrašai.
