import { Transfer } from '../../generated/schema'

import { TransferSingle, TransferBatch, URI } from '../../generated/FERC1155V1/FERC1155V1'

import { ZERO_ADDRESS } from '../helpers/Constants'
import { getOrCreateNFT, getOrCreateNFTContract } from './NFT'
import { getOrCreateAccount } from '../helpers/Account'

export function handleTransferSingle(event: TransferSingle): void {

  let tokenId = event.params.id
  let amount = event.params.value
  let token = event.address

  let contract = getOrCreateNFTContract(token)
  contract.standard = "ERC1155"
  contract.version = "V1"
  contract.save()

  let nft = getOrCreateNFT(tokenId, contract)

  let addressFrom = event.params.from.toHexString()
  let addressTo = event.params.to.toHexString()

  let fromAccount = getOrCreateAccount(addressFrom)
  let toAccount = getOrCreateAccount(addressTo)

  if (event.params.from == ZERO_ADDRESS) {

    nft.supply = amount
    nft.totalMinted = amount
    nft.creator = toAccount.id

  } else if (event.params.to == ZERO_ADDRESS) {

    nft.totalBurned = nft.totalBurned.plus(amount)

  } else {

    nft.totalTransferred = nft.totalTransferred.plus(amount)
  }

  fromAccount.save()
  toAccount.save()
  nft.save()

  let transfer = new Transfer(event.transaction.hash.toHexString() + '-' + addressFrom + '-' + addressTo)
  transfer.nft = nft.id
  transfer.from = fromAccount.id
  transfer.to = toAccount.id
  transfer.amount = amount
  transfer.timestamp = event.block.timestamp
  transfer.save()
}

export function handleTransferBatch(event: TransferBatch): void {

  let tokenIds = event.params.ids
  let amounts = event.params.values
  let token = event.address

  let contract = getOrCreateNFTContract(token)
  contract.standard = "ERC1155"
  contract.save()

  let addressFrom = event.params.from.toHexString()
  let addressTo = event.params.to.toHexString()

  let fromAccount = getOrCreateAccount(addressFrom)
  let toAccount = getOrCreateAccount(addressTo)

  for (let i = 0; i < tokenIds.length; i++) {

    let nft = getOrCreateNFT(tokenIds[i], contract)
    let amount = amounts[i]

    if (event.params.from == ZERO_ADDRESS) {

      nft.supply = amount
      nft.totalMinted = amount
      nft.creator = toAccount.id

    } else if (event.params.to == ZERO_ADDRESS) {
  
      nft.totalBurned = nft.totalBurned.plus(amount)
  
    } else {
  
      nft.totalTransferred = nft.totalTransferred.plus(amount)
    }

    nft.save()

    let transfer = new Transfer(event.transaction.hash.toHexString() + '-' + addressTo)
    transfer.nft = nft.id
    transfer.from = fromAccount.id
    transfer.to = toAccount.id
    transfer.amount = amount
    transfer.timestamp = event.block.timestamp
    transfer.save()
  }

  fromAccount.save()
  toAccount.save()
}

export function handleURI(event: URI): void {
  let token = event.address

  let contract = getOrCreateNFTContract(token)
  contract.standard = "ERC1155"

  let nft = getOrCreateNFT(event.params.id, contract)
  nft.tokenURI = event.params.value
  
  contract.save()
  nft.save()
}