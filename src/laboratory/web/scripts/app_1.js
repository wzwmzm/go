// fork getUserMedia for multiple browser versions, for those
// that need prefixes

//本例出处及原始档说明: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
/*eslint-env browser*/
/******global Float32Array Uint8Array:true*********/
/*eslint no-console: "off"*/

navigator.getUserMedia = (navigator.getUserMedia ||
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.msGetUserMedia);



//音源1:  话筒音源
// set up forked web  context, for multiple browsers
// window. is needed otherwise Safari explodes

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var voiceSelect = document.getElementById("voice");
var source;  //话筒音源
//var stream;

// grab the mute button to use below

var mute = document.querySelector('.mute');

//set up the different audio nodes we will use for the app

var analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

var distortion = audioCtx.createWaveShaper(); //非线性失真, 给信号提供温柔的失真变形,也即非线性校正
var gainNode = audioCtx.createGain(); //音量控制节点
var biquadFilter = audioCtx.createBiquadFilter(); //滤波器,频率控制节点
var convolver = audioCtx.createConvolver(); //卷积, 两个波形叠加, 通常用来实现混响效果,即混响

//音源2:  方波
//////////注意!!! 下面的这一小段产生一个440HZ的方波音源
// create Oscillator node
//var oscillator = audioCtx.createOscillator();
//oscillator.type = 'square';
//oscillator.frequency.value = 440; // value in hertz
//oscillator.connect(audioCtx.destination);
//oscillator.start();


// 失真?
// distortion curve for the waveshaper, thanks to Kevin Ennis
// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

function makeDistortionCurve(amount) {
	var k = typeof amount === 'number' ? amount : 50,
		n_samples = 44100,
		curve = new window.Float32Array(n_samples),
		deg = Math.PI / 180,
		i = 0,
		x;
	for (; i < n_samples; ++i) {
		x = i * 2 / n_samples - 1;
		curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
	}
	return curve;
}


//音源3:  声音文件
// grab audio track via XHR for convolver node

var soundSource, concertHallBuffer;  //soundSource :声音源节点

var ajaxRequest = new XMLHttpRequest();

ajaxRequest.open('GET', 'https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg', true);

ajaxRequest.responseType = 'arraybuffer';


ajaxRequest.onload = function () {
	var audioData = ajaxRequest.response;  //<--解码前的声音数据

	audioCtx.decodeAudioData(
		audioData,
		function (buffer) {                //<--解码后的声音数据
			concertHallBuffer = buffer;
			soundSource = audioCtx.createBufferSource();
			soundSource.buffer = concertHallBuffer;     //<--以解码数据创建声音源
		},
		function (e) {
			console.log("Error with decoding audio data" + e.err);
		});

	//soundSource.connect(audioCtx.destination);
	//soundSource.loop = true;
	//soundSource.start();
};

ajaxRequest.send();


//画布
// set up canvas context for visualizer

var canvas = document.querySelector('.visualizer');
var canvasCtx = canvas.getContext("2d");

var intendedWidth = document.querySelector('.wrapper').clientWidth;

canvas.setAttribute('width', intendedWidth);

var visualSelect = document.getElementById("visual");

var drawVisual;

//main block for doing the audio recording

if (navigator.getUserMedia) {
	console.log('getUserMedia supported.');
	navigator.getUserMedia(
		// constraints - only audio needed for this app
		{
			audio: true
		},

//音源1: 话筒
		// Success callback
		function (stream) {
			source = audioCtx.createMediaStreamSource(stream);
			source.connect(analyser);
			analyser.connect(distortion);
			distortion.connect(biquadFilter);
			biquadFilter.connect(convolver);
			convolver.connect(gainNode);
			gainNode.connect(audioCtx.destination);

			visualize();
			voiceChange();

		},

		// Error callback
		function (err) {
			console.log('The following gUM error occured: ' + err);
		}
	);
} else {
	console.log('getUserMedia not supported on your browser!');
}

//作图
function visualize() {
	var WIDTH = canvas.width;
	var HEIGHT = canvas.height;


	var visualSetting = visualSelect.value;
	console.log(visualSetting);

	if (visualSetting == "sinewave") { //画波形图
		analyser.fftSize = 2048;
		var bufferLength = analyser.fftSize;//频谱为半值
		console.log(bufferLength);
		var dataArray = new window.Uint8Array(bufferLength);

		canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

		var draw = function () {

			drawVisual = requestAnimationFrame(draw);

			analyser.getByteTimeDomainData(dataArray); //取得的时域数据存放在dataArray中

			canvasCtx.fillStyle = 'rgb(200, 200, 200)';
			canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

			canvasCtx.lineWidth = 2;
			canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

			canvasCtx.beginPath();

			var sliceWidth = WIDTH * 1.0 / bufferLength;
			var x = 0;

			for (var i = 0; i < bufferLength; i++) {

				var v = dataArray[i] / 128.0;
				var y = v * HEIGHT / 2;

				if (i === 0) {
					canvasCtx.moveTo(x, y);
				} else {
					canvasCtx.lineTo(x, y);
				}

				x += sliceWidth;
			}

			canvasCtx.lineTo(canvas.width, canvas.height / 2);
			canvasCtx.stroke();
		};

		draw();

	} else if (visualSetting == "frequencybars") { //画功率谱,指频率-能量的关系图,而非频率-幅度的关系图
		analyser.fftSize = 256;
		var bufferLengthAlt = analyser.frequencyBinCount;
		console.log(bufferLengthAlt);
		var dataArrayAlt = new window.Uint8Array(bufferLengthAlt);
		canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

		var drawAlt = function () {
			drawVisual = requestAnimationFrame(drawAlt);

			analyser.getByteFrequencyData(dataArrayAlt); //取得频率谱数据存放在dataArrayAlt中

			canvasCtx.fillStyle = 'rgb(0, 0, 0)';
			canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

			var barWidth = (WIDTH / bufferLengthAlt) * 2.5;
			var barHeight;
			var x = 0;

			for (var i = 0; i < bufferLengthAlt; i++) {
				barHeight = dataArrayAlt[i];

				canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
				canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

				x += barWidth + 1;
			}
		};

		drawAlt();

	} else if (visualSetting == "off") {
		canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
		canvasCtx.fillStyle = "red";
		canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
	}

}

function voiceChange() {

	distortion.oversample = '4x';
	biquadFilter.gain.value = 0; //var paramRef = param.setTargetAtTime(target, startTime, timeConstant);
	convolver.buffer = undefined;

	var voiceSetting = voiceSelect.value;
	console.log(voiceSetting);

	if (voiceSetting == "distortion") {
		distortion.curve = makeDistortionCurve(400);
	} else if (voiceSetting == "convolver") {  
		convolver.buffer = concertHallBuffer;     //混入声音文件源
	} else if (voiceSetting == "biquad") {
		biquadFilter.type = "lowshelf";
		biquadFilter.frequency.value = 1000;
		biquadFilter.gain.value = 25;
	} else if (voiceSetting == "off") {
		console.log("Voice settings turned off");
	}

}

// event listeners to change visualize and voice settings

visualSelect.onchange = function () {
	window.cancelAnimationFrame(drawVisual);
	visualize();
};

voiceSelect.onchange = function () {
	voiceChange();
};

mute.onclick = voiceMute;

function voiceMute() {
	if (mute.id === "") {
		gainNode.gain.value = 0;
		mute.id = "activated";
		mute.innerHTML = "Unmute";
	} else {
		gainNode.gain.value = 1;
		mute.id = "";
		mute.innerHTML = "Mute";
	}
}