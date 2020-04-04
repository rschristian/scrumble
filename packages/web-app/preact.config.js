import purgeCss from '@fullhuman/postcss-purgecss';
import tailwindCss from 'tailwindcss';

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
        const purgecss = purgeCss({
            content: ['./src/**/*.tsx', './src/**/*.ts', './src/**/*.scss'],
            defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        });

        const postCssLoaders = helpers.getLoadersByName(config, 'postcss-loader');
        postCssLoaders.forEach(({ loader }) => {
            const plugins = loader.options.plugins;
            plugins.unshift(tailwindCss);

            if (env.production) plugins.push(purgecss);
        });

        const css = helpers.getLoadersByName(config, 'css-loader')[0];
        css.loader.options.modules = false;

        // Sets default import to 'src/'
        config.resolve.modules.push(env.src);

        if (!env.isProd) {
            config.devServer.proxy = [
                {
                    path: '/api',
                    target: 'http://localhost:8001',
                },
            ];
        }
    },
};
