/*======================================================================= 
Check point II - Aplicação To-Do
Alunos: Filipe Campos | Harry Möbbs Júnior | Juan Barcelos | Fabiana Yumi Sato | Fernanda Brum
GITS: @Filipecamposfontes | @harrymobbsjunior | @JuanBarcelos | FabianaYSK | @fernanda-brum

Professor: IVIN Rodrigues 
Turma: 09 Noite
============================================================================= */
document.querySelector('#submit-btn-login').addEventListener('click', reload => {

    /* Variaveis do formulario e captura de valores digitados */
    
  
    reload.preventDefault();
    let email = document.querySelector('#inputEmail').value;
    let password = document.querySelector('#inputPassword').value;

    if(!validaMail(email).isValid){
        document.querySelector(".mensagemEmail").innerHTML = validaMail(email).message;
        return;
    }

validaPassword(password)
            

})