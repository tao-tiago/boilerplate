import { Router } from "express"
import {
  providerController,
  productController
} from "../controllers"

const provider = Router()

// Providers
provider.get("/", providerController.listProvider)
provider.post("/", providerController.createProvider)
provider.get("/:id", providerController.getProvider)
provider.put("/:id", providerController.updateProvider)
provider.delete("/:id", providerController.deleteProvider)

// Products
provider.get("/:providerId/products", productController.listProduct)
provider.post("/:providerId/products", productController.createProduct)
provider.get("/products/:id", productController.getProduct)
provider.put("/products/:id", productController.updateProduct)
provider.delete("/products/:id", productController.deleteProduct)

export { provider }
