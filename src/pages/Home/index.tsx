import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ApoliceProps } from '../../server/api'
import { Button } from '../../components/button'
import { ArrowBigRightDash, Trash2, Edit3 } from 'lucide-react'

export function Home() {
  const [apolices, setApolices] = useState<ApoliceProps[]>([])
  const navigate = useNavigate()

  const fetchApolices = async () => {
    try {
      const response = await axios.get('/api/apolices')
      setApolices(response.data.content.models)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchApolices()
  }, [])

  return (
    <div className="relative">
      <div className="w-full relative">
        <div className="w-full lg:w-1/2 bg-brand-300 lg:h-56 h-36 absolute" />
        <div className="relative container mx-auto px-6 flex flex-col items-center gap-4 md:px-0 lg:flex-row lg:h-56 lg:gap-24">
          <h1 className="text-white font-exo italic py-4 md:py-4 font-bold text-3xl sm:text-4xl h-36 sm:h-36 md:text-5xl lg:py-0 lg:h-auto w-full lg:w-1/2">
            Bem-vindo ao nosso controle operacional de apólices
          </h1>
          <div className="w-full lg:w-1/2 space-y-4">
            <p className="w-full text-zinc-700 lg:w-3/4 text-lg md:text-xl font-exo italic">
              Aqui você poderá lidar com o nosso banco de apólices de uma forma
              muito mais fácil! Crie, valide, altere!
            </p>
            <Button>
              <ArrowBigRightDash size={24} /> Crie uma nova apólice agora!
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto w-full mt-10">
        <h3 className="font-exo italic text-3xl text-zinc-700">
          Lista de apólices
        </h3>

        <table className="w-full border-collapse min-w-[600px] mt-6">
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
                <td className="bg-zinc-100 border-t-2 border-white p-4 leading-relaxed">
                  {apolice.segurado.nome}
                </td>
                <td className="bg-zinc-100 border-t-2 border-white p-4 leading-relaxed w-1/12">
                  {apolice.valor_premio}
                </td>
                <td className="bg-zinc-100 border-t-2 border-white p-4 leading-relaxed w-2/5">
                  {apolice.coberturas.map((cobertura, index) => (
                    <span key={index}>{cobertura.nome}</span>
                  ))}
                </td>
                <td className="bg-zinc-100 border-t-2 border-white p-4 leading-relaxed pr-6 flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/edit/${apolice.id}`)}
                  >
                    <Edit3 size={16} />
                  </Button>
                  <Button size="sm" variant="danger">
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
