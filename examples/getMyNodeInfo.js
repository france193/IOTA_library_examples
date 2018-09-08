const iota = require('@iota/core');
const iota_nodes = require('../constants/iota_nodes');

const node0 = iota_nodes.IOTA_NODE.ISMB.iotanode0.host + ":" + iota_nodes.IOTA_NODE.ISMB.iotanode0.port;
const node1 = iota_nodes.IOTA_NODE.ISMB.iotanode1.host + ":" + iota_nodes.IOTA_NODE.ISMB.iotanode1.port;
const node2 = iota_nodes.IOTA_NODE.ISMB.iotanode2.host + ":" + iota_nodes.IOTA_NODE.ISMB.iotanode2.port;

const api0 = iota.composeAPI({provider: node0});
const api1 = iota.composeAPI({provider: node1});
const api2 = iota.composeAPI({provider: node2});

getMyNodeInfo(api0, "ISMB - iotanode0 (v)");
getMyNodeInfo(api1, "ISMB - iotanode1");
getMyNodeInfo(api2, "ISMB - iotanode2");

function getMyNodeInfo(api, nodeName) {
    return new Promise(function (resolve, reject) {
        api.getNodeInfo()
            .then(function (info) {
                let sync = (Number(info.latestMilestoneIndex) / Number(info.latestSolidSubtangleMilestoneIndex)) * 100;

                let string = "NODEINFO" +
                    "\n - Node: " + nodeName +
                    "\n - IRI: " + info.appVersion +
                    "\n - Tangle Milestone: " + info.latestMilestoneIndex +
                    "\n - Subtangle Milestone: " + info.latestSolidSubtangleMilestoneIndex +
                    "\n - Synchronization: " + sync + " %" +
                    "\n---------------------------------------\n";

                console.log(string);
            })
            .catch(function (err) {
                reject(err);
            });
    });
}

