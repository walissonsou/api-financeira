const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

const clientes = [];
app.use(express.json());

function VerificaSeCpfJaExiste(req, res, next) {
  const { cpf } = req.headers;

  const cliente = clientes.find((cliente) => cliente.cpf === cpf);

  if (!cliente) {
    return res.status(404).json({ Error: "Cpf não encontrado" });
  }

  req.cliente = cliente;
  return next();
}
function buscarSaldo(extrato) {

                              // acumulador e objeto que quer interar 
  const saldo = extrato.reduce((acc, operationDeposit) => {
    if (operationDeposit.type === "credito") {
      return acc + operationDeposit.amount;
    } else {
      return acc - operationDeposit.amount;
    }
  }, 0);

  return saldo;
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
app.post("/deposito", VerificaSeCpfJaExiste, (req, res) => {
  const { descricao, quantia } = req.body;

  const { cliente } = req;

  const operationDeposit = {
    descricao,
    quantia,
    created_at: new Date(),
    type: "credito",
  };

  cliente.extrato.push(operationDeposit);

  return res.status(201).json(`Depósito de ${quantia} feito`);
});
app.get("/extrato", VerificaSeCpfJaExiste, (req, res) => {
  const { cliente } = req;

  return res.json(cliente.extrato);
});
app.post("/saque", VerificaSeCpfJaExiste, (req, res) => {
  const { quantia } = req.body; // o que vai ser passado

  const { cliente } = req; // busca o cliente pelo cpf pela request do header 

  const saldo = buscarSaldo(cliente.extrato);

  if (saldo < quantia) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }
  const operationDeposit = {
    quantia,
    created_at: new Date(),
    type: "debit",
  };

  cliente.extrato.push(operationDeposit);

  return res.status(201).send();

});

app.listen(3333);
