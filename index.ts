import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { router } from "./src/routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
