package main

import (
	"encoding/json"
	"fmt"
	"os"
)

//结构体内变量名首字母大写才能直接操作
//配置文件内变量名大小写无关
type proxy struct {
	S_host string
	D_ip   string
	D_port string
}


func must(err error) {
    if err != nil {
        panic(err)
    }
}

func main() {
	file, err := os.Open("proxy.json")
	must(err)
	defer file.Close()

	decoder := json.NewDecoder(file)
	proxys := []proxy{}
	must(decoder.Decode(&proxys))
	fmt.Println(proxys)
	fmt.Println(proxys[0].S_host)
}
