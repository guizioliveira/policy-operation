import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/button'
import { ApolicesTable } from '../../components/apolicesTable'
import { ApoliceProps } from '../../server/api'
import { ArrowBigRightDash } from 'lucide-react'

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

  const deleteApolice = async (id: number) => {
    try {
      await axios.delete(`/api/apolice/${id}`)
      await fetchApolices()
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
            <Button onClick={() => navigate('/create')}>
              <ArrowBigRightDash size={24} /> Adicione uma apólice aqui!
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto w-full mt-10">
        <h3 className="font-exo italic text-3xl text-zinc-700 px-6 md:px-0">
          Lista de apólices
        </h3>
        <ApolicesTable
          apolices={apolices}
          deleteApolice={deleteApolice}
          navigation={navigate}
        />
      </div>
    </div>
  )
}
