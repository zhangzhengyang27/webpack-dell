## 初识webpack

mac命令行创建文件

```js
touch 1.html 创建html文件
```

```html
<!-- index.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>这是我们最原始的页面</title>
</head>
<body>
<p>这是我们的页面</p>
<!-- 运行 npx webpack index.js 命令打包-->
<div id='root'></div>
<script src='dist/main.js'></script>
</body>
</html>
```

```js
// content.js
function Content() {
    var dom=document.getElementById('root');
    var content=document.createElement('div');
    content.innerText="content";
    dom.append(content);
}

export default Content;
```

```js
// header.js
function Header(){
    var dom=document.getElementById('root');
    var header=document.createElement('div');
    header.innerText='header';
    dom.append(header)
}

export default Header
```

```js
// sidebar.js
function Sidebar(){
    var dom=document.getElementById('root');
    var sidebar=document.createElement('div');
    sidebar.innerText='sidebar'
    dom.append(sidebar)
}
export default Sidebar;
```

```js
// index.js
// 使用ES Module 模块引入方式，浏览器不识别import语法

import Header from "./header";
import Content from "./content";
import Sidebar from "./sidebar";

// var Header = require('./header.js');
// var Sidebar = require('./sidebar.js');
// var Content = require('./content.js');

new Header();
new Sidebar();
new Content();
```

npx webpack index.js 打包

![image-20220530143446724](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220530143446724.png)

## 模块的导入导出

ES Moudule 模块引入方式

```js
// 导出
export default Content;
export default Header
export default Sidebar;

// 导入
import Header from "./header";
import Content from "./content";
import Sidebar from "./sidebar";

new Header();
new Sidebar();
new Content();
```

CommonJS 模块引入规范

```
module.exports = Content;
module.exports = Header;
module.exports = Sidebar;

var Header = require('./header.js');
var Sidebar = require('./sidebar.js');
var Content = require('./content.js');

new Header();
new Sidebar();
new Content();
```

## 安装

```js
// 全局安装
npm i webpack webpack-cli -g  

// 查看版本
webpack -v

// 最好不要在全局安装webpack
npm i webpack webpack-cli -D

// 查看历史的版本
npm info webpack 
```

## webpack.config.js 

Webpack.config.js 文件必须要放到根目录才可以

```js
const path = require('path');

module.exports = {
	// 模式 production打包出的代码是一行显示的 压缩
	mode: 'development', // 未压缩
	// 入口
	entry: {
		main: './src/index.js'
	},
	// 出口 打包的目录和文件名称 输出到bundle/bundle.js
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'bundle')
	}
}
```

修改webpack打包的配置文件 (指定任意文件)

```js
// 使用webpackrename.js打包的配置
npx webpack --config webpackrename.js
```

## file-loader、url-loader

使用file-loader可以处理图片数据

```js
// webpack.config.js
const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.jpg$/,
			use: {
				loader: 'file-loader'
			} 
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
```

![image-20220530151342251](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220530151342251.png)

使用 url-loader 可以可以替代 file-loader 的所有行为

```js
// webpack.config.js
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
          // 存放的文件夹
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
```

![image-20220530151919772](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220530151919772.png)

## css相关的加载loader

style-loader、css-loader、sass-loader、postcss-loader

```js
// index.js
import avatar from './avatar.jpg';
import './index.scss';

var img = new Image();
img.src = avatar;
img.classList.add('avatar');

var root = document.getElementById('root');
root.append(img);
```

```scss
// index.scss
body {
	.avatar {
		width: 150px;
		height: 150px;
		transform: translate(100px, 100px);
	}
}
```

```js
// postcss.config.js
module.exports = {
  plugins: [
  	require('autoprefixer')
  ]
}
```

处理scss\css

```js
const path = require('path');

const use = {
	loader: 'url-loader',
	options: {
		name: '[name]_[hash].[ext]',
		outputPath: 'images/',
		limit: 10240
	}
};
module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,
			use: use
		},{
			// css-loader 处理多个css文件之间的引用、style-loader 将生成好的css挂载到页面上
			test: /\.scss$/,
			use: [
				'style-loader',
				'css-loader',
				'sass-loader',
				'postcss-loader'
			]
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
```

![image-20220530153102491](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220530153102491.png)

scss里面再引入sass，需要配置然后重新打包

```js
// webpack.config.js
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
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			}
		},{
			test: /\.scss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						// scss里面再引入sass，需要配置然后重新打包
						importLoaders: 2,
						// 解决模块之间样式冲突的问题
						modules: true
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
```

![image-20220530153652872](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220530153652872.png)

## 处理font字体

使用file-loader处理font字体图标

```js
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
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}, {
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
```

![image-20220530154216664](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220530154216664.png)



## plugin

plugin可以在webpack运行到某个时候的时候，帮你做一些事情

