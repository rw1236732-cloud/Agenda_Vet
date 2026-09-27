document.getElementById('form-cadastro-pet').addEventListener('submit', function(event) {
    event.preventDefault();

const petData = {
        nome: document.getElementById('nome-pet').value,
        especie: document.getElementById('especie-pet').value,
        raca: document.getElementById('raca-pet').value,
        sexo: document.getElementById('sexo-pet').value,
        pelagem: document.getElementById('pelagem-pet').value
    };

localStorage.setItem('dadosPet', JSON.stringify(petData));

    alert('Pet cadastrado com sucesso!');

});