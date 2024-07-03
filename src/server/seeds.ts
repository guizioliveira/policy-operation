export const seeds = [
  {
    id: '1',
    numero: 125456,
    valor_premio: 100.0,
    segurado: {
      nome: 'Rita de Cassia da Silva',
      email: 'ritadecassia@email.com',
      cpf_cnpj: '123.456.789-00',
    },
    coberturas: [
      {
        nome: 'Incêndio',
        valor: 14.0,
      },
    ],
  },
  {
    id: '2',
    numero: 234567,
    valor_premio: 150.0,
    segurado: {
      nome: 'João da Silva',
      email: 'joao.silva@example.com',
      cpf_cnpj: '234.567.890-11',
    },
    coberturas: [
      {
        nome: 'Roubo',
        valor: 20.0,
      },
      {
        nome: 'Vandalismo',
        valor: 10.0,
      },
    ],
  },
  {
    id: '3',
    numero: 345678,
    valor_premio: 200.0,
    segurado: {
      nome: 'Maria Fernanda Oliveira',
      email: 'maria.fernanda@example.com',
      cpf_cnpj: '345.678.901-22',
    },
    coberturas: [
      {
        nome: 'Danos Elétricos',
        valor: 30.0,
      },
      {
        nome: 'Inundação',
        valor: 25.0,
      },
    ],
  },
]
