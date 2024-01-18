// dApp plugins used on the site
type dAppPlugins = 'AggregatePrice' | 'UniswapPairs' | 'EthereumGasPrice'

interface HashEnvironment {
  [env: string]: string
}

export type PointerHashMap = {
  [key in dAppPlugins]: HashEnvironment
}

export const PointerHashMap: PointerHashMap = {
  AggregatePrice: {
    beta: '1278bbb1810d914dfe4894ea133c06c7d95a5c9fcd6145fd705c441d24fd637d',
    main: '02a7da44f1070140043a4f24f8cc2b643602c0c731f1936a36fd6291445cb720',
  },
  EthereumGasPrice: {
    beta: 'da643b7db7abe5fa3f6631db4b3411177cfab0ae296a79bc7cc9602ec3a83668',
    main: '6664cfd21cc292c4faeac99f355092dc343b91659c04d63e8ecca9896ad9d2ef',
  },
  UniswapPairs: {
    beta: 'bfa7471a93f436eb564ad1ba4fe31676f9cabe45fa58eb1b76e4d09dfcaaa814',
    main: 'bea605509a656299c32e941333aacecf261aee6aa22b1dcae8d02bbef5c94752',
  },
}
