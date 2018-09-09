/** GET SEED ACCOUNT DATA */

const iota = require('@iota/core');
const iota_nodes = require('../constants/iota_nodes');
const myFunctions = require('../private/myFunctions');

const node = iota_nodes.IOTA_NODE.ISMB.iotanode1.host + ":" + iota_nodes.IOTA_NODE.ISMB.iotanode1.port;

const api = iota.composeAPI({
    provider: node
});

myFunctions.getSeed('TEST_36').then(function (seed) {
    api.getAccountData(seed, {
        start: 0,
        security: 2
    }).then(accountData => {
        const {addresses, inputs, transactions, balance} = accountData;

        console.log(balance);
        // ...
    }).catch(err => {
        // ...
    });
});
