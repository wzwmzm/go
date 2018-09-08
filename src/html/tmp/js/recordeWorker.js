//   目前,只能录制48000Hz 16Bit 数据。我调整了录制参数，所需目标格式为8000Hz 16Bit Mono语音数据，
//   但是失败了，录制出的数据仍然是48000Hz  16Bit。由于对前端javascript代码完全不了解，
//   后续再来研究怎么解决这个录音格式的问题。    
//
//   补：录制单声道的话，在recorder.js中修改this.context.createJavaScriptNode(bufferLen, 1, 1)，
//   在recorderWorker.js中把右声道的数据都砍掉就ok了。


var recLength = 0,
    recBuffersL = [],
    recBuffersR = [],
    sampleRate;
                                                                                                                                                                                                                                                                                                                                                                                                  
this.onmessage = function(e) {
    switch (e.data.command) {
        case 'init':
            init(e.data.config);
            break;
        case 'record':
            record(e.data.buffer);
            break;
        case 'exportWAV':
            exportWAV(e.data.type);
            break;
        case 'getBuffer':
            getBuffer();
            break;
        case 'clear':
            clear();
            break;
    }
};
                                                                                                                                                                                                                                                                                                                                                                                                   
function init(config) {
    sampleRate = config.sampleRate ;
}
                                                                                                                                                                                                                                                                                                                                                                                                   
//从录音设备获得两个声道的数据
function record(inputBuffer) {
    recBuffersL.push(inputBuffer[0]);
    recBuffersR.push(inputBuffer[1]);
    recLength += inputBuffer[0].length;
}
                                                                                                                                                                                                                                                                                                                                                                                                  
//发送处理好的dataview数据
function exportWAV(type) {
    var bufferL = mergeBuffers(recBuffersL, recLength);
    var bufferR = mergeBuffers(recBuffersR, recLength);
    var interleaved = interleave(bufferL , bufferR);
    var dataview = encodeWAV(interleaved);
    var audioBlob = new Blob([dataview], {
        type: type
    });
    this.postMessage(audioBlob);
}
                                                                                                                                                                                                                                                                                                                                                                                                  
//从录音缓冲读取数据存入发送缓冲
function getBuffer() {
    var buffers = [];
    buffers.push(mergeBuffers(recBuffersL, recLength));
    buffers.push( mergeBuffers(recBuffersR, recLength) );
    this.postMessage(buffers);
}
                                                                                                                                                                                                                                                                                                                                                                                                  
//清除录音缓冲数据
function clear(inputBuffer) {
    recLength = 0;
    recBuffersL = [];
    recBuffersR = [];
}
                                                                                                                                                                                                                                                                                                                                                                                                  
//合并数据
function mergeBuffers(recBuffers, recLength) {
    var result = new Float32Array(recLength);
    var offset = 0;
    for (var i = 0; i < recBuffers.length; i++) {
        result.set(recBuffers[i], offset);
        offset += recBuffers[i].length;
    }
    return result;
}
                                                                                                                                                                                                                                                                                                                                                                                                  
//合并交错左右声道数据
function interleave(inputL, inputR){
// function interleave(inputL) {
    var length = inputL.length + inputR.length ;
    var result = new Float32Array(length);
                                                                                                                                                                                                                                                                                                                                                                                                  
    var index = 0,
        inputIndex = 0;
                                                                                                                                                                                                                                                                                                                                                                                                  
    while (index < length) {
        result[index++] = inputL[inputIndex];
        result[index++] = inputR[inputIndex];
        inputIndex++;
    }
    return result;
}
                                                                                                                                                                                                                                                                                                                                                                                                  
//数据转码16bit
function floatTo16BitPCM(output, offset, input) {
    for (var i = 0; i < input.length; i++, offset += 2) {
        var s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
}
                                                                                                                                                                                                                                                                                                                                                                                                  
function writeString(view, offset, string) {
    for (var i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}
                                                                                                                                                                                                                                                                                                                                                                                                  
//写入44位 wav数据头

//           setInterval函数中function里ws.send(blob)每过3秒就往服务器发送blob数据，
//           在 recorderWorker.js中的encordWAV函数中，往裸语音数据数据加44位wav头数据，
//        而数据的长度一直是本周期内所录语音数据的长度，这就会出现，最后在服务器保存了3秒以上的数据，
//        但是读到的wav头中关于数据长度的值则只有3秒或3秒以内。并且，每次都往数据wav头也是不对的，
//        44位wav并不是有效的语音数据。所以在recorderWorker.js中应修改encordWAV代码：
//function encodeWAV(samples) {
//    var buffer = new ArrayBuffer(samples.length * 2);
//    var view = new DataView(buffer);
//    floatTo16BitPCM(view, 0, samples);
//    return view;
//}

function encodeWAV(samples) {
                                                                                                                                                                                                                                                                                                                                                                                                    
    var buffer = new ArrayBuffer(44 + samples.length * 2);
    var view = new DataView(buffer);
                                                                                                                                                                                                                                                                                                                                                                                                  
    /* RIFF identifier */
    writeString(view, 0, 'RIFF');
    /* file length */
    view.setUint32(4, 32 + samples.length * 2, true);
    /* RIFF type */
    writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, 2, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate * 4, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, 4, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, samples.length * 2, true);
    floatTo16BitPCM(view, 44, samples);
    return view;
}