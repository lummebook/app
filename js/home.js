// Cria a função para chamar outras funções assim que a página carregar
function executarFuncoes() {
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
    erroMensagem.style.color = "var(--cor-texto-secundaria)";
    erroMensagem.textContent = "Carregando...";

    // Tenta retornar os livros registrados
    try {
        const resposta = await fetch("http://localhost:8080/livros");

        // Transforma os dados retornados
        const livrosRetornados = await resposta.json();

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
            div.dataset.id = livro.idLivro;

            // Adiciona os elementos internos
            div.innerHTML = `
                <div class="livro__imagem"></div>
                <h3 class="livro__titulo">${livro.titulo}</h3>
                <h4 class="livro__autor">${livro.autor}</h4>
                <p class="livro__preco">R$${livro.preco.toFixed(2)}</p>
                <p class="livro__quant">${livro.quantidade} em estoque</p>
                <div class="livro__botao">
                    <button class="global__botao-primario livro__botao-detalhes">Detalhes</button>
                </div>
                <div class="livro__botao">
                    <button class="global__botao-secundario livro__botao-carrinho">Para o carrinho</button>
                </div>
            `;

            // Adiciona a função do botão
            div.querySelector(".livro__botao").addEventListener("click", () =>
                abrirDetalhes(livro.id)
            );

            // Adiciona o container do livro no HTML
            livrosContainer.appendChild(div);
        }
    } catch (erro) {
        erroMensagem.style.color = "#ca0101";
        erroMensagem.textContent =
            "Houve um erro ao tentar carregar os Livros. Tente novamente.";
        console.log(erro);
    }
}

// Cria a função para carregar as informações do usuário
async function carregarConfiguracoes() {
    // Pega o ID do usuário salvo se existir
    const idUsuario = JSON.parse(localStorage.getItem("idUsuario"));

    // Se o ID não existir, interrompe a função
    if (!idUsuario) {
        return;
    }

    // Retorna os dados do usuário usando o ID
    const resposta = await fetch(`http://localhost:8080/usuarios/${idUsuario}`);

    // Se der erro, interrompe a função
    if (!resposta.ok) {
        return;
    }

    // Transforma os dados retornados
    const retorno = await resposta.json();

    // Pega os elementos que irão conter o nome e o email do usuário
    const menuConfigNome = document.getElementById("menu-config__nome");
    const menuConfigEmail = document.getElementById("menu-config__email");

    // Muda o conteúdo de texto para o nome e o email retornados do banco
    menuConfigNome.textContent = retorno.nome;
    menuConfigEmail.textContent = retorno.email;
}

// Cria a função para desconectar o usuário
function desconectarUsuario() {
    // Limpa todos os dados registrados
    localStorage.clear();

    // Troca para a tela de login
    window.location.href = "login.html";
}

// Cria a função para trocar para a página de vender um livro
function venderLivro() {
    // Troca para a tela de vender livro
    window.location.href = "venda.html";
}
