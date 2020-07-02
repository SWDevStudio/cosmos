// Подключаем встроенные функции wepback
const webpack = require('webpack');
// Подключаем плагин для слияния конфигов
const merge = require('webpack-merge');
// Получаем путь до базового конфига
const baseWebpackConfig = require('./webpack.base.config');
// Сливаем настройки dev + base через метод merge
const devWebpackConfig = merge(baseWebpackConfig, {
    // Мод разработки
    mode: 'development',
    // Карта проекта
    devtool: 'cheap-module-eval-source-map',
    // Настройки сервера
    devServer: {
        // Порт сервера
        port: 8081,
        // Показывает ошибки на экране
        overlay: true,
        //TODO Папка сервера работает с html-webpack-plugin
        contentBase: baseWebpackConfig.externals.paths.dist,
    },
    // Плагины
    plugins: [
        // Подлключение карты проекта
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ],
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
});