'use strict';
/*eslint-env browser, es6*/
/******global Float32Array Uint8Array  Ws :true*********/
/*eslint no-console: "off"*/

//let n_fresh = 0;
let audioCtx = new(window.AudioContext || window.webkitAudioContext)();
console.log(`audioCtx状态0: ${audioCtx.state}`); //!!!此处的audioCtx是未启动的,必须在客户端由客户动作启动!!!

//--->websockets初始化
var scheme = document.location.protocol == "https:" ? "wss" : "ws";
var port = document.location.port ? (":" + document.location.port) : "";
// see app.Get("/echo", ws.Handler()) on main.go
var wsURL = scheme + "://" + document.location.hostname + port + "/echo";
//这个websockets应用是指定到服务器的 ws://IP:port/echo 的
var output1 = document.getElementById("output1");
var output2 = document.getElementById("output2");
var output3 = document.getElementById("output3");

// Ws comes from the auto-served '/iris-ws.js'
var socket = new Ws(wsURL) //一个 socket 是通过 协议 IP port 路由 四个部分组成的
socket.OnConnect(function () {
    output1.innerHTML += "Status: Connected\n";
    socket.Emit("connect", roomid);//roomid在getinroom.html中由服务器端传过来
    
    output1.innerHTML += "roomid = " + roomid + "\n";
});
socket.OnDisconnect(function () {
    output1.innerHTML += "Status: Disconnected\n";
});

// read events from the server
// 客户端收信处理
//AudioBuffer 代表内存中的一段音频数据，
//可以通过 AudioContext.createBuffer() 方法从原始数据创建,
//然后就可以被放入一个 AudioBufferSourceNode 中使用
let source = audioCtx.createBufferSource();
let Buffer = audioCtx.createBuffer(1, 30*1234, audioCtx.sampleRate);
let nowBuffering = Buffer.getChannelData(0);	// Float32Array
let n_frame = 0;
        source.buffer = Buffer;
        source.connect(audioCtx.destination);
        source.loop = true;
        source.start();
socket.On("newroom", function (msg) {
    let Datas = JSON.parse(msg);
    output2.innerHTML = "接收消息: " + Datas["count"] +"---"+ Datas["data"][3] + "\n";
    //output3.innerHTML += "Buffer = " + Buffer + "\n";

//    nowBuffering = Datas;
    for (let i = 0; i < 30; i++) {
        nowBuffering[n_frame*30+i] = Datas["data"][i];
    }
    n_frame = n_frame + 1;
    if ( n_frame>=1234 ){
        n_frame = 0;
        //source.buffer = Buffer;
        //source.connect(audioCtx.destination);
        //source.start();
        //source = audioCtx.createBufferSource();
        //Buffer = audioCtx.createBuffer(1, 30*1000, audioCtx.sampleRate);
        //nowBuffering = Buffer.getChannelData(0);
    }
});



