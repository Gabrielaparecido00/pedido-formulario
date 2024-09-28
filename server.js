const express = require('express');
const XLSX = require('xlsx');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/submit', (req, res) => {
    try {
        const data = req.body;
        const workbook = XLSX.utils.book_new();
        const worksheetData = [];

        worksheetData.push(['Nome', data.nome || '']);
        worksheetData.push(['Telefone', data.telefone || '']);
        worksheetData.push(['Posto', data.posto || '']);

        worksheetData.push(['Itens Solicitado']);
        for (let i = 1; i <= 30; i++) {
            worksheetData.push([
                `Item ${i}`,
                data[`item${i}`] || '',
                data[`quantidade${i}`] || 0
            ]);
        }

        worksheetData.push(['Observações', data.observacoes || '']);

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedido');

        const filePath = `./pedido_${Date.now()}.xlsx`;
        XLSX.writeFile(workbook, filePath);

        res.json({ message: 'Dados recebidos e arquivo criado!', filePath });

        // Opcional: Remover o arquivo após um certo tempo
        setTimeout(() => {
            fs.unlink(filePath, (err) => {
                if (err) console.error('Erro ao remover o arquivo:', err);
            });
        }, 60000); // 60 segundos
    } catch (error) {
        console.error('Erro ao processar o pedido:', error);
        res.status(500).json({ message: 'Erro ao processar o pedido.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
