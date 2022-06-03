//only allow write numbers into the input field
function onlyNumbers(e){
    //Catch key
    key = e.keyCode || e.which;
    if(key == 13){
        finderUsers()
    }
    //Save value key
    teclado=String.fromCharCode(key)
    numeros="0123456789"
    // 8(backspace) 37(izquierda) 38(derecha) 46(suprimir)
    especiales="8-37-38-46";//array
    
    tecladoEspecial=false;
    //Loop to see if the key is an special character
    for(var i in especiales){
        if(key == especiales[i]){
            tecladoEspecial=true
        }
    }
    //If is not a number or an special character dont allow to write
    if(numeros.indexOf(teclado)==-1 && !tecladoEspecial){
        return false
    }
    else{
        return true
    }
}
//Search cleaner 
function resetSearch(){
    document.getElementById('search').value = ''
}

//Function to execute the search and the API
function finderUsers(){
    let number = document.getElementById('search').value
    if(number!=null || number!=0){
        //URL API Constant
        const API_URL = 'https://randomuser.me/api/?results='+number;
        console.log(API_URL)
        //Fetch API
        //Select div that must contains the API response
        const HTMLResponse = document.querySelector('#app')

        //Transform API text into JSON 'then(response => response.json())' then use the object returned 'data'
        fetch(API_URL).then(response => response.json()).then(data =>{
            // console.log(data);
            // midato=data
            //Create a template use map to loop through data.results note:remember use somodin not "" or '' instead use ``
            let user="" ;
            data.results.map((lists)=>{
            user+=`
            <div class="container-users">
            <ul>
            <li><h2>Name: <span class="h2-size">${lists.name.first}</span> </h2></li>
            <li><img src="${lists.picture.large}"></li>
            <li><span class="bold">Phone Number:</span> ${lists.cell}</li>
            <li><span class="bold">Dob:</span> ${lists.dob.date}</li>
            <li><span class="bold">Age:</span> ${lists.dob.age}</li>
            <li><span class="bold">Email ID:</span> ${lists.email}</li>
            <li><span class="bold">Gender:</span> ${lists.gender}</li>
            <li><span class="bold">City:</span> ${lists.location.city}</li>
            <li><span class="bold">Country:</span> ${lists.location.country}</li>
            <li><span class="bold">PostCode:</span> ${lists.location.postcode}</li>
        </ul>
            </div>`});
            HTMLResponse.innerHTML= user;
        });
        document.getElementById('search').value = ''
    }
}
