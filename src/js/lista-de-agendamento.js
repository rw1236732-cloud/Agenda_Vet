document.addEventListener('DOMContentLoaded', function() {
  garantirDadosIniciais();

  const inputData = document.getElementById('filtro-data');
  const hoje = new Date().toISOString().slice(0, 10);
  inputData.value = hoje;

  renderizarAgenda(hoje);

  inputData.addEventListener('change', function() {
    renderizarAgenda(inputData.value);
  });
});

function renderizarAgenda(dataEscolhida) {
  const container = document.getElementById('lista-agenda');
  const todosAgendamentos = listarAgendamentos();

  const agendamentosDoDia = todosAgendamentos
  .filter(function(agendamento) {
    return agendamento.data === dataEscolhida;
  })
  .sort(function(a, b) {
    return a.hora.localeCompare(b.hora);
  });

  if (agendamentosDoDia.length === 0) {
    container.innerHTML = '<p>Nenhum agendamento para este dia.</p>';
    return;
  }

  container.innerHTML = agendamentosDoDia.map(function(agendamento) {
    return '<p>' + agendamento.hora + ' — ' + agendamento.petNome + ' — ' + agendamento.servicoNome + ' (' + agendamento.status + ')</p>';
  }).join('');
}
