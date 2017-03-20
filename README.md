# React新项目构建

这是一个React应用的项目Demo，涉及到的技术方案有React、React-Router、gulp、webpack 2、Koa 2等。

## 项目结构

```
|- dist/
|- server
|- src/
    |- sass/
    |- images/
    |- js/
        |- utils/
    |- routes/
    |- views
        |- index.html
|- node_modules/
|- gulpfile.js
|- .babelrc
|- packge.json
```

## 安装依赖

```shell
npm install
```

## 配置Nginx

```nginx
server {
    listen 80;
	server_name react-dev.thinktxt.com;

	location / {
		proxy_pass http://localhost:8081;
	}
}

server {
    listen 80;
	server_name static.react.thinktxt.com;

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

启动后在浏览器输入：`http://react-dev.thinktxt.com/`即可访问。

## 发布

```shell
gulp release
```

执行后在`dist`目录可以查看静态资源。
