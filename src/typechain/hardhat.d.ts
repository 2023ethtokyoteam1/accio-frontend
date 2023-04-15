/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155__factory>;
    getContractFactory(
      name: "IERC1155MetadataURI",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155MetadataURI__factory>;
    getContractFactory(
      name: "IERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155__factory>;
    getContractFactory(
      name: "IERC1155Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Receiver__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "IInterchainAccountRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IInterchainAccountRouter__factory>;
    getContractFactory(
      name: "IInterchainGasPaymaster",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IInterchainGasPaymaster__factory>;
    getContractFactory(
      name: "ILiquidityLayerMessageRecipient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILiquidityLayerMessageRecipient__factory>;
    getContractFactory(
      name: "ILiquidityLayerRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILiquidityLayerRouter__factory>;
    getContractFactory(
      name: "ILiquidityAggregator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILiquidityAggregator__factory>;
    getContractFactory(
      name: "LiquidityAggregator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LiquidityAggregator__factory>;
    getContractFactory(
      name: "SeaportInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SeaportInterface__factory>;
    getContractFactory(
      name: "IWETH9",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWETH9__factory>;
    getContractFactory(
      name: "MockInterchainAccountRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockInterchainAccountRouter__factory>;
    getContractFactory(
      name: "MockInterchainGasPaymaster",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockInterchainGasPaymaster__factory>;
    getContractFactory(
      name: "MockLiquidityLayerRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockLiquidityLayerRouter__factory>;
    getContractFactory(
      name: "MockNft",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockNft__factory>;
    getContractFactory(
      name: "MockNft2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockNft2__factory>;
    getContractFactory(
      name: "MockWethToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockWethToken__factory>;
    getContractFactory(
      name: "TestTokenRecipient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestTokenRecipient__factory>;

    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155>;
    getContractAt(
      name: "IERC1155MetadataURI",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155MetadataURI>;
    getContractAt(
      name: "IERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155>;
    getContractAt(
      name: "IERC1155Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Receiver>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "IInterchainAccountRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IInterchainAccountRouter>;
    getContractAt(
      name: "IInterchainGasPaymaster",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IInterchainGasPaymaster>;
    getContractAt(
      name: "ILiquidityLayerMessageRecipient",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ILiquidityLayerMessageRecipient>;
    getContractAt(
      name: "ILiquidityLayerRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ILiquidityLayerRouter>;
    getContractAt(
      name: "ILiquidityAggregator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ILiquidityAggregator>;
    getContractAt(
      name: "LiquidityAggregator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LiquidityAggregator>;
    getContractAt(
      name: "SeaportInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SeaportInterface>;
    getContractAt(
      name: "IWETH9",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWETH9>;
    getContractAt(
      name: "MockInterchainAccountRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockInterchainAccountRouter>;
    getContractAt(
      name: "MockInterchainGasPaymaster",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockInterchainGasPaymaster>;
    getContractAt(
      name: "MockLiquidityLayerRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockLiquidityLayerRouter>;
    getContractAt(
      name: "MockNft",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockNft>;
    getContractAt(
      name: "MockNft2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockNft2>;
    getContractAt(
      name: "MockWethToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockWethToken>;
    getContractAt(
      name: "TestTokenRecipient",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestTokenRecipient>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}