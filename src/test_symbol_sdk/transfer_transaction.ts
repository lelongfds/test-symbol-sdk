import {
    NetworkType,
    TransferTransaction,
    Deadline,
    MosaicId,
    UInt64,
    Mosaic,
    PlainMessage,
    RepositoryFactoryHttp
} from "symbol-sdk"
import {
    Signer,
    RecipientAddress
} from "../initialData/accounts"
import {
    NodeUrl,
    NetworkGenerationHash
} from "../initialData/network"

const networkType = NetworkType.TEST_NET;
const fee = UInt64.fromUint(2000000);


const networkCurrencyMosaicId = new MosaicId('747B276C30626442');
const networkCurrencyDivisibility = 6;

const amount = [new Mosaic(networkCurrencyMosaicId,
    UInt64.fromUint(4 * Math.pow(10, networkCurrencyDivisibility)))];

const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    RecipientAddress,
    amount,
    PlainMessage.create("This is a test message"),
    networkType,
    fee);

console.log("unsigned tx: ")
console.log(transferTransaction.serialize())

const repositoryFactory = new RepositoryFactoryHttp(NodeUrl);
const transactionHttp = repositoryFactory.createTransactionRepository();

//signing transaction
const signedTransaction = Signer.sign(transferTransaction, NetworkGenerationHash);

console.log("signed tx: ")
console.log(signedTransaction.payload)

// transactionHttp
//     .announce(signedTransaction)
//     .subscribe(
//         (x) => console.log(x), 
//         (err) => console.error(err));