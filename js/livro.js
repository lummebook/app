// Cria a função para trocar para página inicial
function abrirHome() {
    window.location.href = "home.html";
}

// Cria a função para vender um livro
async function venderLivro(event) {
    event.preventDefault();

    // Pega o valor dos campos do formulário
    const titulo = document.getElementById("form__input-titulo").value.trim();
    const autor = document.getElementById("form__input-autor").value.trim();
    const preco = document.getElementById("form__input-preco").value;
    const quantidade = document.getElementById("form__input-quant").value;

    const vendaMensagem = document.getElementById("erro__mensagem");

    // Bloco try/catch para impedir erro de aparecer para o usuário
    try {
        // Realiza a requisição para colocar o livro à venda
        await fetch("http://localhost:8080/livros/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: { titulo, autor, preco, quantidade },
            }),
        });

        abrirHome(); // Volta para página inicial
    }
    // Caso a requisição der erro, cai no catch
    catch (erro) {
        // Muda a mensagem
        vendaMensagem.textContent = "Erro na requisição. Tente novamente.";

        // Mostra a mensagem na tela
        vendaMensagem.style.opacity = "1";

        // Mostra mensagem do erro no console
        console.error(erro);

        // Após 3 segundos, esconde a mensagem
        setTimeout(() => {
            vendaMensagem.textContent = ""; // Tira a mensagem
            vendaMensagem.style.opacity = "0"; // Esconde a mensagem da tela
        }, 3000);
    }
}
