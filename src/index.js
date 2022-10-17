const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

const clientes = [];
app.use(express.json());

// Middleware

function VerificaSeCpfJaExiste(req, res, next) {
  const { cpf } = req.headers;

  const cliente = clientes.find((cliente) => cliente.cpf === cpf);

  if (!cliente) {
    return res.status(404).json({ Error: "Cpf não encontrado" });
  } 
  return next();
}

app.post("/contas", (req, res) => {
  const { cpf, name } = req.body;
  const id = uuidv4();

  clientesJaExiste = clientes.some((cliente) => cliente.cpf === cpf);
  if (clientesJaExiste) {
    return res
      .status(400)
      .json({ error: "Cliente com esse cpf já existe no nosso sistema." });
  }

  clientes.push({
    id,
    name,
    cpf,
    extrato: [],
  });

  return res.status(201).json("Cadastrado");
});

app.get("/extrato/", VerificaSeCpfJaExiste, (req, res) => {
  const { cpf } = req.headers;

  const cliente = clientes.find((cliente) => cliente.cpf === cpf);

  return res.json(cliente.extrato);
});

app.post("contas/:cpf", (req, res) => {});
app.listen(3333);
