import {
  cpfMask,
  cnpjMask,
  phoneMask,
  dateMask,
  cepMask,
  onlyNumberMask
} from "./fieldMask"

describe("FieldMask Utils", () => {
  it("should generate CPF with mask", () => {
    const cpf1 = cpfMask("01045688785")
    const cpf2 = cpfMask("010xp456to88-785")

    expect(cpf1).toEqual("010.456.887-85")
    expect(cpf2).toEqual("010.456.887-85")
  })

  it("should generate CNPJ with mask", () => {
    const cnpj1 = cnpjMask("40741555000100")
    const cnpj2 = cnpjMask("40xp741to555000100qp")

    expect(cnpj1).toEqual("40.741.555/0001-00")
    expect(cnpj2).toEqual("40.741.555/0001-00")
  })

  it("should generate PHONE with mask", () => {
    const phone1 = phoneMask("88978451210")
    const phone2 = phoneMask("88xp97845qp1010")
    const phone3 = phoneMask("88xp97845101")

    expect(phone1).toEqual("(88) 97845-1210")
    expect(phone2).toEqual("(88) 97845-1010")
    expect(phone3).toEqual("(88) 97845-101")
  })

  it("should generate DATE with mask", () => {
    const date1 = dateMask("22101988")
    const date2 = dateMask("10-05-1900")

    expect(date1).toEqual("22/10/1988")
    expect(date2).toEqual("10/05/1900")
  })

  it("should generate CEP with mask", () => {
    const cep1 = cepMask("12345678")
    const cep2 = cepMask("12q345p999xx")

    expect(cep1).toEqual("12.345-678")
    expect(cep2).toEqual("12.345-999")
  })

  it("should generate NUMBER with mask", () => {
    const number1 = onlyNumberMask("xp12to10")
    const number2 = onlyNumberMask("qaz5plm")
    const number3 = onlyNumberMask("__88xp8qp1010")

    expect(number1).toEqual("1210")
    expect(number2).toEqual("5")
    expect(number3).toEqual("8881010")
  })
})
