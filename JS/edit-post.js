import initHeader from './header.js'
import {param, renderUserSelectOptions,renderPost} from './functions.js'

initHeader()
// turiu funkcija bet kolkas manual darau. Poto perrasyt
const queryParams = document.location.search
const urlParams = new URLSearchParams(queryParams)
const searchId = urlParams.get('post_id');

async function init(){
    const postID = searchId
    let editWrapper = document.querySelector('.editWrapper')
    let title = document.querySelector('#editTitle')
    let textarea = document.querySelector('#textArea')
    let nameSelect = document.querySelector('#userNameSelect')
    let editForm = document.querySelector('#editForm')
    
    renderUserSelectOptions(nameSelect)
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${postID}&_expand=user`)
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
            userId:UserNameSelect.value,
        }
        
        let updatedOBJ = await updatedPost(postID,updateOBJ)
        console.log(updatedOBJ)

        editWrapper.innerHTML=''

        let updatedPostElement = renderPost(updatedOBJ)
        editWrapper.append(await updatedPostElement)
    })

}
init()







  // console.log(await renderPost(...postsData))
    

async function updatedPost(postID,updateOBJ){
    console.log(postID,updateOBJ)
    const resPut = await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`, {
        method: 'PUT',
        body: JSON.stringify(updateOBJ),
        headers:{
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    const updatedPostData = await resPut.json()
    return updatedPostData

}