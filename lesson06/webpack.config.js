const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,
			use: {
				// url-loader 可以替代 file-loader的所有行为
				loader: 'url-loader',
				options: {
					// name 使用之前的名字  ext 使用之前的后缀名
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					// 限制大小 大于的生成图片，否则生成base64的图片
					limit: 10240
				}
			}
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
