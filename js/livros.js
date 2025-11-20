import {
    abrirHome,
    abrirCarrinho,
    abrirVenda,
    abrirLivrosRegistrados,
    desconectarUsuario,
    deletarUsuario
 } from "./main.js";

async function retornarLivrosDoUsuario () {
    // Pega os elementos do container e da mensagem de erro
    const erroContainer = document.getElementById("erro");
    const erroMensagem = document.getElementById("erro__mensagem");

    // Pega os elementos do container e da mensagem
    const popupContainer = document.getElementById("popup");
    const popupMensagem = document.getElementById("popup__mensagem");

    erroContainer.style.display = "block";
    erroMensagem.textContent = "Carregando...";

    // Pega o ID do usuário
    const idUsuario = localStorage.getItem("idUsuario");
    if (!idUsuario) {
        popupContainer.style.display = "block";
        popupMensagem.textContent = "ID de usuário não fornecido.";

        erroContainer.style.display = "block";
        erroMensagem.textContent = "Erro ao retornar livros. Tente novamente.";

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            erroContainer.style.display = "none";
            erroMensagem.textContent = "";

            popupContainer.style.display = "none";
            popupMensagem.textContent = "";
        }, 3000);
        return;
    }

    try {
        const resposta = await fetch(
            `https://lumme-api.onrender.com/livros/usuario/${idUsuario}`
        );
        if (!resposta.ok) {
            popupContainer.style.display = "block";
            popupMensagem.textContent = "Usuário não encontrado.";

            erroContainer.style.display = "block";
            erroMensagem.textContent =
                "Erro ao retornar livros. Tente novamente.";

            // Esconde a mensagem após 3 segundos
            setTimeout(() => {
                erroContainer.style.display = "none";
                erroMensagem.textContent = "";

                popupContainer.style.display = "none";
                popupMensagem.textContent = "";
            }, 3000);
            return;
        }

        erroContainer.style.display = "none";
        erroMensagem.textContent = "";

        const livrosContainer = document.getElementById("livros__container");
        const livrosRetornados = await resposta.json();

        for (const livro of livrosRetornados) {
            const div = document.createElement("div");

            div.classList.add("livro");
            div.dataset.idLivro = livro.idLivro;

            div.innerHTML = `
                <div class="livro__imagem"></div>
                <div class="livro__conteudo">
                    <h3 class="livro__titulo">${livro.titulo}</h3>
                    <h4 class="livro__autor">${livro.autor}</h4>
                    <p class="livro__preco">R$${livro.preco.toFixed(2)}</p>
                    <p class="livro__quant">${livro.quantidade} em estoque</p>
                    <div class="livro-botoes-container">
                        <div class="livro__botao-atualizar">
                            <button class="global__botao-primario js-atualizar-livro">Atualizar</button>
                        </div>
                        <div class="livro__botao-deletar">
                            <button class="global__botao-secundario js-deletar-livro">Deletar</button>
                        </div>
                    </div>
                </div>
            `;

            div.querySelector(".js-atualizar-livro").addEventListener(
                "click",
                () => atualizarLivro(livro.idLivro)
            );
            div.querySelector(".js-deletar-livro").addEventListener(
                "click",
                () => deletarLivro(livro.idLivro)
            );

            // Adiciona o container do livro no HTML
            livrosContainer.appendChild(div);
        }
    } catch (erro) {
        erroMensagem.textContent = "Erro ao retornar livros. Tente novamente.";
        console.error(erro);
    }
}

async function atualizarLivro(idLivro) {}

async function deletarLivro(idLivro) {}

document.addEventListener("DOMContentLoaded", retornarLivrosDoUsuario);
document.querySelector(".js-abrir-home").addEventListener("click", abrirHome);
document
    .querySelectorAll(".js-abrir-carrinho")
    .forEach((elemento) => elemento.addEventListener("click", abrirCarrinho));
document.querySelector(".js-abrir-venda").addEventListener("click", abrirVenda);
document
    .querySelector(".js-abrir-livros-registrados")
    .addEventListener("click", abrirLivrosRegistrados);
document
    .querySelector(".js-desconectar-usuario")
    .addEventListener("click", desconectarUsuario);
document
    .querySelector(".js-deletar-usuario")
    .addEventListener("click", deletarUsuario);
document
