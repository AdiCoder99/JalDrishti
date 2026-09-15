import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
const databaseName = process.env.MONGO_DB_NAME || "jaldristi";
let client;

let databasePromise;

const getDatabase = async () => {
  if (!mongoUri) {
    throw new Error("MONGO_URI or MONGODB_URI must be configured for simulation jobs.");
  }
  if (!databasePromise) {
    client = new MongoClient(mongoUri, {
      maxPoolSize: 10,
      minPoolSize: 0,
      maxIdleTimeMS: 300000,
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 5000,
    });
    databasePromise = client.connect().then(() => client.db(databaseName));
  }
  return databasePromise;
};

const getJobsCollection = async () => {
  const database = await getDatabase();
  return database.collection("simulation_jobs");
};

const closeMongo = async () => {
  databasePromise = undefined;
  await client.close();
};

export { closeMongo, getDatabase, getJobsCollection };
