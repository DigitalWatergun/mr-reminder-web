const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env) => {
    const config = {
        entry: {
            client: "./src/index.js",
        },
        devtool: env.mode === "development" ? "source-map" : undefined,
        mode: env.mode,
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: ["url-loader"],
                },
                {
                    test: /\.(css)$/,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
        resolve: {
            extensions: ["*", ".js", ".jsx"],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/template/index.html",
                filename: "index.html",
                publicPath: "/static/",
                favicon: "./src/static/favicon.ico",
            }),
        ],
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist/static"),
            publicPath: "/static/",
        },
    };

    return config;
};
