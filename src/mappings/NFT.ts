import { BigInt, Address } from '@graphprotocol/graph-ts'

import { Account, NFT, NFTContract, NFTBalance } from '../../generated/schema'

import { ZERO } from '../helpers/Constants'

export function getOrCreateNFTContract(token: Address): NFTContract {

  let id = token.toHexString()
  let existing = NFTContract.load(id)

  if (existing != null) {
    return existing as NFTContract
  }

  let contract = new NFTContract(id)
  contract.standard = "ERC721"
  contract.version = "None"

  return contract
}

export function getOrCreateNFT(tokenId: BigInt, contract: NFTContract): NFT {

  let id = tokenId.toHexString() + '-' + contract.id
  let existing = NFT.load(id)

  if (existing != null) {
    return existing as NFT
  }

  let nft = new NFT(id)
  nft.contract = contract.id
  nft.tokenId = tokenId
  nft.creator = null
  nft.tokenURI = ""
  nft.supply = ZERO
  nft.totalTransferred = ZERO
  nft.totalMinted = ZERO
  nft.totalBurned = ZERO

  return nft
}

export function getOrCreateNFTBalance(nft: NFT, account: Account): NFTBalance {

  let id = account.id + '-' + nft.contract + '-' + nft.tokenId.toString()

  let existing = NFTBalance.load(id)
  if (existing != null) {
    return existing as NFTBalance
  }

  let balance = new NFTBalance(id)
  balance.nft = nft.id
  balance.account = account.id
  balance.value = ZERO

  return balance
}