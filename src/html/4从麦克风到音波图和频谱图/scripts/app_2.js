'use strict';
/*eslint-env browser, es6*/
/******global Float32Array Uint8Array:true*********/
/*eslint no-console: "off"*/

let audioCtx = new(window.AudioContext || window.webkitAudioContext)();

//////////注意!!! 下面的这一小段产生一个440HZ的方波音源
// create Oscillator node
let oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';// 'sine' 'square' 'sawtooth' 'triangle' 或自定义
oscillator.frequency.value = 440; // value in hertz
oscillator.start();

//////////注意!!! /////////////////////////////////
// create analyser node
let analyser1 = audioCtx.createAnalyser();
analyser1.minDecibels = -90;
analyser1.maxDecibels = -10;
analyser1.smoothingTimeConstant = 0.85; //0.85;
//analyser.fftSize = 2048;  //此参数在作图时设置


///////////Node 连接
oscillator.connect(analyser1);
//analyser1.connect(audioCtx.destination);  //<--声音输出开关


//////////作图!!! ////////////////////////////////
let canvas1 = document.querySelector('#canvas1');
let canvasCtx1 = canvas1.getContext('2d');
let animation1; //<-用来暂停动画显示
let draw1; 

function visualize1() {
	const width1 =  640;  //窗口的宽度，用来显示返回的数据图像
	const height1 = 100;
	const fftsize1 = 1024;//2048;  好象是一次返回的数据数
	
	canvas1.setAttribute('width', width1);
	canvas1.setAttribute('height', height1);

	analyser1.fftSize = fftsize1;
	let bufferLength1 = analyser1.fftSize;
	let dataArray1 = new Uint8Array(bufferLength1);
	
	canvasCtx1.clearRect(0, 0, width1, height1);
	
	draw1 = function(){
		
		animation1 = window.requestAnimationFrame(draw1);//指定实现的是哪个动画
		
		canvasCtx1.fillStyle = 'rgb(200,200,200)';
		canvasCtx1.fillRect(0, 0, width1, height1);
		canvasCtx1.lineWidth = 1;
		canvasCtx1.strokeStyle = 'black';
		
		analyser1.getByteTimeDomainData(dataArray1);//注意!!!第一帧数据全部为 128
		
		canvasCtx1.beginPath();
		let sliceWidth1 = width1 * 1.0 / bufferLength1;
		let x = 0;
		
		for (let i = 0; i < bufferLength1; i++){
			let v = dataArray1[i] / 128.0;
			let y = v * height1 /2;
			//console.log(i,"=",dataArray1[i]);
			if(i===0){
				canvasCtx1.moveTo(x, y);
			} else{
				canvasCtx1.lineTo(x, y);
			}
			x += sliceWidth1;
		}
		
		canvasCtx1.lineTo(width1, height1 / 2);
		canvasCtx1.stroke();
	}
	
	draw1();


}
visualize1();

///////////////button1: 显示暂停键
let button1 = document.querySelector('#button1');
button1.onclick = () => {
	console.log("button1 clicked");
	if(button1.textContent === "暂停"){
		window.cancelAnimationFrame(animation1);
		button1.textContent = "继续";
	}else{
		button1.textContent = "暂停";
		animation1 = window.requestAnimationFrame(draw1);
	}

}
