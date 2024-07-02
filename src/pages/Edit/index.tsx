import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ApoliceProps } from '../../server/api'

export function EditApolice() {
  const [apolice, setApolice] = useState<ApoliceProps>()
  const params = useParams()

  useEffect(() => {
    const fetchApolice = async () => {
      try {
        const response = await axios.get(`/api/apolice/${params.id}`)
        if (response.data.apolice) {
          setApolice(response.data.apolice)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchApolice()
  }, [])

  return (
    <div>{apolice ? <h3>{apolice.segurado.nome}</h3> : 'nada a retornar'}</div>
  )
}
