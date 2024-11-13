const { exames } = require('../models/Exame');
const { clientes } = require('../models/Cliente');

module.exports = {
  getAll(req, res) {
    const examesComClientes = exames.map(exame => {
      const cliente = clientes.find(c => c.id === exame.id_cliente);
      return { ...exame, cliente };
    });
    return res.json(examesComClientes);
  },

  getById(req, res) {
    const exame = exames.find(e => e.id == req.params.id);
    if (!exame) {
      return res.status(404).json({ error: 'Exame não encontrado' });
    }
    const cliente = clientes.find(c => c.id === exame.id_cliente);
    return res.json({ exame, cliente });
  },

  post(req, res) {
    const { nome, clinica, id_cliente } = req.body;
    const id = exames.length + 1; 
    const newExame = { id, nome, clinica, id_cliente };
    exames.push(newExame);
    const cliente = clientes.find(c => c.id === id_cliente);
    if (cliente) {
      cliente.exames.push(id);
    }
    return res.status(201).json(newExame);
  },

  patch(req, res) {
    const { nome, clinica } = req.body;
    const exame = exames.find(e => e.id == req.params.id);
    if (!exame) {
      return res.status(404).json({ error: 'Exame não encontrado' });
    }
    exame.nome = nome || exame.nome;
    exame.clinica = clinica || exame.clinica;
    return res.json(exame);
  },

  delete(req, res) {
    const index = exames.findIndex(e => e.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Exame não encontrado' });
    }
    const exame = exames.splice(index, 1)[0];
    const cliente = clientes.find(c => c.id === exame.id_cliente);
    if (cliente) {
      cliente.exames = cliente.exames.filter(ex => ex !== exame.id);
    }
    return res.status(204).send();
  }
};
