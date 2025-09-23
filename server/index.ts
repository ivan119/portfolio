import * as mongoose from "mongoose";
import type { Nitro } from "nitropack";
export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();
  const mongo_url = config.public.MONGODB_URI;
  try {
    await mongoose.connect(mongo_url, {
      dbName: "blog", // 👈 database name
    });
  } catch (error) {
    console.log(error);
  }
};
