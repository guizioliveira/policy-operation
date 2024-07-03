import React, { Suspense } from 'react'
import { ApoliceProps } from '../server/api'
import { Button } from './button'
import { Edit3, Trash2 } from 'lucide-react'
import { NavigateFunction } from 'react-router-dom'

interface ApolicesTableProps {
  apolices: ApoliceProps[]
  deleteApolice: (id: number) => void
  navigation: NavigateFunction
}

export function ApolicesTable({
  navigation,
  deleteApolice,
  apolices,
}: ApolicesTableProps) {
  return (
    <Suspense fallback={'Loading'}>
      <table className="w-full border-collapse md:min-w-[600px] mt-6 overflow-x-scroll">
        <thead>
          <tr className="text-zinc-600 font-exo leading-relaxed italic">
            <th className="bg-zinc-50 p-4 text-left rounded-tl-lg pl-6">
              Número
            </th>
            <th className="bg-zinc-50 p-4 text-left">Segurado</th>
            <th className="bg-zinc-50 p-4 text-left">Prêmio</th>
            <th className="bg-zinc-50 p-4 text-left">Coberturas</th>
            <th className="bg-zinc-50 p-4 text-left rounded-tr-lg pr-6" />
          </tr>
        </thead>

        <tbody>
          {apolices.map((apolice) => (
            <tr key={apolice.id}>
              <td className="bg-zinc-100 font-bold border-t-2 border-white p-4 leading-relaxed w-1/12 pl-6">
                {apolice.numero}
              </td>
              <td className="bg-zinc-100 border-t-2 border-white p-4 leading-relaxed w-1/2">
                {apolice.segurado.nome}
              </td>
              <td className="bg-zinc-100 border-t-2 border-white p-4 leading-relaxed w-1/12">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(apolice.valor_premio)}
              </td>
              <td className="bg-zinc-100 border-t-2 border-white p-4 leading-relaxed">
                {apolice.coberturas.map((cobertura, index) => (
                  <span key={index}>{cobertura.nome}</span>
                ))}
              </td>
              <td className="bg-zinc-100 border-t-2 border-white p-4 leading-relaxed pr-6">
                <Button
                  size="sm"
                  className="inline-block mr-2"
                  onClick={() => navigation(`/edit/${apolice.id}`)}
                >
                  <Edit3 size={16} />
                </Button>
                <Button
                  onClick={() => deleteApolice(apolice.id)}
                  size="sm"
                  variant="danger"
                  className="inline-block"
                >
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Suspense>
  )
}
