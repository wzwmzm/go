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
});
socket.OnDisconnect(function () {
    output1.innerHTML += "Status: Disconnected\n";
});
// read events from the server
// 客户端收信处理
socket.On("server", function (msg) {
    output2.innerHTML = "接收消息: " + msg + "\n";
});

//---> create Oscillator node 振荡源
let oscillator = audioCtx.createOscillator();
oscillator.type = 'sine'; // 'sine' 'square' 'sawtooth' 'triangle' 或自定义
oscillator.frequency.value = 440; // value in hertz
oscillator.start();

//---> create analyser node  示波器
let analyser1 = audioCtx.createAnalyser(); //用于振荡源
analyser1.minDecibels = -90; //为FFT数据缩放范围指定一个最小值和最大值(缺省值:-100)
analyser1.maxDecibels = -10; //为FFT数据缩放范围指定一个最小值和最大值(缺省值:-30)
analyser1.smoothingTimeConstant = 0; //默认为0.8; 
//设置为0, 则不进行平均, 而值为1意味着 "在计算值时重叠上一个缓冲区和当前缓冲区"
let analyser2 = audioCtx.createAnalyser(); //用于话筒音源
analyser2.minDecibels = analyser1.minDecibels; //为FFT数据缩放范围指定一个最小值和最大值
analyser2.maxDecibels = analyser1.maxDecibels; //为FFT数据缩放范围指定一个最小值和最大值
analyser2.smoothingTimeConstant = 0; //默认为0.8; 

//---> 建立音频数据处理节点 scriptNode
var scriptNode = audioCtx.createScriptProcessor(256, 1, 1);
//(bufferSize, numberOfInputChannels, numberOfOutputChannels);
//bufferSize, 音频数据的缓冲大小决定着回调时间间隔,可取值:256, 512, 1024, 2048, 4096, 8192, 16384
//numberOfInputChannels, 输入声道数
//numberOfOutputChannels, 输出声道数
// B, Node 的事件处理,即功能所在
let n_frame = 0; //给发送的消息帧计数,按一帧30个数,声音采样率4096,可以计数2百多万年
let n_b_frame = 0; //给消息帧的数组计数
let frame = new Array();
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
                socket.Emit("server",{count: n_frame, data:frame});
                n_b_frame = 0;
                n_frame += 1;
            }
        }

    }
}


//---> 话筒音源
navigator.mediaDevices.getUserMedia({
        audio: true
    })
    .then(function (mediaStream) {
        //2, 另一方面用来在本地分析画波形图和频谱图
        //这个mediaStream是getUserMedia()返回的值, 可以含有多个音轨及视频
        let source = audioCtx.createMediaStreamSource(mediaStream);
        // C, Node装配连接, source 中含有解码后的音频数据
        source.connect(scriptNode);
        scriptNode.connect(analyser2);
        //analyser2.connect(audioCtx.destination);
    })
    .catch(function (err) {
        console.log('The following gUM error occured: ' + err);
    });

//---> create Gain node 音量调节
let gain1 = audioCtx.createGain();
gain1.gain.value = 0; //初始音量为0

//---> audioNode 连接
oscillator.connect(analyser1);
analyser1.connect(gain1);
gain1.connect(audioCtx.destination);

//---> 作图准备
let animation; //用来暂停动画显示
let draw;

