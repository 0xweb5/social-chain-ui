import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { defaultTheme, WalletProvider } from '@cosmos-kit/react';
import { ChakraProvider } from '@chakra-ui/react';
import { SignerOptions } from '@cosmos-kit/core';
import { wallets as keplrWallets } from '@cosmos-kit/keplr';
import { wallets as cosmostationWallets } from '@cosmos-kit/cosmostation';
import { wallets as leapWallets } from '@cosmos-kit/leap';
import { GasPrice } from '@cosmjs/stargate';
import { Chain } from '@chain-registry/types';

import { aminoTypes, assetLists, chainList, registry } from '../config/defaults';

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  
  const signerOptions: SignerOptions = {
    signingStargate: (_chain: Chain) => {
      return {
        aminoTypes,
        registry,
      };
    },
    signingCosmwasm: (chain: Chain) => {
      switch (chain.chain_name) {
        case 'osmosis':
        case 'osmosistestnet':
          return {
            gasPrice: GasPrice.fromString('0.0025uosmo'),
          };
        case 'localosmosis':
          return {
            gasPrice: GasPrice.fromString('0.0025token'),
          };
      }
    },
  };

  return (
    <ChakraProvider theme={defaultTheme}>
      <WalletProvider
        chains={chainList}
        assetLists={assetLists}
        wallets={[...keplrWallets, ...cosmostationWallets, ...leapWallets ]}
        signerOptions={signerOptions}
      >
        <Component {...pageProps} />
      </WalletProvider>
    </ChakraProvider>
  );
}

export default CreateCosmosApp;
