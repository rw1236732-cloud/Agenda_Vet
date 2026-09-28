document.addEventListener('DOMContentLoaded', function () {
    const inputData = document.getElementById('filtro-data');
    // Obtém a data atual no formato YYYY-MM-DD
    const hoje = new Date().toISOString().slice(0, 10);

    if (inputData) {
        // Preenche o filtro com a data de hoje ao carregar a página
        inputData.value = hoje;

        // US08: Escuta a mudança de data pelo utilizador
        inputData.addEventListener('change', function () {
            renderizarTabelaAgenda(inputData.value);
        });
    }

    // Renderiza a tabela com a data inicial
    renderizarTabelaAgenda(hoje);
});

// Função para buscar agendamentos do localStorage
function obterAgendamentos() {
    return JSON.parse(localStorage.getItem('agendamentos')) || [];
}

// Renderiza a tabela filtrando pela data selecionada
function renderizarTabelaAgenda(dataEscolhida) {
    const corpoTabela = document.getElementById('corpo-tabela-agenda');
    if (!corpoTabela) return;

    const todosAgendamentos = obterAgendamentos();

    // US08: Filtra mantendo apenas os agendamentos da data selecionada
    const agendamentosDoDia = todosAgendamentos.filter(function (agendamento) {
        return agendamento.data === dataEscolhida;
    });

    corpoTabela.innerHTML = '';

    // Se não houver agendamentos para o dia
    if (agendamentosDoDia.length === 0) {
        corpoTabela.innerHTML = `<tr><td colspan="6" style="text-align:center;">Nenhum agendamento para este dia.</td></tr>`;
        return;
    }

    // Opções do menu suspenso de status (US07)
    const opcoesStatus = [
        "Agendado", "Confirmado", "Aguardando na recepção",
        "Em atendimento", "Finalizado", "Cancelado"
    ];

    // Constrói as linhas da tabela
    agendamentosDoDia.forEach(function (agendamento) {
        const tr = document.createElement('tr');
        const statusAtual = agendamento.status || "Agendado";

        const selectOptions = opcoesStatus.map(function (status) {
            return `<option value="${status}" ${statusAtual === status ? 'selected' : ''}>${status}</option>`;
        }).join('');

        tr.innerHTML = `
            <td>${agendamento.tutorNome || agendamento.tutor || 'N/A'}</td>
            <td>${agendamento.petNome || agendamento.pet || 'N/A'}</td>
            <td>${agendamento.servicoNome || agendamento.servico || 'N/A'}</td>
            <td>${agendamento.data || 'N/A'}</td>
            <td>${agendamento.hora || 'N/A'}</td>
            <td>
                <select class="select-status" data-id="${agendamento.id}">
                    ${selectOptions}
                </select>
            </td>
        `;

        corpoTabela.appendChild(tr);
    });

    // US07: Adiciona os ouvintes de evento para atualizar o status no localStorage
    document.querySelectorAll('.select-status').forEach(function (select) {
        select.addEventListener('change', function () {
            const idAgendamento = this.getAttribute('data-id');
            const novoStatus = this.value;
            atualizarStatusAgendamento(idAgendamento, novoStatus);
        });
    });
}

// Função auxiliar para atualizar e salvar o novo status
function atualizarStatusAgendamento(id, novoStatus) {
    let agendamentos = obterAgendamentos();
    agendamentos = agendamentos.map(function (ag) {
        if (String(ag.id) === String(id)) {
            ag.status = novoStatus;
        }
        return ag;
    });
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
}