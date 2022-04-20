/*======================================================================= 
Check point II - Aplicação To-Do
Alunos: Filipe Campos | Harry Möbbs Júnior | Juan Barcelos | Fabiana Yumi Sato | Fernanda Brum
GITS: @Filipecamposfontes | @harrymobbsjunior | @JuanBarcelos | FabianaYSK | @fernanda-brum

Professor: IVIN Rodrigues 
Turma: 09 Noite

Documentação API: https://ctd-todo-api.herokuapp.com/#/

============================================================================= */
// Obter o token do usuario = authorization = status:200 
let requestConfigurationGet = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
}

// Deslogar o usuário 
function deslogarUsuario() {
    localStorage.clear()
    window.location.href = './index.html'
}

if (!localStorage.getItem('token')) {
    deslogarUsuario()
} else {
    requestConfigurationGet
}

// Deslogar o usuário quando for 401 = token inválido 
fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestConfigurationGet).then(
    response => {
        if (response.ok) {
            requestConfigurationGet
        } else if (response.status === 401) {
            alert('É preciso de autorização')
            deslogarUsuario()
        }
    }
)

// Inserir o nome do usuário pelo getMe 
fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestConfigurationGet).then(
    response => {
        if (response.ok) {
            response.json().then(
                user => {
                    let nomeUsuario = document.querySelector('#nomeUsuario')
                    nomeUsuario.innerHTML = `Bem-vindo ${user.firstName} ${user.lastName}`
                    obterTodasTarefas()
                }
            )
        } else if (response.status === 404) {
            alert('O usuário não existe')
        } else if (response.status === 500) {
            alert('Erro')
        }
    }
)

// Remover skeleton e Obter a lista de tarefas 
function obterTodasTarefas() {

    let listaTarefasPendentesRef = document.querySelector('.tarefas-pendentes')
    let listaTarefasTerminadasRef = document.querySelector('.tarefas-terminadas')
    //let dataModificada = new Date(task.createdAt)
    listaTarefasPendentesRef.innerHTML = ""

    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfigurationGet).then(
        response => {
            if (response.ok) {
                response.json().then(
                    tasks => {
                        console.log(tasks)
                        for (let task of tasks) {
                            if (task.completed) {
                                listaTarefasTerminadasRef.innerHTML += `
                                <li id="tarefa-${task.id}" class="tarefa">
                                <div class="not-done" onclick="penderTarefa(${task.id})"></div>
                                <div class="descricao">
                                    <p class="nome">${task.description}</p>
                                    <input type="text" class="editTask" value="${task.description}"/>
                                    <p class="timestamp">Criada em: ${new Date(task.createdAt).toLocaleDateString('pt-BR')}</p>
                                </div>
                                <div class="done">
                                <button class="lixoBotao" onclick="removerTarefa(${task.id})">
                                  <img  src="./assets/delete.png" />
                                </button>
                                <button class="editBotao" onclick="abrirEdicao(${task.id})">
                                    <img  src="./assets/edit.png" />
                                </button>
                                <button class="doneBotao" onclick="editarTarefa(${task.id})">
                                    <img  src="./assets/done.png" />
                                </button>
                              </div>
                            </li> 
                            `
                            } else {
                                listaTarefasPendentesRef.innerHTML += `
                                <li id="tarefa-${task.id}" class="tarefa">
                                <div class="not-done" onclick="terminarTarefa(${task.id})"></div>
                                <div class="descricao">
                                    <p class="nome">${task.description}</p>
                                    <input type="text" class="editTask" value="${task.description}"/>
                                    <p class="timestamp">Criada em: ${new Date(task.createdAt).toLocaleDateString('pt-BR')}</p>
                                </div>
                                <div class="done">
                                <button class="lixoBotao" onclick="removerTarefa(${task.id})">
                                  <img  src="./assets/delete.png" />
                                </button>
                                <button class="editBotao" onclick="abrirEdicao(${task.id})">
                                    <img  src="./assets/edit.png" />
                                </button>
                                <button class="doneBotao" onclick="editarTarefa(${task.id})">
                                    <img  src="./assets/done.png" />
                                </button>
                              </div>
                            </li> 
                            `
                            }
                        }
                    }
                )
            } else if (response.status === 401) {
                alert('É preciso de autorização')
                deslogarUsuario()
            } else if (response.status === 500) {
                alert('Erro')
                deslogarUsuario()
            }
        }
    )
}

// Criar tarefas 
let tarefasRef = document.querySelector(".nova-tarefa")

tarefasRef.addEventListener('submit', event => {
    event.preventDefault()
   
    criarTarefas()
})

