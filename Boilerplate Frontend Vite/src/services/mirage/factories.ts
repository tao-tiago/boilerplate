import { Factory } from "miragejs"
import { faker } from "@faker-js/faker"

export const UserFactory = Factory.extend({
  id: () => faker.datatype.uuid(),
  name: () => faker.lorem.word({ length: { min: 10, max: 15 } })
})
