import { createServer, Model, Response } from 'miragejs'

interface Segurado {
  nome: string
  email: string
  cpf_cnpj: string
}

interface Cobertura {
  nome: string
  valor: number
}

export interface ApoliceProps {
  id: number
  numero: number
  valor_premio: number
  segurado: Segurado
  coberturas: Cobertura[]
}

export function createMockServer() {
  createServer({
    models: {
      apolice: Model.extend<Partial<ApoliceProps>>({}),
    },

    seeds(server) {
      server.create('apolice', {
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
      })
      server.create('apolice', {
        id: '2',
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
      })
      server.create('apolice', {
        id: '3',
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
      })
    },

    routes() {
      this.namespace = 'api'

      this.get('/apolices', (schema, request) => {
        const page = parseInt(request.queryParams.page as string) || 1
        const pageSize = parseInt(request.queryParams.pageSize as string) || 10

        const apolices = schema.all('apolice')

        const paginatedApolices = apolices.slice(
          (page - 1) * pageSize,
          page * pageSize,
        )

        return new Response(
          200,
          {},
          {
            content: paginatedApolices,
            page,
            totalItens: apolices.length,
            totalPages: Math.ceil(apolices.length / pageSize),
          },
        )
      })

      this.get('/apolice/:id', (schema, request) => {
        const id = request.params.id
        return schema.find('apolice', id)
      })
    },
  })
}