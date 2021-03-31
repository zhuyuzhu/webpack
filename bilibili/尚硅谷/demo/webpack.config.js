
const path = require('path');
// const {resolve} = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'dev.js',
        path: path.resolve(__dirname, 'dev'),
    },
    module: {
        rules: [
            
            {//配置css loader
                test: /\.css$/,
                use: [
                    'style-loader', //通过js插入html到head头部style标签中
                    'css-loader' //将css文件通过commonJS模块加载到js中，里面的内容是样式字符串
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'//处理less为css 需要下载less和less-loader
                ]
            },
            
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 8192, //8*1024
                        esModule:false, //不启用ES6模块加载方式，而使用commonjs模块加载方式
                        name: 'imgs/[hash].[ext]', //与output的path路径拼接
                      },
                      
                    },
                ]
            },
            {//处理html中img图片
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    esModule:false,
                }
            },
            {
                exclude: /\.(js|json|html|css|less|png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'iconfont/[hash].[ext]', //指定输出目录，拼接output的path
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({  //自动inject注入打包输出的js文件
            title: 'html-webpack-plugin',
            //filename: '../htmlWP.html', //--路径和名称：相对output的js输出路径
            filename: path.resolve(__dirname, 'index.html'), //绝对路径：输出到当前webpack.config.js文件同级目录中
            template: path.resolve(__dirname, 'src/template.html') //依赖的文件模板（依赖html文件中没有引入js，因为会主动注入）
        })
    ],
    mode: 'development', //开发模式
    devServer: {//热加载
        contentBase: path.resolve(__dirname), //指定哪个目录为本地服务器的根目录
        compress: true, //启动gzip压缩
        port: 3000, //端口号
        open: true, //默认不自动打开浏览器
    }
}