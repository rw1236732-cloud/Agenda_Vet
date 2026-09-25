const CHAVE_AGENDAMENTOS = 'agendavet_agendamento'

function lerLista(chave) {
  const bruto = localStorage.getItem(chave);
  return bruto ? JSON.parse(bruto) : [];
}

function salvarLista(chave, lista) {
  localStorage.setItem(chave, JSON.stringify(lista));
}

function listarAgendamentos() {
  return lerLista(CHAVE_AGENDAMENTOS);
}
function garantirDadosIniciais() {
  if (listarAgendamentos().length === 0) {
    const hoje = new Date().toISOString().slice(0, 10);
    salvarLista(CHAVE_AGENDAMENTOS, [
      { id: 1, petNome: 'Thor', servicoNome: 'Banho', data: hoje, hora: '14:00', status: 'Agendado' },
      { id: 2, petNome: 'Mimi', servicoNome: 'Consulta veterinária', data: hoje, hora: '16:30', status: 'Agendado' },
    ]);
  } 
}