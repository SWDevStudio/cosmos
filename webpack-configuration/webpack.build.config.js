const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const buildWebpackConfig = merge(baseWebpackConfig, {
    // На конечную сборку проекта
    mode: 'production',
    // Настройки оптимизации для выноса библиотек jQuery и прочего в отдельный файл
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    // Как будет называться
                    name: 'vendors',
                    // Из какой папки
                    test: /node_modules/,
                    // Чанки (можно передать массив, на данный момент для всех)
                    chunks: 'all',
                    // TODO enforce
                    enforce: true
                }
            }
        }
    },
});

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig);
});