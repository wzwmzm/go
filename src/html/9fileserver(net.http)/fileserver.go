package main

import (
	"fmt"
	"net/http"
	"os"
)

//交叉编译命令:目标windows32位:隐藏终端窗口: env GOOS=windows GOARCH=386 go build  -ldflags -H=windowsgui fileserver.go

func main() {

	http.HandleFunc("/", sayhello)
	http.HandleFunc("/quit", quit)
	http.Handle("/root/", http.StripPrefix("/root/", http.FileServer(http.Dir("/"))))
	http.Handle("/c/", http.StripPrefix("/c/", http.FileServer(http.Dir("C:\\"))))
	http.Handle("/d/", http.StripPrefix("/d/", http.FileServer(http.Dir("D:\\"))))
	http.Handle("/e/", http.StripPrefix("/e/", http.FileServer(http.Dir("E:\\"))))
	http.Handle("/f/", http.StripPrefix("/f/", http.FileServer(http.Dir("F:\\"))))
	fmt.Println("http://gofans.ga:8888...")
	fmt.Println("http://localhost:8888...")
	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		fmt.Println(err)
	}

}

func quit(w http.ResponseWriter, r *http.Request) {
	fmt.Println("退出...")
	os.Exit(0)
}

func sayhello(w http.ResponseWriter, r *http.Request) {

	fmt.Println("首页...")

	fmt.Fprintf(w, `http://目标主机IP:8080       (显示本提示页) (注意:未命中的地址都会显示本页!!!)
http://目标主机IP:8080/c     (WINDOWS 的 C:盘)
http://目标主机IP:8080/d     (WINDOWS 的 D:盘)
http://目标主机IP:8080/e     (WINDOWS 的 E:盘)
http://目标主机IP:8080/f     (WINDOWS 的 F:盘)
http://目标主机IP:8080/root  (LINUX 的根目录)
http://目标主机IP:8080/quit  (退出WEB服务!!!)
已知类型文件可以直接打开显示,或者通过"另存为..."来下载. 未知类型文件可以直接下载保存.
*******************************************************************************************************
T2入境前台IP=6.0.106.30+N (N=1--56, 缺 1,3, 29,30, 49,50)  T2出境前台IP=6.0.106.120+N (N=1--44, 缺 21,22) 
T2入境后台IP=6.0.106.114--120,186                          T2出境后台IP=6.0.106.94, 100,102,113,190,201
T2入境机组IP=6.0.106.207, 208                              T2出境机组IP=6.0.106.168, 202
T2入境采集IP=6.0.106.205, 206                              T2出境自助IP=6.0.107.40+N (N=1--28), 40,39
T2入境自助IP=6.0.107.70+N (N=1--38)                        T2出境
		
		
		
		
                                                                              吴志伟 201808 V1.0
	
	`) //这个写入到w的是输出到客户端的
}
