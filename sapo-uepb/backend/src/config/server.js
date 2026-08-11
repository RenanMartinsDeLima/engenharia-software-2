const express = require('express');
const cors = require('cors');
const abrirBanco = require('../services/abrir-banco'); // Arquivo SQLite criado no passo anterior

const app = express();
app.use(cors());
app.use(express.json()); // Permite que a API receba dados no formato JSON

// ==========================================
// ROTAS DE ITENS ACHADOS
// ==========================================

// RF01 - Cadastrar um novo item achado
app.post('/api/itens', async (req, res) => {
  try {
    const db = await abrirBanco();
    const { titulo, categoria, campus, bloco, foto_url, cadastrado_por } = req.body;

    const result = await db.run(
      `INSERT INTO itens_achados (titulo, categoria, campus, bloco, foto_url, status, cadastrado_por) 
       VALUES (?, ?, ?, ?, ?, 'DISPONIVEL', ?)`,
      [titulo, categoria, campus, bloco, foto_url, cadastrado_por]
    );

    res.status(201).json({ mensagem: 'Item cadastrado com sucesso!', id: result.lastID });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar o item.' });
  }
});

// RF03 - Buscar e filtrar itens achados
app.get('/api/itens', async (req, res) => {
  try {
    const db = await abrirBanco();
    // No futuro, você pode adicionar a lógica dos filtros (campus, bloco) usando req.query
    const itens = await db.all(`SELECT * FROM itens_achados WHERE status = 'DISPONIVEL'`);
    
    res.status(200).json(itens);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar os itens.' });
  }
});

// ==========================================
// ROTAS DE ALERTAS DE PERDA
// ==========================================

// RF02 - Registrar um aviso de pertence sumido
app.post('/api/alertas', async (req, res) => {
  try {
    const db = await abrirBanco();
    const { usuario_id, categoria, campus, bloco, data_perda } = req.body;

    const result = await db.run(
      `INSERT INTO alertas_perda (usuario_id, categoria, campus, bloco, data_perda) 
       VALUES (?, ?, ?, ?, ?)`,
      [usuario_id, categoria, campus, bloco, data_perda]
    );

    res.status(201).json({ mensagem: 'Alerta de perda registrado!', id: result.lastID });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao registrar alerta.' });
  }
});

// ==========================================
// ROTAS DE REIVINDICAÇÃO
// ==========================================

// RF04 - Solicitar a reivindicação de um item para provar posse
app.post('/api/reivindicacoes', async (req, res) => {
  try {
    const db = await abrirBanco();
    const { item_id, usuario_id, justificativa_posse } = req.body;

    const result = await db.run(
      `INSERT INTO reivindicacoes (item_id, usuario_id, justificativa_posse, status) 
       VALUES (?, ?, ?, 'PENDENTE')`,
      [item_id, usuario_id, justificativa_posse]
    );

    // Atualiza o status do item para não aparecer mais na busca geral
    await db.run(`UPDATE itens_achados SET status = 'EM_REIVINDICACAO' WHERE id = ?`, [item_id]);

    res.status(201).json({ mensagem: 'Solicitação de reivindicação enviada para análise!', id: result.lastID });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao solicitar reivindicação.' });
  }
});

// ==========================================
// INICIALIZAÇÃO DO SERVIDOR
// ==========================================
const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor do SAPO-UEPB rodando na porta ${PORTA}`);
});