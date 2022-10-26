// API nuoroda: https://jsonplaceholder.typicode.com

// 1. Sukurti puslapį, kuriame bus atvaizduojami įrašai (posts.html). Kiekvienas įrašas turi:
//   1.1. Pavadinimą.
//   1.2. Pastraipą su įrašo (post) turiniu.
//   1.3. Autorių. Tai turi būti nuoroda. Kol kas ji gali niekur nevesti.


let allPostsWrapper = document.querySelector('.allPostsWrapper')

fetch('https://jsonplaceholder.typicode.com/posts?_limit=15?_commit&_embed=comments&_expand=user')
.then(response => response.json())
.then(data => {
    data.forEach(element => {

        let user = element.user
        let comentsArr = element.comments
        let postWrap = document.createElement('div')
        let postTitle = document.createElement('h2')
        let postID = element.id
        let authorUser = document.createElement('a')
        let commentSectionIndicator = document.createElement('h3')
        let commentWrap = document.createElement('div')
        let postBody = document.createElement('p')
        
        postWrap.setAttribute('id',postID)
        console.log(postID)
        authorUser.setAttribute('href','./user.html')
        commentSectionIndicator.classList.add('commentSectionIndicator')
        postTitle.classList.add('postTitle')
        commentWrap.classList.add('comment-wraps')

        authorUser.textContent =`article by: ${user.name}` 
        postTitle.textContent = element.title
        postBody.textContent = element.body
        commentSectionIndicator.textContent = 'COMMET SECTION:'
        
        allPostsWrapper.append(postWrap)
        postWrap.append(postTitle,postBody,authorUser,commentWrap)
        commentWrap.append (commentSectionIndicator)

        comentsArr.forEach(coment => {
            let commentName = document.createElement('h4')
            let commentBody = document.createElement('p')
            let commentEmail = document.createElement('a')
            commentEmail.setAttribute('href','#')

            commentName.textContent = coment.name
            commentBody.textContent = '- '+coment.body
            commentEmail.textContent = coment.email

            commentWrap.append(commentName,commentBody,commentEmail)
        });
    })
})
// 2. Po kiekvienu įrašu (post) pridėti posto komentarus. Kiekvienas komentaras turi:
//   2.1. Komentaro pavadinimą.
//   2.2. Komentaro turinį - pastraipą.
//   2.3. Komentarą parašiusio asmens el. pašto adresą.
