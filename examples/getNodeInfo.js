const iota = require('@iota/core');
const iota_nodes = require('../constants/iota_nodes');

const node = iota_nodes.IOTA_NODE.ISMB.iotanode1.host + ":" + iota_nodes.IOTA_NODE.ISMB.iotanode1.port;

const api = iota.composeAPI({
    provider: node
});

console.log(node);

api.getNodeInfo()
    .then(function (info) {
        console.log(info);
    })
    .catch(function (err) {
        console.log(err);
    });
