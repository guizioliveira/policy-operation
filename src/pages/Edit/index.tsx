import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ApoliceProps } from '../../server/api'
import Form, { ApoliceFormData } from '../../components/form'

export function EditApolice() {
  const [apolice, setApolice] = useState<ApoliceProps>()
  const params = useParams()
  const navigate = useNavigate()

  async function handleEdit(data: ApoliceFormData) {
    try {
      await axios.put(`/api/apolice/${apolice!.id}`, data)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchApolice = async () => {
      try {
        const response = await axios.get(`/api/apolice/${params.id}`)
        if (response.data.apolice) {
          setApolice(response.data.apolice)
          console.log(response.data.apolice)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchApolice()
  }, [])

  return (
    <>
      {apolice ? (
        <div className="container mx-auto px-6">
          <div className="py-10">
            <h2 className="text-3xl md:text-4xl font-exo font-bold text-brand-500 italic inline mr-4 md:mr-6">
              {apolice.numero}
            </h2>
            <span className="text-zinc-700 font-exo italic text-xl md:text-3xl">
              {apolice.segurado.nome}
            </span>
          </div>
          <div className="w-full md:w-1/2">
            <Form apolice={apolice} handleSave={handleEdit} />
          </div>
        </div>
      ) : (
        'nada a retornar'
      )}
    </>
  )
}
