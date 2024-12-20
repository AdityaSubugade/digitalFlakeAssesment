import app from "./app";
import { connectDatabase, PORT } from "./config/config";

const startServer = async () => {
  try {
    await connectDatabase(); // Connect to the database
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
