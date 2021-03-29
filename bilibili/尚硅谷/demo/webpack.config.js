
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'dev.js',
        path: path.resolve(__dirname, 'dev')
    },
    module: {
        rules: [
            {//配置css loader
                test: /\.css$/,
                use: [
                    'style-loader', //通过js插入html到head头部style标签中
                    'css-loader' //将css文件通过commonJS模块加载到js中，里面的内容是样式字符串
                ]
            }
        ]
    },
    plugins: [

    ],
    mode: 'development' //开发模式
}