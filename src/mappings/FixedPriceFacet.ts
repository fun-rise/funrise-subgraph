import { NFT, Purchase, Royalty, Comission, Asset } from '../../generated/schema'

import { FixedPriceBundleListed, FixedPriceBundleUnlisted } from '../../generated/FixedPriceListFacet/FixedPriceListFacet'
import { FixedPriceBundleRedeemed, RoyaltyPayed, ComissionPayed  } from '../../generated/FixedPriceRedeemFacet/FixedPriceRedeemFacet'

import { ZERO } from '../helpers/Constants'
import { getOrCreateAccount } from '../helpers/Account'
import { getOrCreateTransaction } from '../helpers/Transaction'
import { getOrCreateBundle, getOrCreateAsset, getBundleState, getAssetStandard } from '../helpers/Market'

import { getOrCreateNFT, getOrCreateNFTContract } from './NFT'

export function handleFixedPriceBundleListed(event: FixedPriceBundleListed): void {

  let transaction = getOrCreateTransaction(event)
  transaction.save()

  let owner = getOrCreateAccount(event.params.owner.toHexString())

  let bundle = getOrCreateBundle(event.params.bundleId.toString())
  bundle.transaction = transaction.id
  bundle.owner = owner.id
  bundle.paymentToken = event.params.paymentToken
  bundle.reservePrice = ZERO
  bundle.listingTime = event.block.timestamp
  bundle.duration = ZERO
  bundle.bid = null
  bundle.state = getBundleState(event.params.state)
  bundle.listingType = "FixedPrice"

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

export function handleFixedPriceBundleUnlisted(event: FixedPriceBundleUnlisted): void {

  let transaction = getOrCreateTransaction(event)
  transaction.save()

  let bundle = getOrCreateBundle(event.params.bundleId.toString())

  // for (let i = 0; i < bundle.assets.length; i++) {

  //   let asset = Asset.load(bundle.assets[i]) as Asset
  //   asset.bundle = null
  //   asset.save()
  // }

  bundle.state = "Idle"
  bundle.save()
}

export function handleFixedPriceBundleRedeemed(event: FixedPriceBundleRedeemed): void {

  let transaction = getOrCreateTransaction(event)
  transaction.save()

  let bundle = getOrCreateBundle(event.params.bundleId.toString())

  let buyer = getOrCreateAccount(event.params.buyer.toHexString())

  for (let i = 0; i < bundle.assets.length; i++) {

    let asset = Asset.load(bundle.assets[i]) as Asset

    let nft = NFT.load(asset.nft) as NFT

    let purchase = new Purchase(event.transaction.hash.toHexString() + '-' + nft.tokenId.toString())
    purchase.transaction = transaction.id
    purchase.nft = nft.id
    purchase.from = bundle.owner
    purchase.to = buyer.id
    purchase.paymentToken = bundle.paymentToken
    purchase.price = asset.price
    purchase.amount = asset.amount
    purchase.listingType = bundle.listingType
    purchase.timestamp = event.block.timestamp
    purchase.save()
  }

  bundle.state = "Idle"
  bundle.save()
}

export function handleRoyaltyPayed(event: RoyaltyPayed): void {

  let transaction = getOrCreateTransaction(event)
  transaction.save()

  let contract = getOrCreateNFTContract(event.params.token)
  let nft = getOrCreateNFT(event.params.tokenId, contract)

  let payer = getOrCreateAccount(event.params.buyer.toHexString())
  let receiver = getOrCreateAccount(event.params.receiver.toHexString())

  let royalty = new Royalty(event.transaction.hash.toHex() + '-' + receiver.id + '-' + event.params.tokenId.toString())
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