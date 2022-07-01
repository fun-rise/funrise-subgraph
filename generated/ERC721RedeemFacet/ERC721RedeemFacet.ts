// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ComissionPayed extends ethereum.Event {
  get params(): ComissionPayed__Params {
    return new ComissionPayed__Params(this);
  }
}

export class ComissionPayed__Params {
  _event: ComissionPayed;

  constructor(event: ComissionPayed) {
    this._event = event;
  }

  get paymentToken(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get buyer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get receiver(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class FixedPriceERC721BundleRedeemed extends ethereum.Event {
  get params(): FixedPriceERC721BundleRedeemed__Params {
    return new FixedPriceERC721BundleRedeemed__Params(this);
  }
}

export class FixedPriceERC721BundleRedeemed__Params {
  _event: FixedPriceERC721BundleRedeemed;

  constructor(event: FixedPriceERC721BundleRedeemed) {
    this._event = event;
  }

  get tokens(): Array<Address> {
    return this._event.parameters[0].value.toAddressArray();
  }

  get paymentToken(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get from(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get ids(): Array<BigInt> {
    return this._event.parameters[4].value.toBigIntArray();
  }

  get prices(): Array<BigInt> {
    return this._event.parameters[5].value.toBigIntArray();
  }
}

export class FixedPriceERC721Redeemed extends ethereum.Event {
  get params(): FixedPriceERC721Redeemed__Params {
    return new FixedPriceERC721Redeemed__Params(this);
  }
}

export class FixedPriceERC721Redeemed__Params {
  _event: FixedPriceERC721Redeemed;

  constructor(event: FixedPriceERC721Redeemed) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get paymentToken(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get from(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get id(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get price(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class RoyaltyPayed extends ethereum.Event {
  get params(): RoyaltyPayed__Params {
    return new RoyaltyPayed__Params(this);
  }
}

export class RoyaltyPayed__Params {
  _event: RoyaltyPayed;

  constructor(event: RoyaltyPayed) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get paymentToken(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get buyer(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get receiver(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get value(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class ERC721RedeemFacet extends ethereum.SmartContract {
  static bind(address: Address): ERC721RedeemFacet {
    return new ERC721RedeemFacet("ERC721RedeemFacet", address);
  }
}

export class ERC721MintRedeemCall extends ethereum.Call {
  get inputs(): ERC721MintRedeemCall__Inputs {
    return new ERC721MintRedeemCall__Inputs(this);
  }

  get outputs(): ERC721MintRedeemCall__Outputs {
    return new ERC721MintRedeemCall__Outputs(this);
  }
}

export class ERC721MintRedeemCall__Inputs {
  _call: ERC721MintRedeemCall;

  constructor(call: ERC721MintRedeemCall) {
    this._call = call;
  }

  get mintOrder(): ERC721MintRedeemCallMintOrderStruct {
    return changetype<ERC721MintRedeemCallMintOrderStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }

  get redeemOrder(): ERC721MintRedeemCallRedeemOrderStruct {
    return changetype<ERC721MintRedeemCallRedeemOrderStruct>(
      this._call.inputValues[1].value.toTuple()
    );
  }

  get mintSignature(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get marketSignature(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }

  get redeemSignature(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }

  get nonce(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }
}

export class ERC721MintRedeemCall__Outputs {
  _call: ERC721MintRedeemCall;

  constructor(call: ERC721MintRedeemCall) {
    this._call = call;
  }
}

export class ERC721MintRedeemCallMintOrderStruct extends ethereum.Tuple {
  get token(): Address {
    return this[0].toAddress();
  }

  get to(): Address {
    return this[1].toAddress();
  }

  get id(): BigInt {
    return this[2].toBigInt();
  }

  get uri(): string {
    return this[3].toString();
  }

  get royalty(): ERC721MintRedeemCallMintOrderRoyaltyStruct {
    return changetype<ERC721MintRedeemCallMintOrderRoyaltyStruct>(
      this[4].toTuple()
    );
  }
}

export class ERC721MintRedeemCallMintOrderRoyaltyStruct extends ethereum.Tuple {
  get recipient(): Address {
    return this[0].toAddress();
  }

  get amount(): i32 {
    return this[1].toI32();
  }
}

export class ERC721MintRedeemCallRedeemOrderStruct extends ethereum.Tuple {
  get token(): Address {
    return this[0].toAddress();
  }

  get paymentToken(): Address {
    return this[1].toAddress();
  }

  get targetToken(): Address {
    return this[2].toAddress();
  }

  get from(): Address {
    return this[3].toAddress();
  }

  get to(): Address {
    return this[4].toAddress();
  }

  get id(): BigInt {
    return this[5].toBigInt();
  }

  get price(): BigInt {
    return this[6].toBigInt();
  }
}

export class ERC721RedeemCall extends ethereum.Call {
  get inputs(): ERC721RedeemCall__Inputs {
    return new ERC721RedeemCall__Inputs(this);
  }

  get outputs(): ERC721RedeemCall__Outputs {
    return new ERC721RedeemCall__Outputs(this);
  }
}

export class ERC721RedeemCall__Inputs {
  _call: ERC721RedeemCall;

  constructor(call: ERC721RedeemCall) {
    this._call = call;
  }

  get order(): ERC721RedeemCallOrderStruct {
    return changetype<ERC721RedeemCallOrderStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }

  get signature(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get nonce(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class ERC721RedeemCall__Outputs {
  _call: ERC721RedeemCall;

  constructor(call: ERC721RedeemCall) {
    this._call = call;
  }
}

export class ERC721RedeemCallOrderStruct extends ethereum.Tuple {
  get token(): Address {
    return this[0].toAddress();
  }

  get paymentToken(): Address {
    return this[1].toAddress();
  }

  get targetToken(): Address {
    return this[2].toAddress();
  }

  get from(): Address {
    return this[3].toAddress();
  }

  get to(): Address {
    return this[4].toAddress();
  }

  get id(): BigInt {
    return this[5].toBigInt();
  }

  get price(): BigInt {
    return this[6].toBigInt();
  }
}

export class ERC721RedeemBundleCall extends ethereum.Call {
  get inputs(): ERC721RedeemBundleCall__Inputs {
    return new ERC721RedeemBundleCall__Inputs(this);
  }

  get outputs(): ERC721RedeemBundleCall__Outputs {
    return new ERC721RedeemBundleCall__Outputs(this);
  }
}

export class ERC721RedeemBundleCall__Inputs {
  _call: ERC721RedeemBundleCall;

  constructor(call: ERC721RedeemBundleCall) {
    this._call = call;
  }

  get order(): ERC721RedeemBundleCallOrderStruct {
    return changetype<ERC721RedeemBundleCallOrderStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }

  get signature(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get nonce(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class ERC721RedeemBundleCall__Outputs {
  _call: ERC721RedeemBundleCall;

  constructor(call: ERC721RedeemBundleCall) {
    this._call = call;
  }
}

export class ERC721RedeemBundleCallOrderStruct extends ethereum.Tuple {
  get tokens(): Array<Address> {
    return this[0].toAddressArray();
  }

  get paymentToken(): Address {
    return this[1].toAddress();
  }

  get targetToken(): Address {
    return this[2].toAddress();
  }

  get from(): Address {
    return this[3].toAddress();
  }

  get to(): Address {
    return this[4].toAddress();
  }

  get ids(): Array<BigInt> {
    return this[5].toBigIntArray();
  }

  get prices(): Array<BigInt> {
    return this[6].toBigIntArray();
  }
}