htmlWebpackPlugin 会在打包结束后，自动生成一个html文件，并把打包后生成的js自动引入html中

CleanWebpackPlugin 不是官方推荐的插件,会删除dist文件目录

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}, {
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}]
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'src/index.html'
	}), new CleanWebpackPlugin(['dist'])],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
```

![image-20220530154832861](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220530154832861.png)



## 多入口配置

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js',
		sub: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			}
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			}
		}, {
			test: /\.scss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}]
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'src/index.html'
	}), new CleanWebpackPlugin(['dist'])],
	output: {
		// 打包的前缀
		publicPath: 'http://cdn.com.cn',
		// 不填写filename 则默认是main.js
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
}
```

![image-20220530155511067](https://interview-aliyun.oss-cn-beijing.aliyuncs.com/myBlog/image-20220530155511067.png)



webpack 文档

出错时可以查看源代码，做源代码与生成代码的映射
devtool 就是配置source-map
推荐使用的devtool配置
development devtool: 'cheap-module-eval-source-map',
production devtool: 'cheap-module-source-map',
inline- 将source-map放到打包后的js文件中，不新增一个js
cheap- 只显示行信息，不显示列信息
module- loader里面的错误
eval- 执行代码，提高执行效率

dev-serve的三种配置方法
1、packag.json中配置scripts  "watch": "webpack --watch",
"scripts": {
"bundle": "webpack",
"watch": "webpack --watch",
"start": "webpack-dev-server",
"server": "node server.js"
},
2、webpack-dev-server方法 ，需要安装webpack-dev-server插件  "start": "webpack-dev-server",
比第一种方法好在，可以自动打开浏览器，并且更新后，自动刷新浏览器,打包好的dist文件目录放在内存里面
"scripts": {
"bundle": "webpack",
"watch": "webpack --watch",
"start": "webpack-dev-server",
"server": "node server.js"
},
3、早期的vue版本
安装express webpack-dev-middleware 插件
新建serve.js文件，自己搭建服务器

*整理文档 documentation - guides development

热更新就是只渲染修改的代码，而不是全部刷新渲染
配置：weback.config.js
1、引入webpack
const webpack = require('webpack');
2、修改devServer
devServer: {
contentBase: './dist',
open: true,
port: 8080,
hot: true,
hotOnly: true
},
3、添加plugins
plugins: [
new HtmlWebpackPlugin({
template: 'src/index.html'
}),
new CleanWebpackPlugin(['dist']),
new webpack.HotModuleReplacementPlugin()
],
*整理文档 documentation - guides Hot Module Replacement(HMR)

使用babel处理ES6语法
1、npm install @babel/preset-env --save-dev
2、webPack配置
module: {
rules: [
{
test: /\.m?js$/,
exclude: /node_modules/,
use: {
loader: "babel-loader",
options: {
presets: ['@babel/preset-env']
}
}
}
]
}
3、npm install @babel/preset-env --save-dev
4、新建.babelrc的文件 放babel的配置信息
配置信息"useBuiltIns": "usage" 可以有选择的打包，减少打包后的文件大小 只会注入我们使用的语法特性
{
"presets": ["@babel/preset-env"]
}

@babel/polyfill（在window对象上绑定了一些新的属性，例如promise） 打包的时候会污染全局环境；如果写一个库的是时候需要使用@babel/plugin-transform-runtime

babel 配置react打包 查看babel的官网

"useBuiltIns": "usage" 就`没有必要在每一个文件中引入 import "@babel/polyfill";

// Tree Shaking 只支持 ES Module ,ES Module是动态的引入
import { add } from './math.js';

在webpack.config.js中的配置
optimization: {
usedExports: true
},
在package.json文件中配置,关闭副作用
"sideEffects": false,

打包后的结果，下面并没有真正的删除Tree Shaking ,因为我们现在是处于开发的环境，如果是production环境则会真正的Tree Shaking掉多余的代码
/*! exports provided: add, minus */
/*! exports used: add */

在production环境下，都不用配置
optimization: {
usedExports: true
},
但是package.json里面的配置还是需要的

Development 和Production的模式区分打包
1、sourceMap

新建build文件夹
"webpack-merge": "^4.1.5" 需要安装合并的插件包
"dev": "webpack-dev-server --config ./build/webpack.dev.js",
"build": "webpack --config ./build/webpack.prod.js"

codeSplitting
打包文件会很大，加载时间会很长
将外部插件打包进我们自己的js，我们稍微修改，再打包，用户要重新加载js,拆分开来是存在缓存的
代码分割，和webpack无关
webpack中实现代码分割，两种方式

1. 同步代码： 只需要在webpack.common.js中做optimization的配置即可
   optimization: {
   splitChunks: {
   chunks: 'all'
   }
   },
   生成vendors~main.js文件
2. 异步代码(import): 异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中  "babel-plugin-dynamic-import-webpack": "^1.1.0",
会把loadsh打包成0.js





