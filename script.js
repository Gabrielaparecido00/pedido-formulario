document.addEventListener('DOMContentLoaded', () => {
    const postos = [
        "AC DELCO", "ANHAIA", "ARICANDUVA (GM/KIA)", "BARUEL", "GALPÃO",
        "GM SÃO BERNARDO DO CAMPO", "GUARULHOS", "LA PLAÇA", "MAUÁ", "NAZARÉ",
        "OFICINA MOREIRA DE GODOY", "PENHA", "R JAFET", "SANTO ANDRÉ",
        "SICOOB GUARULHOS", "SICOOB SANTO AMARO", "SICOOB SANTO ANDRÉ",
        "SICOOB SÃO BERNARDO DO CAMPO", "SICOOB SÃO CAETANO DO SUL",
        "VILA GUILHERME", "VILA MARIANA", "VW SÃO BERNARDO DO CAMPO"
    ];

    const itens = [
        "BALDE MEDIO - AZUL", "BALDE MEDIO - PRETO", "BRILHO INOX", "CABO 120 CM C/ROSCA MADEIRA",
        "CABO DE ALUMINIO 1,40 M C/ROSCA", "CARRINHO MULTIFUNCIONAL (SÓ O CARRO)", "CLORO 5 litros",
        "DESENGRAXANTE - 5 LTS - SPARTAN BL-10", "DISCO BRANCO - 410 MM (3M PLUS)", "DISCO BRANCO - 510 MM (3M PLUS)",
        "DISCO VERMELHO - 410 MM (3M PLUS)", "DISCO VERMELHO - 510 MM (3M PLUS)", "LIMPA VIDRO",
        "MOP ÁGUA - CABO E ESFREGÃO", "MOP PÓ 40 CM - REFIL", "MOP PÓ 40 CM - COMPLETO", "MOP PÓ 60 CM - COMPLETO",
        "PEROXY 5LTS", "RODO PARA LIMPAR VIDRO", "SACO DE LIXO 120 LTS - PCT", "SACO DE LIXO 40 LTS - PCT",
        "SUPORTE PARA VASSOURA", "VASSOURÃO TIPO GARI", "BOM AR (PARA AROMATIZ. AUTOMATICO)",
        "VASSOURINHA PARA TIRAR TEIA DO TETO", "ALCOOL 70º", "EXTENSÃO ENCERADEIRA (500v) - 20 metros",
        "FIBRA PARA LT BRANCA", "EXTENSOR TELESCÓPICO 9M", "VASSOURA PIAÇAVA", "BALDE MEDIO", "PÁ DE LIXO",
        "SACO DE LIXO 20 LTS - PCT", "SUPORTE PARA LT COM CABO", "VASSOURA NOVIÇA - VERMELHA", "BALDE ESPREMEDOR",
        "DISCO PRETO - 410 MM (3M PLUS)", "ESCOVA DE ROUPA", "LIMPA PEDRA - 5 LTS - PEDREX", "MOP ÁGUA - REFIL",
        "PÁ DE LIXO (COLETORA)", "RASTELO (PLASTICO)", "REMOVEDOR DE CERA", "RODO 40 CM (DRY) REFIL - AMARELO",
        "SABÃO LÍQUIDO", "SACO DE LIXO 100 LTS - PCT", "SACO DE LIXO 60 LTS - PCT", "SUPORTE PARA LT (SEM CABO)",
        "VASSOURA NOVIÇA - AMARELA", "VASSOURA NOVIÇA - AZUL", "BORRIFADOR", "CDC 10 - 5 LTS", "CERA - INCOLOR",
        "COALA - LIMP PERFUMADO", "DESENGRAXANTE - 5 LTS - RL - 60", "DESENTUPIDOR DE VASO SANITARIO",
        "DESIFETANTE 5 LTS - CONCENTRADO LAVANDA", "DETERGENTE 5 LTS", "DISCO PRETO - 510 MM (3M PLUS)",
        "DISCO VERDE - 410 MM (3M PLUS)", "DISCO VERDE - 510 MM (3M PLUS)", "ESCOVA PARA VASO", "ESPANADOR",
        "ESPONJA - VERDE / AMARELA", "FIBRA PARA LT VERDE", "FLANELA BRANCA", "LUSTRA MÓVEIS",
        "LUVAS LIMPEZA - G - (SANRO TOP)", "LUVAS LIMPEZA - M - (SANRO TOP)", "LUVAS LIMPEZA - P - (SANRO TOP)",
        "MOP PÓ 60 CM - REFIL", "MULTIUSO 5 LTS - SPARTAN", "PANO DE CHÃO - BRANCO", "PANO DE CHÃO - XADREZ",
        "RODO 40 CM (DRY) REFIL", "RODO 60 CM (DRY) COM CABO ALUMINIO", "RODO 60 CM (DRY) REFIL",
        "SABÃO EM PEDRA - PACOTE", "SABÃO EM PÓ - CAIXA", "VASSOURA NOVIÇA", "VASSOURA NOVIÇA - PRETA",
        "VASSOURA NYLON"
    ];

    const postoSelect = document.getElementById('posto');
    if (postoSelect) {
        postos.forEach(posto => {
            const option = document.createElement('option');
            option.value = posto;
            option.textContent = posto;
            postoSelect.appendChild(option);
        });
    }

    const itensContainer = document.getElementById('itens');
    if (itensContainer) {
        for (let i = 1; i <= 30; i++) {
            const div = document.createElement('div');
            div.className = 'form-group inline-group';
            
            const label = document.createElement('label');
            label.textContent = `Item ${i}:`;

            const select = document.createElement('select');
            select.name = `item${i}`;
            itens.forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item;
                select.appendChild(option);
            });

            const input = document.createElement('input');
            input.type = 'number';
            input.name = `quantidade${i}`;
            input.min = '0';
            input.placeholder = 'Quantidade';

            div.appendChild(label);
            div.appendChild(select);
            div.appendChild(input);
            itensContainer.appendChild(div);
        }
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
