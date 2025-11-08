async function carregarConfiguracoes () {
    const idUsuario = JSON.parse(localStorage.getItem("idUsuario"));
    if (!idUsuario) {
        return;
    }

    const resposta = await fetch(`http://localhost:8080/usuarios/${idUsuario}`);

    if (!resposta.ok) {
        return;
    }

    const retorno = await resposta.json();

    const menuConfigNome = document.getElementById("menu-config__nome");
    const menuConfigEmail = document.getElementById("menu-config__email");

    menuConfigNome.textContent = retorno.nome;
    menuConfigEmail.textContent = retorno.email;
}