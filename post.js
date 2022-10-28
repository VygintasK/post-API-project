const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const PostID = urlParams.get('post_id');
console.log(queryParams)
console.log(urlParams)
console.log(PostID)

const postWrapper = document.querySelector('.PostWrapper')
if (PostID) {
    errorIdFunction(postWrapper,'no id','index')

    fetch(`https://jsonplaceholder.typicode.com/posts?id=${PostID}&_expand=user&_embed=comments`)
    .then(response => response.json())
    .then(postsArr => {
        if (!postsArr.id){
            console.log
            errorIdFunction(postWrapper,'inccorect id','index') 
            return
        }

        let postTitle = document.createElement('h1')
        let postAuthor = document.createElement('a')
        let postAuthorTitle = document.createElement('h4')
        let postBody = document.createElement('p')
        let postComments = document.createElement('div')
        let postLinkPosts = document.createElement('a')
        let postLinkPostsTitle = document.createElement('a')

        let {title, user, body, comments} = postsArr[0]

        postTitle.textContent = title
        postAuthor.href = 'http://'+ user.website
        postAuthorTitle.textContent = user.name +' website'
        postBody.textContent = body


        postLinkPostsTitle.textContent = "Kiti autoriaus įrašai"
        postLinkPosts.href='./index.html'

        postLinkPosts.append(postLinkPostsTitle)
        postAuthor.append(postAuthorTitle)

        let commentTitle = document.createElement('h3')
        let commentWrapUl = document.createElement('ul')
        postComments.append(commentWrapUl)



        commentTitle.textContent = 'ALL COMENTS:'
        comments.forEach(coment => {
            let commentLi = document.createElement('li')
            let commentName = document.createElement('h4')
            let commentBody = document.createElement('p')
            let commentEmail = document.createElement('a')

            commentLi.append(commentName,commentBody,commentEmail)
            commentWrapUl.append(commentLi)
            commentEmail.setAttribute('href','#')

            commentName.textContent = coment.name
            commentBody.textContent = coment.body
            commentEmail.textContent = coment.email

        });
        postWrapper.append(postTitle, postAuthor, postBody, commentTitle, postComments, postLinkPosts)


    })
} else {
    errorIdFunction(postWrapper,'no id','index')
}

// 7. Sukurti naują puslapį post.html ir jame atvaizduoti:
//   7.1. Įrašo (post) pavadinimą.
//   7.2. Autoriaus vardą. Paspaudus ant autoriaus vardo, turėtų atidaryti autoriaus puslapį.
//   7.3. Įrašo turinį.
//   7.4. Įrašo komentarus. Komentarai turi būti atvaizduojami tokiu pačiu principu kaip ir pagrindiniame puslapyje.
//   7.5. Nuoroda „Kiti autoriaus įrašai", kurią paspaudus bus nukreipiama į naują puslapį posts.html. Jame bus atvaizduojami visi šio vartotojo įrašai.

function errorIdFunction(wrap,reason,redirect){
    let error = document.createElement('span')
    error.innerHTML =`<h1>ERROR - ${reason}</h1>
                      <a href=./${redirect}.html> <= Go back</a>`
    wrap.append(error)
}
