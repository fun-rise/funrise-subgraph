// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Account entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nftCreated(): Array<string> {
    let value = this.get("nftCreated");
    return value!.toStringArray();
  }

  set nftCreated(value: Array<string>) {
    this.set("nftCreated", Value.fromStringArray(value));
  }

  get transfersIn(): Array<string> {
    let value = this.get("transfersIn");
    return value!.toStringArray();
  }

  set transfersIn(value: Array<string>) {
    this.set("transfersIn", Value.fromStringArray(value));
  }

  get transfersOut(): Array<string> {
    let value = this.get("transfersOut");
    return value!.toStringArray();
  }

  set transfersOut(value: Array<string>) {
    this.set("transfersOut", Value.fromStringArray(value));
  }

  get purchasesIn(): Array<string> {
    let value = this.get("purchasesIn");
    return value!.toStringArray();
  }

  set purchasesIn(value: Array<string>) {
    this.set("purchasesIn", Value.fromStringArray(value));
  }

  get purchasesOut(): Array<string> {
    let value = this.get("purchasesOut");
    return value!.toStringArray();
  }

  set purchasesOut(value: Array<string>) {
    this.set("purchasesOut", Value.fromStringArray(value));
  }

  get royaltyOut(): Array<string> {
    let value = this.get("royaltyOut");
    return value!.toStringArray();
  }

  set royaltyOut(value: Array<string>) {
    this.set("royaltyOut", Value.fromStringArray(value));
  }

  get royaltyIn(): Array<string> {
    let value = this.get("royaltyIn");
    return value!.toStringArray();
  }

  set royaltyIn(value: Array<string>) {
    this.set("royaltyIn", Value.fromStringArray(value));
  }

  get comissionsOut(): Array<string> {
    let value = this.get("comissionsOut");
    return value!.toStringArray();
  }

  set comissionsOut(value: Array<string>) {
    this.set("comissionsOut", Value.fromStringArray(value));
  }

  get comissionsIn(): Array<string> {
    let value = this.get("comissionsIn");
    return value!.toStringArray();
  }

  set comissionsIn(value: Array<string>) {
    this.set("comissionsIn", Value.fromStringArray(value));
  }

  get assets(): Array<string> {
    let value = this.get("assets");
    return value!.toStringArray();
  }

  set assets(value: Array<string>) {
    this.set("assets", Value.fromStringArray(value));
  }

  get bundles(): Array<string> {
    let value = this.get("bundles");
    return value!.toStringArray();
  }

  set bundles(value: Array<string>) {
    this.set("bundles", Value.fromStringArray(value));
  }

  get bids(): Array<string> {
    let value = this.get("bids");
    return value!.toStringArray();
  }

  set bids(value: Array<string>) {
    this.set("bids", Value.fromStringArray(value));
  }
}

