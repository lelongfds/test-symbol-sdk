import {
    NamespaceId,
    RepositoryFactoryHttp,
    UInt64,
    Deadline,
    NamespaceRegistrationTransaction
} from 'symbol-sdk'
import {
    NodeUrl,
    NetworkGenerationHash,
    NetworkType
} from '../initialData/network'
import {Signer} from '../initialData/accounts'

/* 
// Choose a unique name for your namespace. 
// One common option is to use your company’s or own name.

// In this example, we are going to register a namespace named test. 
// Check if your namespace name is available. 
*/

// replace with namespace name
const namespaceName = 'fdssoft';
const namespaceId = new NamespaceId(namespaceName);

const repositoryFactory = new RepositoryFactoryHttp(NodeUrl);
const namespaceHttp = repositoryFactory.createNamespaceRepository();

namespaceHttp
    .getNamespace(namespaceId)
    .subscribe((namespaceInfo) => console.log(namespaceInfo), (err) => console.error(err));

/*----------------------------------------------------------------------------*/
// replace with duration (in blocks)
const duration = UInt64.fromUint(10000000);

const namespaceRegistrationTransaction = NamespaceRegistrationTransaction.createRootNamespace(
    Deadline.create(),
    namespaceName,
    duration,
    NetworkType,
    UInt64.fromUint(2000000));

const signedTransaction = Signer.sign(namespaceRegistrationTransaction, NetworkGenerationHash);

const transactionHttp = repositoryFactory.createTransactionRepository();

transactionHttp
    .announce(signedTransaction)
    .subscribe((x) => console.log(x), (err) => console.error(err));