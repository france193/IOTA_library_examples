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
        total: 30
    };

    api.getNewAddress(seed, options)
        .then(addresses => {
            console.log("Addresses created!");
            myFunctions.printJSON(addresses);

            addresses.forEach(function (e) {
                const transfers = [{
                    address: e,
                    value: 0
                }];

                const depth = 3;

                const minWeightMagnitude = 14;

                api.prepareTransfers(seed, transfers)
                    .then(trytes => api.sendTrytes(trytes, depth, minWeightMagnitude))
                    .then(bundle => {
                        console.log(`Address ${e} attached to the Tangle!`);
                        //myFunctions.printJSON(bundle);
                    })
                    .catch(err => {
                        myFunctions.printJSON(err);
                    })
            });
        })
        .catch(err => {
            myFunctions.printJSON(err);
        })
});
