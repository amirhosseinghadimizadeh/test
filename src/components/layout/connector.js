import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from "@web3-react/network-connector"
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
const networkConnector = new NetworkConnector({
  urls: {
    1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    56: "https://bsc-dataseed1.ninicoin.io",
    97: "https://data-seed-prebsc-1-s1.binance.org:8545"
  },
  defaultChainId: 97
});
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
})
export const walletconnect = new WalletConnectConnector({
  rpc: { 56: "https://bsc-dataseed1.ninicoin.io",97: "https://data-seed-prebsc-1-s1.binance.org:8545/" },
  qrcode: true
})
