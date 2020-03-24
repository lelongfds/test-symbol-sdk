import {
    Account,
    Address
} from 'symbol-sdk'
import {NetworkType} from './network'

//Signer
const privKey = 'd771173cc7ffdbe79f49dc035526a8f0a86c8b9481dcc56df9d445e0f7c74ff4'
const account = Account.createFromPrivateKey(privKey, NetworkType)
//Recipient
const rawAddress = 'TDYFIPQHNGQ7QQ53CRJJNP52UHRPCCXYCADFMR3Q';
const recipientAddress = Address.createFromRawAddress(rawAddress);

export {
    account as Signer,
    recipientAddress as RecipientAddress
}