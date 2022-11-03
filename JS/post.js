import initHeader from './header.js'
initHeader()
import {firstLetterUpper as upperCase} from './functions.js'

import {param} from './functions.js'

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
            <h1>${upperCase(title)}</h1>
            <a href='http://${user.website}'> <h4>${user.name} website</h4> </a>
            <p>${upperCase(body)}</p>
            <a href='./user.html?user_id=${userId}'>Kiti autoriaus įrašai</a>
            <h3>ALL COMMENTS:</h3>`

            


            //pasidaryt coment render funkcija

            let postComments = document.createElement('div')
            let commentWrapUl = document.createElement('ul')
            postComments.append(commentWrapUl)
            postWrapper.append(postComments)
    
            comments.forEach(comment => {
                let commentLi = document.createElement('li')
                commentLi.innerHTML =`
                <h4>${upperCase(comment.name)}</h4>
                <p>${upperCase(comment.body)}</p>
                <a href='#'>${comment.email}</a>`
    
                commentWrapUl.append(commentLi)
            });
        
    } else {
        errorIdFunction(postWrapper,'no id','index')
    }   
}
function errorIdFunction(wrap,reason,redirect){
    let error = document.createElement('span')
    error.innerHTML =`<h1>ERROR - ${reason}</h1>
                      <a href=./${redirect}.html> <= Go back</a>`
    wrap.append(error)
}



// 7. Sukurti naują puslapį post.html ir jame atvaizduoti:
//   7.1. Įrašo (post) pavadinimą.
//   7.2. Autoriaus vardą. Paspaudus ant autoriaus vardo, turėtų atidaryti autoriaus puslapį.
//   7.3. Įrašo turinį.
//   7.4. Įrašo komentarus. Komentarai turi būti atvaizduojami tokiu pačiu principu kaip ir pagrindiniame puslapyje.
//   7.5. Nuoroda „Kiti autoriaus įrašai", kurią paspaudus bus nukreipiama į naują puslapį posts.html. Jame bus atvaizduojami visi šio vartotojo įrašai.
