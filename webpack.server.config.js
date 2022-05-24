const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = (env) => {
    const config = {
        entry: {
            server: "./src/server/index.js",
        },
        mode: env.mode,
        target: "node",
        externals: [nodeExternals()],
        module: {},
        plugins: [new NodemonPlugin()],
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
        },
    };

    return config;
};
