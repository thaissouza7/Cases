// SELECIONAR TODOS OS PONTOS BATIDOS 
const ulPontos = document.getElementById("pontos");
const btnTodosPontos = document.getElementById("btn-todos-pontos");
const formBuscarPonto = document.getElementById("form-buscar-ponto");
const inputIdPonto = document.getElementById("input-id-ponto");
const ulPonto = document.getElementById("ponto");

btnTodosPontos.addEventListener("click", () => {
    fetch("http://localhost:3000/Pontos")
        .then((response) => response.json())
        .then((data) => {
            ulPontos.innerHTML = "";
            data.forEach((Ponto) => {
                const li = document.createElement("li");
                li.innerText = `ID: ${Ponto.id}
                Funcionário: ${Ponto.funcionario}
                Data: ${Ponto.dia}
                Entrada: ${Ponto.entrada}
                Saída: ${Ponto.saida}
                `;
                ulPontos.appendChild(li);
            });
        })
        .catch((error) => {
            console.error(error);
            ulPontos.innerHTML = "Erro ao carregar pontos.";
        });
});
// SELECIONAR TODOS OS PONTOS BATIDOS 



// SELECIONAR APENAS UM PONTO ATRAVES DO ID
formBuscarPonto.addEventListener("submit", (event) => {
    event.preventDefault();
    const idPonto = inputIdPonto.value;
    fetch(`http://localhost:3000/Ponto/${idPonto}`)
        .then((response) => response.json())
        .then((Ponto) => {
            if (Ponto.id) {
                ulPonto.innerHTML = `
        <li>ID: ${Ponto.id}</li>
        <li>Funcionário: ${Ponto.funcionario}</li>
        <li>Data: ${Ponto.dia}</li>
        <li>Entrada: ${Ponto.entrada}</li>
        <li>Saída: ${Ponto.saida}</li>
      `;
            } else {
                ulPonto.innerHTML = "Ponto não encontrado.";
            }
        })
        .catch((error) => {
            console.error(error);
            ulPonto.innerHTML = "Erro ao buscar ponto.";
        });
});
// SELECIONAR APENAS UM PONTO ATRAVES DO ID




// INSERIR O PONTO, METODO INSERT 
const formInserirPonto = document.getElementById("form-inserir-ponto");
const inputFuncionario = document.getElementById("input-funcionario");
const inputDia = document.getElementById("input-dia");
const inputEntrada = document.getElementById("input-entrada");
const inputSaida = document.getElementById("input-saida");
const divMensagem = document.getElementById("mensagem");

formInserirPonto.addEventListener("submit", (event) => {
    const funcionario = inputFuncionario.value;
    const dia = inputDia.value;
    const entrada = inputEntrada.value;
    const saida = inputSaida.value;
    const novoPonto = { funcionario, dia, entrada, saida };

    fetch("http://localhost:3000/Ponto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoPonto),
    })

})

// INSERIR O PONTO, METODO INSERT 



// ATUALIZAR O PONTO, METODO UPDATE 
const formAtualizarPonto = document.querySelector("#form-atualizar-ponto");
const inputIdPontoAtualizar = document.querySelector("#input-id-ponto-atualizar");
const inputFuncionarioAtualizar = document.querySelector("#input-funcionario-atualizar");
const inputDiaAtualizar = document.querySelector("#input-dia-atualizar");
const inputEntradaAtualizar = document.querySelector("#input-entrada-atualizar");
const inputSaidaAtualizar = document.querySelector("#input-saida-atualizar");
const divMensagemAtualizar = document.querySelector("#mensagem-atualizar");

formAtualizarPonto.addEventListener("submit", (event) => {
;
const idPonto = inputIdPontoAtualizar.value;
const funcionario = inputFuncionarioAtualizar.value;
const dia = inputDiaAtualizar.value;
const entrada = inputEntradaAtualizar.value;
const saida = inputSaidaAtualizar.value;
const updatedPonto = { funcionario, dia, entrada, saida };

fetch(`http://localhost:3000/Pontoupdate/${idPonto}`, {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(updatedPonto),
})
.then((response) => response.text())
.then((message) => {
divMensagemAtualizar.innerText = message;
})
.catch((error) => {
console.error(error);
divMensagemAtualizar.innerText = "Erro ao atualizar ponto.";
});
});
// ATUALIZAR O PONTO, METODO UPDATE 




// EXCLUIR PONTO, METODO DELETE
const formExcluirPonto = document.getElementById('form-excluir-ponto');
formExcluirPonto.addEventListener('submit', (event) => {
;
const idPonto = document.getElementById('input-id-ponto-excluir').value;

fetch(`http://localhost:3000/Pontodelete/${idPonto}`, {
method: 'DELETE',
})
.then((response) => response.text())
.then((message) => {
const divMensagem = document.getElementById('mensagem-excluir');
divMensagem.innerText = message;
})
.catch((error) => {
console.error(error);
const divMensagem = document.getElementById('mensagem-excluir');
divMensagem.innerText = 'Erro ao excluir ponto.';
});
});
// EXCLUIR PONTO, METODO DELETE