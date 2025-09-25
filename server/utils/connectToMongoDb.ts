// server/utils/mongo.ts
import mongoose from "mongoose";

let connectPromise: Promise<typeof mongoose> | null = null;

export async function connectToMongoDb() {
  const state = mongoose.connection.readyState;
  if (state === 1) return mongoose;
  if (state === 2 && connectPromise) return connectPromise;

  const { MONGODB_URI } = useRuntimeConfig();
  if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");

  connectPromise = mongoose
    .connect(MONGODB_URI as string, {
      dbName: "blog",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 20000,
    })
    .catch((err) => {
      connectPromise = null;
      throw err;
    });

  mongoose.connection.once("disconnected", () => {
    connectPromise = null;
  });

  await connectPromise;
  console.log("✅ Connected to MongoDB");
  return mongoose;
}
