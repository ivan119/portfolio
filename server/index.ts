import * as mongoose from "mongoose";
import type { Nitro } from "nitropack";
let isConnected = false;

export default async (_nitroApp: Nitro) => {
  if (isConnected) return; // reuse existing connection

  const config = useRuntimeConfig();
  const mongoUrl = config.MONGODB_URI;

  try {
    await mongoose.connect(mongoUrl as string, {
      dbName: "blog",
      // optional:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
};
