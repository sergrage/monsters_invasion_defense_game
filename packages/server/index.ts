import dotenv from "dotenv";
import cors from "cors";

import routes from "./routes";

// import ForumThread from "./models/ForumThread";

dotenv.config();

import express from "express";
import bodyParser from "body-parser";

import { dbInit } from "./db";

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = Number(process.env.SERVER_PORT) || 3001;

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});

app.use("/api", routes);

dbInit();
