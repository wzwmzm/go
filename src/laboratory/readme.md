main.go
    设置网站静态路由 http://localhost:8080 --> ./html/          (!!!动态更新,但是以文件的时间戳为准!!!)
	设置路由 http://localhost:8080       --> ./html/index.html
	设置路由 http://localhost:8080/ws    --> ./html/websockets.html
	curl --no-buffer -H 'Connection: keep-alive, Upgrade' -H 'Upgrade: websocket' -v -H 'Sec-WebSocket-Version: 13' -H 'Sec-WebSocket-Key: websocket' http://localhost:8080/ws | od -t c
	设置路由 http://localhost:8080/echo  --> handleConnection()
	c.On("chat", func(msg string) {...})       -->接收
	c.Emit("chat", msg)                        -->发送
	c.To(websocket.Broadcast).Emit("chat", msg)-->发送(广播)
	
websockets.html
	升级到 ws: 并对路由 /echo 发送请求 
	socket.Emit("chat", input.value);          -->发送
	socket.On("chat", function (msg) {...});   -->接收