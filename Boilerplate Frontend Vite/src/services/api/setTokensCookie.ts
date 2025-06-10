import { setCookie } from "nookies"

interface ITokensCookie {
  token: string
  refreshToken: string
}

export const setTokensCookie = ({ token, refreshToken }: ITokensCookie) => {
  setCookie(undefined, "nextauth.token", token, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/"
  })

  setCookie(undefined, "nextauth.refreshToken", refreshToken, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/"
  })
}
