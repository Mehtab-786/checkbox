import { configDotenv } from "dotenv";
import http from 'node:http';
import { Server } from 'socket.io';
configDotenv();

import { dummyData, updateCheckbox } from "./db.js";
import app from "./app.js";
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.emit("initial-data", dummyData)

    socket.on('checkbox-update', async (data) => {

        await updateCheckbox(data.id, data.isChecked)

        socket.broadcast.emit('updated-checkbox', data)

    })



})


const PORT = process.env.PORT || 3000

async function startServer() {
    await server.listen(PORT, () => {
        console.log(`Server is running on port:${PORT}`);
    });
}

startServer()
    .then(() => console.log("Server is connected successfully"))
    .catch((err) => {
        console.log("Error while connecting to server", err);
        process.exit(1);
    });
