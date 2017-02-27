# React新项目构建

这是一个React应用的项目Demo，涉及到的技术方案有React、React-Router、gulp、webpack 2、Koa 2等。

## 项目结构

```
|- src/
    |- sass/
    |- images/
    |- js/
    |- js/utils/
    |- js/index.js
    |- routes/
|- dist/
|- index.html
|- gulpfile.js
|- node_modules/
|- packge.json
```

## 安装依赖

```shell
npm install
```

## 配置Nginx

```nginx
server {
	server_name react-dev.thinktxt.com;
	listen 80;

	location / {
		proxy_pass http://localhost:8081;
	}
}

server {
	server_name static.react.thinktxt.com;
	listen 80;

	location / {
		proxy_pass http://localhost:8080;
	}
}
```

## 配置Host

```
127.0.0.1 react-dev.thinktxt.com
127.0.0.1 static.react.thinktxt.com
```

## 构建

```shell
gulp server
```

## 开启Node服务

```shell
node server/start.js
```

启动后在浏览器输入：`http://react-dev.thinktxt.com/`
