import { DeliverTxResponse, SigningStargateClient } from '@cosmjs/stargate';
import { StdFee } from '@cosmjs/amino';

import { MsgCreatePost } from './types';

type sendMsgCreatePostParams = {
  value: MsgCreatePost,
  fee?: StdFee,
  memo?: string
};

type CreatePostParams = sendMsgCreatePostParams & {
  signer: string,
  stargateClient: SigningStargateClient
}

type msgCreatePostParams = {
  value: MsgCreatePost,
};

const defaultFee = {
  amount: [],
  gas: '200000',
};

export const sendMsgCreatePost = async ({ stargateClient, signer, value, fee, memo }: CreatePostParams): Promise<DeliverTxResponse | undefined> => {
  if (!signer) {
      throw new Error('TxClient:sendMsgCreatePost: Unable to sign Tx. Signer is not present.')
  }
  try {
    const msg = msgCreatePost({ value })
    return await stargateClient?.signAndBroadcast(signer, [msg], fee ? fee : defaultFee, memo)
  } catch (e: any) {
    throw new Error(`TxClient:sendMsgCreatePost: Could not broadcast Tx: ${e.message}`)
  }
}

const msgCreatePost = ({ value }: msgCreatePostParams): any => {
  try {
    return {
      typeUrl: '/blog.blog.MsgCreatePost',
      value: MsgCreatePost.fromPartial( value )
    }
  } catch (e: any) {
    throw new Error(`TxClient:msgCreatePost: Could not create message: ${e.message}`)
  }
}
