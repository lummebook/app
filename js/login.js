import { abrirHome, abrirCadastro } from "./main.js";

// Cria a função para limpar mensagem de erro ao mudar o valor do input
function limparMensagemDeErro () {
    // Pega o parágrafo da mensagem de erro
    const loginMensagem = document.getElementById("erro__mensagem");

    loginMensagem.textContent = ""; // Tira a mensagem
    loginMensagem.style.opacity = "0"; // Esconde a mensagem da tela  
}

// Cria a função para tentar conectar o usuário
async function conectarUsuario(event) {
    event.preventDefault(); // Impede o formulário de recarregar a página

    // Pega o valor dos campos do formulário
    const email = document.getElementById("form__input-email").value.trim();
    const senha = document.getElementById("form__input-senha").value.trim();

    // Pega o parágrafo da mensagem de erro
    const loginMensagem = document.getElementById("erro__mensagem");

    // Bloco try/catch para impedir erro de aparecer para o usuário
    // Caso a requisição der erro, cai no catch
    try {
        // Realiza a requisição para validar o usuário
        const resposta = await fetch(
            "http://localhost:8080/usuarios/auth/conectar",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: { email, senha },
                }),
            }
        );

        // Se a validação falhar
        if (!resposta.ok) {
            loginMensagem.textContent = "Email ou senha incorretos"; // Muda a mensagem
            loginMensagem.style.opacity = "1"; // Mostra a mensagem na tela
            return; // Termina a função
        }

        const retorno = await resposta.json(); // Pega os dados enviados
        localStorage.setItem("idUsuario", retorno.idUsuario); // Armazena o ID do usuário

        loginMensagem.textContent = ""; // Tira a mensagem
        loginMensagem.style.opacity = "0"; // Esconde a mensagem da tela

        abrirHome(); // Vai para página inicial
    } catch (erro) {
        loginMensagem.textContent = "Erro na requisição. Tente novamente."; // Muda a mensagem
        console.error(erro); // Mostra mensagem do erro no console
    }
}

// Adiciona as funções aos elementos
document.querySelector(".js-conectar-usuario").addEventListener("submit", (event) => conectarUsuario(event));
document.querySelector(".js-limpar-mensagem-de-erro").addEventListener("input", limparMensagemDeErro);
document.querySelector(".js-abrir-cadastro").addEventListener("click", abrirCadastro);