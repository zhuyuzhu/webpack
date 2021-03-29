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

webpack命令：

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