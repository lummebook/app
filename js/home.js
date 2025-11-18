import {
    abrirCarrinho,
    abrirHome,
    abrirVenda,
    carregarConfiguracoes,
    desconectarUsuario,
    deletarUsuario
} from "./main.js";

// Cria a função para chamar outras funções assim que a página carregar
function inicializarFuncoes() {
    // Chama a função para carregar informações do usuário
    carregarConfiguracoes();

    // Chama a função para retornar os livros registrados
    carregarLivrosRegistrados();
}

// Cria a função para retornar os livros registrados
async function carregarLivrosRegistrados() {
    // Pega os elementos do container e da mensagem de erro
    const erroContainer = document.getElementById("livros__erro");
    const erroMensagem = document.getElementById("erro__mensagem");

    // Mostra a mensagem de carregamento na tela
    erroMensagem.textContent = "Carregando...";

    // Tenta retornar os livros registrados no 'try'
    // Se der erro, cai no 'catch'
    try {
        const resposta = await fetch("https://lumme-api.onrender.com/livros");

        // Transforma os dados retornados
        const livrosRetornados = await resposta.json();
        if (livrosRetornados.length === 0) {
            erroMensagem.textContent = "Nenhum livro registrado.";
            return;
        }

        // Esconde a mensagem de erro
        erroContainer.style.display = "none";

        // Pega o container dos livros
        const livrosContainer = document.getElementById("livros__container");

        // Percorre todos os livros retornados
        for (const livro of livrosRetornados) {
            // Cria o container do livro
            const div = document.createElement("div");

            // Adiciona a classe para estilizar
            div.classList.add("livro");

            // Adiciona o ID do livro
            div.dataset.idLivro = livro.idLivro;

            // Adiciona os elementos internos
            div.innerHTML = `
                <div class="livro__imagem"></div>
                <div class="livro__conteudo>
                    <h3 class="livro__titulo">${livro.titulo}</h3>
                    <h4 class="livro__autor">${livro.autor}</h4>
                    <p class="livro__preco">R$${livro.preco.toFixed(2)}</p>
                    <p class="livro__quant">${livro.quantidade} em estoque</p>
                    <div class="livro-botoes-container">
                        <div class="livro__botao-detalhes-container">
                            <button class="global__botao-primario js-abrir-detalhes">Detalhes</button>
                        </div>
                        <div class="livro__botao-carrinho-container">
                            <button class="global__botao-secundario livro__botao-carrinho js-adicionar-ao-carrinho">Para o carrinho</button>
                        </div>
                    </div>
                </div>
            `;

            // Adiciona as funções dos botões
            div.querySelector(".js-abrir-detalhes").addEventListener(
                "click",
                () => abrirDetalhes(livro.idLivro)
            );
            div.querySelector(".js-adicionar-ao-carrinho").addEventListener(
                "click",
                () => adicionarAoCarrinho(livro.idLivro)
            );

            // Adiciona o container do livro no HTML
            livrosContainer.appendChild(div);
        }
    } catch (erro) {
        erroMensagem.textContent =
            "Houve um erro ao tentar carregar os Livros. Tente novamente.";
        console.log(erro);
    }
}

async function adicionarAoCarrinho(idLivro) {
    // Pega os elementos do container e da mensagem
    const popupContainer = document.getElementById("popup");
    const popupMensagem = document.getElementById("popup__mensagem");

    // Pega o ID do usuário
    const idUsuario = localStorage.getItem("idUsuario");
    if (!idUsuario) {
        popupContainer.style.display = "block";
        popupMensagem.textContent = "Erro ao adicionar livro ao carrinho";

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            popupContainer.style.display = "none";
            popupMensagem.textContent = "";
        }, 3000);
        return;
    }

    // Tenta adicionar o livro no carrinho no 'try'
    // Se der erro, cai no 'catch'
    try {
        // Tenta adicionar o livro no carrinho
        const resposta = await fetch(
            `https://lumme-api.onrender.com/usuarios/${idUsuario}/carrinho`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({idLivro}),
            }
        );

        // Se não encontrar o usuário, lança erro
        if (!resposta.ok) {
            throw new Error();
        }

        // Mostra a mensagem de sucesso
        popupContainer.style.display = "block";
        popupMensagem.textContent = "Livro adicionado ao carrinho.";

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            popupContainer.style.display = "none";
            popupMensagem.textContent = "";
        }, 3000);
    } catch (erro) {
        // Se der erro, mostra mensagem
        popupContainer.style.display = "block";
        popupMensagem.textContent = "Erro ao adicionar livro ao carrinho";
        console.log(erro);

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            popupContainer.style.display = "none";
            popupMensagem.textContent = "";
        }, 3000);
    }
}

// Adiciona as funções aos elementos
document.addEventListener("DOMContentLoaded", inicializarFuncoes);
document.querySelector(".js-abrir-home").addEventListener("click", abrirHome);
document
    .querySelectorAll(".js-abrir-carrinho")
    .forEach((elemento) => elemento.addEventListener("click", abrirCarrinho));
document.querySelector(".js-abrir-venda").addEventListener("click", abrirVenda);
document
    .querySelector(".js-desconectar-usuario")
    .addEventListener("click", desconectarUsuario);
document.querySelector(".js-deletar-usuario").addEventListener("click", deletarUsuario);