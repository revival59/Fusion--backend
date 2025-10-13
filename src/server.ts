import app from "./app";
import dotenv from "dotenv";
import http from "http";
import { prisma } from "./db/prisma";

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

async function start() {
  try {
    await prisma.$connect();
    server.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} in ${
          process.env.NODE_ENV || '"you forgot to add NODE_ENV you IDIOT!!"'
        } mode`
      );
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

start();

// Graceful shutdown
const shutdown = async (signal: string) => {
  console.log(`${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    console.log("HTTP server closed.");
    try {
      await prisma.$disconnect();
      console.log("Prisma disconnected.");
    } catch (err) {
      console.error("Error during prisma disconnect", err);
    } finally {
      process.exit(0);
    }
  });

  // Fallback: force exit if not closed in X ms
  setTimeout(() => {
    console.warn("Forcing shutdown.");
    process.exit(1);
  }, 30_000).unref();
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
