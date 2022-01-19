import { BigInt } from '@graphprotocol/graph-ts'

import { Transfer } from '../../generated/schema'

import { Transfer as TransferEvent, URI } from '../../generated/FERC721V1/FERC721V1'

import { ZERO_ADDRESS } from '../helpers/Constants'
import { getOrCreateAccount } from '../helpers/Account'
import { getOrCreateNFT, getOrCreateNFTContract, getOrCreateNFTBalance } from './NFT'

export function handleTransfer(event: TransferEvent): void {

  let tokenId = event.params.id
  let amount = BigInt.fromI32(1)
  let token = event.address

  let contract = getOrCreateNFTContract(token)
  contract.standard = "ERC721"
  contract.version = "V1"
  contract.save()

  let nft = getOrCreateNFT(tokenId, contract)

  let addressFrom = event.params.from.toHexString()
  let addressTo = event.params.to.toHexString()

  let fromAccount = getOrCreateAccount(addressFrom)
  let toAccount = getOrCreateAccount(addressTo)

  if (event.params.from == ZERO_ADDRESS) {

    nft.supply = BigInt.fromI32(1)
    nft.totalMinted = BigInt.fromI32(1)
    nft.creator = toAccount.id

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
  transfer.nft = nft.id
  transfer.from = fromAccount.id
  transfer.to = toAccount.id
  transfer.amount = amount
  transfer.timestamp = event.block.timestamp
  transfer.save()
}
export function handleURI(event: URI): void {
  let token = event.address

  let contract = getOrCreateNFTContract(token)
  contract.standard = "ERC721"

  let nft = getOrCreateNFT(event.params.id, contract)
  nft.tokenURI = event.params.value
  
  contract.save()
  nft.save()
}