/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';

export const protobufPackage = 'blog.blog';

export interface MsgCreatePost {
  creator: string;
  title: string;
  body: string;
}

export interface MsgCreatePostResponse {
  id: number;
}

export interface MsgFollowCreator {
  creator: string;
  followAddress: string;
}

export interface MsgFollowCreatorResponse {
  id: number;
}

function createBaseMsgCreatePost(): MsgCreatePost {
  return { creator: '', title: '', body: '' };
}

export const MsgCreatePost = {
  encode(message: MsgCreatePost, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator);
    }
    if (message.title !== '') {
      writer.uint32(18).string(message.title);
    }
    if (message.body !== '') {
      writer.uint32(26).string(message.body);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePost {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePost();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.body = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePost {
    return {
      creator: isSet(object.creator) ? String(object.creator) : '',
      title: isSet(object.title) ? String(object.title) : '',
      body: isSet(object.body) ? String(object.body) : '',
    };
  },

  toJSON(message: MsgCreatePost): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.title !== undefined && (obj.title = message.title);
    message.body !== undefined && (obj.body = message.body);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePost>, I>>(object: I): MsgCreatePost {
    const message = createBaseMsgCreatePost();
    message.creator = object.creator ?? '';
    message.title = object.title ?? '';
    message.body = object.body ?? '';
    return message;
  },
};

function createBaseMsgCreatePostResponse(): MsgCreatePostResponse {
  return { id: 0 };
}

export const MsgCreatePostResponse = {
  encode(message: MsgCreatePostResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePostResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePostResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePostResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgCreatePostResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePostResponse>, I>>(object: I): MsgCreatePostResponse {
    const message = createBaseMsgCreatePostResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgFollowCreator(): MsgFollowCreator {
  return { creator: '', followAddress: '' };
}

export const MsgFollowCreator = {
  encode(message: MsgFollowCreator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator);
    }
    if (message.followAddress !== '') {
      writer.uint32(18).string(message.followAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFollowCreator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFollowCreator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.followAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgFollowCreator {
    return {
      creator: isSet(object.creator) ? String(object.creator) : '',
      followAddress: isSet(object.followAddress) ? String(object.followAddress) : '',
    };
  },

  toJSON(message: MsgFollowCreator): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.followAddress !== undefined && (obj.followAddress = message.followAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFollowCreator>, I>>(object: I): MsgFollowCreator {
    const message = createBaseMsgFollowCreator();
    message.creator = object.creator ?? '';
    message.followAddress = object.followAddress ?? '';
    return message;
  },
};

function createBaseMsgFollowCreatorResponse(): MsgFollowCreatorResponse {
  return { id: 0 };
}

export const MsgFollowCreatorResponse = {
  encode(message: MsgFollowCreatorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFollowCreatorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFollowCreatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgFollowCreatorResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgFollowCreatorResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFollowCreatorResponse>, I>>(object: I): MsgFollowCreatorResponse {
    const message = createBaseMsgFollowCreatorResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreatePost(request: MsgCreatePost): Promise<MsgCreatePostResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  FollowCreator(request: MsgFollowCreator): Promise<MsgFollowCreatorResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreatePost = this.CreatePost.bind(this);
    this.FollowCreator = this.FollowCreator.bind(this);
  }
  CreatePost(request: MsgCreatePost): Promise<MsgCreatePostResponse> {
    const data = MsgCreatePost.encode(request).finish();
    const promise = this.rpc.request('blog.blog.Msg', 'CreatePost', data);
    return promise.then((data) => MsgCreatePostResponse.decode(new _m0.Reader(data)));
  }

  FollowCreator(request: MsgFollowCreator): Promise<MsgFollowCreatorResponse> {
    const data = MsgFollowCreator.encode(request).finish();
    const promise = this.rpc.request('blog.blog.Msg', 'FollowCreator', data);
    return promise.then((data) => MsgFollowCreatorResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw 'Unable to locate global object';
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
