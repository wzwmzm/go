官方实例,在线运行:https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element

录音的整个流程:1,getUerMedia-->2,获得mediaStream-->3,录音装配MediaRecorder(mediaStream)-->4,监听mediaRecorder.ondataavailable-->
	5,将前面监听事件包含的数据保存chunks.push(e.data)-->6,new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' })-->
	7,window.URL.createObjectURL(blob)-->8,audio.src = audioURL

方法2, 从getUerMedia获得stream后,建立audioCtx.createMediaStreamSource(stream),再通过AudioNode的方法处理音频数据.

一, 获取视频音频流:
<video id="video" autoplay></video>

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
navigator.mediaDevices.getUserMedia({ audio: true, video: true })
	.then(function(mediaStream) {        //mediaStream中即为从麦克风和摄像头中取得的音视频流
		var video = document.querySelector('video');
  		video.srcObject = mediaStream;//将取得的音视频流与video组件挂钩以播放
  		video.onloadedmetadata = function(e) {
		    video.play();
		};
	})
	.catch(function(err) { console.log(err.name); }); // always check for errors at the end.

二, 录制Audio
方法1, 使用MediaRecorder接口,简单方便，但是比较新，浏览器的兼容性有限。(chrome浏览器可用)
(API说明 https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API)
(完整实例 https://github.com/mdn/web-dictaphone)
<button class="record">Record</button>
var record = document.querySelector('.record');
/////开始录制
var mediaRecorder = new MediaRecorder(mediaStream);
record.onclick = function() {
  	mediaRecorder.start();
  	console.log(mediaRecorder.state);
  	console.log("recorder started");
}
////录音数据的处理及结束
var chunks = [];  //这里将存放取得的音频数据

mediaRecorder.onstop = function(e) {            //录音结束
	console.log("data available after MediaRecorder.stop() called.");

    	var audio = document.createElement('audio');
    	audio.controls = true;
    	var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });//chunks-->blob
    	var audioURL = window.URL.createObjectURL(blob);
    	audio.src = audioURL;
    	console.log("recorder stopped");
}

mediaRecorder.ondataavailable = function(e) {   //每次chunks满了就会触发本事件处理
    chunks.push(e.data);                          //e.data为即时数据,这里只是简单地添加到chunks中
}                                               //真正的实时数据处理可以放在这里进行
/////另一种录音开始及结束方式,即定时方式
mediaRecorder.start(1000);  //设定时长
mediaRecorder.requestData(); //取得数据并处理
mediaRecorder.stop();//结束


方法2, 使用AudioNodes(https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioNode-section)
此方法烦锁,不到万不得已不用.
1. 通过getUserMedia获取视频音频流。
2. 通过createMediaStreamSource创建MediaStreamAudioSourceNode。
if (navigator.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.getUserMedia (
      // constraints: audio and video for this app
      {
         audio: true,
         video: true
      },
 
      // Success callback
      function(stream) {
         video.srcObject = stream;
         video.onloadedmetadata = function(e) {
            video.play();
            video.muted = 'true';
         };
 
         // Create a MediaStreamAudioSourceNode
         // Feed the HTMLMediaElement into it
         var source = audioCtx.createMediaStreamSource(stream);
 
      },
 
      // Error callback
      function(err) {
         console.log('The following gUM error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}
3. 链接AudioNodes。创建ScriptProcessorNode。通过onaudioprocess来获取音频数据。
var scriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
 
scriptNode.onaudioprocess = function(audioProcessingEvent) {
  // The input buffer is the song we loaded earlier
  var inputBuffer = audioProcessingEvent.inputBuffer;
 
  // Loop through the output channels (in this case there is only one)
  for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
    var inputData = inputBuffer.getChannelData(channel);
  }
}
 
source.connect(scriptNode);
scriptNode.connect(audioCtx.destination);
4. 通过XHR或者WebSockets来发送blob数据。


















































