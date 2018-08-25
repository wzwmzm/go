package main

import (
	"fmt"
	"net/http"
)

func main() {

	http.Handle("/", http.FileServer(http.Dir("/")))
	//http.Handle("/c/", http.FileServer(http.Dir("C:\\")))
	//http.Handle("/d/", http.FileServer(http.Dir("D:\\")))

	fmt.Println("http://localhost:8080")
	fmt.Println("http://localhost:8080/c/")
	fmt.Println("http://localhost:8080/d/")
	fmt.Println("只能下载,无法上传")
	fmt.Println(`隐藏终端窗口使用: go build -ldflags="-H windows" fs.go`)

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println(err)
	}

}
