touch 1.html 创建html文件

npx webpack index.js  打包

npx webpack lesson01/index.js   webpack 默认是将dist打包到主目录的，现阶段需要手动移动

模块打包工具
webpack官方文档


{
"name": "lesson",
"version": "1.0.0",
"description": "",
// 向外暴露
"main": "lesson01/index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"author": "",
"license": "ISC",
"devDependencies": {
"webpack-cli": "^3.1.2"
},
"dependencies": {
"webpack": "^4.25.1"
}
}

npm i webpack webpack-cli -g  
全局安装
webpack -v
最好不要在全局安装webpack

npm i webpack webpack-cli -D

npm info webpack 查看历史的版本
