import { container } from "tsyringe"

// Repositories
import { ProviderRepository } from "@/repositories/provider/provider.repository"
import { ProductRepository } from "@/repositories/product/product.repository"

// Registering repositories
container.registerSingleton<ProviderRepository>(
  "ProviderRepository",
  ProviderRepository
)

container.registerSingleton<ProductRepository>(
  "ProductRepository",
  ProductRepository
)
