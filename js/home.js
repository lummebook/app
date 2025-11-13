// Cria a função para carregar as informações do usuário
async function carregarConfiguracoes () {
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
function desconectarUsuario (event) {
    // Limpa todos os dados registrados
    localStorage.clear();

    // Troca para a tela de login
    window.location.href = "login.html";
}

// Cria a função para trocar para a página de vender um livro
function venderLivro () {
    // Troca para a tela de vender livro
    window.location.href = "livro.html";
}