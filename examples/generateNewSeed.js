/** CREATE A NEW SEED */
const randomstring = require('randomstring');

const SEED_length = 81;
const SEED_charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';

console.log(getNewSeed());

function getNewSeed() {
    return randomstring.generate({
        length: SEED_length,
        charset: SEED_charset
    });
}
