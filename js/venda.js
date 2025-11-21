import { abrirHome } from "./main.js";

// Cria a função para vender um livro
async function venderLivro(event) {
    event.preventDefault();

    // Pega o parágrafo da mensagem de erro
    const erroMensagem = document.getElementById("erro");

    erroMensagem.style.opacity = "0"; // Esconde a mensagem da tela
    erroMensagem.textContent = ""; // Tira a mensagem

    // Pega os elementos do container e da mensagem
    const popupContainer = document.getElementById("popup");
    const popupMensagem = document.getElementById("popup__mensagem");

    // Pega o valor dos campos do formulário
    const titulo = document.getElementById("form__input-titulo").value.trim();
    const autor = document.getElementById("form__input-autor").value.trim();
    const preco = document.getElementById("form__input-preco").value;
    const quantidade = Number(
        document.getElementById("form__input-quant").value
    );

    // Bloco try/catch para impedir erro de aparecer para o usuário
    try {
        const idVendedor = localStorage.getItem("idUsuario");
        if (!idVendedor) {
            // Se der erro, mostra mensagem
            popupMensagem.textContent = "Usuário não conectado.";
            popupContainer.style.display = "block";
            console.error(erro);

            // Esconde a mensagem após 3 segundos
            setTimeout(() => {
                popupContainer.style.display = "none";
                popupMensagem.textContent = "";
            }, 3000);
            return;
        }

        // Realiza a requisição para colocar o livro à venda
        const resposta = await fetch("https://lumme-api.onrender.com/livros", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: { idVendedor, titulo, autor, preco, quantidade },
            }),
        });

        if (!resposta.ok) {
            console.error(resposta);

            // Mostra a mensagem na tela
            erroMensagem.textContent = "Dados inválidos inseridos.";
            erroMensagem.style.opacity = "1";

            // Após 3 segundos, esconde a mensagem
            setTimeout(() => {
                erroMensagem.style.opacity = "0"; // Esconde a mensagem da tela
                erroMensagem.textContent = ""; // Tira a mensagem
            }, 3000);
            return;
        }

        abrirHome(); // Volta para página inicial
    } catch (erro) {
        // Mostra a mensagem na tela
        erroMensagem.textContent = "Erro na requisição. Tente novamente.";
        erroMensagem.style.opacity = "1";

        // Mostra mensagem do erro no console
        console.error(erro);
    }
}

// Adiciona as funções aos elementos
document.querySelector(".js-abrir-home").addEventListener("click", abrirHome);
document
    .querySelector(".js-vender-livro")
    .addEventListener("submit", (event) => venderLivro(event));
