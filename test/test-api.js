let api = require('../modules/api');

exports.wholeSetTest = async function (test) {
    let result = await api.wholeSet();
    let expectation = {exes: [{ _id: '5f593ae99b22f4f49d94c6ad', 'x': 1},
                              { _id: '5f59645df36161c9b729d96c', 'x': 202}]}
    test.deepEqual(result, expectation);
    test.done();
}