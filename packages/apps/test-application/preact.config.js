export default {
    /**
     * Function that mutates the original webpack config.
     * Supports asynchronous changes when a promise is returned (or it's an async function).
     *
     * @param {object} config - original webpack config.
     * @param {object} env - options passed to the CLI.
     * @param {WebpackConfigHelpers} helpers - object with useful helpers for working with the webpack config.
     * @param {object} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
     **/
    webpack(config, env, helpers, options) {
        const css = helpers.getLoadersByName(config, 'css-loader')[0];
        css.loader.options.modules = false;

        // Sets default import to 'src/'
        config.resolve.modules.push(env.src);

        if (!env.isProd) {
            config.devServer.proxy = [
                {
                    path: '/api/v1',
                    target: 'http://localhost:8000',
                },
            ];
        }
    },
};
