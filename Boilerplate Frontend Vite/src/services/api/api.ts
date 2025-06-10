import axios from "axios"
import { parseCookies } from "nookies"
import { getHost } from "../../shared/utils"

const cookies = parseCookies()
const host = getHost()

const port = host.port != "80" ? `:${host.port}` : ""
const url = `${host.protocol}//${host.hostname}${port}`

export const api = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${cookies["nextauth.token"]}`
  }
})
