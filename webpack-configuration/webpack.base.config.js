// Позволяет лучше находить пути файлов
const path = require('path');
const fs = require('fs');
// Плагины
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');

// Пути до папок (архитектура проекта как таковая)
const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets',
    img: '../../img'
};

// Путь к html файлам (страницам которые пойдут в финальный прокт)
const PAGES_DIR = `${PATHS.src}/pages/`;
// TODO получаем все страницы по указанному пути
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('pug'));



let config  = {
    // Точка входа в проект
    entry: {
        // точка входа index (точек входа может быть несколько!)
        index: `${PATHS.src}/index.js`
    },

    // Точка выхода
    output: {
        //Имя файла, можно еще использовать как путь assets/js/index.ts
        filename: `assets/js/[name].js`,
        // Папка в которой будет собираться проект
        path: path.resolve(__dirname, '../dist'),
        //TODO @Kotaro Корень сервера, сборки проекта
        publicPath: ''
    },
        // TODO @Kotaro не знаю для чего
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    // TODO @Kotaro Делаем переменные глобальными
    externals: {
        paths: PATHS
    },
    // Подключаемые модули (loaders)
    module: {

        rules: [
            {
                test: /test\.js$/,
                use: 'mocha-loader',
                exclude: '/node_modules/',
            },
            {
                // какие файлы обрабатывать
                test: /\.tsx?$/,
                // лоадеры, через которые будут проходить файлы, спрва на лево
                use: ['babel-loader','ts-loader'],
                // игнорировать файлы путь ->
                exclude: '/node_modules/',
            },

            {
                test: /\.(sa|sc|c)ss$/,
                // когда обработчиков много записываются в массиве
                // use код начнет обрабатываться с самого последнего
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {path: './postcss.config.js'}
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                `${PATHS.src}/service/function.scss`,
                                //`${PATHS.src}/service/global.scss`,
                                `${PATHS.src}/service/mixins.scss`,
                                `${PATHS.src}/service/variables.scss`,
                            ],

                        }
                    }
                ],
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true,
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: `../../fonts`,
                    outputPath: `/fonts/`
                }
            },
            {
                test: /\.(img|jpe?g|gif|svg|png)?$/,
                loader: 'file-loader',
                options: {
                    name: `[name].[ext]`,
                    publicPath: `${PATHS.img}`,
                    outputPath: `/img/`
                },
            },
        ],
    },
    // Подключаемые плагины
    plugins: [
        // TODO получаем список страниц по указанному пути и делаем цикл, создавая для каждого файла свой html-webpack-plugin
        ...PAGES.map(page => new HtmlWebpackPlugin({
            // Путь к файлу
            template: `${PAGES_DIR}/${page}`,
            //Указываем как будет называться файл
            filename: `./${page.replace(/\.pug/, '.html')}`,
            // chunks: ['vendors', `${page.replace(/\.pug/, '')}`],
        })),

        // Подключаем плагин для отделения CSS кода от JS
        new MiniCssExtractPlugin({
            // Указываем имя и расположение файла
            filename: `${PATHS.assets}/css/[name].[contenthash].css`,
            // TODO указываем чанки
            chunkFilename: '[id].css',
            // ignoreOrder: false,
        }),

        new webpack.ProvidePlugin({
            "$" : 'jQuery',
            "jQuery" : "jQuery",
            "window.jQuery" : "jQuery",
        }),

        new copyWebpackPlugin([
            {
                from: `${PATHS.src}/fonts`, to: `fonts`,
                flatten: true,
                ignore: ['*.scss']
            },
            {
                from: `${PATHS.src}/components`, to: `img`,
                flatten: true,
                ignore: ['*.scss', '*.js', '*.pug']
            }
        ])
    ]
};
// Экспортируем модуль в nodeJS без этого не работает :)
module.exports = config;