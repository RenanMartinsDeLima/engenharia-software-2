

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Após o login, vai para a tela da coordenação
    window.location.href = "../pages/coordenacao.html";
});