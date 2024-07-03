export const formatCpfCnpj = (value: string) => {
  const cleanedValue = value.replace(/\D/g, '')

  if (cleanedValue.length <= 11) {
    // CPF
    return cleanedValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  } else {
    // CNPJ
    return cleanedValue
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
}

export const formatToBRL = (value: string) => {
  value = value.replace(/\D/g, '')

  value = (parseInt(value) / 100).toFixed(2).toString()

  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return `R$ ${value}`
}
