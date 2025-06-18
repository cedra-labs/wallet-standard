// Copyright © Cedra Foundation
// SPDX-License-Identifier: Apache-2.0

import { Signature } from '@cedra-labs/ts-sdk'
import { UserResponse } from '../misc'
import { AccountInfo } from '../AccountInfo'

/**
 * NOTE: This feature is currently experimental and is subject to change.
 *
 * Documentation: [Sign in with Cedra](https://github.com/cedra-foundation/AIPs/pull/556)
 */

/** Version of the feature. */
export type CedraSignInVersion = '1.0.0'
/** Name of the feature. */
export const CedraSignInNamespace = 'cedra:signIn'

export type CedraSignInFeature = {
  /** Namespace for the feature. */
  [CedraSignInNamespace]: {
    /** Version of the feature API. */
    version: CedraSignInVersion
    signIn: CedraSignInMethod
  }
}

export type CedraSignInMethod = (
  input: CedraSignInInput
) => Promise<UserResponse<CedraSignInOutput>>

export type CedraSignInInput = {
  /**
Add comment
More actions
   * [`dnsauthority`](https://www.rfc-editor.org/rfc/rfc4501.html) that is requesting the signing.
   *
   * @example 'example.com'
   */
  domain: string
  /**
   * Randomized token to prevent signature replay attacks.
   */
  nonce: string
  /**
   * Blockchain address performing the signing.
   *
   * @example '0x10d7cf502f8571b5b6e402221cafb142547103da9c2847ffcf708f065a78b8d1'
   */
  address?: string
  uri?: string
  version?: string
  statement?: string
  chainId?: string
  issuedAt?: string
  expirationTime?: string
  notBefore?: string
  requestId?: string
  /**
   * List of information or references to information the user wishes to have resolved as part of the authentication by the relying party.
   *
   * @example ['https://example.com/resource']
   */
  resources?: string[]
}

export type CedraSignInBoundFields = {
  domain: string
  address: string
  uri: string
  version: string
  chainId: string
}

export type CedraSignInOutput = {
  account: AccountInfo
  plainText: string
  signingMessage: Uint8Array
  /**Add commentMore actions
   * Input fields to the `signIn` signing request to the wallet. The wallet will ensure that any bound fields not included in the `CedraSignInInput` are included in the output.
   */
  input: CedraSignInInput & CedraSignInBoundFields
  /**
   * Signature of the SIWA Signing Message constructed from the `input` fields.
   */
  signature: Signature
  /**
   * The type of signing scheme used to sign the message.
   *
   * @example 'ed25519' | 'multi_ed25519' | 'single_key' | 'multi_key'
   */
  type: string
}
