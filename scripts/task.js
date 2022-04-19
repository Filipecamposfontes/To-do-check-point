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

<<<<<<< HEAD
if (!localStorage.getItem('token')) {
=======
if (localStorage.getItem('token') === 'undefined') {
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
    deslogarUsuario()
} else {
    requestConfigurationGet
}

// Deslogar o usuário quando for 401 = token inválido 
fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestConfigurationGet).then(
    response => {
<<<<<<< HEAD
=======
        console.log(response)
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
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
<<<<<<< HEAD
                    obterTodasTarefas()
=======
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
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
<<<<<<< HEAD
    //let dataModificada = new Date(task.createdAt)
    listaTarefasPendentesRef.innerHTML = ""
=======
    let dataModificada = new Date(task.createdAt)
    listaTarefasPendentesRef.classList.remove('skeleton')
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662

    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfigurationGet).then(
        response => {
            if (response.ok) {
                response.json().then(
                    tasks => {
                        console.log(tasks)
                        for (let task of tasks) {
                            if (task.completed) {
                                listaTarefasTerminadasRef.innerHTML += `
<<<<<<< HEAD
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
=======
                                <li class="tarefa">
                                <div class="not-done" onclik="tarefaTerminada(${task.id})"></div>
                                <div class="descricao">
                                    <p class="nome">${task.description}</p>
                                    <p class="timestamp">Criada em: ${dataModificada.toLocaleDateString()}</p>
                                </div>
                                <div class="done">
                                <button class="lixoBotao" onclick="removerTarefa(${task.id})">
                                  <img  src="" />
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
                                </button>
                              </div>
                            </li> 
                            `
                            } else {
                                listaTarefasPendentesRef.innerHTML += `
<<<<<<< HEAD
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
=======
                                <li class="tarefa">
                                <div class="not-done" onclik="tarefaPendente(${task.id})"></div>
                                <div class="descricao">
                                    <p class="nome">${task.description}</p>
                                    <p class="timestamp">Criada em: ${dataModificada.toLocaleDateString()}</p>
                                </div>
                                <div class="done">
                                <button class="lixoBotao" onclick="removerTarefa(${task.id})">
                                  <img  src="" />
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
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
<<<<<<< HEAD

    criarTarefas()
})

function criarTarefas() {
    let novaTarefa = document.querySelector("#novaTarefa").value
    let task = {"description": novaTarefa, "completed": false}

=======
})

let novaTarefa = document.querySelector("#novaTarefa")

function criarTarefas() {
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
    let requestConfigurationPost = {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }

<<<<<<< HEAD
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
=======
    fetch('https://ctd-todo-api.herokuapp.com/v1/users/tasks', requestConfigurationPost).fetch(
        response => {
            if (response.ok) {
                response.json().then(
                    tasks => {
                        for (let task of tasks) {
                            `
                            <li class="tarefa">
                            <div class="not-done" onclik="tarefaPendente(${task.id})"></div>
                            <div class="descricao">
                                <p class="nome">${task.description}</p>
                                <p class="timestamp">Criada em: ${dataModificada.toLocaleDateString()}</p>
                            </div>
                            <div class="done">
                            <button class="lixoBotao" onclick="removerTarefa(${task.id})">
                              <img  src="" />
                            </button>
                          </div>
                        </li> 
                            `
                        }
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
                    }
                )
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

// Obter uma determinada tarefa 
function obterUmaTarefa() {

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationGet).then(
        response => {
            console.log(response)
            if (response.ok) {
                localStorage.setItem('tarefas', JSON.stringify(response))
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


// Atualizar uma tarefa existente (True or False/ Terminada ou Pendente)
<<<<<<< HEAD
function terminarTarefa(id) {
=======
function tarefaTerminada(id, token) {
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
    let requestConfigurationPut = {
        method: "PUT",
        body: JSON.stringify({ completed: true }),
        headers: {
            'Content-Type': 'application/json',
<<<<<<< HEAD
            'Authorization': localStorage.getItem('token')
        }
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationPut).then(
=======
            'Authorization': token
        }
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationPut).fetch(
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
        response => {
            if (response.ok) {
                location.reload()
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

<<<<<<< HEAD
function penderTarefa(id) {
=======
function tarefaPendente(id, token) {
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
    let requestConfigurationPut = {
        method: "PUT",
        body: JSON.stringify({ completed: false }),
        headers: {
            'Content-Type': 'application/json',
<<<<<<< HEAD
            'Authorization': localStorage.getItem('token')
        }
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationPut).then(
=======
            'Authorization': token
        }
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationPut).fetch(
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
        response => {
            if (response.ok) {
                location.reload()
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

// Apagar uma tarefa 
<<<<<<< HEAD
function removerTarefa(id) {
=======
function removerTarefa(id, token) {
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
    let requestConfigurationDelete = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
<<<<<<< HEAD
            'Authorization': localStorage.getItem('token')
        }
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationDelete).then(
=======
            'Authorization': token
        }
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationDelete).fetch(
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
        response => {
            console.log(response)
            if (response.ok) {
                location.reload()
<<<<<<< HEAD
=======
                localStorage.setItem('tarefas', JSON.stringify(response))
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
                // alert('Tarefa removida')
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
<<<<<<< HEAD
}

//editar tarefa
function editarTarefa(id){
    let descriptionRef = document.querySelector(`#tarefa-${id} .editTask`)
    console.log(descriptionRef.value);

    let requestConfigurationPut= {
        method: "PUT",
        body: JSON.stringify({ description: descriptionRef.value }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationPut).then(
        response => {
            if (response.ok) {
                location.reload()
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
function abrirEdicao(id){
    document.querySelector(`#tarefa-${id} .editTask`).style.display = "block"
    document.querySelector(`#tarefa-${id} .lixoBotao`).style.display = "block"
    document.querySelector(`#tarefa-${id} .doneBotao`).style.display = "block"

    document.querySelector(`#tarefa-${id} .editBotao`).style.display = "none"
    document.querySelector(`#tarefa-${id} .nome`).style.display = "none"
=======
>>>>>>> 4f9f0f0942d9c486f2415aaf8f02e37d19233662
}