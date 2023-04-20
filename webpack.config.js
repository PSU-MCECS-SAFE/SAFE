module.exports = {
    resolve: {
        fallback: {
            crypto: false,
            stream: false,
            buffer: false,
            http: false,
            https: false,
            zlib: false,
            os: false,
            assert: false,
            events: false,
            constants: false,
            util: require.resolve('util/'),
            path: require.resolve('path-browserify'),
        },
    },
};