document.addEventListener('DOMContentLoaded', function() {
  garantirDadosIniciais();

  const container = document.getElementById('lista-agenda');
  const agendamentos = listarAgendamentos();

  console.log(agendamentos);
});