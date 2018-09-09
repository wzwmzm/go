(function(window) {
                                              
    var WORKER_PATH = '/js/recorderWorker.js';
                                              
    var Recorder = function(source, chan, cfg) {
        var config = cfg || {};
        var channels = chan || 1;
        var bufferLen = config.bufferLen || 8192;
        this.context = source.context;
                                              
        this.node = this.context.createJavaScriptNode(bufferLen, channels, channels);
        var worker = new window.Worker(config.workerPath || WORKER_PATH);
        worker.postMessage({
            command: 'init',
            config: {
                sampleRate: this.context.sampleRate
            }
        });
        var recording = false,
            currCallback;
                                              
        this.node.onaudioprocess = function(e) {
            if (!recording) return;
            worker.postMessage({
                command: 'record',
                buffer: [
                    e.inputBuffer.getChannelData(0)
                ]
            });
        }
                                              
        this.configure = function(cfg) {
            for (var prop in cfg) {
                if (cfg.hasOwnProperty(prop)) {
                    config[prop] = cfg[prop];
                }
            }
        }
                                              
        this.record = function() {
            recording = true;
        }
                                              
        this.stop = function() {
            recording = false;
        }
                                              
        this.clear = function() {
            worker.postMessage({
                command: 'clear'
            });
        }
                                              
        this.getBuffer = function(cb) {  //此函数好象没有被使用到
            currCallback = cb || config.callback;
            worker.postMessage({
                command: 'getBuffer'
            })
        }
                                              
        this.exportWAV = function(cb, type) {
            currCallback = cb || config.callback;
            type = type || config.type || 'audio/wav';
            if (!currCallback) throw new Error('Callback not set');
            worker.postMessage({
                command: 'exportWAV',
                type: type
            });
        }
                                              
        worker.onmessage = function(e) {
            var blob = e.data;
            currCallback(blob);
        }
                                              
        source.connect(this.node);
        this.node.connect(this.context.destination);
    };
                                              
    window.Recorder = Recorder;
                                              
})( window );
