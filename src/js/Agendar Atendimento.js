document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-agendamento');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Captura os valores dos campos
            const tutorNome = document.getElementById('tutor-nome').value;
            const petNome = document.getElementById('pet-nome').value;
            const servicoNome = document.getElementById('agendamento-servico').value;
            const data = document.getElementById('agendamento-data').value;
            const hora = document.getElementById('agendamento-hora').value;

            // Cria o novo objeto de agendamento
            const novoAgendamento = {
                id: Date.now(),
                tutorNome: tutorNome,
                petNome: petNome,
                servicoNome: servicoNome,
                data: data,
                hora: hora,
                status: 'Agendado'
            };

            // Procura agendamentos existentes no localStorage
            const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
            
            // Adiciona o novo agendamento à lista
            agendamentos.push(novoAgendamento);

            // Guarda de volta no localStorage
            localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

            alert('Atendimento agendado com sucesso!');

            // Redireciona para a lista de agendamentos
            window.location.href = 'lista-de-agendamento.html';
        });
    }
});