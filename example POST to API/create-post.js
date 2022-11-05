// 12. Sukurti puslapį create-post.html
// 12.1 Puslapyje sukurti formą. Ji turės:
// 12.1.1. Input elementą posto pavadinimui įvesti.
// 12.1.2. Textarea elementą posto turiniui įvesti.
// 12.1.3. Select elementą, kuriame būtų atvaizduojami visų vartotojų vardai (option elementų value naudoti vartotojų id).
// 12.2. Formos submit metu:
// 12.2.1. Iš formos duomenų suformuluoti objektą pagal API reikalavimus.
// 12.2.2. Su šiais duomenimis išsiųsti POST užklausą pagal API reikalavimus.
// 12.2.3. Iš užklausos atsakymo gautų duomenų suformoluoti HTML elementą ir juos išvesti į ekraną.

async function initPost(){




    ////////kintamieji
    let postForm = document.querySelector('#postForm')
    let postUserSelect = document.querySelector('#userNameSelect')
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const resultArr = await response.json()

    resultArr.forEach(user => {
        let postOption = document.createElement('option')
        postOption.textContent = user.name
        postOption.value = user.id
        postUserSelect.append(postOption)
    });

    postForm.addEventListener('submit', (event) => {
        event.preventDefault()
    
        let {postTitle,textArea,userNameSelect} = event.target.elements
        ////////postina
        fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title: postTitle.value,
                body: textArea.value,
                userId: userNameSelect.value,
            }),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        ////////atvaizduoja
        .then((response2) => response2.json())
        .then((data)=> {
            console.log(data)
            let wrapper = document.createElement('div')
            let titleElement = document.createElement('h2')
            titleElement.textContent = data.title
            let textElement = document.createElement('p')
            textElement.textContent = data.body
            let userElement = document.createElement('h4')
            userElement.textContent = `userid=${data.userId} and postid=${data.id}`

            wrapper.append(titleElement, textElement, userElement )
            postForm.after(wrapper)
       

            postForm.reset()
        })

    })




}
initPost()

function initAlbum(){

}
initAlbum()