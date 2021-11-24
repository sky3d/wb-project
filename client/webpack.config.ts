import path from "path";
import { Configuration } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

// const mode:string = process.env.ENV || "development";

const config: Configuration = {
    mode: 'development',
    entry: "./src/index.tsx",
    module: {
        rules: [
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
            // {
            //     test: /\.css$/,
            //     use: {
            //         loader: "style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
            //     },
            // },
            // {
            //     test: /\.css$/i,
            //     exclude: /node_modules/,
            //     use: [
            //         "style-loader",
            //         {
            //             loader: "css-loader",
            //             options: {
            //                 modules: true,
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    devServer: {
        static: path.join(__dirname, "build"),
        compress: true,
        port: 4000,
        
    },
    
      performance: {
        hints: false
      }
    ,
    
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false,
            eslint: {
                files: "./src/**/*",
            },
        }),
    ],
};

export default config;
