const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongo;
// connect to db
module.exports.connect = async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}


// disconnect and close connection
module.exports.closeDatabase = async () => {
    if (mongo) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongo.stop();
    }
    
}

// clear the db, remove all data
module.exports.clearDatabase = async () => {
    if (mongo) {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
}