let mongoAdapter = require('./datatools.js');

async function databaseHandle() {

    try {
        const mCnxn = await mongoAdapter.Get();

        try {
            let dbName = "testnode";
            let dbHandle = await mCnxn.db(dbName);
            return dbHandle;
        } catch (err) {
            console.log("database may not exist");
        }

    } catch (err) {
        console.log("connection failed.");
    }

}


async function simpleRead() {

    let collection = [];
    try {
        let dbHandle = await databaseHandle();
        collection  = await dbHandle.collection('myCollection').find({}).toArray();
    } catch (err) {
        console.log(err.stack);
    } finally {
        // handle will persist, no need for this.
        //await mClient.close();
    }

    let thisSet = JSON.stringify({"exes": collection});
    console.log(thisSet);
    return JSON.parse(thisSet);
}

exports.wholeSet = async function() {
    console.log('Returning everything.');
    let wholeSet = await simpleRead();
    if (wholeSet) {
        return wholeSet;
    }
    return undefined;
}

exports.about = async function() {
    let about = JSON.stringify({"about": {"version": "0.1", "modified":"2020-10-13"}})
    return JSON.parse(about)
}
