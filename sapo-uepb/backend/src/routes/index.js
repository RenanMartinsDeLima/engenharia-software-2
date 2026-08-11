const express = require('express');
const cors = require('cors');
const abrirBanco = require('../services/abrir-banco');

const routerPertences = require("./Pertences");
const routerUsuarios = require("./Usuarios");

const app = express();
app.use(cors());
app.use(express.json());


app.use("/usuarios", routerUsuarios);
app.use("/pertences", routerPertences);


const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor do SAPO-UEPB rodando na porta ${PORTA}`);

}); 