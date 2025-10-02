import app from "./app";
import dotenv from "dotenv";
import http from "http";

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});

// Graceful shutdown handling