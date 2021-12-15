import { BigInt, Address } from '@graphprotocol/graph-ts'

import { NFT, NFTContract } from '../../generated/schema'

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
