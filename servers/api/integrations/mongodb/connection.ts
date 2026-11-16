import mongoose from "mongoose";
import type { Logger } from "@workspace/logging";
import type { MongoClient, MongoDbIntegration } from "./types.js";

type MongoDbIntegrationDependencies = Readonly<{
  uri?: string;
  logger: Logger;
  client?: MongoClient;
  allowOffline?: boolean;
}>;

const mongooseClient: MongoClient = Object.freeze({
  connect: (uri: string): Promise<unknown> => mongoose.connect(uri),
  disconnect: (): Promise<void> => mongoose.disconnect()
});

export const createMongoDbIntegration = ({
  uri,
  logger,
  client = mongooseClient,
  allowOffline = false
}: MongoDbIntegrationDependencies): MongoDbIntegration => {
  if (!uri) {
    return Object.freeze({
      connect: (): Promise<void> => {
        logger.info("MongoDB connection is not configured; starting without persistence.");
        return Promise.resolve();
      },
      disconnect: (): Promise<void> => Promise.resolve()
    });
  }

  return Object.freeze({
    connect: async (): Promise<void> => {
      try {
        await client.connect(uri);
        logger.info("MongoDB connection established.");
      } catch (error) {
        if (!allowOffline) throw error;

        logger.warn("MongoDB is unavailable; API is starting without persistence.", {
          errorType: error instanceof Error ? error.name : "UnknownError"
        });
      }
    },
    disconnect: async (): Promise<void> => {
      await client.disconnect();
    }
  });
};
