import * as CryptoJS from 'crypto-js'

export type CryptoAlgorithm = 'AES' | 'TripleDES' | 'Rabbit' | 'RC4'

export class CryptoManager {
  private readonly key: string = process.env.CRYPTO_MANAGER_SECRET_KEY as string
  private readonly algorithm = process.env
    .CRYPTO_MANAGER_ALGORITHM as CryptoAlgorithm

  constructor() {}

  public encrypt(plainText: string): string {
    try {
      const cipherObj = CryptoJS[this.algorithm].encrypt(plainText, this.key)
      return cipherObj.toString()
    } catch (error) {
      throw new Error('Error al encriptar ' + plainText)
    }
  }

  public decrypt(cipherText: string): string {
    try {
      const bytes: CryptoJS.lib.WordArray = (CryptoJS as any)[
        this.algorithm
      ].decrypt(cipherText, this.key)
      return bytes.toString(CryptoJS.enc.Utf8)
    } catch (error) {
      throw new Error('Error al desencriptar ' + cipherText)
    }
  }

  public compare(plainText: string, cipherText: string): boolean {
    const decrypted = this.decrypt(cipherText)
    return plainText === decrypted
  }

  public isEncrypted(text: string): boolean {
    return text.startsWith('U2FsdGVkX1')
  }
}
