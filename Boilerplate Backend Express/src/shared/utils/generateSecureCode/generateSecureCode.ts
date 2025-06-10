import crypto from "crypto"

export const generateSecureCode = (length = 10) => {
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2))
  const voucherCode = randomBytes.toString("hex").toUpperCase().slice(0, length)

  return voucherCode
}
