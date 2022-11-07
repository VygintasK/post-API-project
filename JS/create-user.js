import initHeader from "./header.js"


initHeader()
initCreateUser()
function initCreateUser(){
    let userWrap = document.querySelector('#createUserWrap')
    let userForm = document.querySelector('#userForm')
    userForm.innerHTML = `
    <input type="text" id="name" placeholder="Write Name">
    <input type="text" id="username" placeholder="Write user name">
    <input type="email" id="email" placeholder="Write Email">
    <input type="text" id="street" placeholder="Write Street">
    <input type="text" id="suite" placeholder="Write Suite">
    <input type="text" id="city" placeholder="Write City">
    <input type="text" id="zipcode" placeholder="Write zip code">
    <input type="text" id="lat" placeholder="Write lat">
    <input type="text" id="lng" placeholder="Write lng">
    <input type="phone" id="phone" placeholder="Write phone">
    <input type="text" id="website" placeholder="Write website">
    <input type="text" id="companyName" placeholder="Write company name">
    <input type="text" id="catchPhrase" placeholder="Write catch phrase">
    <input type="text" id="bs" placeholder="Write business">
    <input id="userSubmit" type="submit" value="Create User">
    `
    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log(event.target.elements)
        let {name,username,email,street,suite,city,lat,lng,phone,website,companyName,catchPhrase,bs}= event.target.elements
        const newUserOBJ={
            name: name.value,
            username: username.value,
            email: email.value,
            address: {
                street: street.value,
                suite: suite.value,
                city: city.value,
                zipcode: zipcode.value,
                geo: {
                    lat: lat.value,
                    lng: lng.value,
                }
            },
            phone: phone.value,
            website: website.value,
            company:{
                name: companyName.value,
                catchPhrase: catchPhrase.value,
                bs:bs.value,
            }
        }
        console.log(newUserOBJ)

        let newUserData = await createUser(newUserOBJ)
        

        
        let newUserElement = document.createElement('div')
        newUserElement.innerHTML=`
        <p>${newUserData.name}</p>
        <p>${newUserData.username}</p>
        <p>${newUserData.email}</p>
        <p>${newUserData.address.street}</p>
        <p>${newUserData.address.suite}</p>
        <p>${newUserData.address.city}</p>
        <p>${newUserData.address.zipcode}</p>
        <p>${newUserData.address.geo.lat}</p>
        <p>${newUserData.address.geo.lng}</p>
        <p>${newUserData.phone}</p>
        <p>${newUserData.website}</p>
        <p>${newUserData.company.name}</p>
        <p>${newUserData.company.catchPhrase}</p>
        <p>${newUserData.company.bs}</p>
        `
        console.log(newUserElement)
        userWrap.innerHTML=''
        userWrap.append(newUserElement)

    })
}

async function createUser(newUserOBJ){
    const resUsers = await fetch(`https://jsonplaceholder.typicode.com/users`, {
        method: 'POST',
        body: JSON.stringify(newUserOBJ),
        headers:{
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    const userData = await resUsers.json()
    console.log(userData)
    return userData
}

