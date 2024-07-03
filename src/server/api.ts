import { createServer, Model, Response } from 'miragejs'
import { seeds } from './seeds'
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
      apolice: Model,
    },

    seeds(server) {
      seeds.map((item) =>
        server.create('apolice', {
          id: item.id,
          numero: item.numero,
          valor_premio: item.valor_premio,
          segurado: {
            nome: item.segurado.nome,
            email: item.segurado.email,
            cpf_cnpj: item.segurado.cpf_cnpj,
          },
          coberturas: item.coberturas.map((cobertura) => ({
            nome: cobertura.nome,
            valor: cobertura.valor,
          })),
        }),
      )
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

      this.post('/apolice', (schema, request) => {
        const id = String(new Date().getTime())
        const attrs = JSON.parse(request.requestBody)
        const newApolice = {
          id,
          numero: attrs.apoliceNumber,
          valor_premio: attrs.awardValue,
          segurado: {
            nome: attrs.name,
            email: attrs.email,
            cpf_cnpj: attrs.cpfCnpj,
          },
          coberturas: [
            {
              nome: 'Incêndio',
              valor: 14.0,
            },
          ],
        }
        return schema.create('apolice', newApolice)
      })

      this.put('/apolice/:id', (schema: any, request) => {
        const id = request.params.id
        const attrs = JSON.parse(request.requestBody)
        const apolice = schema.find('apolice', id)!
        const updated = {
          numero: attrs.apoliceNumber,
          valor_premio: attrs.awardValue,
          segurado: {
            nome: attrs.name,
            email: attrs.email,
            cpf_cnpj: attrs.cpfCnpj,
          },
          coberturas: [
            {
              nome: 'Incêndio',
              valor: 14.0,
            },
          ],
        }
        return apolice.update(updated)
      })

      this.delete('/apolice/:id', (schema: any, request) => {
        const id = request.params.id
        return schema.find('apolice', id)?.destroy()
      })
    },
  })
}
