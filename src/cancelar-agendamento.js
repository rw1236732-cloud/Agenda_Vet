// Dados do agendamento (em um cenário real, viriam de uma API/backend)
const agendamento = {
  tutor: "Maria Souza",
  pet: "Bidu",
  servico: "Consulta",
  dataHora: "28/09/2026 - 14:30"
};

// Elementos da tela
const bodyView = document.getElementById("bodyView");
const successView = document.getElementById("successView");

// Preenche os dados do resumo ao carregar a página
function preencherResumo() {
  document.getElementById("sumTutor").textContent = agendamento.tutor;
  document.getElementById("sumPet").textContent = agendamento.pet;
  document.getElementById("sumServico").textContent = agendamento.servico;
  document.getElementById("sumData").textContent = agendamento.dataHora;
}

// Botão "Voltar" - retorna para a tela anterior (histórico/detalhes do agendamento)
function voltar() {
  // Ajuste conforme a navegação real do site (ex: window.location.href = "detalhes.html")
  window.history.back();
}

// Botão "Cancelar Agendamento" - confirma e processa o cancelamento
function confirmarCancelamento() {
  // Aqui entraria a chamada à API para efetivar o cancelamento no backend, ex:
  // fetch(`/api/agendamentos/${agendamentoId}/cancelar`, { method: "POST" })
  //   .then(res => res.json())
  //   .then(() => mostrarSucesso())
  //   .catch(() => alert("Erro ao cancelar o agendamento. Tente novamente."));

  // Simulação de sucesso imediato:
  mostrarSucesso();
}

// Exibe a tela de sucesso e esconde a tela principal
function mostrarSucesso() {
  bodyView.style.display = "none";
  successView.style.display = "flex";
}

// Botão "OK" da tela de sucesso - fecha/redireciona
function fecharTela() {
  // Ajuste conforme a navegação real do site (ex: window.location.href = "agendamentos.html")
  window.location.href = "agendamentos.html";
}

// Inicialização
document.addEventListener("DOMContentLoaded", preencherResumo);