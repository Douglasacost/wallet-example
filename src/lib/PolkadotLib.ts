import { Keyring } from '@polkadot/keyring'
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto'
import { KeyringPair } from '@polkadot/keyring/types'
import { u8aToHex } from '@polkadot/util'
import { SignerPayloadJSON } from '@polkadot/types/types'
import { TypeRegistry } from '@polkadot/types'

/**
 * Types
 */
interface IInitArguments {
  mnemonic?: string
}

/**
 * Library
 */
export default class PolkadotLib {
  keypair: KeyringPair
  mnemonic: string
  registry: TypeRegistry

  constructor(keypair: KeyringPair, mnemonic: string) {
    this.keypair = keypair
    this.mnemonic = mnemonic
    this.registry = new TypeRegistry()
  }

  static async init({ mnemonic }: IInitArguments) {
    // wait till  WASM is initialized, in case it is not initialized already (WASM is required for 'sr25519').
    await cryptoWaitReady()

    // create a keyring to load the account.
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 1 })

    mnemonic = mnemonic || mnemonicGenerate()
    const keypair = keyring.createFromUri(mnemonic)

    return new PolkadotLib(keypair, mnemonic)
  }

  public getAddress() {
    return this.keypair.address
  }

  public getMnemonic() {
    return this.mnemonic
  }

  public async signMessage(message: string) {
    return {
      signature: u8aToHex(this.keypair.sign(message))
    }
  }

  public async signTransaction(payload: SignerPayloadJSON) {
    debugger
    this.registry.setSignedExtensions(payload.signedExtensions)
    // encode transaction
    const txPayload = this.registry.createType('ExtrinsicPayload', payload, {
      version: payload.version
    })

    console.log(`Payload to Sign ${txPayload.toHex()}`)

    // get the message to sign
    let message = txPayload.toU8a({ method: true })
    if (message.length > 256) {
      message = this.registry.hash(message) // blake2b_256
    }

    // PRIVATE KEY TYPE + RAW SIGNATURE
    const signature = this.keypair.sign(message, { withType: true })
    debugger
    console.log(`Signature ${u8aToHex(signature)}`)
    return { signature: u8aToHex(signature) }
  }
}
