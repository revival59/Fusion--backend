import app from "./app";
import dotenv from "dotenv";
import http from "http";

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Start the server
server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || '"you forgot to add NODE_ENV you IDIOT!!"'
    } mode`
  );
});

// Graceful shutdown handling
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
});
