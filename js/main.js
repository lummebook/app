// Cria a função para desconectar o usuário
export function desconectarUsuario() {
    // Limpa todos os dados registrados
    localStorage.clear();

    // Troca para a tela de login
    window.location.href = "login.html";
}

export async function deletarUsuario() {
    // Pede confirmação ao usuário
    const confirmacao = confirm("Deseja mesmo deletar sua conta?");
    if (!confirmacao) {
        return;
    }

    // Pega os elementos do container e da mensagem
    const popupContainer = document.getElementById("popup");
    const popupMensagem = document.getElementById("popup__mensagem");

    // Pega o ID do usuário salvo se existir
    const idUsuario = localStorage.getItem("idUsuario");

    // Se o ID não existir, interrompe a função
    if (!idUsuario) {
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

    // Tenta remover o livro do carrinho no 'try'
    // Se der erro, cai no 'catch'
    try {
        // Tenta deletar a conta do usuário
        const resposta = await fetch(
            `https://lumme-api.onrender.com/usuarios/${idUsuario}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // Caso não achar o usuário, lança erro
        if (!resposta.ok) {
            throw new Error(resposta);
        }

        // Troca para a página de login
        abrirLogin();
    } catch (erro) {
        console.error(erro);
        popupMensagem.textContent = "Erro ao deletar conta.";
        popupContainer.style.display = "block";

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            popupContainer.style.display = "none";
            popupMensagem.textContent = "";
        }, 3000);
    }
}

// Cria a função para carregar as informações do usuário
export async function carregarConfiguracoes() {
    // Pega os elementos do container e da mensagem
    const popupContainer = document.getElementById("popup");
    const popupMensagem = document.getElementById("popup__mensagem");

    // Pega o ID do usuário salvo se existir
    const idUsuario = localStorage.getItem("idUsuario");
    if (!idUsuario) {
        // Se der erro, mostra mensagem
        popupMensagem.textContent = "Usuário não conectado.";
        popupContainer.style.display = "block";

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            popupContainer.style.display = "none";
            popupMensagem.textContent = "";
        }, 3000);
        return;
    }

    try {
        // Retorna os dados do usuário usando o ID
        const resposta = await fetch(
            `https://lumme-api.onrender.com/usuarios/${idUsuario}`
        );

        // Se der erro, interrompe a função
        if (!resposta.ok) {
            throw new Error(resposta);
        }

        // Transforma os dados retornados
        const retorno = await resposta.json();

        // Pega os elementos que irão conter o nome e o email do usuário
        const menuConfigNome = document.getElementById("menu-config__nome");
        const menuConfigEmail = document.getElementById("menu-config__email");

        // Muda o conteúdo de texto para o nome e o email retornados do banco
        menuConfigNome.textContent = retorno.nome;
        menuConfigEmail.textContent = retorno.email;
    } catch (erro) {
        // Se der erro, mostra mensagem
        popupMensagem.textContent = "Erro ao carregar informações da conta.";
        popupContainer.style.display = "block";
        console.error(erro);

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            popupContainer.style.display = "none";
            popupMensagem.textContent = "";
        }, 3000);
    }
}

export async function travarMovimentoDeTela(deveTravarMovimento) {
    if (deveTravarMovimento) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}

export async function comprarLivros(idLivrosArray) {}

// Cria a função para trocar para a página de vender um livro
export function abrirVenda() {
    // Troca para a tela de vender livro
    window.location.href = "venda.html";
}

// Cria a função para trocar para página de carrinho
export function abrirCarrinho() {
    // Troca para a tela de carrinho
    window.location.href = "carrinho.html";
}

// Cria a função para trocar para página de cadastro
export function abrirCadastro() {
    window.location.href = "cadastro.html";
}

// Cria a função para trocar para página de login
export function abrirLogin() {
    window.location.href = "login.html";
}

// Cria a função para trocar para página de livros
export function abrirLivrosRegistrados() {
    window.location.href = "livros.html";
}

// Cria a função para trocar para página inicial
export function abrirHome() {
    window.location.href = "home.html";
}
