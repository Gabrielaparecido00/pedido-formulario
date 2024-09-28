document.addEventListener('DOMContentLoaded', () => {
    const postos = [
        "AC DELCO", "ANHAIA", "ARICANDUVA (GM/KIA)", "BARUEL", "GALPÃO",
        "GM SÃO BERNARDO DO CAMPO", "GUARULHOS", "LA PLAÇA", "MAUÁ", "NAZARÉ",
        "OFICINA MOREIRA DE GODOY", "PENHA", "R JAFET", "SANTO ANDRÉ",
        "SICOOB GUARULHOS", "SICOOB SANTO AMARO", "SICOOB SANTO ANDRÉ",
        "SICOOB SÃO BERNARDO DO CAMPO", "SICOOB SÃO CAETANO DO SUL",
        "VILA GUILHERME", "VILA MARIANA", "VW SÃO BERNARDO DO CAMPO"
    ];

    const postoSelect = document.getElementById('posto');
    postos.forEach(posto => {
        const option = document.createElement('option');
        option.value = posto;
        option.textContent = posto;
        postoSelect.appendChild(option);
    });

    const itensContainer = document.getElementById('itens');
    for (let i = 1; i <= 30; i++) {
        const div = document.createElement('div');
        div.className = 'form-group inline-group';
        div.innerHTML = `
            <label>Item ${i}:</label>
            <select name="item${i}">
                <option value="DEF">DEF</option>
            </select>
            <input type="number" name="quantidade${i}" min="0" placeholder="Quantidade">
        `;
        itensContainer.appendChild(div);
    }

    document.getElementById('pedidoForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
          .then(data => {
            alert('Formulário enviado com sucesso!');
          })
          .catch(error => {
            console.error('Erro:', error);
          });
    });
});
