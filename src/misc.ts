// Copyright © Cedra Foundation
// SPDX-License-Identifier: Apache-2.0

import { Network } from '@cedra-labs/ts-sdk'

export type TransactionHash = `0x${string}`

export interface NetworkInfo {
  name: Network // Name of the network.
  chainId: number // Chain ID of the network.
  url?: string // RPC URL of the network.
}

export enum UserResponseStatus {
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export interface UserApproval<TResponseArgs> {
  status: UserResponseStatus.APPROVED
  args: TResponseArgs
}

export interface UserRejection {
  status: UserResponseStatus.REJECTED
}

export type UserResponse<TResponseArgs> = UserApproval<TResponseArgs> | UserRejection