function criarTarefas() {
    let novaTarefa = document.querySelector("#novaTarefa").value
    event.preventDefault()
    if(novaTarefa === ""){
        Swal.fire(
            'warning',
            'Preencha o campo com uma tarefa',
            'success'
        )
    }
    else{
        let task = {
            "description": novaTarefa,
            "completed": false
        }

        let requestConfigurationPost = {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }
    
        fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfigurationPost).then(
            response => {
                if (response.ok) {
                    response.json().then(
                        task => {
                            console.log(task)
                            let tarefasContainerRef = document.querySelector(".tarefas-pendentes");
                            tarefasContainerRef.innerHTML += `<li id="tarefa-${task.id}" class="tarefa">
                                                                <div class="not-done" onclick="terminarTarefa(${task.id})"></div>
                                                                <div class="descricao">
                                                                    <p class="nome">${task.description}</p>
                                                                    <input type="text" class="editTask" value="${task.description}"/>
                                                                    <p class="timestamp">Criada em: ${new Date(task.createdAt).toLocaleDateString('pt-BR')}</p>
                                                                </div>
                                                                <div class="done">
                                                                <button class="lixoBotao" onclick="removerTarefa(${task.id})">
                                                                    <img  src="./assets/delete.png" />
                                                                </button>
                                                                <button class="editBotao" onclick="abrirEdicao(${task.id})">
                                                                    <img  src="./assets/edit.png" />
                                                                </button>
                                                                <button class="doneBotao" onclick="editarTarefa(${task.id})">
                                                                    <img  src="./assets/done.png" />
                                                                </button>
                                                            </div>
                                                            </li> `
                        },
                        Swal.fire(
                            'Tarefa criada com sucesso', // Título
                            'Click no botão', // Mensagem
                            'success' // Tipo de ícone
                        )
    
                    )
                } else if (response.status === 400 || response.status === 401 || response.status === 404 || response.status === 500) {
                    Swal.fire(
                        'warning',
                        `${response.status} Error`,
                        'success'
                    )
    
                    deslogarUsuario()
                }
            }
        )
    }

 
}

// Obter uma determinada tarefa 

function obterUmaTarefa() {

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationGet).then(
        response => {
            console.log(response)
            if (response.ok) {
                localStorage.setItem('tarefas', JSON.stringify(response))
            } else if (response.status === 400 || response.status === 401 || response.status === 404 || response.status === 500) {
                Swal.fire(
                    'warning',
                    `${response.status} Error`,
                    'success'
                )

                deslogarUsuario()
            }
        }
    )
}


// Atualizar uma tarefa existente (True or False/ Terminada ou Pendente)

function terminarTarefa(id) {
    let requestConfigurationPut = {
        method: "PUT",
        body: JSON.stringify({
            completed: true
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationPut).then(
        response => {
            if (response.ok) {
                Swal.fire({
                    title: 'Atualizar tarefa',
                    text: "Você tem certeza",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, Deixe como esta!'
                }).then((result) => {
                    // Validamos se o usuário confirma a ação
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Tarefa alterada com sucesso', // Título
                            'Click no botão', // Mensagem
                            'success' // Tipo de ícone
                        )
                        location.reload()
                    }
                })
            } else if (response.status === 400 || response.status === 401 || response.status === 404 || response.status === 500) {
                Swal.fire(
                    'warning',
                    `${response.status} Error`,
                    'success'
                )
                deslogarUsuario()
            }
        }
    )
}

function penderTarefa(id) {
    let requestConfigurationPut = {
        method: "PUT",
        body: JSON.stringify({
            completed: false
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationPut).then(
        response => {
            if (response.ok) {
                Swal.fire({
                    title: 'Eliminar a tarefa',
                    text: "Você tem certeza",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, Eliminar como esta!'
                }).then((result) => {
                    // Validamos se o usuário confirma a ação
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Tarefa eliminada com sucesso', // Título
                            'Click no botão', // Mensagem
                            'success' // Tipo de ícone
                        )
                        location.reload()
                    }
                })
            } else if (response.status === 400 || response.status === 401 || response.status === 404 || response.status === 500) {
                Swal.fire(
                    'warning',
                    `${response.status} Error`,
                    'success'
                )
                deslogarUsuario()
            }
        }
    )
}

// Apagar uma tarefa 

function removerTarefa(id) {
    let requestConfigurationDelete = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationDelete).then(
        response => {
            console.log(response)
            if (response.ok) {
                Swal.fire({
                    title: 'Remover a tarefa',
                    text: "Você tem certeza",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, Remover está tarefa!'
                }).then((result) => {
                    // Validamos se o usuário confirma a ação
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Tarefa removida com sucesso', // Título
                            'Click no botão', // Mensagem
                            'success' // Tipo de ícone
                        )
                        location.reload()
                    }
                })
            } else if (response.status === 400 || response.status === 401 || response.status === 404 || response.status === 500) {
                Swal.fire(
                    'warning',
                    `${response.status} Error`,
                    'success'
                )
                deslogarUsuario()
            }
        }
    )
}

//editar tarefa

function editarTarefa(id) {
    let descriptionRef = document.querySelector(`#tarefa-${id} .editTask`)
    console.log(descriptionRef.value);

    let requestConfigurationPut = {
        method: "PUT",
        body: JSON.stringify({
            description: descriptionRef.value
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationPut).then(
        response => {
            if (response.ok) {
                Swal.fire({
                    title: 'Atualizar tarefa',
                    text: "Você tem certeza",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, Atualizar!'
                }).then((result) => {
                    // Validamos se o usuário confirma a ação
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Tarefa alterada com sucesso', // Título
                            'Click no botão', // Mensagem
                            'success' // Tipo de ícone
                        )
                        location.reload();
                    }
                })

            } else if (response.status === 400) {
                alert('ID inválido')
                deslogarUsuario()
            } else if (response.status === 401) {
                alert('É preciso de autorização')
                deslogarUsuario()
            } else if (response.status === 404) {
                alert('Tarefa inexistente')
                deslogarUsuario()
            } else if (response.status === 500) {
                alert('Erro')
                deslogarUsuario()
            }
        }
    )
}

//deixar form de edicao de tarefa visivel

function abrirEdicao(id) {
    document.querySelector(`#tarefa-${id} .editTask`).style.display = "block"
    document.querySelector(`#tarefa-${id} .lixoBotao`).style.display = "block"
    document.querySelector(`#tarefa-${id} .doneBotao`).style.display = "block"

    document.querySelector(`#tarefa-${id} .editBotao`).style.display = "none"
    document.querySelector(`#tarefa-${id} .nome`).style.display = "none"
}