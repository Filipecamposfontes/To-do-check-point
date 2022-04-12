/*======================================================================= 
Check point II - Aplicação To-Do
Alunos: Filipe Campos | Harry Möbbs Júnior | Juan Barcelos | Fabiana Yumi Sato | Fernanda Brum
GITS: @Filipecamposfontes | @harrymobbsjunior | @JuanBarcelos | FabianaYSK | @fernanda-brum

Professor: IVIN Rodrigues 
Turma: 09 Noite

Documentação API: https://ctd-todo-api.herokuapp.com/#/
============================================================================= */
let buttonloginRef = document.querySelector('#submit-btn-login');

buttonloginRef.addEventListener('click', event => {
    event.preventDefault();

    let emailReference = document.querySelector('#inputEmail');
    let passwordReference = document.querySelector('#inputPassword');
    

    let credentials = {
        email: emailReference.value,
        password: passwordReference.value,
    };

    let requestHeaders = {
        'Content-Type': 'application/json'
    };

    let configRequest = {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: requestHeaders
    };

     fetch('https://ctd-todo-api.herokuapp.com/v1/users/login',configRequest)
     .then(response => {
         response.json().then(
             data => {
                 localStorage.setItem('token: ', data.jwt);
                 console.log(response.status)
                 if(response.status === 201){
                    window.location.href = './tarefas.html';
                 };
             }
         );
     });
});



/*
document.querySelector('#submit-btn-login').addEventListener('click', reload => {

    /* Variaveis do formulario e captura de valores digitados 
    
  
    reload.preventDefault();
    

    if(!validaMail(email).isValid){
        document.querySelector(".mensagemEmail").innerHTML = validaMail(email).message;
        return;
    }

validaPassword(password)
            


})
*/