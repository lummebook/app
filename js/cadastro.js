import { abrirLogin, abrirHome } from "../js/main.js";

// Cria a função para limpar mensagem de erro ao mudar o valor do input
function limparMensagemDeErro() {
    // Pega o parágrafo da mensagem de erro
    const cadastroMensagem = document.getElementById("erro__mensagem");

    cadastroMensagem.textContent = ""; // Tira a mensagem
    cadastroMensagem.style.opacity = "0"; // Esconde a mensagem da tela
}

// Cria a função para cadastrar um usuário
async function cadastrarUsuario(event) {
    event.preventDefault();

    // Pega o valor dos campos do formulário
    const nome = document.getElementById("form__input-nome").value.trim();
    const email = document.getElementById("form__input-email").value.trim();
    const senha = document.getElementById("form__input-senha").value.trim();
    const confirmarSenha = document
        .getElementById("form__input-confirmar-senha")
        .value.trim();

    // Pega o parágrafo da mensagem de erro
    const cadastroMensagem = document.getElementById("erro__mensagem");

    // Confirma se as senhas digitadas são iguais
    if (senha !== confirmarSenha) {
        cadastroMensagem.textContent = "Senhas diferentes digitadas."; // Muda a mensagem
        cadastroMensagem.style.opacity = "1"; // Mostra a mensagem na tela
        return; // Termina a função
    }

    // Bloco try/catch para impedir erro de aparecer para o usuário
    try {
        // Realiza a requisição para cadastrar o usuário
        const resposta = await fetch(
            "https://lumme-api.onrender.com/usuarios/auth/cadastrar",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: { nome, email, senha } }),
            }
        );

        // Se o cadastro falhar
        if (!resposta.ok) {
            cadastroMensagem.textContent = "Dados inválidos inseridos."; // Muda a mensagem
            cadastroMensagem.style.opacity = "1"; // Mostra a mensagem na tela
            return; // Termina a função
        }

        const retorno = await resposta.json(); // Pega os dados enviados
        localStorage.setItem("idUsuario", retorno.idUsuario); // Armazena o ID do usuário

        cadastroMensagem.textContent = ""; // Tira a mensagem
        cadastroMensagem.style.opacity = "0"; // Esconde a mensagem da tela

        abrirHome(); // Vai para página inicial
    } catch (erro) {
        // Caso a requisição der erro, cai no catch
        cadastroMensagem.textContent = "Erro na requisição. Tente novamente."; // Muda a mensagem
        cadastroMensagem.style.opacity = "1"; // Mostra a mensagem na tela
        console.error(erro); // Mostra mensagem do erro no console

        // Após 3 segundos, esconde a mensagem
        setTimeout(() => {
            cadastroMensagem.textContent = ""; // Tira a mensagem
            cadastroMensagem.style.opacity = "0"; // Esconde a mensagem da tela
        }, 3000);
    }
}

// Adiciona as funções aos elementos
document
    .querySelector(".js-cadastrar-usuario")
    .addEventListener("submit", (event) => cadastrarUsuario(event));
document
    .querySelector(".js-limpar-mensagem-de-erro")
    .addEventListener("input", limparMensagemDeErro);
document
    .querySelector(".js-abrir-login")
    .addEventListener("click", abrirLogin);
