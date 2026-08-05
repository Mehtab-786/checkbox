import { configDotenv } from "dotenv";
configDotenv();

import app from "./app.js";

const PORT = process.env.PORT || 3000

async function startServer() {
    await app.listen(PORT, () => {
        console.log(`Server is running on port:${PORT}`);
    });
}

startServer()
    .then(() => console.log("Server is connected successfully"))
    .catch((err) => {
        console.log("Error while connecting to server");
        process.exit(1);
    });
