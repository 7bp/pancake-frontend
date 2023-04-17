import React from 'react'
import { Flex, Text, Pool } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from '@pancakeswap/localization'
import { getFullDisplayBalance } from '@pancakeswap/utils/formatBalance'
import { Token } from '@pancakeswap/sdk'

interface MaxStakeRowProps {
  small?: boolean
  stakingLimit: BigNumber
  currentBlock: number
  stakingLimitEndTimestamp: number
  stakingToken: Token
  hasPoolStarted: boolean
  endTimestamp: number
}

const MaxStakeRow: React.FC<React.PropsWithChildren<MaxStakeRowProps>> = ({
  small = false,
  stakingLimit,
  stakingLimitEndTimestamp,
  stakingToken,
  hasPoolStarted,
  endTimestamp,
}) => {
  const { t } = useTranslation()

  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between" alignItems="center">
        <Text small={small}>{t('Max. stake per user')}:</Text>
        <Text small={small}>{`${getFullDisplayBalance(stakingLimit, stakingToken.decimals, 0)} ${
          stakingToken.symbol
        }`}</Text>
      </Flex>
      {hasPoolStarted && endTimestamp !== stakingLimitEndTimestamp && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text small={small}>{t('Max. stake limit ends in')}:</Text>

          <Pool.TimeCountdownDisplay timestamp={endTimestamp} />
        </Flex>
      )}
    </Flex>
  )
}

export default MaxStakeRow
