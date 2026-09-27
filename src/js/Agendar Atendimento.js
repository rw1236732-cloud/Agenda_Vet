// script.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-agendamento');

  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // impede o recarregamento da página

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const nomePet = document.getElementById('nome-pet').value.trim();
    const raca = document.getElementById('raça').value;

    if (!nome || !telefone || !nomePet) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const agendamento = {
      nomeTutor: nome,
      telefone,
      nomePet,
      raca,
      dataCriacao: new Date().toISOString()
    };

    salvarAgendamento(agendamento);
    exibirConfirmacao(agendamento);
    form.reset();
  });

  function salvarAgendamento(agendamento) {
    const lista = JSON.parse(localStorage.getItem('agendamentos')) || [];
    lista.push(agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(lista));
  }

  function exibirConfirmacao(agendamento) {
    alert(
      `Agendamento realizado!\n\n` +
      `Tutor: ${agendamento.nomeTutor}\n` +
      `Telefone: ${agendamento.telefone}\n` +
      `Pet: ${agendamento.nomePet} (${agendamento.raca})`
    );
  }
});