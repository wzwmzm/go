package main
import (
    "code.google.com/p/go.net/websocket"
    "fmt"
    "log"
    "net/http"
)

func main() {
    fmt.Println("Start app at http://localhost:4001/index1.html")
    http.Handle("/", websocket.Handler(Echo))
    if err := http.ListenAndServe(":4001", nil); err != nil {
        log.Fatal("ListenAndServe:", err)
    }
}

func Echo(ws *websocket.Conn) {
    var err error
    for {
        var reply string
        if err = websocket.Message.Receive(ws, &reply); err != nil {  //由 ws 接口,收到 reply 消息
            fmt.Println("Can't receive")
            break
        }
        fmt.Println("Received back from client: " + reply)
        msg := "Received:  " + reply
        fmt.Println("Sending to client: " + msg + "_server")
        if err = websocket.Message.Send(ws, msg+"_server"); err != nil {  //由 ws 接口,发送 reply 消息
            fmt.Println("Can't send")
            break
        }
    }
}
