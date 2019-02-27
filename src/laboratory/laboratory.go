package main

import (
	"fmt"
	"reflect"

	"github.com/kataras/iris"
	"github.com/kataras/iris/websocket"
)

//sudo setcap CAP_NET_BIND_SERVICE=+eip ./arm-laboratory
func main() {
	app := iris.New()

	app.StaticWeb("/", "./web") //<-----------------------设定网站根目录
	app.Get("/", func(ctx iris.Context) {
		ctx.ServeFile("./web/index.html", false) // true for gzip.
	})
	//websockets.html 是测试页而非主线.
	//主线是 INDEX.HTML->APP.JS
	app.Get("/ws", func(ctx iris.Context) {
		ctx.ServeFile("./web/websockets.html", false) // second parameter: enable gzip?
	})

	setupWebsocket(app)

	// x2
	// http://localhost:8080
	// http://localhost:8080
	// write something, press submit, see the result.
	//app.Run(iris.TLS("192.168.2.2:443", "mycert.cer", "mykey.key")) ////<---------------
	//mycert.cer === fullchain.cer
	app.Run(iris.Addr(":8100")) //<------------------------------------------------
}

//curl --no-buffer -H 'Connection: keep-alive, Upgrade' -H 'Upgrade: websocket' -v -H 'Sec-WebSocket-Version: 13' -H 'Sec-WebSocket-Key: websocket' http://localhost:8080/ws | od -t c      //<-----针对二进制文件
//curl --no-buffer -H 'Connection: keep-alive, Upgrade' -H 'Upgrade: websocket' -v -H 'Sec-WebSocket-Version: 13' -H 'Sec-WebSocket-Key: websocket' http://localhost:8080/ws                //<-----针对文本文件
func setupWebsocket(app *iris.Application) {
	// create our echo websocket server
	ws := websocket.New(websocket.Config{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		//BinaryMessages bool		//缺省值为FALSE.  以二进制数据代替UTF-8文本
		//EnableCompression bool		//当前只在"NO CONTEXT TAKEOVER"模式下才支持此属性.  只有服务器和客户端都支持压缩才管用
	})
	fmt.Println("websockets读写缓冲区各设置为1024 byte")
	ws.OnConnection(handleConnection) //这里只是设置,还没有开始响应

	// register the server on an endpoint.
	// see the inline javascript code in the websockets.html,
	// this endpoint is used to connect to the server.
	app.Get("/echo", ws.Handler()) //这个websockets是架设在ws://IP:8080/echo
	//真正的响应并不是ws.Handler(),而是 handleConnection()
	//如果要架设多个websockets服务,可以通过不同的路由设置来完成,即IP:PROT是相同的,只是后面的路由不同.
	//可以生成多个ws1 := websocket.New(),然后app.Get("/path", ws1.Handler())

	// serve the javascript built'n client-side library,
	// see websockets.html script tags, this path is used.
	app.Any("/iris-ws.js", websocket.ClientHandler()) //返回iris-ws.js文件给浏览器
	//这里是动态地获取 iris-ws.js 页以便随时更新. 将来成品时需将此页静态化
}

//https://gafans.ga/ws-->websockets.html是测试页
//响应和处理两个事件: chat    wzw
//https://gafans.ga(app.js)-->是主线程
//响应和处理事件:    server
func handleConnection(c websocket.Connection) {
	//一个消息的组成: 协议 + 主机 + 端口 + 路由 + 房间号 + 事件号 + 消息主体
	//c.ID() string		// 连接建立时的ID,也是这个连接的缺省房间号
	//c.Server() *Server// Server returns the websocket server instance
	//c.To(string) Emitter	//给指定房间发消息
	//JOIN可以加入一个STRING指定的房间,如果不存在则建立它.
	//一个房间可以有多个连接, 一个连接可以加入多个房间
	//c.Join(string)		STRING为自己定义的房间号
	//c.EMIT() 将消息发给连接时缺省建立的房间,发送给自己

	//一个消息的组成: 协议 + 主机 + 端口 + 路由 + 房间号 + 事件号 + 消息主体
	//"chat"是事件编号
	//与WEBSOCKETS.HTML对应
	c.On("chat", func(msg string) {
		// Print the message to the console, c.Context() is the iris's http context.
		fmt.Printf("%s sent: %s\n", c.Context().RemoteAddr(), msg)
		// Write message back to the client message owner with:
		c.Emit("chat", msg) //给缺省房间发消息,就是给连接本身发消息
		// Write message to all except this client with:
		c.To(websocket.Broadcast).Emit("chat", msg) //发给所有客户端除了当前客户端
	})

	//一个消息的组成: 协议 + 主机 + 端口 + 路由 + 房间号 + 事件号 + 消息主体
	//"WZW"是事件编号
	c.On("wzw", func(f64a interface{}) {
		fmt.Printf("wzw接收到二进制数....")
		//将 msg 由 string 转换成 []float
		//f64a := []byte(msg)
		fmt.Printf(": %v", f64a)
		c.Emit("wzw", f64a)
	})

	//一个消息的组成: 协议 + 主机 + 端口 + 路由 + 房间号 + 事件号 + 消息主体
	//"SERVER"为事件编号
	//"server"会话,在app.js里传输多媒体数据用
	c.On("server", func(msg interface{}) {
		fmt.Println("\nserver接收到二进制数....")
		//将 msg 由 string 转换成 []float
		//f64a := []byte(msg)

		//fmt.Printf(": %v \n", msg)
		//fmt.Printf("  data: %v ", msg.(map[string]interface{})["data"].(map[string]interface{})["a"])
		//fmt.Printf("  TypeOf: %v ", reflect.TypeOf(msg))
		count := msg.(map[string]interface{})["count"]               //float64
		data := msg.(map[string]interface{})["data"].([]interface{}) // []float64

		fmt.Printf("count : %v\n", count)
		fmt.Printf("data : %v   %v\n", data[0], data[9])
		fmt.Printf("TypeOf data: %v \n", reflect.TypeOf(data[0]))
		fmt.Printf("TypeOf count: %v \n", reflect.TypeOf(count))

		c.Emit("server", data)
	})
}

//http://localhost:8080/
//http://localhost:8080/ws
