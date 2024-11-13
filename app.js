const express = require('express');
const ClienteController = require('./controllers/ClienteController');
const ExameController = require('./controllers/ExameController');

const app = express();
app.use(express.json());

app.get('/clientes', ClienteController.getAll);
app.get('/clientes/:id', ClienteController.getById);
app.post('/clientes', ClienteController.post);
app.patch('/clientes/:id', ClienteController.patch);
app.delete('/clientes/:id', ClienteController.delete);

app.get('/exames', ExameController.getAll);
app.get('/exames/:id', ExameController.getById);
app.post('/exames', ExameController.post);
app.patch('/exames/:id', ExameController.patch);
app.delete('/exames/:id', ExameController.delete);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
