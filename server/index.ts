import * as mongoose from "mongoose";
import type { Nitro } from "nitropack";
export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();
  const mongo_url = config.MONGODB_URI;
  try {
    await mongoose.connect(mongo_url as string, {
      dbName: "blog", // 👈 database name
    });
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.log(error, "Connection fails to MongoDB");
  }
};
