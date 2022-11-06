
// 12. Sukurti puslapį create-post.html
// 12.1 Puslapyje sukurti formą. Ji turės:
// 12.1.1. Input elementą posto pavadinimui įvesti.
// 12.1.2. Textarea elementą posto turiniui įvesti.
// 12.1.3. Select elementą, kuriame būtų atvaizduojami visų vartotojų vardai (option elementų value naudoti vartotojų id).
// 12.2. Formos submit metu:
// 12.2.1. Iš formos duomenų suformuluoti objektą pagal API reikalavimus.
// 12.2.2. Su šiais duomenimis išsiųsti POST užklausą pagal API reikalavimus.
// 12.2.3. Iš užklausos atsakymo gautų duomenų suformoluoti HTML elementą ir juos išvesti į ekraną.
import initHeader from './header.js'
import {param, renderPost, renderUserSelectOptions, firstLetterUpper as upperCase, renderComments} from './functions.js'

initHeader()

initPost()

async function initPost(){

    ////////kintamieji
    let postForm = document.querySelector('#postForm')
    let postUserSelect = document.querySelector('#userNameSelect')
    

    renderUserSelectOptions(postUserSelect)


    postForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        let {postTitle,textArea,userNameSelect} = event.target.elements
        let postOBJ = {
            title: postTitle.value,
            body: textArea.value,
            userId: userNameSelect.value,
        }
        //////////////////////////////////
        const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'POST',
            body: JSON.stringify(postOBJ),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const postData = await resPost.json()
        console.log(postData)
        /////////////////////////////////
        let postWrapper = await renderPost(postData)
        postForm.after(postWrapper)
        postForm.reset()
    })

}


