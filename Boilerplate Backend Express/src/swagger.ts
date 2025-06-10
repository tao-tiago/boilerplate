import root from "./docs/root.json"
import entidade1 from "./docs/entidade1.json"

const swaggerDocument = JSON.stringify({
  ...root,
  paths: {
    ...entidade1
  }
})

export default swaggerDocument
