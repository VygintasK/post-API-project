// 3. Sukurti naują puslapį user.html, kuriame bus atvaizduojama vartotojo informacija:
//   3.1. Pilnas vardas.
//   3.2. Vartotojo vardas / nick'as.
//   3.3. El. paštas.
//   3.4. Adresas, kuris turės gatvę, namo numerį, miestą, pašto kodą. Paspaudus ant adreso, pagal koordinates, turėtų atidaryti šios vietos Google Maps.
//   3.5. Telefono numeris.
//   3.6. Internetinio puslapio adresas.
//   3.7. Įmonės, kurioje dirba, pavadinimas.

generateUser()

function generateUser(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(usersArr => {
        let usersWrapper = document.querySelector('.usersWrapper')
        let oneUSER = usersArr[0]
        console.dir(oneUSER)

        let userName = oneUSER.name
        let userNickname = oneUSER.username
        let userEmail = oneUSER.email
        let userPhone = oneUSER.phone
        let userWeb = oneUSER.website
        let userWork = oneUSER.company.name
        let userStreet = oneUSER.address.street
        let userApartment = oneUSER.address.suite
        let userCity = oneUSER.address.city
        let userZipcode = oneUSER.address.zipcode
        
        let userGeoLat = oneUSER.address.geo.lat
        let userGeoLng = oneUSER.address.geo.lng
        
        let userGoogle = `https://maps.google.com/maps?q=${userGeoLat},${userGeoLng}`
        
        console.log(userGoogle)
        let userNameElement = document.createElement('h2')
        let userNicknameElement = document.createElement('p')
        let userEmailElement = document.createElement('p')
        let userPhoneElement = document.createElement('p')
        let userWebElement = document.createElement('p')
        let userWorkElement = document.createElement('p')
        let userAddressElement = document.createElement('p')

        userNameElement.innerHTML  = userName
        userNicknameElement.innerHTML  = `<strong>Nickname: </strong>${userNickname}`
        userEmailElement.innerHTML  = `<strong>E-mail: </strong><a href='mailto:Sincere@april.biz'>${userEmail}</a>`
        userPhoneElement.innerHTML  = `<strong>Phone: </strong><a href='tel:${userPhone}'>${userPhone}</a>`
        userWebElement.innerHTML  = `<strong>Web address: </strong><a target='_blank' href='http://www.hildegard.org'>${userWeb}</a>`
        userWorkElement.innerHTML  = `<strong>Working at: </strong>${userWork}`
        userAddressElement.innerHTML = `<strong>Address: </strong><a target='_blank' href='${userGoogle}'>${userStreet}, ${userApartment}, ${userCity}, ${userZipcode}</a>`


        usersWrapper.append(userNameElement, userNicknameElement, userEmailElement, userPhoneElement, userWebElement, userWorkElement, userAddressElement)


    })
}
// 4. Šiame puslapyje turės būti atvaizduojama:
//   4.1. Visi vartotojo parašyti įrašai (posts). Post'ų įrašuose nereikia atvaizduoti komentarų. Kiekvienas post'as turi turėti nuorodą.
//   4.2. Visi vartotojo sukurti foto albumai. Kiekvienas albumas turės:
//     4.2.1. Albumo pavadinimą, kuris turi būti nuoroda. Kol kas nuoroda gali niekur nevesti.

