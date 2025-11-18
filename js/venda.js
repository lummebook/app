import { abrirHome } from "./main.js";

// Cria a função para vender um livro
async function venderLivro(event) {
    event.preventDefault();

    // Pega o parágrafo da mensagem de erro
    const vendaMensagem = document.getElementById("erro__mensagem");

    vendaMensagem.textContent = ""; // Tira a mensagem
    vendaMensagem.style.opacity = "0"; // Esconde a mensagem da tela

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

        abrirHome(); // Volta para página inicial
    } catch (erro) {
        // Muda a mensagem
        vendaMensagem.textContent = "Erro na requisição. Tente novamente.";

        // Mostra a mensagem na tela
        vendaMensagem.style.opacity = "1";

        // Mostra mensagem do erro no console
        console.error(erro);

        // Após 3 segundos, esconde a mensagem
        setTimeout(() => {
            vendaMensagem.textContent = ""; // Tira a mensagem
            vendaMensagem.style.opacity = "0"; // Esconde a mensagem da tela
        }, 3000);
    }
}

// Adiciona as funções aos elementos
document.querySelector(".js-abrir-home").addEventListener("click", abrirHome);
document
    .querySelector(".js-vender-livro")
    .addEventListener("submit", (event) => venderLivro(event));
