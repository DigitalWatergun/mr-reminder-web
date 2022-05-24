import dotenv from "dotenv";
import express from "express";
import path from "path";
import * as fs from "fs";
import { promisify } from "util";
dotenv.config();

const PORT = process.env.EXPRESS_SERVER_PORT;
const NODE_ENV = process.env.NODE_ENV;
const API_BASE_URL = process.env.API_BASE_URL;

const readFileAsync = promisify(fs.readFile);

const main = () => {
    const app = express();

    app.use("/static/", express.static(path.join(__dirname, "static")));

    app.use("*", async (req, res) => {
        let html = await readFileAsync(
            path.join(__dirname, "static/index.html"),
            "utf-8"
        );
        html = html.replace(/{{__API_BASE_URL__}}/g, API_BASE_URL);
        html = html.replace(/{{__NODE_ENV__}}/g, NODE_ENV);
        res.send(html);
    });

    app.listen(PORT, () => {
        console.log(`MR REMINDER CLIENT STARTED ON PORT ${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    });
};

void main();