//--->  作图
function visualize() {
    let canvas1 = document.querySelector('#canvas1');
    let canvasCtx1 = canvas1.getContext('2d');
    const width1 = 1024; //<---画布的长与宽
    const height1 = 200;
    const fftsize1 = 2048; //<---必须是2的整数幂(32 to 32768)
    //默认值2048;  好象是一次返回的数据数. 在这个指定的频域里使用FFT捕获数据
    //当波形发生器频率为1000，FFTSIZE为1024时，取得了23个周期的波形，
    //（1000／23*1024=44521, 所以猜测采样率为44000
    //真实的采样率： audioCtx.sampleRate   为  44100
    let canvas2 = document.querySelector('#canvas2');
    let canvasCtx2 = canvas2.getContext('2d');
    const width2 = width1;
    const height2 = height1;
    const fftsize2 = fftsize1;

    //第一套线路,是由震荡器直接产生的原始数据
    analyser1.fftSize = fftsize1;
    let bufferLength1_w = analyser1.fftSize; //代表我们将对这个尺寸的FFT收集多少数据点
    let dataArry1_w = new Uint8Array(bufferLength1_w); //<---放置震荡源的波形数据
    let bufferLength1_f = analyser1.frequencyBinCount;
    let dataArry1_f = new window.Uint8Array(bufferLength1_f); //<---放置震荡源的频谱数据
    //第二套线路,是由麦克疯收集的反馈数据
    analyser2.fftSize = fftsize2;
    let bufferLength2_w = analyser2.fftSize; //代表我们将对这个尺寸的FFT收集多少数据点
    let dataArry2_w = new Uint8Array(bufferLength2_w); //<---放置声音源的波形数据
    let bufferLength2_f = analyser2.frequencyBinCount;
    let dataArry2_f = new window.Uint8Array(bufferLength2_f); //<---放置声音源的频谱数据


    //--->正式开始作图,设置画布大小及清屏
    canvas1.setAttribute('width', width1); //设备画布的长与宽
    canvas1.setAttribute('height', height1);
    canvasCtx1.clearRect(0, 0, width1, height1); //清屏
    canvas2.setAttribute('width', width2); //设备画布的长与宽
    canvas2.setAttribute('height', height2);
    canvasCtx2.clearRect(0, 0, width2, height2); //清屏

    //--->作图的真实内容
    draw = function () {
        animation = window.requestAnimationFrame(draw);
        n_fresh += 1;
        //指定实现的是哪个动画;animation1 每次进入值都不相同

        { //<--- 画第一块画布
            //--->画画框
            canvasCtx1.beginPath();
            canvasCtx1.fillStyle = 'white'; //'rgb(239, 239, 239)';
            canvasCtx1.fillRect(0, 0, width1, height1); //画白色背景
            canvasCtx1.lineWidth = 5;
            canvasCtx1.strokeStyle = 'black';
            canvasCtx1.strokeRect(0, 0, width1, height1); //画布黑色边框
            canvasCtx1.lineWidth = 1;
            canvasCtx1.strokeRect(width1 / 5, 0, width1 / 5, height1); //画布中间的分隔线
            canvasCtx1.strokeRect(width1 / 5 * 3, 0, width1 / 5, height1); //画布中间的分隔线
            canvasCtx1.stroke();
            //原则上每换一次笔strokeStyle(),就需要beginPath()一次
            //每次stroke()都会以现有的strokeStyle()把现有的路径都画出来, 但显示(渲染)的时机由浏览器自动决定 
            //现有路径从最近一个beginPath()开始. closePath()并不会清除以前的路径,只有beginPath()才会清除.
            //beginPath()是用来隔绝路径和strokeStyle的
            //第一个beginPath()可以不写

            let x = 0;
            let sliceWidth1_w = width1 * 1.0 / bufferLength1_w;
            analyser1.getByteTimeDomainData(dataArry1_w); //<-------------取得震荡源波形数据
            //注意!第一帧数据全部为 128. 取得的是当前的值!
            //console.log(`sliceWidth1_w = ${sliceWidth1_w}`);
            ////@@@针对频谱图的设置,变量以2结尾
            let xx = 0;
            let sliceWidth1_f = width1 * 1.0 / bufferLength1_f;
            //console.log(`sliceWidth1_f = ${sliceWidth1_f}`);
            analyser1.getByteFrequencyData(dataArry1_f); //<-------------取得震荡源频谱数据

            //--->画时域图
            canvasCtx1.beginPath();
            canvasCtx1.strokeStyle = 'blue';
            for (let i = 0; i < bufferLength1_w; i++) {
                let v = dataArry1_w[i] / 128.0;
                let y = v * height1 / 2;
                //console.log(`${i} = ${dataArry1_w[i]}`);//<-----------
                if (i === 0) {
                    canvasCtx1.moveTo(x, y);
                } else {
                    canvasCtx1.lineTo(x, y);
                }
                x += sliceWidth1_w;
            } //<--for
            canvasCtx1.lineTo(width1, height1 / 2);
            canvasCtx1.stroke();

            //--->画频域图
            canvasCtx1.beginPath();
            canvasCtx1.strokeStyle = 'red';
            for (let i = 0; i < bufferLength1_f; i++) { //bufferLength2
                let barHeight = dataArry1_f[i];
                canvasCtx1.moveTo(xx, height1); //height1-barHeight/2);
                canvasCtx1.lineTo(xx, height1 - barHeight / 2);
                xx += sliceWidth1_f;
            } //<--for
            canvasCtx1.stroke();
        } //画第一块画布

        { //<--- 画第二块画布
            //--->画画框
            canvasCtx2.beginPath();
            canvasCtx2.fillStyle = 'white'; //'rgb(239, 239, 239)';
            canvasCtx2.fillRect(0, 0, width2, height2); //画白色背景
            canvasCtx2.lineWidth = 5;
            canvasCtx2.strokeStyle = 'black';
            canvasCtx2.strokeRect(0, 0, width2, height2); //画布黑色边框
            canvasCtx2.lineWidth = 1;
            canvasCtx2.strokeRect(width2 / 5, 0, width2 / 5, height2); //画布中间的分隔线
            canvasCtx2.strokeRect(width2 / 5 * 3, 0, width2 / 5, height2); //画布中间的分隔线
            canvasCtx2.stroke();
            //原则上每换一次笔strokeStyle(),就需要beginPath()一次
            //每次stroke()都会以现有的strokeStyle()把现有的路径都画出来, 但显示(渲染)的时机由浏览器自动决定 
            //现有路径从最近一个beginPath()开始. closePath()并不会清除以前的路径,只有beginPath()才会清除.
            //beginPath()是用来隔绝路径和strokeStyle的
            //第一个beginPath()可以不写

            let x = 0;
            let sliceWidth2_w = width2 * 1.0 / bufferLength2_w;
            analyser2.getByteTimeDomainData(dataArry2_w); //<-------------取得声音源波形数据
            //注意!第一帧数据全部为 128. 取得的是当前的值!
            ////@@@针对频谱图的设置,变量以2结尾
            let xx = 0;
            let sliceWidth2_f = width2 * 1.0 / bufferLength2_f;
            analyser2.getByteFrequencyData(dataArry2_f); //<-------------取得声音源频谱数据

            //--->画时域图
            canvasCtx2.beginPath();
            canvasCtx2.strokeStyle = 'blue';
            for (let i = 0; i < bufferLength2_w; i++) {
                let v = dataArry2_w[i] / 128.0;
                let y = v * height2 / 2;
                //console.log(`dataArry2_w[${i}] = ${dataArry2_w[i]}`); //<-----------
                if (i === 0) {
                    canvasCtx2.moveTo(x, y);
                } else {
                    canvasCtx2.lineTo(x, y);
                }
                x += sliceWidth2_w;
            } //<--for
            canvasCtx2.lineTo(width2, height2 / 2);
            canvasCtx2.stroke();

            //--->画频域图
            canvasCtx2.beginPath();
            canvasCtx2.strokeStyle = 'red';
            for (let i = 0; i < bufferLength2_f; i++) { //bufferLength2
                let barHeight = dataArry2_f[i];
                canvasCtx2.moveTo(xx, height2); //height1-barHeight/2);
                canvasCtx2.lineTo(xx, height2 - barHeight / 2);
                xx += sliceWidth2_f;
            } //<--for
            canvasCtx2.stroke();
        } //画第二块画布

    } //<--draw()
    draw();
} //<--visualize1()
visualize();

