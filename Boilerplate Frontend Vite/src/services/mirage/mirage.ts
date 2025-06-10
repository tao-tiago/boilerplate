import { createServer, Model } from "miragejs"
import { UserFactory } from "./factories"

export function mirage({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model
    },

    factories: {
      user: UserFactory
    },

    seeds(server) {
      server.createList("user", 10)
    },

    routes() {
      this.namespace = "api"

      this.get(
        "/home",
        () => {
          return server.db.users
        },
        { timing: 2500 }
      )

      this.passthrough()
      this.passthrough("http://api.acme.com/**")
    }
  })

  return server
}
