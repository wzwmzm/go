/* global Blob */
/* global Float32Array */
/* global ArrayBuffer */

var recLength = 0,
    recBuffersL = [],
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
    sampleRate = config.sampleRate;
}
                                      
function record(inputBuffer) {
    recBuffersL.push(inputBuffer[0]);
    recLength += inputBuffer[0].length;
}
                                      
function exportWAV(type) {
    var bufferL = mergeBuffers(recBuffersL, recLength);
    var interleaved = interleave(bufferL);
    var dataview = encodeWAV(interleaved);
    var audioBlob = new Blob([dataview], { 
        type: type
    });
                                      
    this.postMessage(audioBlob);
}
                                      
function getBuffer() {
    var buffers = [];
    buffers.push(mergeBuffers(recBuffersL, recLength));
    this.postMessage(buffers);
}
                                      
function clear(inputBuffer) {
    recLength = 0;
    recBuffersL = [];
}
                                      
function mergeBuffers(recBuffers, recLength) {
    var result = new Float32Array(recLength);
    var offset = 0;
    for (var i = 0; i < recBuffers.length; i++) {
        result.set(recBuffers[i], offset);
        offset += recBuffers[i].length;
    }
    return result;
}
                                      
function interleave(inputL) {
    var length;
    var result;
                                      
    var index = 0,
        inputIndex = 0;
                                      
    if (sampleRate == 48000) {
        length = inputL.length / 6;
        result = new Float32Array(length);
        while (index < length) {
                                      
            result[index++] = (inputL[inputIndex++] + inputL[inputIndex++] +
                inputL[inputIndex++] + inputL[inputIndex++] +
                inputL[inputIndex++] + inputL[inputIndex++]) / 6;
        }
    } else if (sampleRate == 44100) {
        length = inputL.length / 6;
        result = new Float32Array(length);
        while (index < length) {
                                      
            if (inputIndex % 12 == 0) {
                result[index++] = (inputL[inputIndex] + inputL[inputIndex++] +
                    inputL[inputIndex++] + inputL[inputIndex++] +
                    inputL[inputIndex++] + inputL[inputIndex++] +
                    inputL[inputIndex++]) / 7;
            } else {
                result[index++] = (inputL[inputIndex++] + inputL[inputIndex++] +
                    inputL[inputIndex++] + inputL[inputIndex++] +
                    inputL[inputIndex++] + inputL[inputIndex++]) / 6;
            }
        }
    } else {
        length = inputL.length;
        result = new Float32Array(length);
        while (index < length) {
            result[index++] = inputL[inputIndex++];
        }
    }
                                      
    return result;
}
                                      
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
                                      
function encodeWAV(samples) {
    var buffer = new ArrayBuffer(samples.length * 2);
    var view = new DataView(buffer);
    floatTo16BitPCM(view, 0, samples);
                                      
    return view;
}
