import { ethereumTokens } from '@pancakeswap/tokens'

import { PoolCategory, SerializedPool } from '../../types'

export const livePools: SerializedPool[] = [
  {
    sousId: 1,
    stakingToken: ethereumTokens.cake,
    earningToken: ethereumTokens.usdt,
    contractAddress: '0x6c707BB6EB65D4be770c2A33D39732F11cDBaDA9',
    poolCategory: PoolCategory.CORE,
    tokenPerSecond: '0.000231',
  },
].map((p) => ({
  ...p,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

// known finished pools
export const finishedPools: SerializedPool[] = []

export const pools: SerializedPool[] = [...livePools, ...finishedPools]
