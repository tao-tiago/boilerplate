import { Warning } from "../../../errors"
import { maxContent, minContent } from "../../helpers/messages"

interface IFieldRange {
  field: string
  fieldName: string
  min?: number
  max?: number
  blank?: boolean
}

export const cnpjValidation = (cnpj = ""): boolean => {
  cnpj = cnpj.replace(/[^\d]+/g, "") // Remove non-numeric characters from the CNPJ

  // CNPJ must have 14 digits
  if (cnpj.length !== 14) return false

  // Check for repeated digits
  if (/^(\d)\1+$/.test(cnpj)) return false

  const size = cnpj.length - 2
  const numbers = cnpj.substring(0, size)
  const digits = cnpj.substring(size)

  const sum1 =
    Number(numbers.charAt(0)) * 5 +
    Number(numbers.charAt(1)) * 4 +
    Number(numbers.charAt(2)) * 3 +
    Number(numbers.charAt(3)) * 2 +
    Number(numbers.charAt(4)) * 9 +
    Number(numbers.charAt(5)) * 8 +
    Number(numbers.charAt(6)) * 7 +
    Number(numbers.charAt(7)) * 6 +
    Number(numbers.charAt(8)) * 5 +
    Number(numbers.charAt(9)) * 4 +
    Number(numbers.charAt(10)) * 3 +
    Number(numbers.charAt(11)) * 2

  const result1 = sum1 % 11 < 2 ? 0 : 11 - (sum1 % 11)

  if (result1 !== Number(digits.charAt(0))) return false

  const sum2 =
    Number(numbers.charAt(0)) * 6 +
    Number(numbers.charAt(1)) * 5 +
    Number(numbers.charAt(2)) * 4 +
    Number(numbers.charAt(3)) * 3 +
    Number(numbers.charAt(4)) * 2 +
    Number(numbers.charAt(5)) * 9 +
    Number(numbers.charAt(6)) * 8 +
    Number(numbers.charAt(7)) * 7 +
    Number(numbers.charAt(8)) * 6 +
    Number(numbers.charAt(9)) * 5 +
    Number(numbers.charAt(10)) * 4 +
    Number(numbers.charAt(11)) * 3 +
    Number(digits.charAt(0)) * 2

  const result2 = sum2 % 11 < 2 ? 0 : 11 - (sum2 % 11)

  if (result2 !== Number(digits.charAt(1))) return false

  return true
}

export const cpfValidation = (cpf = ""): boolean => {
  cpf = cpf.replace(/[^\d]+/g, "")

  // CPF must have 11 digits
  if (cpf.length !== 11) return false
  // Check for repeated digits
  if (/^(\d)\1+$/.test(cpf)) return false

  // Check for digits zero
  if (cpf === "00000000000") return false

  const digitsArray = cpf.split("").map(Number)
  let rest: number

  // Validate the first check digit
  const sumDigits1 = digitsArray.slice(0, 9).reduce((accumulator, digit, index) => {
    const product = digit * (10 - index)
    return accumulator + product
  }, 0)

  rest = (sumDigits1 * 10) % 11

  if (rest === 10 || rest === 11) rest = 0
  if (rest !== digitsArray[9]) return false

  // Validate the second check digit
  const sumDigits2 = digitsArray.slice(0, 10).reduce((accumulator, digit, index) => {
    const product = digit * (11 - index)
    return accumulator + product
  }, 0)

  rest = (sumDigits2 * 10) % 11

  if (rest === 10 || rest === 11) rest = 0
  if (rest !== digitsArray[10]) return false

  return true
}

export const dateValidation = (date: string): boolean => {
  if (date === null) return false

  const dateGenerate = new Date(date)

  return (
    !isNaN(dateGenerate.getTime()) &&
    dateGenerate.toISOString().slice(0, 10) === date.slice(0, 10)
  )
}

export const emailValidation = (email = ""): boolean => {
  const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i

  return emailValidation.test(email)
}

export const rangeValidation = ({
  field,
  fieldName,
  min,
  max,
  blank = false
}: IFieldRange): void => {
  if (field.length === 0 && blank) return

  if (min && field.length < min) { throw new Warning(`${fieldName} ${minContent(min)}`, 400) }

  if (max && field.length > max) { throw new Warning(`${fieldName} ${maxContent(max)}`, 400) }
}
