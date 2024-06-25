import dotenv from "dotenv";
import cors from "cors";

import routes from "./routes";

dotenv.config();

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { createProxyMiddleware, Options } from "http-proxy-middleware";

// import { dbInit } from "./db";

interface IOptions extends Options {
  onError?: (err: Error, req: Request, res: Response) => void;
  onProxyRes?: (proxyRes: any, req: Request, res: Response) => void;
  onProxyReq?: (proxyReq: any, req: Request, res: Response) => void;
}

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(
  "/api/v2",
  createProxyMiddleware({
    target: "https://ya-praktikum.tech/api/v2",

    changeOrigin: true,
    cookieDomainRewrite: { "*": "" },

    timeout: 5000,
    // proxyTimeout: 5000,

    onProxyReq: proxyReq => {
      // Add custom headers to the proxy request
      // console.log("Proxying request:", req.method, req.url);
      // console.log("Request body:", req.body);
      proxyReq.setHeader("Origin", "http://localhost:3000");

      // if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
      //   const bodyData = JSON.stringify(req.body);
      //   proxyReq.setHeader("Content-Type", "application/json");
      //   proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
      //   proxyReq.write(bodyData);
      // }
    },

    onProxyRes: function (proxyRes) {
      // Remove wildcard and set the specific origin
      proxyRes.headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
      proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
    },

    // onError: (err, req, res) => {
    //   console.error("Proxy error:", err.message);
    //   console.error("Request URL:", req.url);
    //   console.error("Request Headers:", req.headers);
    //   res.status(500).send("Proxy error");
    // },

    logger: console,
  } as IOptions),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = Number(process.env.SERVER_PORT) || 3001;

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});

app.use("/api", routes);

// dbInit();
