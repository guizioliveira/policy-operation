import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Form, { ApoliceFormData } from '../../components/form'

export function CreateApolice() {
  const navigate = useNavigate()

  async function handleCreate(data: ApoliceFormData) {
    try {
      await axios.post(`/api/apolice`, data)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        <div className="container mx-auto px-0 md:px-6">
          <div className="py-10">
            <h2 className="text-4xl font-exo font-bold text-brand-500 italic inline mr-6">
              Crie uma nova apólice
            </h2>
          </div>
          <div className="w-1/2">
            <Form handleSave={handleCreate} />
          </div>
        </div>
      }
    </>
  )
}
