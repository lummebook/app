import { abrirHome, abrirCadastro } from "./main.js";

// Cria a função para limpar mensagem de erro ao mudar o valor do input
function limparMensagemDeErro () {
    // Pega o parágrafo da mensagem de erro
    const erroMensagem = document.getElementById("erro__mensagem");

    erroMensagem.style.opacity = "0"; // Esconde a mensagem da tela  
    erroMensagem.textContent = ""; // Tira a mensagem
}

// Cria a função para tentar conectar o usuário
async function conectarUsuario(event) {
    event.preventDefault(); // Impede o formulário de recarregar a página

    // Pega o valor dos campos do formulário
    const email = document.getElementById("form__input-email").value.trim();
    const senha = document.getElementById("form__input-senha").value.trim();

    // Pega o parágrafo da mensagem de erro
    const erroMensagem = document.getElementById("erro__mensagem");

    erroMensagem.style.opacity = "0"; // Esconde a mensagem da tela
    erroMensagem.textContent = ""; // Tira a mensagem

    // Bloco try/catch para impedir erro de aparecer para o usuário
    // Caso a requisição der erro, cai no catch
    try {
        // Realiza a requisição para validar o usuário
        const resposta = await fetch(
            "https://lumme-api.onrender.com/usuarios/auth/conectar",
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
            erroMensagem.textContent = "Email ou senha incorretos"; // Muda a mensagem
            erroMensagem.style.opacity = "1"; // Mostra a mensagem na tela

            return; // Termina a função
        }

        const retorno = await resposta.json(); // Pega os dados enviados
        localStorage.setItem("idUsuario", retorno.idUsuario); // Armazena o ID do usuário

        erroMensagem.style.opacity = "0"; // Esconde a mensagem da tela
        erroMensagem.textContent = ""; // Tira a mensagem

        abrirHome(); // Vai para página inicial
    } catch (erro) {
        erroMensagem.textContent = "Erro na requisição. Tente novamente."; // Muda a mensagem
        erroMensagem.style.opacity = "1"; // Monstra a mensagem na tela
        console.error(erro); // Mostra mensagem do erro no console
    }
}

// Adiciona as funções aos elementos
document.querySelector(".js-conectar-usuario").addEventListener("submit", (event) => conectarUsuario(event));
document.querySelector(".js-limpar-mensagem-de-erro").addEventListener("input", limparMensagemDeErro);
document.querySelector(".js-abrir-cadastro").addEventListener("click", abrirCadastro);