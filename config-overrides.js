const webpack = require('webpack');

module.exports = function override(config) {
    if (!config.resolve) {
        config.resolve = {};
    }

    config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        vm: require.resolve('vm-browserify'),
    };

    config.plugins = [
        ...(config.plugins || []),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser',
        }),
    ];

    return config;
};
