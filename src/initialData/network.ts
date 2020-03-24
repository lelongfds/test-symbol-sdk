import {
    NetworkType
} from 'symbol-sdk'

const networkType = NetworkType.TEST_NET;
const nodeUrl = 'http://api-01.ap-northeast-1.symboldev.network:3000';
// networkGenerationHash : nodeUrl/block/1
const networkGenerationHash = '44D2225B8932C9A96DCB13508CBCDFFA9A9663BFBA2354FEEC8FCFCB7E19846C'

export {
    networkType as NetworkType,
    nodeUrl as NodeUrl,
    networkGenerationHash as NetworkGenerationHash
}