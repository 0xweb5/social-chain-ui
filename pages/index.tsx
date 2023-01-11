import { useEffect, useState } from 'react';
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
  GridItem,
  Input,
  Textarea,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  CloseButton,
  Avatar, 
  AvatarBadge, 
  AvatarGroup,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { StdFee } from '@cosmjs/amino';
import { SigningStargateClient } from '@cosmjs/stargate';
import { WalletStatus } from '@cosmos-kit/core';
import { useWallet } from '@cosmos-kit/react';
import { cosmos } from 'osmojs';
import { sendMsgCreatePost } from '../proto/post/tx';
import { queryClient } from '../proto/post/query';
import { identicon } from 'minidenticons'

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
  stringTruncateFromCenter,
} from '../components';
import { SendTokensCard } from '../components/react/send-tokens-card';
import { Tx } from 'osmojs/types/codegen/cosmos/tx/v1beta1/tx';
import { BlogPost } from '../proto/post/rest';

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
  const [blogs, setBlogs] = useState<BlogPost[] | undefined>([])
  const [isFetchingBalance, setFetchingBalance] = useState(false);
  const [resp, setResp] = useState("");
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [isPostLoading, setisPostLoading] = useState(false)
  const [success, setsuccess] = useState(false)
  const handleTitleChange = (e: { target: { value: any; }; }) => {
    let inputValue = e.target.value
    setTitle(inputValue)
    setisPostLoading(false)
  }

  const handleContentChange = (e: { target: { value: any; }; }) => {
    let inputValue = e.target.value
    setContent(inputValue)
  }

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

  useEffect(() => {
    const queryPosts = async () => {
      const qc = queryClient({ addr: 'http://47.242.123.146:1317' });
      const posts = await qc.queryPosts();
      console.log('posts:', posts.data.Post);
      setBlogs(posts.data.Post)
    }
    queryPosts();
  }, [])

  const onMsgCreatePostSend = async () => {
    setisPostLoading(true)
    const stargateClient = await getSigningStargateClient();
    if (!address || !stargateClient || !title || !content) {setisPostLoading(false);return } 

    const value = { creator: address, title: title, body: content };
    try {
      const msgCreateTx = await sendMsgCreatePost({ stargateClient, value, signer: address });
      console.log('msgCreateTx:', msgCreateTx);
      setisPostLoading(false)
      setsuccess(true)
    } catch (error) {
      console.log(error)
      setisPostLoading(false)
    }
  }

  return (
    <Box
      py={{ base: '0.5rem', md: '5rem' }}
      bg={'green'}
      mx={'auto'}
      px={5}
      minH={'100vh'}
    >
      <Flex flexDirection='row' alignItems="flex-center" justifyContent= 'space-around' flex={1} w={'full'} marginBottom={10}>
        <Link
          w="10%"
          maxW="sm"
          alignItems="center"
          justifyContent="center"
          pt='2'
          fontSize={'xl'}
          fontWeight={'500'}
          color={'#fff'}
          onClick={()=>{setStep(1)}}
        >Home</Link>
        <Link
          w="10%"
          maxW="sm"
          alignItems="center"
          justifyContent="center"
          pt='2'
          fontSize={'xl'}
          fontWeight={'500'}
          color={'#fff'}
          onClick={()=>{setStep(2)}}
        >Create</Link>
        <Link
          w="10%"
          maxW="sm"
          alignItems="center"
          justifyContent="center"
          pt='2'
          fontSize={'xl'}
          fontWeight={'500'}
          color={'#fff'}
        >People</Link>
        <Link
          w="10%"
          maxW="sm"
          alignItems="center"
          justifyContent="center"
          pt='2'
          fontSize={'xl'}
          fontWeight={'500'}
          color={'#fff'}
        >Profile</Link>
        <WalletSection />
        {/* <SendTokensCard
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
        /> */}
      </Flex>

      <Flex flexDirection='row' alignItems="flex-center" justifyContent= 'space-around' w={'full'}>
        { 
          step===1 && (
            <Grid templateColumns='repeat(5, 1fr)' gap={6} w={'full'}>
              {blogs?.map((item)=>(
                <GridItem w='100%' h='sm' bg='blue.500' borderRadius={'20'} p={2}>
                  <Text paddingBottom={2}>{item.title}</Text>
                  <Flex alignItems="flex-center">
                    <Box
                    w={8}
                    borderRadius={'50%'}
                    bg={'#fff'}
                    dangerouslySetInnerHTML={{
                      __html: identicon(
                        'sdad',
                        90,
                        50
                      )
                    }}
                  />
                  <Text marginLeft={1} pt={1}>{stringTruncateFromCenter(item?.creator ?? '', 15)}</Text>
                  </Flex>
                  <Text paddingTop={2}>
                    {item.body}
                  </Text>
                </GridItem>
              ))}
            </Grid>
          )
        }
        { 
          step===2 && (
            <Flex alignItems={'center'} justifyContent={'center'} flexDir={'column'} w={'full'}>
              { 
                success===true && ( 
                  <Alert status='success'>
                    <AlertIcon />
                    <AlertTitle>Transaction sent</AlertTitle>
                    <AlertDescription>Please wait for the chain to post your blog</AlertDescription>
                    <CloseButton
                      alignSelf='flex-start'
                      position='relative'
                      right={-1}
                      top={-1}
                      onClick={()=>{setsuccess(false)}}
                    />
                  </Alert>
                )
              }
              <Text 
                fontSize={'2xl'}
                fontWeight={'500'}
                pb={2}
                color={'#fff'}>
                Create a post
              </Text>
              <Input placeholder='Enter the title'  _placeholder={{ color: 'inherit' }} marginBottom={3} w={'50%'} onChange={handleTitleChange}/>
              <Textarea placeholder='Enter the content'  _placeholder={{ color: 'inherit' }} marginBottom={3} w={'50%'} h={'xl'} onChange={handleContentChange}></Textarea>
              <Button size={'md'} paddingX={10} onClick={()=>{onMsgCreatePostSend()}} isLoading={isPostLoading}>Submit</Button>
            </Flex>
          )
        }

      </Flex>
    </Box>
  );
}
