const express = require('express');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    const data = req.body;
    const workbook = XLSX.utils.book_new();
    const worksheetData = [];

    worksheetData.push(['Nome', data.nome]);
    worksheetData.push(['Telefone', data.telefone]);
    worksheetData.push(['Posto', data.posto]);

    worksheetData.push(['Itens Solicitado']);
    for (let i = 1; i <= 30; i++) {
        worksheetData.push([`Item ${i}`, data[`item${i}`], data[`quantidade${i}`]]);
    }

    worksheetData.push(['Observações', data.observacoes]);

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedido');

    const filePath = `./pedido_${Date.now()}.xlsx`;
    XLSX.writeFile(workbook, filePath);

    res.json({ message: 'Dados recebidos e arquivo criado!', filePath });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});