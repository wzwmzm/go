package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
	"os"
	//GBK<->UTF8中文转码： go get github.com/axgle/mahonia
	"github.com/axgle/mahonia"
)

func main() {

	resp, err := http.Get("http://product.dangdang.com/20003044.html")
	if err != nil {
		// handle error
		fmt.Println("未取到网页")
		os.Exit(1) 
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	str := string(body)
	ret := ConvertToByte(str, "gbk", "utf8")
	fmt.Println(string(ret))

   	os.Exit(0)

}


//src为要转换的字符串，srcCode为待转换的编码格式，targetCode为要转换的编码格式
func ConvertToByte(src string, srcCode string, targetCode string) []byte {
    srcCoder := mahonia.NewDecoder(srcCode)
    srcResult := srcCoder.ConvertString(src)
    tagCoder := mahonia.NewDecoder(targetCode)
    _, cdata, _ := tagCoder.Translate([]byte(srcResult), true)
    return cdata
}
