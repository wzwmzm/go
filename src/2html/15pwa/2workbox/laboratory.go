package main

import (
	"fmt"
    "strconv"
	"reflect"
    "encoding/json"
	"github.com/kataras/iris"
	"github.com/kataras/iris/websocket"
)

var roomlist map[string]string  //房间号数组roomlist[ c.ID() ] = 房间号
var n_room int                  //给新开房间记数
type message struct {
    c websocket.Connection
    roomid string
    msg *interface{}
}
var ch1 chan *message   //在c.On("newroom")中收到远方来的 msg「30」数据帧后转发给后续FFTW处理
//sudo setcap CAP_NET_BIND_SERVICE=+eip ./arm-laboratory
func main() {
    ch1 = make(chan *message, 512)
    defer close(ch1)
    
    go func(){
        //fmt.Println("hello,hello")
        for msg := range ch1 {
            c := (*msg).c
            m := (*msg).msg
            
            c.To((*msg).roomid).Emit("newroom",*m)
            
            
            //fmt.Println("go func()收到数据:", (*m).(map[string]interface{})["count"])  
            //count := (*m).(map[string]interface{})["count"]  
            //data  := (*m).(map[string]interface{})["data"].([]interface{}) 
            //_,_=count,data	
            //fmt.Printf("c.On(newroom)................%v \n", count)
            //fmt.Printf("c.On(newroom)................%v \n", data)
        }
    }()
    
	app := iris.New()

	app.StaticWeb("/", "./web")    //<------------------设定网站根目录
    //app.RegisterView(iris.HTML("./web", ".html")) 
	app.RegisterView(iris.HTML("./web", ".html").Reload(true))  
    //设定显示模板.  
    //.Reload(true)每次请求时重载模板...(开发模式)

    
    app.Get("/", func(ctx iris.Context) {
		ctx.ServeFile("./web/index.html", false) // true for gzip.
	})
	//websockets.html 是测试页而非主线.
	//主线是 INDEX.HTML->APP.JS
	app.Get("/ws", func(ctx iris.Context) {
		ctx.ServeFile("./web/websockets.html", false) // second parameter: enable gzip?
	})

	roomlist = make(map[string]string)
    n_room = 0;
	setupWebsocket(app)
    
    app.Get("/entry", func(ctx iris.Context) {
        //显示数据.
        //roomlist typeof map
        //rooms typeof []byte
        //jsonstr typeof string <------- we need this!!!
        rooms, err := json.Marshal(roomlist)
        var jsonstr_rooms string
        jsonstr_rooms = string(rooms)
        fmt.Printf("rooms ------: %v\n", jsonstr_rooms)
        if err != nil {
            fmt.Println("json.Marshal(roomlist) failed:", err)
            ctx.HTML("<b>json.Marshal(roomlist) failed!</b>")
        }else{
        ctx.ViewData("rooms", jsonstr_rooms)
        ctx.View("entry.html")
    }})
    
    app.Get("/room/{roomid:string}", func(ctx iris.Context){
        roomid := ctx.Params().Get("roomid")
        fmt.Printf("roomid-----%v", roomid)
        ctx.ViewData("roomid", roomid)
        ctx.View("getinroom.html")
    })
    


	// x2
	// http://localhost:8080
	// http://localhost:8080
	// write something, press submit, see the result.
	//app.Run(iris.TLS("192.168.2.2:443", "mycert.cer", "mykey.key")) ////<---------------
	//mycert.cer === fullchain.cer
	app.Run(iris.Addr(":8100"), iris.WithCharset("UTF-8")) 
    //app.Run(iris.TLS(":8100", "mycert.cer", "mykey.key"))
//    app.Run(iris.TLS(":443", "mycert.cer", "mykey.key"))
    //<------------------------------------------------
}

//var conn map[websocket.Connection]bool		//only record connections of "newroom"
//conn = make(map[websocket.Connection]bool)