export class NFTContract extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("standard", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NFTContract entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save NFTContract entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("NFTContract", id.toString(), this);
    }
  }

  static load(id: string): NFTContract | null {
    return changetype<NFTContract | null>(store.get("NFTContract", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get standard(): string {
    let value = this.get("standard");
    return value!.toString();
  }

  set standard(value: string) {
    this.set("standard", Value.fromString(value));
  }

  get version(): string | null {
    let value = this.get("version");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set version(value: string | null) {
    if (!value) {
      this.unset("version");
    } else {
      this.set("version", Value.fromString(<string>value));
    }
  }

  get nfts(): Array<string> {
    let value = this.get("nfts");
    return value!.toStringArray();
  }

  set nfts(value: Array<string>) {
    this.set("nfts", Value.fromStringArray(value));
  }
}

export class NFT extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("contract", Value.fromString(""));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("tokenURI", Value.fromString(""));
    this.set("supply", Value.fromBigInt(BigInt.zero()));
    this.set("totalTransferred", Value.fromBigInt(BigInt.zero()));
    this.set("totalMinted", Value.fromBigInt(BigInt.zero()));
    this.set("totalBurned", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NFT entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save NFT entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("NFT", id.toString(), this);
    }
  }

  static load(id: string): NFT | null {
    return changetype<NFT | null>(store.get("NFT", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get contract(): string {
    let value = this.get("contract");
    return value!.toString();
  }

  set contract(value: string) {
    this.set("contract", Value.fromString(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get creator(): string | null {
    let value = this.get("creator");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set creator(value: string | null) {
    if (!value) {
      this.unset("creator");
    } else {
      this.set("creator", Value.fromString(<string>value));
    }
  }

  get tokenURI(): string {
    let value = this.get("tokenURI");
    return value!.toString();
  }

  set tokenURI(value: string) {
    this.set("tokenURI", Value.fromString(value));
  }

  get supply(): BigInt {
    let value = this.get("supply");
    return value!.toBigInt();
  }

  set supply(value: BigInt) {
    this.set("supply", Value.fromBigInt(value));
  }

  get totalTransferred(): BigInt {
    let value = this.get("totalTransferred");
    return value!.toBigInt();
  }

  set totalTransferred(value: BigInt) {
    this.set("totalTransferred", Value.fromBigInt(value));
  }

  get totalMinted(): BigInt {
    let value = this.get("totalMinted");
    return value!.toBigInt();
  }

  set totalMinted(value: BigInt) {
    this.set("totalMinted", Value.fromBigInt(value));
  }

  get totalBurned(): BigInt {
    let value = this.get("totalBurned");
    return value!.toBigInt();
  }

  set totalBurned(value: BigInt) {
    this.set("totalBurned", Value.fromBigInt(value));
  }

  get assets(): Array<string> {
    let value = this.get("assets");
    return value!.toStringArray();
  }

  set assets(value: Array<string>) {
    this.set("assets", Value.fromStringArray(value));
  }

  get royalty(): Array<string> {
    let value = this.get("royalty");
    return value!.toStringArray();
  }

  set royalty(value: Array<string>) {
    this.set("royalty", Value.fromStringArray(value));
  }
}

export class Asset extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("nft", Value.fromString(""));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("price", Value.fromBigInt(BigInt.zero()));
    this.set("owner", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Asset entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Asset entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Asset", id.toString(), this);
    }
  }

  static load(id: string): Asset | null {
    return changetype<Asset | null>(store.get("Asset", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nft(): string {
    let value = this.get("nft");
    return value!.toString();
  }

  set nft(value: string) {
    this.set("nft", Value.fromString(value));
  }

  get bundle(): string | null {
    let value = this.get("bundle");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set bundle(value: string | null) {
    if (!value) {
      this.unset("bundle");
    } else {
      this.set("bundle", Value.fromString(<string>value));
    }
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get price(): BigInt {
    let value = this.get("price");
    return value!.toBigInt();
  }

  set price(value: BigInt) {
    this.set("price", Value.fromBigInt(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }
}

export class Bundle extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("owner", Value.fromString(""));
    this.set("paymentToken", Value.fromBytes(Bytes.empty()));
    this.set("listingTime", Value.fromBigInt(BigInt.zero()));
    this.set("state", Value.fromString(""));
    this.set("listingType", Value.fromString(""));
    this.set("assets", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Bundle entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Bundle entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Bundle", id.toString(), this);
    }
  }

  static load(id: string): Bundle | null {
    return changetype<Bundle | null>(store.get("Bundle", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get paymentToken(): Bytes {
    let value = this.get("paymentToken");
    return value!.toBytes();
  }

  set paymentToken(value: Bytes) {
    this.set("paymentToken", Value.fromBytes(value));
  }

  get reservePrice(): BigInt | null {
    let value = this.get("reservePrice");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set reservePrice(value: BigInt | null) {
    if (!value) {
      this.unset("reservePrice");
    } else {
      this.set("reservePrice", Value.fromBigInt(<BigInt>value));
    }
  }

  get listingTime(): BigInt {
    let value = this.get("listingTime");
    return value!.toBigInt();
  }

  set listingTime(value: BigInt) {
    this.set("listingTime", Value.fromBigInt(value));
  }

  get duration(): BigInt | null {
    let value = this.get("duration");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set duration(value: BigInt | null) {
    if (!value) {
      this.unset("duration");
    } else {
      this.set("duration", Value.fromBigInt(<BigInt>value));
    }
  }

  get bid(): string | null {
    let value = this.get("bid");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set bid(value: string | null) {
    if (!value) {
      this.unset("bid");
    } else {
      this.set("bid", Value.fromString(<string>value));
    }
  }

  get state(): string {
    let value = this.get("state");
    return value!.toString();
  }

  set state(value: string) {
    this.set("state", Value.fromString(value));
  }

  get listingType(): string {
    let value = this.get("listingType");
    return value!.toString();
  }

  set listingType(value: string) {
    this.set("listingType", Value.fromString(value));
  }

  get assets(): Array<string> {
    let value = this.get("assets");
    return value!.toStringArray();
  }

  set assets(value: Array<string>) {
    this.set("assets", Value.fromStringArray(value));
  }
}

export class Bid extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("bundle", Value.fromString(""));
    this.set("bidder", Value.fromString(""));
    this.set("value", Value.fromBigInt(BigInt.zero()));
    this.set("active", Value.fromBoolean(false));
    this.set("accepted", Value.fromBoolean(false));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Bid entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Bid entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Bid", id.toString(), this);
    }
  }

  static load(id: string): Bid | null {
    return changetype<Bid | null>(store.get("Bid", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get bundle(): string {
    let value = this.get("bundle");
    return value!.toString();
  }

  set bundle(value: string) {
    this.set("bundle", Value.fromString(value));
  }

  get bidder(): string {
    let value = this.get("bidder");
    return value!.toString();
  }

  set bidder(value: string) {
    this.set("bidder", Value.fromString(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get active(): boolean {
    let value = this.get("active");
    return value!.toBoolean();
  }

  set active(value: boolean) {
    this.set("active", Value.fromBoolean(value));
  }

  get accepted(): boolean {
    let value = this.get("accepted");
    return value!.toBoolean();
  }

  set accepted(value: boolean) {
    this.set("accepted", Value.fromBoolean(value));
  }
}

export class Transfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("nft", Value.fromString(""));
    this.set("from", Value.fromString(""));
    this.set("to", Value.fromString(""));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transfer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Transfer entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Transfer", id.toString(), this);
    }
  }

  static load(id: string): Transfer | null {
    return changetype<Transfer | null>(store.get("Transfer", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nft(): string {
    let value = this.get("nft");
    return value!.toString();
  }

  set nft(value: string) {
    this.set("nft", Value.fromString(value));
  }

  get from(): string {
    let value = this.get("from");
    return value!.toString();
  }

  set from(value: string) {
    this.set("from", Value.fromString(value));
  }

  get to(): string {
    let value = this.get("to");
    return value!.toString();
  }

  set to(value: string) {
    this.set("to", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class Purchase extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("nft", Value.fromString(""));
    this.set("from", Value.fromString(""));
    this.set("to", Value.fromString(""));
    this.set("paymentToken", Value.fromBytes(Bytes.empty()));
    this.set("price", Value.fromBigInt(BigInt.zero()));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("listingType", Value.fromString(""));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Purchase entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Purchase entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Purchase", id.toString(), this);
    }
  }

  static load(id: string): Purchase | null {
    return changetype<Purchase | null>(store.get("Purchase", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nft(): string {
    let value = this.get("nft");
    return value!.toString();
  }

  set nft(value: string) {
    this.set("nft", Value.fromString(value));
  }

  get from(): string {
    let value = this.get("from");
    return value!.toString();
  }

  set from(value: string) {
    this.set("from", Value.fromString(value));
  }

  get to(): string {
    let value = this.get("to");
    return value!.toString();
  }

  set to(value: string) {
    this.set("to", Value.fromString(value));
  }

  get paymentToken(): Bytes {
    let value = this.get("paymentToken");
    return value!.toBytes();
  }

  set paymentToken(value: Bytes) {
    this.set("paymentToken", Value.fromBytes(value));
  }

  get price(): BigInt {
    let value = this.get("price");
    return value!.toBigInt();
  }

  set price(value: BigInt) {
    this.set("price", Value.fromBigInt(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get listingType(): string {
    let value = this.get("listingType");
    return value!.toString();
  }

  set listingType(value: string) {
    this.set("listingType", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class Royalty extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("nft", Value.fromString(""));
    this.set("paymentToken", Value.fromBytes(Bytes.empty()));
    this.set("payer", Value.fromString(""));
    this.set("receiver", Value.fromString(""));
    this.set("value", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Royalty entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Royalty entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Royalty", id.toString(), this);
    }
  }

  static load(id: string): Royalty | null {
    return changetype<Royalty | null>(store.get("Royalty", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nft(): string {
    let value = this.get("nft");
    return value!.toString();
  }

  set nft(value: string) {
    this.set("nft", Value.fromString(value));
  }

  get paymentToken(): Bytes {
    let value = this.get("paymentToken");
    return value!.toBytes();
  }

  set paymentToken(value: Bytes) {
    this.set("paymentToken", Value.fromBytes(value));
  }

  get payer(): string {
    let value = this.get("payer");
    return value!.toString();
  }

  set payer(value: string) {
    this.set("payer", Value.fromString(value));
  }

  get receiver(): string {
    let value = this.get("receiver");
    return value!.toString();
  }

  set receiver(value: string) {
    this.set("receiver", Value.fromString(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }
}

export class Comission extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("paymentToken", Value.fromBytes(Bytes.empty()));
    this.set("payer", Value.fromString(""));
    this.set("receiver", Value.fromString(""));
    this.set("value", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Comission entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Comission entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Comission", id.toString(), this);
    }
  }

  static load(id: string): Comission | null {
    return changetype<Comission | null>(store.get("Comission", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get paymentToken(): Bytes {
    let value = this.get("paymentToken");
    return value!.toBytes();
  }

  set paymentToken(value: Bytes) {
    this.set("paymentToken", Value.fromBytes(value));
  }

  get payer(): string {
    let value = this.get("payer");
    return value!.toString();
  }

  set payer(value: string) {
    this.set("payer", Value.fromString(value));
  }

  get receiver(): string {
    let value = this.get("receiver");
    return value!.toString();
  }

  set receiver(value: string) {
    this.set("receiver", Value.fromString(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }
}
