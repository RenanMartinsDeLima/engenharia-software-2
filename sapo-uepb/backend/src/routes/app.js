const express = require('express');
const cors = require('cors');
const abrirBanco = require('../config/abrir-banco');

const routerItens = require("./itensRoute");

const app = express();
app.use(cors());
app.use(express.json());


app.use("/itens", routerItens);


const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor do SAPO-UEPB rodando na porta ${PORTA}`);

}); 