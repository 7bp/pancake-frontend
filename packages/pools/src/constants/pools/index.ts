import { ChainId } from '@pancakeswap/sdk'
import { BigNumber } from '@ethersproject/bignumber'

import { pools as bscPools, livePools as bscLivePools } from './56'
import { pools as bscTestnetPools, livePools as bscTestnetLivePools } from './97'
import { SerializedPool } from '../../types'
import { SupportedChainId } from '../supportedChains'
import { isPoolsSupported } from '../../utils/isPoolsSupported'

export type PoolsConfigByChain<TChainId extends ChainId> = {
  [chainId in TChainId]: SerializedPool[]
}

export const POOLS_CONFIG_BY_CHAIN = {
  [ChainId.BSC]: bscPools,
  [ChainId.BSC_TESTNET]: bscTestnetPools,
} as PoolsConfigByChain<SupportedChainId>

export const LIVE_POOLS_CONFIG_BY_CHAIN = {
  [ChainId.BSC]: bscLivePools,
  [ChainId.BSC_TESTNET]: bscTestnetLivePools,
} as PoolsConfigByChain<SupportedChainId>

export const getPoolsConfig = (chainId: ChainId) => {
  if (!isPoolsSupported(chainId)) {
    return undefined
  }
  return POOLS_CONFIG_BY_CHAIN[chainId]
}

export const getLivePoolsConfig = (chainId: ChainId) => {
  if (!isPoolsSupported(chainId)) {
    return undefined
  }
  return LIVE_POOLS_CONFIG_BY_CHAIN[chainId]
}

export const MAX_LOCK_DURATION = 31536000
export const UNLOCK_FREE_DURATION = 604800
export const ONE_WEEK_DEFAULT = 604800
export const BOOST_WEIGHT = BigNumber.from('20000000000000')
export const DURATION_FACTOR = BigNumber.from('31536000')
