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
    

//有两条装配路径, 
							    // 这里是路径1,---> 话筒音源
        source.connect(scriptNode);                         // 话筒音源    --> scriptNode(数据传输处理)
        scriptNode.connect(analyser2);                      // scriptNode --> 示波器2
        //analyser2.connect(audioCtx.destination);          // 示波器2     --> 音频输出
//
                                                            // 这里是路径2,---> audioNode 连接
oscillator.connect(analyser1);                              // 振荡源  --> 示波器1
analyser1.connect(gain1);                                   // 示波器1 --> 放大器
gain1.connect(audioCtx.destination);                        // 放大器  --> 音频输出
//////////////////////////////////////////////////////////////
app.js  音频数据的流转
    navigator.mediaDevices.getUserMedia({
            audio: true
        })
        .then(function (mediaStream) {
            //1, 产生的数据一方面直接发送到服务器
            let mediaRecorder = new MediaRecorder(mediaStream); //<------去录音或回传到服务器端进行分析处理
            mediaRecorder.start(20);    //20为触发 ondataavailable 事件的时间间隔
            mediaRecorder.ondataavailable = function(e) {
                chunks.push(e.data);    //e.data 即为声音数据
            }
            //2, 另一方面用来在本地分析画波形图和频谱图
            //这个mediaStream是getUserMedia()返回的值, 可以含有多个音轨及视频
            let source = audioCtx.createMediaStreamSource(mediaStream);
            //<--- source 中含后解码后的音频数据
            source.connect(analyser2); //
        })
