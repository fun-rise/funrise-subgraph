import { Purchase, Royalty, Comission } from '../../generated/schema'

import { RoyaltyPayed, ComissionPayed, FixedPriceERC1155Redeemed, FixedPriceERC1155BundleRedeemed } from '../../generated/ERC1155RedeemFacet/ERC1155RedeemFacet'

import { getOrCreateAccount } from '../helpers/Account'
import { getOrCreateNFT, getOrCreateNFTContract } from './NFT'

export function handleFixedPriceERC1155Redeemed(event: FixedPriceERC1155Redeemed): void {

  let contract = getOrCreateNFTContract(event.params.token)
  contract.standard = "ERC1155"
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
  purchase.amount = event.params.amount
  purchase.listingType = "Offchain"
  purchase.timestamp = event.block.timestamp
  purchase.save()

  from.save()
  to.save()
}

export function handleFixedPriceERC1155BundleRedeemed(event: FixedPriceERC1155BundleRedeemed): void {

  let from = getOrCreateAccount(event.params.from.toHexString())
  let to = getOrCreateAccount(event.params.to.toHexString())

  for (let i = 0; i < event.params.tokens.length; i++) {
    let contract = getOrCreateNFTContract(event.params.tokens[i])
    contract.standard = "ERC1155"
    contract.save()

    let nft = getOrCreateNFT(event.params.ids[i], contract)
    nft.save()
  
    let purchase = new Purchase(event.transaction.hash.toHexString() + '-' + nft.tokenId.toString())
    purchase.nft = nft.id
    purchase.from = from.id 
    purchase.to = to.id
    purchase.paymentToken = event.params.paymentToken
    purchase.price = event.params.prices[i]
    purchase.amount = event.params.amounts[i]
    purchase.listingType = "Offchain"
    purchase.timestamp = event.block.timestamp
    purchase.save()
  }

  from.save()
  to.save()
}

export function handleRoyaltyPayed(event: RoyaltyPayed): void {

  let contract = getOrCreateNFTContract(event.params.token)
  contract.standard = "ERC1155"
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