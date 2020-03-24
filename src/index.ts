import * as nacl from 'tweetnacl';
import {Convert} from 'symbol-sdk'
const privateKeyString = 'd771173cc7ffdbe79f49dc035526a8f0a86c8b9481dcc56df9d445e0f7c74ff4'
const privateKey = Convert.hexToUint8(privateKeyString);


const keyPair = nacl.sign.keyPair.fromSeed(privateKey);

console.log(Convert.uint8ToHex(keyPair.secretKey))
console.log(Convert.uint8ToHex(keyPair.publicKey));