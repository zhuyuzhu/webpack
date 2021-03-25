var path = require('path');

module.exports = {
	entry:'./src/index.js',
    output: {
	    path: path.resolve(__dirname, 'dist'), //输出路径
	    filename: 'main.js' //输出文件名称
	},
    module:{
		rules:[
			{
				test: /\.css$/,
				use:['style-loader','css-loader']
			}
		]
	},
    mode: 'development'
}