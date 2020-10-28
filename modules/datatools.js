let MongoClient = require('mongodb').MongoClient;

let MongoHandle = function () {
    let mCnxn = null;
    let mInstance = null;

    async function MongoConnect() {
        try {
            let dbCnxn = "mongodb://localhost:27017";
            return await MongoClient(dbCnxn, {useUnifiedTopology: true}).connect();
        } catch (err) {
            return err;
        }
    }

    async function Get() {
        try {
            mInstance++;
            console.log("Connection to mongo has been called " + mInstance + " times.");

            if (mCnxn != null) {
                console.log('Connection handle is already created.');
                return mCnxn;
            } else {
                console.log('Creating new connection handle.');
                mCnxn = await MongoConnect();
                return mCnxn;
            }
        } catch (err) {
            return err;
        }
    }

    return {Get: Get}
}
module.exports = MongoHandle();
