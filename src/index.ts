import { configDotenv } from "dotenv";
configDotenv();

import express from 'express';
import path from 'node:path';
import http from 'node:http';
import { Server } from 'socket.io';
const PORT = process.env.PORT || 3000

const app = express();

app.use(express.json());
app.use(express.static(path.resolve('./public')))



import { dummyData, updateCheckbox, type dbObject } from "./db.js";
import { publisher, redis, subscriber } from "./redis-connection.js";
const server = http.createServer(app)
const io = new Server()
io.attach(server)

const CHECKBOX_KEY = 'checkboxKey'

const rateLimitingMap = new Map()


app.get('/health', (req, res) => {
    return res.json({ healthy: true, message: 'Server is healthy' })
})

async function startServer() {

    await subscriber.subscribe('updated-checkbox')

    subscriber.on("message", async (channel, message) => {
        if (channel == "updated-checkbox") {
            const data = JSON.parse(message)
            // await updateCheckbox(data.id, data.isChecked)

            io.emit("updated-checkbox", data)
        }
    })

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('checkbox-update', async (data) => {

            const lastOperationTime = await redis.get(`rateLimit:${socket.id}`)

            if (lastOperationTime) {
                const timeGap = Date.now() - parseInt(lastOperationTime)
                if (timeGap < 5.5 * 1000) {
                    socket.emit("server:error", "Too many requests!")
                    return;
                }

            }
            await redis.set(`rateLimit:${socket.id}`, Date.now())


            const existingState = await redis.get(CHECKBOX_KEY)
            if (existingState) {
                let remoteData = JSON.parse(existingState)
                remoteData = remoteData.map((item: dbObject) => item.id === data.id ? { ...item, isChecked: data.isChecked } : item)
                await redis.set(CHECKBOX_KEY, JSON.stringify(remoteData))

            } else {
                const updateData = dummyData.map((item: dbObject) => item.id === data.id ? { ...item, isChecked: data.isChecked } : item)
                await redis.set(CHECKBOX_KEY, JSON.stringify(updateData))
            }
            await publisher.publish("updated-checkbox", JSON.stringify(data))
        })
    })

    app.get('/checkboxes', async (req, res) => {
        const existingState = await redis.get(CHECKBOX_KEY)
        if (existingState) {
            let remoteData = JSON.parse(existingState)
            return res.json({ data: remoteData })
        }
        return res.json({ data: dummyData })
    })


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
