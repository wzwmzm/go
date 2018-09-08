// 开始录音后，执行this.node.onaudioprocess，从录音缓冲去录音samples数据，注意：
//
//
//worker.postMessage({
//                command: 'record',
//                buffer: [
//                    e.inputBuffer.getChannelData(0)
//                    ,
//                    e.inputBuffer.getChannelData(1)
//                ]
//            });
//
// buffer将从录音设备获取两个声道的数据。



(function (window) {
    var WORKER_PATH = '/static/lib/recorderWorker.js';

    var Recorder = function (source, cfg) {
        var config = cfg || {};
        var bufferLen = config.bufferLen || 4096 * 2;
        this.context = source.context;
        /*
         下面 createJavaScriptNode()中后两个参数分别为
         输入、输出声道数。1指单声道，2指多声道
        */
        this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
        var worker = new Worker(config.workerPath || WORKER_PATH);
        worker.postMessage({    // recorderWorker.js 中的 onmessage 接收 
            command: 'init',
            config: {
                sampleRate: this.context.sampleRate
            }
        });
        var recording = false,
            currCallback;

        this.node.onaudioprocess = function (e) {
            if (!recording) return;
            worker.postMessage({ //recorderWorker.js 中的 onmessage 接收 
                command: 'record',
                buffer: [
                    //获得左声道数据
                    e.inputBuffer.getChannelData(0)
                    ,
                    //获得右声道数据
                    e.inputBuffer.getChannelData(1)
                ]
            });
        }

        this.configure = function (cfg) {
            for (var prop in cfg) {
                if (cfg.hasOwnProperty(prop)) {
                    config[prop] = cfg[prop];
                }
            }
        }

        this.record = function () {
            recording = true;
        }

        this.stop = function () {
            recording = false;
        }

        this.clear = function () {

            worker.postMessage({
                command: 'clear'
            });
        }

        this.getBuffer = function (cb) {
            currCallback = cb || config.callback;
            worker.postMessage({
                command: 'getBuffer'
            })
        }

        this.exportWAV = function (cb, type) {
            currCallback = cb || config.callback;
            type = type || config.type || 'audio/wav';
            if (!currCallback) throw new Error('Callback not set');
            worker.postMessage({
                command: 'exportWAV',
                type: type
            });
        }

        worker.onmessage = function (e) {
            var blob = e.data;
            currCallback(blob);
        }

        source.connect(this.node);
        this.node.connect(this.context.destination); //this should not be necessary
    };

    Recorder.forceDownload = function (blob, filename) {
        var url = (window.URL || window.webkitURL).createObjectURL(blob);
        alert(url);
        var link = window.document.createElement('a');
        link.href = url;
        link.download = filename || 'output.wav';
        var click = document.createEvent("Event");
        click.initEvent("click", true, true);
        link.dispatchEvent(click);
    }

    window.Recorder = Recorder;

})(window);
