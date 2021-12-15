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

export class AuctionOwnerSet extends ethereum.Event {
  get params(): AuctionOwnerSet__Params {
    return new AuctionOwnerSet__Params(this);
  }
}

export class AuctionOwnerSet__Params {
  _event: AuctionOwnerSet;

  constructor(event: AuctionOwnerSet) {
    this._event = event;
  }

  get bundleId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class AuctionOwnershipFacet extends ethereum.SmartContract {
  static bind(address: Address): AuctionOwnershipFacet {
    return new AuctionOwnershipFacet("AuctionOwnershipFacet", address);
  }
}

export class AuctionSetOwnerCall extends ethereum.Call {
  get inputs(): AuctionSetOwnerCall__Inputs {
    return new AuctionSetOwnerCall__Inputs(this);
  }

  get outputs(): AuctionSetOwnerCall__Outputs {
    return new AuctionSetOwnerCall__Outputs(this);
  }
}

export class AuctionSetOwnerCall__Inputs {
  _call: AuctionSetOwnerCall;

  constructor(call: AuctionSetOwnerCall) {
    this._call = call;
  }

  get order(): AuctionSetOwnerCallOrderStruct {
    return changetype<AuctionSetOwnerCallOrderStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }

  get signature(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class AuctionSetOwnerCall__Outputs {
  _call: AuctionSetOwnerCall;

  constructor(call: AuctionSetOwnerCall) {
    this._call = call;
  }
}

export class AuctionSetOwnerCallOrderStruct extends ethereum.Tuple {
  get owner(): Address {
    return this[0].toAddress();
  }

  get targetToken(): Address {
    return this[1].toAddress();
  }

  get bundleId(): BigInt {
    return this[2].toBigInt();
  }

  get uris(): Array<string> {
    return this[3].toStringArray();
  }

  get royalty(): AuctionSetOwnerCallOrderRoyaltyStruct {
    return changetype<AuctionSetOwnerCallOrderRoyaltyStruct>(this[4].toTuple());
  }
}

export class AuctionSetOwnerCallOrderRoyaltyStruct extends ethereum.Tuple {
  get recipient(): Address {
    return this[0].toAddress();
  }

  get amount(): i32 {
    return this[1].toI32();
  }
}