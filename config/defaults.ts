import { assets, chains } from 'chain-registry';
import { AssetList, Asset, Chain } from '@chain-registry/types';
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { AminoTypes } from "@cosmjs/stargate";
import { 
  cosmosAminoConverters,
  cosmosProtoRegistry,
  cosmwasmAminoConverters,
  cosmwasmProtoRegistry,
  ibcProtoRegistry,
  ibcAminoConverters,
  osmosisAminoConverters,
  osmosisProtoRegistry
} from 'osmojs';

export const chainName = 'blog';
// export const chainName = 'osmosistestnet';

const localosmosis: Chain = {
  chain_name: 'blog',
  chain_id: 'blog',
  bech32_prefix: 'blog',
  status: 'live',
  network_type: 'testnet',
  pretty_name: 'Blog',
  slip44: 118,
  apis: {
    rpc: [
      {
        address: 'http://47.242.123.146:26657',
      }
    ],
    rest: [
      {
        address: 'http://47.242.123.146:1317'
      }
    ]
  }
};

const localosmosisAssets: AssetList = {
  chain_name: 'blog',
  assets: [
    {
      name: 'Blog',
      base: 'token',
      display: 'token',
      symbol: 'TOKEN',
      denom_units: [
        {
          denom: 'token',
          exponent: 6
        }
      ],
    }
  ],
};

export const chainList = [...chains, localosmosis];
export const assetLists = [...assets, localosmosisAssets];
  
export const chainassets: AssetList = assetLists.find(
  (chain) => chain.chain_name === chainName
) as AssetList;

export const coin: Asset = chainassets.assets.find(
  (asset) => asset.base === 'token'
) as Asset;

const protoRegistry: ReadonlyArray<[string, GeneratedType]> = [
  ...cosmosProtoRegistry,
  ...cosmwasmProtoRegistry,
  ...ibcProtoRegistry,
  ...osmosisProtoRegistry
];

const aminoConverters = {
  ...cosmosAminoConverters,
  ...cosmwasmAminoConverters,
  ...ibcAminoConverters,
  ...osmosisAminoConverters
};

export const registry = new Registry(protoRegistry);
export const aminoTypes = new AminoTypes(aminoConverters);
