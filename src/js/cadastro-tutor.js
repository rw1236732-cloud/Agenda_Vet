document.addEventListener('DOMContentLoaded', () => {
    const formTutor = document.getElementById('formCadastroTutor');

    formTutor.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const nome = document.getElementById('nomeTutor').value;
        const telefone = document.getElementById('telefoneTutor').value;
        const email = document.getElementById('emailTutor').value;

        const novoTutor = {
            id: Date.now(), // Gera um identificador único baseado na data e hora
            nome: nome,
            telefone: telefone,
            email: email
        };

        console.log("Novo tutor capturado com sucesso:", novoTutor);
        alert("Tutor registado com sucesso! (Abra a consola para ver os dados)");

        formTutor.reset();
    });
});