//---> button1: 显示暂停键   
let button1 = document.querySelector('#button1');
button1.onclick = () => {
    //audioCtx在进入网页时是末启动的,必须在客户端人为启动
    console.log(`audioCtx状态1: ${audioCtx.state}`);
    if (audioCtx.state === 'suspended') {
        audioCtx.resume().then(() => {
            console.log(`audioCtx状态2: ${audioCtx.state}`);
        });
    }
    console.log(`audioCtx状态3: ${audioCtx.state}`);


    console.log("button1 clicked");
    if (button1.textContent === "暂停显示") {
        window.cancelAnimationFrame(animation);
        button1.textContent = "继续显示";
    } else {
        button1.textContent = "暂停显示";
        animation = window.requestAnimationFrame(draw);
    }
}

//---> button2: 频率增加键
let button2 = document.querySelector('#button2');
button2.onclick = () => {
    fr.value = fr.value * 1 + 2; //每次增加 1HZ
    if (fr.value >= 22000) fr.value = 22000;
    fr.onchange();
}

//---> button3: 频率减少键
let button3 = document.querySelector('#button3');
button3.onclick = () => {
    fr.value = fr.value * 1 - 2; //每次减少 1HZ
    if (fr.value <= 0) fr.value = 0;
    fr.onchange();
}

