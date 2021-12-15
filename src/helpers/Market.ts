import { NFT, Asset, Bundle, Bid } from '../../generated/schema'

export function getOrCreateBid(bidId: string): Bid {

  let existing = Bid.load(bidId)
  if (existing != null) {
    return existing as Bid
  }

  let bid = new Bid(bidId)
  return bid
}

export function getOrCreateBundle(bundleId: string): Bundle {

  let existing = Bundle.load(bundleId)
  if (existing != null) {
    return existing as Bundle
  }

  let bundle = new Bundle(bundleId)
  return bundle
}

export function getNullBundle(): Bundle {

  let bundleId = "0x0"

  let existing = Bundle.load(bundleId)
  if (existing != null) {
    return existing as Bundle
  }

  let bundle = new Bundle(bundleId)
  return bundle
}

export function getOrCreateAsset(nft: NFT, bundle: Bundle): Asset {

  let id = bundle.owner + '-' + nft.contract + '-' + nft.tokenId.toString()

  let existing = Asset.load(id)
  if (existing != null) {
    return existing as Asset
  }

  let asset = new Asset(id)
  asset.nft = nft.id
  asset.bundle = bundle.id

  return asset
}

export function getBundleState(val: number): string {

  if (val == 1) {
    return "OnSale"
  } else if (val == 2) {
    return "Pending"
  } else {
    return "Idle"
  }
}

export function getAssetStandard(val: number): string {

  if (val == 0) {
    return "ERC721"
  } else if (val == 1) {
    return "ERC1155"
  } else {
    return "Unknown"
  }
}