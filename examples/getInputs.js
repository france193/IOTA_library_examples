/** GET INPUT ADDRESSES OF A SEED */

const iota = require('@iota/core');
const iota_nodes = require('../constants/iota_nodes');
const myFunctions = require('../private/myFunctions');

const node = iota_nodes.IOTA_NODE.IOTANode_04.host + ":" + iota_nodes.IOTA_NODE.IOTANode_04.port;

const api = iota.composeAPI({
    provider: node
});

myFunctions.getSeed('TEST_31').then(function (seed) {
    let options = {
        start: 0,
        end: 50,
        security: 2,
        treshold: 200000
    };

    api.getInputs(seed, options)
        .then(({inputs, totalBalance}) => {
            console.log(totalBalance);
            myFunctions.printJSON(inputs);
        })
        .catch(err => {
            if (err.message === errors.INVALID_SEED) {
                console.log("INVALID_SEED");
            } else if (err.message === errors.INVALID_SECURITY_LEVEL) {
                console.log("INVALID_SECURITY_LEVEL");
            } else if (err.message === errors.INVALID_START_OPTION) {
                console.log("INVALID_START_OPTION");
            } else if (err.message === errors.INVALID_START_END_OPTIONS) {
                console.log("INVALID_START_END_OPTIONS");
            } else if (err.message === errors.INVALID_THRESHOLD) {
                console.log("INVALID_THRESHOLD");
            } else if (err.message === errors.INSUFFICIENT_BALANCE) {
                console.log("INSUFFICIENT_BALANCE");
            } else {
                console.log("GENERIC_ERROR");
            }
        })
});
