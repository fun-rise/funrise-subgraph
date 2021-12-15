import { BigInt } from '@graphprotocol/graph-ts'

import { Purchase, Royalty, Comission } from '../../generated/schema'

import { RoyaltyPayed, ComissionPayed, FixedPriceERC721Redeemed, FixedPriceERC721BundleRedeemed } from '../../generated/ERC721RedeemFacet/ERC721RedeemFacet'

import { getOrCreateAccount } from '../helpers/Account'
import { getOrCreateNFT, getOrCreateNFTContract } from './NFT'

export function handleRoyaltyPayed(event: RoyaltyPayed): void {

  let contract = getOrCreateNFTContract(event.params.token)
  contract.standard = "ERC721"
  contract.save()

  let nft = getOrCreateNFT(event.params.tokenId, contract)

  let payer = getOrCreateAccount(event.params.buyer.toHexString())
  let receiver = getOrCreateAccount(event.params.receiver.toHexString())

  let royalty = new Royalty(event.transaction.hash.toHex() + '-' + receiver.id + '-' + event.params.tokenId.toHexString())
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

  let payer = getOrCreateAccount(event.params.buyer.toHexString())
  let receiver = getOrCreateAccount(event.params.receiver.toHexString())

  let comission = new Comission(event.transaction.hash.toHexString() + '-' + payer.id + '-' + event.params.value.toString())
  comission.payer = payer.id
  comission.receiver = receiver.id
  comission.paymentToken = event.params.paymentToken
  comission.value = event.params.value
  comission.save()

  payer.save()
  receiver.save()
}

export function handleFixedPriceERC721Redeemed(event: FixedPriceERC721Redeemed): void {

  let contract = getOrCreateNFTContract(event.params.token)
  contract.standard = "ERC721"
  contract.save()

  let nft = getOrCreateNFT(event.params.id, contract)
  nft.save()

  let from = getOrCreateAccount(event.params.from.toHexString())
  let to = getOrCreateAccount(event.params.to.toHexString())

  let purchase = new Purchase(event.transaction.hash.toHexString() + '-' + nft.tokenId.toString())
  purchase.nft = nft.id
  purchase.from = from.id
  purchase.to = to.id  
  purchase.paymentToken = event.params.paymentToken
  purchase.price = event.params.price
  purchase.amount = BigInt.fromI32(1)
  purchase.listingType = "Offchain"
  purchase.timestamp = event.block.timestamp
  purchase.save()

  from.save()
  to.save()
}

export function handleFixedPriceERC721BundleRedeemed(event: FixedPriceERC721BundleRedeemed): void {

  let from = getOrCreateAccount(event.params.from.toHexString())
  let to = getOrCreateAccount(event.params.to.toHexString())

  for (let i = 0; i < event.params.tokens.length; i++) {
    let contract = getOrCreateNFTContract(event.params.tokens[i])
    contract.standard = "ERC721"
    contract.save()

    let nft = getOrCreateNFT(event.params.ids[i], contract)
    nft.save()
  
    let purchase = new Purchase(event.transaction.hash.toHexString() + '-' + nft.tokenId.toString())
    purchase.nft = nft.id
    purchase.from = from.id 
    purchase.to = to.id
    purchase.paymentToken = event.params.paymentToken
    purchase.price = event.params.prices[i]
    purchase.amount = BigInt.fromI32(1)
    purchase.listingType = "Offchain"
    purchase.timestamp = event.block.timestamp
    purchase.save()
  }

  from.save()
  to.save()
}