import { container } from "tsyringe"

import { ProviderController } from "./provider.controller"
import { ProductController } from "./product.controller"

const providerController = container.resolve(ProviderController)
const productController = container.resolve(ProductController)

export {
  providerController,
  productController
}
