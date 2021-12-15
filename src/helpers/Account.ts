import {  Account } from '../../generated/schema'

export function getOrCreateAccount(id: string): Account {
  let existing = Account.load(id)

  if (existing != null) {
    return existing as Account
  }

  return new Account(id)
}