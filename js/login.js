// Cria a função para trocar para página de cadastro
function abrirCadastro() {
    window.location.href = "pages/cadastro.html";
}

// Cria a função para trocar para página inicial
function abrirHome () {
    window.location.href = "pages/home.html";
}

// Cria a função para tentar conectar o usuário
async function conectarUsuario (event) {
    event.preventDefault(); // Impede o formulário de recarregar a página

    const email = document.getElementById("form__input-email").value; // Pega o valor do campo do email
    const senha = document.getElementById("form__input-senha").value; // Pega o valor do campo da senha

    const loginMensagem = document.getElementById("erro__mensagem"); // Pega o parágrafo para alterar o valor

    // Faz a requisição para o back-end (try/catch para segurança contra error)
    try {
        const res = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                senha,
            }),
        });

        if (!res.ok) {
            loginMensagem.textContent = "Erro na requisição. Tente novamente."; // Muda a mensagem
            return; // Termina a função
        }

        abrirHome(); // Vai para página inicial
    }
    // Caso a requisição der erro, cai no catch
    catch (err) {
        loginMensagem.textContent = "Erro na requisição. Tente novamente."; // Muda a mensagem
        console.error(err); // Mostra mensagem do erro no console
    }
}
