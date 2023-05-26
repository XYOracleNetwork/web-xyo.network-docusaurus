import { XyoEmbedPluginCard } from '@xyo-network/react-embed'
import { EthereumGasPricePlugin } from '@xyo-network/react-plugins'
import React from 'react'

import { useFetchPointerHash } from './hooks'
export const GasPriceAggregatorDemo: React.FC = () => {
  const GasAggregatePricePointer = useFetchPointerHash('EthereumGasPrice')

  return <XyoEmbedPluginCard huriPayload={GasAggregatePricePointer} plugins={[EthereumGasPricePlugin]}></XyoEmbedPluginCard>
}
