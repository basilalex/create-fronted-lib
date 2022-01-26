const defaultPresets =
    process.env.BABEL_ENV === 'es'
        ? []
        : [
              [
                  '@babel/preset-env',
                  {
                      bugfixes: true,
                      modules: false,
                  },
              ],
          ];

const productionPlugins = [
    '@babel/plugin-transform-react-constant-elements',
    'babel-plugin-optimize-clsx',
    ['@babel/plugin-transform-runtime', { useESModules: true }],
];

module.exports = function (api) {
    const isTest = api.env('test');

    if (isTest) {
        return {
            presets: [
                ['@babel/preset-env', { bugfixes: true, modules: 'auto' }],
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
            plugins: ['babel-plugin-optimize-clsx', ['@babel/plugin-transform-runtime', { version: '^7.16.10' }]],
        };
    }

    return {
        presets: defaultPresets.concat(['@babel/preset-react', '@babel/preset-typescript']),
        plugins: productionPlugins,
        ignore: [/@babel[\\|/]runtime/, '**/*.test.ts', '**/*.spec.ts'],
        // env: {
        //     esm: {
        //         plugins: [...productionPlugins, customPlugin],
        //     },
        //     es: {
        //         plugins: [...productionPlugins, customPlugin],
        //     },
        // },
    };
};