//curl --no-buffer -H 'Connection: keep-alive, Upgrade' -H 'Upgrade: websocket' -v -H 'Sec-WebSocket-Version: 13' -H 'Sec-WebSocket-Key: websocket' http://localhost:8080/ws | od -t c      //<-----针对二进制文件
//curl --no-buffer -H 'Connection: keep-alive, Upgrade' -H 'Upgrade: websocket' -v -H 'Sec-WebSocket-Version: 13' -H 'Sec-WebSocket-Key: websocket' http://localhost:8080/ws                //<-----针对文本文件
func setupWebsocket(app *iris.Application) {
	// create our echo websocket server
	ws := websocket.New(websocket.Config{
		ReadBufferSize:  2048,
		WriteBufferSize: 2048,
		//BinaryMessages bool		//缺省值为FALSE.  以二进制数据代替UTF-8文本
		//EnableCompression bool		//当前只在"NO CONTEXT TAKEOVER"模式下才支持此属性.  只有服务器和客户端都支持压缩才管用
	})
	fmt.Println("websockets读写缓冲区各设置为2048 byte")
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
    var roomid string //要么是新开房间号,要么是进入的房间号
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

	//一个消息的组成: 协议 + 主机 + 端口 + 路由 + 房间号 + 事件号 + 消息主体
	//"SERVER"为事件编号
	//"server"会话,在app.js里传输多媒体数据用
	c.On("newroom", func(msg interface{}) {
        //fmt.Printf("c.On(newroom)...正在接收客户端数据,并发回客户端...... \n")
        
        //c.To(roomid).Emit("newroom",msg)
        ch1 <- &message{c, roomid, &msg}
		//count := msg.(map[string]interface{})["count"]             
		//data := msg.(map[string]interface{})["data"].([]interface{}) 
		//_,_=count,data	
        //fmt.Printf("c.On(newroom)................%v \n", count)
        
        //将 msg 由 string 转换成 []float
		//f64a := []byte(msg)

		//fmt.Printf(": %v \n", msg)
		//fmt.Printf("  data: %v ", msg.(map[string]interface{})["data"].(map[string]interface{})["a"])
		//fmt.Printf("  TypeOf: %v ", reflect.TypeOf(msg))
        
//采样率是44.1K, 如果希望频率分辨度是4HZ, 则采样数需要 44.1K / 4 = 11K (个)
//采样率是44.1K, 如果希望时间分辨度是10ms（通常在0.02~0.05s这样的数量级), 则采样数为 44.1K / 1000 *10 = 441 (个)
//綜上, 建立一个 11K 的采样数组, 其中440个填上采样数据, 其余填0, 对此采样数组进行FFT, 取得的结果符合频率分辨度为4HZ,时间分辨度是10ms的要求. 
//
        //我们选用的参数:
        //采样率44.1KHZ;
        //频率分辨度5HZ;采样数组长8.82K;取2的幂 = 8192;<--
        //时间分辨度约20ms;实际采样数=44.1K/1000*20=882 = 900 (1帧30个,取30帧)<--
		//count := msg.(map[string]interface{})["count"]               //float64
		//data := msg.(map[string]interface{})["data"].([]interface{}) // []float64

		//_,_=count,data
		//打印全部30个数
		//只打印其中两个数
        //fmt.Printf("count : %v\n", count)
		//fmt.Printf("data : %v   \n", data)
		//fmt.Printf("data : %v   %v\n", data[0], data[9])
		//fmt.Printf("TypeOf data: %v \n", reflect.TypeOf(data[0]))
		//fmt.Printf("TypeOf count: %v \n", reflect.TypeOf(count))
        
        //fmt.Printf("c.On(newroom)................%v \n", count)
        //c.To(roomid).Emit("newroom",msg)
		//c.Emit("newroom", data)
	})
    

    
	c.On("connect", func(msg string) {
		if msg == "newroom" {
			fmt.Printf("newroom----> %v\n", c.ID())
			//c=={<nil> 0xc4201cf680 fbf9a337-ab0d-481e-a7d6-e136803b4a96 1 false [0x8a9230] [] [] [] [] [] map[server:[0x8a8a50] newroom:[0x8a8eb0] connect:[0x8a9030] chat:[0x8a86b0] wzw:[0x8a8950]] true 0xc4201d0d80 0xc4201d0da0 0xc4201d0dc0 0xc4201623f0 [] 0xc42010e420 {0 0}}
            //c.ID()==fbf9a337-ab0d-481e-a7d6-e136803b4a96
            //conn==map[0xc42010f1e0:true 0xc42010e160:true]
            n_room = n_room + 1
            roomid = "room" + strconv.Itoa(n_room)
            roomlist[ c.ID() ] = roomid
            c.Join( roomid )
            //c.To( newroom ).Emit
            fmt.Printf("roomlist[]---%v\n", roomlist)
        
        }else {
            roomid = msg
            c.Join( msg )
        }
	})
	c.OnDisconnect(func() {
		fmt.Printf("disconnect c.OnDisconnect----> %v\n", c.ID())
        delete(roomlist, c.ID())
	})

}

//http://localhost:8080/
//http://localhost:8080/ws
