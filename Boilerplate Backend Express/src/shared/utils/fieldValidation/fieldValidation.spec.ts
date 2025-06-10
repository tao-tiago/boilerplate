import {
  cnpjValidation,
  cpfValidation,
  dateValidation,
  emailValidation,
  rangeValidation
} from "./fieldValidation"

describe("FieldValidation Utils", () => {
  it("should validate CNPJ", () => {
    const cnpj1 = cnpjValidation("37.166.531/0001-69")
    const cnpj2 = cnpjValidation("37.166.531/0001-68")
    const cnpj3 = cnpjValidation("37.166.531/0001")
    const cnpj4 = cnpjValidation("")

    expect(cnpj1).toEqual(true)
    expect(cnpj2).toEqual(false)
    expect(cnpj3).toEqual(false)
    expect(cnpj4).toEqual(false)
  })

  it("should validate CPF", () => {
    const cpf1 = cpfValidation("615.183.450-00")
    const cpf2 = cpfValidation("615.183.450-01")
    const cpf3 = cpfValidation("615.183.450")
    const cpf4 = cnpjValidation("")

    expect(cpf1).toEqual(true)
    expect(cpf2).toEqual(false)
    expect(cpf3).toEqual(false)
    expect(cpf4).toEqual(false)
  })

  it("should validate date", () => {
    const date1 = dateValidation("2000-01-01")
    const date2 = dateValidation("00-01-01")
    const date3 = dateValidation("2000-1-1")
    const date4 = dateValidation("2000/01/01")
    const date5 = dateValidation("1/1/2011")
    const date6 = dateValidation("2000-01-32")

    expect(date1).toEqual(true)
    expect(date2).toEqual(false)
    expect(date3).toEqual(false)
    expect(date4).toEqual(false)
    expect(date5).toEqual(false)
    expect(date6).toEqual(false)
  })

  it("should validate email", () => {
    // Valid emails
    const valideEmail1 = emailValidation("mysite@ourearth.com")
    const valideEmail2 = emailValidation("my.ownsite@ourearth.org")
    const valideEmail3 = emailValidation("mysite@you.me.net")

    // Invalid emails
    const invalidEmail1 = emailValidation("mysite.ourearth.com")
    const invalidEmail2 = emailValidation("mysite@.com.my")
    const invalidEmail3 = emailValidation("@you.me.net")
    const invalidEmail4 = emailValidation("mysite123@gmail.b")
    const invalidEmail5 = emailValidation(".mysite@mysite.org")
    const invalidEmail6 = emailValidation("mysite..1234@yahoo.com")
    const invalidEmail7 = emailValidation("mysite@yahoo.com.")

    expect(valideEmail1).toEqual(true)
    expect(valideEmail2).toEqual(true)
    expect(valideEmail3).toEqual(true)
    expect(invalidEmail1).toEqual(false)
    expect(invalidEmail2).toEqual(false)
    expect(invalidEmail3).toEqual(false)
    expect(invalidEmail4).toEqual(false)
    expect(invalidEmail5).toEqual(false)
    expect(invalidEmail6).toEqual(false)
    expect(invalidEmail7).toEqual(false)
  })

  it("should validate range", () => {
    rangeValidation({
      field: "name",
      fieldName: "Nome",
      min: 3,
      max: 15
    })
  })
})
