package controllers
                                                                                                                                                                                                                                                   
import (
    "bufio"
    "github.com/astaxie/beego"
    "github.com/garyburd/go-websocket/websocket"
    "net/http"
    "os"
    "path"
    "strings"
)
                                                                                                                                                                                                                                                   
type RecordController struct {
    beego.Controller
}
                                                                                                                                                                                                                                                   
func (this *RecordController) Join() {
    //获取请求端的IP地址
    remoteAddr := strings.Split(this.Ctx.Request.RemoteAddr, ":")[0]
    mlogger.i("Reciving Record Data From Host: " + remoteAddr)
                                                                                                                                                                                                                                              
    //获取websocket的连接实例
    ws, err := websocket.Upgrade(this.Ctx.ResponseWriter, this.Ctx.Request.Header, nil, 1024, 1024)
    if _, ok := err.(websocket.HandshakeError); ok {
    http.Error(this.Ctx.ResponseWriter, "Not a websocket handshake", 400)
        return
    } else if err != nil {
    beego.Error("Cannot setup WebSocket connection:", err)
    return
    }
                                                                                                                                                                                                                                                    
    //以IP地址作为保存wav文件的文件名
    wavName := "record/" + remoteAddr + ".wav"
                                                                                                                                                                                                                                                    
    os.MkdirAll(path.Dir(wavName), os.ModePerm)
    _, e := os.Stat(wavName)
    if e == nil {
        //删除已有wav文件
        os.Remove(wavName)
    }
                                                                                                                                                                                                                                                   
    f, err := os.Create(wavName)
    mlogger.i("Host:  " + remoteAddr + "  creating file handler  ...")
    defer f.Close()
    if err != nil {
        mlogger.e(err)
            return
    }
                                                                                                                                                                                                                                                   
    w := bufio.NewWriter(f)
                                                                                                                                                                                                                                                   
    for {
    //从websocket上读取数据流
    _, p, err := ws.ReadMessage()
    if err != nil {
        mlogger.i("Host:  " + remoteAddr + "  disconnected ...")
        break
    }
                                                                                                                                                                                                                                                   
    length := len(p)
                                                                                                                                                                                                                                                   
    if  length == 4 || length == 5 {
    //length == 4，说明在web上发送ws.send('stop')
    //length == 5，说明在web上发送ws.send('start')
                                                                                                                                                                                                                                      
        action := string(p)
        mlogger.i("Client's action: " + action + " recording !")
                                                                                                                                                                                                                                                              
            if action == "stop" {
        goto SAVE
        } else {
        goto RESTART
        }
    }
                                                                                                                                                                                                                                                   
    w.Write(p)
    continue
                                                                                                                                                                                                                                                   
SAVE:
    mlogger.i("Host:  " + remoteAddr + "  saving wav file wav ...")
    w.Flush()
    mlogger.i("Host:  " + remoteAddr + "  flushing writer ...")
    f.Close()
    mlogger.i("Host:  " + remoteAddr + "  closing the file handler ...")
    continue
                                                                                                                                                                                                                                                    
RESTART:
    os.Remove(wavName)
                                                                                                                                                                                                                                                   
    f, err = os.Create(wavName)
    mlogger.i("Host:  " + remoteAddr + "  creating file handler  ...")
    // defer f.Close()
    if err != nil {
        mlogger.e(err)
        return
    }
                                                                                                                                                                                                                                                    
    w = bufio.NewWriter(f)
    }
    return
}

//服务器就能收到收到数据的samplerate采样率，channels声道数。相应的在golang服务器代码join方法中，
//添加写44位wav头的代码，把这数据头写在裸语音数据缓存的最前端并保存wav文件即可：
type wavHeader []byte
                                   
//wav 44位文件头
func SetHeader(sampleRate int, channel int, length uint32) (header wavHeader) {
    header = make([]byte, 44)
                                   
    chunkSize := length + 36
    header[0] = 'R'
    header[1] = 'I'
    header[2] = 'F'
    header[3] = 'F'
    header[4] = byte(chunkSize & 0xff)
    header[5] = byte((chunkSize >> 8) & 0xff)
    header[6] = byte((chunkSize >> 16) & 0xff)
    header[7] = byte((chunkSize >> 24) & 0xff)
    header[8] = 'W'
    header[9] = 'A'
    header[10] = 'V'
    header[11] = 'E'
    header[12] = 'f'
    header[13] = 'm'
    header[14] = 't'
    header[15] = ' '
    header[16] = 16
    header[17] = 0
    header[18] = 0
    header[19] = 0
    header[20] = 1
    header[21] = 0
    header[22] = byte(channel & 0xff) //1 or 2
    header[23] = 0
    header[24] = byte(sampleRate & 0xff)   //64 8000
    header[25] = byte((sampleRate >> 8) & 0xff)  //31 8000
    header[26] = byte((sampleRate >> 16) & 0xff)   //0
    header[27] = byte((sampleRate >> 24) & 0xff)   //0
    header[28] = byte((sampleRate * 2 * channel) & 0xff) //128 800
    header[29] = byte((sampleRate * 2 * channel) >> 8 & 0xff) //62
    header[30] = byte((sampleRate * 2 * channel) >> 16 & 0xff) //0
    header[31] = byte((sampleRate * 2 * channel) >> 24 & 0xff) //0
    header[32] = byte((channel * 2) & 0xff)       //2 or 4
    header[33] = 0
    header[34] = 16
    header[35] = 0
    header[36] = 'd'
    header[37] = 'a'
    header[38] = 't'
    header[39] = 'a'
    header[40] = byte(length & 0xff)
    header[41] = byte((length >> 8) & 0xff)
    header[42] = byte((length >> 16) & 0xff)
    header[43] = byte((length >> 24) & 0xff)
                                   
    return
                                   
}



beego.Router("/record", &controllers.RecordController{})
beego.Router("/record/join", &controllers.RecordController{}, "get:Join")