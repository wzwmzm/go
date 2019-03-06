'use strict';
/*eslint-env browser, es6*/
/******global Float32Array Uint8Array  Ws :true*********/
/*eslint no-console: "off"*/

let n_fresh = 0;
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
    socket.Emit("connect","connect");
});
socket.OnDisconnect(function () {
    output1.innerHTML += "Status: Disconnected\n";
});
// read events from the server
// 客户端收信处理
socket.On("newroom", function (msg) {
    output2.innerHTML = "接收消息: " + msg + "\n";
});

//---> 建立音频数据处理节点 scriptNode
var scriptNode = audioCtx.createScriptProcessor(256, 1, 1);
//(bufferSize, numberOfInputChannels, numberOfOutputChannels);
//bufferSize, 音频数据的缓冲大小决定着回调时间间隔,可取值:256, 512, 1024, 2048, 4096, 8192, 16384
//numberOfInputChannels, 输入声道数
//numberOfOutputChannels, 输出声道数
// B, Node 的事件处理,即功能所在
// 1 * 消息(frame) = 30 * 数据
let n_frame = 0; //给发送的消息编号,一个消息包含30个数据,声音采样率4096,可以计数2百多万年
let n_b_frame = 0; //给消息内部的数据计数,满30个数据打包成一个消息发送
let frame = new Array();//frame是一个数组,也是将要发送的一个消息,满了30个数据就发送
scriptNode.onaudioprocess = function (e) {
    let inputBuffer = e.inputBuffer;
    let outputBuffer = e.outputBuffer;
    // Loop through the output channels (in this case there is only one) 
    for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
        let inputData = inputBuffer.getChannelData(channel);
        let outputData = outputBuffer.getChannelData(channel);

        //将数据从输入复制到输出,否则下一个 Node 将得不到数据
        for (var sample = 0; sample < inputBuffer.length; sample++) {
            // make output equal to the same as the input
            outputData[sample] = inputData[sample];
            // add noise to each output sample
            //outputData[sample] += ((Math.random() * 2) - 1) * 0.2; 
            frame[n_b_frame] = inputData[sample];
            n_b_frame += 1;
            //如果满一帧了就发送. 注意!!! 发送的数据长度不要超过约1000个字节,所以这里选择数组长度为30
            if (n_b_frame>=30){         //<------一次发送30个数
                //console.log(JSON.stringify(inputData));//!!!inputData解析后是带下标的,frame是不带下标的
                socket.Emit("newroom",{count: n_frame, data:frame});
                n_b_frame = 0;
                n_frame += 1;
            }
        }

    }
}

//多媒体节点装配
//---> 话筒音源
navigator.mediaDevices.getUserMedia({
        audio: true
    })
    .then(function (mediaStream) {
        //2, 另一方面用来在本地分析画波形图和频谱图
        //这个mediaStream是getUserMedia()返回的值, 可以含有多个音轨及视频
        let source = audioCtx.createMediaStreamSource(mediaStream);
        // C, Node装配连接, source 中含有解码后的音频数据
        source.connect(scriptNode);                         // 话筒音源    --> scriptNode(数据传输处理)
    
        //好象scriptNode一定还要再接输出,不然就不工作!!! 不知道为什么
        scriptNode.connect(audioCtx.createAnalyser()); 
        //scriptNode.connect(audioCtx.destination); 
        //scriptNode.connect(analyser2);                      // scriptNode --> 示波器2
        //analyser2.connect(audioCtx.destination);          // 示波器2     --> 音频输出
    })
    .catch(function (err) {
        console.log('The following gUM error occured: ' + err);
    });
