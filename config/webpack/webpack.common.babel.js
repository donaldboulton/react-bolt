import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import paths from './paths';
import rules from './rules';
import setupProxy from './setupProxy';

require('dotenv').config();

module.exports = {
    entry: paths.entryPath,
    module: {
        rules,
        setupProxy
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['*', '.js', '.scss', '.css']
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: paths.templatePath,
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
                minifyURLs: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        new webpack.DefinePlugin({
            LAMBDA_ENDPOINT: JSON.stringify(process.env.LAMBDA_ENDPOINT),
            SLACK_WEBHOOK_URL: JSON.stringify(process.env.SLACK_WEBHOOK_URL)
        })
    ]
};
