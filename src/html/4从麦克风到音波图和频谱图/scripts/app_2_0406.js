'use strict';
/*eslint-env browser, es6*/
/******global Float32Array Uint8Array:true*********/
/*eslint no-console: "off"*/

let audioCtx = new(window.AudioContext || window.webkitAudioContext)();

//---> create Oscillator node 振荡源
let oscillator = audioCtx.createOscillator();
oscillator.type = 'sine'; // 'sine' 'square' 'sawtooth' 'triangle' 或自定义
oscillator.frequency.value = 440; // value in hertz
oscillator.start();

//---> create analyser node  示波器
let analyser1 = audioCtx.createAnalyser();
analyser1.minDecibels = -90; //为FFT数据缩放范围指定一个最小值和最大值
analyser1.maxDecibels = -10; //为FFT数据缩放范围指定一个最小值和最大值
analyser1.smoothingTimeConstant = 0; //默认为0.8; //设置为0, 则不进行平均, 而值为1意味着 "在计算值时重叠上一个缓冲区和当前缓冲区"

//---> create Gain node 音量调节
let gain1 = audioCtx.createGain();
gain1.gain.value = 0;//初始音量为0

//---> audioNode 连接
oscillator.connect(analyser1);
analyser1.connect(gain1);
gain1.connect(audioCtx.destination);

//---> 作图准备
let canvas1 = document.querySelector('#canvas1');
let canvasCtx1 = canvas1.getContext('2d');
let animation1; //用来暂停动画显示
let draw1;

//--->  作图
function visualize1() {
	const width1 = 1024; //<---画布的长与宽
	const height1 = 200;
	const fftsize1 = 2048; //<---必须是2的整数幂
	//默认值2048;  好象是一次返回的数据数. 在这个指定的频域里使用FFT捕获数据
	//当波形发生器频率为1000，FFTSIZE为1024时，取得了23个周期的波形，
	//（1000／23*1024=44521, 所以猜测采样率为44000
	//真实的采样率： audioCtx.sampleRate   为  44100

	analyser1.fftSize = fftsize1;
	let bufferLength1 = analyser1.fftSize; //代表我们将对这个尺寸的FFT收集多少数据点
	let dataArray1 = new Uint8Array(bufferLength1);
	////@@@针对频谱图的设置,变量以2结尾
	let bufferLength2 = analyser1.frequencyBinCount;
	let dataArray2 = new window.Uint8Array(bufferLength2);
	console.log(`bufferLength2=${bufferLength2}`);

	//--->正式开始作图,设置画布大小及清屏
	canvas1.setAttribute('width', width1); //设备画布的长与宽
	canvas1.setAttribute('height', height1);
	canvasCtx1.clearRect(0, 0, width1, height1); //清屏

	//--->作图的真实内容
	draw1 = function () {
		animation1 = window.requestAnimationFrame(draw1); //指定实现的是哪个动画;animation1 每次进入值都不相同

		//生成随机色        
		//        function bg3(){
		//             var r=Math.floor(Math.random()*256);
		//             var g=Math.floor(Math.random()*256);
		//             var b=Math.floor(Math.random()*256);
		//             return "rgb("+r+','+g+','+b+")";
		////所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
		//         }

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
		//每次stroke()都会以现有的strokeStyle()把现有的路径都画出来, 但并不一定实时显示(render), 显示的时机由浏览器自动决定 
		//现有路径从最近一个beginPath()开始. closePath()并不会清除以前的路径,只有beginPath()才会清除.
		//beginPath()是用来隔绝路径和strokeStyle的
		//第一个beginPath()可以不写

		let x = 0;	
		let sliceWidth1 = width1 * 1.0 / bufferLength1;
		analyser1.getByteTimeDomainData(dataArray1); //注意!!!第一帧数据全部为 128. 取得的是当前的值!!!
		////@@@针对频谱图的设置,变量以2结尾
		let xx = 0;		
		let sliceWidth2 = width1 * 1.0 / bufferLength2;
		analyser1.getByteFrequencyData(dataArray2);

		//--->画时域图
		canvasCtx1.beginPath();
		canvasCtx1.strokeStyle = 'blue';
		for (let i = 0; i < bufferLength1; i++) {
			let v = dataArray1[i] / 128.0;
			let y = v * height1 / 2;
			//console.log(i,"=",dataArray1[i]);
			if (i === 0) {
				canvasCtx1.moveTo(x, y);
			} else {
				canvasCtx1.lineTo(x, y);
			}
			x += sliceWidth1;
		}//<--for
		canvasCtx1.lineTo(width1, height1 / 2);
		canvasCtx1.stroke();

		//--->画频域图
		canvasCtx1.beginPath();
		canvasCtx1.strokeStyle = 'red';
		for (let i = 0; i < bufferLength2; i++) { //bufferLength2
			let barHeight = dataArray2[i];
			canvasCtx1.moveTo(xx, height1); //height1-barHeight/2);
			canvasCtx1.lineTo(xx, height1 - barHeight / 2);
			xx += sliceWidth2;
		}//<--for
		canvasCtx1.stroke();
	}//<--draw1()
	draw1();
}//<--visualize1()
visualize1();

//---> button1: 显示暂停键   
let button1 = document.querySelector('#button1');
button1.onclick = () => {
	console.log("button1 clicked");
	if (button1.textContent === "暂停显示") {
		window.cancelAnimationFrame(animation1);
		button1.textContent = "继续显示";
	} else {
		button1.textContent = "暂停显示";
		animation1 = window.requestAnimationFrame(draw1);
	}
}

//---> 频谱调节
let ffthz = document.querySelector('#hzRange');
ffthz.onchange = () => {
	document.querySelector('#ffthz').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;频率: " + ffthz.value + "HZ"; //显示频率值

	oscillator.frequency.value = ffthz.value; // 调整频率 
}

//---> 音量调节
let vol = document.querySelector('#volRange');
vol.onchange = () => {
	document.querySelector('#vol').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;音量: " + vol.value;//显示音量值

	gain1.gain.value = vol.value / 100; //调整音量
}
