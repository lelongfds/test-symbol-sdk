import {
    TransferTransaction,
    Deadline,
    MosaicId,
    UInt64,
    Mosaic,
    PlainMessage,
    RepositoryFactoryHttp,
    Convert
} from "symbol-sdk"
import {
    RecipientAddress,
    Signer
} from "../initialData/accounts"
import {
    NetworkType,
    NodeUrl,
    NetworkGenerationHash
} from "../initialData/network"
import {SymbolLedger} from '../api/ledger'
import Transport from '@ledgerhq/hw-transport-node-hid'

const fee = UInt64.fromUint(2000000);

const networkCurrencyMosaicId = new MosaicId('747B276C30626442');
const networkCurrencyDivisibility = 6;

const amount = [new Mosaic(networkCurrencyMosaicId,
    UInt64.fromUint(45 * Math.pow(10, networkCurrencyDivisibility)))];
    
let transferTransaction = TransferTransaction.create(
    Deadline.create(),
    RecipientAddress,
    amount,
    PlainMessage.create("This is a test message"),
    NetworkType,
    fee);

async function getAccountAndSign (path){
    var transport
    try {
        //Get account from ledger. SKIP THIS STEP WHEN YOU DEVELOP THE WALLET
        transport = await Transport.create();
        const symbolLedger = new SymbolLedger(transport, "XYM");
        const accountResult = await symbolLedger.getAccount(path);

        const signer = accountResult.publicKey;
        const signature = await symbolLedger.signTransaction(path, transferTransaction, NetworkGenerationHash, signer)
        transport.close()

        //Announce the transaction
        const repositoryFactory = new RepositoryFactoryHttp(NodeUrl);
        const transactionHttp = repositoryFactory.createTransactionRepository();
        transactionHttp
        .announce(signature)
        .subscribe(
            (x) => console.log(x),
            (err) => console.error(err));
    } catch (err) {
        transport.close()
        console.log(err);
    }
}

const networkType = NetworkType;
const index = 0;

getAccountAndSign(`m/44'/43'/${networkType}'/0'/${index}'`);
