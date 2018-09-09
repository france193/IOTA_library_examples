/** GET x ADDRESSES FROM A SEED */

const iota = require('@iota/core');
const iota_nodes = require('../constants/iota_nodes');
const myFunctions = require('../private/myFunctions');

const node = iota_nodes.IOTA_NODE.IOTANode_04.host + ":" + iota_nodes.IOTA_NODE.IOTANode_04.port;

const api = iota.composeAPI({
    provider: node
});

myFunctions.getSeed('MINE_MONERO_FOR_IOTA').then(function (seed) {
    let options = {
        index: 0,
        security: 2,
        checksum: false,
        total: 20,
        returnAll: false
    };

    api.getNewAddress(seed,options)
        .then(address => {
            myFunctions.printJSON(address);
        })
        .catch(err => {
            myFunctions.printJSON(err);
        })
});
