/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface LiquidityAggregatorInterface extends ethers.utils.Interface {
  functions: {
    "buy((address,uint256,bytes4,bytes),tuple[])": FunctionFragment;
    "chainId()": FunctionFragment;
    "deployedChainWeth()": FunctionFragment;
    "gasPaymaster()": FunctionFragment;
    "getUserTokens(uint32,address,uint256,address,uint256,uint256)": FunctionFragment;
    "handleWithTokens(uint32,bytes32,bytes,address,uint256)": FunctionFragment;
    "icaRouter()": FunctionFragment;
    "liquidityAggregators(uint32)": FunctionFragment;
    "llRouter()": FunctionFragment;
    "nextRequestId()": FunctionFragment;
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "receivedAmounts(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "requestToFunds(uint256,uint256)": FunctionFragment;
    "requests(uint256)": FunctionFragment;
    "setLiquidityAggregator(uint32,address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "buy",
    values: [
      {
        nftContract: string;
        nftId: BigNumberish;
        buyFuncSelector: BytesLike;
        buyFuncDataEncoded: BytesLike;
      },
      {
        chainId: BigNumberish;
        localWeth: string;
        localWethAmount: BigNumberish;
      }[]
    ]
  ): string;
  encodeFunctionData(functionFragment: "chainId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deployedChainWeth",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "gasPaymaster",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getUserTokens",
    values: [
      BigNumberish,
      string,
      BigNumberish,
      string,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "handleWithTokens",
    values: [BigNumberish, BytesLike, BytesLike, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "icaRouter", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "liquidityAggregators",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "llRouter", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nextRequestId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155BatchReceived",
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155Received",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "receivedAmounts",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "requestToFunds",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "requests",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setLiquidityAggregator",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "chainId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deployedChainWeth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gasPaymaster",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "handleWithTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "icaRouter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "liquidityAggregators",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "llRouter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nextRequestId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155BatchReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "receivedAmounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestToFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "requests", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setLiquidityAggregator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "BuyMessageDispatched(uint256,uint32,bytes32)": EventFragment;
    "DispatchWithTokensMessageDispatched(uint256,uint32,bytes32)": EventFragment;
    "FundFulfilled(uint256,uint32,bytes32,address,uint256,uint256,uint256,bool)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BuyMessageDispatched"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "DispatchWithTokensMessageDispatched"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FundFulfilled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type BuyMessageDispatchedEvent = TypedEvent<
  [BigNumber, number, string] & {
    requestId: BigNumber;
    destinationChainId: number;
    messageId: string;
  }
>;

export type DispatchWithTokensMessageDispatchedEvent = TypedEvent<
  [BigNumber, number, string] & {
    requestId: BigNumber;
    localChainId: number;
    messageId: string;
  }
>;

export type FundFulfilledEvent = TypedEvent<
  [
    BigNumber,
    number,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    boolean
  ] & {
    requestId: BigNumber;
    remoteChainId: number;
    sender: string;
    token: string;
    amount: BigNumber;
    fundIndex: BigNumber;
    receivedAmount: BigNumber;
    allFulfilled: boolean;
  }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export class LiquidityAggregator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: LiquidityAggregatorInterface;

  functions: {
    buy(
      nftInfo: {
        nftContract: string;
        nftId: BigNumberish;
        buyFuncSelector: BytesLike;
        buyFuncDataEncoded: BytesLike;
      },
      funds: {
        chainId: BigNumberish;
        localWeth: string;
        localWethAmount: BigNumberish;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    chainId(overrides?: CallOverrides): Promise<[number]>;

    deployedChainWeth(overrides?: CallOverrides): Promise<[string]>;

    gasPaymaster(overrides?: CallOverrides): Promise<[string]>;

    getUserTokens(
      _remoteChainId: BigNumberish,
      _localWeth: string,
      _localWethAmount: BigNumberish,
      _userAddress: string,
      _requestId: BigNumberish,
      _fundIndex: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    handleWithTokens(
      _origin: BigNumberish,
      _sender: BytesLike,
      _message: BytesLike,
      _localWeth: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    icaRouter(overrides?: CallOverrides): Promise<[string]>;

    liquidityAggregators(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    llRouter(overrides?: CallOverrides): Promise<[string]>;

    nextRequestId(overrides?: CallOverrides): Promise<[BigNumber]>;

    onERC1155BatchReceived(
      operator: string,
      from: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onERC1155Received(
      operator: string,
      from: string,
      id: BigNumberish,
      value: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    receivedAmounts(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    requestToFunds(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [number, string, BigNumber] & {
          chainId: number;
          localWeth: string;
          localWethAmount: BigNumber;
        },
        BigNumber,
        boolean
      ] & {
        fund: [number, string, BigNumber] & {
          chainId: number;
          localWeth: string;
          localWethAmount: BigNumber;
        };
        index: BigNumber;
        fulfilled: boolean;
      }
    >;

    requests(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        [string, BigNumber, string, string] & {
          nftContract: string;
          nftId: BigNumber;
          buyFuncSelector: string;
          buyFuncDataEncoded: string;
        }
      ] & {
        sender: string;
        nftInfo: [string, BigNumber, string, string] & {
          nftContract: string;
          nftId: BigNumber;
          buyFuncSelector: string;
          buyFuncDataEncoded: string;
        };
      }
    >;

    setLiquidityAggregator(
      _chainId: BigNumberish,
      _liquidityAggregator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  buy(
    nftInfo: {
      nftContract: string;
      nftId: BigNumberish;
      buyFuncSelector: BytesLike;
      buyFuncDataEncoded: BytesLike;
    },
    funds: {
      chainId: BigNumberish;
      localWeth: string;
      localWethAmount: BigNumberish;
    }[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  chainId(overrides?: CallOverrides): Promise<number>;

  deployedChainWeth(overrides?: CallOverrides): Promise<string>;

  gasPaymaster(overrides?: CallOverrides): Promise<string>;

  getUserTokens(
    _remoteChainId: BigNumberish,
    _localWeth: string,
    _localWethAmount: BigNumberish,
    _userAddress: string,
    _requestId: BigNumberish,
    _fundIndex: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  handleWithTokens(
    _origin: BigNumberish,
    _sender: BytesLike,
    _message: BytesLike,
    _localWeth: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  icaRouter(overrides?: CallOverrides): Promise<string>;

  liquidityAggregators(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  llRouter(overrides?: CallOverrides): Promise<string>;

  nextRequestId(overrides?: CallOverrides): Promise<BigNumber>;

  onERC1155BatchReceived(
    operator: string,
    from: string,
    ids: BigNumberish[],
    values: BigNumberish[],
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onERC1155Received(
    operator: string,
    from: string,
    id: BigNumberish,
    value: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onERC721Received(
    operator: string,
    from: string,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  receivedAmounts(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  requestToFunds(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      [number, string, BigNumber] & {
        chainId: number;
        localWeth: string;
        localWethAmount: BigNumber;
      },
      BigNumber,
      boolean
    ] & {
      fund: [number, string, BigNumber] & {
        chainId: number;
        localWeth: string;
        localWethAmount: BigNumber;
      };
      index: BigNumber;
      fulfilled: boolean;
    }
  >;

  requests(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      [string, BigNumber, string, string] & {
        nftContract: string;
        nftId: BigNumber;
        buyFuncSelector: string;
        buyFuncDataEncoded: string;
      }
    ] & {
      sender: string;
      nftInfo: [string, BigNumber, string, string] & {
        nftContract: string;
        nftId: BigNumber;
        buyFuncSelector: string;
        buyFuncDataEncoded: string;
      };
    }
  >;

  setLiquidityAggregator(
    _chainId: BigNumberish,
    _liquidityAggregator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    buy(
      nftInfo: {
        nftContract: string;
        nftId: BigNumberish;
        buyFuncSelector: BytesLike;
        buyFuncDataEncoded: BytesLike;
      },
      funds: {
        chainId: BigNumberish;
        localWeth: string;
        localWethAmount: BigNumberish;
      }[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    chainId(overrides?: CallOverrides): Promise<number>;

    deployedChainWeth(overrides?: CallOverrides): Promise<string>;

    gasPaymaster(overrides?: CallOverrides): Promise<string>;

    getUserTokens(
      _remoteChainId: BigNumberish,
      _localWeth: string,
      _localWethAmount: BigNumberish,
      _userAddress: string,
      _requestId: BigNumberish,
      _fundIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    handleWithTokens(
      _origin: BigNumberish,
      _sender: BytesLike,
      _message: BytesLike,
      _localWeth: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    icaRouter(overrides?: CallOverrides): Promise<string>;

    liquidityAggregators(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    llRouter(overrides?: CallOverrides): Promise<string>;

    nextRequestId(overrides?: CallOverrides): Promise<BigNumber>;

    onERC1155BatchReceived(
      operator: string,
      from: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC1155Received(
      operator: string,
      from: string,
      id: BigNumberish,
      value: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    receivedAmounts(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    requestToFunds(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [number, string, BigNumber] & {
          chainId: number;
          localWeth: string;
          localWethAmount: BigNumber;
        },
        BigNumber,
        boolean
      ] & {
        fund: [number, string, BigNumber] & {
          chainId: number;
          localWeth: string;
          localWethAmount: BigNumber;
        };
        index: BigNumber;
        fulfilled: boolean;
      }
    >;

    requests(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        [string, BigNumber, string, string] & {
          nftContract: string;
          nftId: BigNumber;
          buyFuncSelector: string;
          buyFuncDataEncoded: string;
        }
      ] & {
        sender: string;
        nftInfo: [string, BigNumber, string, string] & {
          nftContract: string;
          nftId: BigNumber;
          buyFuncSelector: string;
          buyFuncDataEncoded: string;
        };
      }
    >;

    setLiquidityAggregator(
      _chainId: BigNumberish,
      _liquidityAggregator: string,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "BuyMessageDispatched(uint256,uint32,bytes32)"(
      requestId?: BigNumberish | null,
      destinationChainId?: BigNumberish | null,
      messageId?: null
    ): TypedEventFilter<
      [BigNumber, number, string],
      { requestId: BigNumber; destinationChainId: number; messageId: string }
    >;

    BuyMessageDispatched(
      requestId?: BigNumberish | null,
      destinationChainId?: BigNumberish | null,
      messageId?: null
    ): TypedEventFilter<
      [BigNumber, number, string],
      { requestId: BigNumber; destinationChainId: number; messageId: string }
    >;

    "DispatchWithTokensMessageDispatched(uint256,uint32,bytes32)"(
      requestId?: BigNumberish | null,
      localChainId?: BigNumberish | null,
      messageId?: null
    ): TypedEventFilter<
      [BigNumber, number, string],
      { requestId: BigNumber; localChainId: number; messageId: string }
    >;

    DispatchWithTokensMessageDispatched(
      requestId?: BigNumberish | null,
      localChainId?: BigNumberish | null,
      messageId?: null
    ): TypedEventFilter<
      [BigNumber, number, string],
      { requestId: BigNumber; localChainId: number; messageId: string }
    >;

    "FundFulfilled(uint256,uint32,bytes32,address,uint256,uint256,uint256,bool)"(
      requestId?: BigNumberish | null,
      remoteChainId?: BigNumberish | null,
      sender?: null,
      token?: null,
      amount?: null,
      fundIndex?: null,
      receivedAmount?: null,
      allFulfilled?: null
    ): TypedEventFilter<
      [
        BigNumber,
        number,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ],
      {
        requestId: BigNumber;
        remoteChainId: number;
        sender: string;
        token: string;
        amount: BigNumber;
        fundIndex: BigNumber;
        receivedAmount: BigNumber;
        allFulfilled: boolean;
      }
    >;

    FundFulfilled(
      requestId?: BigNumberish | null,
      remoteChainId?: BigNumberish | null,
      sender?: null,
      token?: null,
      amount?: null,
      fundIndex?: null,
      receivedAmount?: null,
      allFulfilled?: null
    ): TypedEventFilter<
      [
        BigNumber,
        number,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ],
      {
        requestId: BigNumber;
        remoteChainId: number;
        sender: string;
        token: string;
        amount: BigNumber;
        fundIndex: BigNumber;
        receivedAmount: BigNumber;
        allFulfilled: boolean;
      }
    >;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    buy(
      nftInfo: {
        nftContract: string;
        nftId: BigNumberish;
        buyFuncSelector: BytesLike;
        buyFuncDataEncoded: BytesLike;
      },
      funds: {
        chainId: BigNumberish;
        localWeth: string;
        localWethAmount: BigNumberish;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    chainId(overrides?: CallOverrides): Promise<BigNumber>;

    deployedChainWeth(overrides?: CallOverrides): Promise<BigNumber>;

    gasPaymaster(overrides?: CallOverrides): Promise<BigNumber>;

    getUserTokens(
      _remoteChainId: BigNumberish,
      _localWeth: string,
      _localWethAmount: BigNumberish,
      _userAddress: string,
      _requestId: BigNumberish,
      _fundIndex: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    handleWithTokens(
      _origin: BigNumberish,
      _sender: BytesLike,
      _message: BytesLike,
      _localWeth: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    icaRouter(overrides?: CallOverrides): Promise<BigNumber>;

    liquidityAggregators(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    llRouter(overrides?: CallOverrides): Promise<BigNumber>;

    nextRequestId(overrides?: CallOverrides): Promise<BigNumber>;

    onERC1155BatchReceived(
      operator: string,
      from: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onERC1155Received(
      operator: string,
      from: string,
      id: BigNumberish,
      value: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    receivedAmounts(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    requestToFunds(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    requests(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    setLiquidityAggregator(
      _chainId: BigNumberish,
      _liquidityAggregator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    buy(
      nftInfo: {
        nftContract: string;
        nftId: BigNumberish;
        buyFuncSelector: BytesLike;
        buyFuncDataEncoded: BytesLike;
      },
      funds: {
        chainId: BigNumberish;
        localWeth: string;
        localWethAmount: BigNumberish;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    chainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deployedChainWeth(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gasPaymaster(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getUserTokens(
      _remoteChainId: BigNumberish,
      _localWeth: string,
      _localWethAmount: BigNumberish,
      _userAddress: string,
      _requestId: BigNumberish,
      _fundIndex: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    handleWithTokens(
      _origin: BigNumberish,
      _sender: BytesLike,
      _message: BytesLike,
      _localWeth: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    icaRouter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    liquidityAggregators(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    llRouter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nextRequestId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onERC1155BatchReceived(
      operator: string,
      from: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onERC1155Received(
      operator: string,
      from: string,
      id: BigNumberish,
      value: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    receivedAmounts(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    requestToFunds(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    requests(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setLiquidityAggregator(
      _chainId: BigNumberish,
      _liquidityAggregator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
