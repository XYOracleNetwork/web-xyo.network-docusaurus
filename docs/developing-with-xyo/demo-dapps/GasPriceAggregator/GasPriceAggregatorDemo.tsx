import { EmbedPluginCard, EmbedPluginProvider } from '@xyo-network/react-embed'
import { EthereumGasPricePlugin } from '@xyo-network/react-plugins'
import React from 'react'

import { useFetchPointerHash } from './hooks'
export const GasPriceAggregatorDemo: React.FC = () => {
  const GasAggregatePricePointer = useFetchPointerHash('EthereumGasPrice')

  return <EmbedPluginProvider huri={GasAggregatePricePointer} plugins={[EthereumGasPricePlugin]}>
    <EmbedPluginCard  >
    </EmbedPluginCard>
    </EmbedPluginProvider>
}
