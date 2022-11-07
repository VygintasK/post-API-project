import initHeader from './header.js'
import {param, updatedApiPost,createElement, renderUserSelectOptions,renderPost} from './functions.js'

initHeader()



init()
async function init(){
    const postID=param('post_id')
    if(!postID){
        let errorMassage = createElement('h1', 'errorMassage', 'ERROR - No id found')
        document.body.prepend(errorMassage)
        return
    }
    let editWrapper = document.querySelector('.editWrapper')
    let title = document.querySelector('#editTitle')
    let textarea = document.querySelector('#textArea')
    let nameSelect = document.querySelector('#userNameSelect')
    let editForm = document.querySelector('#editForm')
    
    renderUserSelectOptions(nameSelect)
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${postID}`)
    const postsData = await response.json()
    let data = postsData[0]
    title.value = data.title
    textarea.value = data.body
    nameSelect.value = data.userId

    editForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        let {editTitle, textArea, UserNameSelect } = event.target.elements
        let updateOBJ = {
            id: postID,
            title: editTitle.value,
            body: textArea.value,
            userId: UserNameSelect.value,
        }
        
        let updatedOBJ = await updatedApiPost(postID,updateOBJ)

        editWrapper.innerHTML=''

        let updatedPostElement = renderPost(updatedOBJ)
        editWrapper.append(await updatedPostElement)
    })
}
    

