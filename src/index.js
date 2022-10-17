const express = require('express');
const { v4: uuidv4 } = require("uuid")
const app = express();

const clientes = [];

app.post('/contas', (req, res) => {

  const { cpf, name } = request.body;
  const id = uuidv4()

  clientes.push({
    id,
    name,
    cpf,
    statement: []
  });
  
  return res.status(201).send()

})
app.listen(3333)
