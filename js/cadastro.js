// Cria a função para trocar para página de login
function abrirLogin() {
    window.location.href = "login.html";
}

// Cria a função para cadastrar um usuário
function cadastrarUsuario(event) {
    event.preventDefault();

    // Pega o valor dos campos do formulário
    const nome = document.getElementById("form__input-nome").value.trim();
    const email = document.getElementById("form__input-email").value.trim();
    const senha = document.getElementById("form__input-senha").value.trim();
    const confirmarSenha = document.getElementById("form__input-confirmar-senha").value.trim();

    // Pega o parágrafo da mensagem de erro
    const cadastroMensagem = document.getElementById("erro__mensagem");

    // Confirma se as senhas digitadas são iguais
    if (senha !== confirmarSenha) {
        cadastroMensagem.textContent = "Senhas diferentes digitadas."; // Muda a mensagem
        cadastroMensagem.style.opacity = "1"; // Mostra a mensagem na tela
        return; 
    }
}