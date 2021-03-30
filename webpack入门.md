# webpack入门

```shell
package name: (demo)
version: (1.0.0)
description:
entry point: (test1.js)
test command:
git repository:
keywords:
author: zhuyuzhu
license: (ISC)
About to write to D:\zhuyuzhu\webpack\demo\package.json:

{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "test1.js",
  "dependencies": {
    "webpack-cli": "^4.5.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "zhuyuzhu",
  "license": "ISC"
}

```

### 关于路径：

**路径的地方都可以使用path**

### webpack命令：

默认放入指定目录的main.js中。如果有main.js，就新建main.js。

> "webpack ./src/index.js -o ./build --mode=development"

如果不在package.json中配置webpack命令，那么需要如下使用：

> node_modules/.bin/webpack ./src/index.js -o dist/ --mode=production
>
> 如果没有dist目录，会新建dist目录



模式：webpack只能识别和打包js和json文件。production模式会压缩js和json



### webpack打包CSS

css-loader、style-loader两个包依赖

> npm i css-loader style-loader -D



配置：webpack.config.js

```js

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
```



在html中引入打包后的文件dev.js，在index入口文件的依赖树中一定要有js文件引入css文件样式，比如：

> import './index.css'

此处的import直接引入一个文件，而在index.css文件中没有使用export导出，需要查看import的该用法。



打包命令：`node_modules/.bin/webpack` 由于没有在package.json中配置命令：`webpack`的script，需要那么使用命令。这样就会默认使用webpack.config.js配置文件的配置进行打包

#### 处理less资源

依赖less和less-loader两个包，处理为 css文件

配置如下：

```js
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'//处理less为css 需要下载less和less-loader
                ]
            }
```



### webpack打包html——插件，而非loader

插件的依赖包名：html-webpack-plugin

插件地址：https://www.npmjs.com/package/html-webpack-plugin

html文件中，并没有主动去引入js资源，但是经过该插件的使用，会复制该html，并将打包输出的js文件，引入到html中。

输出目录，到上面js指定的输出目录，输出新的html文件。

如何配置，输出到指定目录中呢？

**该插件的配置项：注意看以下配置**

GitHub地址：https://github.com/jantimon/html-webpack-plugin

```js
    plugins: [
        new HtmlWebpackPlugin({  //自动inject注入打包输出的js文件
            title: 'html-webpack-plugin',
            //filename: '../htmlWP.html', //--路径和名称：相对output的js输出路径
            filename: path.resolve(__dirname, 'index1.html'), //绝对路径：输出到当前webpack.config.js文件同级目录中
            template: './index.html' //依赖的文件模板（依赖html文件中没有引入js，因为会主动注入）
        })
    ],
```

需要注意的是：输出的html文件，在不同的目录中，引入的js的路径会自动设置正确的路径。不过，为什么是defer模式呢？

```html
<script defer src="dev/dev.js"></script>
```



### webapck打包图片资源

包：url-loader 和  file-loader

github地址：https://github.com/webpack-contrib/url-loader

将图片base64处理，会减少图片请求，但是会增大体积。8——12kb以下的图片，进行base64处理

不