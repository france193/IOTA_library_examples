/** GET SEED ACCOUNT DATA */

const iota = require('@iota/core');
const unitConverter = require('@iota/unit-converter');

const iota_nodes = require('../constants/iota_nodes');
const privateJSON = require('../private/seeds');

const node = iota_nodes.IOTA_NODE.IOTANode_04.host + ":" + iota_nodes.IOTA_NODE.IOTANode_04.port;

const api = iota.composeAPI({
    provider: node
});

const SHOW_ONLY_MORE_THAN_ZERO_BALANCES = true;

const seeds = privateJSON.seeds;

console.log("> START!");
retrievePositiveBalances(seeds)
    .then(function () {
        console.log("> END!");
    });

function retrievePositiveBalances(seeds) {
    return new Promise(function (resolve, reject) {
        seeds.forEach(function (e) {
            if (e.to_be_considered) {
                getConfirmedBalance(iota, e.seed)
                    .then(function (result) {
                        let balance = Number(result);

                        if (SHOW_ONLY_MORE_THAN_ZERO_BALANCES) {
                            if (balance > 0) {
                                console.log("- " + e.name + " has " + getBalanceFormatted(balance) + " IOTA");
                            } else {
                                console.log("...searching a seed with some IOTA...");
                            }
                        } else {
                            console.log(" - " + e.name + " has " + getBalanceFormatted(balance) + " IOTA");
                        }
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }
        });
    });
}

function getConfirmedBalance(iota, seed) {
    return new Promise(function (resolve, reject) {
        const options = {
            "start": 0,	// Int - Starting key index for search.
            "end": null,	// Int - Ending key index for search.
            "security": 2,	// Int - Security level to be used for the private key / address. Can be 1,2 or 3.
            "threshold": 0	// Int - Minimum threshold of accumulated balances from the inputs that is requested.
        };

        api.getInputs(seed, options, function (error, success) {
            if (error) {
                reject(error);
            } else {
                resolve(success.totalBalance);
            }
        });
    });
}

function getBalanceFormatted(balance) {
    if (balance >= 0 && balance < 1000) {
        // iota
        return balance + " i";
    } else if (balance >= 1000 && balance < 1000000) {
        // Ki
        return unitConverter.convertUnits(balance, 'i', 'Ki') + " Ki";
    } else if (balance >= 1000000 && balance < 1000000000) {
        // Mi
        return unitConverter.convertUnits(balance, 'i', 'Mi') + " Mi";
    } else if (balance >= 1000000000 && balance < 1000000000000) {
        // Gi
        return unitConverter.convertUnits(balance, 'i', 'Gi') + " Gi";
    } else if (balance >= 1000000000000 && balance < 1000000000000000) {
        // Ti
        return unitConverter.convertUnits(balance, 'i', 'Ti') + " Ti";
    } else if (balance >= 1000000000000000) {
        // Pi
        return unitConverter.convertUnits(balance, 'i', 'Pi') + " Pi";
    }
}
