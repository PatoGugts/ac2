let clientes = [
    {
      id: 1,
      nome: "João Silva",
      idade: 30,
      ra: "123456",
      exames: [
        { id: 1, nome: "Exame de Sangue", clinica: "Clínica Arthur Alex" },
        { id: 2, nome: "Ultrassom", clinica: "Clínica Gustavo Souza" }
      ]
    },
    {
      id: 2,
      nome: "Maria Souza",
      idade: 25,
      ra: "654321",
      exames: []
    }
  ];
  
  module.exports = { clientes };
  