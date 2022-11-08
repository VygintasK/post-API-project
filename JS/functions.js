export function firstLetterUpper(text){
    return text[0].toUpperCase() + text.slice(1)
}
export function param(getName_Id){
    const queryParams = document.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const resultParam = urlParams.get(getName_Id);
    return resultParam
    

}
export function createElement(elType, elClass, elText){
    let element = document.createElement(elType)
    element.classList.add(elClass)
    element.textContent = elText
    return element
}
export function renderComments(comments, commentWrap){

    let commentSectionIndicator = document.createElement('h3')
        commentSectionIndicator.classList.add('commentSectionIndicator')
        commentSectionIndicator.textContent = 'COMMET SECTION:'
    commentWrap.append (commentSectionIndicator)

    let commentsArr = comments
    commentsArr.forEach(comment => {
        let {name, body, email}= comment
        let commentName = document.createElement('h4')
            commentName.textContent = firstLetterUpper(name)
        let commentBody = document.createElement('p')
            commentBody.textContent = '- '+firstLetterUpper(body)
        let commentEmail = document.createElement('a')
            commentEmail.textContent = email
            commentEmail.setAttribute('href','#')
        //
        commentWrap.append(commentName,commentBody,commentEmail)
    });
}
export function errorIdFunction(wrap,reason,redirect){
    let error = document.createElement('span')
    error.innerHTML =`<h1>ERROR - ${reason}</h1>
                      <a href=./${redirect}.html> <= Go back</a>`
    wrap.append(error)
}
export function renderAlbums(albumsArr, allPostsWrapper){
    let albumWrapElement = document.createElement('div')
        albumWrapElement.classList.add('AlbumWrap')
    let albumElementUl = document.createElement('ul')
    let albumTitleElement = document.createElement('h3')
        albumTitleElement.textContent = 'ALBUMS LIST:'
    allPostsWrapper.append(albumWrapElement)
    albumWrapElement.append(albumTitleElement, albumElementUl)

    albumsArr.forEach(album => {
        // console.log(album.photos[0].thumbnailUrl)  
        let {id, title, user}=album
        let albumElementLi = document.createElement('div')
            albumElementLi.classList.add('albumWrap')
        let albumElementName = document.createElement('h4')
            albumElementName.textContent = firstLetterUpper(title)
        let albumElementAuthor = document.createElement('p')
            albumElementAuthor.textContent = user.name
        let albumElementAuthorA = document.createElement('a')
            albumElementAuthorA.href ='./user.html?user_id='+user.id
        let albumElementPhoto = document.createElement('img')
            albumElementPhoto.src = album.photos[0].thumbnailUrl
        let albumElementPhotoA = document.createElement('a')
            albumElementPhotoA.href ='./album.html?album_id='+id
        albumElementAuthorA.append(albumElementAuthor)
        albumElementPhotoA.append(albumElementPhoto)
        albumElementLi.append(albumElementName, albumElementAuthorA, albumElementPhotoA)
        albumWrapElement.append(albumElementLi)
    })
}
export async function renderPost(postData){
    const resUser = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`)
    const userArr = await resUser.json()

    let wrapper = document.createElement('div')
    wrapper.classList.add('temp')
    wrapper.innerHTML = `
    <h2>${postData.title}</h2>
    <p>${postData.body}</p>
    <p><strong>${userArr.name}</strong> - user id: ${postData.userId}, post id: ${postData.id}</p>
    <a href='./edit-post.html?post_id=${postData.id}'>edit post</a>`
    return wrapper
}
export async function renderUserSelectOptions(postUserSelect){
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const resultArr = await response.json()

    resultArr.forEach(user => {
        let postOption = document.createElement('option')
        postOption.textContent = user.name
        postOption.value = user.id
        postUserSelect.append(postOption)
    });
}
export async function updatedApiPost(postID,updateOBJ){
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
//SITA REIK SUTVARKYT IR PATIKRINT - niekur nenaudojama
export function renderSingleComment(commentOBJ){

    let {name, body, email}= comment
    let commentName = document.createElement('h4')
        commentName.textContent = firstLetterUpper(name)
    let commentBody = document.createElement('p')
        commentBody.textContent = '- '+firstLetterUpper(body)
    let commentEmail = document.createElement('a')
        commentEmail.textContent = email
        commentEmail.setAttribute('href','#')
    commentWrap.append(commentName,commentBody,commentEmail)
}

export function pegination(pagesCount,searchPage){
    let pagesWrapper = createElement('div','pagesWrapper')
    searchPage = Number(searchPage)
    if(!searchPage){
        searchPage=1
    } 


    for (let i=1; i<=pagesCount; i+=1){
        let loopPageNumber = i
        let page
        if (loopPageNumber == searchPage){
            page = createElement('span',`page${i}`,`${i}`)
        } else{
            page = createElement('a',`page${i}`,`${i}`)
        }
        page.href = `.${document.location.pathname}?page=${i}`
        pagesWrapper.append(page)
    }

    let firstPage = 1
    let first
    let last
    let next
    let prev
    if (firstPage == searchPage){
        first = createElement('span','first',' First ')
        prev = createElement('span','prev','Prev')
    } else{
        first = createElement('a','first',' << First ')
        first.href = `.${document.location.pathname}?page=${firstPage}`
        prev = createElement('a','prev',' < Prev ')
        prev.href = `.${document.location.pathname}?page=${searchPage-1}`
    }

    if (pagesCount == searchPage){
        last = createElement('span','last',' Last ')
        next = createElement('span','next','Next')
    }else{
        last = createElement('a','last',' Last >> ')
        last.href = `.${document.location.pathname}?page=${pagesCount}`
        next = createElement('a','next',' Next > ')
        next.href = `.${document.location.pathname}?page=${searchPage+1}`
    }

    pagesWrapper.prepend(first,prev)
    pagesWrapper.append(next,last)
    
    return pagesWrapper
} 