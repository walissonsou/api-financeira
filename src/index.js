const express = require('express');

const app = express();

app.use(express.json())

/* cpf - string
name - string
id - uuid
statement - extrado que é um []
*/

app.post('/accounts', (req, res) => {
  const { cpf, name } = request.body;

 
})
app.listen(3333)
