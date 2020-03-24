import {
    NetworkType,
    NetworkGenerationHash,
    NodeUrl
} from '../initialData/network'
import {Signer} from '../initialData/accounts'
import {
    UInt64,
    MosaicNonce,
    Deadline,
    MosaicId,
    MosaicFlags,
    MosaicDefinitionTransaction,
    MosaicSupplyChangeTransaction,
    MosaicSupplyChangeAction,
    AggregateTransaction,
    RepositoryFactoryHttp
} from 'symbol-sdk'

// replace with duration (in blocks)
const duration = UInt64.fromUint(0);
// replace with custom mosaic flags
const isSupplyMutable = true;
const isTransferable = true;
const isRestrictable = true;
// replace with custom divisibility
const divisibility = 3;

const nonce = MosaicNonce.createRandom();

//Create mosaic
const mosaicDefinitionTransaction = MosaicDefinitionTransaction.create(
    Deadline.create(),
    nonce,
    MosaicId.createFromNonce(nonce, Signer.publicAccount),
    MosaicFlags.create(isSupplyMutable, isTransferable, isRestrictable),
    divisibility,
    duration,
    NetworkType);

//Replace with mosaic units to increase
const delta = 1000000;

const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
    Deadline.create(),
    mosaicDefinitionTransaction.mosaicId,
    MosaicSupplyChangeAction.Increase,
    UInt64.fromUint(delta * Math.pow(10, divisibility)),
    NetworkType);

/* Note
    Symbol works with absolute amounts. To get an absolute amount, multiply 
    the number of assets you want to create by 10divisibility. For example, 
    if the mosaic has divisibility 2, to create 10 units (relative) 
    you should define 1000 (absolute) instead. */

// Announce both transactions together using an AggregateTransaction.

/* Note
    Include the first block generation hash to make the transaction 
    only valid for your network. Open nodeUrl + '/block/1' 
    in a new browser tab and copy the meta.generationHash value.*/

const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [
        mosaicDefinitionTransaction.toAggregate(Signer.publicAccount),
        mosaicSupplyChangeTransaction.toAggregate(Signer.publicAccount)
    ],
    NetworkType,
    [],
    UInt64.fromUint(2000000));

const signedTransaction = Signer.sign(aggregateTransaction, NetworkGenerationHash);
const repositoryFactory = new RepositoryFactoryHttp(NodeUrl);
const transactionHttp = repositoryFactory.createTransactionRepository();

transactionHttp
    .announce(signedTransaction)
    .subscribe((x) => console.log(x), (err) => console.error(err));
