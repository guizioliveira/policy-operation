import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from './button'
import Input from './input'
import { ApoliceProps } from '../server/api'
import { useNavigate } from 'react-router-dom'
import { formatCpfCnpj } from '../utils/formatters'

const apoliceFormSchema = zod.object({
  apoliceNumber: zod
    .number()
    .min(100000, { message: 'O número deve conter o minímo de 6 dígitos' }),
  awardValue: zod.number().min(10, 'O valor deve ser de no mínimo R$ 10,00'),
  name: zod
    .string()
    .min(3, 'Nome do segurado deve ter ao menos 3 letras')
    .regex(/^[A-Z][a-z]*(?: [A-Z][a-z]*)+$/i, {
      message: 'O usuário deve ter apenas letras e hifens.',
    }),
  cpfCnpj: zod
    .string({
      required_error: 'CPF/CNPJ é obrigatório.',
    })
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '')
      return replacedDoc.length >= 11
    }, 'CPF/CNPJ deve conter no mínimo 11 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '')
      return replacedDoc.length <= 14
    }, 'CPF/CNPJ deve conter no máximo 14 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '')
      return !!Number(replacedDoc)
    }, 'CPF/CNPJ deve conter apenas números.'),
  email: zod
    .string()
    .min(1, 'Este campo precisaser preenchido.')
    .email('Este não é um e-mail valido.'),
})

export type ApoliceFormData = zod.infer<typeof apoliceFormSchema>

interface FormProps {
  apolice?: ApoliceProps
  handleSave: (data: ApoliceFormData) => void
}

export default function Form({ apolice, handleSave }: FormProps) {
  const navigate = useNavigate()
  const apoliceForm = useForm<ApoliceFormData>({
    resolver: zodResolver(apoliceFormSchema),
    defaultValues: {
      apoliceNumber: apolice?.numero || 0,
      awardValue: apolice?.valor_premio || 0,
      name: apolice?.segurado.nome || '',
      cpfCnpj: apolice?.segurado.cpf_cnpj || '',
      email: apolice?.segurado.email || '',
    },
  })

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = apoliceForm

  const handleClick = (data: ApoliceFormData) => {
    handleSave(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleClick)}>
      <FormProvider {...apoliceForm}>
        <h2 className="text-brand-400 font-exo italic text-xl mb-6">
          Dados da apólice
        </h2>
        <div className="grid gap-6 mb-6 md:grid-cols-2 px-2 md:px-6">
          <Input
            label="Número"
            id="apoliceNumber"
            type="number"
            placeholder="123456"
            formRegister="apoliceNumber"
            error={errors.apoliceNumber?.message}
          />

          <Input
            label="Valor do prémio"
            id="awardValue"
            type="text"
            placeholder="R$ 0,00"
            formRegister="awardValue"
            error={errors.awardValue?.message}
          />
        </div>
        <h2 className="text-brand-400 font-exo italic text-xl mb-6">
          Dados do segurado
        </h2>
        <div className="mb-6 px-2 md:px-6">
          <Input
            label="Nome"
            id="name"
            type="text"
            placeholder="Nome do segurado"
            formRegister="name"
            error={errors.name?.message}
          />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2 px-2 md:px-6">
          <Input
            label="E-mail"
            id="email"
            type="text"
            placeholder="E-mail do segurado"
            formRegister="email"
            error={errors.email?.message}
          />

          <Input
            label="CPF/CNPJ"
            id="cpfCnpj"
            type="text"
            placeholder="E-mail do segurado"
            formRegister="cpfCnpj"
            error={errors.cpfCnpj?.message}
            onChange={(e) => {
              const { value } = e.target
              e.target.value = formatCpfCnpj(value)
            }}
          />
        </div>
      </FormProvider>

      <div className="flex gap-2 w-full justify-end md:pr-6">
        <Button type="submit" className="md:w-auto w-full">
          Salvar
        </Button>
        <Button
          variant="danger"
          className="w-full md:w-auto"
          onClick={() => navigate('/')}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
