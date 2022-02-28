import { NFT, Bid, Purchase, Royalty, Comission, Asset } from '../../generated/schema'

import { AuctionBundleListed1, AuctionBundleListed2 } from '../../generated/AuctionListFacet/AuctionListFacet'
import { AuctionBidMade, AuctionBidReturned } from '../../generated/AuctionBidFacet/AuctionBidFacet'
import { AuctionOwnerSet } from '../../generated/AuctionOwnershipFacet/AuctionOwnershipFacet'
import { AuctionBidReturned as AuctionBidReturnedResolved, AuctionResolved, RoyaltyPayed, ComissionPayed } from '../../generated/AuctionResolveFacet/AuctionResolveFacet'

import { getOrCreateAccount } from '../helpers/Account'
import { getOrCreateTransaction } from '../helpers/Transaction'
import { getOrCreateBundle, getOrCreateAsset, getOrCreateBid, getBundleState, getAssetStandard } from '../helpers/Market'
import { getOrCreateNFT, getOrCreateNFTContract } from './NFT'

export function handleAuctionBundleListed1(event: AuctionBundleListed1): void {

  let transaction = getOrCreateTransaction(event)
  transaction.save()

  let owner = getOrCreateAccount(event.params.owner.toHexString())

  let bundle = getOrCreateBundle(event.params.bundleId.toString())
  bundle.owner = owner.id
  bundle.paymentToken = event.params.paymentToken
  bundle.listingTime = event.block.timestamp
  bundle.bid = null
  bundle.transaction = transaction.id

  var assets = new Array<string>()

  for (let i = 0; i < event.params.ids.length; i++) {

    let contract = getOrCreateNFTContract(event.params.tokens[i])
    contract.standard = getAssetStandard(event.params.standards[i])
    contract.save()

    let nft = getOrCreateNFT(event.params.ids[i], contract)

    let asset = getOrCreateAsset(nft, bundle)
    asset.amount = event.params.amounts[i]
    asset.price = event.params.prices[i]
    asset.owner = owner.id
    asset.save()

    assets.push(asset.id)
  }

  bundle.assets = assets

  owner.save()
  bundle.save()
}

export function handleAuctionBundleListed2(event: AuctionBundleListed2): void {

  let bundle = getOrCreateBundle(event.params.bundleId.toString())
  bundle.reservePrice = event.params.reservePrice
  bundle.duration = event.params.duration
  bundle.state = getBundleState(event.params.state)
  bundle.listingType = event.params.isVirtual ? "VirtualAuction" : "Auction"
  bundle.save()
}

export function handleAuctionBidMade(event: AuctionBidMade): void {

  let transaction = getOrCreateTransaction(event)
  transaction.save()

  let bundle = getOrCreateBundle(event.params.bundleId.toString())
  bundle.duration = event.params.newDuration

  let bidder = getOrCreateAccount(event.params.bidder.toHexString())
  bidder.save()

  let bid = getOrCreateBid(event.params.bundleId.toString() + '-' + event.params.value.toString())
  bid.transaction = transaction.id
  bid.bundle = bundle.id
  bid.bidder = bidder.id
  bid.accepted = false
  bid.value = event.params.value
  bid.active = true
  bid.save()

  bundle.bid = bid.id

  bundle.save()
}

export function handleAuctionBidReturned(event: AuctionBidReturned): void {

  let transaction = getOrCreateTransaction(event)
  transaction.save()

  let bundle = getOrCreateBundle(event.params.bundleId.toString())

  if (bundle.bid != null) {
    let bid = Bid.load(bundle.bid!) as Bid
    bid.active = false
    bid.save()
  }
}

export function handleAuctionBidReturnedResolved(event: AuctionBidReturnedResolved): void {

  let transaction = getOrCreateTransaction(event)
  transaction.save()

  let bundle = getOrCreateBundle(event.params.bundleId.toString())

  if (bundle.bid != null) {
    let bid = Bid.load(bundle.bid!) as Bid
    bid.active = false
    bid.save()
  }
}

export function handleAuctionResolved(event: AuctionResolved): void {

  let transaction = getOrCreateTransaction(event)
  transaction.save()

  let bundle = getOrCreateBundle(event.params.bundleId.toString())
  bundle.state = "Idle"
  bundle.save()

  if (bundle.bid != null) {
    let bid = Bid.load(bundle.bid!) as Bid
    bid.active = false
    bid.accepted = event.params.result == 2
    bid.save()

    if (bid.accepted) {
      for (let i = 0; i < bundle.assets.length; i++) {
  
        let asset = Asset.load(bundle.assets[i]) as Asset

        let nft = NFT.load(asset.nft) as NFT
  
        let purchase = new Purchase(event.transaction.hash.toHexString() + '-' + nft.tokenId.toString())
        purchase.nft = nft.id
        purchase.from = bundle.owner
        purchase.to = bid.bidder
        purchase.paymentToken = bundle.paymentToken
        purchase.price = asset.price
        purchase.amount = asset.amount
        purchase.listingType = bundle.listingType
        purchase.timestamp = event.block.timestamp
        purchase.transaction = transaction.id
        purchase.save()
      }
    }
  }
}

export function handleAuctionOwnerSet(event: AuctionOwnerSet): void {

  let transaction = getOrCreateTransaction(event)
  transaction.save()

  let newOwner = getOrCreateAccount(event.params.owner.toHexString())
  newOwner.save()

  let bundle = getOrCreateBundle(event.params.bundleId.toString())
  bundle.state = "OnSale"
  bundle.owner = newOwner.id

  var assets = new Array<string>()

  for (let i = 0; i < bundle.assets.length; i++) {

    let asset = Asset.load(bundle.assets[i]) as Asset

    let nft = NFT.load(asset.nft) as NFT

    let newAsset = getOrCreateAsset(nft, bundle)
    newAsset.amount = asset.amount
    newAsset.price = asset.price
    newAsset.owner = newOwner.id
    newAsset.save()

    assets.push(newAsset.id)
  }

  bundle.assets = assets

  bundle.save()
}

export function handleRoyaltyPayed(event: RoyaltyPayed): void {

  let transaction = getOrCreateTransaction(event)
  transaction.save()

  let contract = getOrCreateNFTContract(event.params.token)
  let nft = getOrCreateNFT(event.params.tokenId, contract)

  let payer = getOrCreateAccount(event.params.buyer.toHexString())
  let receiver = getOrCreateAccount(event.params.receiver.toHexString())

  let royalty = new Royalty(event.transaction.hash.toHexString() + '-' + receiver.id + '-' + event.params.tokenId.toString())
  royalty.transaction = transaction.id
  royalty.nft = nft.id
  royalty.payer = payer.id
  royalty.receiver = receiver.id
  royalty.paymentToken = event.params.paymentToken
  royalty.value = event.params.value
  royalty.save()

  nft.save()
  payer.save()
  receiver.save()
}

export function handleComissionPayed(event: ComissionPayed): void {

  let transaction = getOrCreateTransaction(event)
  transaction.save()

  let payer = getOrCreateAccount(event.params.buyer.toHexString())
  let receiver = getOrCreateAccount(event.params.receiver.toHexString())

  let comission = new Comission(event.transaction.hash.toHexString() + '-' + payer.id + '-' + event.params.value.toString())
  comission.transaction = transaction.id
  comission.payer = payer.id
  comission.receiver = receiver.id
  comission.paymentToken = event.params.paymentToken
  comission.value = event.params.value
  comission.save()

  payer.save()
  receiver.save()
}