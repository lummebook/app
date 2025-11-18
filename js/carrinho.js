import {
    abrirHome,
    abrirCarrinho,
    abrirVenda,
    carregarConfiguracoes,
    desconectarUsuario,
    deletarUsuario,
} from "../js/main.js";

// Cria a função para chamar outras funções assim que a página carregar
function inicializarFuncoes() {
    // Chama a função para carregar informações do usuário
    carregarConfiguracoes();

    // Chama a função para carregar os livros do carrinho
    carregarLivroDoCarrinho();
}

async function carregarLivroDoCarrinho() {
    // Pega o ID do usuário
    const idUsuario = localStorage.getItem("idUsuario");
    if (!idUsuario) {
        return;
    }

    // Pega os elementos do container e da mensagem de erro
    const erroContainer = document.getElementById("livros__erro");
    const erroMensagem = document.getElementById("erro__mensagem");

    // Pega os elementos do valor dos produtos, do frete e do total
    const produtosQuantidade = document.getElementById("resumo-quantidade");
    const produtosPreco = document.getElementById("resumo-produtos-preco");
    const totalPreco = document.getElementById("resumo-total-preco");
    const fretePreco = document.getElementById("resumo-frete-preco");

    // Mostra a mensagem de carregamento na tela
    erroMensagem.textContent = "Carregando...";

    // Tenta retornar os livros do carrinho no 'try'
    // Se der erro, cai no 'catch'
    try {
        // Recupera os livros do carrinho
        const resposta = await fetch(
            `https://lumme-api.onrender.com/usuarios/${idUsuario}/carrinho`
        );

        // Transforma os dados retornados
        const livros = await resposta.json();

        // Pega o container dos livros
        const livrosContainer = document.getElementById("carrinho__livros");
        livrosContainer.innerHTML = "";

        // Padroniza os dados caso não haja livros
        if (livros.length === 0) {
            produtosQuantidade.textContent = 0;
            produtosPreco.textContent = "0,00";
            totalPreco.textContent = "0,00";
            fretePreco.textContent = "0,00";

            erroContainer.style.display = "block";
            erroMensagem.textContent = "Nenhum livro adicionado ao carrinho.";

            // Esconde a mensagem após 3 segundos
            setTimeout(() => {
                erroContainer.style.display = "none";
                erroMensagem.textContent = "";
            }, 3000);
            return;
        }

        // Esconde a mensagem de erro
        erroContainer.style.display = "none";

        // Preço e quantidade total dos livros
        let soma = 0;
        let quantidade = 0;

        // Percorre todos os livros retornados
        for (const livro of livros) {
            // Calcula o valor total
            soma += livro.preco;
            quantidade += 1;

            // Cria o container do livro
            const div = document.createElement("div");

            // Adiciona a classe para estilizar
            div.classList.add("livro");

            // Adiciona o ID do livro
            div.dataset.idLivro = livro.idLivro;

            // Adiciona os elementos internos
            div.innerHTML = `
                <div class="livro__imagem"></div>
                <div class="livro__conteudo">
                    <h3 class="livro__titulo">${livro.titulo}</h3>
                    <h4 class="livro__autor">${livro.autor}</h4>
                    <p class="livro__preco">R$${livro.preco.toFixed(2)}</p>
                    <p class="livro__quantidade">${
                        livro.quantidade
                    } em estoque</p>
                </div>
                <div class="livro__botao-remover-carrinho">
                    <button class="global__botao-secundario js-remover-livro">Remover do carrinho</button>
                </div>
            `;

            // Adiciona a função ao botão
            div.querySelector(".js-remover-livro").addEventListener(
                "click",
                () => removerLivroDoCarrinho(livro.idLivro)
            );

            // Adiciona o livro ao container
            livrosContainer.appendChild(div);

            // Altera os valores
            produtosQuantidade.textContent = quantidade;
            fretePreco.textContent = "10,00";
            produtosPreco.textContent = `${soma.toFixed(2)}`;
            totalPreco.textContent = `${(soma + 10).toFixed(2)}`;
        }
    } catch (erro) {
        console.log(erro);

        // Mostra a mensagem de erro
        erroContainer.style.display = "block";
        erroMensagem.textContent =
            "Houve um erro ao tentar carregar os Livros. Tente novamente.";

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            erroContainer.style.display = "none";
            erroMensagem.textContent = "";
        }, 3000);
    }
}

async function removerLivroDoCarrinho(idLivro) {
    // Pega os elementos do container e da mensagem
    const popupContainer = document.getElementById("popup");
    const popupMensagem = document.getElementById("popup__mensagem");

    // Pega o ID do usuário salvo se existir
    const idUsuario = localStorage.getItem("idUsuario");
    if (!idUsuario) {
        return;
    }

    // Tenta remover o livro do carrinho no 'try'
    // Se der erro, cai no 'catch'
    try {
        // Tenta remover o livro do carrinho
        const resposta = await fetch(
            `https://lumme-api.onrender.com/usuarios/${idUsuario}/carrinho`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idLivro }),
            }
        );

        // Caso não achar o usuário, lança erro
        if (!resposta.ok) {
            throw new Error();
        }

        // Mostra a mensagem de sucesso
        popupContainer.style.display = "block";
        popupMensagem.textContent = "Livro removido do carrinho.";

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            popupContainer.style.display = "none";
            popupMensagem.textContent = "";
        }, 3000);

        // Recarrega os livros
        carregarLivroDoCarrinho();
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

async function finalizarCompra() {
    
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
document
    .querySelector(".js-deletar-usuario")
    .addEventListener("click", deletarUsuario);
