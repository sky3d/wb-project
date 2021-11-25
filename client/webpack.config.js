const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devServer = (isDev) =>
    !isDev
        ? {}
        : {
              devServer: {
                  // open: true,
                  hot: true,
                  port: 4000,
                  // папка для статики если нужна
                  // contentBase: path.join(__dirname, "public"),
              },
          };

module.exports = ({ develop }) => ({
    mode: develop ? "development" : "production",
    devtool: develop ? "inline-source-map" : false,
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        // при каждом билде имя меняется, чтоб одновлялся hash
        assetModuleFilename: "assets/[hash][ext]",
    },
    
    module: {
        rules: [
            // загрузчик typescript
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                    },
                },
            },
            {
                test: /\.(png|jpg|gif|ico|woff|woff2|eot|ttf|svg)$/i,
                type: "asset/resource",
                // если надо встраиваем в тело а не отдельным файлом
                // type: "asset/inline",
                // это дело можно обыграть через ограничение размера
                // чтобы слишком большые в тело не сохранялись
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },

    resolve: {
        // чтобы в import не указывать расширение
        extensions: [".tsx", ".ts", ".js"],
    },

    plugins: [
        new HtmlWebpackPlugin({
            // в данном случае генерим из шаблона
            template: "./src/index.html",
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
        // если надо чтото переместить
        // new CopyWebpackPlugin({
        //     patterns: [{ from: "./source", to: "target" }],
        //     // можно и так тогда положет по умолчанию в output.path
        //     patterns: [{ from: "./source" }],
        // }),
    ],
    ...devServer(develop)
});