//---> 频谱调节
let fr = document.querySelector('#hzRange');
fr.onchange = () => {
    document.querySelector('#ffthz').innerHTML =
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;频率: ${fr.value} HZ`
    oscillator.frequency.value = fr.value; // 调整频率 
    console.log(`fr = ${oscillator.frequency.value}`);
}

//---> 音量调节
let vol = document.querySelector('#volRange');
vol.onchange = () => {
    document.querySelector('#vol').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;音量: ${vol.value}`; //显示音量值

    gain1.gain.value = vol.value / 100; //调整音量
}

//---> 显示刷新率
window.onload = function () {
    window.setInterval(() => {
        document.querySelector('#fresh_n').innerHTML = n_fresh;
        n_fresh = 0
    }, 1000);

};


/////////////////下面这段程序是用来测试传输的数据的. 
////websockets 只能传输 number string boolean json 格式的数据  
//let isNumber = function (obj) {
//    return !isNaN(obj - 0) && obj !== null && obj !== "" && obj !== false;
//};
//let isString = function (obj) {
//    return Object.prototype.toString.call(obj) == "[object String]";
//};
//let isBoolean = function (obj) {
//    return typeof obj === 'boolean' ||
//        (typeof obj === 'object' && typeof obj.valueOf() === 'boolean');
//};
//let isJSON = function (obj) {
//    return typeof obj === 'object';
//};
//
//function testEmitdata(data) {
//    let m = "";
//    let t = 0;
//    if (isNumber(data)) {
//        t = websocketIntMessageType;
//        m = data.toString();
//        console.log("isNumber(data) = true")
//    } else if (isBoolean(data)) {
//        t = websocketBoolMessageType;
//        m = data.toString();
//        console.log("isBoolean(data) = true")
//    } else if (isString(data)) {
//        t = websocketStringMessageType;
//        m = data.toString();
//        console.log("isString(data) = true")
//    } else if (isJSON(data)) {
//        //propably json-object
//        t = websocketJSONMessageType;
//        m = JSON.stringify(data);
//        console.log("isJSON(data) = true")
//    } else if (data !== null && typeof (data) !== "undefined") {
//        // if it has a second parameter but it's not a type we know, then fire this:
//        console.log("unsupported type of input argument passed, try to not include this argument to the 'Emit'");
//    }
//}
