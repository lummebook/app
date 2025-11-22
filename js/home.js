import {
    abrirCarrinho,
    abrirHome,
    carregarConfiguracoes,
    desconectarUsuario,
    deletarUsuario,
    travarMovimentoDeTela,
    comprarLivros,
    abrirLivrosRegistrados,
    abrirForm,
} from "./main.js";

// Cria a função para chamar outras funções assim que a página carregar
function inicializarFuncoes() {
    // Chama a função para carregar informações do usuário
    carregarConfiguracoes();

    // Chama a função para retornar os livros registrados
    carregarLivrosRegistrados();
}

async function abrirDetalhes(idLivro) {
    travarMovimentoDeTela(true);

    // Pega os elementos do container e da mensagem
    const popupContainer = document.getElementById("popup");
    const popupMensagem = document.getElementById("popup__mensagem");

    try {
        const resposta = await fetch(
            `https://lumme-api.onrender.com/livros/${idLivro}`
        );

        if (!resposta.ok) {
            throw new Error(resposta);
        }

        const detalhesContainer = document.getElementById("detalhes-container");
        const detalhesCamada = document.getElementById("detalhes__camada");

        const botaoComprar = document.getElementById("detalhes__botao-comprar");
        const botaoCarrinho = document.getElementById(
            "detalhes__botao-carrinho"
        );

        const livro = await resposta.json();

        const tituloTexto = document.getElementById("detalhes__titulo");
        const autorTexto = document.getElementById("detalhes__autor");
        const precotexto = document.getElementById("detalhes__preco");
        const quantidadetexto = document.getElementById("detalhes__quantidade");
        const descricaoTexto = document.getElementById("detalhes__descricao");

        tituloTexto.textContent = livro.titulo;
        autorTexto.textContent = livro.autor;
        precotexto.textContent = `R$${livro.preco.toFixed(2)}`;
        quantidadetexto.textContent = `${livro.quantidade} em estoque`;
        descricaoTexto.textContent = `
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt recusandae,
            et illo beatae amet suscipit quod ab quia facere quo alias libero rerum vero
            provident ratione maxime eos vitae dolorum
        `;

        botaoComprar.dataset.idLivro = livro.idLivro;
        botaoCarrinho.dataset.idLivro = livro.idLivro;

        detalhesContainer.style.display = "block";
        detalhesCamada.style.display = "block";
    } catch (erro) {
        console.error(erro);

        popupMensagem.textContent = "Erro ao abrir detalhes da conta.";
        popupContainer.style.display = "block";

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            popupContainer.style.display = "none";
            popupMensagem.textContent = "";
        }, 3000);
        return;
    }
}

async function fecharDetalhes() {
    travarMovimentoDeTela(false);

    document.getElementById("detalhes-container").style.display = "none";
    document.getElementById("detalhes__camada").style.display = "none";
}

// Cria a função para retornar os livros registrados
async function carregarLivrosRegistrados() {
    // Pega os elementos do container e da mensagem de erro
    const erroContainer = document.getElementById("erro");
    const erroMensagem = document.getElementById("erro__mensagem");

    // Mostra a mensagem de carregamento na tela
    erroMensagem.textContent = "Carregando...";
    erroContainer.style.display = "block";

    // Tenta retornar os livros registrados no 'try'
    // Se der erro, cai no 'catch'
    try {
        const resposta = await fetch("https://lumme-api.onrender.com/livros");
        if (!resposta.ok) {
            throw new Error(resposta);
        }

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
                <div class="livro__conteudo">
                    <h2 class="livro__titulo">${livro.titulo}</h2>
                    <h3 class="livro__autor">${livro.autor}</h3>
                    <p class="livro__preco">R$${livro.preco.toFixed(2)}</p>
                    <p class="livro__quant">${livro.quantidade} em estoque</p>
                    <div class="livro-botoes-container">
                        <div class="livro__botao-detalhes-container">
                            <button class="global__botao-primario js-abrir-detalhes">Detalhes</button>
                        </div>
                        <div class="livro__botao-carrinho-container">
                            <button class="global__botao-secundario livro__botao-carrinho js-adicionar-ao-carrinho">Carrinho</button>
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
        console.error(erro);
    }
}

async function adicionarAoCarrinho(idLivro) {
    // Pega os elementos do container e da mensagem
    const popupContainer = document.getElementById("popup");
    const popupMensagem = document.getElementById("popup__mensagem");

    // Pega o ID do usuário
    const idUsuario = localStorage.getItem("idUsuario");
    if (!idUsuario) {
        popupMensagem.textContent = "Usuário não conectado.";
        popupContainer.style.display = "block";

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
                body: JSON.stringify({ idLivro }),
            }
        );

        if (!resposta.ok) {
            const retorno = await resposta.json();

            if (retorno?.erro === "usuario_inexistente") {
                popupMensagem.textContent = "Usuário não encontrado.";
            } else if (retorno?.erro === "livro_registrado") {
                popupMensagem.textContent =
                    "O livro selecionado já está no carrinho.";
            }

            // Mostra a mensagem
            popupContainer.style.display = "block";

            // Esconde a mensagem após 3 segundos
            setTimeout(() => {
                popupContainer.style.display = "none";
                popupMensagem.textContent = "";
            }, 3000);
            return;
        }

        // Mostra a mensagem
        popupMensagem.textContent = "Livro adicionado ao carrinho.";
        popupContainer.style.display = "block";
    } catch (erro) {
        // Se der erro, mostra mensagem
        popupMensagem.textContent =
            "Erro ao adicionar livro no carrinho. Tente novamente.";
        popupContainer.style.display = "block";
        console.error(erro);
    } finally {
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
document.querySelector(".js-abrir-venda").addEventListener("click", abrirForm);
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
    .querySelector(".js-fechar-detalhes")
    .addEventListener("click", fecharDetalhes);
document
    .querySelector(".js-comprar-livro")
    .addEventListener("click", (event) =>
        comprarLivros([event.target.dataset.idLivro])
    );
document
    .querySelector("#detalhes-container .js-adicionar-ao-carrinho")
    .addEventListener("click", (event) =>
        adicionarAoCarrinho(event.target.dataset.idLivro)
    );
