import { generateSecureCode } from "./generateSecureCode"

describe("GenerateSecureCode Utils", () => {
  it("should generate secure code", () => {
    const code1 = generateSecureCode()
    const code2 = generateSecureCode(5)

    // Code One
    expect(code1.length).toEqual(10)
    expect(typeof code1).toEqual("string")

    // Code Two
    expect(code2.length).toEqual(5)
  })
})
