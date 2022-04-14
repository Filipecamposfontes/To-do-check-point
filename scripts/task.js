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

if (localStorage.getItem('token') === 'undefined') {
    deslogarUsuario()
} else {
    requestConfigurationGet
}

// Deslogar o usuário quando for 401 = token inválido 
fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestConfigurationGet).then(
    response => {
        console.log(response)
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
    let dataModificada = new Date(task.createdAt)
    listaTarefasPendentesRef.classList.remove('skeleton')

    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfigurationGet).then(
        response => {
            if (response.ok) {
                response.json().then(
                    tasks => {
                        console.log(tasks)
                        for (let task of tasks) {
                            if (task.completed) {
                                listaTarefasTerminadasRef.innerHTML += `
                                <li class="tarefa">
                                <div class="not-done" onclik="tarefaTerminada(${task.id})"></div>
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
                            } else {
                                listaTarefasPendentesRef.innerHTML += `
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
})

let novaTarefa = document.querySelector("#novaTarefa")

function criarTarefas() {
    let requestConfigurationPost = {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }

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
function tarefaTerminada(id, token) {
    let requestConfigurationPut = {
        method: "PUT",
        body: JSON.stringify({ completed: true }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationPut).fetch(
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

function tarefaPendente(id, token) {
    let requestConfigurationPut = {
        method: "PUT",
        body: JSON.stringify({ completed: false }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationPut).fetch(
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
function removerTarefa(id, token) {
    let requestConfigurationDelete = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfigurationDelete).fetch(
        response => {
            console.log(response)
            if (response.ok) {
                location.reload()
                localStorage.setItem('tarefas', JSON.stringify(response))
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
}