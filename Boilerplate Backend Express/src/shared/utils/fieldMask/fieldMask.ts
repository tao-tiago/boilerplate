export const cpfMask = (cpf: string): string =>
  cpf
    .replace(/^\D/g, "")
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+$/, "$1")

export const cnpjMask = (cnpj: string): string =>
  cnpj
    .replace(/^\D/g, "")
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+$/, "$1")

export const phoneMask = (phone: string): string =>
  phone
    .replace(/^\D/g, "")
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+$/, "$1")

export const dateMask = (date: string): string =>
  date
    .replace(/^\D/g, "")
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})\d+$/, "$1")

export const cepMask = (cep: string): string =>
  cep
    .replace(/^\D/g, "")
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+$/, "$1")

export const onlyNumberMask = (text: string): string =>
  text
    .replace(/^\D/g, "")
    .replace(/\D/g, "")
