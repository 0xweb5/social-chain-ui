import { useState } from 'react';
import Head from 'next/head';
import BigNumber from 'bignumber.js';
import {
  Box,
  Divider,
  Grid,
  Heading,
  Text,
  Stack,
  Container,
  Link,
  Button,
  Flex,
  Icon,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { StdFee } from '@cosmjs/amino';
import { SigningStargateClient } from '@cosmjs/stargate';
import { WalletStatus } from '@cosmos-kit/core';
import { useWallet } from '@cosmos-kit/react';
import { cosmos } from 'osmojs';

import {
  chainassets,
  chainName,
  coin,
  dependencies,
  products,
} from '../config';
import {
  Product,
  Dependency,
  WalletSection,
  handleChangeColorModeValue,
} from '../components';
import { SendTokensCard } from '../components/react/send-tokens-card';

const library = {
  title: 'OsmoJS',
  text: 'OsmoJS',
  href: 'https://github.com/osmosis-labs/osmojs'
};

const sendTokens = (
  getSigningStargateClient: () => Promise<SigningStargateClient>,
  setResp: (resp: string) => any,
  address: string
) => {
  return async () => {
    const stargateClient = await getSigningStargateClient();
    if (!stargateClient || !address) {
      console.error("stargateClient undefined or address undefined.");
      return;
    }

    const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;

    const msg = send({
      amount: [
        {
          denom: coin.base,
          amount: "1000",
        },
      ],
      toAddress: address,
      fromAddress: address,
    });

    const fee: StdFee = {
      amount: [
        {
          denom: coin.base,
          amount: "2000",
        },
      ],
      gas: "86364",
    };
    const response = await stargateClient.signAndBroadcast(address, [msg], fee);
    setResp(JSON.stringify(response, null, 2));
  };
};

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { getSigningStargateClient, address, walletStatus, getRpcEndpoint } =
    useWallet();

  const [balance, setBalance] = useState(new BigNumber(0));
  const [isFetchingBalance, setFetchingBalance] = useState(false);
  const [resp, setResp] = useState("");
  const getBalance = async () => {
    if (!address) {
      setBalance(new BigNumber(0));
      setFetchingBalance(false);
      return;
    }

    let rpcEndpoint = await getRpcEndpoint();

    if (!rpcEndpoint) {
      console.log("no rpc endpoint — using a fallback");
      rpcEndpoint = `https://rpc.cosmos.directory/${chainName}`;
    }

    // get RPC client
    const client = await cosmos.ClientFactory.createRPCQueryClient({
      rpcEndpoint,
    });

    // fetch balance
    const balance = await client.cosmos.bank.v1beta1.balance({
      address,
      denom: chainassets?.assets[0].base as string,
    });

    // Get the display exponent
    // we can get the exponent from chain registry asset denom_units
    const exp = coin.denom_units.find((unit) => unit.denom === coin.display)
      ?.exponent as number;

    // show balance in display values by exponentiating it
    const a = new BigNumber(balance?.balance?.amount ?? '');
    const amount = a.multipliedBy(10 ** -exp);
    setBalance(amount);
    setFetchingBalance(false);
  };

  return (
    <Container maxW="5xl" py={10}>
      <Head>
        <title>Social App Chain Interface</title>
        <meta name="description" content="Social app chain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justifyContent="end" mb={4}>
        <Button variant="outline" px={0} onClick={toggleColorMode}>
          <Icon as={colorMode === 'light' ? BsFillMoonStarsFill : BsFillSunFill} />
        </Button>
      </Flex>
      <Box textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="extrabold"
          mb={3}
        >
          Create Cosmos App
        </Heading>
        <Heading
          as="h1"
          fontWeight="bold"
          fontSize={{ base: "2xl", md: "4xl" }}
        >
          <Text as="span">Welcome to&nbsp;</Text>
          <Text
            as="span"
            color={handleChangeColorModeValue(
              colorMode,
              "primary.500",
              "primary.200"
            )}
          >
            CosmosKit&nbsp;+&nbsp;Next.js&nbsp;+&nbsp;
            <Link href={library.href} target="_blank" rel="noreferrer">
              {library.title}
            </Link>
          </Text>
        </Heading>
      </Box>

      <WalletSection />

      <Center mb={16}>
        <SendTokensCard
          isConnectWallet={walletStatus === WalletStatus.Connected}
          balance={balance.toNumber()}
          isFetchingBalance={isFetchingBalance}
          response={resp}
          sendTokensButtonText="Send Tokens"
          handleClickSendTokens={sendTokens(
            getSigningStargateClient as () => Promise<SigningStargateClient>,
            setResp as () => any,
            address as string
          )}
          handleClickGetBalance={() => {
            setFetchingBalance(true);
            getBalance();
          }}
        />
      </Center>

      <Box mb={16}>
        <Divider />
      </Box>

      <Stack
        isInline={true}
        spacing={1}
        justifyContent="center"
        opacity={0.5}
        fontSize="sm"
      >
        <Text>Built with</Text>
        <Link
          href="https://cosmology.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cosmology
        </Link>
      </Stack>
    </Container>
  );
}
