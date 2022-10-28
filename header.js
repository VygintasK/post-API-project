let header = document.querySelector('header') 
let headerUlElement = document.createElement('ul')
headerUlElement.style.display = "flex"
headerUlElement.style.listStyleType = "none"

let homeElement = document.createElement('li')
let usersElement = document.createElement('li')
let albumsElement = document.createElement('li')
let postsElement = document.createElement('li')
homeElement.innerHTML = `<a href='index.html'>HOME</a><>`
usersElement.innerHTML = `<a href='users.html'>USERS</a> <>`
albumsElement.innerHTML = `<a href='albums.html'>ALBUMS</a> <>`
postsElement.innerHTML = `<a href='posts.html'>POSTS</a>`
header.append(headerUlElement)
headerUlElement.append(homeElement, usersElement, albumsElement, postsElement)