document.addEventListener('DOMContentLoaded', function () {
    if (typeof garantirDadosIniciais === 'function') {
        garantirDadosIniciais();
    }

    const inputData = document.getElementById('filtro-data');
    const hoje = new Date().toISOString().slice(0, 10);
    if (inputData) {
        inputData.value = hoje;
        inputData.addEventListener('change', function () {
            renderizarTabelaAgenda(inputData.value);
        });
    }

    renderizarTabelaAgenda(hoje);
});

function renderizarTabelaAgenda(dataEscolhida) {
    const corpoTabela = document.getElementById('corpo-tabela-agenda');
    if (!corpoTabela) return;

    const todosAgendamentos = typeof listarAgendamentos === 'function' ? listarAgendamentos() : [];

    const opcoesStatus = [
        "Agendado",
        "Confirmado",
        "Aguardando na recepção",
        "Em atendimento",
        "Finalizado",
        "Cancelado"
    ];

    const agendamentosDoDia = todosAgendamentos
        .filter(function (agendamento) {
            return agendamento.data === dataEscolhida;
        })
        .sort(function (a, b) {
            return (a.hora || '').localeCompare(b.hora || '');
        });

    corpoTabela.innerHTML = '';

    if (agendamentosDoDia.length === 0) {
        corpoTabela.innerHTML = `<tr><td colspan="6" style="text-align:center;">Nenhum agendamento para este dia.</td></tr>`;
        return;
    }

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

    document.querySelectorAll('.select-status').forEach(function (select) {
        select.addEventListener('change', function () {
            const idAgendamento = this.getAttribute('data-id');
            const novoStatus = this.value;
            atualizarStatusAgendamento(idAgendamento, novoStatus);
        });
    });
}

function atualizarStatusAgendamento(id, novoStatus) {
    let agendamentos = typeof listarAgendamentos === 'function' ? listarAgendamentos() : [];
    const index = agendamentos.findIndex(a => a.id == id);

    if (index !== -1) {
        agendamentos[index].status = novoStatus;
        if (typeof salvarAgendamentos === 'function') {
            salvarAgendamentos(agendamentos);
        } else {
            localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        }
    }
}