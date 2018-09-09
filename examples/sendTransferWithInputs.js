/** GET INPUT ADDRESSES OF A SEED */

const iota = require('@iota/core');
const iota_nodes = require('../constants/iota_nodes');
const myFunctions = require('../private/myFunctions');

const node = iota_nodes.IOTA_NODE.IOTANode_02.host + ":" + iota_nodes.IOTA_NODE.IOTANode_02.port;

const api = iota.composeAPI({
    provider: node
});

myFunctions.getSeed('TEST_36').then(function (seed) {
    const transfers = [{
        address: 'NGDPII9JSZNCICESOLGMPVLSVALK9YCGBZGDQXWBHWJNFWKU9FZCXJUHMUDICGFCWYCCPNABUVF9LMHPCFOXEUNPZ9',
        value: 5
    }];

    const depth = 3;

    const minWeightMagnitude = 14;

    const inputs = [
        {
            "address": "YDSXFWGNVXEJHBZAGQPVKJMFZBQRDWPGEYTEIMTWFCEWGUSLQFKKPGSLVAUSPHOGBTNMPTJXCDDSLHFL9",
            "keyIndex": 0,
            "security": 2,
            "balance": 5
        }
    ];

    const options = {
        inputs: inputs
    };

    api.prepareTransfers(seed, transfers, options)
        .then(trytes => api.sendTrytes(trytes, depth, minWeightMagnitude))
        .then(bundle => {
            console.log(`Published transaction with tail hash: ${bundle[0].hash}`);
            console.log(`Bundle:\n`);
            myFunctions.printJSON(bundle);
        })
        .catch(err => {
            myFunctions.printJSON(err);
        })
});
