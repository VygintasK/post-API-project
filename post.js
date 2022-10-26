// API nuoroda: https://jsonplaceholder.typicode.com

// 1. Sukurti puslapį, kuriame bus atvaizduojami įrašai (posts.html). Kiekvienas įrašas turi:
//   1.1. Pavadinimą.
//   1.2. Pastraipą su įrašo (post) turiniu.
//   1.3. Autorių. Tai turi būti nuoroda. Kol kas ji gali niekur nevesti.


let allPostsWrapper = document.querySelector('.allPostsWrapper')

fetch('https://jsonplaceholder.typicode.com/posts?_limit=15')
.then(response => response.json())
.then(data => {
    data.forEach(element => {
        let postWrap = document.createElement('div')
        let postTitle = document.createElement('h2')
        postTitle.classList.add('postTitle')
        let postBody = document.createElement('p')

        //iskart apendinu kad nesumaisytu vietu
        allPostsWrapper.append(postWrap)

        let postId = element.id
        let postUserId = element.userId

        postTitle.textContent = element.title
        postBody.textContent = element.body
        

        fetch('https://jsonplaceholder.typicode.com/users/'+postUserId)
        .then(response => response.json())
        .then(user => {
            let authorUser = document.createElement('a')
            authorUser.setAttribute('href','#')
            

            authorUser.textContent =`article by: ${user.name}` 
            
            // Jei cia appendinsi allPostsWrapper gali sumaisyt
            // duomenis nes nevienodu laiku paskutiniai duomeny gryzta
            postWrap.append(postTitle,postBody,authorUser)

            fetch('https://jsonplaceholder.typicode.com/comments?postId='+postId)
            .then(response => response.json())
            .then(comentsArr => {

                let commentSectionIndicator = document.createElement('h3')
                commentSectionIndicator.classList.add('commentSectionIndicator')
                let commentWrap = document.createElement('div')
                commentWrap.classList.add('comment-wraps')

                commentSectionIndicator.textContent = 'COMMET SECTION:'
                
                postWrap.append(commentWrap)
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
    })
})
// 2. Po kiekvienu įrašu (post) pridėti posto komentarus. Kiekvienas komentaras turi:
//   2.1. Komentaro pavadinimą.
//   2.2. Komentaro turinį - pastraipą.
//   2.3. Komentarą parašiusio asmens el. pašto adresą.
