import {SymbolLedger} from '../api/ledger'
import Transport from '@ledgerhq/hw-transport-node-hid'
import {NodeUrl} from '../initialData/network'
import {RepositoryFactoryHttp, Address, NetworkType} from 'symbol-sdk'

// In this example, we are using hw-transport-node-hid protocol,
// Visit this link to reference other protocol:
// https://github.com/LedgerHQ/ledgerjs

async function importAccountFromLedger (path){
    var transport
    try {
        //Get account from ledger
        transport = await Transport.create();
        const symbolLedger = new SymbolLedger(transport, "XYM");
        const accountResult = await symbolLedger.getAccount(path);

        console.log(accountResult);
        transport.close()

        //Get information of ledger's account
        // const repositoryFactory = new RepositoryFactoryHttp(NodeUrl);
        // const accountHttp = repositoryFactory.createAccountRepository();
        
        // accountHttp
        // .getAccountInfo(Address.createFromRawAddress(accountResult.address))
        // .subscribe((accountInfo) => console.log(accountInfo), (err) => console.error(err));

    } catch (err) {
        transport.close()
        console.log(err);
    }
}

const networkType = NetworkType.TEST_NET;
const index = 0;

importAccountFromLedger(`m/44'/43'/${networkType}'/0'/${index}'`);

export {
    importAccountFromLedger as GetAccount
}



