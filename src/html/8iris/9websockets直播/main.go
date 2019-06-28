package main

import (
	"fmt"

	"github.com/kataras/iris"
	"github.com/kataras/iris/websocket"
)

func main() {
	app := iris.New()

	app.Get("/", func(ctx iris.Context) {
		ctx.ServeFile("websockets.html", false) // second parameter: enable gzip?
	})

	setupWebsocket(app)

	// x2
	// http://localhost:8080
	// http://localhost:8080
	// write something, press submit, see the result.
	app.Run(iris.Addr(":8080"))
}

func setupWebsocket(app *iris.Application) {
	// create our echo websocket server
	ws := websocket.New(websocket.Config{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	})
	ws.OnConnection(handleConnection) //这里只是设置,还没有开始响应

	// register the server on an endpoint.
	// see the inline javascript code in the websockets.html,
	// this endpoint is used to connect to the server.
	app.Get("/echo", ws.Handler()) //这个websockets是架设在ws://IP:8080/echo
	//如果要架设多个websockets服务,可以通过不同的路由设置来完成,即IP:PROT是相同的,只是后面的路由不同. 可以生成多个ws1 := websocket.New(),然后app.Get("/path", ws1.Handler())
	// serve the javascript built'n client-side library,
	// see websockets.html script tags, this path is used.
	app.Any("/iris-ws.js", websocket.ClientHandler()) //返回iris-ws.js文件给浏览器
}

func handleConnection(c websocket.Connection) {
	// Read events from browser
	c.On("chat", func(msg string) {
		// Print the message to the console, c.Context() is the iris's http context.
		fmt.Printf("%s sent: %s\n", c.Context().RemoteAddr(), msg)
		// Write message back to the client message owner with:
		c.Emit("chat", msg) //回给当前客户端
		// Write message to all except this client with:
		c.To(websocket.Broadcast).Emit("chat", msg) //发给所有客户端除了当前客户端
	})
}
