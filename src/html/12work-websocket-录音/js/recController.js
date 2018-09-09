var onFail = function(e) {
    console.log('Rejected!', e);
};
                               
var onSuccess = function(s) {
    var context = new webkitAudioContext();
    var mediaStreamSource = context.createMediaStreamSource(s);
    rec = new Recorder(mediaStreamSource, channels);
    sampleRate = 8000;
}
                               
                               
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
                               
var rec;
var intervalKey = null;
var audio = document.querySelector('#audio');
var sampleRate;
var channels = 1;
                               
function startRecording() {
    if (navigator.getUserMedia) {
        navigator.getUserMedia({
            audio: true
        }, onSuccess, onFail);
    } else {
        console.log('navigator.getUserMedia not present');
    }
}
startRecording();
//--------------------    
                               
                               
var ws = new WebSocket('ws://' + window.location.host + '/join');
ws.onopen = function() {
    console.log("Openened connection to websocket");
};
                               
ws.onclose = function() {
    console.log("Close connection to websocket");
}
ws.onerror = function() {
    console.log("Cannot connection to websocket");
}
                               
ws.onmessage = function(result) {
    var data = JSON.parse(result.data);
    console.log('识别结果：' + data.Pinyin);
    var result = document.getElementById("resultbox")
    result.getElementsByTagName("li")[0].innerHTML = data.Hanzi;
    document.getElementById("message").innerHTML = "点击麦克风，开始录音!";
}
