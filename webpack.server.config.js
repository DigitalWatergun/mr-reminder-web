const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = (env) => {
    const config = {
        entry: {
            server: "./src/server/index.js",
        },
        mode: env.mode,
        target: "node",
        externals: [nodeExternals()],
        module: {},
        plugins: [],
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
        },
    };

    return config;
};
