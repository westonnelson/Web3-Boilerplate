import type { AddEthereumChainParameter } from "@web3-react/types";

const infuraKey = process.env.REACT_APP_INFURA_KEY;
const alchemyKey = process.env.REACT_APP_INFURA_KEY;
const pocketNetwork = process.env.REACT_APP_POCKET_KEY;

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18
};

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18
};

const BSC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "BNB Chain",
  symbol: "BNB",
  decimals: 18
};

interface BasicChainInformation {
  chainId: string;
  urls: string[];
  publicUrls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation)?.nativeCurrency;
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.publicUrls,
      blockExplorerUrls: chainInformation.blockExplorerUrls
    };
  } else {
    return chainId;
  }
}

export const getNativeByChain = (chainId: number): string | undefined => {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) return chainInformation.nativeCurrency.symbol;
  return undefined;
};

export const getExplorer = (chainId: number): string[] | undefined => {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) return chainInformation.blockExplorerUrls;
  return undefined;
};

export const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
} = {
  1: {
    chainId: "1",
    urls: [
      infuraKey ? `https://mainnet.infura.io/v3/${infuraKey}` : "",
      alchemyKey ? `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}` : "",
      pocketNetwork ? `https://eth-mainnet.gateway.pokt.network/v1/lb/${pocketNetwork}` : "",
      "https://rpc.ankr.com/eth",
      "https://cloudflare-eth.com"
    ].filter(Boolean),
    publicUrls: ["https://rpc.ankr.com/eth"].filter(Boolean),
    name: "Mainnet",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://etherscan.io"]
  },
  5: {
    chainId: "5",
    urls: [
      infuraKey ? `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}` : "",
      alchemyKey ? `https://eth-goerli.g.alchemy.com/v2/${alchemyKey}` : "",
      pocketNetwork ? `https://eth-goerli.gateway.pokt.network/v1/lb/${pocketNetwork}` : "",
      "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    ].filter(Boolean),
    publicUrls: ["https://rpc.ankr.com/eth_goerli"].filter(Boolean),
    name: "Goerli",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://goerli.etherscan.io/"]
  },
  // Optimism
  10: {
    chainId: "10",
    urls: [
      infuraKey ? `https://optimism-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}` : "",
      alchemyKey ? `https://opt-mainnet.g.alchemy.com/v2/${alchemyKey}` : "",
      "https://mainnet.optimism.io"
    ].filter(Boolean),
    publicUrls: ["https://mainnet.optimism.io"].filter(Boolean),
    name: "OP Mainnet",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://optimistic.etherscan.io"]
  },
  // Arbitrum
  42161: {
    chainId: "42161",
    urls: [
      infuraKey ? `https://arbitrum-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}` : "",
      alchemyKey ? `https://arb-mainnet.g.alchemy.com/v2/${alchemyKey}` : "",
      "https://arb1.arbitrum.io/rpc"
    ].filter(Boolean),
    publicUrls: ["https://arb1.arbitrum.io/rpc"].filter(Boolean),
    name: "Arbitrum One",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://arbiscan.io"]
  },

  // Polygon
  137: {
    chainId: "137",
    urls: [
      infuraKey ? `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}` : "",
      alchemyKey ? `https://polygon-mainnet.g.alchemy.com/v2/${alchemyKey}` : "",
      pocketNetwork ? `https://poly-mainnet.gateway.pokt.network/v1/lb/${pocketNetwork}` : "",
      "https://polygon-rpc.com"
    ].filter(Boolean),
    publicUrls: ["https://polygon-rpc.com"].filter(Boolean),
    name: "Polygon",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://polygonscan.com"]
  },
  // BSC
  56: {
    chainId: "56",
    urls: [
      pocketNetwork ? `https://bsc-mainnet.gateway.pokt.network/v1/lb/${pocketNetwork}` : "",
      "https://bsc-dataseed.binance.org/",
      "https://rpc.ankr.com/bsc"
    ].filter(Boolean),
    publicUrls: ["https://rpc.ankr.com/bsc"].filter(Boolean),
    name: "BNB Smart Chain",
    nativeCurrency: BSC,
    blockExplorerUrls: ["https://bscscan.com/"]
  },
}

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>(
  (accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls;

    if (validURLs.length) {
      accumulator[Number(chainId)] = validURLs;
    }

    return accumulator;
  },
  {}
);

export const CHAINIDs: { [chainId: number]: string } = Object.keys(CHAINS).reduce<{ [chainId: number]: string }>(
  (accumulator, chainId) => {
    const validCHAINIDs: string = CHAINS[Number(chainId)].chainId;

    if (validCHAINIDs) {
      accumulator[Number(chainId)] = validCHAINIDs;
    }

    return accumulator;
  },
  {}
);
