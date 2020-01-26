import typescript from '@rollup/plugin-typescript';

// TODO: Rollup TS 3.0.0 will gen .d.ts automatically, so watch for it https://github.com/rollup/plugins/issues/61

export default {
    input: 'src/index.tsx',
    output: {
        dir: 'dist',
        format: 'cjs'
    },
    plugins: [typescript()]
};
