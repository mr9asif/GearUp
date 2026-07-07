import dotenv from "dotenv";
dotenv.config();

import app, { startServer } from "./app";

const PORT = process.env.PORT || 5000;



app.listen(PORT, async() => {
   await startServer();
  console.log(`Server running on port ${PORT}`);
});