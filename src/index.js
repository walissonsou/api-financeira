const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

const clientes = [];
app.use(express.json())
app.post("/contas", (req, res) => {
  const { cpf, name } = req.body;
  const id = uuidv4();

  clientesJaExiste = clientes.some(cliente => cliente.cpf === cpf) 
  if(clientesJaExiste){
    return console.log("Já existe")
  }

  clientes.push({
    id,
    name,
    cpf,
    statement: [],
  });
  
  return res.status(201).send();

});
app.listen(3333);
