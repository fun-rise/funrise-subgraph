import { Transfer } from '../../generated/schema'

import { TransferSingle, TransferBatch, URI } from '../../generated/FERC1155V1/FERC1155V1'

import { ZERO_ADDRESS } from '../helpers/Constants'
import { getOrCreateTransaction } from '../helpers/Transaction'
import { getOrCreateNFT, getOrCreateNFTContract, getOrCreateNFTBalance } from './NFT'
import { getOrCreateAccount } from '../helpers/Account'

export function handleTransferSingle(event: TransferSingle): void {

  let transaction = getOrCreateTransaction(event)
  transaction.save()

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
    nft.transaction = transaction.id

    let balanceTo = getOrCreateNFTBalance(nft, toAccount)
    balanceTo.value = balanceTo.value + amount
    balanceTo.save()

  } else if (event.params.to == ZERO_ADDRESS) {

    nft.totalBurned = nft.totalBurned.plus(amount)

    let balanceFrom = getOrCreateNFTBalance(nft, fromAccount)
    balanceFrom.value = balanceFrom.value - amount
    balanceFrom.save()

  } else {

    nft.totalTransferred = nft.totalTransferred.plus(amount)

    let balanceTo = getOrCreateNFTBalance(nft, toAccount)
    balanceTo.value = balanceTo.value + amount
    balanceTo.save()

    let balanceFrom = getOrCreateNFTBalance(nft, fromAccount)
    balanceFrom.value = balanceFrom.value - amount
    balanceFrom.save()
  }

  fromAccount.save()
  toAccount.save()
  nft.save()

  let transfer = new Transfer(event.transaction.hash.toHexString() + '-' + addressFrom + '-' + addressTo)
  transfer.transaction = transaction.id
  transfer.nft = nft.id
  transfer.from = fromAccount.id
  transfer.to = toAccount.id
  transfer.amount = amount
  transfer.timestamp = event.block.timestamp
  transfer.save()
}

export function handleTransferBatch(event: TransferBatch): void {

  let transaction = getOrCreateTransaction(event)
  transaction.save()

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
      nft.transaction = transaction.id

    } else if (event.params.to == ZERO_ADDRESS) {
  
      nft.totalBurned = nft.totalBurned.plus(amount)
  
    } else {
  
      nft.totalTransferred = nft.totalTransferred.plus(amount)
    }

    nft.save()

    let transfer = new Transfer(event.transaction.hash.toHexString() + '-' + addressTo)
    transfer.transaction = transaction.id
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

  let transaction = getOrCreateTransaction(event)
  transaction.save()

  let contract = getOrCreateNFTContract(token)
  contract.standard = "ERC1155"

  let nft = getOrCreateNFT(event.params.id, contract)
  nft.tokenURI = event.params.value
  
  contract.save()
  nft.save()
}