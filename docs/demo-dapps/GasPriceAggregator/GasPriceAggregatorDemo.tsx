import { EmbedPluginCard } from '@xyo-network/react-embed'
import { EthereumGasPricePlugin } from '@xyo-network/react-plugins'
import React from 'react'

import { useFetchPointerHash } from './hooks'
export const GasPriceAggregatorDemo: React.FC = () => {
  const GasAggregatePricePointer = useFetchPointerHash('EthereumGasPrice')

  return <EmbedPluginCard huriPayload={GasAggregatePricePointer} plugins={[EthereumGasPricePlugin]}></EmbedPluginCard>
}
