import { ethereum } from '@graphprotocol/graph-ts'
import { Transaction } from '../../generated/schema'

export function getOrCreateTransaction(event: ethereum.Event): Transaction {
  let id = event.transaction.hash.toHexString()
  let existing = Transaction.load(id)

  if (existing != null) {
    return existing as Transaction
  }

  let transaction = new Transaction(id)
  transaction.timestamp = event.block.timestamp
  transaction.block = event.block.number

  return transaction
}
