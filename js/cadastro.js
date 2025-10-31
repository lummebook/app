// Cria a função para trocar para página inicial
function abrirHome() {
    window.location.href = "home.html";
}

// Cria a função para trocar para página de login
function abrirLogin() {
    window.location.href = "login.html";
}

// Cria a função para cadastrar um usuário
async function cadastrarUsuario(event) {
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
        return; // Termina a função
    }

    // Bloco try/catch para impedir erro de aparecer para o usuário
    try {
        // Realiza a requisição para cadastrar o usuário
        const resposta = await fetch("http://localhost:8080/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome, email, senha,
            })
        });

        // Se o cadastro falhar
        if (!resposta.ok) {
            cadastroMensagem.textContent = "Dados inválidos inseridos."; // Muda a mensagem
            cadastroMensagem.style.opacity = "1"; // Mostra a mensagem na tela
            return; // Termina a função
        }

        abrirHome(); // Vai para página inicial
    }
    // Caso a requisição der erro, cai no catch
    catch (erro) {
        cadastroMensagem.textContent = "Erro na requisição. Tente novamente."; // Muda a mensagem
        console.error(erro); // Mostra mensagem do erro no console
    }
}