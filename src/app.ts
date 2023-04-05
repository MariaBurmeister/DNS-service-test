import express, { Request, Response } from "express";
import config from "config";
import { log, connect } from "./utils";
import { routes } from "./routes";

const app = express();

const PORT = config.get<number>("port") || 3000;

app.get("/health", (request: Request, response: Response) => {
  response.send("OK");
});

// app.get(
//   "/lookup/:qname/:qtype",
//   async function (request: express.Request, response: express.Response) {
//     return response.json({ result: false });
//   }
// );

app.listen(PORT, async () => {
  log.info(`Server alive and listening on: http://localhost:${PORT}`);
  await connect();
  routes(app);
});
