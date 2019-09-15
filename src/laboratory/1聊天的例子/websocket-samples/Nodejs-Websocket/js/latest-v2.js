! function (e) {
    if ("function" == typeof bootstrap) bootstrap("simplewebrtc", e);
    else if ("object" == typeof exports) module.exports = e();
    else if ("function" == typeof define && define.amd) define(e);
    else if ("undefined" != typeof ses) {
        if (!ses.ok()) return;
        ses.makeSimpleWebRTC = e
    } else "undefined" != typeof window ? window.SimpleWebRTC = e() : global.SimpleWebRTC = e()
}(function () {
    var e;
    return function (e, t, n) {
        function r(n, o) {
            if (!t[n]) {
                if (!e[n]) {
                    var a = "function" == typeof require && require;
                    if (!o && a) return a(n, !0);
                    if (i) return i(n, !0);
                    throw new Error("Cannot find module '" + n + "'")
                }
                var s = t[n] = {
                    exports: {}
                };
                e[n][0].call(s.exports, function (t) {
                    var i = e[n][1][t];
                    return r(i ? i : t)
                }, s, s.exports)
            }
            return t[n].exports
        }
        for (var i = "function" == typeof require && require, o = 0; o < n.length; o++) r(n[o]);
        return r
    }({
        1: [function (e, t) {
            function n(e) {
                var t, n, u = this,
                    p = e || {},
                    d = this.config = {
                        url: "https://sandbox.simplewebrtc.com:443/",
                        socketio: {},
                        connection: null,
                        debug: !1,
                        localVideoEl: "",
                        remoteVideosEl: "",
                        enableDataChannels: !0,
                        autoRequestMedia: !1,
                        autoRemoveVideos: !0,
                        adjustPeerVolume: !1,
                        peerVolumeWhenSpeaking: .25,
                        media: {
                            video: !0,
                            audio: !0
                        },
                        receiveMedia: {
                            offerToReceiveAudio: 1,
                            offerToReceiveVideo: 1
                        },
                        localVideo: {
                            autoplay: !0,
                            mirror: !0,
                            muted: !0
                        }
                    };
                this.logger = function () {
                    return e.debug ? e.logger || console : e.logger || s
                }();
                for (t in p) this.config[t] = p[t];
                this.capabilities = o, i.call(this), n = this.connection = null === this.config.connection ? new c(this.config) : this.config.connection, n.on("connect", function () {
                    u.emit("connectionReady", n.getSessionid()), u.sessionReady = !0, u.testReadiness()
                }), n.on("message", function (e) {
                    var t, n = u.webrtc.getPeers(e.from, e.roomType);
                    "offer" === e.type ? (n.length && n.forEach(function (n) {
                        n.sid == e.sid && (t = n)
                    }), t || (t = u.webrtc.createPeer({
                        id: e.from,
                        sid: e.sid,
                        type: e.roomType,
                        enableDataChannels: u.config.enableDataChannels && "screen" !== e.roomType,
                        sharemyscreen: "screen" === e.roomType && !e.broadcaster,
                        broadcaster: "screen" !== e.roomType || e.broadcaster ? null : u.connection.getSessionid()
                    }), u.emit("createdPeer", t)), t.handleMessage(e)) : n.length && n.forEach(function (t) {
                        e.sid ? t.sid === e.sid && t.handleMessage(e) : t.handleMessage(e)
                    })
                }), n.on("remove", function (e) {
                    e.id !== u.connection.getSessionid() && u.webrtc.removePeers(e.id, e.type)
                }), e.logger = this.logger, e.debug = !1, this.webrtc = new r(e), ["mute", "unmute", "pauseVideo", "resumeVideo", "pause", "resume", "sendToAll", "sendDirectlyToAll", "getPeers"].forEach(function (e) {
                    u[e] = u.webrtc[e].bind(u.webrtc)
                }), this.webrtc.on("*", function () {
                    u.emit.apply(u, arguments)
                }), d.debug && this.on("*", this.logger.log.bind(this.logger, "SimpleWebRTC event:")), this.webrtc.on("localStream", function () {
                    u.testReadiness()
                }), this.webrtc.on("message", function (e) {
                    u.connection.emit("message", e)
                }), this.webrtc.on("peerStreamAdded", this.handlePeerStreamAdded.bind(this)), this.webrtc.on("peerStreamRemoved", this.handlePeerStreamRemoved.bind(this)), this.config.adjustPeerVolume && (this.webrtc.on("speaking", this.setVolumeForAll.bind(this, this.config.peerVolumeWhenSpeaking)), this.webrtc.on("stoppedSpeaking", this.setVolumeForAll.bind(this, 1))), n.on("stunservers", function (e) {
                    u.webrtc.config.peerConnectionConfig.iceServers = e, u.emit("stunservers", e)
                }), n.on("turnservers", function (e) {
                    u.webrtc.config.peerConnectionConfig.iceServers = u.webrtc.config.peerConnectionConfig.iceServers.concat(e), u.emit("turnservers", e)
                }), this.webrtc.on("iceFailed", function () {}), this.webrtc.on("connectivityError", function () {}), this.webrtc.on("audioOn", function () {
                    u.webrtc.sendToAll("unmute", {
                        name: "audio"
                    })
                }), this.webrtc.on("audioOff", function () {
                    u.webrtc.sendToAll("mute", {
                        name: "audio"
                    })
                }), this.webrtc.on("videoOn", function () {
                    u.webrtc.sendToAll("unmute", {
                        name: "video"
                    })
                }), this.webrtc.on("videoOff", function () {
                    u.webrtc.sendToAll("mute", {
                        name: "video"
                    })
                }), this.webrtc.on("localScreen", function (e) {
                    var t = document.createElement("video"),
                        n = u.getRemoteVideoContainer();
                    t.oncontextmenu = function () {
                        return !1
                    }, t.id = "localScreen", a(e, t), n && n.appendChild(t), u.emit("localScreenAdded", t), u.connection.emit("shareScreen"), u.webrtc.peers.forEach(function (e) {
                        var t;
                        "video" === e.type && (t = u.webrtc.createPeer({
                            id: e.id,
                            type: "screen",
                            sharemyscreen: !0,
                            enableDataChannels: !1,
                            receiveMedia: {
                                offerToReceiveAudio: 0,
                                offerToReceiveVideo: 0
                            },
                            broadcaster: u.connection.getSessionid()
                        }), u.emit("createdPeer", t), t.start())
                    })
                }), this.webrtc.on("localScreenStopped", function () {
                    u.stopScreenShare()
                }), this.webrtc.on("channelMessage", function (e, t, n) {
                    "volume" == n.type && u.emit("remoteVolumeChange", e, n.volume)
                }), this.config.autoRequestMedia && this.startLocalVideo()
            }
            var r = e("./webrtc"),
                i = e("wildemitter"),
                o = e("webrtcsupport"),
                a = e("attachmediastream"),
                s = e("mockconsole"),
                c = e("./socketioconnection");
            n.prototype = Object.create(i.prototype, {
                constructor: {
                    value: n
                }
            }), n.prototype.leaveRoom = function () {
                if (this.roomName) {
                    for (this.connection.emit("leave"); this.webrtc.peers.length;) this.webrtc.peers.shift().end();
                    this.getLocalScreen() && this.stopScreenShare(), this.emit("leftRoom", this.roomName), this.roomName = void 0
                }
            }, n.prototype.disconnect = function () {
                this.connection.disconnect(), delete this.connection
            }, n.prototype.handlePeerStreamAdded = function (e) {
                var t = this,
                    n = this.getRemoteVideoContainer(),
                    r = a(e.stream);
                e.videoEl = r, r.id = this.getDomId(e), n && n.appendChild(r), this.emit("videoAdded", r, e), window.setTimeout(function () {
                    t.webrtc.isAudioEnabled() || e.send("mute", {
                        name: "audio"
                    }), t.webrtc.isVideoEnabled() || e.send("mute", {
                        name: "video"
                    })
                }, 250)
            }, n.prototype.handlePeerStreamRemoved = function (e) {
                var t = this.getRemoteVideoContainer(),
                    n = e.videoEl;
                this.config.autoRemoveVideos && t && n && t.removeChild(n), n && this.emit("videoRemoved", n, e)
            }, n.prototype.getDomId = function (e) {
                return [e.id, e.type, e.broadcaster ? "broadcasting" : "incoming"].join("_")
            }, n.prototype.setVolumeForAll = function (e) {
                this.webrtc.peers.forEach(function (t) {
                    t.videoEl && (t.videoEl.volume = e)
                })
            }, n.prototype.joinRoom = function (e, t) {
                var n = this;
                this.roomName = e, this.connection.emit("join", e, function (r, i) {
                    if (console.log("join CB", r, i), r) n.emit("error", r);
                    else {
                        var o, a, s, c;
                        for (o in i.clients) {
                            a = i.clients[o];
                            for (s in a) a[s] && (c = n.webrtc.createPeer({
                                id: o,
                                type: s,
                                enableDataChannels: n.config.enableDataChannels && "screen" !== s,
                                receiveMedia: {
                                    offerToReceiveAudio: "screen" !== s && n.config.receiveMedia.offerToReceiveAudio ? 1 : 0,
                                    offerToReceiveVideo: n.config.receiveMedia.offerToReceiveVideo
                                }
                            }), n.emit("createdPeer", c), c.start())
                        }
                    }
                    t && t(r, i), n.emit("joinedRoom", e)
                })
            }, n.prototype.getEl = function (e) {
                return "string" == typeof e ? document.getElementById(e) : e
            }, n.prototype.startLocalVideo = function () {
                var e = this;
                this.webrtc.startLocalMedia(this.config.media, function (t, n) {
                    t ? e.emit("localMediaError", t) : a(n, e.getLocalVideoContainer(), e.config.localVideo)
                })
            }, n.prototype.stopLocalVideo = function () {
                this.webrtc.stopLocalMedia()
            }, n.prototype.getLocalVideoContainer = function () {
                var e = this.getEl(this.config.localVideoEl);
                if (e && "VIDEO" === e.tagName) return e.oncontextmenu = function () {
                    return !1
                }, e;
                if (e) {
                    var t = document.createElement("video");
                    return t.oncontextmenu = function () {
                        return !1
                    }, e.appendChild(t), t
                }
            }, n.prototype.getRemoteVideoContainer = function () {
                return this.getEl(this.config.remoteVideosEl)
            }, n.prototype.shareScreen = function (e) {
                this.webrtc.startScreenShare(e)
            }, n.prototype.getLocalScreen = function () {
                return this.webrtc.localScreen
            }, n.prototype.stopScreenShare = function () {
                this.connection.emit("unshareScreen");
                var e = document.getElementById("localScreen"),
                    t = this.getRemoteVideoContainer(),
                    n = this.getLocalScreen();
                this.config.autoRemoveVideos && t && e && t.removeChild(e), e && this.emit("videoRemoved", e), n && n.getTracks().forEach(function (e) {
                    e.stop()
                }), this.webrtc.peers.forEach(function (e) {
                    e.broadcaster && e.end()
                })
            }, n.prototype.testReadiness = function () {
                var e = this;
                this.sessionReady && (this.config.media.video || this.config.media.audio ? this.webrtc.localStreams.length > 0 && e.emit("readyToCall", e.connection.getSessionid()) : e.emit("readyToCall", e.connection.getSessionid()))
            }, n.prototype.createRoom = function (e, t) {
                this.roomName = e, 2 === arguments.length ? this.connection.emit("create", e, t) : this.connection.emit("create", e)
            }, n.prototype.sendFile = function () {
                return o.dataChannel ? void 0 : this.emit("error", new Error("DataChannelNotSupported"))
            }, t.exports = n
        }, {
            "./socketioconnection": 3,
            "./webrtc": 2,
            attachmediastream: 6,
            mockconsole: 5,
            webrtcsupport: 7,
            wildemitter: 4
        }],
        4: [function (e, t) {
            function n() {}
            t.exports = n, n.mixin = function (e) {
                var t = e.prototype || e;
                t.isWildEmitter = !0, t.on = function (e) {
                    this.callbacks = this.callbacks || {};
                    var t = 3 === arguments.length,
                        n = t ? arguments[1] : void 0,
                        r = t ? arguments[2] : arguments[1];
                    return r._groupName = n, (this.callbacks[e] = this.callbacks[e] || []).push(r), this
                }, t.once = function (e) {
                    function t() {
                        n.off(e, t), o.apply(this, arguments)
                    }
                    var n = this,
                        r = 3 === arguments.length,
                        i = r ? arguments[1] : void 0,
                        o = r ? arguments[2] : arguments[1];
                    return this.on(e, i, t), this
                }, t.releaseGroup = function (e) {
                    this.callbacks = this.callbacks || {};
                    var t, n, r, i;
                    for (t in this.callbacks)
                        for (i = this.callbacks[t], n = 0, r = i.length; r > n; n++) i[n]._groupName === e && (i.splice(n, 1), n--, r--);
                    return this
                }, t.off = function (e, t) {
                    this.callbacks = this.callbacks || {};
                    var n, r = this.callbacks[e];
                    return r ? 1 === arguments.length ? (delete this.callbacks[e], this) : (n = r.indexOf(t), r.splice(n, 1), 0 === r.length && delete this.callbacks[e], this) : this
                }, t.emit = function (e) {
                    this.callbacks = this.callbacks || {};
                    var t, n, r, i = [].slice.call(arguments, 1),
                        o = this.callbacks[e],
                        a = this.getWildcardCallbacks(e);
                    if (o)
                        for (r = o.slice(), t = 0, n = r.length; n > t && r[t]; ++t) r[t].apply(this, i);
                    if (a)
                        for (n = a.length, r = a.slice(), t = 0, n = r.length; n > t && r[t]; ++t) r[t].apply(this, [e].concat(i));
                    return this
                }, t.getWildcardCallbacks = function (e) {
                    this.callbacks = this.callbacks || {};
                    var t, n, r = [];
                    for (t in this.callbacks) n = t.split("*"), ("*" === t || 2 === n.length && e.slice(0, n[0].length) === n[0]) && (r = r.concat(this.callbacks[t]));
                    return r
                }
            }, n.mixin(n)
        }, {}],
        5: [function (e, t) {
            for (var n = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), r = n.length, i = function () {}, o = {}; r--;) o[n[r]] = i;
            t.exports = o
        }, {}],
        7: [function (e, t) {
            var n, r;
            window.mozRTCPeerConnection || navigator.mozGetUserMedia ? (n = "moz", r = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10)) : (window.webkitRTCPeerConnection || navigator.webkitGetUserMedia) && (n = "webkit", r = navigator.userAgent.match(/Chrom(e|ium)/) && parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10));
            var i = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
                o = window.mozRTCIceCandidate || window.RTCIceCandidate,
                a = window.mozRTCSessionDescription || window.RTCSessionDescription,
                s = window.webkitMediaStream || window.MediaStream,
                c = "https:" === window.location.protocol && ("webkit" === n && r >= 26 || "moz" === n && r >= 33),
                u = window.AudioContext || window.webkitAudioContext,
                p = document.createElement("video"),
                d = p && p.canPlayType && "probably" === p.canPlayType('video/webm; codecs="vp8", vorbis'),
                l = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;
            t.exports = {
                prefix: n,
                browserVersion: r,
                support: !!i && !!l,
                supportRTCPeerConnection: !!i,
                supportVp8: d,
                supportGetUserMedia: !!l,
                supportDataChannel: !!(i && i.prototype && i.prototype.createDataChannel),
                supportWebAudio: !(!u || !u.prototype.createMediaStreamSource),
                supportMediaStream: !(!s || !s.prototype.removeTrack),
                supportScreenSharing: !!c,
                AudioContext: u,
                PeerConnection: i,
                SessionDescription: a,
                IceCandidate: o,
                MediaStream: s,
                getUserMedia: l
            }
        }, {}],
        2: [function (e, t) {
            function n(e) {
                var t = this,
                    n = e || {};
                this.config = {
                    debug: !1,
                    peerConnectionConfig: {
                        iceServers: [{
                            urls: "stun:stun.l.google.com:19302"
                        }]
                    },
                    peerConnectionConstraints: {
                        optional: []
                    },
                    receiveMedia: {
                        offerToReceiveAudio: 1,
                        offerToReceiveVideo: 1
                    },
                    enableDataChannels: !0
                };
                var r;
                this.screenSharingSupport = i.screenSharing, this.logger = function () {
                    return e.debug ? e.logger || console : e.logger || o
                }();
                for (r in n) this.config[r] = n[r];
                i.support || this.logger.error("Your browser doesn't seem to support WebRTC"), this.peers = [], a.call(this, this.config), this.on("speaking", function () {
                    t.hardMuted || t.peers.forEach(function (e) {
                        if (e.enableDataChannels) {
                            var t = e.getDataChannel("hark");
                            if ("open" != t.readyState) return;
                            t.send(JSON.stringify({
                                type: "speaking"
                            }))
                        }
                    })
                }), this.on("stoppedSpeaking", function () {
                    t.hardMuted || t.peers.forEach(function (e) {
                        if (e.enableDataChannels) {
                            var t = e.getDataChannel("hark");
                            if ("open" != t.readyState) return;
                            t.send(JSON.stringify({
                                type: "stoppedSpeaking"
                            }))
                        }
                    })
                }), this.on("volumeChange", function (e) {
                    t.hardMuted || t.peers.forEach(function (t) {
                        if (t.enableDataChannels) {
                            var n = t.getDataChannel("hark");
                            if ("open" != n.readyState) return;
                            n.send(JSON.stringify({
                                type: "volume",
                                volume: e
                            }))
                        }
                    })
                }), this.config.debug && this.on("*", function (e, n, r) {
                    var i;
                    i = t.config.logger === o ? console : t.logger, i.log("event:", e, n, r)
                })
            }
            var r = e("util"),
                i = e("webrtcsupport");
            e("wildemitter");
            var o = e("mockconsole"),
                a = e("localmedia"),
                s = e("./peer");
            r.inherits(n, a), n.prototype.createPeer = function (e) {
                var t;
                return e.parent = this, t = new s(e), this.peers.push(t), t
            }, n.prototype.removePeers = function (e, t) {
                this.getPeers(e, t).forEach(function (e) {
                    e.end()
                })
            }, n.prototype.getPeers = function (e, t) {
                return this.peers.filter(function (n) {
                    return !(e && n.id !== e || t && n.type !== t)
                })
            }, n.prototype.sendToAll = function (e, t) {
                this.peers.forEach(function (n) {
                    n.send(e, t)
                })
            }, n.prototype.sendDirectlyToAll = function (e, t, n) {
                this.peers.forEach(function (r) {
                    r.enableDataChannels && r.sendDirectly(e, t, n)
                })
            }, t.exports = n
        }, {
            "./peer": 9,
            localmedia: 10,
            mockconsole: 5,
            util: 8,
            webrtcsupport: 7,
            wildemitter: 4
        }],
        3: [function (e, t) {
            function n(e) {
                this.connection = r.connect(e.url, e.socketio)
            }
            var r = e("socket.io-client");
            n.prototype.on = function (e, t) {
                this.connection.on(e, t)
            }, n.prototype.emit = function () {
                this.connection.emit.apply(this.connection, arguments)
            }, n.prototype.getSessionid = function () {
                return this.connection.id
            }, n.prototype.disconnect = function () {
                return this.connection.disconnect()
            }, t.exports = n
        }, {
            "socket.io-client": 11
        }],
        8: [function (e, t, n) {
            function r(e) {
                return Array.isArray(e) || "object" == typeof e && "[object Array]" === Object.prototype.toString.call(e)
            }

            function i(e) {
                "object" == typeof e && "[object RegExp]" === Object.prototype.toString.call(e)
            }

            function o(e) {
                return "object" == typeof e && "[object Date]" === Object.prototype.toString.call(e)
            }
            e("events"), n.isArray = r, n.isDate = function (e) {
                return "[object Date]" === Object.prototype.toString.call(e)
            }, n.isRegExp = function (e) {
                return "[object RegExp]" === Object.prototype.toString.call(e)
            }, n.print = function () {}, n.puts = function () {}, n.debug = function () {}, n.inspect = function (e, t, c, u) {
                function p(e, c) {
                    if (e && "function" == typeof e.inspect && e !== n && (!e.constructor || e.constructor.prototype !== e)) return e.inspect(c);
                    switch (typeof e) {
                        case "undefined":
                            return l("undefined", "undefined");
                        case "string":
                            var u = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                            return l(u, "string");
                        case "number":
                            return l("" + e, "number");
                        case "boolean":
                            return l("" + e, "boolean")
                    }
                    if (null === e) return l("null", "null");
                    var f = a(e),
                        h = t ? s(e) : f;
                    if ("function" == typeof e && 0 === h.length) {
                        if (i(e)) return l("" + e, "regexp");
                        var m = e.name ? ": " + e.name : "";
                        return l("[Function" + m + "]", "special")
                    }
                    if (o(e) && 0 === h.length) return l(e.toUTCString(), "date");
                    var g, v, y;
                    if (r(e) ? (v = "Array", y = ["[", "]"]) : (v = "Object", y = ["{", "}"]), "function" == typeof e) {
                        var b = e.name ? ": " + e.name : "";
                        g = i(e) ? " " + e : " [Function" + b + "]"
                    } else g = "";
                    if (o(e) && (g = " " + e.toUTCString()), 0 === h.length) return y[0] + g + y[1];
                    if (0 > c) return i(e) ? l("" + e, "regexp") : l("[Object]", "special");
                    d.push(e);
                    var w = h.map(function (t) {
                        var n, i;
                        if (e.__lookupGetter__ && (e.__lookupGetter__(t) ? i = e.__lookupSetter__(t) ? l("[Getter/Setter]", "special") : l("[Getter]", "special") : e.__lookupSetter__(t) && (i = l("[Setter]", "special"))), f.indexOf(t) < 0 && (n = "[" + t + "]"), i || (d.indexOf(e[t]) < 0 ? (i = null === c ? p(e[t]) : p(e[t], c - 1), i.indexOf("\n") > -1 && (i = r(e) ? i.split("\n").map(function (e) {
                                return "  " + e
                            }).join("\n").substr(2) : "\n" + i.split("\n").map(function (e) {
                                return "   " + e
                            }).join("\n"))) : i = l("[Circular]", "special")), "undefined" == typeof n) {
                            if ("Array" === v && t.match(/^\d+$/)) return i;
                            n = JSON.stringify("" + t), n.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (n = n.substr(1, n.length - 2), n = l(n, "name")) : (n = n.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), n = l(n, "string"))
                        }
                        return n + ": " + i
                    });
                    d.pop();
                    var C = 0,
                        S = w.reduce(function (e, t) {
                            return C++, t.indexOf("\n") >= 0 && C++, e + t.length + 1
                        }, 0);
                    return w = S > 50 ? y[0] + ("" === g ? "" : g + "\n ") + " " + w.join(",\n  ") + " " + y[1] : y[0] + g + " " + w.join(", ") + " " + y[1]
                }
                var d = [],
                    l = function (e, t) {
                        var n = {
                                bold: [1, 22],
                                italic: [3, 23],
                                underline: [4, 24],
                                inverse: [7, 27],
                                white: [37, 39],
                                grey: [90, 39],
                                black: [30, 39],
                                blue: [34, 39],
                                cyan: [36, 39],
                                green: [32, 39],
                                magenta: [35, 39],
                                red: [31, 39],
                                yellow: [33, 39]
                            },
                            r = {
                                special: "cyan",
                                number: "blue",
                                "boolean": "yellow",
                                undefined: "grey",
                                "null": "bold",
                                string: "green",
                                date: "magenta",
                                regexp: "red"
                            }[t];
                        return r ? "[" + n[r][0] + "m" + e + "[" + n[r][1] + "m" : e
                    };
                return u || (l = function (e) {
                    return e
                }), p(e, "undefined" == typeof c ? 2 : c)
            }, n.log = function () {}, n.pump = null;
            var a = Object.keys || function (e) {
                    var t = [];
                    for (var n in e) t.push(n);
                    return t
                },
                s = Object.getOwnPropertyNames || function (e) {
                    var t = [];
                    for (var n in e) Object.hasOwnProperty.call(e, n) && t.push(n);
                    return t
                },
                c = Object.create || function (e, t) {
                    var n;
                    if (null === e) n = {
                        __proto__: null
                    };
                    else {
                        if ("object" != typeof e) throw new TypeError("typeof prototype[" + typeof e + "] != 'object'");
                        var r = function () {};
                        r.prototype = e, n = new r, n.__proto__ = e
                    }
                    return "undefined" != typeof t && Object.defineProperties && Object.defineProperties(n, t), n
                };
            n.inherits = function (e, t) {
                e.super_ = t, e.prototype = c(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            };
            var u = /%[sdj%]/g;
            n.format = function (e) {
                if ("string" != typeof e) {
                    for (var t = [], r = 0; r < arguments.length; r++) t.push(n.inspect(arguments[r]));
                    return t.join(" ")
                }
                for (var r = 1, i = arguments, o = i.length, a = String(e).replace(u, function (e) {
                        if ("%%" === e) return "%";
                        if (r >= o) return e;
                        switch (e) {
                            case "%s":
                                return String(i[r++]);
                            case "%d":
                                return Number(i[r++]);
                            case "%j":
                                return JSON.stringify(i[r++]);
                            default:
                                return e
                        }
                    }), s = i[r]; o > r; s = i[++r]) a += null === s || "object" != typeof s ? " " + s : " " + n.inspect(s);
                return a
            }
        }, {
            events: 12
        }],
        6: [function (e, t) {
            var n = e("webrtc-adapter-test");
            t.exports = function (e, t, r) {
                var i;
                window.URL;
                var o = t,
                    a = {
                        autoplay: !0,
                        mirror: !1,
                        muted: !1,
                        audio: !1,
                        disableContextMenu: !1
                    };
                if (r)
                    for (i in r) a[i] = r[i];
                return o ? "audio" === o.tagName.toLowerCase() && (a.audio = !0) : o = document.createElement(a.audio ? "audio" : "video"), a.disableContextMenu && (o.oncontextmenu = function (e) {
                    e.preventDefault()
                }), a.autoplay && (o.autoplay = "autoplay"), a.muted && (o.muted = !0), !a.audio && a.mirror && ["", "moz", "webkit", "o", "ms"].forEach(function (e) {
                    var t = e ? e + "Transform" : "transform";
                    o.style[t] = "scaleX(-1)"
                }), n.attachMediaStream(o, e), o
            }
        }, {
            "webrtc-adapter-test": 13
        }],
        14: [function (e, t) {
            var n = t.exports = {};
            n.nextTick = function () {
                var e = "undefined" != typeof window && window.setImmediate,
                    t = "undefined" != typeof window && window.postMessage && window.addEventListener;
                if (e) return function (e) {
                    return window.setImmediate(e)
                };
                if (t) {
                    var n = [];
                    return window.addEventListener("message", function (e) {
                            var t = e.source;
                            if ((t === window || null === t) && "process-tick" === e.data && (e.stopPropagation(), n.length > 0)) {
                                var r = n.shift();
                                r()
                            }
                        }, !0),
                        function (e) {
                            n.push(e), window.postMessage("process-tick", "*")
                        }
                }
                return function (e) {
                    setTimeout(e, 0)
                }
            }(), n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.binding = function () {
                throw new Error("process.binding is not supported")
            }, n.cwd = function () {
                return "/"
            }, n.chdir = function () {
                throw new Error("process.chdir is not supported")
            }
        }, {}],
        12: [function (e, t, n) {
            function r(e, t) {
                if (e.indexOf) return e.indexOf(t);
                for (var n = 0; n < e.length; n++)
                    if (t === e[n]) return n;
                return -1
            }
            var i = e("__browserify_process");
            i.EventEmitter || (i.EventEmitter = function () {});
            var o = n.EventEmitter = i.EventEmitter,
                a = "function" == typeof Array.isArray ? Array.isArray : function (e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                s = 10;
            o.prototype.setMaxListeners = function (e) {
                this._events || (this._events = {}), this._events.maxListeners = e
            }, o.prototype.emit = function (e) {
                if ("error" === e && (!this._events || !this._events.error || a(this._events.error) && !this._events.error.length)) throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
                if (!this._events) return !1;
                var t = this._events[e];
                if (!t) return !1;
                if ("function" == typeof t) {
                    switch (arguments.length) {
                        case 1:
                            t.call(this);
                            break;
                        case 2:
                            t.call(this, arguments[1]);
                            break;
                        case 3:
                            t.call(this, arguments[1], arguments[2]);
                            break;
                        default:
                            var n = Array.prototype.slice.call(arguments, 1);
                            t.apply(this, n)
                    }
                    return !0
                }
                if (a(t)) {
                    for (var n = Array.prototype.slice.call(arguments, 1), r = t.slice(), i = 0, o = r.length; o > i; i++) r[i].apply(this, n);
                    return !0
                }
                return !1
            }, o.prototype.addListener = function (e, t) {
                if ("function" != typeof t) throw new Error("addListener only takes instances of Function");
                if (this._events || (this._events = {}), this.emit("newListener", e, t), this._events[e])
                    if (a(this._events[e])) {
                        if (!this._events[e].warned) {
                            var n;
                            n = void 0 !== this._events.maxListeners ? this._events.maxListeners : s, n && n > 0 && this._events[e].length > n && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), console.trace())
                        }
                        this._events[e].push(t)
                    } else this._events[e] = [this._events[e], t];
                else this._events[e] = t;
                return this
            }, o.prototype.on = o.prototype.addListener, o.prototype.once = function (e, t) {
                var n = this;
                return n.on(e, function r() {
                    n.removeListener(e, r), t.apply(this, arguments)
                }), this
            }, o.prototype.removeListener = function (e, t) {
                if ("function" != typeof t) throw new Error("removeListener only takes instances of Function");
                if (!this._events || !this._events[e]) return this;
                var n = this._events[e];
                if (a(n)) {
                    var i = r(n, t);
                    if (0 > i) return this;
                    n.splice(i, 1), 0 == n.length && delete this._events[e]
                } else this._events[e] === t && delete this._events[e];
                return this
            }, o.prototype.removeAllListeners = function (e) {
                return 0 === arguments.length ? (this._events = {}, this) : (e && this._events && this._events[e] && (this._events[e] = null), this)
            }, o.prototype.listeners = function (e) {
                return this._events || (this._events = {}), this._events[e] || (this._events[e] = []), a(this._events[e]) || (this._events[e] = [this._events[e]]), this._events[e]
            }, o.listenerCount = function (e, t) {
                var n;
                return n = e._events && e._events[t] ? "function" == typeof e._events[t] ? 1 : e._events[t].length : 0
            }
        }, {
            __browserify_process: 14
        }],
        13: [function (t, n) {
            "use strict";

            function r(e) {
                return new Promise(function (t, n) {
                    i(e, t, n)
                })
            }
            var i = null,
                o = null,
                a = null,
                s = null,
                c = null,
                u = null,
                p = {
                    log: function () {
                        "undefined" != typeof n || "function" == typeof t && "function" == typeof e || console.log.apply(console, arguments)
                    },
                    extractVersion: function (e, t, n) {
                        var r = e.match(t);
                        return r && r.length >= n && parseInt(r[n], 10)
                    }
                };
            if ("object" == typeof window && (!window.HTMLMediaElement || "srcObject" in window.HTMLMediaElement.prototype || Object.defineProperty(window.HTMLMediaElement.prototype, "srcObject", {
                    get: function () {
                        return "mozSrcObject" in this ? this.mozSrcObject : this._srcObject
                    },
                    set: function (e) {
                        "mozSrcObject" in this ? this.mozSrcObject = e : (this._srcObject = e, this.src = URL.createObjectURL(e))
                    }
                }), i = window.navigator && window.navigator.getUserMedia), o = function (e, t) {
                    e.srcObject = t
                }, a = function (e, t) {
                    e.srcObject = t.srcObject
                }, "undefined" != typeof window && window.navigator)
                if (navigator.mozGetUserMedia) {
                    if (p.log("This appears to be Firefox"), s = "firefox", c = p.extractVersion(navigator.userAgent, /Firefox\/([0-9]+)\./, 1), u = 31, window.RTCPeerConnection || (window.RTCPeerConnection = function (e, t) {
                            if (38 > c && e && e.iceServers) {
                                for (var n = [], r = 0; r < e.iceServers.length; r++) {
                                    var i = e.iceServers[r];
                                    if (i.hasOwnProperty("urls"))
                                        for (var o = 0; o < i.urls.length; o++) {
                                            var a = {
                                                url: i.urls[o]
                                            };
                                            0 === i.urls[o].indexOf("turn") && (a.username = i.username, a.credential = i.credential), n.push(a)
                                        } else n.push(e.iceServers[r])
                                }
                                e.iceServers = n
                            }
                            return new mozRTCPeerConnection(e, t)
                        }, window.RTCPeerConnection.prototype = mozRTCPeerConnection.prototype, mozRTCPeerConnection.generateCertificate && Object.defineProperty(window.RTCPeerConnection, "generateCertificate", {
                            get: function () {
                                return arguments.length ? mozRTCPeerConnection.generateCertificate.apply(null, arguments) : mozRTCPeerConnection.generateCertificate
                            }
                        }), window.RTCSessionDescription = mozRTCSessionDescription, window.RTCIceCandidate = mozRTCIceCandidate), i = function (e, t, n) {
                            var r = function (e) {
                                if ("object" != typeof e || e.require) return e;
                                var t = [];
                                return Object.keys(e).forEach(function (n) {
                                    if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
                                        var r = e[n] = "object" == typeof e[n] ? e[n] : {
                                            ideal: e[n]
                                        };
                                        if ((void 0 !== r.min || void 0 !== r.max || void 0 !== r.exact) && t.push(n), void 0 !== r.exact && ("number" == typeof r.exact ? r.min = r.max = r.exact : e[n] = r.exact, delete r.exact), void 0 !== r.ideal) {
                                            e.advanced = e.advanced || [];
                                            var i = {};
                                            i[n] = "number" == typeof r.ideal ? {
                                                min: r.ideal,
                                                max: r.ideal
                                            } : r.ideal, e.advanced.push(i), delete r.ideal, Object.keys(r).length || delete e[n]
                                        }
                                    }
                                }), t.length && (e.require = t), e
                            };
                            return 38 > c && (p.log("spec: " + JSON.stringify(e)), e.audio && (e.audio = r(e.audio)), e.video && (e.video = r(e.video)), p.log("ff37: " + JSON.stringify(e))), navigator.mozGetUserMedia(e, t, n)
                        }, navigator.getUserMedia = i, navigator.mediaDevices || (navigator.mediaDevices = {
                            getUserMedia: r,
                            addEventListener: function () {},
                            removeEventListener: function () {}
                        }), navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function () {
                            return new Promise(function (e) {
                                var t = [{
                                    kind: "audioinput",
                                    deviceId: "default",
                                    label: "",
                                    groupId: ""
                                }, {
                                    kind: "videoinput",
                                    deviceId: "default",
                                    label: "",
                                    groupId: ""
                                }];
                                e(t)
                            })
                        }, 41 > c) {
                        var d = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
                        navigator.mediaDevices.enumerateDevices = function () {
                            return d().then(void 0, function (e) {
                                if ("NotFoundError" === e.name) return [];
                                throw e
                            })
                        }
                    }
                } else if (navigator.webkitGetUserMedia && window.webkitRTCPeerConnection) {
                p.log("This appears to be Chrome"), s = "chrome", c = p.extractVersion(navigator.userAgent, /Chrom(e|ium)\/([0-9]+)\./, 2), u = 38, window.RTCPeerConnection = function (e, t) {
                    e && e.iceTransportPolicy && (e.iceTransports = e.iceTransportPolicy);
                    var n = new webkitRTCPeerConnection(e, t),
                        r = n.getStats.bind(n);
                    return n.getStats = function (e, t) {
                        var n = this,
                            i = arguments;
                        if (arguments.length > 0 && "function" == typeof e) return r(e, t);
                        var o = function (e) {
                            var t = {},
                                n = e.result();
                            return n.forEach(function (e) {
                                var n = {
                                    id: e.id,
                                    timestamp: e.timestamp,
                                    type: e.type
                                };
                                e.names().forEach(function (t) {
                                    n[t] = e.stat(t)
                                }), t[n.id] = n
                            }), t
                        };
                        if (arguments.length >= 2) {
                            var a = function (e) {
                                i[1](o(e))
                            };
                            return r.apply(this, [a, arguments[0]])
                        }
                        return new Promise(function (t, a) {
                            1 === i.length && null === e ? r.apply(n, [function (e) {
                                t.apply(null, [o(e)])
                            }, a]) : r.apply(n, [t, a])
                        })
                    }, n
                }, window.RTCPeerConnection.prototype = webkitRTCPeerConnection.prototype, webkitRTCPeerConnection.generateCertificate && Object.defineProperty(window.RTCPeerConnection, "generateCertificate", {
                    get: function () {
                        return arguments.length ? webkitRTCPeerConnection.generateCertificate.apply(null, arguments) : webkitRTCPeerConnection.generateCertificate
                    }
                }), ["createOffer", "createAnswer"].forEach(function (e) {
                    var t = webkitRTCPeerConnection.prototype[e];
                    webkitRTCPeerConnection.prototype[e] = function () {
                        var e = this;
                        if (arguments.length < 1 || 1 === arguments.length && "object" == typeof arguments[0]) {
                            var n = 1 === arguments.length ? arguments[0] : void 0;
                            return new Promise(function (r, i) {
                                t.apply(e, [r, i, n])
                            })
                        }
                        return t.apply(this, arguments)
                    }
                }), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (e) {
                    var t = webkitRTCPeerConnection.prototype[e];
                    webkitRTCPeerConnection.prototype[e] = function () {
                        var e = arguments,
                            n = this;
                        return new Promise(function (r, i) {
                            t.apply(n, [e[0], function () {
                                r(), e.length >= 2 && e[1].apply(null, [])
                            }, function (t) {
                                i(t), e.length >= 3 && e[2].apply(null, [t])
                            }])
                        })
                    }
                });
                var l = function (e) {
                    if ("object" != typeof e || e.mandatory || e.optional) return e;
                    var t = {};
                    return Object.keys(e).forEach(function (n) {
                        if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
                            var r = "object" == typeof e[n] ? e[n] : {
                                ideal: e[n]
                            };
                            void 0 !== r.exact && "number" == typeof r.exact && (r.min = r.max = r.exact);
                            var i = function (e, t) {
                                return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" : t
                            };
                            if (void 0 !== r.ideal) {
                                t.optional = t.optional || [];
                                var o = {};
                                "number" == typeof r.ideal ? (o[i("min", n)] = r.ideal, t.optional.push(o), o = {}, o[i("max", n)] = r.ideal, t.optional.push(o)) : (o[i("", n)] = r.ideal, t.optional.push(o))
                            }
                            void 0 !== r.exact && "number" != typeof r.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[i("", n)] = r.exact) : ["min", "max"].forEach(function (e) {
                                void 0 !== r[e] && (t.mandatory = t.mandatory || {}, t.mandatory[i(e, n)] = r[e])
                            })
                        }
                    }), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t
                };
                if (i = function (e, t, n) {
                        return e.audio && (e.audio = l(e.audio)), e.video && (e.video = l(e.video)), p.log("chrome: " + JSON.stringify(e)), navigator.webkitGetUserMedia(e, t, n)
                    }, navigator.getUserMedia = i, navigator.mediaDevices || (navigator.mediaDevices = {
                        getUserMedia: r,
                        enumerateDevices: function () {
                            return new Promise(function (e) {
                                var t = {
                                    audio: "audioinput",
                                    video: "videoinput"
                                };
                                return MediaStreamTrack.getSources(function (n) {
                                    e(n.map(function (e) {
                                        return {
                                            label: e.label,
                                            kind: t[e.kind],
                                            deviceId: e.id,
                                            groupId: ""
                                        }
                                    }))
                                })
                            })
                        }
                    }), navigator.mediaDevices.getUserMedia) {
                    var f = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                    navigator.mediaDevices.getUserMedia = function (e) {
                        return p.log("spec:   " + JSON.stringify(e)), e.audio = l(e.audio), e.video = l(e.video), p.log("chrome: " + JSON.stringify(e)), f(e)
                    }
                } else navigator.mediaDevices.getUserMedia = function (e) {
                    return r(e)
                };
                "undefined" == typeof navigator.mediaDevices.addEventListener && (navigator.mediaDevices.addEventListener = function () {
                    p.log("Dummy mediaDevices.addEventListener called.")
                }), "undefined" == typeof navigator.mediaDevices.removeEventListener && (navigator.mediaDevices.removeEventListener = function () {
                    p.log("Dummy mediaDevices.removeEventListener called.")
                }), o = function (e, t) {
                    c >= 43 ? e.srcObject = t : "undefined" != typeof e.src ? e.src = URL.createObjectURL(t) : p.log("Error attaching stream to element.")
                }, a = function (e, t) {
                    c >= 43 ? e.srcObject = t.srcObject : e.src = t.src
                }
            } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
                if (p.log("This appears to be Edge"), s = "edge", c = p.extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2), u = 10547, window.RTCIceGatherer) {
                    var h = function () {
                            return Math.random().toString(36).substr(2, 10)
                        },
                        m = h(),
                        g = {};
                    g.splitLines = function (e) {
                        return e.trim().split("\n").map(function (e) {
                            return e.trim()
                        })
                    }, g.splitSections = function (e) {
                        var t = e.split("\r\nm=");
                        return t.map(function (e, t) {
                            return (t > 0 ? "m=" + e : e).trim() + "\r\n"
                        })
                    }, g.matchPrefix = function (e, t) {
                        return g.splitLines(e).filter(function (e) {
                            return 0 === e.indexOf(t)
                        })
                    }, g.parseCandidate = function (e) {
                        var t;
                        t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" ");
                        for (var n = {
                                foundation: t[0],
                                component: t[1],
                                protocol: t[2].toLowerCase(),
                                priority: parseInt(t[3], 10),
                                ip: t[4],
                                port: parseInt(t[5], 10),
                                type: t[7]
                            }, r = 8; r < t.length; r += 2) switch (t[r]) {
                            case "raddr":
                                n.relatedAddress = t[r + 1];
                                break;
                            case "rport":
                                n.relatedPort = parseInt(t[r + 1], 10);
                                break;
                            case "tcptype":
                                n.tcpType = t[r + 1]
                        }
                        return n
                    }, g.writeCandidate = function (e) {
                        var t = [];
                        t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.ip), t.push(e.port);
                        var n = e.type;
                        return t.push("typ"), t.push(n), "host" !== n && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), "candidate:" + t.join(" ")
                    }, g.parseRtpMap = function (e) {
                        var t = e.substr(9).split(" "),
                            n = {
                                payloadType: parseInt(t.shift(), 10)
                            };
                        return t = t[0].split("/"), n.name = t[0], n.clockRate = parseInt(t[1], 10), n.numChannels = 3 === t.length ? parseInt(t[2], 10) : 1, n
                    }, g.writeRtpMap = function (e) {
                        var t = e.payloadType;
                        return void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType), "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== e.numChannels ? "/" + e.numChannels : "") + "\r\n"
                    }, g.parseFmtp = function (e) {
                        for (var t, n = {}, r = e.substr(e.indexOf(" ") + 1).split(";"), i = 0; i < r.length; i++) t = r[i].trim().split("="), n[t[0].trim()] = t[1];
                        return n
                    }, g.writeFtmp = function (e) {
                        var t = "",
                            n = e.payloadType;
                        if (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.parameters && e.parameters.length) {
                            var r = [];
                            Object.keys(e.parameters).forEach(function (t) {
                                r.push(t + "=" + e.parameters[t])
                            }), t += "a=fmtp:" + n + " " + r.join(";") + "\r\n"
                        }
                        return t
                    }, g.parseRtcpFb = function (e) {
                        var t = e.substr(e.indexOf(" ") + 1).split(" ");
                        return {
                            type: t.shift(),
                            parameter: t.join(" ")
                        }
                    }, g.writeRtcpFb = function (e) {
                        var t = "",
                            n = e.payloadType;
                        return void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function (e) {
                            t += "a=rtcp-fb:" + n + " " + e.type + " " + e.parameter + "\r\n"
                        }), t
                    }, g.parseSsrcMedia = function (e) {
                        var t = e.indexOf(" "),
                            n = {
                                ssrc: e.substr(7, t - 7)
                            },
                            r = e.indexOf(":", t);
                        return r > -1 ? (n.attribute = e.substr(t + 1, r - t - 1), n.value = e.substr(r + 1)) : n.attribute = e.substr(t + 1), n
                    }, g.getDtlsParameters = function (e, t) {
                        var n = g.splitLines(e);
                        n = n.concat(g.splitLines(t));
                        var r = n.filter(function (e) {
                                return 0 === e.indexOf("a=fingerprint:")
                            })[0].substr(14),
                            i = {
                                role: "auto",
                                fingerprints: [{
                                    algorithm: r.split(" ")[0],
                                    value: r.split(" ")[1]
                                }]
                            };
                        return i
                    }, g.writeDtlsParameters = function (e, t) {
                        var n = "a=setup:" + t + "\r\n";
                        return e.fingerprints.forEach(function (e) {
                            n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
                        }), n
                    }, g.getIceParameters = function (e, t) {
                        var n = g.splitLines(e);
                        n = n.concat(g.splitLines(t));
                        var r = {
                            usernameFragment: n.filter(function (e) {
                                return 0 === e.indexOf("a=ice-ufrag:")
                            })[0].substr(12),
                            password: n.filter(function (e) {
                                return 0 === e.indexOf("a=ice-pwd:")
                            })[0].substr(10)
                        };
                        return r
                    }, g.writeIceParameters = function (e) {
                        return "a=ice-ufrag:" + e.usernameFragment + "\r\n" + "a=ice-pwd:" + e.password + "\r\n"
                    }, g.parseRtpParameters = function (e) {
                        for (var t = {
                                codecs: [],
                                headerExtensions: [],
                                fecMechanisms: [],
                                rtcp: []
                            }, n = g.splitLines(e), r = n[0].split(" "), i = 3; i < r.length; i++) {
                            var o = r[i],
                                a = g.matchPrefix(e, "a=rtpmap:" + o + " ")[0];
                            if (a) {
                                var s = g.parseRtpMap(a),
                                    c = g.matchPrefix(e, "a=fmtp:" + o + " ");
                                s.parameters = c.length ? g.parseFmtp(c[0]) : {}, s.rtcpFeedback = g.matchPrefix(e, "a=rtcp-fb:" + o + " ").map(g.parseRtcpFb), t.codecs.push(s)
                            }
                        }
                        return t
                    }, g.writeRtpDescription = function (e, t) {
                        var n = "";
                        return n += "m=" + e + " ", n += t.codecs.length > 0 ? "9" : "0", n += " UDP/TLS/RTP/SAVPF ", n += t.codecs.map(function (e) {
                            return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType
                        }).join(" ") + "\r\n", n += "c=IN IP4 0.0.0.0\r\n", n += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function (e) {
                            n += g.writeRtpMap(e), n += g.writeFtmp(e), n += g.writeRtcpFb(e)
                        }), n += "a=rtcp-mux\r\n"
                    }, g.writeSessionBoilerplate = function () {
                        return "v=0\r\no=thisisadapterortc 8169639915646943137 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
                    }, g.writeMediaSection = function (e, t, n, r) {
                        var i = g.writeRtpDescription(e.kind, t);
                        if (i += g.writeIceParameters(e.iceGatherer.getLocalParameters()), i += g.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass" : "active"), i += "a=mid:" + e.mid + "\r\n", i += e.rtpSender && e.rtpReceiver ? "a=sendrecv\r\n" : e.rtpSender ? "a=sendonly\r\n" : e.rtpReceiver ? "a=recvonly\r\n" : "a=inactive\r\n", e.rtpSender) {
                            var o = "msid:" + r.id + " " + e.rtpSender.track.id + "\r\n";
                            i += "a=" + o, i += "a=ssrc:" + e.sendSsrc + " " + o
                        }
                        return i += "a=ssrc:" + e.sendSsrc + " cname:" + m + "\r\n"
                    }, g.getDirection = function (e, t) {
                        for (var n = g.splitLines(e), r = 0; r < n.length; r++) switch (n[r]) {
                            case "a=sendrecv":
                            case "a=sendonly":
                            case "a=recvonly":
                            case "a=inactive":
                                return n[r].substr(2)
                        }
                        return t ? g.getDirection(t) : "sendrecv"
                    }, window.RTCIceCandidate || (window.RTCIceCandidate = function (e) {
                        return e
                    }), window.RTCSessionDescription || (window.RTCSessionDescription = function (e) {
                        return e
                    }), window.RTCPeerConnection = function (e) {
                        var t = this;
                        if (this.onicecandidate = null, this.onaddstream = null, this.onremovestream = null, this.onsignalingstatechange = null, this.oniceconnectionstatechange = null, this.onnegotiationneeded = null, this.ondatachannel = null, this.localStreams = [], this.remoteStreams = [], this.getLocalStreams = function () {
                                return t.localStreams
                            }, this.getRemoteStreams = function () {
                                return t.remoteStreams
                            }, this.localDescription = new C({
                                type: "",
                                sdp: ""
                            }), this.remoteDescription = new C({
                                type: "",
                                sdp: ""
                            }), this.signalingState = "stable", this.iceConnectionState = "new", this.iceOptions = {
                                gatherPolicy: "all",
                                iceServers: []
                            }, e && e.iceTransportPolicy) switch (e.iceTransportPolicy) {
                            case "all":
                            case "relay":
                                this.iceOptions.gatherPolicy = e.iceTransportPolicy;
                                break;
                            case "none":
                                throw new TypeError('iceTransportPolicy "none" not supported')
                        }
                        e && e.iceServers && e.iceServers.forEach(function (e) {
                            if (e.urls) {
                                var n;
                                n = "string" == typeof e.urls ? e.urls : e.urls[0], -1 !== n.indexOf("transport=udp") && t.iceServers.push({
                                    username: e.username,
                                    credential: e.credential,
                                    urls: n
                                })
                            }
                        }), this.transceivers = [], this._localIceCandidatesBuffer = []
                    }, window.RTCPeerConnection.prototype._emitBufferedCandidates = function () {
                        var e = this;
                        this._localIceCandidatesBuffer.forEach(function (t) {
                            null !== e.onicecandidate && e.onicecandidate(t)
                        }), this._localIceCandidatesBuffer = []
                    }, window.RTCPeerConnection.prototype.addStream = function (e) {
                        this.localStreams.push(e.clone()), this._maybeFireNegotiationNeeded()
                    }, window.RTCPeerConnection.prototype.removeStream = function (e) {
                        var t = this.localStreams.indexOf(e);
                        t > -1 && (this.localStreams.splice(t, 1), this._maybeFireNegotiationNeeded())
                    }, window.RTCPeerConnection.prototype._getCommonCapabilities = function (e, t) {
                        var n = {
                            codecs: [],
                            headerExtensions: [],
                            fecMechanisms: []
                        };
                        return e.codecs.forEach(function (e) {
                            for (var r = 0; r < t.codecs.length; r++) {
                                var i = t.codecs[r];
                                if (e.name.toLowerCase() === i.name.toLowerCase() && e.clockRate === i.clockRate && e.numChannels === i.numChannels) {
                                    n.codecs.push(i);
                                    break
                                }
                            }
                        }), e.headerExtensions.forEach(function (e) {
                            for (var r = 0; r < t.headerExtensions.length; r++) {
                                var i = t.headerExtensions[r];
                                if (e.uri === i.uri) {
                                    n.headerExtensions.push(i);
                                    break
                                }
                            }
                        }), n
                    }, window.RTCPeerConnection.prototype._createIceAndDtlsTransports = function (e, t) {
                        var n = this,
                            r = new RTCIceGatherer(n.iceOptions),
                            i = new RTCIceTransport(r);
                        r.onlocalcandidate = function (o) {
                            var a = {};
                            a.candidate = {
                                sdpMid: e,
                                sdpMLineIndex: t
                            };
                            var s = o.candidate;
                            s && 0 !== Object.keys(s).length ? (s.component = "RTCP" === i.component ? 2 : 1, a.candidate.candidate = g.writeCandidate(s)) : (void 0 === r.state && (r.state = "completed"), a.candidate.candidate = "candidate:1 1 udp 1 0.0.0.0 9 typ endOfCandidates");
                            var c = n.transceivers.every(function (e) {
                                return e.iceGatherer && "completed" === e.iceGatherer.state
                            });
                            null !== n.onicecandidate && (n.localDescription && "" === n.localDescription.type ? (n._localIceCandidatesBuffer.push(a), c && n._localIceCandidatesBuffer.push({})) : (n.onicecandidate(a), c && n.onicecandidate({})))
                        }, i.onicestatechange = function () {
                            n._updateConnectionState()
                        };
                        var o = new RTCDtlsTransport(i);
                        return o.ondtlsstatechange = function () {
                            n._updateConnectionState()
                        }, o.onerror = function () {
                            o.state = "failed", n._updateConnectionState()
                        }, {
                            iceGatherer: r,
                            iceTransport: i,
                            dtlsTransport: o
                        }
                    }, window.RTCPeerConnection.prototype._transceive = function (e, t, n) {
                        var r = this._getCommonCapabilities(e.localCapabilities, e.remoteCapabilities);
                        t && e.rtpSender && (r.encodings = [{
                            ssrc: e.sendSsrc
                        }], r.rtcp = {
                            cname: m,
                            ssrc: e.recvSsrc
                        }, e.rtpSender.send(r)), n && e.rtpReceiver && (r.encodings = [{
                            ssrc: e.recvSsrc
                        }], r.rtcp = {
                            cname: e.cname,
                            ssrc: e.sendSsrc
                        }, e.rtpReceiver.receive(r))
                    }, window.RTCPeerConnection.prototype.setLocalDescription = function (e) {
                        var t = this;
                        if ("offer" === e.type) this._pendingOffer && (this.transceivers = this._pendingOffer, delete this._pendingOffer);
                        else if ("answer" === e.type) {
                            var n = g.splitSections(t.remoteDescription.sdp),
                                r = n.shift();
                            n.forEach(function (e, n) {
                                var i = t.transceivers[n],
                                    o = i.iceGatherer,
                                    a = i.iceTransport,
                                    s = i.dtlsTransport,
                                    c = i.localCapabilities,
                                    u = i.remoteCapabilities,
                                    p = "0" === e.split("\n", 1)[0].split(" ", 2)[1];
                                if (!p) {
                                    var d = g.getIceParameters(e, r);
                                    a.start(o, d, "controlled");
                                    var l = g.getDtlsParameters(e, r);
                                    s.start(l);
                                    var f = t._getCommonCapabilities(c, u);
                                    t._transceive(i, f.codecs.length > 0, !1)
                                }
                            })
                        }
                        switch (this.localDescription = e, e.type) {
                            case "offer":
                                this._updateSignalingState("have-local-offer");
                                break;
                            case "answer":
                                this._updateSignalingState("stable");
                                break;
                            default:
                                throw new TypeError('unsupported type "' + e.type + '"')
                        }
                        var i = arguments.length > 1 && "function" == typeof arguments[1];
                        if (i) {
                            var o = arguments[1];
                            window.setTimeout(function () {
                                o(), t._emitBufferedCandidates()
                            }, 0)
                        }
                        var a = Promise.resolve();
                        return a.then(function () {
                            i || window.setTimeout(t._emitBufferedCandidates.bind(t), 0)
                        }), a
                    }, window.RTCPeerConnection.prototype.setRemoteDescription = function (e) {
                        var t = this,
                            n = new MediaStream,
                            r = g.splitSections(e.sdp),
                            i = r.shift();
                        switch (r.forEach(function (r, o) {
                            var a, s, c, u, p, d, l, f, h, m, v, y = g.splitLines(r),
                                b = y[0].substr(2).split(" "),
                                w = b[0],
                                C = "0" === b[1],
                                S = g.getDirection(r, i),
                                k = g.parseRtpParameters(r);
                            C || (m = g.getIceParameters(r, i), v = g.getDtlsParameters(r, i));
                            var T, R = g.matchPrefix(r, "a=mid:")[0].substr(6),
                                P = g.matchPrefix(r, "a=ssrc:").map(function (e) {
                                    return g.parseSsrcMedia(e)
                                }).filter(function (e) {
                                    return "cname" === e.attribute
                                })[0];
                            if (P && (f = parseInt(P.ssrc, 10), T = P.value), "offer" === e.type) {
                                var E = t._createIceAndDtlsTransports(R, o);
                                if (h = RTCRtpReceiver.getCapabilities(w), l = 1001 * (2 * o + 2), d = new RTCRtpReceiver(E.dtlsTransport, w), n.addTrack(d.track), t.localStreams.length > 0 && t.localStreams[0].getTracks().length >= o) {
                                    var x = t.localStreams[0].getTracks()[o];
                                    p = new RTCRtpSender(x, E.dtlsTransport)
                                }
                                t.transceivers[o] = {
                                    iceGatherer: E.iceGatherer,
                                    iceTransport: E.iceTransport,
                                    dtlsTransport: E.dtlsTransport,
                                    localCapabilities: h,
                                    remoteCapabilities: k,
                                    rtpSender: p,
                                    rtpReceiver: d,
                                    kind: w,
                                    mid: R,
                                    cname: T,
                                    sendSsrc: l,
                                    recvSsrc: f
                                }, t._transceive(t.transceivers[o], !1, "sendrecv" === S || "sendonly" === S)
                            } else "answer" !== e.type || C || (a = t.transceivers[o], s = a.iceGatherer, c = a.iceTransport, u = a.dtlsTransport, p = a.rtpSender, d = a.rtpReceiver, l = a.sendSsrc, h = a.localCapabilities, t.transceivers[o].recvSsrc = f, t.transceivers[o].remoteCapabilities = k, t.transceivers[o].cname = T, c.start(s, m, "controlling"), u.start(v), t._transceive(a, "sendrecv" === S || "recvonly" === S, "sendrecv" === S || "sendonly" === S), !d || "sendrecv" !== S && "sendonly" !== S ? delete a.rtpReceiver : n.addTrack(d.track))
                        }), this.remoteDescription = e, e.type) {
                            case "offer":
                                this._updateSignalingState("have-remote-offer");
                                break;
                            case "answer":
                                this._updateSignalingState("stable");
                                break;
                            default:
                                throw new TypeError('unsupported type "' + e.type + '"')
                        }
                        return window.setTimeout(function () {
                            null !== t.onaddstream && n.getTracks().length && (t.remoteStreams.push(n), window.setTimeout(function () {
                                t.onaddstream({
                                    stream: n
                                })
                            }, 0))
                        }, 0), arguments.length > 1 && "function" == typeof arguments[1] && window.setTimeout(arguments[1], 0), Promise.resolve()
                    }, window.RTCPeerConnection.prototype.close = function () {
                        this.transceivers.forEach(function (e) {
                            e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender && e.rtpSender.stop(), e.rtpReceiver && e.rtpReceiver.stop()
                        }), this._updateSignalingState("closed")
                    }, window.RTCPeerConnection.prototype._updateSignalingState = function (e) {
                        this.signalingState = e, null !== this.onsignalingstatechange && this.onsignalingstatechange()
                    }, window.RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function () {
                        null !== this.onnegotiationneeded && this.onnegotiationneeded()
                    }, window.RTCPeerConnection.prototype._updateConnectionState = function () {
                        var e, t = this,
                            n = {
                                "new": 0,
                                closed: 0,
                                connecting: 0,
                                checking: 0,
                                connected: 0,
                                completed: 0,
                                failed: 0
                            };
                        this.transceivers.forEach(function (e) {
                            n[e.iceTransport.state]++, n[e.dtlsTransport.state]++
                        }), n.connected += n.completed, e = "new", n.failed > 0 ? e = "failed" : n.connecting > 0 || n.checking > 0 ? e = "connecting" : n.disconnected > 0 ? e = "disconnected" : n.new > 0 ? e = "new" : (n.connecting > 0 || n.completed > 0) && (e = "connected"), e !== t.iceConnectionState && (t.iceConnectionState = e, null !== this.oniceconnectionstatechange && this.oniceconnectionstatechange())
                    }, window.RTCPeerConnection.prototype.createOffer = function () {
                        var e = this;
                        if (this._pendingOffer) throw new Error("createOffer called while there is a pending offer.");
                        var t;
                        1 === arguments.length && "function" != typeof arguments[0] ? t = arguments[0] : 3 === arguments.length && (t = arguments[2]);
                        var n = [],
                            r = 0,
                            i = 0;
                        if (this.localStreams.length && (r = this.localStreams[0].getAudioTracks().length, i = this.localStreams[0].getVideoTracks().length), t) {
                            if (t.mandatory || t.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
                            void 0 !== t.offerToReceiveAudio && (r = t.offerToReceiveAudio), void 0 !== t.offerToReceiveVideo && (i = t.offerToReceiveVideo)
                        }
                        for (this.localStreams.length && this.localStreams[0].getTracks().forEach(function (e) {
                                n.push({
                                    kind: e.kind,
                                    track: e,
                                    wantReceive: "audio" === e.kind ? r > 0 : i > 0
                                }), "audio" === e.kind ? r-- : "video" === e.kind && i--
                            }); r > 0 || i > 0;) r > 0 && (n.push({
                            kind: "audio",
                            wantReceive: !0
                        }), r--), i > 0 && (n.push({
                            kind: "video",
                            wantReceive: !0
                        }), i--);
                        var o = g.writeSessionBoilerplate(),
                            a = [];
                        n.forEach(function (t, n) {
                            var r, i, s = t.track,
                                c = t.kind,
                                u = h(),
                                p = e._createIceAndDtlsTransports(u, n),
                                d = RTCRtpSender.getCapabilities(c),
                                l = 1001 * (2 * n + 1);
                            s && (r = new RTCRtpSender(s, p.dtlsTransport)), t.wantReceive && (i = new RTCRtpReceiver(p.dtlsTransport, c)), a[n] = {
                                iceGatherer: p.iceGatherer,
                                iceTransport: p.iceTransport,
                                dtlsTransport: p.dtlsTransport,
                                localCapabilities: d,
                                remoteCapabilities: null,
                                rtpSender: r,
                                rtpReceiver: i,
                                kind: c,
                                mid: u,
                                sendSsrc: l,
                                recvSsrc: null
                            };
                            var f = a[n];
                            o += g.writeMediaSection(f, f.localCapabilities, "offer", e.localStreams[0])
                        }), this._pendingOffer = a;
                        var s = new C({
                            type: "offer",
                            sdp: o
                        });
                        return arguments.length && "function" == typeof arguments[0] && window.setTimeout(arguments[0], 0, s), Promise.resolve(s)
                    }, window.RTCPeerConnection.prototype.createAnswer = function () {
                        var e, t = this;
                        1 === arguments.length && "function" != typeof arguments[0] ? e = arguments[0] : 3 === arguments.length && (e = arguments[2]);
                        var n = g.writeSessionBoilerplate();
                        this.transceivers.forEach(function (e) {
                            var r = t._getCommonCapabilities(e.localCapabilities, e.remoteCapabilities);
                            n += g.writeMediaSection(e, r, "answer", t.localStreams[0])
                        });
                        var r = new C({
                            type: "answer",
                            sdp: n
                        });
                        return arguments.length && "function" == typeof arguments[0] && window.setTimeout(arguments[0], 0, r), Promise.resolve(r)
                    }, window.RTCPeerConnection.prototype.addIceCandidate = function (e) {
                        var t = e.sdpMLineIndex;
                        if (e.sdpMid)
                            for (var n = 0; n < this.transceivers.length; n++)
                                if (this.transceivers[n].mid === e.sdpMid) {
                                    t = n;
                                    break
                                }
                        var r = this.transceivers[t];
                        if (r) {
                            var i = Object.keys(e.candidate).length > 0 ? g.parseCandidate(e.candidate) : {};
                            if ("tcp" === i.protocol && 0 === i.port) return;
                            if ("1" !== i.component) return;
                            "endOfCandidates" === i.type && (i = {}), r.iceTransport.addRemoteCandidate(i)
                        }
                        return arguments.length > 1 && "function" == typeof arguments[1] && window.setTimeout(arguments[1], 0), Promise.resolve()
                    }, window.RTCPeerConnection.prototype.getStats = function () {
                        var e = [];
                        this.transceivers.forEach(function (t) {
                            ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function (n) {
                                t[n] && e.push(t[n].getStats())
                            })
                        });
                        var t = arguments.length > 1 && "function" == typeof arguments[1] && arguments[1];
                        return new Promise(function (n) {
                            var r = {};
                            Promise.all(e).then(function (e) {
                                e.forEach(function (e) {
                                    Object.keys(e).forEach(function (t) {
                                        r[t] = e[t]
                                    })
                                }), t && window.setTimeout(t, 0, r), n(r)
                            })
                        })
                    }
                }
            } else p.log("Browser does not appear to be WebRTC-capable");
            else p.log("This does not appear to be a browser"), s = "not a browser";
            "object" != typeof window || !window.RTCPeerConnection || "ontrack" in window.RTCPeerConnection.prototype || Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", {
                get: function () {
                    return this._ontrack
                },
                set: function (e) {
                    var t = this;
                    this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = e), this.addEventListener("addstream", this._ontrackpoly = function (e) {
                        "chrome" === s && e.stream.addEventListener("addtrack", function (n) {
                            var r = new Event("track");
                            r.track = n.track, r.receiver = {
                                track: n.track
                            }, r.streams = [e.stream], t.dispatchEvent(r)
                        }), e.stream.getTracks().forEach(function (t) {
                            var n = new Event("track");
                            n.track = t, n.receiver = {
                                track: t
                            }, n.streams = [e.stream], this.dispatchEvent(n)
                        }.bind(this))
                    }.bind(this))
                }
            });
            var v = {};
            try {
                Object.defineProperty(v, "version", {
                    set: function (e) {
                        c = e
                    }
                })
            } catch (y) {}
            if ("undefined" != typeof n) {
                var b, w, C;
                "undefined" != typeof window && (b = window.RTCPeerConnection, w = window.RTCIceCandidate, C = window.RTCSessionDescription), n.exports = {
                    RTCPeerConnection: b,
                    RTCIceCandidate: w,
                    RTCSessionDescription: C,
                    getUserMedia: i,
                    attachMediaStream: o,
                    reattachMediaStream: a,
                    webrtcDetectedBrowser: s,
                    webrtcDetectedVersion: c,
                    webrtcMinimumVersion: u,
                    webrtcTesting: v,
                    webrtcUtils: p
                }
            } else "function" == typeof t && "function" == typeof e && e([], function () {
                return {
                    RTCPeerConnection: window.RTCPeerConnection,
                    RTCIceCandidate: window.RTCIceCandidate,
                    RTCSessionDescription: window.RTCSessionDescription,
                    getUserMedia: i,
                    attachMediaStream: o,
                    reattachMediaStream: a,
                    webrtcDetectedBrowser: s,
                    webrtcDetectedVersion: c,
                    webrtcMinimumVersion: u,
                    webrtcTesting: v,
                    webrtcUtils: p
                }
            })
        }, {}],
        9: [function (e, t) {
            function n(e) {
                var t = this;
                a.call(this), this.id = e.id, this.parent = e.parent, this.type = e.type || "video", this.oneway = e.oneway || !1, this.sharemyscreen = e.sharemyscreen || !1, this.browserPrefix = e.prefix, this.stream = e.stream, this.enableDataChannels = void 0 === e.enableDataChannels ? this.parent.config.enableDataChannels : e.enableDataChannels, this.receiveMedia = e.receiveMedia || this.parent.config.receiveMedia, this.channels = {}, this.sid = e.sid || Date.now().toString(), this.pc = new o(this.parent.config.peerConnectionConfig, this.parent.config.peerConnectionConstraints), this.pc.on("ice", this.onIceCandidate.bind(this)), this.pc.on("endOfCandidates", function (e) {
                    t.send("endOfCandidates", e)
                }), this.pc.on("offer", function (e) {
                    t.parent.config.nick && (e.nick = t.parent.config.nick), t.send("offer", e)
                }), this.pc.on("answer", function (e) {
                    t.parent.config.nick && (e.nick = t.parent.config.nick), t.send("answer", e)
                }), this.pc.on("addStream", this.handleRemoteStreamAdded.bind(this)), this.pc.on("addChannel", this.handleDataChannelAdded.bind(this)), this.pc.on("removeStream", this.handleStreamRemoved.bind(this)), this.pc.on("negotiationNeeded", this.emit.bind(this, "negotiationNeeded")), this.pc.on("iceConnectionStateChange", this.emit.bind(this, "iceConnectionStateChange")), this.pc.on("iceConnectionStateChange", function () {
                    switch (t.pc.iceConnectionState) {
                        case "failed":
                            "offer" === t.pc.pc.peerconnection.localDescription.type && (t.parent.emit("iceFailed", t), t.send("connectivityError"))
                    }
                }), this.pc.on("signalingStateChange", this.emit.bind(this, "signalingStateChange")), this.logger = this.parent.logger, "screen" === e.type ? this.parent.localScreen && this.sharemyscreen && (this.logger.log("adding local screen stream to peer connection"), this.pc.addStream(this.parent.localScreen), this.broadcaster = e.broadcaster) : this.parent.localStreams.forEach(function (e) {
                    t.pc.addStream(e)
                }), this.on("channelOpen", function (e) {
                    e.protocol === c && (e.onmessage = function (n) {
                        var r = JSON.parse(n.data),
                            i = new s.Receiver;
                        i.receive(r, e), t.emit("fileTransfer", r, i), i.on("receivedFile", function () {
                            i.channel.close()
                        })
                    })
                }), this.on("*", function () {
                    t.parent.emit.apply(t.parent, arguments)
                })
            }
            var r = e("util"),
                i = e("webrtcsupport"),
                o = e("rtcpeerconnection"),
                a = e("wildemitter"),
                s = e("filetransfer"),
                c = "https://simplewebrtc.com/protocol/filetransfer#inband-v1";
            r.inherits(n, a), n.prototype.handleMessage = function (e) {
                var t = this;
                if (this.logger.log("getting", e.type, e), e.prefix && (this.browserPrefix = e.prefix), "offer" === e.type) this.nick || (this.nick = e.payload.nick), delete e.payload.nick, this.pc.handleOffer(e.payload, function (e) {
                    e || t.pc.answer(function () {})
                });
                else if ("answer" === e.type) this.nick || (this.nick = e.payload.nick), delete e.payload.nick, this.pc.handleAnswer(e.payload);
                else if ("candidate" === e.type) this.pc.processIce(e.payload);
                else if ("connectivityError" === e.type) this.parent.emit("connectivityError", t);
                else if ("mute" === e.type) this.parent.emit("mute", {
                    id: e.from,
                    name: e.payload.name
                });
                else if ("unmute" === e.type) this.parent.emit("unmute", {
                    id: e.from,
                    name: e.payload.name
                });
                else if ("endOfCandidates" === e.type) {
                    var n = this.pc.pc.peerconnection.transceivers || [];
                    n.forEach(function (e) {
                        e.iceTransport && e.iceTransport.addRemoteCandidate({})
                    })
                }
            }, n.prototype.send = function (e, t) {
                var n = {
                    to: this.id,
                    sid: this.sid,
                    broadcaster: this.broadcaster,
                    roomType: this.type,
                    type: e,
                    payload: t,
                    prefix: i.prefix
                };
                this.logger.log("sending", e, n), this.parent.emit("message", n)
            }, n.prototype.sendDirectly = function (e, t, n) {
                var r = {
                    type: t,
                    payload: n
                };
                this.logger.log("sending via datachannel", e, t, r);
                var i = this.getDataChannel(e);
                return "open" != i.readyState ? !1 : (i.send(JSON.stringify(r)), !0)
            }, n.prototype._observeDataChannel = function (e) {
                var t = this;
                e.onclose = this.emit.bind(this, "channelClose", e), e.onerror = this.emit.bind(this, "channelError", e), e.onmessage = function (n) {
                    t.emit("channelMessage", t, e.label, JSON.parse(n.data), e, n)
                }, e.onopen = this.emit.bind(this, "channelOpen", e)
            }, n.prototype.getDataChannel = function (e, t) {
                if (!i.supportDataChannel) return this.emit("error", new Error("createDataChannel not supported"));
                var n = this.channels[e];
                return t || (t = {}), n ? n : (n = this.channels[e] = this.pc.createDataChannel(e, t), this._observeDataChannel(n), n)
            }, n.prototype.onIceCandidate = function (e) {
                if (!this.closed)
                    if (e) {
                        var t = this.parent.config.peerConnectionConfig;
                        "moz" === i.prefix && t && t.iceTransports && e.candidate && e.candidate.candidate && e.candidate.candidate.indexOf(t.iceTransports) < 0 ? this.logger.log("Ignoring ice candidate not matching pcConfig iceTransports type: ", t.iceTransports) : this.send("candidate", e)
                    } else this.logger.log("End of candidates.")
            }, n.prototype.start = function () {
                this.enableDataChannels && this.getDataChannel("simplewebrtc"), this.pc.offer(this.receiveMedia, function () {})
            }, n.prototype.icerestart = function () {
                var e = this.receiveMedia;
                e.mandatory.IceRestart = !0, this.pc.offer(e, function () {})
            }, n.prototype.end = function () {
                this.closed || (this.pc.close(), this.handleStreamRemoved())
            }, n.prototype.handleRemoteStreamAdded = function (e) {
                var t = this;
                this.stream ? this.logger.warn("Already have a remote stream") : (this.stream = e.stream, this.stream.onended = function () {
                    t.end()
                }, this.parent.emit("peerStreamAdded", this))
            }, n.prototype.handleStreamRemoved = function () {
                this.parent.peers.splice(this.parent.peers.indexOf(this), 1), this.closed = !0, this.parent.emit("peerStreamRemoved", this)
            }, n.prototype.handleDataChannelAdded = function (e) {
                this.channels[e.label] = e, this._observeDataChannel(e)
            }, n.prototype.sendFile = function (e) {
                var t = new s.Sender,
                    n = this.getDataChannel("filetransfer" + (new Date).getTime(), {
                        protocol: c
                    });
                return n.onopen = function () {
                    n.send(JSON.stringify({
                        size: e.size,
                        name: e.name
                    })), t.send(e, n)
                }, n.onclose = function () {
                    console.log("sender received transfer"), t.emit("complete")
                }, t
            }, t.exports = n
        }, {
            filetransfer: 15,
            rtcpeerconnection: 16,
            util: 8,
            webrtcsupport: 7,
            wildemitter: 4
        }],
        11: [function (e, t) {
            t.exports = e("./lib/")
        }, {
            "./lib/": 17
        }],
        18: [function (e, t) {
            var n, r;
            window.mozRTCPeerConnection || navigator.mozGetUserMedia ? (n = "moz", r = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10)) : (window.webkitRTCPeerConnection || navigator.webkitGetUserMedia) && (n = "webkit", r = navigator.userAgent.match(/Chrom(e|ium)/) && parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10));
            var i = window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
                o = window.mozRTCIceCandidate || window.RTCIceCandidate,
                a = window.mozRTCSessionDescription || window.RTCSessionDescription,
                s = window.webkitMediaStream || window.MediaStream,
                c = "https:" === window.location.protocol && ("webkit" === n && r >= 26 || "moz" === n && r >= 33),
                u = window.AudioContext || window.webkitAudioContext,
                p = document.createElement("video"),
                d = p && p.canPlayType && "probably" === p.canPlayType('video/webm; codecs="vp8", vorbis'),
                l = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;
            t.exports = {
                prefix: n,
                browserVersion: r,
                support: !!i && d && !!l,
                supportRTCPeerConnection: !!i,
                supportVp8: d,
                supportGetUserMedia: !!l,
                supportDataChannel: !!(i && i.prototype && i.prototype.createDataChannel),
                supportWebAudio: !(!u || !u.prototype.createMediaStreamSource),
                supportMediaStream: !(!s || !s.prototype.removeTrack),
                supportScreenSharing: !!c,
                dataChannel: !!(i && i.prototype && i.prototype.createDataChannel),
                webAudio: !(!u || !u.prototype.createMediaStreamSource),
                mediaStream: !(!s || !s.prototype.removeTrack),
                screenSharing: !!c,
                AudioContext: u,
                PeerConnection: i,
                SessionDescription: a,
                IceCandidate: o,
                MediaStream: s,
                getUserMedia: l
            }
        }, {}],
        10: [function (e, t) {
            function n(e) {
                c.call(this);
                var t, n = this.config = {
                    autoAdjustMic: !1,
                    detectSpeakingEvents: !1,
                    audioFallback: !1,
                    media: {
                        audio: !0,
                        video: !0
                    },
                    logger: p
                };
                for (t in e) this.config[t] = e[t];
                this.logger = n.logger, this._log = this.logger.log.bind(this.logger, "LocalMedia:"), this._logerror = this.logger.error.bind(this.logger, "LocalMedia:"), this.screenSharingSupport = o.screenSharing, this.localStreams = [], this.localScreens = [], o.support || this._logerror("Your browser does not support local media capture.")
            }
            var r = e("util"),
                i = e("hark"),
                o = e("webrtcsupport"),
                a = e("getusermedia"),
                s = e("getscreenmedia"),
                c = e("wildemitter"),
                u = e("mediastream-gain"),
                p = e("mockconsole");
            r.inherits(n, c), n.prototype.start = function (e, t) {
                var n = this,
                    r = e || this.config.media;
                a(r, function (e, i) {
                    if (e) {
                        if (n.config.audioFallback && "DevicesNotFoundError" === e.name && r.video !== !1) return r.video = !1, n.start(r, t), void 0
                    } else r.audio && n.config.detectSpeakingEvents && n.setupAudioMonitor(i, n.config.harkOptions), n.localStreams.push(i), n.config.autoAdjustMic && (n.gainController = new u(i), n.setMicIfEnabled(.5)), i.onended = function () {}, n.emit("localStream", i);
                    return t ? t(e, i) : void 0
                })
            }, n.prototype.stop = function (e) {
                var t = this;
                if (e) {
                    e.getTracks().forEach(function (e) {
                        e.stop()
                    });
                    var n = t.localStreams.indexOf(e);
                    n > -1 ? (t.emit("localStreamStopped", e), t.localStreams = t.localStreams.splice(n, 1)) : (n = t.localScreens.indexOf(e), n > -1 && (t.emit("localScreenStopped", e), t.localScreens = t.localScreens.splice(n, 1)))
                } else this.stopStreams(), this.stopScreenShare()
            }, n.prototype.stopStreams = function () {
                var e = this;
                this.audioMonitor && (this.audioMonitor.stop(), delete this.audioMonitor), this.localStreams.forEach(function (t) {
                    t.getTracks().forEach(function (e) {
                        e.stop()
                    }), e.emit("localStreamStopped", t)
                }), this.localStreams = []
            }, n.prototype.startScreenShare = function (e) {
                var t = this;
                s(function (n, r) {
                    return n || (t.localScreens.push(r), r.onended = function () {
                        var e = t.localScreens.indexOf(r);
                        e > -1 && t.localScreens.splice(e, 1), t.emit("localScreenStopped", r)
                    }, t.emit("localScreen", r)), e ? e(n, r) : void 0
                })
            }, n.prototype.stopScreenShare = function (e) {
                var t = this;
                e ? (e.getTracks().forEach(function (e) {
                    e.stop()
                }), this.emit("localScreenStopped", e)) : (this.localScreens.forEach(function (e) {
                    e.getTracks().forEach(function (e) {
                        e.stop()
                    }), t.emit("localScreenStopped", e)
                }), this.localScreens = [])
            }, n.prototype.mute = function () {
                this._audioEnabled(!1), this.hardMuted = !0, this.emit("audioOff")
            }, n.prototype.unmute = function () {
                this._audioEnabled(!0), this.hardMuted = !1, this.emit("audioOn")
            }, n.prototype.setupAudioMonitor = function (e, t) {
                this._log("Setup audio");
                var n, r = this.audioMonitor = i(e, t),
                    o = this;
                r.on("speaking", function () {
                    o.emit("speaking"), o.hardMuted || o.setMicIfEnabled(1)
                }), r.on("stopped_speaking", function () {
                    n && clearTimeout(n), n = setTimeout(function () {
                        o.emit("stoppedSpeaking"), o.hardMuted || o.setMicIfEnabled(.5)
                    }, 1e3)
                }), r.on("volume_change", function (e, t) {
                    o.emit("volumeChange", e, t)
                })
            }, n.prototype.setMicIfEnabled = function (e) {
                this.config.autoAdjustMic && this.gainController.setGain(e)
            }, n.prototype.pauseVideo = function () {
                this._videoEnabled(!1), this.emit("videoOff")
            }, n.prototype.resumeVideo = function () {
                this._videoEnabled(!0), this.emit("videoOn")
            }, n.prototype.pause = function () {
                this.mute(), this.pauseVideo()
            }, n.prototype.resume = function () {
                this.unmute(), this.resumeVideo()
            }, n.prototype._audioEnabled = function (e) {
                this.setMicIfEnabled(e ? 1 : 0), this.localStreams.forEach(function (t) {
                    t.getAudioTracks().forEach(function (t) {
                        t.enabled = !!e
                    })
                })
            }, n.prototype._videoEnabled = function (e) {
                this.localStreams.forEach(function (t) {
                    t.getVideoTracks().forEach(function (t) {
                        t.enabled = !!e
                    })
                })
            }, n.prototype.isAudioEnabled = function () {
                var e = !0;
                return this.localStreams.forEach(function (t) {
                    t.getAudioTracks().forEach(function (t) {
                        e = e && t.enabled
                    })
                }), e
            }, n.prototype.isVideoEnabled = function () {
                var e = !0;
                return this.localStreams.forEach(function (t) {
                    t.getVideoTracks().forEach(function (t) {
                        e = e && t.enabled
                    })
                }), e
            }, n.prototype.startLocalMedia = n.prototype.start, n.prototype.stopLocalMedia = n.prototype.stop, Object.defineProperty(n.prototype, "localStream", {
                get: function () {
                    return this.localStreams.length > 0 ? this.localStreams[0] : null
                }
            }), Object.defineProperty(n.prototype, "localScreen", {
                get: function () {
                    return this.localScreens.length > 0 ? this.localScreens[0] : null
                }
            }), t.exports = n
        }, {
            getscreenmedia: 20,
            getusermedia: 21,
            hark: 19,
            "mediastream-gain": 22,
            mockconsole: 5,
            util: 8,
            webrtcsupport: 18,
            wildemitter: 4
        }],
        16: [function (e, t) {
            function n(e, t) {
                var n, r = this;
                s.call(this), e = e || {}, e.iceServers = e.iceServers || [], this.enableChromeNativeSimulcast = !1, t && t.optional && "chrome" === u.webrtcDetectedBrowser && null === navigator.appVersion.match(/Chromium\//) && t.optional.forEach(function (e) {
                    e.enableChromeNativeSimulcast && (r.enableChromeNativeSimulcast = !0)
                }), this.enableMultiStreamHacks = !1, t && t.optional && "chrome" === u.webrtcDetectedBrowser && t.optional.forEach(function (e) {
                    e.enableMultiStreamHacks && (r.enableMultiStreamHacks = !0)
                }), this.restrictBandwidth = 0, t && t.optional && t.optional.forEach(function (e) {
                    e.andyetRestrictBandwidth && (r.restrictBandwidth = e.andyetRestrictBandwidth)
                }), this.batchIceCandidates = 0, t && t.optional && t.optional.forEach(function (e) {
                    e.andyetBatchIce && (r.batchIceCandidates = e.andyetBatchIce)
                }), this.batchedIceCandidates = [], t && t.optional && "chrome" === u.webrtcDetectedBrowser && t.optional.forEach(function (e) {
                    e.andyetFasterICE && (r.eliminateDuplicateCandidates = e.andyetFasterICE)
                }), t && t.optional && t.optional.forEach(function (e) {
                    e.andyetDontSignalCandidates && (r.dontSignalCandidates = e.andyetDontSignalCandidates)
                }), this.assumeSetLocalSuccess = !1, t && t.optional && t.optional.forEach(function (e) {
                    e.andyetAssumeSetLocalSuccess && (r.assumeSetLocalSuccess = e.andyetAssumeSetLocalSuccess)
                }), "firefox" === u.webrtcDetectedBrowser && t && t.optional && (this.wtFirefox = 0, t.optional.forEach(function (e) {
                    e.andyetFirefoxMakesMeSad && (r.wtFirefox = e.andyetFirefoxMakesMeSad, r.wtFirefox > 0 && (r.firefoxcandidatebuffer = []))
                })), this.pc = new c(e, t), this.getLocalStreams = this.pc.getLocalStreams.bind(this.pc), this.getRemoteStreams = this.pc.getRemoteStreams.bind(this.pc), this.addStream = this.pc.addStream.bind(this.pc), this.removeStream = this.pc.removeStream.bind(this.pc), this.pc.on("*", function () {
                    r.emit.apply(r, arguments)
                }), this.pc.onremovestream = this.emit.bind(this, "removeStream"), this.pc.onaddstream = this.emit.bind(this, "addStream"), this.pc.onnegotiationneeded = this.emit.bind(this, "negotiationNeeded"), this.pc.oniceconnectionstatechange = this.emit.bind(this, "iceConnectionStateChange"), this.pc.onsignalingstatechange = this.emit.bind(this, "signalingStateChange"), this.pc.onicecandidate = this._onIce.bind(this), this.pc.ondatachannel = this._onDataChannel.bind(this), this.localDescription = {
                    contents: []
                }, this.remoteDescription = {
                    contents: []
                }, this.config = {
                    debug: !1,
                    ice: {},
                    sid: "",
                    isInitiator: !0,
                    sdpSessionID: Date.now(),
                    useJingle: !1
                };
                for (n in e) this.config[n] = e[n];
                this.config.debug && this.on("*", function () {
                    var t = e.logger || console;
                    t.log("PeerConnection event:", arguments)
                }), this.hadLocalStunCandidate = !1, this.hadRemoteStunCandidate = !1, this.hadLocalRelayCandidate = !1, this.hadRemoteRelayCandidate = !1, this.hadLocalIPv6Candidate = !1, this.hadRemoteIPv6Candidate = !1, this._remoteDataChannels = [], this._localDataChannels = [], this._candidateBuffer = []
            }
            var r = e("util"),
                i = e("lodash.foreach"),
                o = e("lodash.pluck"),
                a = e("sdp-jingle-json"),
                s = e("wildemitter"),
                c = e("traceablepeerconnection"),
                u = e("webrtc-adapter");
            r.inherits(n, s), Object.defineProperty(n.prototype, "signalingState", {
                get: function () {
                    return this.pc.signalingState
                }
            }), Object.defineProperty(n.prototype, "iceConnectionState", {
                get: function () {
                    return this.pc.iceConnectionState
                }
            }), n.prototype._role = function () {
                return this.isInitiator ? "initiator" : "responder"
            }, n.prototype.addStream = function (e) {
                this.localStream = e, this.pc.addStream(e)
            }, n.prototype._checkLocalCandidate = function (e) {
                var t = a.toCandidateJSON(e);
                "srflx" == t.type ? this.hadLocalStunCandidate = !0 : "relay" == t.type && (this.hadLocalRelayCandidate = !0), -1 != t.ip.indexOf(":") && (this.hadLocalIPv6Candidate = !0)
            }, n.prototype._checkRemoteCandidate = function (e) {
                var t = a.toCandidateJSON(e);
                "srflx" == t.type ? this.hadRemoteStunCandidate = !0 : "relay" == t.type && (this.hadRemoteRelayCandidate = !0), -1 != t.ip.indexOf(":") && (this.hadRemoteIPv6Candidate = !0)
            }, n.prototype.processIce = function (e, t) {
                t = t || function () {};
                var n = this;
                if ("closed" === this.pc.signalingState) return t();
                if (e.contents || e.jingle && e.jingle.contents) {
                    var r = o(this.remoteDescription.contents, "name"),
                        i = e.contents || e.jingle.contents;
                    i.forEach(function (e) {
                        var t = e.transport || {},
                            i = t.candidates || [],
                            o = r.indexOf(e.name),
                            s = e.name;
                        i.forEach(function (e) {
                            var t = a.toCandidateSDP(e) + "\r\n";
                            n.pc.addIceCandidate(new RTCIceCandidate({
                                candidate: t,
                                sdpMLineIndex: o,
                                sdpMid: s
                            }), function () {}, function (e) {
                                n.emit("error", e)
                            }), n._checkRemoteCandidate(t)
                        })
                    })
                } else {
                    if (e.candidate && 0 !== e.candidate.candidate.indexOf("a=") && (e.candidate.candidate = "a=" + e.candidate.candidate), this.wtFirefox && null !== this.firefoxcandidatebuffer && this.pc.localDescription && "offer" === this.pc.localDescription.type) return this.firefoxcandidatebuffer.push(e.candidate), t();
                    n.pc.addIceCandidate(new RTCIceCandidate(e.candidate), function () {}, function (e) {
                        n.emit("error", e)
                    }), n._checkRemoteCandidate(e.candidate.candidate)
                }
                t()
            }, n.prototype.offer = function (e, t) {
                var n = this,
                    r = 2 === arguments.length,
                    o = r && e ? e : {
                        offerToReceiveAudio: 1,
                        offerToReceiveVideo: 1
                    };
                return t = r ? t : e, t = t || function () {}, "closed" === this.pc.signalingState ? t("Already closed") : (this.pc.createOffer(function (e) {
                    var r = {
                        type: "offer",
                        sdp: e.sdp
                    };
                    n.assumeSetLocalSuccess && (n.emit("offer", r), t(null, r)), n._candidateBuffer = [], n.pc.setLocalDescription(e, function () {
                        var o;
                        n.config.useJingle && (o = a.toSessionJSON(e.sdp, {
                            role: n._role(),
                            direction: "outgoing"
                        }), o.sid = n.config.sid, n.localDescription = o, i(o.contents, function (e) {
                            var t = e.transport || {};
                            t.ufrag && (n.config.ice[e.name] = {
                                ufrag: t.ufrag,
                                pwd: t.pwd
                            })
                        }), r.jingle = o), r.sdp.split("\r\n").forEach(function (e) {
                            0 === e.indexOf("a=candidate:") && n._checkLocalCandidate(e)
                        }), n.assumeSetLocalSuccess || (n.emit("offer", r), t(null, r))
                    }, function (e) {
                        n.emit("error", e), t(e)
                    })
                }, function (e) {
                    n.emit("error", e), t(e)
                }, o), void 0)
            }, n.prototype.handleOffer = function (e, t) {
                t = t || function () {};
                var n = this;
                if (e.type = "offer", e.jingle) {
                    if (this.enableChromeNativeSimulcast && e.jingle.contents.forEach(function (e) {
                            "video" === e.name && (e.description.googConferenceFlag = !0)
                        }), this.enableMultiStreamHacks && e.jingle.contents.forEach(function (e) {
                            if ("video" === e.name) {
                                var t = e.description.sources || [];
                                (0 === t.length || "3735928559" !== t[0].ssrc) && (t.unshift({
                                    ssrc: "3735928559",
                                    parameters: [{
                                        key: "cname",
                                        value: "deadbeef"
                                    }, {
                                        key: "msid",
                                        value: "mixyourfecintothis please"
                                    }]
                                }), e.description.sources = t)
                            }
                        }), n.restrictBandwidth > 0 && e.jingle.contents.length >= 2 && "video" === e.jingle.contents[1].name) {
                        var r = e.jingle.contents[1],
                            i = r.description && r.description.bandwidth;
                        i || (e.jingle.contents[1].description.bandwidth = {
                            type: "AS",
                            bandwidth: n.restrictBandwidth.toString()
                        }, e.sdp = a.toSessionSDP(e.jingle, {
                            sid: n.config.sdpSessionID,
                            role: n._role(),
                            direction: "outgoing"
                        }))
                    }
                    e.sdp = a.toSessionSDP(e.jingle, {
                        sid: n.config.sdpSessionID,
                        role: n._role(),
                        direction: "incoming"
                    }), n.remoteDescription = e.jingle
                }
                e.sdp.split("\r\n").forEach(function (e) {
                    0 === e.indexOf("a=candidate:") && n._checkRemoteCandidate(e)
                }), n.pc.setRemoteDescription(new RTCSessionDescription(e), function () {
                    t()
                }, t)
            }, n.prototype.answerAudioOnly = function (e) {
                var t = {
                    mandatory: {
                        OfferToReceiveAudio: !0,
                        OfferToReceiveVideo: !1
                    }
                };
                this._answer(t, e)
            }, n.prototype.answerBroadcastOnly = function (e) {
                var t = {
                    mandatory: {
                        OfferToReceiveAudio: !1,
                        OfferToReceiveVideo: !1
                    }
                };
                this._answer(t, e)
            }, n.prototype.answer = function (e, t) {
                var n = 2 === arguments.length,
                    r = n ? t : e,
                    i = n && e ? e : {
                        mandatory: {
                            OfferToReceiveAudio: !0,
                            OfferToReceiveVideo: !0
                        }
                    };
                this._answer(i, r)
            }, n.prototype.handleAnswer = function (e, t) {
                t = t || function () {};
                var n = this;
                e.jingle && (e.sdp = a.toSessionSDP(e.jingle, {
                    sid: n.config.sdpSessionID,
                    role: n._role(),
                    direction: "incoming"
                }), n.remoteDescription = e.jingle), e.sdp.split("\r\n").forEach(function (e) {
                    0 === e.indexOf("a=candidate:") && n._checkRemoteCandidate(e)
                }), n.pc.setRemoteDescription(new RTCSessionDescription(e), function () {
                    n.wtFirefox && window.setTimeout(function () {
                        n.firefoxcandidatebuffer.forEach(function (e) {
                            n.pc.addIceCandidate(new RTCIceCandidate(e), function () {}, function (e) {
                                n.emit("error", e)
                            }), n._checkRemoteCandidate(e.candidate)
                        }), n.firefoxcandidatebuffer = null
                    }, n.wtFirefox), t(null)
                }, t)
            }, n.prototype.close = function () {
                this.pc.close(), this._localDataChannels = [], this._remoteDataChannels = [], this.emit("close")
            }, n.prototype._answer = function (e, t) {
                t = t || function () {};
                var n = this;
                if (!this.pc.remoteDescription) throw new Error("remoteDescription not set");
                return "closed" === this.pc.signalingState ? t("Already closed") : (n.pc.createAnswer(function (e) {
                    var r = [];
                    if (n.enableChromeNativeSimulcast && (e.jingle = a.toSessionJSON(e.sdp, {
                            role: n._role(),
                            direction: "outgoing"
                        }), e.jingle.contents.length >= 2 && "video" === e.jingle.contents[1].name)) {
                        var i = e.jingle.contents[1].description.sourceGroups || [],
                            o = !1;
                        if (i.forEach(function (e) {
                                "SIM" == e.semantics && (o = !0)
                            }), !o && e.jingle.contents[1].description.sources.length) {
                            var s = JSON.parse(JSON.stringify(e.jingle.contents[1].description.sources[0]));
                            s.ssrc = "" + Math.floor(4294967295 * Math.random()), e.jingle.contents[1].description.sources.push(s), r.push(e.jingle.contents[1].description.sources[0].ssrc), r.push(s.ssrc), i.push({
                                semantics: "SIM",
                                sources: r
                            });
                            var c = JSON.parse(JSON.stringify(s));
                            c.ssrc = "" + Math.floor(4294967295 * Math.random()), e.jingle.contents[1].description.sources.push(c), i.push({
                                semantics: "FID",
                                sources: [s.ssrc, c.ssrc]
                            }), e.jingle.contents[1].description.sourceGroups = i, e.sdp = a.toSessionSDP(e.jingle, {
                                sid: n.config.sdpSessionID,
                                role: n._role(),
                                direction: "outgoing"
                            })
                        }
                    }
                    var u = {
                        type: "answer",
                        sdp: e.sdp
                    };
                    n.assumeSetLocalSuccess && (n.emit("answer", u), t(null, u)), n._candidateBuffer = [], n.pc.setLocalDescription(e, function () {
                        if (n.config.useJingle) {
                            var r = a.toSessionJSON(e.sdp, {
                                role: n._role(),
                                direction: "outgoing"
                            });
                            r.sid = n.config.sid, n.localDescription = r, u.jingle = r
                        }
                        n.enableChromeNativeSimulcast && (u.jingle || (u.jingle = a.toSessionJSON(e.sdp, {
                            role: n._role(),
                            direction: "outgoing"
                        })), u.jingle.contents[1].description.sources.forEach(function (e, t) {
                            e.parameters = e.parameters.map(function (e) {
                                return "msid" === e.key && (e.value += "-" + Math.floor(t / 2)), e
                            })
                        }), u.sdp = a.toSessionSDP(u.jingle, {
                            sid: n.sdpSessionID,
                            role: n._role(),
                            direction: "outgoing"
                        })), u.sdp.split("\r\n").forEach(function (e) {
                            0 === e.indexOf("a=candidate:") && n._checkLocalCandidate(e)
                        }), n.assumeSetLocalSuccess || (n.emit("answer", u), t(null, u))
                    }, function (e) {
                        n.emit("error", e), t(e)
                    })
                }, function (e) {
                    n.emit("error", e), t(e)
                }, e), void 0)
            }, n.prototype._onIce = function (e) {
                var t = this;
                if (e.candidate) {
                    if (this.dontSignalCandidates) return;
                    var n = e.candidate,
                        r = {
                            candidate: {
                                candidate: n.candidate,
                                sdpMid: n.sdpMid,
                                sdpMLineIndex: n.sdpMLineIndex
                            }
                        };
                    this._checkLocalCandidate(n.candidate);
                    var o, s, c = a.toCandidateJSON(n.candidate);
                    if (this.eliminateDuplicateCandidates && "relay" === c.type && (o = this._candidateBuffer.filter(function (e) {
                            return "relay" === e.type
                        }).map(function (e) {
                            return e.foundation + ":" + e.component
                        }), s = o.indexOf(c.foundation + ":" + c.component), s > -1 && c.priority >> 24 >= o[s].priority >> 24)) return;
                    if ("max-bundle" === this.config.bundlePolicy && (o = this._candidateBuffer.filter(function (e) {
                            return c.type === e.type
                        }).map(function (e) {
                            return e.address + ":" + e.port
                        }), s = o.indexOf(c.address + ":" + c.port), s > -1)) return;
                    if ("require" === this.config.rtcpMuxPolicy && "2" === c.component) return;
                    if (this._candidateBuffer.push(c), t.config.useJingle) {
                        if (n.sdpMid || (n.sdpMid = t.pc.remoteDescription && "offer" === t.pc.remoteDescription.type ? t.remoteDescription.contents[n.sdpMLineIndex].name : t.localDescription.contents[n.sdpMLineIndex].name), !t.config.ice[n.sdpMid]) {
                            var u = a.toSessionJSON(t.pc.localDescription.sdp, {
                                role: t._role(),
                                direction: "outgoing"
                            });
                            i(u.contents, function (e) {
                                var n = e.transport || {};
                                n.ufrag && (t.config.ice[e.name] = {
                                    ufrag: n.ufrag,
                                    pwd: n.pwd
                                })
                            })
                        }
                        if (r.jingle = {
                                contents: [{
                                    name: n.sdpMid,
                                    creator: t._role(),
                                    transport: {
                                        transType: "iceUdp",
                                        ufrag: t.config.ice[n.sdpMid].ufrag,
                                        pwd: t.config.ice[n.sdpMid].pwd,
                                        candidates: [c]
                                    }
                                }]
                            }, t.batchIceCandidates > 0) return 0 === t.batchedIceCandidates.length && window.setTimeout(function () {
                            var e = {};
                            t.batchedIceCandidates.forEach(function (t) {
                                t = t.contents[0], e[t.name] || (e[t.name] = t), e[t.name].transport.candidates.push(t.transport.candidates[0])
                            });
                            var n = {
                                jingle: {
                                    contents: []
                                }
                            };
                            Object.keys(e).forEach(function (t) {
                                n.jingle.contents.push(e[t])
                            }), t.batchedIceCandidates = [], t.emit("ice", n)
                        }, t.batchIceCandidates), t.batchedIceCandidates.push(r.jingle), void 0
                    }
                    this.emit("ice", r)
                } else this.emit("endOfCandidates")
            }, n.prototype._onDataChannel = function (e) {
                var t = e.channel;
                this._remoteDataChannels.push(t), this.emit("addChannel", t)
            }, n.prototype.createDataChannel = function (e, t) {
                var n = this.pc.createDataChannel(e, t);
                return this._localDataChannels.push(n), n
            }, n.prototype.getStats = function (e) {
                this.pc.getStats(null, function (t) {
                    e(null, t)
                }, function (t) {
                    e(t)
                })
            }, t.exports = n
        }, {
            "lodash.foreach": 26,
            "lodash.pluck": 27,
            "sdp-jingle-json": 23,
            traceablepeerconnection: 25,
            util: 8,
            "webrtc-adapter": 24,
            wildemitter: 4
        }],
        21: [function (e, t) {
            e("webrtc-adapter"), t.exports = function (e, t) {
                var n, r = 2 === arguments.length,
                    i = {
                        video: !0,
                        audio: !0
                    },
                    o = "PermissionDeniedError",
                    a = "PERMISSION_DENIED",
                    s = "ConstraintNotSatisfiedError";
                return r || (t = e, e = i), "undefined" != typeof navigator && navigator.getUserMedia ? e.audio || e.video ? (localStorage && "true" === localStorage.useFirefoxFakeDevice && (e.fake = !0), navigator.mediaDevices.getUserMedia(e).then(function (e) {
                    t(null, e)
                }).catch(function (e) {
                    var n;
                    "string" == typeof e ? (n = new Error("MediaStreamError"), n.name = e === o || e === a ? o : s) : (n = e, n.name || (e.name = n[o] ? o : s)), t(n)
                }), void 0) : (n = new Error("MediaStreamError"), n.name = "NoMediaRequestedError", setTimeout(function () {
                    t(n)
                }, 0)) : (n = new Error("MediaStreamError"), n.name = "NotSupportedError", setTimeout(function () {
                    t(n)
                }, 0))
            }
        }, {
            "webrtc-adapter": 28
        }],
        15: [function (e, t) {
            function n(e) {
                i.call(this);
                var t = e || {};
                this.config = {
                    chunksize: 16384,
                    pacing: 0
                };
                var n;
                for (n in t) this.config[n] = t[n];
                this.file = null, this.channel = null
            }

            function r() {
                i.call(this), this.receiveBuffer = [], this.received = 0, this.metadata = {}, this.channel = null
            }
            var i = e("wildemitter"),
                o = e("util");
            o.inherits(n, i), n.prototype.send = function (e, t) {
                var n = this;
                this.file = e, this.channel = t;
                var r = function (t) {
                    var i = new window.FileReader;
                    i.onload = function () {
                        return function (i) {
                            n.channel.send(i.target.result), n.emit("progress", t, e.size, i.target.result), e.size > t + i.target.result.byteLength ? window.setTimeout(r, n.config.pacing, t + n.config.chunksize) : (n.emit("progress", e.size, e.size, null), n.emit("sentFile"))
                        }
                    }(e);
                    var o = e.slice(t, t + n.config.chunksize);
                    i.readAsArrayBuffer(o)
                };
                window.setTimeout(r, 0, 0)
            }, o.inherits(r, i), r.prototype.receive = function (e, t) {
                var n = this;
                e && (this.metadata = e), this.channel = t, t.binaryType = "arraybuffer", this.channel.onmessage = function (e) {
                    var t = e.data.byteLength;
                    n.received += t, n.receiveBuffer.push(e.data), n.emit("progress", n.received, n.metadata.size, e.data), n.received === n.metadata.size ? (n.emit("receivedFile", new window.Blob(n.receiveBuffer), n.metadata), n.receiveBuffer = []) : n.received > n.metadata.size && (console.error("received more than expected, discarding..."), n.receiveBuffer = [])
                }
            }, t.exports = {}, t.exports.support = "undefined" != typeof window && window && window.File && window.FileReader && window.Blob, t.exports.Sender = n, t.exports.Receiver = r
        }, {
            util: 8,
            wildemitter: 4
        }],
        20: [function (e, t) {
            var n = e("getusermedia"),
                r = {};
            t.exports = function (e, t) {
                var i, o = 2 === arguments.length,
                    a = o ? t : e;
                if ("undefined" == typeof window || "http:" === window.location.protocol) return i = new Error("NavigatorUserMediaError"), i.name = "HTTPS_REQUIRED", a(i);
                if (window.navigator.userAgent.match("Chrome")) {
                    var s = parseInt(window.navigator.userAgent.match(/Chrome\/(.*) /)[1], 10),
                        c = 33,
                        u = !window.chrome.webstore;
                    if (window.navigator.userAgent.match("Linux") && (c = 35), sessionStorage.getScreenMediaJSExtensionId) chrome.runtime.sendMessage(sessionStorage.getScreenMediaJSExtensionId, {
                        type: "getScreen",
                        id: 1
                    }, null, function (t) {
                        if (t && "" !== t.sourceId) e = o && e || {
                            audio: !1,
                            video: {
                                mandatory: {
                                    chromeMediaSource: "desktop",
                                    maxWidth: window.screen.width,
                                    maxHeight: window.screen.height,
                                    maxFrameRate: 3
                                },
                                optional: [{
                                    googLeakyBucket: !0
                                }, {
                                    googTemporalLayeredScreencast: !0
                                }]
                            }
                        }, e.video.mandatory.chromeMediaSourceId = t.sourceId, n(e, a);
                        else {
                            var r = new Error("NavigatorUserMediaError");
                            r.name = "PERMISSION_DENIED", a(r)
                        }
                    });
                    else if (window.cefGetScreenMedia) window.cefGetScreenMedia(function (t) {
                        if (t) e = o && e || {
                            audio: !1,
                            video: {
                                mandatory: {
                                    chromeMediaSource: "desktop",
                                    maxWidth: window.screen.width,
                                    maxHeight: window.screen.height,
                                    maxFrameRate: 3
                                },
                                optional: [{
                                    googLeakyBucket: !0
                                }, {
                                    googTemporalLayeredScreencast: !0
                                }]
                            }
                        }, e.video.mandatory.chromeMediaSourceId = t, n(e, a);
                        else {
                            var r = new Error("cefGetScreenMediaError");
                            r.name = "CEF_GETSCREENMEDIA_CANCELED", a(r)
                        }
                    });
                    else if (u || s >= 26 && c >= s) e = o && e || {
                        video: {
                            mandatory: {
                                googLeakyBucket: !0,
                                maxWidth: window.screen.width,
                                maxHeight: window.screen.height,
                                maxFrameRate: 3,
                                chromeMediaSource: "screen"
                            }
                        }
                    }, n(e, a);
                    else {
                        var p = window.setTimeout(function () {
                            return i = new Error("NavigatorUserMediaError"), i.name = "EXTENSION_UNAVAILABLE", a(i)
                        }, 1e3);
                        r[p] = [a, o ? e : null], window.postMessage({
                            type: "getScreen",
                            id: p
                        }, "*")
                    }
                } else if (window.navigator.userAgent.match("Firefox")) {
                    var d = parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10);
                    d >= 33 ? (e = o && e || {
                        video: {
                            mozMediaSource: "window",
                            mediaSource: "window"
                        }
                    }, n(e, function (e, t) {
                        if (a(e, t), !e) var n = t.currentTime,
                            r = window.setInterval(function () {
                                t || window.clearInterval(r), t.currentTime == n && (window.clearInterval(r), t.onended && t.onended()), n = t.currentTime
                            }, 500)
                    })) : (i = new Error("NavigatorUserMediaError"), i.name = "EXTENSION_UNAVAILABLE")
                }
            }, window.addEventListener("message", function (e) {
                if (e.origin == window.location.origin)
                    if ("gotScreen" == e.data.type && r[e.data.id]) {
                        var t = r[e.data.id],
                            i = t[1],
                            o = t[0];
                        if (delete r[e.data.id], "" === e.data.sourceId) {
                            var a = new Error("NavigatorUserMediaError");
                            a.name = "PERMISSION_DENIED", o(a)
                        } else i = i || {
                            audio: !1,
                            video: {
                                mandatory: {
                                    chromeMediaSource: "desktop",
                                    maxWidth: window.screen.width,
                                    maxHeight: window.screen.height,
                                    maxFrameRate: 3
                                },
                                optional: [{
                                    googLeakyBucket: !0
                                }, {
                                    googTemporalLayeredScreencast: !0
                                }]
                            }
                        }, i.video.mandatory.chromeMediaSourceId = e.data.sourceId, n(i, o)
                    } else "getScreenPending" == e.data.type && window.clearTimeout(e.data.id)
            })
        }, {
            getusermedia: 21
        }],
        22: [function (e, t) {
            function n(e) {
                if (this.support = r.webAudio && r.mediaStream, this.gain = 1, this.support) {
                    var t = this.context = new r.AudioContext;
                    this.microphone = t.createMediaStreamSource(e), this.gainFilter = t.createGain(), this.destination = t.createMediaStreamDestination(), this.outputStream = this.destination.stream, this.microphone.connect(this.gainFilter), this.gainFilter.connect(this.destination), e.addTrack(this.outputStream.getAudioTracks()[0]), e.removeTrack(e.getAudioTracks()[0])
                }
                this.stream = e
            }
            var r = e("webrtcsupport");
            n.prototype.setGain = function (e) {
                this.support && (this.gainFilter.gain.value = e, this.gain = e)
            }, n.prototype.getGain = function () {
                return this.gain
            }, n.prototype.off = function () {
                return this.setGain(0)
            }, n.prototype.on = function () {
                this.setGain(1)
            }, t.exports = n
        }, {
            webrtcsupport: 18
        }],
        23: [function (e, t, n) {
            var r = e("./lib/tosdp"),
                i = e("./lib/tojson");
            n.toIncomingSDPOffer = function (e) {
                return r.toSessionSDP(e, {
                    role: "responder",
                    direction: "incoming"
                })
            }, n.toOutgoingSDPOffer = function (e) {
                return r.toSessionSDP(e, {
                    role: "initiator",
                    direction: "outgoing"
                })
            }, n.toIncomingSDPAnswer = function (e) {
                return r.toSessionSDP(e, {
                    role: "initiator",
                    direction: "incoming"
                })
            }, n.toOutgoingSDPAnswer = function (e) {
                return r.toSessionSDP(e, {
                    role: "responder",
                    direction: "outgoing"
                })
            }, n.toIncomingMediaSDPOffer = function (e) {
                return r.toMediaSDP(e, {
                    role: "responder",
                    direction: "incoming"
                })
            }, n.toOutgoingMediaSDPOffer = function (e) {
                return r.toMediaSDP(e, {
                    role: "initiator",
                    direction: "outgoing"
                })
            }, n.toIncomingMediaSDPAnswer = function (e) {
                return r.toMediaSDP(e, {
                    role: "initiator",
                    direction: "incoming"
                })
            }, n.toOutgoingMediaSDPAnswer = function (e) {
                return r.toMediaSDP(e, {
                    role: "responder",
                    direction: "outgoing"
                })
            }, n.toCandidateSDP = r.toCandidateSDP, n.toMediaSDP = r.toMediaSDP, n.toSessionSDP = r.toSessionSDP, n.toIncomingJSONOffer = function (e, t) {
                return i.toSessionJSON(e, {
                    role: "responder",
                    direction: "incoming",
                    creators: t
                })
            }, n.toOutgoingJSONOffer = function (e, t) {
                return i.toSessionJSON(e, {
                    role: "initiator",
                    direction: "outgoing",
                    creators: t
                })
            }, n.toIncomingJSONAnswer = function (e, t) {
                return i.toSessionJSON(e, {
                    role: "initiator",
                    direction: "incoming",
                    creators: t
                })
            }, n.toOutgoingJSONAnswer = function (e, t) {
                return i.toSessionJSON(e, {
                    role: "responder",
                    direction: "outgoing",
                    creators: t
                })
            }, n.toIncomingMediaJSONOffer = function (e, t) {
                return i.toMediaJSON(e, {
                    role: "responder",
                    direction: "incoming",
                    creator: t
                })
            }, n.toOutgoingMediaJSONOffer = function (e, t) {
                return i.toMediaJSON(e, {
                    role: "initiator",
                    direction: "outgoing",
                    creator: t
                })
            }, n.toIncomingMediaJSONAnswer = function (e, t) {
                return i.toMediaJSON(e, {
                    role: "initiator",
                    direction: "incoming",
                    creator: t
                })
            }, n.toOutgoingMediaJSONAnswer = function (e, t) {
                return i.toMediaJSON(e, {
                    role: "responder",
                    direction: "outgoing",
                    creator: t
                })
            }, n.toCandidateJSON = i.toCandidateJSON, n.toMediaJSON = i.toMediaJSON, n.toSessionJSON = i.toSessionJSON
        }, {
            "./lib/tojson": 30,
            "./lib/tosdp": 29
        }],
        17: [function (e, t, n) {
            function r(e, t) {
                "object" == typeof e && (t = e, e = void 0), t = t || {};
                var n, r = i(e),
                    o = r.source,
                    u = r.id;
                return t.forceNew || t["force new connection"] || !1 === t.multiplex ? (s("ignoring socket cache for %s", o), n = a(o, t)) : (c[u] || (s("new io instance for %s", o), c[u] = a(o, t)), n = c[u]), n.socket(r.path)
            }
            var i = e("./url"),
                o = e("socket.io-parser"),
                a = e("./manager"),
                s = e("debug")("socket.io-client");
            t.exports = n = r;
            var c = n.managers = {};
            n.protocol = o.protocol, n.connect = r, n.Manager = e("./manager"), n.Socket = e("./socket")
        }, {
            "./manager": 32,
            "./socket": 33,
            "./url": 31,
            debug: 34,
            "socket.io-parser": 35
        }],
        24: [function (e, t) {
            "use strict";
            ! function () {
                var n = e("./utils").log,
                    r = e("./utils").browserDetails;
                t.exports.browserDetails = r, t.exports.extractVersion = e("./utils").extractVersion, t.exports.disableLog = e("./utils").disableLog, r.version < r.minVersion && n("Browser: " + r.browser + " Version: " + r.version + " <" + " minimum supported version: " + r.minVersion + "\n some things might not work!");
                var i = e("./chrome/chrome_shim") || null,
                    o = e("./edge/edge_shim") || null,
                    a = e("./firefox/firefox_shim") || null;
                switch (r.browser) {
                    case "chrome":
                        if (!i || !i.shimPeerConnection) return n("Chrome shim is not included in this adapter release."), void 0;
                        n("adapter.js shimming chrome!"), t.exports.browserShim = i, i.shimGetUserMedia(), i.shimSourceObject(), i.shimPeerConnection(), i.shimOnTrack();
                        break;
                    case "edge":
                        if (!o || !o.shimPeerConnection) return n("MS edge shim is not included in this adapter release."), void 0;
                        n("adapter.js shimming edge!"), t.exports.browserShim = o, o.shimPeerConnection();
                        break;
                    case "firefox":
                        if (!a || !a.shimPeerConnection) return n("Firefox shim is not included in this adapter release."), void 0;
                        n("adapter.js shimming firefox!"), t.exports.browserShim = a, a.shimGetUserMedia(), a.shimSourceObject(), a.shimPeerConnection(), a.shimOnTrack();
                        break;
                    default:
                        n("Unsupported browser!")
                }
            }()
        }, {
            "./chrome/chrome_shim": 37,
            "./edge/edge_shim": 38,
            "./firefox/firefox_shim": 39,
            "./utils": 36
        }],
        40: [function (e, t) {
            function n(e, t, n) {
                return e.on(t, n), {
                    destroy: function () {
                        e.removeListener(t, n)
                    }
                }
            }
            t.exports = n
        }, {}],
        34: [function (e, t) {
            function n(e) {
                return n.enabled(e) ? function (t) {
                    t = r(t);
                    var i = new Date,
                        o = i - (n[e] || i);
                    n[e] = i, t = e + " " + t + " +" + n.humanize(o), window.console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                } : function () {}
            }

            function r(e) {
                return e instanceof Error ? e.stack || e.message : e
            }
            t.exports = n, n.names = [], n.skips = [], n.enable = function (e) {
                try {
                    localStorage.debug = e
                } catch (t) {}
                for (var r = (e || "").split(/[\s,]+/), i = r.length, o = 0; i > o; o++) e = r[o].replace("*", ".*?"), "-" === e[0] ? n.skips.push(new RegExp("^" + e.substr(1) + "$")) : n.names.push(new RegExp("^" + e + "$"))
            }, n.disable = function () {
                n.enable("")
            }, n.humanize = function (e) {
                var t = 1e3,
                    n = 6e4,
                    r = 60 * n;
                return e >= r ? (e / r).toFixed(1) + "h" : e >= n ? (e / n).toFixed(1) + "m" : e >= t ? (0 | e / t) + "s" : e + "ms"
            }, n.enabled = function (e) {
                for (var t = 0, r = n.skips.length; r > t; t++)
                    if (n.skips[t].test(e)) return !1;
                for (var t = 0, r = n.names.length; r > t; t++)
                    if (n.names[t].test(e)) return !0;
                return !1
            };
            try {
                window.localStorage && n.enable(localStorage.debug)
            } catch (i) {}
        }, {}],
        19: [function (e, t) {
            function n(e, t) {
                var n = -1 / 0;
                e.getFloatFrequencyData(t);
                for (var r = 4, i = t.length; i > r; r++) t[r] > n && t[r] < 0 && (n = t[r]);
                return n
            }
            var r = e("wildemitter"),
                i = window.AudioContext || window.webkitAudioContext,
                o = null;
            t.exports = function (e, t) {
                var a = new r;
                if (!i) return a;
                var t = t || {},
                    s = t.smoothing || .1,
                    c = t.interval || 50,
                    u = t.threshold,
                    p = t.play,
                    d = t.history || 10,
                    l = !0;
                o || (o = new i);
                var f, h, m;
                m = o.createAnalyser(), m.fftSize = 512, m.smoothingTimeConstant = s, h = new Float32Array(m.fftSize), e.jquery && (e = e[0]), e instanceof HTMLAudioElement || e instanceof HTMLVideoElement ? (f = o.createMediaElementSource(e), "undefined" == typeof p && (p = !0), u = u || -50) : (f = o.createMediaStreamSource(e), u = u || -50), f.connect(m), p && m.connect(o.destination), a.speaking = !1, a.setThreshold = function (e) {
                    u = e
                }, a.setInterval = function (e) {
                    c = e
                }, a.stop = function () {
                    l = !1, a.emit("volume_change", -100, u), a.speaking && (a.speaking = !1, a.emit("stopped_speaking"))
                }, a.speakingHistory = [];
                for (var g = 0; d > g; g++) a.speakingHistory.push(0);
                var v = function () {
                    setTimeout(function () {
                        if (l) {
                            var e = n(m, h);
                            a.emit("volume_change", e, u);
                            var t = 0;
                            if (e > u && !a.speaking) {
                                for (var r = a.speakingHistory.length - 3; r < a.speakingHistory.length; r++) t += a.speakingHistory[r];
                                t >= 2 && (a.speaking = !0, a.emit("speaking"))
                            } else if (u > e && a.speaking) {
                                for (var r = 0; r < a.speakingHistory.length; r++) t += a.speakingHistory[r];
                                0 == t && (a.speaking = !1, a.emit("stopped_speaking"))
                            }
                            a.speakingHistory.shift(), a.speakingHistory.push(0 + (e > u)), v()
                        }
                    }, c)
                };
                return v(), a
            }
        }, {
            wildemitter: 4
        }],
        36: [function (e, t) {
            "use strict";
            var n = !1,
                r = {
                    disableLog: function (e) {
                        return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (n = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled")
                    },
                    log: function () {
                        if ("object" == typeof window) {
                            if (n) return;
                            console.log.apply(console, arguments)
                        }
                    },
                    extractVersion: function (e, t, n) {
                        var r = e.match(t);
                        return r && r.length >= n && parseInt(r[n], 10)
                    },
                    detectBrowser: function () {
                        var e = {};
                        return e.browser = null, e.version = null, e.minVersion = null, "undefined" != typeof window && window.navigator ? navigator.mozGetUserMedia ? (e.browser = "firefox", e.version = this.extractVersion(navigator.userAgent, /Firefox\/([0-9]+)\./, 1), e.minVersion = 31, e) : navigator.webkitGetUserMedia && window.webkitRTCPeerConnection ? (e.browser = "chrome", e.version = this.extractVersion(navigator.userAgent, /Chrom(e|ium)\/([0-9]+)\./, 2), e.minVersion = 38, e) : navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/) ? (e.browser = "edge", e.version = this.extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2), e.minVersion = 10547, e) : (e.browser = "Not a supported browser.", e) : (e.browser = "Not a supported browser.", e)
                    }
                };
            t.exports = {
                log: r.log,
                disableLog: r.disableLog,
                browserDetails: r.detectBrowser(),
                extractVersion: r.extractVersion
            }
        }, {}],
        28: [function (e, t) {
            "use strict";
            ! function () {
                var n = e("./utils").log,
                    r = e("./utils").browserDetails;
                t.exports.browserDetails = r, t.exports.extractVersion = e("./utils").extractVersion, t.exports.disableLog = e("./utils").disableLog, r.version < r.minVersion && n("Browser: " + r.browser + " Version: " + r.version + " <" + " minimum supported version: " + r.minVersion + "\n some things might not work!");
                var i = e("./chrome/chrome_shim") || null,
                    o = e("./edge/edge_shim") || null,
                    a = e("./firefox/firefox_shim") || null;
                switch (r.browser) {
                    case "chrome":
                        if (!i || !i.shimPeerConnection) return n("Chrome shim is not included in this adapter release."), void 0;
                        n("adapter.js shimming chrome!"), t.exports.browserShim = i, i.shimGetUserMedia(), i.shimSourceObject(), i.shimPeerConnection(), i.shimOnTrack();
                        break;
                    case "edge":
                        if (!o || !o.shimPeerConnection) return n("MS edge shim is not included in this adapter release."), void 0;
                        n("adapter.js shimming edge!"), t.exports.browserShim = o, o.shimPeerConnection();
                        break;
                    case "firefox":
                        if (!a || !a.shimPeerConnection) return n("Firefox shim is not included in this adapter release."), void 0;
                        n("adapter.js shimming firefox!"), t.exports.browserShim = a, a.shimGetUserMedia(), a.shimSourceObject(), a.shimPeerConnection(), a.shimOnTrack();
                        break;
                    default:
                        n("Unsupported browser!")
                }
            }()
        }, {
            "./chrome/chrome_shim": 42,
            "./edge/edge_shim": 43,
            "./firefox/firefox_shim": 44,
            "./utils": 41
        }],
        26: [function (e, t) {
            function n(e, t) {
                return function (n, r, i) {
                    return "function" == typeof r && void 0 === i && a(n) ? e(n, r) : t(n, o(r, i, 3))
                }
            }
            var r = e("lodash._arrayeach"),
                i = e("lodash._baseeach"),
                o = e("lodash._bindcallback"),
                a = e("lodash.isarray"),
                s = n(r, i);
            t.exports = s
        }, {
            "lodash._arrayeach": 45,
            "lodash._baseeach": 46,
            "lodash._bindcallback": 48,
            "lodash.isarray": 47
        }],
        27: [function (e, t) {
            function n(e) {
                return function (t) {
                    return null == t ? void 0 : t[e]
                }
            }

            function r(e) {
                var t = e + "";
                return e = p(e),
                    function (n) {
                        return u(n, e, t)
                    }
            }

            function i(e, t) {
                var n = typeof e;
                if ("string" == n && h.test(e) || "number" == n) return !0;
                if (d(e)) return !1;
                var r = !f.test(e);
                return r || null != t && e in o(t)
            }

            function o(e) {
                return s(e) ? e : Object(e)
            }

            function a(e, t) {
                return l(e, c(t))
            }

            function s(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }

            function c(e) {
                return i(e) ? n(e) : r(e)
            }
            var u = e("lodash._baseget"),
                p = e("lodash._topath"),
                d = e("lodash.isarray"),
                l = e("lodash.map"),
                f = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
                h = /^\w*$/;
            t.exports = a
        }, {
            "lodash._baseget": 49,
            "lodash._topath": 50,
            "lodash.isarray": 51,
            "lodash.map": 52
        }],
        29: [function (e, t, n) {
            var r = e("./senders");
            n.toSessionSDP = function (e, t) {
                t.role || "initiator", t.direction || "outgoing";
                var r = t.sid || e.sid || Date.now(),
                    i = t.time || Date.now(),
                    o = ["v=0", "o=- " + r + " " + i + " IN IP4 0.0.0.0", "s=-", "t=0 0"],
                    a = e.contents || [],
                    s = !1;
                a.forEach(function (e) {
                    e.description.sources && e.description.sources.length && (s = !0)
                }), s && o.push("a=msid-semantic: WMS *");
                var c = e.groups || [];
                return c.forEach(function (e) {
                    o.push("a=group:" + e.semantics + " " + e.contents.join(" "))
                }), a.forEach(function (e) {
                    o.push(n.toMediaSDP(e, t))
                }), o.join("\r\n") + "\r\n"
            }, n.toMediaSDP = function (e, t) {
                var i = [],
                    o = t.role || "initiator",
                    a = t.direction || "outgoing",
                    s = e.description,
                    c = e.transport,
                    u = s.payloads || [],
                    p = c && c.fingerprints || [],
                    d = [];
                if ("datachannel" == s.descType ? (d.push("application"), d.push("1"), d.push("DTLS/SCTP"), c.sctp && c.sctp.forEach(function (e) {
                        d.push(e.number)
                    })) : (d.push(s.media), d.push("1"), p.length > 0 ? d.push("UDP/TLS/RTP/SAVPF") : s.encryption && s.encryption.length > 0 ? d.push("RTP/SAVPF") : d.push("RTP/AVPF"), u.forEach(function (e) {
                        d.push(e.id)
                    })), i.push("m=" + d.join(" ")), i.push("c=IN IP4 0.0.0.0"), s.bandwidth && s.bandwidth.type && s.bandwidth.bandwidth && i.push("b=" + s.bandwidth.type + ":" + s.bandwidth.bandwidth), "rtp" == s.descType && i.push("a=rtcp:1 IN IP4 0.0.0.0"), c) {
                    c.ufrag && i.push("a=ice-ufrag:" + c.ufrag), c.pwd && i.push("a=ice-pwd:" + c.pwd);
                    var l = !1;
                    p.forEach(function (e) {
                        i.push("a=fingerprint:" + e.hash + " " + e.value), e.setup && !l && i.push("a=setup:" + e.setup)
                    }), c.sctp && c.sctp.forEach(function (e) {
                        i.push("a=sctpmap:" + e.number + " " + e.protocol + " " + e.streams)
                    })
                }
                "rtp" == s.descType && i.push("a=" + (r[o][a][e.senders] || "sendrecv")), i.push("a=mid:" + e.name), s.sources && s.sources.length && (s.sources[0].parameters || []).forEach(function (e) {
                    "msid" === e.key && i.push("a=msid:" + e.value)
                }), s.mux && i.push("a=rtcp-mux");
                var f = s.encryption || [];
                f.forEach(function (e) {
                    i.push("a=crypto:" + e.tag + " " + e.cipherSuite + " " + e.keyParams + (e.sessionParams ? " " + e.sessionParams : ""))
                }), s.googConferenceFlag && i.push("a=x-google-flag:conference"), u.forEach(function (e) {
                    var t = "a=rtpmap:" + e.id + " " + e.name + "/" + e.clockrate;
                    if (e.channels && "1" != e.channels && (t += "/" + e.channels), i.push(t), e.parameters && e.parameters.length) {
                        var n = ["a=fmtp:" + e.id],
                            r = [];
                        e.parameters.forEach(function (e) {
                            r.push((e.key ? e.key + "=" : "") + e.value)
                        }), n.push(r.join(";")), i.push(n.join(" "))
                    }
                    e.feedback && e.feedback.forEach(function (t) {
                        "trr-int" === t.type ? i.push("a=rtcp-fb:" + e.id + " trr-int " + (t.value ? t.value : "0")) : i.push("a=rtcp-fb:" + e.id + " " + t.type + (t.subtype ? " " + t.subtype : ""))
                    })
                }), s.feedback && s.feedback.forEach(function (e) {
                    "trr-int" === e.type ? i.push("a=rtcp-fb:* trr-int " + (e.value ? e.value : "0")) : i.push("a=rtcp-fb:* " + e.type + (e.subtype ? " " + e.subtype : ""))
                });
                var h = s.headerExtensions || [];
                h.forEach(function (e) {
                    i.push("a=extmap:" + e.id + (e.senders ? "/" + r[o][a][e.senders] : "") + " " + e.uri)
                });
                var m = s.sourceGroups || [];
                m.forEach(function (e) {
                    i.push("a=ssrc-group:" + e.semantics + " " + e.sources.join(" "))
                });
                var g = s.sources || [];
                g.forEach(function (e) {
                    for (var t = 0; t < e.parameters.length; t++) {
                        var n = e.parameters[t];
                        i.push("a=ssrc:" + (e.ssrc || s.ssrc) + " " + n.key + (n.value ? ":" + n.value : ""))
                    }
                });
                var v = c.candidates || [];
                return v.forEach(function (e) {
                    i.push(n.toCandidateSDP(e))
                }), i.join("\r\n")
            }, n.toCandidateSDP = function (e) {
                var t = [];
                t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.ip), t.push(e.port);
                var n = e.type;
                return t.push("typ"), t.push(n), ("srflx" === n || "prflx" === n || "relay" === n) && e.relAddr && e.relPort && (t.push("raddr"), t.push(e.relAddr), t.push("rport"), t.push(e.relPort)), e.tcpType && "TCP" == e.protocol.toUpperCase() && (t.push("tcptype"), t.push(e.tcpType)), t.push("generation"), t.push(e.generation || "0"), "a=candidate:" + t.join(" ")
            }
        }, {
            "./senders": 53
        }],
        30: [function (e, t, n) {
            var r = e("./senders"),
                i = e("./parsers"),
                o = Math.random();
            n._setIdCounter = function (e) {
                o = e
            }, n.toSessionJSON = function (e, t) {
                var r, o = t.creators || [],
                    a = t.role || "initiator",
                    s = t.direction || "outgoing",
                    c = e.split("\r\nm=");
                for (r = 1; r < c.length; r++) c[r] = "m=" + c[r], r !== c.length - 1 && (c[r] += "\r\n");
                var u = c.shift() + "\r\n",
                    p = i.lines(u),
                    d = {},
                    l = [];
                for (r = 0; r < c.length; r++) l.push(n.toMediaJSON(c[r], u, {
                    role: a,
                    direction: s,
                    creator: o[r] || "initiator"
                }));
                d.contents = l;
                var f = i.findLines("a=group:", p);
                return f.length && (d.groups = i.groups(f)), d
            }, n.toMediaJSON = function (e, t, o) {
                var a = o.creator || "initiator",
                    s = o.role || "initiator",
                    c = o.direction || "outgoing",
                    u = i.lines(e),
                    p = i.lines(t),
                    d = i.mline(u[0]),
                    l = {
                        creator: a,
                        name: d.media,
                        description: {
                            descType: "rtp",
                            media: d.media,
                            payloads: [],
                            encryption: [],
                            feedback: [],
                            headerExtensions: []
                        },
                        transport: {
                            transType: "iceUdp",
                            candidates: [],
                            fingerprints: []
                        }
                    };
                "application" == d.media && (l.description = {
                    descType: "datachannel"
                }, l.transport.sctp = []);
                var f = l.description,
                    h = l.transport,
                    m = i.findLine("a=mid:", u);
                if (m && (l.name = m.substr(6)), i.findLine("a=sendrecv", u, p) ? l.senders = "both" : i.findLine("a=sendonly", u, p) ? l.senders = r[s][c].sendonly : i.findLine("a=recvonly", u, p) ? l.senders = r[s][c].recvonly : i.findLine("a=inactive", u, p) && (l.senders = "none"), "rtp" == f.descType) {
                    var g = i.findLine("b=", u);
                    g && (f.bandwidth = i.bandwidth(g));
                    var v = i.findLine("a=ssrc:", u);
                    v && (f.ssrc = v.substr(7).split(" ")[0]);
                    var y = i.findLines("a=rtpmap:", u);
                    y.forEach(function (e) {
                        var t = i.rtpmap(e);
                        t.parameters = [], t.feedback = [];
                        var n = i.findLines("a=fmtp:" + t.id, u);
                        n.forEach(function (e) {
                            t.parameters = i.fmtp(e)
                        });
                        var r = i.findLines("a=rtcp-fb:" + t.id, u);
                        r.forEach(function (e) {
                            t.feedback.push(i.rtcpfb(e))
                        }), f.payloads.push(t)
                    });
                    var b = i.findLines("a=crypto:", u, p);
                    b.forEach(function (e) {
                        f.encryption.push(i.crypto(e))
                    }), i.findLine("a=rtcp-mux", u) && (f.mux = !0);
                    var w = i.findLines("a=rtcp-fb:*", u);
                    w.forEach(function (e) {
                        f.feedback.push(i.rtcpfb(e))
                    });
                    var C = i.findLines("a=extmap:", u);
                    C.forEach(function (e) {
                        var t = i.extmap(e);
                        t.senders = r[s][c][t.senders], f.headerExtensions.push(t)
                    });
                    var S = i.findLines("a=ssrc-group:", u);
                    f.sourceGroups = i.sourceGroups(S || []);
                    var k = i.findLines("a=ssrc:", u),
                        T = f.sources = i.sources(k || []),
                        R = i.findLine("a=msid:", u);
                    if (R) {
                        var P = i.msid(R);
                        ["msid", "mslabel", "label"].forEach(function (e) {
                            for (var t = 0; t < T.length; t++) {
                                for (var n = !1, r = 0; r < T[t].parameters.length; r++) T[t].parameters[r].key === e && (n = !0);
                                n || T[t].parameters.push({
                                    key: e,
                                    value: P[e]
                                })
                            }
                        })
                    }
                    i.findLine("a=x-google-flag:conference", u, p) && (f.googConferenceFlag = !0)
                }
                var E = i.findLines("a=fingerprint:", u, p),
                    x = i.findLine("a=setup:", u, p);
                E.forEach(function (e) {
                    var t = i.fingerprint(e);
                    x && (t.setup = x.substr(8)), h.fingerprints.push(t)
                });
                var O = i.findLine("a=ice-ufrag:", u, p),
                    j = i.findLine("a=ice-pwd:", u, p);
                if (O && j) {
                    h.ufrag = O.substr(12), h.pwd = j.substr(10), h.candidates = [];
                    var D = i.findLines("a=candidate:", u, p);
                    D.forEach(function (e) {
                        h.candidates.push(n.toCandidateJSON(e))
                    })
                }
                if ("datachannel" == f.descType) {
                    var _ = i.findLines("a=sctpmap:", u);
                    _.forEach(function (e) {
                        var t = i.sctpmap(e);
                        h.sctp.push(t)
                    })
                }
                return l
            }, n.toCandidateJSON = function (e) {
                var t = i.candidate(e.split("\r\n")[0]);
                return t.id = (o++).toString(36).substr(0, 12), t
            }
        }, {
            "./parsers": 54,
            "./senders": 53
        }],
        41: [function (e, t) {
            "use strict";
            var n = !1,
                r = {
                    disableLog: function (e) {
                        return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (n = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled")
                    },
                    log: function () {
                        if ("object" == typeof window) {
                            if (n) return;
                            console.log.apply(console, arguments)
                        }
                    },
                    extractVersion: function (e, t, n) {
                        var r = e.match(t);
                        return r && r.length >= n && parseInt(r[n], 10)
                    },
                    detectBrowser: function () {
                        var e = {};
                        return e.browser = null, e.version = null, e.minVersion = null, "undefined" != typeof window && window.navigator ? navigator.mozGetUserMedia ? (e.browser = "firefox", e.version = this.extractVersion(navigator.userAgent, /Firefox\/([0-9]+)\./, 1), e.minVersion = 31, e) : navigator.webkitGetUserMedia && window.webkitRTCPeerConnection ? (e.browser = "chrome", e.version = this.extractVersion(navigator.userAgent, /Chrom(e|ium)\/([0-9]+)\./, 2), e.minVersion = 38, e) : navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/) ? (e.browser = "edge", e.version = this.extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2), e.minVersion = 10547, e) : (e.browser = "Not a supported browser.", e) : (e.browser = "Not a supported browser.", e)
                    }
                };
            t.exports = {
                log: r.log,
                disableLog: r.disableLog,
                browserDetails: r.detectBrowser(),
                extractVersion: r.extractVersion
            }
}, {}],
        45: [function (e, t) {
            function n(e, t) {
                for (var n = -1, r = e.length; ++n < r && t(e[n], n, e) !== !1;);
                return e
            }
            t.exports = n
        }, {}],
        47: [function (e, t) {
            function n(e) {
                return !!e && "object" == typeof e
            }

            function r(e, t) {
                var n = null == e ? void 0 : e[t];
                return s(n) ? n : void 0
            }

            function i(e) {
                return "number" == typeof e && e > -1 && 0 == e % 1 && v >= e
            }

            function o(e) {
                return a(e) && h.call(e) == u
            }

            function a(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }

            function s(e) {
                return null == e ? !1 : o(e) ? m.test(l.call(e)) : n(e) && p.test(e)
            }
            var c = "[object Array]",
                u = "[object Function]",
                p = /^\[object .+?Constructor\]$/,
                d = Object.prototype,
                l = Function.prototype.toString,
                f = d.hasOwnProperty,
                h = d.toString,
                m = RegExp("^" + l.call(f).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                g = r(Array, "isArray"),
                v = 9007199254740991,
                y = g || function (e) {
                    return n(e) && i(e.length) && h.call(e) == c
                };
            t.exports = y
        }, {}],
        49: [function (e, t) {
            function n(e, t, n) {
                if (null != e) {
                    void 0 !== n && n in r(e) && (t = [n]);
                    for (var i = 0, o = t.length; null != e && o > i;) e = e[t[i++]];
                    return i && i == o ? e : void 0
                }
            }

            function r(e) {
                return i(e) ? e : Object(e)
            }

            function i(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }
            t.exports = n
        }, {}],
        48: [function (e, t) {
            function n(e, t, n) {
                if ("function" != typeof e) return r;
                if (void 0 === t) return e;
                switch (n) {
                    case 1:
                        return function (n) {
                            return e.call(t, n)
                        };
                    case 3:
                        return function (n, r, i) {
                            return e.call(t, n, r, i)
                        };
                    case 4:
                        return function (n, r, i, o) {
                            return e.call(t, n, r, i, o)
                        };
                    case 5:
                        return function (n, r, i, o, a) {
                            return e.call(t, n, r, i, o, a)
                        }
                }
                return function () {
                    return e.apply(t, arguments)
                }
            }

            function r(e) {
                return e
            }
            t.exports = n
        }, {}],
        51: [function (e, t) {
            function n(e) {
                return !!e && "object" == typeof e
            }

            function r(e, t) {
                var n = null == e ? void 0 : e[t];
                return s(n) ? n : void 0
            }

            function i(e) {
                return "number" == typeof e && e > -1 && 0 == e % 1 && v >= e
            }

            function o(e) {
                return a(e) && h.call(e) == u
            }

            function a(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }

            function s(e) {
                return null == e ? !1 : o(e) ? m.test(l.call(e)) : n(e) && p.test(e)
            }
            var c = "[object Array]",
                u = "[object Function]",
                p = /^\[object .+?Constructor\]$/,
                d = Object.prototype,
                l = Function.prototype.toString,
                f = d.hasOwnProperty,
                h = d.toString,
                m = RegExp("^" + l.call(f).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                g = r(Array, "isArray"),
                v = 9007199254740991,
                y = g || function (e) {
                    return n(e) && i(e.length) && h.call(e) == c
                };
            t.exports = y
        }, {}],
        31: [function (e, t) {
            function n(e, t) {
                var n = e,
                    t = t || r.location;
                return null == e && (e = t.protocol + "//" + t.host), "string" == typeof e && ("/" == e.charAt(0) && (e = "/" == e.charAt(1) ? t.protocol + e : t.hostname + e), /^(https?|wss?):\/\//.test(e) || (o("protocol-less url %s", e), e = "undefined" != typeof t ? t.protocol + "//" + e : "https://" + e), o("parse %s", e), n = i(e)), n.port || (/^(http|ws)$/.test(n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")), n.path = n.path || "/", n.id = n.protocol + "://" + n.host + ":" + n.port, n.href = n.protocol + "://" + n.host + (t && t.port == n.port ? "" : ":" + n.port), n
            }
            var r = self,
                i = e("parseuri"),
                o = e("debug")("socket.io-client:url");
            t.exports = n
        }, {
            debug: 34,
            parseuri: 55
        }],
        32: [function (e, t) {
            function n(e, t) {
                return this instanceof n ? (e && "object" == typeof e && (t = e, e = void 0), t = t || {}, t.path = t.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = t, this.reconnection(t.reconnection !== !1), this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor(t.randomizationFactor || .5), this.backoff = new d({
                    min: this.reconnectionDelay(),
                    max: this.reconnectionDelayMax(),
                    jitter: this.randomizationFactor()
                }), this.timeout(null == t.timeout ? 2e4 : t.timeout), this.readyState = "closed", this.uri = e, this.connected = [], this.encoding = !1, this.packetBuffer = [], this.encoder = new a.Encoder, this.decoder = new a.Decoder, this.autoConnect = t.autoConnect !== !1, this.autoConnect && this.open(), void 0) : new n(e, t)
            }
            e("./url");
            var r = e("engine.io-client"),
                i = e("./socket"),
                o = e("component-emitter"),
                a = e("socket.io-parser"),
                s = e("./on"),
                c = e("component-bind");
            e("object-component");
            var u = e("debug")("socket.io-client:manager"),
                p = e("indexof"),
                d = e("backo2");
            t.exports = n, n.prototype.emitAll = function () {
                this.emit.apply(this, arguments);
                for (var e in this.nsps) this.nsps[e].emit.apply(this.nsps[e], arguments)
            }, n.prototype.updateSocketIds = function () {
                for (var e in this.nsps) this.nsps[e].id = this.engine.id
            }, o(n.prototype), n.prototype.reconnection = function (e) {
                return arguments.length ? (this._reconnection = !!e, this) : this._reconnection
            }, n.prototype.reconnectionAttempts = function (e) {
                return arguments.length ? (this._reconnectionAttempts = e, this) : this._reconnectionAttempts
            }, n.prototype.reconnectionDelay = function (e) {
                return arguments.length ? (this._reconnectionDelay = e, this.backoff && this.backoff.setMin(e), this) : this._reconnectionDelay
            }, n.prototype.randomizationFactor = function (e) {
                return arguments.length ? (this._randomizationFactor = e, this.backoff && this.backoff.setJitter(e), this) : this._randomizationFactor
            }, n.prototype.reconnectionDelayMax = function (e) {
                return arguments.length ? (this._reconnectionDelayMax = e, this.backoff && this.backoff.setMax(e), this) : this._reconnectionDelayMax
            }, n.prototype.timeout = function (e) {
                return arguments.length ? (this._timeout = e, this) : this._timeout
            }, n.prototype.maybeReconnectOnOpen = function () {
                !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
            }, n.prototype.open = n.prototype.connect = function (e) {
                if (u("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
                u("opening %s", this.uri), this.engine = r(this.uri, this.opts);
                var t = this.engine,
                    n = this;
                this.readyState = "opening", this.skipReconnect = !1;
                var i = s(t, "open", function () {
                        n.onopen(), e && e()
                    }),
                    o = s(t, "error", function (t) {
                        if (u("connect_error"), n.cleanup(), n.readyState = "closed", n.emitAll("connect_error", t), e) {
                            var r = new Error("Connection error");
                            r.data = t, e(r)
                        } else n.maybeReconnectOnOpen()
                    });
                if (!1 !== this._timeout) {
                    var a = this._timeout;
                    u("connect attempt will timeout after %d", a);
                    var c = setTimeout(function () {
                        u("connect attempt timed out after %d", a), i.destroy(), t.close(), t.emit("error", "timeout"), n.emitAll("connect_timeout", a)
                    }, a);
                    this.subs.push({
                        destroy: function () {
                            clearTimeout(c)
                        }
                    })
                }
                return this.subs.push(i), this.subs.push(o), this
            }, n.prototype.onopen = function () {
                u("open"), this.cleanup(), this.readyState = "open", this.emit("open");
                var e = this.engine;
                this.subs.push(s(e, "data", c(this, "ondata"))), this.subs.push(s(this.decoder, "decoded", c(this, "ondecoded"))), this.subs.push(s(e, "error", c(this, "onerror"))), this.subs.push(s(e, "close", c(this, "onclose")))
            }, n.prototype.ondata = function (e) {
                this.decoder.add(e)
            }, n.prototype.ondecoded = function (e) {
                this.emit("packet", e)
            }, n.prototype.onerror = function (e) {
                u("error", e), this.emitAll("error", e)
            }, n.prototype.socket = function (e) {
                var t = this.nsps[e];
                if (!t) {
                    t = new i(this, e), this.nsps[e] = t;
                    var n = this;
                    t.on("connect", function () {
                        t.id = n.engine.id, ~p(n.connected, t) || n.connected.push(t)
                    })
                }
                return t
            }, n.prototype.destroy = function (e) {
                var t = p(this.connected, e);
                ~t && this.connected.splice(t, 1), this.connected.length || this.close()
            }, n.prototype.packet = function (e) {
                u("writing packet %j", e);
                var t = this;
                t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0, this.encoder.encode(e, function (e) {
                    for (var n = 0; n < e.length; n++) t.engine.write(e[n]);
                    t.encoding = !1, t.processPacketQueue()
                }))
            }, n.prototype.processPacketQueue = function () {
                if (this.packetBuffer.length > 0 && !this.encoding) {
                    var e = this.packetBuffer.shift();
                    this.packet(e)
                }
            }, n.prototype.cleanup = function () {
                for (var e; e = this.subs.shift();) e.destroy();
                this.packetBuffer = [], this.encoding = !1, this.decoder.destroy()
            }, n.prototype.close = n.prototype.disconnect = function () {
                this.skipReconnect = !0, this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
            }, n.prototype.onclose = function (e) {
                u("close"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", e), this._reconnection && !this.skipReconnect && this.reconnect()
            }, n.prototype.reconnect = function () {
                if (this.reconnecting || this.skipReconnect) return this;
                var e = this;
                if (this.backoff.attempts >= this._reconnectionAttempts) u("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;
                else {
                    var t = this.backoff.duration();
                    u("will wait %dms before reconnect attempt", t), this.reconnecting = !0;
                    var n = setTimeout(function () {
                        e.skipReconnect || (u("attempting reconnect"), e.emitAll("reconnect_attempt", e.backoff.attempts), e.emitAll("reconnecting", e.backoff.attempts), e.skipReconnect || e.open(function (t) {
                            t ? (u("reconnect attempt error"), e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", t.data)) : (u("reconnect success"), e.onreconnect())
                        }))
                    }, t);
                    this.subs.push({
                        destroy: function () {
                            clearTimeout(n)
                        }
                    })
                }
            }, n.prototype.onreconnect = function () {
                var e = this.backoff.attempts;
                this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", e)
            }
        }, {
            "./on": 40,
            "./socket": 33,
            "./url": 31,
            backo2: 61,
            "component-bind": 58,
            "component-emitter": 56,
            debug: 34,
            "engine.io-client": 57,
            indexof: 60,
            "object-component": 59,
            "socket.io-parser": 35
        }],
        33: [function (e, t, n) {
            function r(e, t) {
                this.io = e, this.nsp = t, this.json = this, this.ids = 0, this.acks = {}, this.io.autoConnect && this.open(), this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0
            }
            var i = e("socket.io-parser"),
                o = e("component-emitter"),
                a = e("to-array"),
                s = e("./on"),
                c = e("component-bind"),
                u = e("debug")("socket.io-client:socket"),
                p = e("has-binary");
            t.exports = n = r;
            var d = {
                    connect: 1,
                    connect_error: 1,
                    connect_timeout: 1,
                    disconnect: 1,
                    error: 1,
                    reconnect: 1,
                    reconnect_attempt: 1,
                    reconnect_failed: 1,
                    reconnect_error: 1,
                    reconnecting: 1
                },
                l = o.prototype.emit;
            o(r.prototype), r.prototype.subEvents = function () {
                if (!this.subs) {
                    var e = this.io;
                    this.subs = [s(e, "open", c(this, "onopen")), s(e, "packet", c(this, "onpacket")), s(e, "close", c(this, "onclose"))]
                }
            }, r.prototype.open = r.prototype.connect = function () {
                return this.connected ? this : (this.subEvents(), this.io.open(), "open" == this.io.readyState && this.onopen(), this)
            }, r.prototype.send = function () {
                var e = a(arguments);
                return e.unshift("message"), this.emit.apply(this, e), this
            }, r.prototype.emit = function (e) {
                if (d.hasOwnProperty(e)) return l.apply(this, arguments), this;
                var t = a(arguments),
                    n = i.EVENT;
                p(t) && (n = i.BINARY_EVENT);
                var r = {
                    type: n,
                    data: t
                };
                return "function" == typeof t[t.length - 1] && (u("emitting packet with ack id %d", this.ids), this.acks[this.ids] = t.pop(), r.id = this.ids++), this.connected ? this.packet(r) : this.sendBuffer.push(r), this
            }, r.prototype.packet = function (e) {
                e.nsp = this.nsp, this.io.packet(e)
            }, r.prototype.onopen = function () {
                u("transport is open - connecting"), "/" != this.nsp && this.packet({
                    type: i.CONNECT
                })
            }, r.prototype.onclose = function (e) {
                u("close (%s)", e), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", e)
            }, r.prototype.onpacket = function (e) {
                if (e.nsp == this.nsp) switch (e.type) {
                    case i.CONNECT:
                        this.onconnect();
                        break;
                    case i.EVENT:
                        this.onevent(e);
                        break;
                    case i.BINARY_EVENT:
                        this.onevent(e);
                        break;
                    case i.ACK:
                        this.onack(e);
                        break;
                    case i.BINARY_ACK:
                        this.onack(e);
                        break;
                    case i.DISCONNECT:
                        this.ondisconnect();
                        break;
                    case i.ERROR:
                        this.emit("error", e.data)
                }
            }, r.prototype.onevent = function (e) {
                var t = e.data || [];
                u("emitting event %j", t), null != e.id && (u("attaching ack callback to event"), t.push(this.ack(e.id))), this.connected ? l.apply(this, t) : this.receiveBuffer.push(t)
            }, r.prototype.ack = function (e) {
                var t = this,
                    n = !1;
                return function () {
                    if (!n) {
                        n = !0;
                        var r = a(arguments);
                        u("sending ack %j", r);
                        var o = p(r) ? i.BINARY_ACK : i.ACK;
                        t.packet({
                            type: o,
                            id: e,
                            data: r
                        })
                    }
                }
            }, r.prototype.onack = function (e) {
                u("calling ack %s with %j", e.id, e.data);
                var t = this.acks[e.id];
                t.apply(this, e.data), delete this.acks[e.id]
            }, r.prototype.onconnect = function () {
                this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
            }, r.prototype.emitBuffered = function () {
                var e;
                for (e = 0; e < this.receiveBuffer.length; e++) l.apply(this, this.receiveBuffer[e]);
                for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++) this.packet(this.sendBuffer[e]);
                this.sendBuffer = []
            }, r.prototype.ondisconnect = function () {
                u("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
            }, r.prototype.destroy = function () {
                if (this.subs) {
                    for (var e = 0; e < this.subs.length; e++) this.subs[e].destroy();
                    this.subs = null
                }
                this.io.destroy(this)
            }, r.prototype.close = r.prototype.disconnect = function () {
                return this.connected && (u("performing disconnect (%s)", this.nsp), this.packet({
                    type: i.DISCONNECT
                })), this.destroy(), this.connected && this.onclose("io client disconnect"), this
            }
        }, {
            "./on": 40,
            "component-bind": 58,
            "component-emitter": 56,
            debug: 34,
            "has-binary": 63,
            "socket.io-parser": 35,
            "to-array": 62
        }],
        37: [function (e, t) {
            "use strict";
            var n = e("../utils.js").log,
                r = e("../utils.js").browserDetails,
                i = {
                    shimOnTrack: function () {
                        "object" != typeof window || !window.RTCPeerConnection || "ontrack" in window.RTCPeerConnection.prototype || Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", {
                            get: function () {
                                return this._ontrack
                            },
                            set: function (e) {
                                var t = this;
                                this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = e), this.addEventListener("addstream", this._ontrackpoly = function (e) {
                                    e.stream.addEventListener("addtrack", function (n) {
                                        var r = new Event("track");
                                        r.track = n.track, r.receiver = {
                                            track: n.track
                                        }, r.streams = [e.stream], t.dispatchEvent(r)
                                    }), e.stream.getTracks().forEach(function (t) {
                                        var n = new Event("track");
                                        n.track = t, n.receiver = {
                                            track: t
                                        }, n.streams = [e.stream], this.dispatchEvent(n)
                                    }.bind(this))
                                }.bind(this))
                            }
                        })
                    },
                    shimSourceObject: function () {
                        "object" == typeof window && (!window.HTMLMediaElement || "srcObject" in window.HTMLMediaElement.prototype || Object.defineProperty(window.HTMLMediaElement.prototype, "srcObject", {
                            get: function () {
                                return this._srcObject
                            },
                            set: function (e) {
                                this._srcObject = e, this.src && URL.revokeObjectURL(this.src), this.src = URL.createObjectURL(e), e.addEventListener("addtrack", function () {
                                    self.src && URL.revokeObjectURL(self.src), self.src = URL.createObjectURL(e)
                                }), e.addEventListener("removetrack", function () {
                                    self.src && URL.revokeObjectURL(self.src), self.src = URL.createObjectURL(e)
                                })
                            }
                        }))
                    },
                    shimPeerConnection: function () {
                        window.RTCPeerConnection = function (e, t) {
                            n("PeerConnection"), e && e.iceTransportPolicy && (e.iceTransports = e.iceTransportPolicy);
                            var r = new webkitRTCPeerConnection(e, t),
                                i = r.getStats.bind(r);
                            return r.getStats = function (e, t) {
                                var n = this,
                                    r = arguments;
                                if (arguments.length > 0 && "function" == typeof e) return i(e, t);
                                var o = function (e) {
                                    var t = {},
                                        n = e.result();
                                    return n.forEach(function (e) {
                                        var n = {
                                            id: e.id,
                                            timestamp: e.timestamp,
                                            type: e.type
                                        };
                                        e.names().forEach(function (t) {
                                            n[t] = e.stat(t)
                                        }), t[n.id] = n
                                    }), t
                                };
                                if (arguments.length >= 2) {
                                    var a = function (e) {
                                        r[1](o(e))
                                    };
                                    return i.apply(this, [a, arguments[0]])
                                }
                                return new Promise(function (t, a) {
                                    1 === r.length && null === e ? i.apply(n, [function (e) {
                                        t.apply(null, [o(e)])
                                    }, a]) : i.apply(n, [t, a])
                                })
                            }, r
                        }, window.RTCPeerConnection.prototype = webkitRTCPeerConnection.prototype, webkitRTCPeerConnection.generateCertificate && Object.defineProperty(window.RTCPeerConnection, "generateCertificate", {
                            get: function () {
                                return arguments.length ? webkitRTCPeerConnection.generateCertificate.apply(null, arguments) : webkitRTCPeerConnection.generateCertificate
                            }
                        }), ["createOffer", "createAnswer"].forEach(function (e) {
                            var t = webkitRTCPeerConnection.prototype[e];
                            webkitRTCPeerConnection.prototype[e] = function () {
                                var e = this;
                                if (arguments.length < 1 || 1 === arguments.length && "object" == typeof arguments[0]) {
                                    var n = 1 === arguments.length ? arguments[0] : void 0;
                                    return new Promise(function (r, i) {
                                        t.apply(e, [r, i, n])
                                    })
                                }
                                return t.apply(this, arguments)
                            }
                        }), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (e) {
                            var t = webkitRTCPeerConnection.prototype[e];
                            webkitRTCPeerConnection.prototype[e] = function () {
                                var e = arguments,
                                    n = this;
                                return new Promise(function (r, i) {
                                    t.apply(n, [e[0], function () {
                                        r(), e.length >= 2 && e[1].apply(null, [])
                                    }, function (t) {
                                        i(t), e.length >= 3 && e[2].apply(null, [t])
                                    }])
                                })
                            }
                        })
                    },
                    shimGetUserMedia: function () {
                        var e = function (e) {
                                if ("object" != typeof e || e.mandatory || e.optional) return e;
                                var t = {};
                                return Object.keys(e).forEach(function (n) {
                                    if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
                                        var r = "object" == typeof e[n] ? e[n] : {
                                            ideal: e[n]
                                        };
                                        void 0 !== r.exact && "number" == typeof r.exact && (r.min = r.max = r.exact);
                                        var i = function (e, t) {
                                            return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" : t
                                        };
                                        if (void 0 !== r.ideal) {
                                            t.optional = t.optional || [];
                                            var o = {};
                                            "number" == typeof r.ideal ? (o[i("min", n)] = r.ideal, t.optional.push(o), o = {}, o[i("max", n)] = r.ideal, t.optional.push(o)) : (o[i("", n)] = r.ideal, t.optional.push(o))
                                        }
                                        void 0 !== r.exact && "number" != typeof r.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[i("", n)] = r.exact) : ["min", "max"].forEach(function (e) {
                                            void 0 !== r[e] && (t.mandatory = t.mandatory || {}, t.mandatory[i(e, n)] = r[e])
                                        })
                                    }
                                }), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t
                            },
                            t = function (t, r, i) {
                                return t.audio && (t.audio = e(t.audio)), t.video && (t.video = e(t.video)), n("chrome: " + JSON.stringify(t)), navigator.webkitGetUserMedia(t, r, i)
                            };
                        navigator.getUserMedia = t;
                        var r = function (e) {
                            return new Promise(function (t, n) {
                                navigator.getUserMedia(e, t, n)
                            })
                        };
                        if (navigator.mediaDevices || (navigator.mediaDevices = {
                                getUserMedia: r,
                                enumerateDevices: function () {
                                    return new Promise(function (e) {
                                        var t = {
                                            audio: "audioinput",
                                            video: "videoinput"
                                        };
                                        return MediaStreamTrack.getSources(function (n) {
                                            e(n.map(function (e) {
                                                return {
                                                    label: e.label,
                                                    kind: t[e.kind],
                                                    deviceId: e.id,
                                                    groupId: ""
                                                }
                                            }))
                                        })
                                    })
                                }
                            }), navigator.mediaDevices.getUserMedia) {
                            var i = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                            navigator.mediaDevices.getUserMedia = function (t) {
                                return t && (n("spec:   " + JSON.stringify(t)), t.audio = e(t.audio), t.video = e(t.video), n("chrome: " + JSON.stringify(t))), i(t)
                            }.bind(this)
                        } else navigator.mediaDevices.getUserMedia = function (e) {
                            return r(e)
                        };
                        "undefined" == typeof navigator.mediaDevices.addEventListener && (navigator.mediaDevices.addEventListener = function () {
                            n("Dummy mediaDevices.addEventListener called.")
                        }), "undefined" == typeof navigator.mediaDevices.removeEventListener && (navigator.mediaDevices.removeEventListener = function () {
                            n("Dummy mediaDevices.removeEventListener called.")
                        })
                    },
                    attachMediaStream: function (e, t) {
                        n("DEPRECATED, attachMediaStream will soon be removed."), r.version >= 43 ? e.srcObject = t : "undefined" != typeof e.src ? e.src = URL.createObjectURL(t) : n("Error attaching stream to element.")
                    },
                    reattachMediaStream: function (e, t) {
                        n("DEPRECATED, reattachMediaStream will soon be removed."), r.version >= 43 ? e.srcObject = t.srcObject : e.src = t.src
                    }
                };
            t.exports = {
                shimOnTrack: i.shimOnTrack,
                shimSourceObject: i.shimSourceObject,
                shimPeerConnection: i.shimPeerConnection,
                shimGetUserMedia: i.shimGetUserMedia,
                attachMediaStream: i.attachMediaStream,
                reattachMediaStream: i.reattachMediaStream
            }
        }, {
            "../utils.js": 36
        }],
        53: [function (e, t) {
            t.exports = {
                initiator: {
                    incoming: {
                        initiator: "recvonly",
                        responder: "sendonly",
                        both: "sendrecv",
                        none: "inactive",
                        recvonly: "initiator",
                        sendonly: "responder",
                        sendrecv: "both",
                        inactive: "none"
                    },
                    outgoing: {
                        initiator: "sendonly",
                        responder: "recvonly",
                        both: "sendrecv",
                        none: "inactive",
                        recvonly: "responder",
                        sendonly: "initiator",
                        sendrecv: "both",
                        inactive: "none"
                    }
                },
                responder: {
                    incoming: {
                        initiator: "sendonly",
                        responder: "recvonly",
                        both: "sendrecv",
                        none: "inactive",
                        recvonly: "responder",
                        sendonly: "initiator",
                        sendrecv: "both",
                        inactive: "none"
                    },
                    outgoing: {
                        initiator: "recvonly",
                        responder: "sendonly",
                        both: "sendrecv",
                        none: "inactive",
                        recvonly: "initiator",
                        sendonly: "responder",
                        sendrecv: "both",
                        inactive: "none"
                    }
                }
            }
        }, {}],
        54: [function (e, t, n) {
            n.lines = function (e) {
                return e.split("\r\n").filter(function (e) {
                    return e.length > 0
                })
            }, n.findLine = function (e, t, n) {
                for (var r = e.length, i = 0; i < t.length; i++)
                    if (t[i].substr(0, r) === e) return t[i];
                if (!n) return !1;
                for (var o = 0; o < n.length; o++)
                    if (n[o].substr(0, r) === e) return n[o];
                return !1
            }, n.findLines = function (e, t, n) {
                for (var r = [], i = e.length, o = 0; o < t.length; o++) t[o].substr(0, i) === e && r.push(t[o]);
                if (r.length || !n) return r;
                for (var a = 0; a < n.length; a++) n[a].substr(0, i) === e && r.push(n[a]);
                return r
            }, n.mline = function (e) {
                for (var t = e.substr(2).split(" "), n = {
                        media: t[0],
                        port: t[1],
                        proto: t[2],
                        formats: []
                    }, r = 3; r < t.length; r++) t[r] && n.formats.push(t[r]);
                return n
            }, n.rtpmap = function (e) {
                var t = e.substr(9).split(" "),
                    n = {
                        id: t.shift()
                    };
                return t = t[0].split("/"), n.name = t[0], n.clockrate = t[1], n.channels = 3 == t.length ? t[2] : "1", n
            }, n.sctpmap = function (e) {
                var t = e.substr(10).split(" "),
                    n = {
                        number: t.shift(),
                        protocol: t.shift(),
                        streams: t.shift()
                    };
                return n
            }, n.fmtp = function (e) {
                for (var t, n, r, i = e.substr(e.indexOf(" ") + 1).split(";"), o = [], a = 0; a < i.length; a++) t = i[a].split("="), n = t[0].trim(), r = t[1], n && r ? o.push({
                    key: n,
                    value: r
                }) : n && o.push({
                    key: "",
                    value: n
                });
                return o
            }, n.crypto = function (e) {
                var t = e.substr(9).split(" "),
                    n = {
                        tag: t[0],
                        cipherSuite: t[1],
                        keyParams: t[2],
                        sessionParams: t.slice(3).join(" ")
                    };
                return n
            }, n.fingerprint = function (e) {
                var t = e.substr(14).split(" ");
                return {
                    hash: t[0],
                    value: t[1]
                }
            }, n.extmap = function (e) {
                var t = e.substr(9).split(" "),
                    n = {},
                    r = t.shift(),
                    i = r.indexOf("/");
                return i >= 0 ? (n.id = r.substr(0, i), n.senders = r.substr(i + 1)) : (n.id = r, n.senders = "sendrecv"), n.uri = t.shift() || "", n
            }, n.rtcpfb = function (e) {
                var t = e.substr(10).split(" "),
                    n = {};
                return n.id = t.shift(), n.type = t.shift(), "trr-int" === n.type ? n.value = t.shift() : n.subtype = t.shift() || "", n.parameters = t, n
            }, n.candidate = function (e) {
                var t;
                t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" ");
                for (var n = {
                        foundation: t[0],
                        component: t[1],
                        protocol: t[2].toLowerCase(),
                        priority: t[3],
                        ip: t[4],
                        port: t[5],
                        type: t[7],
                        generation: "0"
                    }, r = 8; r < t.length; r += 2) "raddr" === t[r] ? n.relAddr = t[r + 1] : "rport" === t[r] ? n.relPort = t[r + 1] : "generation" === t[r] ? n.generation = t[r + 1] : "tcptype" === t[r] && (n.tcpType = t[r + 1]);
                return n.network = "1", n
            }, n.sourceGroups = function (e) {
                for (var t = [], n = 0; n < e.length; n++) {
                    var r = e[n].substr(13).split(" ");
                    t.push({
                        semantics: r.shift(),
                        sources: r
                    })
                }
                return t
            }, n.sources = function (e) {
                for (var t = [], n = {}, r = 0; r < e.length; r++) {
                    var i = e[r].substr(7).split(" "),
                        o = i.shift();
                    if (!n[o]) {
                        var a = {
                            ssrc: o,
                            parameters: []
                        };
                        t.push(a), n[o] = a
                    }
                    i = i.join(" ").split(":");
                    var s = i.shift(),
                        c = i.join(":") || null;
                    n[o].parameters.push({
                        key: s,
                        value: c
                    })
                }
                return t
            }, n.groups = function (e) {
                for (var t, n = [], r = 0; r < e.length; r++) t = e[r].substr(8).split(" "), n.push({
                    semantics: t.shift(),
                    contents: t
                });
                return n
            }, n.bandwidth = function (e) {
                var t = e.substr(2).split(":"),
                    n = {};
                return n.type = t.shift(), n.bandwidth = t.shift(), n
            }, n.msid = function (e) {
                var t = e.substr(7),
                    n = t.split(" ");
                return {
                    msid: t,
                    mslabel: n[0],
                    label: n[1]
                }
            }
        }, {}],
        38: [function (e, t) {
            "use strict";
            var n = e("./edge_sdp"),
                r = e("../utils").log;
            e("../utils").browserDetails;
            var i = {
                shimPeerConnection: function () {
                    window.RTCIceGatherer && (window.RTCIceCandidate || (window.RTCIceCandidate = function (e) {
                        return e
                    }), window.RTCSessionDescription || (window.RTCSessionDescription = function (e) {
                        return e
                    })), window.RTCPeerConnection = function (e) {
                        var t = this;
                        if (this.onicecandidate = null, this.onaddstream = null, this.onremovestream = null, this.onsignalingstatechange = null, this.oniceconnectionstatechange = null, this.onnegotiationneeded = null, this.ondatachannel = null, this.localStreams = [], this.remoteStreams = [], this.getLocalStreams = function () {
                                return t.localStreams
                            }, this.getRemoteStreams = function () {
                                return t.remoteStreams
                            }, this.localDescription = new RTCSessionDescription({
                                type: "",
                                sdp: ""
                            }), this.remoteDescription = new RTCSessionDescription({
                                type: "",
                                sdp: ""
                            }), this.signalingState = "stable", this.iceConnectionState = "new", this.iceOptions = {
                                gatherPolicy: "all",
                                iceServers: []
                            }, e && e.iceTransportPolicy) switch (e.iceTransportPolicy) {
                            case "all":
                            case "relay":
                                this.iceOptions.gatherPolicy = e.iceTransportPolicy;
                                break;
                            case "none":
                                throw new TypeError('iceTransportPolicy "none" not supported')
                        }
                        e && e.iceServers && (this.iceOptions.iceServers = e.iceServers.filter(function (e) {
                            return e && e.urls ? (e.urls = e.urls.filter(function (e) {
                                return -1 !== e.indexOf("transport=udp")
                            })[0], !0) : !1
                        })), this.transceivers = [], this._localIceCandidatesBuffer = []
                    }, window.RTCPeerConnection.prototype._emitBufferedCandidates = function () {
                        var e = this;
                        this._localIceCandidatesBuffer.forEach(function (t) {
                            null !== e.onicecandidate && e.onicecandidate(t)
                        }), this._localIceCandidatesBuffer = []
                    }, window.RTCPeerConnection.prototype.addStream = function (e) {
                        this.localStreams.push(e.clone()), this._maybeFireNegotiationNeeded()
                    }, window.RTCPeerConnection.prototype.removeStream = function (e) {
                        var t = this.localStreams.indexOf(e);
                        t > -1 && (this.localStreams.splice(t, 1), this._maybeFireNegotiationNeeded())
                    }, window.RTCPeerConnection.prototype._getCommonCapabilities = function (e, t) {
                        var n = {
                            codecs: [],
                            headerExtensions: [],
                            fecMechanisms: []
                        };
                        return e.codecs.forEach(function (e) {
                            for (var r = 0; r < t.codecs.length; r++) {
                                var i = t.codecs[r];
                                if (e.name.toLowerCase() === i.name.toLowerCase() && e.clockRate === i.clockRate && e.numChannels === i.numChannels) {
                                    n.codecs.push(i);
                                    break
                                }
                            }
                        }), e.headerExtensions.forEach(function (e) {
                            for (var r = 0; r < t.headerExtensions.length; r++) {
                                var i = t.headerExtensions[r];
                                if (e.uri === i.uri) {
                                    n.headerExtensions.push(i);
                                    break
                                }
                            }
                        }), n
                    }, window.RTCPeerConnection.prototype._createIceAndDtlsTransports = function (e, t) {
                        var r = this,
                            i = new RTCIceGatherer(r.iceOptions),
                            o = new RTCIceTransport(i);
                        i.onlocalcandidate = function (a) {
                            var s = {};
                            s.candidate = {
                                sdpMid: e,
                                sdpMLineIndex: t
                            };
                            var c = a.candidate;
                            c && 0 !== Object.keys(c).length ? (c.component = "RTCP" === o.component ? 2 : 1, s.candidate.candidate = n.writeCandidate(c)) : (void 0 === i.state && (i.state = "completed"), s.candidate.candidate = "candidate:1 1 udp 1 0.0.0.0 9 typ endOfCandidates");
                            var u = r.transceivers.every(function (e) {
                                return e.iceGatherer && "completed" === e.iceGatherer.state
                            });
                            null !== r.onicecandidate && (r.localDescription && "" === r.localDescription.type ? (r._localIceCandidatesBuffer.push(s), u && r._localIceCandidatesBuffer.push({})) : (r.onicecandidate(s), u && r.onicecandidate({})))
                        }, o.onicestatechange = function () {
                            r._updateConnectionState()
                        };
                        var a = new RTCDtlsTransport(o);
                        return a.ondtlsstatechange = function () {
                            r._updateConnectionState()
                        }, a.onerror = function () {
                            a.state = "failed", r._updateConnectionState()
                        }, {
                            iceGatherer: i,
                            iceTransport: o,
                            dtlsTransport: a
                        }
                    }, window.RTCPeerConnection.prototype._transceive = function (e, t, r) {
                        var i = this._getCommonCapabilities(e.localCapabilities, e.remoteCapabilities);
                        t && e.rtpSender && (i.encodings = [{
                            ssrc: e.sendSsrc
                        }], i.rtcp = {
                            cname: n.localCName,
                            ssrc: e.recvSsrc
                        }, e.rtpSender.send(i)), r && e.rtpReceiver && (i.encodings = [{
                            ssrc: e.recvSsrc
                        }], i.rtcp = {
                            cname: e.cname,
                            ssrc: e.sendSsrc
                        }, e.rtpReceiver.receive(i))
                    }, window.RTCPeerConnection.prototype.setLocalDescription = function (e) {
                        var t = this;
                        if ("offer" === e.type) this._pendingOffer && (this.transceivers = this._pendingOffer, delete this._pendingOffer);
                        else if ("answer" === e.type) {
                            var r = n.splitSections(t.remoteDescription.sdp),
                                i = r.shift();
                            r.forEach(function (e, r) {
                                var o = t.transceivers[r],
                                    a = o.iceGatherer,
                                    s = o.iceTransport,
                                    c = o.dtlsTransport,
                                    u = o.localCapabilities,
                                    p = o.remoteCapabilities,
                                    d = "0" === e.split("\n", 1)[0].split(" ", 2)[1];
                                if (!d) {
                                    var l = n.getIceParameters(e, i);
                                    s.start(a, l, "controlled");
                                    var f = n.getDtlsParameters(e, i);
                                    c.start(f);
                                    var h = t._getCommonCapabilities(u, p);
                                    t._transceive(o, h.codecs.length > 0, !1)
                                }
                            })
                        }
                        switch (this.localDescription = e, e.type) {
                            case "offer":
                                this._updateSignalingState("have-local-offer");
                                break;
                            case "answer":
                                this._updateSignalingState("stable");
                                break;
                            default:
                                throw new TypeError('unsupported type "' + e.type + '"')
                        }
                        var o = arguments.length > 1 && "function" == typeof arguments[1];
                        if (o) {
                            var a = arguments[1];
                            window.setTimeout(function () {
                                a(), t._emitBufferedCandidates()
                            }, 0)
                        }
                        var s = Promise.resolve();
                        return s.then(function () {
                            o || window.setTimeout(t._emitBufferedCandidates.bind(t), 0)
                        }), s
                    }, window.RTCPeerConnection.prototype.setRemoteDescription = function (e) {
                        var t = this,
                            r = new MediaStream,
                            i = n.splitSections(e.sdp),
                            o = i.shift();
                        switch (i.forEach(function (i, a) {
                            var s, c, u, p, d, l, f, h, m, g, v, y = n.splitLines(i),
                                b = y[0].substr(2).split(" "),
                                w = b[0],
                                C = "0" === b[1],
                                S = n.getDirection(i, o),
                                k = n.parseRtpParameters(i);
                            C || (g = n.getIceParameters(i, o), v = n.getDtlsParameters(i, o));
                            var T, R = n.matchPrefix(i, "a=mid:")[0].substr(6),
                                P = n.matchPrefix(i, "a=ssrc:").map(function (e) {
                                    return n.parseSsrcMedia(e)
                                }).filter(function (e) {
                                    return "cname" === e.attribute
                                })[0];
                            if (P && (h = parseInt(P.ssrc, 10), T = P.value), "offer" === e.type) {
                                var E = t._createIceAndDtlsTransports(R, a);
                                if (m = RTCRtpReceiver.getCapabilities(w), f = 1001 * (2 * a + 2), l = new RTCRtpReceiver(E.dtlsTransport, w), r.addTrack(l.track), t.localStreams.length > 0 && t.localStreams[0].getTracks().length >= a) {
                                    var x = t.localStreams[0].getTracks()[a];
                                    d = new RTCRtpSender(x, E.dtlsTransport)
                                }
                                t.transceivers[a] = {
                                    iceGatherer: E.iceGatherer,
                                    iceTransport: E.iceTransport,
                                    dtlsTransport: E.dtlsTransport,
                                    localCapabilities: m,
                                    remoteCapabilities: k,
                                    rtpSender: d,
                                    rtpReceiver: l,
                                    kind: w,
                                    mid: R,
                                    cname: T,
                                    sendSsrc: f,
                                    recvSsrc: h
                                }, t._transceive(t.transceivers[a], !1, "sendrecv" === S || "sendonly" === S)
                            } else "answer" !== e.type || C || (s = t.transceivers[a], c = s.iceGatherer, u = s.iceTransport, p = s.dtlsTransport, d = s.rtpSender, l = s.rtpReceiver, f = s.sendSsrc, m = s.localCapabilities, t.transceivers[a].recvSsrc = h, t.transceivers[a].remoteCapabilities = k, t.transceivers[a].cname = T, u.start(c, g, "controlling"), p.start(v), t._transceive(s, "sendrecv" === S || "recvonly" === S, "sendrecv" === S || "sendonly" === S), !l || "sendrecv" !== S && "sendonly" !== S ? delete s.rtpReceiver : r.addTrack(l.track))
                        }), this.remoteDescription = e, e.type) {
                            case "offer":
                                this._updateSignalingState("have-remote-offer");
                                break;
                            case "answer":
                                this._updateSignalingState("stable");
                                break;
                            default:
                                throw new TypeError('unsupported type "' + e.type + '"')
                        }
                        return window.setTimeout(function () {
                            null !== t.onaddstream && r.getTracks().length && (t.remoteStreams.push(r), window.setTimeout(function () {
                                t.onaddstream({
                                    stream: r
                                })
                            }, 0))
                        }, 0), arguments.length > 1 && "function" == typeof arguments[1] && window.setTimeout(arguments[1], 0), Promise.resolve()
                    }, window.RTCPeerConnection.prototype.close = function () {
                        this.transceivers.forEach(function (e) {
                            e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender && e.rtpSender.stop(), e.rtpReceiver && e.rtpReceiver.stop()
                        }), this._updateSignalingState("closed")
                    }, window.RTCPeerConnection.prototype._updateSignalingState = function (e) {
                        this.signalingState = e, null !== this.onsignalingstatechange && this.onsignalingstatechange()
                    }, window.RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function () {
                        null !== this.onnegotiationneeded && this.onnegotiationneeded()
                    }, window.RTCPeerConnection.prototype._updateConnectionState = function () {
                        var e, t = this,
                            n = {
                                "new": 0,
                                closed: 0,
                                connecting: 0,
                                checking: 0,
                                connected: 0,
                                completed: 0,
                                failed: 0
                            };
                        this.transceivers.forEach(function (e) {
                            n[e.iceTransport.state]++, n[e.dtlsTransport.state]++
                        }), n.connected += n.completed, e = "new", n.failed > 0 ? e = "failed" : n.connecting > 0 || n.checking > 0 ? e = "connecting" : n.disconnected > 0 ? e = "disconnected" : n["new"] > 0 ? e = "new" : (n.connecting > 0 || n.completed > 0) && (e = "connected"), e !== t.iceConnectionState && (t.iceConnectionState = e, null !== this.oniceconnectionstatechange && this.oniceconnectionstatechange())
                    }, window.RTCPeerConnection.prototype.createOffer = function () {
                        var e = this;
                        if (this._pendingOffer) throw new Error("createOffer called while there is a pending offer.");
                        var t;
                        1 === arguments.length && "function" != typeof arguments[0] ? t = arguments[0] : 3 === arguments.length && (t = arguments[2]);
                        var r = [],
                            i = 0,
                            o = 0;
                        if (this.localStreams.length && (i = this.localStreams[0].getAudioTracks().length, o = this.localStreams[0].getVideoTracks().length), t) {
                            if (t.mandatory || t.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
                            void 0 !== t.offerToReceiveAudio && (i = t.offerToReceiveAudio), void 0 !== t.offerToReceiveVideo && (o = t.offerToReceiveVideo)
                        }
                        for (this.localStreams.length && this.localStreams[0].getTracks().forEach(function (e) {
                                r.push({
                                    kind: e.kind,
                                    track: e,
                                    wantReceive: "audio" === e.kind ? i > 0 : o > 0
                                }), "audio" === e.kind ? i-- : "video" === e.kind && o--
                            }); i > 0 || o > 0;) i > 0 && (r.push({
                            kind: "audio",
                            wantReceive: !0
                        }), i--), o > 0 && (r.push({
                            kind: "video",
                            wantReceive: !0
                        }), o--);
                        var a = n.writeSessionBoilerplate(),
                            s = [];
                        r.forEach(function (t, r) {
                            var i, o, c = t.track,
                                u = t.kind,
                                p = n.generateIdentifier(),
                                d = e._createIceAndDtlsTransports(p, r),
                                l = RTCRtpSender.getCapabilities(u),
                                f = 1001 * (2 * r + 1);
                            c && (i = new RTCRtpSender(c, d.dtlsTransport)), t.wantReceive && (o = new RTCRtpReceiver(d.dtlsTransport, u)), s[r] = {
                                iceGatherer: d.iceGatherer,
                                iceTransport: d.iceTransport,
                                dtlsTransport: d.dtlsTransport,
                                localCapabilities: l,
                                remoteCapabilities: null,
                                rtpSender: i,
                                rtpReceiver: o,
                                kind: u,
                                mid: p,
                                sendSsrc: f,
                                recvSsrc: null
                            };
                            var h = s[r];
                            a += n.writeMediaSection(h, h.localCapabilities, "offer", e.localStreams[0])
                        }), this._pendingOffer = s;
                        var c = new RTCSessionDescription({
                            type: "offer",
                            sdp: a
                        });
                        return arguments.length && "function" == typeof arguments[0] && window.setTimeout(arguments[0], 0, c), Promise.resolve(c)
                    }, window.RTCPeerConnection.prototype.createAnswer = function () {
                        var e, t = this;
                        1 === arguments.length && "function" != typeof arguments[0] ? e = arguments[0] : 3 === arguments.length && (e = arguments[2]);
                        var r = n.writeSessionBoilerplate();
                        this.transceivers.forEach(function (e) {
                            var i = t._getCommonCapabilities(e.localCapabilities, e.remoteCapabilities);
                            r += n.writeMediaSection(e, i, "answer", t.localStreams[0])
                        });
                        var i = new RTCSessionDescription({
                            type: "answer",
                            sdp: r
                        });
                        return arguments.length && "function" == typeof arguments[0] && window.setTimeout(arguments[0], 0, i), Promise.resolve(i)
                    }, window.RTCPeerConnection.prototype.addIceCandidate = function (e) {
                        var t = e.sdpMLineIndex;
                        if (e.sdpMid)
                            for (var r = 0; r < this.transceivers.length; r++)
                                if (this.transceivers[r].mid === e.sdpMid) {
                                    t = r;
                                    break
                                }
                        var i = this.transceivers[t];
                        if (i) {
                            var o = Object.keys(e.candidate).length > 0 ? n.parseCandidate(e.candidate) : {};
                            if ("tcp" === o.protocol && 0 === o.port) return;
                            if ("1" !== o.component) return;
                            "endOfCandidates" === o.type && (o = {}), i.iceTransport.addRemoteCandidate(o)
                        }
                        return arguments.length > 1 && "function" == typeof arguments[1] && window.setTimeout(arguments[1], 0), Promise.resolve()
                    }, window.RTCPeerConnection.prototype.getStats = function () {
                        var e = [];
                        this.transceivers.forEach(function (t) {
                            ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function (n) {
                                t[n] && e.push(t[n].getStats())
                            })
                        });
                        var t = arguments.length > 1 && "function" == typeof arguments[1] && arguments[1];
                        return new Promise(function (n) {
                            var r = {};
                            Promise.all(e).then(function (e) {
                                e.forEach(function (e) {
                                    Object.keys(e).forEach(function (t) {
                                        r[t] = e[t]
                                    })
                                }), t && window.setTimeout(t, 0, r), n(r)
                            })
                        })
                    }
                },
                attachMediaStream: function (e, t) {
                    r("DEPRECATED, attachMediaStream will soon be removed."), e.srcObject = t
                },
                reattachMediaStream: function (e, t) {
                    r("DEPRECATED, reattachMediaStream will soon be removed."), e.srcObject = t.srcObject
                }
            };
            t.exports = {
                shimPeerConnection: i.shimPeerConnection,
                attachMediaStream: i.attachMediaStream,
                reattachMediaStream: i.reattachMediaStream
            }
        }, {
            "../utils": 36,
            "./edge_sdp": 64
        }],
        39: [function (e, t) {
            "use strict";
            var n = e("../utils").log,
                r = e("../utils").browserDetails,
                i = {
                    shimOnTrack: function () {
                        "object" != typeof window || !window.RTCPeerConnection || "ontrack" in window.RTCPeerConnection.prototype || Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", {
                            get: function () {
                                return this._ontrack
                            },
                            set: function (e) {
                                this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = e), this.addEventListener("addstream", this._ontrackpoly = function (e) {
                                    e.stream.getTracks().forEach(function (t) {
                                        var n = new Event("track");
                                        n.track = t, n.receiver = {
                                            track: t
                                        }, n.streams = [e.stream], this.dispatchEvent(n)
                                    }.bind(this))
                                }.bind(this))
                            }
                        })
                    },
                    shimSourceObject: function () {
                        "object" == typeof window && (!window.HTMLMediaElement || "srcObject" in window.HTMLMediaElement.prototype || Object.defineProperty(window.HTMLMediaElement.prototype, "srcObject", {
                            get: function () {
                                return this.mozSrcObject
                            },
                            set: function (e) {
                                this.mozSrcObject = e
                            }
                        }))
                    },
                    shimPeerConnection: function () {
                        window.RTCPeerConnection || (window.RTCPeerConnection = function (e, t) {
                            if (r.version < 38 && e && e.iceServers) {
                                for (var n = [], i = 0; i < e.iceServers.length; i++) {
                                    var o = e.iceServers[i];
                                    if (o.hasOwnProperty("urls"))
                                        for (var a = 0; a < o.urls.length; a++) {
                                            var s = {
                                                url: o.urls[a]
                                            };
                                            0 === o.urls[a].indexOf("turn") && (s.username = o.username, s.credential = o.credential), n.push(s)
                                        } else n.push(e.iceServers[i])
                                }
                                e.iceServers = n
                            }
                            return new mozRTCPeerConnection(e, t)
                        }, window.RTCPeerConnection.prototype = mozRTCPeerConnection.prototype, mozRTCPeerConnection.generateCertificate && Object.defineProperty(window.RTCPeerConnection, "generateCertificate", {
                            get: function () {
                                return arguments.length ? mozRTCPeerConnection.generateCertificate.apply(null, arguments) : mozRTCPeerConnection.generateCertificate
                            }
                        }), window.RTCSessionDescription = mozRTCSessionDescription, window.RTCIceCandidate = mozRTCIceCandidate)
                    },
                    shimGetUserMedia: function () {
                        var e = function (e, t, i) {
                            var o = function (e) {
                                if ("object" != typeof e || e.require) return e;
                                var t = [];
                                return Object.keys(e).forEach(function (n) {
                                    if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
                                        var r = e[n] = "object" == typeof e[n] ? e[n] : {
                                            ideal: e[n]
                                        };
                                        if ((void 0 !== r.min || void 0 !== r.max || void 0 !== r.exact) && t.push(n), void 0 !== r.exact && ("number" == typeof r.exact ? r.min = r.max = r.exact : e[n] = r.exact, delete r.exact), void 0 !== r.ideal) {
                                            e.advanced = e.advanced || [];
                                            var i = {};
                                            i[n] = "number" == typeof r.ideal ? {
                                                min: r.ideal,
                                                max: r.ideal
                                            } : r.ideal, e.advanced.push(i), delete r.ideal, Object.keys(r).length || delete e[n]
                                        }
                                    }
                                }), t.length && (e.require = t), e
                            };
                            return r.version < 38 && (n("spec: " + JSON.stringify(e)), e.audio && (e.audio = o(e.audio)), e.video && (e.video = o(e.video)), n("ff37: " + JSON.stringify(e))), navigator.mozGetUserMedia(e, t, i)
                        };
                        navigator.getUserMedia = e;
                        var t = function (e) {
                            return new Promise(function (t, n) {
                                navigator.getUserMedia(e, t, n)
                            })
                        };
                        if (navigator.mediaDevices || (navigator.mediaDevices = {
                                getUserMedia: t,
                                addEventListener: function () {},
                                removeEventListener: function () {}
                            }), navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function () {
                                return new Promise(function (e) {
                                    var t = [{
                                        kind: "audioinput",
                                        deviceId: "default",
                                        label: "",
                                        groupId: ""
                                    }, {
                                        kind: "videoinput",
                                        deviceId: "default",
                                        label: "",
                                        groupId: ""
                                    }];
                                    e(t)
                                })
                            }, r.version < 41) {
                            var i = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
                            navigator.mediaDevices.enumerateDevices = function () {
                                return i().then(void 0, function (e) {
                                    if ("NotFoundError" === e.name) return [];
                                    throw e
                                })
                            }
                        }
                    },
                    attachMediaStream: function (e, t) {
                        n("DEPRECATED, attachMediaStream will soon be removed."), e.srcObject = t
                    },
                    reattachMediaStream: function (e, t) {
                        n("DEPRECATED, reattachMediaStream will soon be removed."), e.srcObject = t.srcObject
                    }
                };
            t.exports = {
                shimOnTrack: i.shimOnTrack,
                shimSourceObject: i.shimSourceObject,
                shimPeerConnection: i.shimPeerConnection,
                shimGetUserMedia: i.shimGetUserMedia,
                attachMediaStream: i.attachMediaStream,
                reattachMediaStream: i.reattachMediaStream
            }
        }, {
            "../utils": 36
        }],
        56: [function (e, t) {
            function n(e) {
                return e ? r(e) : void 0
            }

            function r(e) {
                for (var t in n.prototype) e[t] = n.prototype[t];
                return e
            }
            t.exports = n, n.prototype.on = n.prototype.addEventListener = function (e, t) {
                return this._callbacks = this._callbacks || {}, (this._callbacks[e] = this._callbacks[e] || []).push(t), this
            }, n.prototype.once = function (e, t) {
                function n() {
                    r.off(e, n), t.apply(this, arguments)
                }
                var r = this;
                return this._callbacks = this._callbacks || {}, n.fn = t, this.on(e, n), this
            }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (e, t) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                var n = this._callbacks[e];
                if (!n) return this;
                if (1 == arguments.length) return delete this._callbacks[e], this;
                for (var r, i = 0; i < n.length; i++)
                    if (r = n[i], r === t || r.fn === t) {
                        n.splice(i, 1);
                        break
                    }
                return this
            }, n.prototype.emit = function (e) {
                this._callbacks = this._callbacks || {};
                var t = [].slice.call(arguments, 1),
                    n = this._callbacks[e];
                if (n) {
                    n = n.slice(0);
                    for (var r = 0, i = n.length; i > r; ++r) n[r].apply(this, t)
                }
                return this
            }, n.prototype.listeners = function (e) {
                return this._callbacks = this._callbacks || {}, this._callbacks[e] || []
            }, n.prototype.hasListeners = function (e) {
                return !!this.listeners(e).length
            }
        }, {}],
        65: [function (e, t) {
            function n(e) {
                return r.Buffer && r.Buffer.isBuffer(e) || r.ArrayBuffer && e instanceof ArrayBuffer
            }
            var r = self;
            t.exports = n
        }, {}],
        25: [function (e, t) {
            function n(e) {
                return {
                    type: e.type,
                    sdp: e.sdp
                }
            }

            function r(e) {
                var t = {
                    label: e.id
                };
                return e.getAudioTracks().length && (t.audio = e.getAudioTracks().map(function (e) {
                    return e.id
                })), e.getVideoTracks().length && (t.video = e.getVideoTracks().map(function (e) {
                    return e.id
                })), t
            }

            function i(e, t) {
                var n = this;
                a.call(this), this.peerconnection = new window.RTCPeerConnection(e, t), this.trace = function (e, t) {
                    n.emit("PeerConnectionTrace", {
                        time: new Date,
                        type: e,
                        value: t || ""
                    })
                }, this.onicecandidate = null, this.peerconnection.onicecandidate = function (e) {
                    n.trace("onicecandidate", e.candidate), null !== n.onicecandidate && n.onicecandidate(e)
                }, this.onaddstream = null, this.peerconnection.onaddstream = function (e) {
                    n.trace("onaddstream", r(e.stream)), null !== n.onaddstream && n.onaddstream(e)
                }, this.onremovestream = null, this.peerconnection.onremovestream = function (e) {
                    n.trace("onremovestream", r(e.stream)), null !== n.onremovestream && n.onremovestream(e)
                }, this.onsignalingstatechange = null, this.peerconnection.onsignalingstatechange = function (e) {
                    n.trace("onsignalingstatechange", n.signalingState), null !== n.onsignalingstatechange && n.onsignalingstatechange(e)
                }, this.oniceconnectionstatechange = null, this.peerconnection.oniceconnectionstatechange = function (e) {
                    n.trace("oniceconnectionstatechange", n.iceConnectionState), null !== n.oniceconnectionstatechange && n.oniceconnectionstatechange(e)
                }, this.onnegotiationneeded = null, this.peerconnection.onnegotiationneeded = function (e) {
                    n.trace("onnegotiationneeded"), null !== n.onnegotiationneeded && n.onnegotiationneeded(e)
                }, n.ondatachannel = null, this.peerconnection.ondatachannel = function (e) {
                    n.trace("ondatachannel", e), null !== n.ondatachannel && n.ondatachannel(e)
                }, this.getLocalStreams = this.peerconnection.getLocalStreams.bind(this.peerconnection), this.getRemoteStreams = this.peerconnection.getRemoteStreams.bind(this.peerconnection)
            }
            var o = e("util");
            e("webrtc-adapter");
            var a = e("wildemitter");
            o.inherits(i, a), ["signalingState", "iceConnectionState", "localDescription", "remoteDescription"].forEach(function (e) {
                Object.defineProperty(i.prototype, e, {
                    get: function () {
                        return this.peerconnection[e]
                    }
                })
            }), i.prototype.addStream = function (e) {
                this.trace("addStream", r(e)), this.peerconnection.addStream(e)
            }, i.prototype.removeStream = function (e) {
                this.trace("removeStream", r(e)), this.peerconnection.removeStream(e)
            }, i.prototype.createDataChannel = function (e, t) {
                return this.trace("createDataChannel", e, t), this.peerconnection.createDataChannel(e, t)
            }, i.prototype.setLocalDescription = function (e, t, r) {
                var i = this;
                this.trace("setLocalDescription", n(e)), this.peerconnection.setLocalDescription(e, function () {
                    i.trace("setLocalDescriptionOnSuccess"), t && t()
                }, function (e) {
                    i.trace("setLocalDescriptionOnFailure", e), r && r(e)
                })
            }, i.prototype.setRemoteDescription = function (e, t, r) {
                var i = this;
                this.trace("setRemoteDescription", n(e)), this.peerconnection.setRemoteDescription(e, function () {
                    i.trace("setRemoteDescriptionOnSuccess"), t && t()
                }, function (e) {
                    i.trace("setRemoteDescriptionOnFailure", e), r && r(e)
                })
            }, i.prototype.close = function () {
                this.trace("stop"), "closed" != this.peerconnection.signalingState && this.peerconnection.close()
            }, i.prototype.createOffer = function (e, t, r) {
                var i = this;
                this.trace("createOffer", r), this.peerconnection.createOffer(function (t) {
                    i.trace("createOfferOnSuccess", n(t)), e && e(t)
                }, function (e) {
                    i.trace("createOfferOnFailure", e), t && t(e)
                }, r)
            }, i.prototype.createAnswer = function (e, t, r) {
                var i = this;
                this.trace("createAnswer", r), this.peerconnection.createAnswer(function (t) {
                    i.trace("createAnswerOnSuccess", n(t)), e && e(t)
                }, function (e) {
                    i.trace("createAnswerOnFailure", e), t && t(e)
                }, r)
            }, i.prototype.addIceCandidate = function (e, t, n) {
                var r = this;
                this.trace("addIceCandidate", e), this.peerconnection.addIceCandidate(e, function () {
                    t && t()
                }, function (e) {
                    r.trace("addIceCandidateOnFailure", e), n && n(e)
                })
            }, i.prototype.getStats = function () {
                this.peerconnection.getStats.apply(this.peerconnection, arguments)
            }, t.exports = i
        }, {
            util: 8,
            "webrtc-adapter": 24,
            wildemitter: 4
        }],
        55: [function (e, t) {
            var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            t.exports = function (e) {
                for (var t = n.exec(e || ""), i = {}, o = 14; o--;) i[r[o]] = t[o] || "";
                return i
            }
        }, {}],
        58: [function (e, t) {
            var n = [].slice;
            t.exports = function (e, t) {
                if ("string" == typeof t && (t = e[t]), "function" != typeof t) throw new Error("bind() requires a function");
                var r = n.call(arguments, 2);
                return function () {
                    return t.apply(e, r.concat(n.call(arguments)))
                }
            }
        }, {}],
        60: [function (e, t) {
            var n = [].indexOf;
            t.exports = function (e, t) {
                if (n) return e.indexOf(t);
                for (var r = 0; r < e.length; ++r)
                    if (e[r] === t) return r;
                return -1
            }
        }, {}],
        59: [function (e, t, n) {
            var r = Object.prototype.hasOwnProperty;
            n.keys = Object.keys || function (e) {
                var t = [];
                for (var n in e) r.call(e, n) && t.push(n);
                return t
            }, n.values = function (e) {
                var t = [];
                for (var n in e) r.call(e, n) && t.push(e[n]);
                return t
            }, n.merge = function (e, t) {
                for (var n in t) r.call(t, n) && (e[n] = t[n]);
                return e
            }, n.length = function (e) {
                return n.keys(e).length
            }, n.isEmpty = function (e) {
                return 0 == n.length(e)
            }
        }, {}],
        61: [function (e, t) {
            function n(e) {
                e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0
            }
            t.exports = n, n.prototype.duration = function () {
                var e = this.ms * Math.pow(this.factor, this.attempts++);
                if (this.jitter) {
                    var t = Math.random(),
                        n = Math.floor(t * this.jitter * e);
                    e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n
                }
                return 0 | Math.min(e, this.max)
            }, n.prototype.reset = function () {
                this.attempts = 0
            }, n.prototype.setMin = function (e) {
                this.ms = e
            }, n.prototype.setMax = function (e) {
                this.max = e
            }, n.prototype.setJitter = function (e) {
                this.jitter = e
            }
        }, {}],
        62: [function (e, t) {
            function n(e, t) {
                var n = [];
                t = t || 0;
                for (var r = t || 0; r < e.length; r++) n[r - t] = e[r];
                return n
            }
            t.exports = n
        }, {}],
        64: [function (e, t) {
            "use strict";
            var n = {};
            n.generateIdentifier = function () {
                return Math.random().toString(36).substr(2, 10)
            }, n.localCName = n.generateIdentifier(), n.splitLines = function (e) {
                return e.trim().split("\n").map(function (e) {
                    return e.trim()
                })
            }, n.splitSections = function (e) {
                var t = e.split("\r\nm=");
                return t.map(function (e, t) {
                    return (t > 0 ? "m=" + e : e).trim() + "\r\n"
                })
            }, n.matchPrefix = function (e, t) {
                return n.splitLines(e).filter(function (e) {
                    return 0 === e.indexOf(t)
                })
            }, n.parseCandidate = function (e) {
                var t;
                t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" ");
                for (var n = {
                        foundation: t[0],
                        component: t[1],
                        protocol: t[2].toLowerCase(),
                        priority: parseInt(t[3], 10),
                        ip: t[4],
                        port: parseInt(t[5], 10),
                        type: t[7]
                    }, r = 8; r < t.length; r += 2) switch (t[r]) {
                    case "raddr":
                        n.relatedAddress = t[r + 1];
                        break;
                    case "rport":
                        n.relatedPort = parseInt(t[r + 1], 10);
                        break;
                    case "tcptype":
                        n.tcpType = t[r + 1]
                }
                return n
            }, n.writeCandidate = function (e) {
                var t = [];
                t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.ip), t.push(e.port);
                var n = e.type;
                return t.push("typ"), t.push(n), "host" !== n && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), "candidate:" + t.join(" ")
            }, n.parseRtpMap = function (e) {
                var t = e.substr(9).split(" "),
                    n = {
                        payloadType: parseInt(t.shift(), 10)
                    };
                return t = t[0].split("/"), n.name = t[0], n.clockRate = parseInt(t[1], 10), n.numChannels = 3 === t.length ? parseInt(t[2], 10) : 1, n
            }, n.writeRtpMap = function (e) {
                var t = e.payloadType;
                return void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType), "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== e.numChannels ? "/" + e.numChannels : "") + "\r\n"
            }, n.parseFmtp = function (e) {
                for (var t, n = {}, r = e.substr(e.indexOf(" ") + 1).split(";"), i = 0; i < r.length; i++) t = r[i].trim().split("="), n[t[0].trim()] = t[1];
                return n
            }, n.writeFtmp = function (e) {
                var t = "",
                    n = e.payloadType;
                if (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.parameters && e.parameters.length) {
                    var r = [];
                    Object.keys(e.parameters).forEach(function (t) {
                        r.push(t + "=" + e.parameters[t])
                    }), t += "a=fmtp:" + n + " " + r.join(";") + "\r\n"
                }
                return t
            }, n.parseRtcpFb = function (e) {
                var t = e.substr(e.indexOf(" ") + 1).split(" ");
                return {
                    type: t.shift(),
                    parameter: t.join(" ")
                }
            }, n.writeRtcpFb = function (e) {
                var t = "",
                    n = e.payloadType;
                return void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function (e) {
                    t += "a=rtcp-fb:" + n + " " + e.type + " " + e.parameter + "\r\n"
                }), t
            }, n.parseSsrcMedia = function (e) {
                var t = e.indexOf(" "),
                    n = {
                        ssrc: e.substr(7, t - 7)
                    },
                    r = e.indexOf(":", t);
                return r > -1 ? (n.attribute = e.substr(t + 1, r - t - 1), n.value = e.substr(r + 1)) : n.attribute = e.substr(t + 1), n
            }, n.getDtlsParameters = function (e, t) {
                var r = n.splitLines(e);
                r = r.concat(n.splitLines(t));
                var i = r.filter(function (e) {
                        return 0 === e.indexOf("a=fingerprint:")
                    })[0].substr(14),
                    o = {
                        role: "auto",
                        fingerprints: [{
                            algorithm: i.split(" ")[0],
                            value: i.split(" ")[1]
                        }]
                    };
                return o
            }, n.writeDtlsParameters = function (e, t) {
                var n = "a=setup:" + t + "\r\n";
                return e.fingerprints.forEach(function (e) {
                    n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
                }), n
            }, n.getIceParameters = function (e, t) {
                var r = n.splitLines(e);
                r = r.concat(n.splitLines(t));
                var i = {
                    usernameFragment: r.filter(function (e) {
                        return 0 === e.indexOf("a=ice-ufrag:")
                    })[0].substr(12),
                    password: r.filter(function (e) {
                        return 0 === e.indexOf("a=ice-pwd:")
                    })[0].substr(10)
                };
                return i
            }, n.writeIceParameters = function (e) {
                return "a=ice-ufrag:" + e.usernameFragment + "\r\n" + "a=ice-pwd:" + e.password + "\r\n"
            }, n.parseRtpParameters = function (e) {
                for (var t = {
                        codecs: [],
                        headerExtensions: [],
                        fecMechanisms: [],
                        rtcp: []
                    }, r = n.splitLines(e), i = r[0].split(" "), o = 3; o < i.length; o++) {
                    var a = i[o],
                        s = n.matchPrefix(e, "a=rtpmap:" + a + " ")[0];
                    if (s) {
                        var c = n.parseRtpMap(s),
                            u = n.matchPrefix(e, "a=fmtp:" + a + " ");
                        c.parameters = u.length ? n.parseFmtp(u[0]) : {}, c.rtcpFeedback = n.matchPrefix(e, "a=rtcp-fb:" + a + " ").map(n.parseRtcpFb), t.codecs.push(c)
                    }
                }
                return t
            }, n.writeRtpDescription = function (e, t) {
                var r = "";
                return r += "m=" + e + " ", r += t.codecs.length > 0 ? "9" : "0", r += " UDP/TLS/RTP/SAVPF ", r += t.codecs.map(function (e) {
                    return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType
                }).join(" ") + "\r\n", r += "c=IN IP4 0.0.0.0\r\n", r += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function (e) {
                    r += n.writeRtpMap(e), r += n.writeFtmp(e), r += n.writeRtcpFb(e)
                }), r += "a=rtcp-mux\r\n"
            }, n.writeSessionBoilerplate = function () {
                return "v=0\r\no=thisisadapterortc 8169639915646943137 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
            }, n.writeMediaSection = function (e, t, r, i) {
                var o = n.writeRtpDescription(e.kind, t);
                if (o += n.writeIceParameters(e.iceGatherer.getLocalParameters()), o += n.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === r ? "actpass" : "active"), o += "a=mid:" + e.mid + "\r\n", o += e.rtpSender && e.rtpReceiver ? "a=sendrecv\r\n" : e.rtpSender ? "a=sendonly\r\n" : e.rtpReceiver ? "a=recvonly\r\n" : "a=inactive\r\n", e.rtpSender) {
                    var a = "msid:" + i.id + " " + e.rtpSender.track.id + "\r\n";
                    o += "a=" + a, o += "a=ssrc:" + e.sendSsrc + " " + a
                }
                return o += "a=ssrc:" + e.sendSsrc + " cname:" + n.localCName + "\r\n"
            }, n.getDirection = function (e, t) {
                for (var r = n.splitLines(e), i = 0; i < r.length; i++) switch (r[i]) {
                    case "a=sendrecv":
                    case "a=sendonly":
                    case "a=recvonly":
                    case "a=inactive":
                        return r[i].substr(2)
                }
                return t ? n.getDirection(t) : "sendrecv"
            }, t.exports = n
        }, {}],
        42: [function (e, t) {
            "use strict";
            var n = e("../utils.js").log,
                r = e("../utils.js").browserDetails,
                i = {
                    shimOnTrack: function () {
                        "object" != typeof window || !window.RTCPeerConnection || "ontrack" in window.RTCPeerConnection.prototype || Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", {
                            get: function () {
                                return this._ontrack
                            },
                            set: function (e) {
                                var t = this;
                                this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = e), this.addEventListener("addstream", this._ontrackpoly = function (e) {
                                    e.stream.addEventListener("addtrack", function (n) {
                                        var r = new Event("track");
                                        r.track = n.track, r.receiver = {
                                            track: n.track
                                        }, r.streams = [e.stream], t.dispatchEvent(r)
                                    }), e.stream.getTracks().forEach(function (t) {
                                        var n = new Event("track");
                                        n.track = t, n.receiver = {
                                            track: t
                                        }, n.streams = [e.stream], this.dispatchEvent(n)
                                    }.bind(this))
                                }.bind(this))
                            }
                        })
                    },
                    shimSourceObject: function () {
                        "object" == typeof window && (!window.HTMLMediaElement || "srcObject" in window.HTMLMediaElement.prototype || Object.defineProperty(window.HTMLMediaElement.prototype, "srcObject", {
                            get: function () {
                                return this._srcObject
                            },
                            set: function (e) {
                                this._srcObject = e, this.src && URL.revokeObjectURL(this.src), this.src = URL.createObjectURL(e), e.addEventListener("addtrack", function () {
                                    self.src && URL.revokeObjectURL(self.src), self.src = URL.createObjectURL(e)
                                }), e.addEventListener("removetrack", function () {
                                    self.src && URL.revokeObjectURL(self.src), self.src = URL.createObjectURL(e)
                                })
                            }
                        }))
                    },
                    shimPeerConnection: function () {
                        window.RTCPeerConnection = function (e, t) {
                            n("PeerConnection"), e && e.iceTransportPolicy && (e.iceTransports = e.iceTransportPolicy);
                            var r = new webkitRTCPeerConnection(e, t),
                                i = r.getStats.bind(r);
                            return r.getStats = function (e, t) {
                                var n = this,
                                    r = arguments;
                                if (arguments.length > 0 && "function" == typeof e) return i(e, t);
                                var o = function (e) {
                                    var t = {},
                                        n = e.result();
                                    return n.forEach(function (e) {
                                        var n = {
                                            id: e.id,
                                            timestamp: e.timestamp,
                                            type: e.type
                                        };
                                        e.names().forEach(function (t) {
                                            n[t] = e.stat(t)
                                        }), t[n.id] = n
                                    }), t
                                };
                                if (arguments.length >= 2) {
                                    var a = function (e) {
                                        r[1](o(e))
                                    };
                                    return i.apply(this, [a, arguments[0]])
                                }
                                return new Promise(function (t, a) {
                                    1 === r.length && null === e ? i.apply(n, [function (e) {
                                        t.apply(null, [o(e)])
                                    }, a]) : i.apply(n, [t, a])
                                })
                            }, r
                        }, window.RTCPeerConnection.prototype = webkitRTCPeerConnection.prototype, webkitRTCPeerConnection.generateCertificate && Object.defineProperty(window.RTCPeerConnection, "generateCertificate", {
                            get: function () {
                                return arguments.length ? webkitRTCPeerConnection.generateCertificate.apply(null, arguments) : webkitRTCPeerConnection.generateCertificate
                            }
                        }), ["createOffer", "createAnswer"].forEach(function (e) {
                            var t = webkitRTCPeerConnection.prototype[e];
                            webkitRTCPeerConnection.prototype[e] = function () {
                                var e = this;
                                if (arguments.length < 1 || 1 === arguments.length && "object" == typeof arguments[0]) {
                                    var n = 1 === arguments.length ? arguments[0] : void 0;
                                    return new Promise(function (r, i) {
                                        t.apply(e, [r, i, n])
                                    })
                                }
                                return t.apply(this, arguments)
                            }
                        }), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (e) {
                            var t = webkitRTCPeerConnection.prototype[e];
                            webkitRTCPeerConnection.prototype[e] = function () {
                                var e = arguments,
                                    n = this;
                                return new Promise(function (r, i) {
                                    t.apply(n, [e[0], function () {
                                        r(), e.length >= 2 && e[1].apply(null, [])
                                    }, function (t) {
                                        i(t), e.length >= 3 && e[2].apply(null, [t])
                                    }])
                                })
                            }
                        })
                    },
                    shimGetUserMedia: function () {
                        var e = function (e) {
                                if ("object" != typeof e || e.mandatory || e.optional) return e;
                                var t = {};
                                return Object.keys(e).forEach(function (n) {
                                    if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
                                        var r = "object" == typeof e[n] ? e[n] : {
                                            ideal: e[n]
                                        };
                                        void 0 !== r.exact && "number" == typeof r.exact && (r.min = r.max = r.exact);
                                        var i = function (e, t) {
                                            return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" : t
                                        };
                                        if (void 0 !== r.ideal) {
                                            t.optional = t.optional || [];
                                            var o = {};
                                            "number" == typeof r.ideal ? (o[i("min", n)] = r.ideal, t.optional.push(o), o = {}, o[i("max", n)] = r.ideal, t.optional.push(o)) : (o[i("", n)] = r.ideal, t.optional.push(o))
                                        }
                                        void 0 !== r.exact && "number" != typeof r.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[i("", n)] = r.exact) : ["min", "max"].forEach(function (e) {
                                            void 0 !== r[e] && (t.mandatory = t.mandatory || {}, t.mandatory[i(e, n)] = r[e])
                                        })
                                    }
                                }), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t
                            },
                            t = function (t, r, i) {
                                return t.audio && (t.audio = e(t.audio)), t.video && (t.video = e(t.video)), n("chrome: " + JSON.stringify(t)), navigator.webkitGetUserMedia(t, r, i)
                            };
                        navigator.getUserMedia = t;
                        var r = function (e) {
                            return new Promise(function (t, n) {
                                navigator.getUserMedia(e, t, n)
                            })
                        };
                        if (navigator.mediaDevices || (navigator.mediaDevices = {
                                getUserMedia: r,
                                enumerateDevices: function () {
                                    return new Promise(function (e) {
                                        var t = {
                                            audio: "audioinput",
                                            video: "videoinput"
                                        };
                                        return MediaStreamTrack.getSources(function (n) {
                                            e(n.map(function (e) {
                                                return {
                                                    label: e.label,
                                                    kind: t[e.kind],
                                                    deviceId: e.id,
                                                    groupId: ""
                                                }
                                            }))
                                        })
                                    })
                                }
                            }), navigator.mediaDevices.getUserMedia) {
                            var i = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                            navigator.mediaDevices.getUserMedia = function (t) {
                                return t && (n("spec:   " + JSON.stringify(t)), t.audio = e(t.audio), t.video = e(t.video), n("chrome: " + JSON.stringify(t))), i(t)
                            }.bind(this)
                        } else navigator.mediaDevices.getUserMedia = function (e) {
                            return r(e)
                        };
                        "undefined" == typeof navigator.mediaDevices.addEventListener && (navigator.mediaDevices.addEventListener = function () {
                            n("Dummy mediaDevices.addEventListener called.")
                        }), "undefined" == typeof navigator.mediaDevices.removeEventListener && (navigator.mediaDevices.removeEventListener = function () {
                            n("Dummy mediaDevices.removeEventListener called.")
                        })
                    },
                    attachMediaStream: function (e, t) {
                        n("DEPRECATED, attachMediaStream will soon be removed."), r.version >= 43 ? e.srcObject = t : "undefined" != typeof e.src ? e.src = URL.createObjectURL(t) : n("Error attaching stream to element.")
                    },
                    reattachMediaStream: function (e, t) {
                        n("DEPRECATED, reattachMediaStream will soon be removed."), r.version >= 43 ? e.srcObject = t.srcObject : e.src = t.src
                    }
                };
            t.exports = {
                shimOnTrack: i.shimOnTrack,
                shimSourceObject: i.shimSourceObject,
                shimPeerConnection: i.shimPeerConnection,
                shimGetUserMedia: i.shimGetUserMedia,
                attachMediaStream: i.attachMediaStream,
                reattachMediaStream: i.reattachMediaStream
            }
        }, {
            "../utils.js": 41
        }],
        43: [function (e, t) {
            "use strict";
            var n = e("./edge_sdp"),
                r = e("../utils").log;
            e("../utils").browserDetails;
            var i = {
                shimPeerConnection: function () {
                    window.RTCIceGatherer && (window.RTCIceCandidate || (window.RTCIceCandidate = function (e) {
                        return e
                    }), window.RTCSessionDescription || (window.RTCSessionDescription = function (e) {
                        return e
                    })), window.RTCPeerConnection = function (e) {
                        var t = this;
                        if (this.onicecandidate = null, this.onaddstream = null, this.onremovestream = null, this.onsignalingstatechange = null, this.oniceconnectionstatechange = null, this.onnegotiationneeded = null, this.ondatachannel = null, this.localStreams = [], this.remoteStreams = [], this.getLocalStreams = function () {
                                return t.localStreams
                            }, this.getRemoteStreams = function () {
                                return t.remoteStreams
                            }, this.localDescription = new RTCSessionDescription({
                                type: "",
                                sdp: ""
                            }), this.remoteDescription = new RTCSessionDescription({
                                type: "",
                                sdp: ""
                            }), this.signalingState = "stable", this.iceConnectionState = "new", this.iceOptions = {
                                gatherPolicy: "all",
                                iceServers: []
                            }, e && e.iceTransportPolicy) switch (e.iceTransportPolicy) {
                            case "all":
                            case "relay":
                                this.iceOptions.gatherPolicy = e.iceTransportPolicy;
                                break;
                            case "none":
                                throw new TypeError('iceTransportPolicy "none" not supported')
                        }
                        e && e.iceServers && (this.iceOptions.iceServers = e.iceServers.filter(function (e) {
                            return e && e.urls ? (e.urls = e.urls.filter(function (e) {
                                return -1 !== e.indexOf("transport=udp")
                            })[0], !0) : !1
                        })), this.transceivers = [], this._localIceCandidatesBuffer = []
                    }, window.RTCPeerConnection.prototype._emitBufferedCandidates = function () {
                        var e = this;
                        this._localIceCandidatesBuffer.forEach(function (t) {
                            null !== e.onicecandidate && e.onicecandidate(t)
                        }), this._localIceCandidatesBuffer = []
                    }, window.RTCPeerConnection.prototype.addStream = function (e) {
                        this.localStreams.push(e.clone()), this._maybeFireNegotiationNeeded()
                    }, window.RTCPeerConnection.prototype.removeStream = function (e) {
                        var t = this.localStreams.indexOf(e);
                        t > -1 && (this.localStreams.splice(t, 1), this._maybeFireNegotiationNeeded())
                    }, window.RTCPeerConnection.prototype._getCommonCapabilities = function (e, t) {
                        var n = {
                            codecs: [],
                            headerExtensions: [],
                            fecMechanisms: []
                        };
                        return e.codecs.forEach(function (e) {
                            for (var r = 0; r < t.codecs.length; r++) {
                                var i = t.codecs[r];
                                if (e.name.toLowerCase() === i.name.toLowerCase() && e.clockRate === i.clockRate && e.numChannels === i.numChannels) {
                                    n.codecs.push(i);
                                    break
                                }
                            }
                        }), e.headerExtensions.forEach(function (e) {
                            for (var r = 0; r < t.headerExtensions.length; r++) {
                                var i = t.headerExtensions[r];
                                if (e.uri === i.uri) {
                                    n.headerExtensions.push(i);
                                    break
                                }
                            }
                        }), n
                    }, window.RTCPeerConnection.prototype._createIceAndDtlsTransports = function (e, t) {
                        var r = this,
                            i = new RTCIceGatherer(r.iceOptions),
                            o = new RTCIceTransport(i);
                        i.onlocalcandidate = function (a) {
                            var s = {};
                            s.candidate = {
                                sdpMid: e,
                                sdpMLineIndex: t
                            };
                            var c = a.candidate;
                            c && 0 !== Object.keys(c).length ? (c.component = "RTCP" === o.component ? 2 : 1, s.candidate.candidate = n.writeCandidate(c)) : (void 0 === i.state && (i.state = "completed"), s.candidate.candidate = "candidate:1 1 udp 1 0.0.0.0 9 typ endOfCandidates");
                            var u = r.transceivers.every(function (e) {
                                return e.iceGatherer && "completed" === e.iceGatherer.state
                            });
                            null !== r.onicecandidate && (r.localDescription && "" === r.localDescription.type ? (r._localIceCandidatesBuffer.push(s), u && r._localIceCandidatesBuffer.push({})) : (r.onicecandidate(s), u && r.onicecandidate({})))
                        }, o.onicestatechange = function () {
                            r._updateConnectionState()
                        };
                        var a = new RTCDtlsTransport(o);
                        return a.ondtlsstatechange = function () {
                            r._updateConnectionState()
                        }, a.onerror = function () {
                            a.state = "failed", r._updateConnectionState()
                        }, {
                            iceGatherer: i,
                            iceTransport: o,
                            dtlsTransport: a
                        }
                    }, window.RTCPeerConnection.prototype._transceive = function (e, t, r) {
                        var i = this._getCommonCapabilities(e.localCapabilities, e.remoteCapabilities);
                        t && e.rtpSender && (i.encodings = [{
                            ssrc: e.sendSsrc
                        }], i.rtcp = {
                            cname: n.localCName,
                            ssrc: e.recvSsrc
                        }, e.rtpSender.send(i)), r && e.rtpReceiver && (i.encodings = [{
                            ssrc: e.recvSsrc
                        }], i.rtcp = {
                            cname: e.cname,
                            ssrc: e.sendSsrc
                        }, e.rtpReceiver.receive(i))
                    }, window.RTCPeerConnection.prototype.setLocalDescription = function (e) {
                        var t = this;
                        if ("offer" === e.type) this._pendingOffer && (this.transceivers = this._pendingOffer, delete this._pendingOffer);
                        else if ("answer" === e.type) {
                            var r = n.splitSections(t.remoteDescription.sdp),
                                i = r.shift();
                            r.forEach(function (e, r) {
                                var o = t.transceivers[r],
                                    a = o.iceGatherer,
                                    s = o.iceTransport,
                                    c = o.dtlsTransport,
                                    u = o.localCapabilities,
                                    p = o.remoteCapabilities,
                                    d = "0" === e.split("\n", 1)[0].split(" ", 2)[1];
                                if (!d) {
                                    var l = n.getIceParameters(e, i);
                                    s.start(a, l, "controlled");
                                    var f = n.getDtlsParameters(e, i);
                                    c.start(f);
                                    var h = t._getCommonCapabilities(u, p);
                                    t._transceive(o, h.codecs.length > 0, !1)
                                }
                            })
                        }
                        switch (this.localDescription = e, e.type) {
                            case "offer":
                                this._updateSignalingState("have-local-offer");
                                break;
                            case "answer":
                                this._updateSignalingState("stable");
                                break;
                            default:
                                throw new TypeError('unsupported type "' + e.type + '"')
                        }
                        var o = arguments.length > 1 && "function" == typeof arguments[1];
                        if (o) {
                            var a = arguments[1];
                            window.setTimeout(function () {
                                a(), t._emitBufferedCandidates()
                            }, 0)
                        }
                        var s = Promise.resolve();
                        return s.then(function () {
                            o || window.setTimeout(t._emitBufferedCandidates.bind(t), 0)
                        }), s
                    }, window.RTCPeerConnection.prototype.setRemoteDescription = function (e) {
                        var t = this,
                            r = new MediaStream,
                            i = n.splitSections(e.sdp),
                            o = i.shift();
                        switch (i.forEach(function (i, a) {
                            var s, c, u, p, d, l, f, h, m, g, v, y = n.splitLines(i),
                                b = y[0].substr(2).split(" "),
                                w = b[0],
                                C = "0" === b[1],
                                S = n.getDirection(i, o),
                                k = n.parseRtpParameters(i);
                            C || (g = n.getIceParameters(i, o), v = n.getDtlsParameters(i, o));
                            var T, R = n.matchPrefix(i, "a=mid:")[0].substr(6),
                                P = n.matchPrefix(i, "a=ssrc:").map(function (e) {
                                    return n.parseSsrcMedia(e)
                                }).filter(function (e) {
                                    return "cname" === e.attribute
                                })[0];
                            if (P && (h = parseInt(P.ssrc, 10), T = P.value), "offer" === e.type) {
                                var E = t._createIceAndDtlsTransports(R, a);
                                if (m = RTCRtpReceiver.getCapabilities(w), f = 1001 * (2 * a + 2), l = new RTCRtpReceiver(E.dtlsTransport, w), r.addTrack(l.track), t.localStreams.length > 0 && t.localStreams[0].getTracks().length >= a) {
                                    var x = t.localStreams[0].getTracks()[a];
                                    d = new RTCRtpSender(x, E.dtlsTransport)
                                }
                                t.transceivers[a] = {
                                    iceGatherer: E.iceGatherer,
                                    iceTransport: E.iceTransport,
                                    dtlsTransport: E.dtlsTransport,
                                    localCapabilities: m,
                                    remoteCapabilities: k,
                                    rtpSender: d,
                                    rtpReceiver: l,
                                    kind: w,
                                    mid: R,
                                    cname: T,
                                    sendSsrc: f,
                                    recvSsrc: h
                                }, t._transceive(t.transceivers[a], !1, "sendrecv" === S || "sendonly" === S)
                            } else "answer" !== e.type || C || (s = t.transceivers[a], c = s.iceGatherer, u = s.iceTransport, p = s.dtlsTransport, d = s.rtpSender, l = s.rtpReceiver, f = s.sendSsrc, m = s.localCapabilities, t.transceivers[a].recvSsrc = h, t.transceivers[a].remoteCapabilities = k, t.transceivers[a].cname = T, u.start(c, g, "controlling"), p.start(v), t._transceive(s, "sendrecv" === S || "recvonly" === S, "sendrecv" === S || "sendonly" === S), !l || "sendrecv" !== S && "sendonly" !== S ? delete s.rtpReceiver : r.addTrack(l.track))
                        }), this.remoteDescription = e, e.type) {
                            case "offer":
                                this._updateSignalingState("have-remote-offer");
                                break;
                            case "answer":
                                this._updateSignalingState("stable");
                                break;
                            default:
                                throw new TypeError('unsupported type "' + e.type + '"')
                        }
                        return window.setTimeout(function () {
                            null !== t.onaddstream && r.getTracks().length && (t.remoteStreams.push(r), window.setTimeout(function () {
                                t.onaddstream({
                                    stream: r
                                })
                            }, 0))
                        }, 0), arguments.length > 1 && "function" == typeof arguments[1] && window.setTimeout(arguments[1], 0), Promise.resolve()
                    }, window.RTCPeerConnection.prototype.close = function () {
                        this.transceivers.forEach(function (e) {
                            e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender && e.rtpSender.stop(), e.rtpReceiver && e.rtpReceiver.stop()
                        }), this._updateSignalingState("closed")
                    }, window.RTCPeerConnection.prototype._updateSignalingState = function (e) {
                        this.signalingState = e, null !== this.onsignalingstatechange && this.onsignalingstatechange()
                    }, window.RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function () {
                        null !== this.onnegotiationneeded && this.onnegotiationneeded()
                    }, window.RTCPeerConnection.prototype._updateConnectionState = function () {
                        var e, t = this,
                            n = {
                                "new": 0,
                                closed: 0,
                                connecting: 0,
                                checking: 0,
                                connected: 0,
                                completed: 0,
                                failed: 0
                            };
                        this.transceivers.forEach(function (e) {
                            n[e.iceTransport.state]++, n[e.dtlsTransport.state]++
                        }), n.connected += n.completed, e = "new", n.failed > 0 ? e = "failed" : n.connecting > 0 || n.checking > 0 ? e = "connecting" : n.disconnected > 0 ? e = "disconnected" : n["new"] > 0 ? e = "new" : (n.connecting > 0 || n.completed > 0) && (e = "connected"), e !== t.iceConnectionState && (t.iceConnectionState = e, null !== this.oniceconnectionstatechange && this.oniceconnectionstatechange())
                    }, window.RTCPeerConnection.prototype.createOffer = function () {
                        var e = this;
                        if (this._pendingOffer) throw new Error("createOffer called while there is a pending offer.");
                        var t;
                        1 === arguments.length && "function" != typeof arguments[0] ? t = arguments[0] : 3 === arguments.length && (t = arguments[2]);
                        var r = [],
                            i = 0,
                            o = 0;
                        if (this.localStreams.length && (i = this.localStreams[0].getAudioTracks().length, o = this.localStreams[0].getVideoTracks().length), t) {
                            if (t.mandatory || t.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
                            void 0 !== t.offerToReceiveAudio && (i = t.offerToReceiveAudio), void 0 !== t.offerToReceiveVideo && (o = t.offerToReceiveVideo)
                        }
                        for (this.localStreams.length && this.localStreams[0].getTracks().forEach(function (e) {
                                r.push({
                                    kind: e.kind,
                                    track: e,
                                    wantReceive: "audio" === e.kind ? i > 0 : o > 0
                                }), "audio" === e.kind ? i-- : "video" === e.kind && o--
                            }); i > 0 || o > 0;) i > 0 && (r.push({
                            kind: "audio",
                            wantReceive: !0
                        }), i--), o > 0 && (r.push({
                            kind: "video",
                            wantReceive: !0
                        }), o--);
                        var a = n.writeSessionBoilerplate(),
                            s = [];
                        r.forEach(function (t, r) {
                            var i, o, c = t.track,
                                u = t.kind,
                                p = n.generateIdentifier(),
                                d = e._createIceAndDtlsTransports(p, r),
                                l = RTCRtpSender.getCapabilities(u),
                                f = 1001 * (2 * r + 1);
                            c && (i = new RTCRtpSender(c, d.dtlsTransport)), t.wantReceive && (o = new RTCRtpReceiver(d.dtlsTransport, u)), s[r] = {
                                iceGatherer: d.iceGatherer,
                                iceTransport: d.iceTransport,
                                dtlsTransport: d.dtlsTransport,
                                localCapabilities: l,
                                remoteCapabilities: null,
                                rtpSender: i,
                                rtpReceiver: o,
                                kind: u,
                                mid: p,
                                sendSsrc: f,
                                recvSsrc: null
                            };
                            var h = s[r];
                            a += n.writeMediaSection(h, h.localCapabilities, "offer", e.localStreams[0])
                        }), this._pendingOffer = s;
                        var c = new RTCSessionDescription({
                            type: "offer",
                            sdp: a
                        });
                        return arguments.length && "function" == typeof arguments[0] && window.setTimeout(arguments[0], 0, c), Promise.resolve(c)
                    }, window.RTCPeerConnection.prototype.createAnswer = function () {
                        var e, t = this;
                        1 === arguments.length && "function" != typeof arguments[0] ? e = arguments[0] : 3 === arguments.length && (e = arguments[2]);
                        var r = n.writeSessionBoilerplate();
                        this.transceivers.forEach(function (e) {
                            var i = t._getCommonCapabilities(e.localCapabilities, e.remoteCapabilities);
                            r += n.writeMediaSection(e, i, "answer", t.localStreams[0])
                        });
                        var i = new RTCSessionDescription({
                            type: "answer",
                            sdp: r
                        });
                        return arguments.length && "function" == typeof arguments[0] && window.setTimeout(arguments[0], 0, i), Promise.resolve(i)
                    }, window.RTCPeerConnection.prototype.addIceCandidate = function (e) {
                        var t = e.sdpMLineIndex;
                        if (e.sdpMid)
                            for (var r = 0; r < this.transceivers.length; r++)
                                if (this.transceivers[r].mid === e.sdpMid) {
                                    t = r;
                                    break
                                }
                        var i = this.transceivers[t];
                        if (i) {
                            var o = Object.keys(e.candidate).length > 0 ? n.parseCandidate(e.candidate) : {};
                            if ("tcp" === o.protocol && 0 === o.port) return;
                            if ("1" !== o.component) return;
                            "endOfCandidates" === o.type && (o = {}), i.iceTransport.addRemoteCandidate(o)
                        }
                        return arguments.length > 1 && "function" == typeof arguments[1] && window.setTimeout(arguments[1], 0), Promise.resolve()
                    }, window.RTCPeerConnection.prototype.getStats = function () {
                        var e = [];
                        this.transceivers.forEach(function (t) {
                            ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function (n) {
                                t[n] && e.push(t[n].getStats())
                            })
                        });
                        var t = arguments.length > 1 && "function" == typeof arguments[1] && arguments[1];
                        return new Promise(function (n) {
                            var r = {};
                            Promise.all(e).then(function (e) {
                                e.forEach(function (e) {
                                    Object.keys(e).forEach(function (t) {
                                        r[t] = e[t]
                                    })
                                }), t && window.setTimeout(t, 0, r), n(r)
                            })
                        })
                    }
                },
                attachMediaStream: function (e, t) {
                    r("DEPRECATED, attachMediaStream will soon be removed."), e.srcObject = t
                },
                reattachMediaStream: function (e, t) {
                    r("DEPRECATED, reattachMediaStream will soon be removed."), e.srcObject = t.srcObject
                }
            };
            t.exports = {
                shimPeerConnection: i.shimPeerConnection,
                attachMediaStream: i.attachMediaStream,
                reattachMediaStream: i.reattachMediaStream
            }
        }, {
            "../utils": 41,
            "./edge_sdp": 66
        }],
        44: [function (e, t) {
            "use strict";
            var n = e("../utils").log,
                r = e("../utils").browserDetails,
                i = {
                    shimOnTrack: function () {
                        "object" != typeof window || !window.RTCPeerConnection || "ontrack" in window.RTCPeerConnection.prototype || Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", {
                            get: function () {
                                return this._ontrack
                            },
                            set: function (e) {
                                this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = e), this.addEventListener("addstream", this._ontrackpoly = function (e) {
                                    e.stream.getTracks().forEach(function (t) {
                                        var n = new Event("track");
                                        n.track = t, n.receiver = {
                                            track: t
                                        }, n.streams = [e.stream], this.dispatchEvent(n)
                                    }.bind(this))
                                }.bind(this))
                            }
                        })
                    },
                    shimSourceObject: function () {
                        "object" == typeof window && (!window.HTMLMediaElement || "srcObject" in window.HTMLMediaElement.prototype || Object.defineProperty(window.HTMLMediaElement.prototype, "srcObject", {
                            get: function () {
                                return this.mozSrcObject
                            },
                            set: function (e) {
                                this.mozSrcObject = e
                            }
                        }))
                    },
                    shimPeerConnection: function () {
                        window.RTCPeerConnection || (window.RTCPeerConnection = function (e, t) {
                            if (r.version < 38 && e && e.iceServers) {
                                for (var n = [], i = 0; i < e.iceServers.length; i++) {
                                    var o = e.iceServers[i];
                                    if (o.hasOwnProperty("urls"))
                                        for (var a = 0; a < o.urls.length; a++) {
                                            var s = {
                                                url: o.urls[a]
                                            };
                                            0 === o.urls[a].indexOf("turn") && (s.username = o.username, s.credential = o.credential), n.push(s)
                                        } else n.push(e.iceServers[i])
                                }
                                e.iceServers = n
                            }
                            return new mozRTCPeerConnection(e, t)
                        }, window.RTCPeerConnection.prototype = mozRTCPeerConnection.prototype, mozRTCPeerConnection.generateCertificate && Object.defineProperty(window.RTCPeerConnection, "generateCertificate", {
                            get: function () {
                                return arguments.length ? mozRTCPeerConnection.generateCertificate.apply(null, arguments) : mozRTCPeerConnection.generateCertificate
                            }
                        }), window.RTCSessionDescription = mozRTCSessionDescription, window.RTCIceCandidate = mozRTCIceCandidate)
                    },
                    shimGetUserMedia: function () {
                        var e = function (e, t, i) {
                            var o = function (e) {
                                if ("object" != typeof e || e.require) return e;
                                var t = [];
                                return Object.keys(e).forEach(function (n) {
                                    if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
                                        var r = e[n] = "object" == typeof e[n] ? e[n] : {
                                            ideal: e[n]
                                        };
                                        if ((void 0 !== r.min || void 0 !== r.max || void 0 !== r.exact) && t.push(n), void 0 !== r.exact && ("number" == typeof r.exact ? r.min = r.max = r.exact : e[n] = r.exact, delete r.exact), void 0 !== r.ideal) {
                                            e.advanced = e.advanced || [];
                                            var i = {};
                                            i[n] = "number" == typeof r.ideal ? {
                                                min: r.ideal,
                                                max: r.ideal
                                            } : r.ideal, e.advanced.push(i), delete r.ideal, Object.keys(r).length || delete e[n]
                                        }
                                    }
                                }), t.length && (e.require = t), e
                            };
                            return r.version < 38 && (n("spec: " + JSON.stringify(e)), e.audio && (e.audio = o(e.audio)), e.video && (e.video = o(e.video)), n("ff37: " + JSON.stringify(e))), navigator.mozGetUserMedia(e, t, i)
                        };
                        navigator.getUserMedia = e;
                        var t = function (e) {
                            return new Promise(function (t, n) {
                                navigator.getUserMedia(e, t, n)
                            })
                        };
                        if (navigator.mediaDevices || (navigator.mediaDevices = {
                                getUserMedia: t,
                                addEventListener: function () {},
                                removeEventListener: function () {}
                            }), navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function () {
                                return new Promise(function (e) {
                                    var t = [{
                                        kind: "audioinput",
                                        deviceId: "default",
                                        label: "",
                                        groupId: ""
                                    }, {
                                        kind: "videoinput",
                                        deviceId: "default",
                                        label: "",
                                        groupId: ""
                                    }];
                                    e(t)
                                })
                            }, r.version < 41) {
                            var i = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
                            navigator.mediaDevices.enumerateDevices = function () {
                                return i().then(void 0, function (e) {
                                    if ("NotFoundError" === e.name) return [];
                                    throw e
                                })
                            }
                        }
                    },
                    attachMediaStream: function (e, t) {
                        n("DEPRECATED, attachMediaStream will soon be removed."), e.srcObject = t
                    },
                    reattachMediaStream: function (e, t) {
                        n("DEPRECATED, reattachMediaStream will soon be removed."), e.srcObject = t.srcObject
                    }
                };
            t.exports = {
                shimOnTrack: i.shimOnTrack,
                shimSourceObject: i.shimSourceObject,
                shimPeerConnection: i.shimPeerConnection,
                shimGetUserMedia: i.shimGetUserMedia,
                attachMediaStream: i.attachMediaStream,
                reattachMediaStream: i.reattachMediaStream
            }
        }, {
            "../utils": 41
        }],
        67: [function (e, t) {
            t.exports = Array.isArray || function (e) {
                return "[object Array]" == Object.prototype.toString.call(e)
            }
        }, {}],
        68: [function (t, n, r) {
            ! function (t) {
                function n(e) {
                    if (n[e] !== a) return n[e];
                    var t;
                    if ("bug-string-char-index" == e) t = "a" != "a" [0];
                    else if ("json" == e) t = n("json-stringify") && n("json-parse");
                    else {
                        var r, i = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                        if ("json-stringify" == e) {
                            var o = p.stringify,
                                c = "function" == typeof o && d;
                            if (c) {
                                (r = function () {
                                    return 1
                                }).toJSON = r;
                                try {
                                    c = "0" === o(0) && "0" === o(new Number) && '""' == o(new String) && o(s) === a && o(a) === a && o() === a && "1" === o(r) && "[1]" == o([r]) && "[null]" == o([a]) && "null" == o(null) && "[null,null,null]" == o([a, s, null]) && o({
                                        a: [r, !0, !1, null, "\0\b\n\f\r	"]
                                    }) == i && "1" === o(null, r) && "[\n 1,\n 2\n]" == o([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == o(new Date(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == o(new Date(864e13)) && '"-000001-01-01T00:00:00.000Z"' == o(new Date(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == o(new Date(-1))
                                } catch (u) {
                                    c = !1
                                }
                            }
                            t = c
                        }
                        if ("json-parse" == e) {
                            var l = p.parse;
                            if ("function" == typeof l) try {
                                if (0 === l("0") && !l(!1)) {
                                    r = l(i);
                                    var f = 5 == r.a.length && 1 === r.a[0];
                                    if (f) {
                                        try {
                                            f = !l('"	"')
                                        } catch (u) {}
                                        if (f) try {
                                            f = 1 !== l("01")
                                        } catch (u) {}
                                        if (f) try {
                                            f = 1 !== l("1.")
                                        } catch (u) {}
                                    }
                                }
                            } catch (u) {
                                f = !1
                            }
                            t = f
                        }
                    }
                    return n[e] = !!t
                }
                var i, o, a, s = {}.toString,
                    c = "function" == typeof e && e.amd,
                    u = "object" == typeof JSON && JSON,
                    p = "object" == typeof r && r && !r.nodeType && r;
                p && u ? (p.stringify = u.stringify, p.parse = u.parse) : p = t.JSON = u || {};
                var d = new Date(-0xc782b5b800cec);
                try {
                    d = -109252 == d.getUTCFullYear() && 0 === d.getUTCMonth() && 1 === d.getUTCDate() && 10 == d.getUTCHours() && 37 == d.getUTCMinutes() && 6 == d.getUTCSeconds() && 708 == d.getUTCMilliseconds()
                } catch (l) {}
                if (!n("json")) {
                    var f = "[object Function]",
                        h = "[object Date]",
                        m = "[object Number]",
                        g = "[object String]",
                        v = "[object Array]",
                        y = "[object Boolean]",
                        b = n("bug-string-char-index");
                    if (!d) var w = Math.floor,
                        C = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                        S = function (e, t) {
                            return C[t] + 365 * (e - 1970) + w((e - 1969 + (t = +(t > 1))) / 4) - w((e - 1901 + t) / 100) + w((e - 1601 + t) / 400)
                        };
                    (i = {}.hasOwnProperty) || (i = function (e) {
                        var t, n = {};
                        return (n.__proto__ = null, n.__proto__ = {
                            toString: 1
                        }, n).toString != s ? i = function (e) {
                            var t = this.__proto__,
                                n = (this.__proto__ = null, e in this);
                            return this.__proto__ = t, n
                        } : (t = n.constructor, i = function (e) {
                            var n = (this.constructor || t).prototype;
                            return e in this && !(e in n && this[e] === n[e])
                        }), n = null, i.call(this, e)
                    });
                    var k = {
                            "boolean": 1,
                            number: 1,
                            string: 1,
                            undefined: 1
                        },
                        T = function (e, t) {
                            var n = typeof e[t];
                            return "object" == n ? !!e[t] : !k[n]
                        };
                    if (o = function (e, t) {
                            var n, r, a, c = 0;
                            (n = function () {
                                this.valueOf = 0
                            }).prototype.valueOf = 0, r = new n;
                            for (a in r) i.call(r, a) && c++;
                            return n = r = null, c ? o = 2 == c ? function (e, t) {
                                var n, r = {},
                                    o = s.call(e) == f;
                                for (n in e) o && "prototype" == n || i.call(r, n) || !(r[n] = 1) || !i.call(e, n) || t(n)
                            } : function (e, t) {
                                var n, r, o = s.call(e) == f;
                                for (n in e) o && "prototype" == n || !i.call(e, n) || (r = "constructor" === n) || t(n);
                                (r || i.call(e, n = "constructor")) && t(n)
                            } : (r = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], o = function (e, t) {
                                var n, o, a = s.call(e) == f,
                                    c = !a && "function" != typeof e.constructor && T(e, "hasOwnProperty") ? e.hasOwnProperty : i;
                                for (n in e) a && "prototype" == n || !c.call(e, n) || t(n);
                                for (o = r.length; n = r[--o]; c.call(e, n) && t(n));
                            }), o(e, t)
                        }, !n("json-stringify")) {
                        var R = {
                                92: "\\\\",
                                34: '\\"',
                                8: "\\b",
                                12: "\\f",
                                10: "\\n",
                                13: "\\r",
                                9: "\\t"
                            },
                            P = "000000",
                            E = function (e, t) {
                                return (P + (t || 0)).slice(-e)
                            },
                            x = "\\u00",
                            O = function (e) {
                                var t, n = '"',
                                    r = 0,
                                    i = e.length,
                                    o = i > 10 && b;
                                for (o && (t = e.split("")); i > r; r++) {
                                    var a = e.charCodeAt(r);
                                    switch (a) {
                                        case 8:
                                        case 9:
                                        case 10:
                                        case 12:
                                        case 13:
                                        case 34:
                                        case 92:
                                            n += R[a];
                                            break;
                                        default:
                                            if (32 > a) {
                                                n += x + E(2, a.toString(16));
                                                break
                                            }
                                            n += o ? t[r] : b ? e.charAt(r) : e[r]
                                    }
                                }
                                return n + '"'
                            },
                            j = function (e, t, n, r, c, u, p) {
                                var d, l, f, b, C, k, T, R, P, x, D, _, M, A, L, I;
                                try {
                                    d = t[e]
                                } catch (N) {}
                                if ("object" == typeof d && d)
                                    if (l = s.call(d), l != h || i.call(d, "toJSON")) "function" == typeof d.toJSON && (l != m && l != g && l != v || i.call(d, "toJSON")) && (d = d.toJSON(e));
                                    else if (d > -1 / 0 && 1 / 0 > d) {
                                    if (S) {
                                        for (C = w(d / 864e5), f = w(C / 365.2425) + 1970 - 1; S(f + 1, 0) <= C; f++);
                                        for (b = w((C - S(f, 0)) / 30.42); S(f, b + 1) <= C; b++);
                                        C = 1 + C - S(f, b), k = (d % 864e5 + 864e5) % 864e5, T = w(k / 36e5) % 24, R = w(k / 6e4) % 60, P = w(k / 1e3) % 60, x = k % 1e3
                                    } else f = d.getUTCFullYear(), b = d.getUTCMonth(), C = d.getUTCDate(), T = d.getUTCHours(), R = d.getUTCMinutes(), P = d.getUTCSeconds(), x = d.getUTCMilliseconds();
                                    d = (0 >= f || f >= 1e4 ? (0 > f ? "-" : "+") + E(6, 0 > f ? -f : f) : E(4, f)) + "-" + E(2, b + 1) + "-" + E(2, C) + "T" + E(2, T) + ":" + E(2, R) + ":" + E(2, P) + "." + E(3, x) + "Z"
                                } else d = null;
                                if (n && (d = n.call(t, e, d)), null === d) return "null";
                                if (l = s.call(d), l == y) return "" + d;
                                if (l == m) return d > -1 / 0 && 1 / 0 > d ? "" + d : "null";
                                if (l == g) return O("" + d);
                                if ("object" == typeof d) {
                                    for (A = p.length; A--;)
                                        if (p[A] === d) throw TypeError();
                                    if (p.push(d), D = [], L = u, u += c, l == v) {
                                        for (M = 0, A = d.length; A > M; M++) _ = j(M, d, n, r, c, u, p), D.push(_ === a ? "null" : _);
                                        I = D.length ? c ? "[\n" + u + D.join(",\n" + u) + "\n" + L + "]" : "[" + D.join(",") + "]" : "[]"
                                    } else o(r || d, function (e) {
                                        var t = j(e, d, n, r, c, u, p);
                                        t !== a && D.push(O(e) + ":" + (c ? " " : "") + t)
                                    }), I = D.length ? c ? "{\n" + u + D.join(",\n" + u) + "\n" + L + "}" : "{" + D.join(",") + "}" : "{}";
                                    return p.pop(), I
                                }
                            };
                        p.stringify = function (e, t, n) {
                            var r, i, o, a;
                            if ("function" == typeof t || "object" == typeof t && t)
                                if ((a = s.call(t)) == f) i = t;
                                else if (a == v) {
                                o = {};
                                for (var c, u = 0, p = t.length; p > u; c = t[u++], a = s.call(c), (a == g || a == m) && (o[c] = 1));
                            }
                            if (n)
                                if ((a = s.call(n)) == m) {
                                    if ((n -= n % 1) > 0)
                                        for (r = "", n > 10 && (n = 10); r.length < n; r += " ");
                                } else a == g && (r = n.length <= 10 ? n : n.slice(0, 10));
                            return j("", (c = {}, c[""] = e, c), i, o, r, "", [])
                        }
                    }
                    if (!n("json-parse")) {
                        var D, _, M = String.fromCharCode,
                            A = {
                                92: "\\",
                                34: '"',
                                47: "/",
                                98: "\b",
                                116: "	",
                                110: "\n",
                                102: "\f",
                                114: "\r"
                            },
                            L = function () {
                                throw D = _ = null, SyntaxError()
                            },
                            I = function () {
                                for (var e, t, n, r, i, o = _, a = o.length; a > D;) switch (i = o.charCodeAt(D)) {
                                    case 9:
                                    case 10:
                                    case 13:
                                    case 32:
                                        D++;
                                        break;
                                    case 123:
                                    case 125:
                                    case 91:
                                    case 93:
                                    case 58:
                                    case 44:
                                        return e = b ? o.charAt(D) : o[D], D++, e;
                                    case 34:
                                        for (e = "@", D++; a > D;)
                                            if (i = o.charCodeAt(D), 32 > i) L();
                                            else if (92 == i) switch (i = o.charCodeAt(++D)) {
                                            case 92:
                                            case 34:
                                            case 47:
                                            case 98:
                                            case 116:
                                            case 110:
                                            case 102:
                                            case 114:
                                                e += A[i], D++;
                                                break;
                                            case 117:
                                                for (t = ++D, n = D + 4; n > D; D++) i = o.charCodeAt(D), i >= 48 && 57 >= i || i >= 97 && 102 >= i || i >= 65 && 70 >= i || L();
                                                e += M("0x" + o.slice(t, D));
                                                break;
                                            default:
                                                L()
                                        } else {
                                            if (34 == i) break;
                                            for (i = o.charCodeAt(D), t = D; i >= 32 && 92 != i && 34 != i;) i = o.charCodeAt(++D);
                                            e += o.slice(t, D)
                                        }
                                        if (34 == o.charCodeAt(D)) return D++, e;
                                        L();
                                    default:
                                        if (t = D, 45 == i && (r = !0, i = o.charCodeAt(++D)), i >= 48 && 57 >= i) {
                                            for (48 == i && (i = o.charCodeAt(D + 1), i >= 48 && 57 >= i) && L(), r = !1; a > D && (i = o.charCodeAt(D), i >= 48 && 57 >= i); D++);
                                            if (46 == o.charCodeAt(D)) {
                                                for (n = ++D; a > n && (i = o.charCodeAt(n), i >= 48 && 57 >= i); n++);
                                                n == D && L(), D = n
                                            }
                                            if (i = o.charCodeAt(D), 101 == i || 69 == i) {
                                                for (i = o.charCodeAt(++D), (43 == i || 45 == i) && D++, n = D; a > n && (i = o.charCodeAt(n), i >= 48 && 57 >= i); n++);
                                                n == D && L(), D = n
                                            }
                                            return +o.slice(t, D)
                                        }
                                        if (r && L(), "true" == o.slice(D, D + 4)) return D += 4, !0;
                                        if ("false" == o.slice(D, D + 5)) return D += 5, !1;
                                        if ("null" == o.slice(D, D + 4)) return D += 4, null;
                                        L()
                                }
                                return "$"
                            },
                            N = function (e) {
                                var t, n;
                                if ("$" == e && L(), "string" == typeof e) {
                                    if ("@" == (b ? e.charAt(0) : e[0])) return e.slice(1);
                                    if ("[" == e) {
                                        for (t = []; e = I(), "]" != e; n || (n = !0)) n && ("," == e ? (e = I(), "]" == e && L()) : L()), "," == e && L(), t.push(N(e));
                                        return t
                                    }
                                    if ("{" == e) {
                                        for (t = {}; e = I(), "}" != e; n || (n = !0)) n && ("," == e ? (e = I(), "}" == e && L()) : L()), ("," == e || "string" != typeof e || "@" != (b ? e.charAt(0) : e[0]) || ":" != I()) && L(), t[e.slice(1)] = N(I());
                                        return t
                                    }
                                    L()
                                }
                                return e
                            },
                            B = function (e, t, n) {
                                var r = U(e, t, n);
                                r === a ? delete e[t] : e[t] = r
                            },
                            U = function (e, t, n) {
                                var r, i = e[t];
                                if ("object" == typeof i && i)
                                    if (s.call(i) == v)
                                        for (r = i.length; r--;) B(i, r, n);
                                    else o(i, function (e) {
                                        B(i, e, n)
                                    });
                                return n.call(e, t, i)
                            };
                        p.parse = function (e, t) {
                            var n, r;
                            return D = 0, _ = "" + e, n = N(I()), "$" != I() && L(), D = _ = null, t && s.call(t) == f ? U((r = {}, r[""] = n, r), "", t) : n
                        }
                    }
                }
                c && e(function () {
                    return p
                })
            }(this)
        }, {}],
        35: [function (e, t, n) {
            function r() {}

            function i(e) {
                var t = "",
                    r = !1;
                return t += e.type, (n.BINARY_EVENT == e.type || n.BINARY_ACK == e.type) && (t += e.attachments, t += "-"), e.nsp && "/" != e.nsp && (r = !0, t += e.nsp), null != e.id && (r && (t += ",", r = !1), t += e.id), null != e.data && (r && (t += ","), t += d.stringify(e.data)), p("encoded %j as %s", e, t), t
            }

            function o(e, t) {
                function n(e) {
                    var n = f.deconstructPacket(e),
                        r = i(n.packet),
                        o = n.buffers;
                    o.unshift(r), t(o)
                }
                f.removeBlobs(e, n)
            }

            function a() {
                this.reconstructor = null
            }

            function s(e) {
                var t = {},
                    r = 0;
                if (t.type = Number(e.charAt(0)), null == n.types[t.type]) return u();
                if (n.BINARY_EVENT == t.type || n.BINARY_ACK == t.type) {
                    for (var i = "";
                        "-" != e.charAt(++r) && (i += e.charAt(r), r != e.length););
                    if (i != Number(i) || "-" != e.charAt(r)) throw new Error("Illegal attachments");
                    t.attachments = Number(i)
                }
                if ("/" == e.charAt(r + 1))
                    for (t.nsp = ""; ++r;) {
                        var o = e.charAt(r);
                        if ("," == o) break;
                        if (t.nsp += o, r == e.length) break
                    } else t.nsp = "/";
                var a = e.charAt(r + 1);
                if ("" !== a && Number(a) == a) {
                    for (t.id = ""; ++r;) {
                        var o = e.charAt(r);
                        if (null == o || Number(o) != o) {
                            --r;
                            break
                        }
                        if (t.id += e.charAt(r), r == e.length) break
                    }
                    t.id = Number(t.id)
                }
                if (e.charAt(++r)) try {
                    t.data = d.parse(e.substr(r))
                } catch (s) {
                    return u()
                }
                return p("decoded %s as %j", e, t), t
            }

            function c(e) {
                this.reconPack = e, this.buffers = []
            }

            function u() {
                return {
                    type: n.ERROR,
                    data: "parser error"
                }
            }
            var p = e("debug")("socket.io-parser"),
                d = e("json3");
            e("isarray");
            var l = e("component-emitter"),
                f = e("./binary"),
                h = e("./is-buffer");
            n.protocol = 4, n.types = ["CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR"], n.CONNECT = 0, n.DISCONNECT = 1, n.EVENT = 2, n.ACK = 3, n.ERROR = 4, n.BINARY_EVENT = 5, n.BINARY_ACK = 6, n.Encoder = r, n.Decoder = a, r.prototype.encode = function (e, t) {
                if (p("encoding packet %j", e), n.BINARY_EVENT == e.type || n.BINARY_ACK == e.type) o(e, t);
                else {
                    var r = i(e);
                    t([r])
                }
            }, l(a.prototype), a.prototype.add = function (e) {
                var t;
                if ("string" == typeof e) t = s(e), n.BINARY_EVENT == t.type || n.BINARY_ACK == t.type ? (this.reconstructor = new c(t), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", t)) : this.emit("decoded", t);
                else {
                    if (!h(e) && !e.base64) throw new Error("Unknown type: " + e);
                    if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                    t = this.reconstructor.takeBinaryData(e), t && (this.reconstructor = null, this.emit("decoded", t))
                }
            }, a.prototype.destroy = function () {
                this.reconstructor && this.reconstructor.finishedReconstruction()
            }, c.prototype.takeBinaryData = function (e) {
                if (this.buffers.push(e), this.buffers.length == this.reconPack.attachments) {
                    var t = f.reconstructPacket(this.reconPack, this.buffers);
                    return this.finishedReconstruction(), t
                }
                return null
            }, c.prototype.finishedReconstruction = function () {
                this.reconPack = null, this.buffers = []
            }
        }, {
            "./binary": 69,
            "./is-buffer": 65,
            "component-emitter": 56,
            debug: 34,
            isarray: 67,
            json3: 68
        }],
        66: [function (e, t) {
            "use strict";
            var n = {};
            n.generateIdentifier = function () {
                return Math.random().toString(36).substr(2, 10)
            }, n.localCName = n.generateIdentifier(), n.splitLines = function (e) {
                return e.trim().split("\n").map(function (e) {
                    return e.trim()
                })
            }, n.splitSections = function (e) {
                var t = e.split("\r\nm=");
                return t.map(function (e, t) {
                    return (t > 0 ? "m=" + e : e).trim() + "\r\n"
                })
            }, n.matchPrefix = function (e, t) {
                return n.splitLines(e).filter(function (e) {
                    return 0 === e.indexOf(t)
                })
            }, n.parseCandidate = function (e) {
                var t;
                t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" ");
                for (var n = {
                        foundation: t[0],
                        component: t[1],
                        protocol: t[2].toLowerCase(),
                        priority: parseInt(t[3], 10),
                        ip: t[4],
                        port: parseInt(t[5], 10),
                        type: t[7]
                    }, r = 8; r < t.length; r += 2) switch (t[r]) {
                    case "raddr":
                        n.relatedAddress = t[r + 1];
                        break;
                    case "rport":
                        n.relatedPort = parseInt(t[r + 1], 10);
                        break;
                    case "tcptype":
                        n.tcpType = t[r + 1]
                }
                return n
            }, n.writeCandidate = function (e) {
                var t = [];
                t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.ip), t.push(e.port);
                var n = e.type;
                return t.push("typ"), t.push(n), "host" !== n && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), "candidate:" + t.join(" ")
            }, n.parseRtpMap = function (e) {
                var t = e.substr(9).split(" "),
                    n = {
                        payloadType: parseInt(t.shift(), 10)
                    };
                return t = t[0].split("/"), n.name = t[0], n.clockRate = parseInt(t[1], 10), n.numChannels = 3 === t.length ? parseInt(t[2], 10) : 1, n
            }, n.writeRtpMap = function (e) {
                var t = e.payloadType;
                return void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType), "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== e.numChannels ? "/" + e.numChannels : "") + "\r\n"
            }, n.parseFmtp = function (e) {
                for (var t, n = {}, r = e.substr(e.indexOf(" ") + 1).split(";"), i = 0; i < r.length; i++) t = r[i].trim().split("="), n[t[0].trim()] = t[1];
                return n
            }, n.writeFtmp = function (e) {
                var t = "",
                    n = e.payloadType;
                if (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.parameters && e.parameters.length) {
                    var r = [];
                    Object.keys(e.parameters).forEach(function (t) {
                        r.push(t + "=" + e.parameters[t])
                    }), t += "a=fmtp:" + n + " " + r.join(";") + "\r\n"
                }
                return t
            }, n.parseRtcpFb = function (e) {
                var t = e.substr(e.indexOf(" ") + 1).split(" ");
                return {
                    type: t.shift(),
                    parameter: t.join(" ")
                }
            }, n.writeRtcpFb = function (e) {
                var t = "",
                    n = e.payloadType;
                return void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function (e) {
                    t += "a=rtcp-fb:" + n + " " + e.type + " " + e.parameter + "\r\n"
                }), t
            }, n.parseSsrcMedia = function (e) {
                var t = e.indexOf(" "),
                    n = {
                        ssrc: e.substr(7, t - 7)
                    },
                    r = e.indexOf(":", t);
                return r > -1 ? (n.attribute = e.substr(t + 1, r - t - 1), n.value = e.substr(r + 1)) : n.attribute = e.substr(t + 1), n
            }, n.getDtlsParameters = function (e, t) {
                var r = n.splitLines(e);
                r = r.concat(n.splitLines(t));
                var i = r.filter(function (e) {
                        return 0 === e.indexOf("a=fingerprint:")
                    })[0].substr(14),
                    o = {
                        role: "auto",
                        fingerprints: [{
                            algorithm: i.split(" ")[0],
                            value: i.split(" ")[1]
                        }]
                    };
                return o
            }, n.writeDtlsParameters = function (e, t) {
                var n = "a=setup:" + t + "\r\n";
                return e.fingerprints.forEach(function (e) {
                    n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
                }), n
            }, n.getIceParameters = function (e, t) {
                var r = n.splitLines(e);
                r = r.concat(n.splitLines(t));
                var i = {
                    usernameFragment: r.filter(function (e) {
                        return 0 === e.indexOf("a=ice-ufrag:")
                    })[0].substr(12),
                    password: r.filter(function (e) {
                        return 0 === e.indexOf("a=ice-pwd:")
                    })[0].substr(10)
                };
                return i
            }, n.writeIceParameters = function (e) {
                return "a=ice-ufrag:" + e.usernameFragment + "\r\n" + "a=ice-pwd:" + e.password + "\r\n"
            }, n.parseRtpParameters = function (e) {
                for (var t = {
                        codecs: [],
                        headerExtensions: [],
                        fecMechanisms: [],
                        rtcp: []
                    }, r = n.splitLines(e), i = r[0].split(" "), o = 3; o < i.length; o++) {
                    var a = i[o],
                        s = n.matchPrefix(e, "a=rtpmap:" + a + " ")[0];
                    if (s) {
                        var c = n.parseRtpMap(s),
                            u = n.matchPrefix(e, "a=fmtp:" + a + " ");
                        c.parameters = u.length ? n.parseFmtp(u[0]) : {}, c.rtcpFeedback = n.matchPrefix(e, "a=rtcp-fb:" + a + " ").map(n.parseRtcpFb), t.codecs.push(c)
                    }
                }
                return t
            }, n.writeRtpDescription = function (e, t) {
                var r = "";
                return r += "m=" + e + " ", r += t.codecs.length > 0 ? "9" : "0", r += " UDP/TLS/RTP/SAVPF ", r += t.codecs.map(function (e) {
                    return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType
                }).join(" ") + "\r\n", r += "c=IN IP4 0.0.0.0\r\n", r += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function (e) {
                    r += n.writeRtpMap(e), r += n.writeFtmp(e), r += n.writeRtcpFb(e)
                }), r += "a=rtcp-mux\r\n"
            }, n.writeSessionBoilerplate = function () {
                return "v=0\r\no=thisisadapterortc 8169639915646943137 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
            }, n.writeMediaSection = function (e, t, r, i) {
                var o = n.writeRtpDescription(e.kind, t);
                if (o += n.writeIceParameters(e.iceGatherer.getLocalParameters()), o += n.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === r ? "actpass" : "active"), o += "a=mid:" + e.mid + "\r\n", o += e.rtpSender && e.rtpReceiver ? "a=sendrecv\r\n" : e.rtpSender ? "a=sendonly\r\n" : e.rtpReceiver ? "a=recvonly\r\n" : "a=inactive\r\n", e.rtpSender) {
                    var a = "msid:" + i.id + " " + e.rtpSender.track.id + "\r\n";
                    o += "a=" + a, o += "a=ssrc:" + e.sendSsrc + " " + a
                }
                return o += "a=ssrc:" + e.sendSsrc + " cname:" + n.localCName + "\r\n"
            }, n.getDirection = function (e, t) {
                for (var r = n.splitLines(e), i = 0; i < r.length; i++) switch (r[i]) {
                    case "a=sendrecv":
                    case "a=sendonly":
                    case "a=recvonly":
                    case "a=inactive":
                        return r[i].substr(2)
                }
                return t ? n.getDirection(t) : "sendrecv"
            }, t.exports = n
        }, {}],
        46: [function (e, t) {
            function n(e, t) {
                return l(e, t, u)
            }

            function r(e) {
                return function (t) {
                    return null == t ? void 0 : t[e]
                }
            }

            function i(e, t) {
                return function (n, r) {
                    var i = n ? f(n) : 0;
                    if (!a(i)) return e(n, r);
                    for (var o = t ? i : -1, c = s(n);
                        (t ? o-- : ++o < i) && r(c[o], o, c) !== !1;);
                    return n
                }
            }

            function o(e) {
                return function (t, n, r) {
                    for (var i = s(t), o = r(t), a = o.length, c = e ? a : -1; e ? c-- : ++c < a;) {
                        var u = o[c];
                        if (n(i[u], u, i) === !1) break
                    }
                    return t
                }
            }

            function a(e) {
                return "number" == typeof e && e > -1 && 0 == e % 1 && p >= e
            }

            function s(e) {
                return c(e) ? e : Object(e)
            }

            function c(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }
            var u = e("lodash.keys"),
                p = 9007199254740991,
                d = i(n),
                l = o(),
                f = r("length");
            t.exports = d
        }, {
            "lodash.keys": 70
        }],
        57: [function (e, t) {
            t.exports = e("./lib/")
        }, {
            "./lib/": 71
        }],
        69: [function (e, t, n) {
            var r = self,
                i = e("isarray"),
                o = e("./is-buffer");
            n.deconstructPacket = function (e) {
                function t(e) {
                    if (!e) return e;
                    if (o(e)) {
                        var r = {
                            _placeholder: !0,
                            num: n.length
                        };
                        return n.push(e), r
                    }
                    if (i(e)) {
                        for (var a = new Array(e.length), s = 0; s < e.length; s++) a[s] = t(e[s]);
                        return a
                    }
                    if ("object" == typeof e && !(e instanceof Date)) {
                        var a = {};
                        for (var c in e) a[c] = t(e[c]);
                        return a
                    }
                    return e
                }
                var n = [],
                    r = e.data,
                    a = e;
                return a.data = t(r), a.attachments = n.length, {
                    packet: a,
                    buffers: n
                }
            }, n.reconstructPacket = function (e, t) {
                function n(e) {
                    if (e && e._placeholder) {
                        var r = t[e.num];
                        return r
                    }
                    if (i(e)) {
                        for (var o = 0; o < e.length; o++) e[o] = n(e[o]);
                        return e
                    }
                    if (e && "object" == typeof e) {
                        for (var a in e) e[a] = n(e[a]);
                        return e
                    }
                    return e
                }
                return e.data = n(e.data), e.attachments = void 0, e
            }, n.removeBlobs = function (e, t) {
                function n(e, c, u) {
                    if (!e) return e;
                    if (r.Blob && e instanceof Blob || r.File && e instanceof File) {
                        a++;
                        var p = new FileReader;
                        p.onload = function () {
                            u ? u[c] = this.result : s = this.result, --a || t(s)
                        }, p.readAsArrayBuffer(e)
                    } else if (i(e))
                        for (var d = 0; d < e.length; d++) n(e[d], d, e);
                    else if (e && "object" == typeof e && !o(e))
                        for (var l in e) n(e[l], l, e)
                }
                var a = 0,
                    s = e;
                n(s), a || t(s)
            }
        }, {
            "./is-buffer": 65,
            isarray: 67
        }],
        72: [function (e, t) {
            function n(e, t) {
                for (var n = -1, r = e.length, i = Array(r); ++n < r;) i[n] = t(e[n], n, e);
                return i
            }
            t.exports = n
        }, {}],
        63: [function (e, t) {
            function n(e) {
                function t(e) {
                    if (!e) return !1;
                    if (r.Buffer && r.Buffer.isBuffer(e) || r.ArrayBuffer && e instanceof ArrayBuffer || r.Blob && e instanceof Blob || r.File && e instanceof File) return !0;
                    if (i(e)) {
                        for (var n = 0; n < e.length; n++)
                            if (t(e[n])) return !0
                    } else if (e && "object" == typeof e) {
                        e.toJSON && (e = e.toJSON());
                        for (var o in e)
                            if (Object.prototype.hasOwnProperty.call(e, o) && t(e[o])) return !0
                    }
                    return !1
                }
                return t(e)
            }
            var r = self,
                i = e("isarray");
            t.exports = n
        }, {
            isarray: 73
        }],
        50: [function (e, t) {
            function n(e) {
                return null == e ? "" : e + ""
            }

            function r(e) {
                if (i(e)) return e;
                var t = [];
                return n(e).replace(o, function (e, n, r, i) {
                    t.push(r ? i.replace(a, "$1") : n || e)
                }), t
            }
            var i = e("lodash.isarray"),
                o = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,
                a = /\\(\\)?/g;
            t.exports = r
        }, {
            "lodash.isarray": 51
        }],
        52: [function (e, t) {
            function n(e, t) {
                var n = -1,
                    r = i(e) ? Array(e.length) : [];
                return u(e, function (e, i, o) {
                    r[++n] = t(e, i, o)
                }), r
            }

            function r(e) {
                return function (t) {
                    return null == t ? void 0 : t[e]
                }
            }

            function i(e) {
                return null != e && o(l(e))
            }

            function o(e) {
                return "number" == typeof e && e > -1 && 0 == e % 1 && d >= e
            }

            function a(e, t, r) {
                var i = p(e) ? s : n;
                return t = c(t, r, 3), i(e, t)
            }
            var s = e("lodash._arraymap"),
                c = e("lodash._basecallback"),
                u = e("lodash._baseeach"),
                p = e("lodash.isarray"),
                d = 9007199254740991,
                l = r("length");
            t.exports = a
        }, {
            "lodash._arraymap": 72,
            "lodash._basecallback": 74,
            "lodash._baseeach": 75,
            "lodash.isarray": 51
        }],
        73: [function (e, t) {
            t.exports = Array.isArray || function (e) {
                return "[object Array]" == Object.prototype.toString.call(e)
            }
        }, {}],
        76: [function (e, t) {
            function n(e) {
                return function (t) {
                    return null == t ? void 0 : t[e]
                }
            }

            function r(e) {
                return o(e) && m.call(e, "callee") && (!v.call(e, "callee") || g.call(e) == d)
            }

            function i(e) {
                return null != e && s(y(e)) && !a(e)
            }

            function o(e) {
                return u(e) && i(e)
            }

            function a(e) {
                var t = c(e) ? g.call(e) : "";
                return t == l || t == f
            }

            function s(e) {
                return "number" == typeof e && e > -1 && 0 == e % 1 && p >= e
            }

            function c(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }

            function u(e) {
                return !!e && "object" == typeof e
            }
            var p = 9007199254740991,
                d = "[object Arguments]",
                l = "[object Function]",
                f = "[object GeneratorFunction]",
                h = Object.prototype,
                m = h.hasOwnProperty,
                g = h.toString,
                v = h.propertyIsEnumerable,
                y = n("length");
            t.exports = r
        }, {}],
        77: [function (e, t) {
            function n(e) {
                return !!e && "object" == typeof e
            }

            function r(e, t) {
                var n = null == e ? void 0 : e[t];
                return a(n) ? n : void 0
            }

            function i(e) {
                return o(e) && l.call(e) == s
            }

            function o(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }

            function a(e) {
                return null == e ? !1 : i(e) ? f.test(p.call(e)) : n(e) && c.test(e)
            }
            var s = "[object Function]",
                c = /^\[object .+?Constructor\]$/,
                u = Object.prototype,
                p = Function.prototype.toString,
                d = u.hasOwnProperty,
                l = u.toString,
                f = RegExp("^" + p.call(d).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
            t.exports = r
        }, {}],
        78: [function (e, t) {
            function n(e, t, n) {
                if ("function" != typeof e) return r;
                if (void 0 === t) return e;
                switch (n) {
                    case 1:
                        return function (n) {
                            return e.call(t, n)
                        };
                    case 3:
                        return function (n, r, i) {
                            return e.call(t, n, r, i)
                        };
                    case 4:
                        return function (n, r, i, o) {
                            return e.call(t, n, r, i, o)
                        };
                    case 5:
                        return function (n, r, i, o, a) {
                            return e.call(t, n, r, i, o, a)
                        }
                }
                return function () {
                    return e.apply(t, arguments)
                }
            }

            function r(e) {
                return e
            }
            t.exports = n
        }, {}],
        75: [function (e, t) {
            function n(e, t) {
                return l(e, t, u)
            }

            function r(e) {
                return function (t) {
                    return null == t ? void 0 : t[e]
                }
            }

            function i(e, t) {
                return function (n, r) {
                    var i = n ? f(n) : 0;
                    if (!a(i)) return e(n, r);
                    for (var o = t ? i : -1, c = s(n);
                        (t ? o-- : ++o < i) && r(c[o], o, c) !== !1;);
                    return n
                }
            }

            function o(e) {
                return function (t, n, r) {
                    for (var i = s(t), o = r(t), a = o.length, c = e ? a : -1; e ? c-- : ++c < a;) {
                        var u = o[c];
                        if (n(i[u], u, i) === !1) break
                    }
                    return t
                }
            }

            function a(e) {
                return "number" == typeof e && e > -1 && 0 == e % 1 && p >= e
            }

            function s(e) {
                return c(e) ? e : Object(e)
            }

            function c(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }
            var u = e("lodash.keys"),
                p = 9007199254740991,
                d = i(n),
                l = o(),
                f = r("length");
            t.exports = d
        }, {
            "lodash.keys": 79
        }],
        71: [function (e, t) {
            t.exports = e("./socket"), t.exports.parser = e("engine.io-parser")
        }, {
            "./socket": 80,
            "engine.io-parser": 81
        }],
        70: [function (e, t) {
            function n(e) {
                return function (t) {
                    return null == t ? void 0 : t[e]
                }
            }

            function r(e) {
                return null != e && o(v(e))
            }

            function i(e, t) {
                return e = "number" == typeof e || l.test(e) ? +e : -1, t = null == t ? g : t, e > -1 && 0 == e % 1 && t > e
            }

            function o(e) {
                return "number" == typeof e && e > -1 && 0 == e % 1 && g >= e
            }

            function a(e) {
                for (var t = c(e), n = t.length, r = n && e.length, a = !!r && o(r) && (d(e) || p(e)), s = -1, u = []; ++s < n;) {
                    var l = t[s];
                    (a && i(l, r) || h.call(e, l)) && u.push(l)
                }
                return u
            }

            function s(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }

            function c(e) {
                if (null == e) return [];
                s(e) || (e = Object(e));
                var t = e.length;
                t = t && o(t) && (d(e) || p(e)) && t || 0;
                for (var n = e.constructor, r = -1, a = "function" == typeof n && n.prototype === e, c = Array(t), u = t > 0; ++r < t;) c[r] = r + "";
                for (var l in e) u && i(l, t) || "constructor" == l && (a || !h.call(e, l)) || c.push(l);
                return c
            }
            var u = e("lodash._getnative"),
                p = e("lodash.isarguments"),
                d = e("lodash.isarray"),
                l = /^\d+$/,
                f = Object.prototype,
                h = f.hasOwnProperty,
                m = u(Object, "keys"),
                g = 9007199254740991,
                v = n("length"),
                y = m ? function (e) {
                    var t = null == e ? void 0 : e.constructor;
                    return "function" == typeof t && t.prototype === e || "function" != typeof e && r(e) ? a(e) : s(e) ? m(e) : []
                } : a;
            t.exports = y
        }, {
            "lodash._getnative": 77,
            "lodash.isarguments": 76,
            "lodash.isarray": 47
        }],
        74: [function (e, t) {
            function n(e) {
                return null == e ? "" : e + ""
            }

            function r(e, t, n) {
                var r = typeof e;
                return "function" == r ? void 0 === t ? e : C(e, t, n) : null == e ? y : "object" == r ? a(e) : void 0 === t ? b(e) : s(e, t)
            }

            function i(e, t, n) {
                if (null != e) {
                    void 0 !== n && n in h(e) && (t = [n]);
                    for (var r = 0, i = t.length; null != e && i > r;) e = e[t[r++]];
                    return r && r == i ? e : void 0
                }
            }

            function o(e, t, n) {
                var r = t.length,
                    i = r,
                    o = !n;
                if (null == e) return !i;
                for (e = h(e); r--;) {
                    var a = t[r];
                    if (o && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1
                }
                for (; ++r < i;) {
                    a = t[r];
                    var s = a[0],
                        c = e[s],
                        u = a[1];
                    if (o && a[2]) {
                        if (void 0 === c && !(s in e)) return !1
                    } else {
                        var p = n ? n(c, u, s) : void 0;
                        if (!(void 0 === p ? w(u, c, n, !0) : p)) return !1
                    }
                }
                return !0
            }

            function a(e) {
                var t = d(e);
                if (1 == t.length && t[0][2]) {
                    var n = t[0][0],
                        r = t[0][1];
                    return function (e) {
                        return null == e ? !1 : e[n] === r && (void 0 !== r || n in h(e))
                    }
                }
                return function (e) {
                    return o(e, t)
                }
            }

            function s(e, t) {
                var n = S(e),
                    r = l(e) && f(t),
                    o = e + "";
                return e = m(e),
                    function (a) {
                        if (null == a) return !1;
                        var s = o;
                        if (a = h(a), !(!n && r || s in a)) {
                            if (a = 1 == e.length ? a : i(a, p(e, 0, -1)), null == a) return !1;
                            s = g(e), a = h(a)
                        }
                        return a[s] === t ? void 0 !== t || s in a : w(t, a[s], void 0, !0)
                    }
            }

            function c(e) {
                return function (t) {
                    return null == t ? void 0 : t[e]
                }
            }

            function u(e) {
                var t = e + "";
                return e = m(e),
                    function (n) {
                        return i(n, e, t)
                    }
            }

            function p(e, t, n) {
                var r = -1,
                    i = e.length;
                t = null == t ? 0 : +t || 0, 0 > t && (t = -t > i ? 0 : i + t), n = void 0 === n || n > i ? i : +n || 0, 0 > n && (n += i), i = t > n ? 0 : n - t >>> 0, t >>>= 0;
                for (var o = Array(i); ++r < i;) o[r] = e[r + t];
                return o
            }

            function d(e) {
                for (var t = k(e), n = t.length; n--;) t[n][2] = f(t[n][1]);
                return t
            }

            function l(e, t) {
                var n = typeof e;
                if ("string" == n && R.test(e) || "number" == n) return !0;
                if (S(e)) return !1;
                var r = !T.test(e);
                return r || null != t && e in h(t)
            }

            function f(e) {
                return e === e && !v(e)
            }

            function h(e) {
                return v(e) ? e : Object(e)
            }

            function m(e) {
                if (S(e)) return e;
                var t = [];
                return n(e).replace(P, function (e, n, r, i) {
                    t.push(r ? i.replace(E, "$1") : n || e)
                }), t
            }

            function g(e) {
                var t = e ? e.length : 0;
                return t ? e[t - 1] : void 0
            }

            function v(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }

            function y(e) {
                return e
            }

            function b(e) {
                return l(e) ? c(e) : u(e)
            }
            var w = e("lodash._baseisequal"),
                C = e("lodash._bindcallback"),
                S = e("lodash.isarray"),
                k = e("lodash.pairs"),
                T = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
                R = /^\w*$/,
                P = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,
                E = /\\(\\)?/g;
            t.exports = r
        }, {
            "lodash._baseisequal": 82,
            "lodash._bindcallback": 78,
            "lodash.isarray": 51,
            "lodash.pairs": 83
        }],
        84: [function (e, t, n) {
            function r(e) {
                var t, n = !1,
                    r = !1,
                    c = !1 !== e.jsonp;
                if (i.location) {
                    var u = "https:" == location.protocol,
                        p = location.port;
                    p || (p = u ? 443 : 80), n = e.hostname != location.hostname || p != e.port, r = e.secure != u
                }
                if (e.xdomain = n, e.xscheme = r, t = new o(e), "open" in t && !e.forceJSONP) return new a(e);
                if (!c) throw new Error("JSONP disabled");
                return new s(e)
            }
            var i = self,
                o = e("xmlhttprequest"),
                a = e("./polling-xhr"),
                s = e("./polling-jsonp"),
                c = e("./websocket");
            n.polling = r, n.websocket = c
        }, {
            "./polling-jsonp": 87,
            "./polling-xhr": 86,
            "./websocket": 88,
            xmlhttprequest: 85
        }],
        89: [function (e, t) {
            t.exports = Object.keys || function (e) {
                var t = [],
                    n = Object.prototype.hasOwnProperty;
                for (var r in e) n.call(e, r) && t.push(r);
                return t
            }
        }, {}],
        90: [function (e, t) {
            function n(e) {
                return "number" == typeof e && e > -1 && 0 == e % 1 && o >= e
            }

            function r(e) {
                return !!e && "object" == typeof e
            }

            function i(e) {
                return r(e) && n(e.length) && !!O[D.call(e)]
            }
            var o = 9007199254740991,
                a = "[object Arguments]",
                s = "[object Array]",
                c = "[object Boolean]",
                u = "[object Date]",
                p = "[object Error]",
                d = "[object Function]",
                l = "[object Map]",
                f = "[object Number]",
                h = "[object Object]",
                m = "[object RegExp]",
                g = "[object Set]",
                v = "[object String]",
                y = "[object WeakMap]",
                b = "[object ArrayBuffer]",
                w = "[object Float32Array]",
                C = "[object Float64Array]",
                S = "[object Int8Array]",
                k = "[object Int16Array]",
                T = "[object Int32Array]",
                R = "[object Uint8Array]",
                P = "[object Uint8ClampedArray]",
                E = "[object Uint16Array]",
                x = "[object Uint32Array]",
                O = {};
            O[w] = O[C] = O[S] = O[k] = O[T] = O[R] = O[P] = O[E] = O[x] = !0, O[a] = O[s] = O[b] = O[c] = O[u] = O[p] = O[d] = O[l] = O[f] = O[h] = O[m] = O[g] = O[v] = O[y] = !1;
            var j = Object.prototype,
                D = j.toString;
            t.exports = i
        }, {}],
        91: [function (e, t) {
            var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            t.exports = function (e) {
                var t = e,
                    i = e.indexOf("["),
                    o = e.indexOf("]"); - 1 != i && -1 != o && (e = e.substring(0, i) + e.substring(i, o).replace(/:/g, ";") + e.substring(o, e.length));
                for (var a = n.exec(e || ""), s = {}, c = 14; c--;) s[r[c]] = a[c] || "";
                return -1 != i && -1 != o && (s.source = t, s.host = s.host.substring(1, s.host.length - 1).replace(/;/g, ":"), s.authority = s.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), s.ipv6uri = !0), s
            }
        }, {}],
        92: [function (e, t) {
            var n = self,
                r = /^[\],:{}\s]*$/,
                i = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                o = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                a = /(?:^|:|,)(?:\s*\[)+/g,
                s = /^\s+/,
                c = /\s+$/;
            t.exports = function (e) {
                return "string" == typeof e && e ? (e = e.replace(s, "").replace(c, ""), n.JSON && JSON.parse ? JSON.parse(e) : r.test(e.replace(i, "@").replace(o, "]").replace(a, "")) ? new Function("return " + e)() : void 0) : null
            }
        }, {}],
        93: [function (e, t, n) {
            n.encode = function (e) {
                var t = "";
                for (var n in e) e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
                return t
            }, n.decode = function (e) {
                for (var t = {}, n = e.split("&"), r = 0, i = n.length; i > r; r++) {
                    var o = n[r].split("=");
                    t[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
                }
                return t
            }
        }, {}],
        80: [function (e, t) {
            function n(e, t) {
                if (!(this instanceof n)) return new n(e, t);
                if (t = t || {}, e && "object" == typeof e && (t = e, e = null), e && (e = p(e), t.host = e.host, t.secure = "https" == e.protocol || "wss" == e.protocol, t.port = e.port, e.query && (t.query = e.query)), this.secure = null != t.secure ? t.secure : i.location && "https:" == location.protocol, t.host) {
                    var r = t.host.split(":");
                    t.hostname = r.shift(), r.length ? t.port = r.pop() : t.port || (t.port = this.secure ? "443" : "80")
                }
                this.agent = t.agent || !1, this.hostname = t.hostname || (i.location ? location.hostname : "localhost"), this.port = t.port || (i.location && location.port ? location.port : this.secure ? 443 : 80), this.query = t.query || {}, "string" == typeof this.query && (this.query = l.decode(this.query)), this.upgrade = !1 !== t.upgrade, this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!t.forceJSONP, this.jsonp = !1 !== t.jsonp, this.forceBase64 = !!t.forceBase64, this.enablesXDR = !!t.enablesXDR, this.timestampParam = t.timestampParam || "t", this.timestampRequests = t.timestampRequests, this.transports = t.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.callbackBuffer = [], this.policyPort = t.policyPort || 843, this.rememberUpgrade = t.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = t.onlyBinaryUpgrades, this.pfx = t.pfx || null, this.key = t.key || null, this.passphrase = t.passphrase || null, this.cert = t.cert || null, this.ca = t.ca || null, this.ciphers = t.ciphers || null, this.rejectUnauthorized = t.rejectUnauthorized || null, this.open()
            }

            function r(e) {
                var t = {};
                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                return t
            }
            var i = self,
                o = e("./transports"),
                a = e("component-emitter"),
                s = e("debug")("engine.io-client:socket"),
                c = e("indexof"),
                u = e("engine.io-parser"),
                p = e("parseuri"),
                d = e("parsejson"),
                l = e("parseqs");
            t.exports = n, n.priorWebsocketSuccess = !1, a(n.prototype), n.protocol = u.protocol, n.Socket = n, n.Transport = e("./transport"), n.transports = e("./transports"), n.parser = e("engine.io-parser"), n.prototype.createTransport = function (e) {
                s('creating transport "%s"', e);
                var t = r(this.query);
                t.EIO = u.protocol, t.transport = e, this.id && (t.sid = this.id);
                var n = new o[e]({
                    agent: this.agent,
                    hostname: this.hostname,
                    port: this.port,
                    secure: this.secure,
                    path: this.path,
                    query: t,
                    forceJSONP: this.forceJSONP,
                    jsonp: this.jsonp,
                    forceBase64: this.forceBase64,
                    enablesXDR: this.enablesXDR,
                    timestampRequests: this.timestampRequests,
                    timestampParam: this.timestampParam,
                    policyPort: this.policyPort,
                    socket: this,
                    pfx: this.pfx,
                    key: this.key,
                    passphrase: this.passphrase,
                    cert: this.cert,
                    ca: this.ca,
                    ciphers: this.ciphers,
                    rejectUnauthorized: this.rejectUnauthorized
                });
                return n
            }, n.prototype.open = function () {
                var e;
                if (this.rememberUpgrade && n.priorWebsocketSuccess && -1 != this.transports.indexOf("websocket")) e = "websocket";
                else {
                    if (0 == this.transports.length) {
                        var t = this;
                        return setTimeout(function () {
                            t.emit("error", "No transports available")
                        }, 0), void 0
                    }
                    e = this.transports[0]
                }
                this.readyState = "opening";
                var e;
                try {
                    e = this.createTransport(e)
                } catch (r) {
                    return this.transports.shift(), this.open(), void 0
                }
                e.open(), this.setTransport(e)
            }, n.prototype.setTransport = function (e) {
                s("setting transport %s", e.name);
                var t = this;
                this.transport && (s("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = e, e.on("drain", function () {
                    t.onDrain()
                }).on("packet", function (e) {
                    t.onPacket(e)
                }).on("error", function (e) {
                    t.onError(e)
                }).on("close", function () {
                    t.onClose("transport close")
                })
            }, n.prototype.probe = function (e) {
                function t() {
                    if (l.onlyBinaryUpgrades) {
                        var t = !this.supportsBinary && l.transport.supportsBinary;
                        d = d || t
                    }
                    d || (s('probe transport "%s" opened', e), p.send([{
                        type: "ping",
                        data: "probe"
                    }]), p.once("packet", function (t) {
                        if (!d)
                            if ("pong" == t.type && "probe" == t.data) {
                                if (s('probe transport "%s" pong', e), l.upgrading = !0, l.emit("upgrading", p), !p) return;
                                n.priorWebsocketSuccess = "websocket" == p.name, s('pausing current transport "%s"', l.transport.name), l.transport.pause(function () {
                                    d || "closed" != l.readyState && (s("changing transport and sending upgrade packet"), u(), l.setTransport(p), p.send([{
                                        type: "upgrade"
                                    }]), l.emit("upgrade", p), p = null, l.upgrading = !1, l.flush())
                                })
                            } else {
                                s('probe transport "%s" failed', e);
                                var r = new Error("probe error");
                                r.transport = p.name, l.emit("upgradeError", r)
                            }
                    }))
                }

                function r() {
                    d || (d = !0, u(), p.close(), p = null)
                }

                function i(t) {
                    var n = new Error("probe error: " + t);
                    n.transport = p.name, r(), s('probe transport "%s" failed because of error: %s', e, t), l.emit("upgradeError", n)
                }

                function o() {
                    i("transport closed")
                }

                function a() {
                    i("socket closed")
                }

                function c(e) {
                    p && e.name != p.name && (s('"%s" works - aborting "%s"', e.name, p.name), r())
                }

                function u() {
                    p.removeListener("open", t), p.removeListener("error", i), p.removeListener("close", o), l.removeListener("close", a), l.removeListener("upgrading", c)
                }
                s('probing transport "%s"', e);
                var p = this.createTransport(e, {
                        probe: 1
                    }),
                    d = !1,
                    l = this;
                n.priorWebsocketSuccess = !1, p.once("open", t), p.once("error", i), p.once("close", o), this.once("close", a), this.once("upgrading", c), p.open()
            }, n.prototype.onOpen = function () {
                if (s("socket open"), this.readyState = "open", n.priorWebsocketSuccess = "websocket" == this.transport.name, this.emit("open"), this.flush(), "open" == this.readyState && this.upgrade && this.transport.pause) {
                    s("starting upgrade probes");
                    for (var e = 0, t = this.upgrades.length; t > e; e++) this.probe(this.upgrades[e])
                }
            }, n.prototype.onPacket = function (e) {
                if ("opening" == this.readyState || "open" == this.readyState) switch (s('socket receive: type "%s", data "%s"', e.type, e.data), this.emit("packet", e), this.emit("heartbeat"), e.type) {
                    case "open":
                        this.onHandshake(d(e.data));
                        break;
                    case "pong":
                        this.setPing();
                        break;
                    case "error":
                        var t = new Error("server error");
                        t.code = e.data, this.emit("error", t);
                        break;
                    case "message":
                        this.emit("data", e.data), this.emit("message", e.data)
                } else s('packet received with socket readyState "%s"', this.readyState)
            }, n.prototype.onHandshake = function (e) {
                this.emit("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen(), "closed" != this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
            }, n.prototype.onHeartbeat = function (e) {
                clearTimeout(this.pingTimeoutTimer);
                var t = this;
                t.pingTimeoutTimer = setTimeout(function () {
                    "closed" != t.readyState && t.onClose("ping timeout")
                }, e || t.pingInterval + t.pingTimeout)
            }, n.prototype.setPing = function () {
                var e = this;
                clearTimeout(e.pingIntervalTimer), e.pingIntervalTimer = setTimeout(function () {
                    s("writing ping packet - expecting pong within %sms", e.pingTimeout), e.ping(), e.onHeartbeat(e.pingTimeout)
                }, e.pingInterval)
            }, n.prototype.ping = function () {
                this.sendPacket("ping")
            }, n.prototype.onDrain = function () {
                for (var e = 0; e < this.prevBufferLen; e++) this.callbackBuffer[e] && this.callbackBuffer[e]();
                this.writeBuffer.splice(0, this.prevBufferLen), this.callbackBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 == this.writeBuffer.length ? this.emit("drain") : this.flush()
            }, n.prototype.flush = function () {
                "closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (s("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
            }, n.prototype.write = n.prototype.send = function (e, t) {
                return this.sendPacket("message", e, t), this
            }, n.prototype.sendPacket = function (e, t, n) {
                if ("closing" != this.readyState && "closed" != this.readyState) {
                    var r = {
                        type: e,
                        data: t
                    };
                    this.emit("packetCreate", r), this.writeBuffer.push(r), this.callbackBuffer.push(n), this.flush()
                }
            }, n.prototype.close = function () {
                function e() {
                    r.onClose("forced close"), s("socket closing - telling transport to close"), r.transport.close()
                }

                function t() {
                    r.removeListener("upgrade", t), r.removeListener("upgradeError", t), e()
                }

                function n() {
                    r.once("upgrade", t), r.once("upgradeError", t)
                }
                if ("opening" == this.readyState || "open" == this.readyState) {
                    this.readyState = "closing";
                    var r = this;
                    this.writeBuffer.length ? this.once("drain", function () {
                        this.upgrading ? n() : e()
                    }) : this.upgrading ? n() : e()
                }
                return this
            }, n.prototype.onError = function (e) {
                s("socket error %j", e), n.priorWebsocketSuccess = !1, this.emit("error", e), this.onClose("transport error", e)
            }, n.prototype.onClose = function (e, t) {
                if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
                    s('socket close with reason: "%s"', e);
                    var n = this;
                    clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), setTimeout(function () {
                        n.writeBuffer = [], n.callbackBuffer = [], n.prevBufferLen = 0
                    }, 0), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", e, t)
                }
            }, n.prototype.filterUpgrades = function (e) {
                for (var t = [], n = 0, r = e.length; r > n; n++) ~c(this.transports, e[n]) && t.push(e[n]);
                return t
            }
        }, {
            "./transport": 94,
            "./transports": 84,
            "component-emitter": 56,
            debug: 95,
            "engine.io-parser": 81,
            indexof: 60,
            parsejson: 92,
            parseqs: 93,
            parseuri: 91
        }],
        96: [function (e, t) {
            function n(e) {
                return function (t) {
                    return null == t ? void 0 : t[e]
                }
            }

            function r(e) {
                return o(e) && m.call(e, "callee") && (!v.call(e, "callee") || g.call(e) == d)
            }

            function i(e) {
                return null != e && s(y(e)) && !a(e)
            }

            function o(e) {
                return u(e) && i(e)
            }

            function a(e) {
                var t = c(e) ? g.call(e) : "";
                return t == l || t == f
            }

            function s(e) {
                return "number" == typeof e && e > -1 && 0 == e % 1 && p >= e
            }

            function c(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }

            function u(e) {
                return !!e && "object" == typeof e
            }
            var p = 9007199254740991,
                d = "[object Arguments]",
                l = "[object Function]",
                f = "[object GeneratorFunction]",
                h = Object.prototype,
                m = h.hasOwnProperty,
                g = h.toString,
                v = h.propertyIsEnumerable,
                y = n("length");
            t.exports = r
        }, {}],
        97: [function (e, t) {
            function n(e) {
                return !!e && "object" == typeof e
            }

            function r(e, t) {
                var n = null == e ? void 0 : e[t];
                return a(n) ? n : void 0
            }

            function i(e) {
                return o(e) && l.call(e) == s
            }

            function o(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }

            function a(e) {
                return null == e ? !1 : i(e) ? f.test(p.call(e)) : n(e) && c.test(e)
            }
            var s = "[object Function]",
                c = /^\[object .+?Constructor\]$/,
                u = Object.prototype,
                p = Function.prototype.toString,
                d = u.hasOwnProperty,
                l = u.toString,
                f = RegExp("^" + p.call(d).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
            t.exports = r
        }, {}],
        95: [function (e, t, n) {
            function r() {
                return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
            }

            function i() {
                var e = arguments,
                    t = this.useColors;
                if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + n.humanize(this.diff), !t) return e;
                var r = "color: " + this.color;
                e = [e[0], r, "color: inherit"].concat(Array.prototype.slice.call(e, 1));
                var i = 0,
                    o = 0;
                return e[0].replace(/%[a-z%]/g, function (e) {
                    "%%" !== e && (i++, "%c" === e && (o = i))
                }), e.splice(o, 0, r), e
            }

            function o() {
                return "object" == typeof console && "function" == typeof console.log && Function.prototype.apply.call(console.log, console, arguments)
            }

            function a(e) {
                try {
                    null == e ? localStorage.removeItem("debug") : localStorage.debug = e
                } catch (t) {}
            }

            function s() {
                var e;
                try {
                    e = localStorage.debug
                } catch (t) {}
                return e
            }
            n = t.exports = e("./debug"), n.log = o, n.formatArgs = i, n.save = a, n.load = s, n.useColors = r, n.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], n.formatters.j = function (e) {
                return JSON.stringify(e)
            }, n.enable(s())
        }, {
            "./debug": 98
        }],
        83: [function (e, t) {
            function n(e) {
                return r(e) ? e : Object(e)
            }

            function r(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }

            function i(e) {
                e = n(e);
                for (var t = -1, r = o(e), i = r.length, a = Array(i); ++t < i;) {
                    var s = r[t];
                    a[t] = [s, e[s]]
                }
                return a
            }
            var o = e("lodash.keys");
            t.exports = i
        }, {
            "lodash.keys": 79
        }],
        99: [function (t, n, r) {
            var i = self;
            ! function (t) {
                function o(e) {
                    for (var t, n, r = [], i = 0, o = e.length; o > i;) t = e.charCodeAt(i++), t >= 55296 && 56319 >= t && o > i ? (n = e.charCodeAt(i++), 56320 == (64512 & n) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), i--)) : r.push(t);
                    return r
                }

                function a(e) {
                    for (var t, n = e.length, r = -1, i = ""; ++r < n;) t = e[r], t > 65535 && (t -= 65536, i += w(55296 | 1023 & t >>> 10), t = 56320 | 1023 & t), i += w(t);
                    return i
                }

                function s(e) {
                    if (e >= 55296 && 57343 >= e) throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value")
                }

                function c(e, t) {
                    return w(128 | 63 & e >> t)
                }

                function u(e) {
                    if (0 == (4294967168 & e)) return w(e);
                    var t = "";
                    return 0 == (4294965248 & e) ? t = w(192 | 31 & e >> 6) : 0 == (4294901760 & e) ? (s(e), t = w(224 | 15 & e >> 12), t += c(e, 6)) : 0 == (4292870144 & e) && (t = w(240 | 7 & e >> 18), t += c(e, 12), t += c(e, 6)), t += w(128 | 63 & e)
                }

                function p(e) {
                    for (var t, n = o(e), r = n.length, i = -1, a = ""; ++i < r;) t = n[i], a += u(t);
                    return a
                }

                function d() {
                    if (b >= y) throw Error("Invalid byte index");
                    var e = 255 & v[b];
                    if (b++, 128 == (192 & e)) return 63 & e;
                    throw Error("Invalid continuation byte")
                }

                function l() {
                    var e, t, n, r, i;
                    if (b > y) throw Error("Invalid byte index");
                    if (b == y) return !1;
                    if (e = 255 & v[b], b++, 0 == (128 & e)) return e;
                    if (192 == (224 & e)) {
                        var t = d();
                        if (i = (31 & e) << 6 | t, i >= 128) return i;
                        throw Error("Invalid continuation byte")
                    }
                    if (224 == (240 & e)) {
                        if (t = d(), n = d(), i = (15 & e) << 12 | t << 6 | n, i >= 2048) return s(i), i;
                        throw Error("Invalid continuation byte")
                    }
                    if (240 == (248 & e) && (t = d(), n = d(), r = d(), i = (15 & e) << 18 | t << 12 | n << 6 | r, i >= 65536 && 1114111 >= i)) return i;
                    throw Error("Invalid UTF-8 detected")
                }

                function f(e) {
                    v = o(e), y = v.length, b = 0;
                    for (var t, n = [];
                        (t = l()) !== !1;) n.push(t);
                    return a(n)
                }
                var h = "object" == typeof r && r,
                    m = "object" == typeof n && n && n.exports == h && n,
                    g = "object" == typeof i && i;
                (g.global === g || g.window === g) && (t = g);
                var v, y, b, w = String.fromCharCode,
                    C = {
                        version: "2.0.0",
                        encode: p,
                        decode: f
                    };
                if ("function" == typeof e && "object" == typeof e.amd && e.amd) e(function () {
                    return C
                });
                else if (h && !h.nodeType)
                    if (m) m.exports = C;
                    else {
                        var S = {},
                            k = S.hasOwnProperty;
                        for (var T in C) k.call(C, T) && (h[T] = C[T])
                    }
                else t.utf8 = C
            }(this)
        }, {}],
        82: [function (e, t) {
            function n(e) {
                return !!e && "object" == typeof e
            }

            function r(e, t) {
                for (var n = -1, r = e.length; ++n < r;)
                    if (t(e[n], n, e)) return !0;
                return !1
            }

            function i(e, t, r, a, s, c) {
                return e === t ? !0 : null == e || null == t || !u(e) && !n(t) ? e !== e && t !== t : o(e, t, i, r, a, s, c)
            }

            function o(e, t, n, r, i, o, u) {
                var l = p(e),
                    m = p(t),
                    g = h,
                    v = h;
                l || (g = T.call(e), g == f ? g = b : g != b && (l = d(e))), m || (v = T.call(t), v == f ? v = b : v != b && (m = d(t)));
                var y = g == b,
                    w = v == b,
                    C = g == v;
                if (C && !l && !y) return s(e, t, g);
                if (!i) {
                    var S = y && k.call(e, "__wrapped__"),
                        R = w && k.call(t, "__wrapped__");
                    if (S || R) return n(S ? e.value() : e, R ? t.value() : t, r, i, o, u)
                }
                if (!C) return !1;
                o || (o = []), u || (u = []);
                for (var P = o.length; P--;)
                    if (o[P] == e) return u[P] == t;
                o.push(e), u.push(t);
                var E = (l ? a : c)(e, t, n, r, i, o, u);
                return o.pop(), u.pop(), E
            }

            function a(e, t, n, i, o, a, s) {
                var c = -1,
                    u = e.length,
                    p = t.length;
                if (u != p && !(o && p > u)) return !1;
                for (; ++c < u;) {
                    var d = e[c],
                        l = t[c],
                        f = i ? i(o ? l : d, o ? d : l, c) : void 0;
                    if (void 0 !== f) {
                        if (f) continue;
                        return !1
                    }
                    if (o) {
                        if (!r(t, function (e) {
                                return d === e || n(d, e, i, o, a, s)
                            })) return !1
                    } else if (d !== l && !n(d, l, i, o, a, s)) return !1
                }
                return !0
            }

            function s(e, t, n) {
                switch (n) {
                    case m:
                    case g:
                        return +e == +t;
                    case v:
                        return e.name == t.name && e.message == t.message;
                    case y:
                        return e != +e ? t != +t : e == +t;
                    case w:
                    case C:
                        return e == t + ""
                }
                return !1
            }

            function c(e, t, n, r, i, o, a) {
                var s = l(e),
                    c = s.length,
                    u = l(t),
                    p = u.length;
                if (c != p && !i) return !1;
                for (var d = c; d--;) {
                    var f = s[d];
                    if (!(i ? f in t : k.call(t, f))) return !1
                }
                for (var h = i; ++d < c;) {
                    f = s[d];
                    var m = e[f],
                        g = t[f],
                        v = r ? r(i ? g : m, i ? m : g, f) : void 0;
                    if (!(void 0 === v ? n(m, g, r, i, o, a) : v)) return !1;
                    h || (h = "constructor" == f)
                }
                if (!h) {
                    var y = e.constructor,
                        b = t.constructor;
                    if (y != b && "constructor" in e && "constructor" in t && !("function" == typeof y && y instanceof y && "function" == typeof b && b instanceof b)) return !1
                }
                return !0
            }

            function u(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }
            var p = e("lodash.isarray"),
                d = e("lodash.istypedarray"),
                l = e("lodash.keys"),
                f = "[object Arguments]",
                h = "[object Array]",
                m = "[object Boolean]",
                g = "[object Date]",
                v = "[object Error]",
                y = "[object Number]",
                b = "[object Object]",
                w = "[object RegExp]",
                C = "[object String]",
                S = Object.prototype,
                k = S.hasOwnProperty,
                T = S.toString;
            t.exports = i
        }, {
            "lodash.isarray": 51,
            "lodash.istypedarray": 90,
            "lodash.keys": 79
        }],
        79: [function (e, t) {
            function n(e) {
                return function (t) {
                    return null == t ? void 0 : t[e]
                }
            }

            function r(e) {
                return null != e && o(v(e))
            }

            function i(e, t) {
                return e = "number" == typeof e || l.test(e) ? +e : -1, t = null == t ? g : t, e > -1 && 0 == e % 1 && t > e
            }

            function o(e) {
                return "number" == typeof e && e > -1 && 0 == e % 1 && g >= e
            }

            function a(e) {
                for (var t = c(e), n = t.length, r = n && e.length, a = !!r && o(r) && (d(e) || p(e)), s = -1, u = []; ++s < n;) {
                    var l = t[s];
                    (a && i(l, r) || h.call(e, l)) && u.push(l)
                }
                return u
            }

            function s(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }

            function c(e) {
                if (null == e) return [];
                s(e) || (e = Object(e));
                var t = e.length;
                t = t && o(t) && (d(e) || p(e)) && t || 0;
                for (var n = e.constructor, r = -1, a = "function" == typeof n && n.prototype === e, c = Array(t), u = t > 0; ++r < t;) c[r] = r + "";
                for (var l in e) u && i(l, t) || "constructor" == l && (a || !h.call(e, l)) || c.push(l);
                return c
            }
            var u = e("lodash._getnative"),
                p = e("lodash.isarguments"),
                d = e("lodash.isarray"),
                l = /^\d+$/,
                f = Object.prototype,
                h = f.hasOwnProperty,
                m = u(Object, "keys"),
                g = 9007199254740991,
                v = n("length"),
                y = m ? function (e) {
                    var t = null == e ? void 0 : e.constructor;
                    return "function" == typeof t && t.prototype === e || "function" != typeof e && r(e) ? a(e) : s(e) ? m(e) : []
                } : a;
            t.exports = y
        }, {
            "lodash._getnative": 97,
            "lodash.isarguments": 96,
            "lodash.isarray": 51
        }],
        94: [function (e, t) {
            function n(e) {
                this.path = e.path, this.hostname = e.hostname, this.port = e.port, this.secure = e.secure, this.query = e.query, this.timestampParam = e.timestampParam, this.timestampRequests = e.timestampRequests, this.readyState = "", this.agent = e.agent || !1, this.socket = e.socket, this.enablesXDR = e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized
            }
            var r = e("engine.io-parser"),
                i = e("component-emitter");
            t.exports = n, i(n.prototype), n.timestamps = 0, n.prototype.onError = function (e, t) {
                var n = new Error(e);
                return n.type = "TransportError", n.description = t, this.emit("error", n), this
            }, n.prototype.open = function () {
                return ("closed" == this.readyState || "" == this.readyState) && (this.readyState = "opening", this.doOpen()), this
            }, n.prototype.close = function () {
                return ("opening" == this.readyState || "open" == this.readyState) && (this.doClose(), this.onClose()), this
            }, n.prototype.send = function (e) {
                if ("open" != this.readyState) throw new Error("Transport not open");
                this.write(e)
            }, n.prototype.onOpen = function () {
                this.readyState = "open", this.writable = !0, this.emit("open")
            }, n.prototype.onData = function (e) {
                var t = r.decodePacket(e, this.socket.binaryType);
                this.onPacket(t)
            }, n.prototype.onPacket = function (e) {
                this.emit("packet", e)
            }, n.prototype.onClose = function () {
                this.readyState = "closed", this.emit("close")
            }
        }, {
            "component-emitter": 56,
            "engine.io-parser": 81
        }],
        100: [function (e, t) {
            t.exports = function (e, t, n) {
                var r = e.byteLength;
                if (t = t || 0, n = n || r, e.slice) return e.slice(t, n);
                if (0 > t && (t += r), 0 > n && (n += r), n > r && (n = r), t >= r || t >= n || 0 === r) return new ArrayBuffer(0);
                for (var i = new Uint8Array(e), o = new Uint8Array(n - t), a = t, s = 0; n > a; a++, s++) o[s] = i[a];
                return o.buffer
            }
        }, {}],
        101: [function (e, t, n) {
            ! function (e) {
                "use strict";
                n.encode = function (t) {
                    var n, r = new Uint8Array(t),
                        i = r.length,
                        o = "";
                    for (n = 0; i > n; n += 3) o += e[r[n] >> 2], o += e[(3 & r[n]) << 4 | r[n + 1] >> 4], o += e[(15 & r[n + 1]) << 2 | r[n + 2] >> 6], o += e[63 & r[n + 2]];
                    return 2 === i % 3 ? o = o.substring(0, o.length - 1) + "=" : 1 === i % 3 && (o = o.substring(0, o.length - 2) + "=="), o
                }, n.decode = function (t) {
                    var n, r, i, o, a, s = .75 * t.length,
                        c = t.length,
                        u = 0;
                    "=" === t[t.length - 1] && (s--, "=" === t[t.length - 2] && s--);
                    var p = new ArrayBuffer(s),
                        d = new Uint8Array(p);
                    for (n = 0; c > n; n += 4) r = e.indexOf(t[n]), i = e.indexOf(t[n + 1]), o = e.indexOf(t[n + 2]), a = e.indexOf(t[n + 3]), d[u++] = r << 2 | i >> 4, d[u++] = (15 & i) << 4 | o >> 2, d[u++] = (3 & o) << 6 | 63 & a;
                    return p
                }
            }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
        }, {}],
        102: [function (e, t) {
            function n(e, t, n) {
                function i(e, r) {
                    if (i.count <= 0) throw new Error("after called too many times");
                    --i.count, e ? (o = !0, t(e), t = n) : 0 !== i.count || o || t(null, r)
                }
                var o = !1;
                return n = n || r, i.count = e, 0 === e ? t() : i
            }

            function r() {}
            t.exports = n
        }, {}],
        103: [function (e, t) {
            function n(e) {
                for (var t = 0; t < e.length; t++) {
                    var n = e[t];
                    if (n.buffer instanceof ArrayBuffer) {
                        var r = n.buffer;
                        if (n.byteLength !== r.byteLength) {
                            var i = new Uint8Array(n.byteLength);
                            i.set(new Uint8Array(r, n.byteOffset, n.byteLength)), r = i.buffer
                        }
                        e[t] = r
                    }
                }
            }

            function r(e, t) {
                t = t || {};
                var r = new a;
                n(e);
                for (var i = 0; i < e.length; i++) r.append(e[i]);
                return t.type ? r.getBlob(t.type) : r.getBlob()
            }

            function i(e, t) {
                return n(e), new Blob(e, t || {})
            }
            var o = self,
                a = o.BlobBuilder || o.WebKitBlobBuilder || o.MSBlobBuilder || o.MozBlobBuilder,
                s = function () {
                    try {
                        var e = new Blob(["hi"]);
                        return 2 === e.size
                    } catch (t) {
                        return !1
                    }
                }(),
                c = s && function () {
                    try {
                        var e = new Blob([new Uint8Array([1, 2])]);
                        return 2 === e.size
                    } catch (t) {
                        return !1
                    }
                }(),
                u = a && a.prototype.append && a.prototype.getBlob;
            t.exports = function () {
                return s ? c ? o.Blob : i : u ? r : void 0
            }()
        }, {}],
        81: [function (e, t, n) {
            function r(e, t) {
                var r = "b" + n.packets[e.type] + e.data.data;
                return t(r)
            }

            function i(e, t, r) {
                if (!t) return n.encodeBase64Packet(e, r);
                var i = e.data,
                    o = new Uint8Array(i),
                    a = new Uint8Array(1 + i.byteLength);
                a[0] = y[e.type];
                for (var s = 0; s < o.length; s++) a[s + 1] = o[s];
                return r(a.buffer)
            }

            function o(e, t, r) {
                if (!t) return n.encodeBase64Packet(e, r);
                var i = new FileReader;
                return i.onload = function () {
                    e.data = i.result, n.encodePacket(e, t, !0, r)
                }, i.readAsArrayBuffer(e.data)
            }

            function a(e, t, r) {
                if (!t) return n.encodeBase64Packet(e, r);
                if (v) return o(e, t, r);
                var i = new Uint8Array(1);
                i[0] = y[e.type];
                var a = new C([i.buffer, e.data]);
                return r(a)
            }

            function s(e, t, n) {
                for (var r = new Array(e.length), i = f(e.length, n), o = function (e, n, i) {
                        t(n, function (t, n) {
                            r[e] = n, i(t, r)
                        })
                    }, a = 0; a < e.length; a++) o(a, e[a], i)
            }
            var c = self,
                u = e("./keys"),
                p = e("has-binary"),
                d = e("arraybuffer.slice"),
                l = e("base64-arraybuffer"),
                f = e("after"),
                h = e("utf8"),
                m = navigator.userAgent.match(/Android/i),
                g = /PhantomJS/i.test(navigator.userAgent),
                v = m || g;
            n.protocol = 3;
            var y = n.packets = {
                    open: 0,
                    close: 1,
                    ping: 2,
                    pong: 3,
                    message: 4,
                    upgrade: 5,
                    noop: 6
                },
                b = u(y),
                w = {
                    type: "error",
                    data: "parser error"
                },
                C = e("blob");
            n.encodePacket = function (e, t, n, o) {
                "function" == typeof t && (o = t, t = !1), "function" == typeof n && (o = n, n = null);
                var s = void 0 === e.data ? void 0 : e.data.buffer || e.data;
                if (c.ArrayBuffer && s instanceof ArrayBuffer) return i(e, t, o);
                if (C && s instanceof c.Blob) return a(e, t, o);
                if (s && s.base64) return r(e, o);
                var u = y[e.type];
                return void 0 !== e.data && (u += n ? h.encode(String(e.data)) : String(e.data)), o("" + u)
            }, n.encodeBase64Packet = function (e, t) {
                var r = "b" + n.packets[e.type];
                if (C && e.data instanceof C) {
                    var i = new FileReader;
                    return i.onload = function () {
                        var e = i.result.split(",")[1];
                        t(r + e)
                    }, i.readAsDataURL(e.data)
                }
                var o;
                try {
                    o = String.fromCharCode.apply(null, new Uint8Array(e.data))
                } catch (a) {
                    for (var s = new Uint8Array(e.data), u = new Array(s.length), p = 0; p < s.length; p++) u[p] = s[p];
                    o = String.fromCharCode.apply(null, u)
                }
                return r += c.btoa(o), t(r)
            }, n.decodePacket = function (e, t, r) {
                if ("string" == typeof e || void 0 === e) {
                    if ("b" == e.charAt(0)) return n.decodeBase64Packet(e.substr(1), t);
                    if (r) try {
                        e = h.decode(e)
                    } catch (i) {
                        return w
                    }
                    var o = e.charAt(0);
                    return Number(o) == o && b[o] ? e.length > 1 ? {
                        type: b[o],
                        data: e.substring(1)
                    } : {
                        type: b[o]
                    } : w
                }
                var a = new Uint8Array(e),
                    o = a[0],
                    s = d(e, 1);
                return C && "blob" === t && (s = new C([s])), {
                    type: b[o],
                    data: s
                }
            }, n.decodeBase64Packet = function (e, t) {
                var n = b[e.charAt(0)];
                if (!c.ArrayBuffer) return {
                    type: n,
                    data: {
                        base64: !0,
                        data: e.substr(1)
                    }
                };
                var r = l.decode(e.substr(1));
                return "blob" === t && C && (r = new C([r])), {
                    type: n,
                    data: r
                }
            }, n.encodePayload = function (e, t, r) {
                function i(e) {
                    return e.length + ":" + e
                }

                function o(e, r) {
                    n.encodePacket(e, a ? t : !1, !0, function (e) {
                        r(null, i(e))
                    })
                }
                "function" == typeof t && (r = t, t = null);
                var a = p(e);
                return t && a ? C && !v ? n.encodePayloadAsBlob(e, r) : n.encodePayloadAsArrayBuffer(e, r) : e.length ? (s(e, o, function (e, t) {
                    return r(t.join(""))
                }), void 0) : r("0:")
            }, n.decodePayload = function (e, t, r) {
                if ("string" != typeof e) return n.decodePayloadAsBinary(e, t, r);
                "function" == typeof t && (r = t, t = null);
                var i;
                if ("" == e) return r(w, 0, 1);
                for (var o, a, s = "", c = 0, u = e.length; u > c; c++) {
                    var p = e.charAt(c);
                    if (":" != p) s += p;
                    else {
                        if ("" == s || s != (o = Number(s))) return r(w, 0, 1);
                        if (a = e.substr(c + 1, o), s != a.length) return r(w, 0, 1);
                        if (a.length) {
                            if (i = n.decodePacket(a, t, !0), w.type == i.type && w.data == i.data) return r(w, 0, 1);
                            var d = r(i, c + o, u);
                            if (!1 === d) return
                        }
                        c += o, s = ""
                    }
                }
                return "" != s ? r(w, 0, 1) : void 0
            }, n.encodePayloadAsArrayBuffer = function (e, t) {
                function r(e, t) {
                    n.encodePacket(e, !0, !0, function (e) {
                        return t(null, e)
                    })
                }
                return e.length ? (s(e, r, function (e, n) {
                    var r = n.reduce(function (e, t) {
                            var n;
                            return n = "string" == typeof t ? t.length : t.byteLength, e + n.toString().length + n + 2
                        }, 0),
                        i = new Uint8Array(r),
                        o = 0;
                    return n.forEach(function (e) {
                        var t = "string" == typeof e,
                            n = e;
                        if (t) {
                            for (var r = new Uint8Array(e.length), a = 0; a < e.length; a++) r[a] = e.charCodeAt(a);
                            n = r.buffer
                        }
                        i[o++] = t ? 0 : 1;
                        for (var s = n.byteLength.toString(), a = 0; a < s.length; a++) i[o++] = parseInt(s[a]);
                        i[o++] = 255;
                        for (var r = new Uint8Array(n), a = 0; a < r.length; a++) i[o++] = r[a]
                    }), t(i.buffer)
                }), void 0) : t(new ArrayBuffer(0))
            }, n.encodePayloadAsBlob = function (e, t) {
                function r(e, t) {
                    n.encodePacket(e, !0, !0, function (e) {
                        var n = new Uint8Array(1);
                        if (n[0] = 1, "string" == typeof e) {
                            for (var r = new Uint8Array(e.length), i = 0; i < e.length; i++) r[i] = e.charCodeAt(i);
                            e = r.buffer, n[0] = 0
                        }
                        for (var o = e instanceof ArrayBuffer ? e.byteLength : e.size, a = o.toString(), s = new Uint8Array(a.length + 1), i = 0; i < a.length; i++) s[i] = parseInt(a[i]);
                        if (s[a.length] = 255, C) {
                            var c = new C([n.buffer, s.buffer, e]);
                            t(null, c)
                        }
                    })
                }
                s(e, r, function (e, n) {
                    return t(new C(n))
                })
            }, n.decodePayloadAsBinary = function (e, t, r) {
                "function" == typeof t && (r = t, t = null);
                for (var i = e, o = [], a = !1; i.byteLength > 0;) {
                    for (var s = new Uint8Array(i), c = 0 === s[0], u = "", p = 1; 255 != s[p]; p++) {
                        if (u.length > 310) {
                            a = !0;
                            break
                        }
                        u += s[p]
                    }
                    if (a) return r(w, 0, 1);
                    i = d(i, 2 + u.length), u = parseInt(u);
                    var l = d(i, 0, u);
                    if (c) try {
                        l = String.fromCharCode.apply(null, new Uint8Array(l))
                    } catch (f) {
                        var h = new Uint8Array(l);
                        l = "";
                        for (var p = 0; p < h.length; p++) l += String.fromCharCode(h[p])
                    }
                    o.push(l), i = d(i, u)
                }
                var m = o.length;
                o.forEach(function (e, i) {
                    r(n.decodePacket(e, t, !0), i, m)
                })
            }
        }, {
            "./keys": 89,
            after: 102,
            "arraybuffer.slice": 100,
            "base64-arraybuffer": 101,
            blob: 103,
            "has-binary": 63,
            utf8: 99
        }],
        85: [function (e, t) {
            var n = e("has-cors");
            t.exports = function (e) {
                var t = e.xdomain,
                    r = e.xscheme,
                    i = e.enablesXDR;
                try {
                    if ("undefined" != typeof XMLHttpRequest && (!t || n)) return new XMLHttpRequest
                } catch (o) {}
                try {
                    if ("undefined" != typeof XDomainRequest && !r && i) return new XDomainRequest
                } catch (o) {}
                if (!t) try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (o) {}
            }
        }, {
            "has-cors": 104
        }],
        98: [function (e, t, n) {
            function r() {
                return n.colors[p++ % n.colors.length]
            }

            function i(e) {
                function t() {}

                function i() {
                    var e = i,
                        t = +new Date,
                        o = t - (u || t);
                    e.diff = o, e.prev = u, e.curr = t, u = t, null == e.useColors && (e.useColors = n.useColors()), null == e.color && e.useColors && (e.color = r());
                    var a = Array.prototype.slice.call(arguments);
                    a[0] = n.coerce(a[0]), "string" != typeof a[0] && (a = ["%o"].concat(a));
                    var s = 0;
                    a[0] = a[0].replace(/%([a-z%])/g, function (t, r) {
                        if ("%%" === t) return t;
                        s++;
                        var i = n.formatters[r];
                        if ("function" == typeof i) {
                            var o = a[s];
                            t = i.call(e, o), a.splice(s, 1), s--
                        }
                        return t
                    }), "function" == typeof n.formatArgs && (a = n.formatArgs.apply(e, a));
                    var c = i.log || n.log || console.log.bind(console);
                    c.apply(e, a)
                }
                t.enabled = !1, i.enabled = !0;
                var o = n.enabled(e) ? i : t;
                return o.namespace = e, o
            }

            function o(e) {
                n.save(e);
                for (var t = (e || "").split(/[\s,]+/), r = t.length, i = 0; r > i; i++) t[i] && (e = t[i].replace(/\*/g, ".*?"), "-" === e[0] ? n.skips.push(new RegExp("^" + e.substr(1) + "$")) : n.names.push(new RegExp("^" + e + "$")))
            }

            function a() {
                n.enable("")
            }

            function s(e) {
                var t, r;
                for (t = 0, r = n.skips.length; r > t; t++)
                    if (n.skips[t].test(e)) return !1;
                for (t = 0, r = n.names.length; r > t; t++)
                    if (n.names[t].test(e)) return !0;
                return !1
            }

            function c(e) {
                return e instanceof Error ? e.stack || e.message : e
            }
            n = t.exports = i, n.coerce = c, n.disable = a, n.enable = o, n.enabled = s, n.humanize = e("ms"), n.names = [], n.skips = [], n.formatters = {};
            var u, p = 0
        }, {
            ms: 105
        }],
        105: [function (e, t) {
            function n(e) {
                var t = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(e);
                if (t) {
                    var n = parseFloat(t[1]),
                        r = (t[2] || "ms").toLowerCase();
                    switch (r) {
                        case "years":
                        case "year":
                        case "y":
                            return n * p;
                        case "days":
                        case "day":
                        case "d":
                            return n * u;
                        case "hours":
                        case "hour":
                        case "h":
                            return n * c;
                        case "minutes":
                        case "minute":
                        case "m":
                            return n * s;
                        case "seconds":
                        case "second":
                        case "s":
                            return n * a;
                        case "ms":
                            return n
                    }
                }
            }

            function r(e) {
                return e >= u ? Math.round(e / u) + "d" : e >= c ? Math.round(e / c) + "h" : e >= s ? Math.round(e / s) + "m" : e >= a ? Math.round(e / a) + "s" : e + "ms"
            }

            function i(e) {
                return o(e, u, "day") || o(e, c, "hour") || o(e, s, "minute") || o(e, a, "second") || e + " ms"
            }

            function o(e, t, n) {
                return t > e ? void 0 : 1.5 * t > e ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s"
            }
            var a = 1e3,
                s = 60 * a,
                c = 60 * s,
                u = 24 * c,
                p = 365.25 * u;
            t.exports = function (e, t) {
                return t = t || {}, "string" == typeof e ? n(e) : t.long ? i(e) : r(e)
            }
        }, {}],
        88: [function (e, t) {
            function n(e) {
                var t = e && e.forceBase64;
                t && (this.supportsBinary = !1), r.call(this, e)
            }
            var r = e("../transport"),
                i = e("engine.io-parser"),
                o = e("parseqs"),
                a = e("component-inherit"),
                s = e("debug")("engine.io-client:websocket"),
                c = e("ws");
            t.exports = n, a(n, r), n.prototype.name = "websocket", n.prototype.supportsBinary = !0, n.prototype.doOpen = function () {
                if (this.check()) {
                    var e = this.uri(),
                        t = void 0,
                        n = {
                            agent: this.agent
                        };
                    n.pfx = this.pfx, n.key = this.key, n.passphrase = this.passphrase, n.cert = this.cert, n.ca = this.ca, n.ciphers = this.ciphers, n.rejectUnauthorized = this.rejectUnauthorized, this.ws = new c(e, t, n), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.binaryType = "arraybuffer", this.addEventListeners()
                }
            }, n.prototype.addEventListeners = function () {
                var e = this;
                this.ws.onopen = function () {
                    e.onOpen()
                }, this.ws.onclose = function () {
                    e.onClose()
                }, this.ws.onmessage = function (t) {
                    e.onData(t.data)
                }, this.ws.onerror = function (t) {
                    e.onError("websocket error", t)
                }
            }, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (n.prototype.onData = function (e) {
                var t = this;
                setTimeout(function () {
                    r.prototype.onData.call(t, e)
                }, 0)
            }), n.prototype.write = function (e) {
                function t() {
                    n.writable = !0, n.emit("drain")
                }
                var n = this;
                this.writable = !1;
                for (var r = 0, o = e.length; o > r; r++) i.encodePacket(e[r], this.supportsBinary, function (e) {
                    try {
                        n.ws.send(e)
                    } catch (t) {
                        s("websocket closed before onclose event")
                    }
                });
                setTimeout(t, 0)
            }, n.prototype.onClose = function () {
                r.prototype.onClose.call(this)
            }, n.prototype.doClose = function () {
                "undefined" != typeof this.ws && this.ws.close()
            }, n.prototype.uri = function () {
                var e = this.query || {},
                    t = this.secure ? "wss" : "ws",
                    n = "";
                return this.port && ("wss" == t && 443 != this.port || "ws" == t && 80 != this.port) && (n = ":" + this.port), this.timestampRequests && (e[this.timestampParam] = +new Date), this.supportsBinary || (e.b64 = 1), e = o.encode(e), e.length && (e = "?" + e), t + "://" + this.hostname + n + this.path + e
            }, n.prototype.check = function () {
                return !(!c || "__initialize" in c && this.name === n.prototype.name)
            }
        }, {
            "../transport": 94,
            "component-inherit": 107,
            debug: 95,
            "engine.io-parser": 81,
            parseqs: 93,
            ws: 106
        }],
        87: [function (e, t) {
            function n() {}

            function r(e) {
                o.call(this, e), this.query = this.query || {}, s || (i.___eio || (i.___eio = []), s = i.___eio), this.index = s.length;
                var t = this;
                s.push(function (e) {
                    t.onData(e)
                }), this.query.j = this.index, i.document && i.addEventListener && i.addEventListener("beforeunload", function () {
                    t.script && (t.script.onerror = n)
                }, !1)
            }
            var i = self,
                o = e("./polling"),
                a = e("component-inherit");
            t.exports = r;
            var s, c = /\n/g,
                u = /\\n/g;
            a(r, o), r.prototype.supportsBinary = !1, r.prototype.doClose = function () {
                this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), o.prototype.doClose.call(this)
            }, r.prototype.doPoll = function () {
                var e = this,
                    t = document.createElement("script");
                this.script && (this.script.parentNode.removeChild(this.script), this.script = null), t.async = !0, t.src = this.uri(), t.onerror = function (t) {
                    e.onError("jsonp poll error", t)
                };
                var n = document.getElementsByTagName("script")[0];
                n.parentNode.insertBefore(t, n), this.script = t;
                var r = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                r && setTimeout(function () {
                    var e = document.createElement("iframe");
                    document.body.appendChild(e), document.body.removeChild(e)
                }, 100)
            }, r.prototype.doWrite = function (e, t) {
                function n() {
                    r(), t()
                }

                function r() {
                    if (i.iframe) try {
                        i.form.removeChild(i.iframe)
                    } catch (e) {
                        i.onError("jsonp polling iframe removal error", e)
                    }
                    try {
                        var t = '<iframe src="javascript:0" name="' + i.iframeId + '">';
                        o = document.createElement(t)
                    } catch (e) {
                        o = document.createElement("iframe"), o.name = i.iframeId, o.src = "javascript:0"
                    }
                    o.id = i.iframeId, i.form.appendChild(o), i.iframe = o
                }
                var i = this;
                if (!this.form) {
                    var o, a = document.createElement("form"),
                        s = document.createElement("textarea"),
                        p = this.iframeId = "eio_iframe_" + this.index;
                    a.className = "socketio", a.style.position = "absolute", a.style.top = "-1000px", a.style.left = "-1000px", a.target = p, a.method = "POST", a.setAttribute("accept-charset", "utf-8"), s.name = "d", a.appendChild(s), document.body.appendChild(a), this.form = a, this.area = s
                }
                this.form.action = this.uri(), r(), e = e.replace(u, "\\\n"), this.area.value = e.replace(c, "\\n");
                try {
                    this.form.submit()
                } catch (d) {}
                this.iframe.attachEvent ? this.iframe.onreadystatechange = function () {
                    "complete" == i.iframe.readyState && n()
                } : this.iframe.onload = n
            }
        }, {
            "./polling": 108,
            "component-inherit": 107
        }],
        106: [function (e, t) {
            function n(e, t) {
                var n;
                return n = t ? new i(e, t) : new i(e)
            }
            var r = function () {
                    return this
                }(),
                i = r.WebSocket || r.MozWebSocket;
            t.exports = i ? n : null, i && (n.prototype = i.prototype)
        }, {}],
        86: [function (e, t) {
            function n() {}

            function r(e) {
                if (c.call(this, e), a.location) {
                    var t = "https:" == location.protocol,
                        n = location.port;
                    n || (n = t ? 443 : 80), this.xd = e.hostname != a.location.hostname || n != e.port, this.xs = e.secure != t
                }
            }

            function i(e) {
                this.method = e.method || "GET", this.uri = e.uri, this.xd = !!e.xd, this.xs = !!e.xs, this.async = !1 !== e.async, this.data = void 0 != e.data ? e.data : null, this.agent = e.agent, this.isBinary = e.isBinary, this.supportsBinary = e.supportsBinary, this.enablesXDR = e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.create()
            }

            function o() {
                for (var e in i.requests) i.requests.hasOwnProperty(e) && i.requests[e].abort()
            }
            var a = self,
                s = e("xmlhttprequest"),
                c = e("./polling"),
                u = e("component-emitter"),
                p = e("component-inherit"),
                d = e("debug")("engine.io-client:polling-xhr");
            t.exports = r, t.exports.Request = i, p(r, c), r.prototype.supportsBinary = !0, r.prototype.request = function (e) {
                return e = e || {}, e.uri = this.uri(), e.xd = this.xd, e.xs = this.xs, e.agent = this.agent || !1, e.supportsBinary = this.supportsBinary, e.enablesXDR = this.enablesXDR, e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, new i(e)
            }, r.prototype.doWrite = function (e, t) {
                var n = "string" != typeof e && void 0 !== e,
                    r = this.request({
                        method: "POST",
                        data: e,
                        isBinary: n
                    }),
                    i = this;
                r.on("success", t), r.on("error", function (e) {
                    i.onError("xhr post error", e)
                }), this.sendXhr = r
            }, r.prototype.doPoll = function () {
                d("xhr poll");
                var e = this.request(),
                    t = this;
                e.on("data", function (e) {
                    t.onData(e)
                }), e.on("error", function (e) {
                    t.onError("xhr poll error", e)
                }), this.pollXhr = e
            }, u(i.prototype), i.prototype.create = function () {
                var e = {
                    agent: this.agent,
                    xdomain: this.xd,
                    xscheme: this.xs,
                    enablesXDR: this.enablesXDR
                };
                e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized;
                var t = this.xhr = new s(e),
                    n = this;
                try {
                    if (d("xhr open %s: %s", this.method, this.uri), t.open(this.method, this.uri, this.async), this.supportsBinary && (t.responseType = "arraybuffer"), "POST" == this.method) try {
                        this.isBinary ? t.setRequestHeader("Content-type", "application/octet-stream") : t.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                    } catch (r) {}
                    "withCredentials" in t && (t.withCredentials = !0), this.hasXDR() ? (t.onload = function () {
                        n.onLoad()
                    }, t.onerror = function () {
                        n.onError(t.responseText)
                    }) : t.onreadystatechange = function () {
                        4 == t.readyState && (200 == t.status || 1223 == t.status ? n.onLoad() : setTimeout(function () {
                            n.onError(t.status)
                        }, 0))
                    }, d("xhr data %s", this.data), t.send(this.data)
                } catch (r) {
                    return setTimeout(function () {
                        n.onError(r)
                    }, 0), void 0
                }
                a.document && (this.index = i.requestsCount++, i.requests[this.index] = this)
            }, i.prototype.onSuccess = function () {
                this.emit("success"), this.cleanup()
            }, i.prototype.onData = function (e) {
                this.emit("data", e), this.onSuccess()
            }, i.prototype.onError = function (e) {
                this.emit("error", e), this.cleanup(!0)
            }, i.prototype.cleanup = function (e) {
                if ("undefined" != typeof this.xhr && null !== this.xhr) {
                    if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = n : this.xhr.onreadystatechange = n, e) try {
                        this.xhr.abort()
                    } catch (t) {}
                    a.document && delete i.requests[this.index], this.xhr = null
                }
            }, i.prototype.onLoad = function () {
                var e;
                try {
                    var t;
                    try {
                        t = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                    } catch (n) {}
                    e = "application/octet-stream" === t ? this.xhr.response : this.supportsBinary ? "ok" : this.xhr.responseText
                } catch (n) {
                    this.onError(n)
                }
                null != e && this.onData(e)
            }, i.prototype.hasXDR = function () {
                return "undefined" != typeof a.XDomainRequest && !this.xs && this.enablesXDR
            }, i.prototype.abort = function () {
                this.cleanup()
            }, a.document && (i.requestsCount = 0, i.requests = {}, a.attachEvent ? a.attachEvent("onunload", o) : a.addEventListener && a.addEventListener("beforeunload", o, !1))
        }, {
            "./polling": 108,
            "component-emitter": 56,
            "component-inherit": 107,
            debug: 95,
            xmlhttprequest: 85
        }],
        107: [function (e, t) {
            t.exports = function (e, t) {
                var n = function () {};
                n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
            }
        }, {}],
        104: [function (e, t) {
            var n = e("global");
            try {
                t.exports = "XMLHttpRequest" in n && "withCredentials" in new n.XMLHttpRequest
            } catch (r) {
                t.exports = !1
            }
        }, {
            global: 109
        }],
        109: [function (e, t) {
            t.exports = function () {
                return this
            }()
        }, {}],
        108: [function (e, t) {
            function n(e) {
                var t = e && e.forceBase64;
                (!c || t) && (this.supportsBinary = !1), r.call(this, e)
            }
            var r = e("../transport"),
                i = e("parseqs"),
                o = e("engine.io-parser"),
                a = e("component-inherit"),
                s = e("debug")("engine.io-client:polling");
            t.exports = n;
            var c = function () {
                var t = e("xmlhttprequest"),
                    n = new t({
                        xdomain: !1
                    });
                return null != n.responseType
            }();
            a(n, r), n.prototype.name = "polling", n.prototype.doOpen = function () {
                this.poll()
            }, n.prototype.pause = function (e) {
                function t() {
                    s("paused"), n.readyState = "paused", e()
                }
                var n = this;
                if (this.readyState = "pausing", this.polling || !this.writable) {
                    var r = 0;
                    this.polling && (s("we are currently polling - waiting to pause"), r++, this.once("pollComplete", function () {
                        s("pre-pause polling complete"), --r || t()
                    })), this.writable || (s("we are currently writing - waiting to pause"), r++, this.once("drain", function () {
                        s("pre-pause writing complete"), --r || t()
                    }))
                } else t()
            }, n.prototype.poll = function () {
                s("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
            }, n.prototype.onData = function (e) {
                var t = this;
                s("polling got data %s", e);
                var n = function (e) {
                    return "opening" == t.readyState && t.onOpen(), "close" == e.type ? (t.onClose(), !1) : (t.onPacket(e), void 0)
                };
                o.decodePayload(e, this.socket.binaryType, n), "closed" != this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" == this.readyState ? this.poll() : s('ignoring poll - transport state "%s"', this.readyState))
            }, n.prototype.doClose = function () {
                function e() {
                    s("writing close packet"), t.write([{
                        type: "close"
                    }])
                }
                var t = this;
                "open" == this.readyState ? (s("transport open - closing"), e()) : (s("transport not open - deferring close"), this.once("open", e))
            }, n.prototype.write = function (e) {
                var t = this;
                this.writable = !1;
                var n = function () {
                        t.writable = !0, t.emit("drain")
                    },
                    t = this;
                o.encodePayload(e, this.supportsBinary, function (e) {
                    t.doWrite(e, n)
                })
            }, n.prototype.uri = function () {
                var e = this.query || {},
                    t = this.secure ? "https" : "http",
                    n = "";
                return !1 !== this.timestampRequests && (e[this.timestampParam] = +new Date + "-" + r.timestamps++), this.supportsBinary || e.sid || (e.b64 = 1), e = i.encode(e), this.port && ("https" == t && 443 != this.port || "http" == t && 80 != this.port) && (n = ":" + this.port), e.length && (e = "?" + e), t + "://" + this.hostname + n + this.path + e
            }
        }, {
            "../transport": 94,
            "component-inherit": 107,
            debug: 95,
            "engine.io-parser": 81,
            parseqs: 93,
            xmlhttprequest: 85
        }]
    }, {}, [1])(1)
});
