import { ProviderRepository } from "../repositories/provider/provider.repository"

describe("Provider Repository", () => {
  const providerRepository = new ProviderRepository()

  it("should create a new provider", async () => {
    const message = await providerRepository.createProvider({
      corporateName: "Company Name",
      typeProvider: "LTDA"
    })

    expect(message).toEqual(["Fornecedor cadastrado com sucesso"])
  })
})
