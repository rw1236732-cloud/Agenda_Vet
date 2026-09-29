document.addEventListener('DOMContentLoaded', function () {
    const formServico = document.getElementById('form-servico');
    
    if (formServico) {
        formServico.addEventListener('submit', function (e) {
            e.preventDefault();

            // Captura os valores digitados
            const nome = document.getElementById('servico-nome').value;
            const preco = document.getElementById('servico-preco').value;
            const descricao = document.getElementById('servico-descricao').value;

            // Cria o objeto do serviço
            const novoServico = {
                id: Date.now(),
                nome: nome,
                preco: parseFloat(preco).toFixed(2),
                descricao: descricao
            };

            // Vai buscar os serviços já guardados ou cria um array vazio
            let servicos = JSON.parse(localStorage.getItem('servicos')) || [];
            
            // Adiciona o novo serviço
            servicos.push(novoServico);

            // Guarda tudo de volta no localStorage
            localStorage.setItem('servicos', JSON.stringify(servicos));

            // Limpa o formulário e atualiza a tabela
            formServico.reset();
            renderizarTabelaServicos();
            
            alert('Serviço cadastrado com sucesso!');
        });
    }

    // Renderiza a tabela assim que a página carrega
    renderizarTabelaServicos();
});

// Função para mostrar os serviços na tabela
function renderizarTabelaServicos() {
    const corpoTabela = document.getElementById('tabela-servicos');
    if (!corpoTabela) return;

    const servicos = JSON.parse(localStorage.getItem('servicos')) || [];

    corpoTabela.innerHTML = '';

    if (servicos.length === 0) {
        corpoTabela.innerHTML = `<tr><td colspan="3" style="text-align:center;">Nenhum serviço cadastrado.</td></tr>`;
        return;
    }

    servicos.forEach(function (servico) {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td><strong>${servico.nome}</strong></td>
            <td>${servico.descricao || '-'}</td>
            <td>R$ ${servico.preco}</td>
        `;

        corpoTabela.appendChild(tr);
    });
}