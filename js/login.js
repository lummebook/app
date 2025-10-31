// Cria a função para trocar para página de cadastro
function abrirCadastro() {
    window.location.href = "cadastro.html";
}

// Cria a função para trocar para página inicial
function abrirHome () {
    window.location.href = "home.html";
}

// Cria a função para tentar conectar o usuário
async function conectarUsuario (event) {
    event.preventDefault(); // Impede o formulário de recarregar a página

    // Pega o valor dos campos do formulário
    const email = document.getElementById("form__input-email").value.trim();
    const senha = document.getElementById("form__input-senha").value.trim();

    // Pega o parágrafo da mensagem de erro
    const loginMensagem = document.getElementById("erro__mensagem");

    // Bloco try/catch para impedir erro de aparecer para o usuário
    try {
        // Realiza a requisição para validar o usuário
        const resposta = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                senha,
            }),
        });

        // Se a validação falhar
        if (!resposta.ok) {
            loginMensagem.textContent = "Email ou senha incorretos"; // Muda a mensagem
            loginMensagem.style.opacity = "1"; // Mostra a mensagem na tela
            return; // Termina a função
        }

        abrirHome(); // Vai para página inicial
    }
    // Caso a requisição der erro, cai no catch
    catch (erro) {
        loginMensagem.textContent = "Erro na requisição. Tente novamente."; // Muda a mensagem
        console.error(erro); // Mostra mensagem do erro no console
    }
}
