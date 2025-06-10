import axios from "axios"
import { constants } from "../constants"

const api = axios.create({
  baseURL: constants.API_SERVICE
})

export { api }
