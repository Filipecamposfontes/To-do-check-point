/*======================================================================= 
Check point II - Aplicação To-Do
Alunos: Filipe Campos | Harry Möbbs Júnior | Juan Barcelos | Fabiana Yumi Sato | Fernanda Brum
GITS: @Filipecamposfontes | @harrymobbsjunior | @JuanBarcelos | FabianaYSK | @fernanda-brum

Professor: IVIN Rodrigues 
Turma: 09 Noite

Documentação API: https://ctd-todo-api.herokuapp.com/#/

============================================================================= */
document.querySelector('#submit-btn-create').addEventListener('click', reload => {

    /* Variaveis do formulario e captura de valores digitados */
  
    reload.preventDefault();
    
    let firstNameReference = document.querySelector('#inputFirstName');
    let lastNameReference = document.querySelector('#inputLastName');
    let emailReference = document.querySelector('#inputEmail');
    let passwordReference = document.querySelector('#inputPassword');
    let passwordConfirmReference = document.querySelector('#inputPasswordConfirm');

    let info = {
        firstName: firstNameReference.value,
        lastName: lastNameReference.value,
        email: emailReference.value,
        password: passwordReference.value
    }

      let requestHeaders = {
        'Content-Type': 'application/json'
    }
    
    let requestConfiguration = {
        method: 'POST',
        body: JSON.stringify(info),
        headers: requestHeaders
    }
    //alert(JSON.stringify(info));

    fetch('https://ctd-todo-api.herokuapp.com/v1/users', requestConfiguration).then(
        response => {
            response.json().then(
    
                data => {
                    localStorage.setItem('token', data.jwt)
    
                }
    
            )
    
        }
    
    )
    

    //Contas novas
    //let passwordContaNova = document.querySelector('#inputPasswordNovaConta').value;

    //validaMail(email)
    //validaPassword(password)
    //validaPasswordNovaConta(passwordContaNova)

            
})