/*======================================================================= 
Check point II - Aplicação To-Do
Alunos: Filipe Campos | Harry Möbbs Júnior | Juan Barcelos | Fabiana Yumi Sato | Fernanda Brum
GITS: @Filipecamposfontes | @harrymobbsjunior | @JuanBarcelos | FabianaYSK | @fernanda-brum

Professor: IVIN Rodrigues 
Turma: 09 Noite
============================================================================= */


    /*=========================================================== 
    Validação E-mail 
    ==============================================================*/

function validaMail (email){
    if (!!email) {
        let emailParsed = email.split('@');

        if (emailParsed.length != 2) {
            return { isValid: false, message: "email invalido" };
        } else {
            if (emailParsed[1].split('.').length != 2) {
                return { isValid: false, message: "email invalido" };
            }
        }

        return {isValid: true};
    }else{
        return { isValid: false, message: "O campo email nao pode estar vazio" };
    }
}


    /* ===========================================
    Validação Senha Entrada no sistema
    ===============================================*/

function validaPassword (password){

     //Valida Senha em branco

  if(password == "") {  
    document.querySelector(".mensagem-password").innerHTML = "Campo senha vazio, por favor digite sua senha";  
    return false;  
 } 
  
else {  

    /* Subistituir pela validação da API */

    alert("Password correto");  
 }  
}  





   /* ================================================
   Validação Senha Novas Contas
   ======================================================*/

    function validaPasswordNovaConta (passwordNovaConta){

        //Valida Senha Vazia
   
     if(passwordNovaConta == "") {  
       document.querySelector(".mensagem-password").innerHTML = "A senha não pode ser vazia";  
       return false;  
    } 
     
   // Valida Senha menor que 8 
   
    if(passwordNovaConta.length < 8 || passwordNovaConta.length > 15) {  
       document.querySelector(".mensagem-password").innerHTML = "A senha tem de ter no minimo 8 caracteres e ser menor que 15 caracteres";  
       return false;  
    } 
    
   else {  

    // Substituir pelo post API
       alert("Password is correct");
    }
}