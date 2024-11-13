const { clientes } = require('../models/Cliente');
const { exames } = require('../models/Exame');

module.exports = {
  getAll(req, res) {
    return res.json(clientes);
  },

  getById(req, res) {
    const cliente = clientes.find(c => c.id == req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    const clienteExames = cliente.exames.map(exameId => {
      return exames.find(exame => exame.id == exameId);
    });
    return res.json({ cliente, exames: clienteExames });
  },

  post(req, res) {
    const { nome, idade, ra } = req.body;
    const id = clientes.length + 1; 
    const newCliente = { id, nome, idade, ra, exames: [] };
    clientes.push(newCliente);
    return res.status(201).json(newCliente);
  },

  patch(req, res) {
    const { nome, idade, ra } = req.body;
    const cliente = clientes.find(c => c.id == req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    cliente.nome = nome || cliente.nome;
    cliente.idade = idade || cliente.idade;
    cliente.ra = ra || cliente.ra;
    return res.json(cliente);
  },

  delete(req, res) {
    const index = clientes.findIndex(c => c.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    const cliente = clientes.splice(index, 1)[0];
    exames = exames.filter(exame => exame.id_cliente !== cliente.id);
    return res.status(204).send();
  }
};
