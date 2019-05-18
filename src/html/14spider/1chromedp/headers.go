// Command headers is a chromedp example demonstrating how to set a HTTP header
// on requests.
// 1,客户端组装自己特定的请求头, 然后请求网页
// 2,服务器端收到请求后,解析客户端请求头,并将客户端请求头写入网页一并发给客户端
// 3,客户端收到网页后读取并打印 result 内容,也就是自己发送的请求头
package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/chromedp/cdproto/network"
	"github.com/chromedp/chromedp"
)

var (
	flagPort = flag.Int("port", 8544, "port")
)

func main() {
	flag.Parse()

	// run server
	go headerServer(fmt.Sprintf(":%d", *flagPort))

	// create context
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	// run task list
	var res string
	err := chromedp.Run(ctx, setheaders(
		fmt.Sprintf("http://localhost:%d", *flagPort),
		map[string]interface{}{
			"X-Header": "my request header 吴志伟",
		},
		&res,
	))
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("received headers: %s", res)
}

// headerServer is a simple HTTP server that displays the passed headers in the html.
//将请求头内的字串嵌入到网页的'result'内
func headerServer(addr string) error {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(res http.ResponseWriter, req *http.Request) {
		buf, err := json.MarshalIndent(req.Header, "", "  ")//读取请求头内容并写入buf中
		if err != nil {
			http.Error(res, err.Error(), http.StatusInternalServerError)
			return
		}
		fmt.Fprintf(res, indexHTML, string(buf))//将buf内容也就是请求头内容写入到网页中
	})
	return http.ListenAndServe(addr, mux)
}

// setheaders returns a task list that sets the passed headers.
// 1,组装自己的请求头
// 2,请求网页
// 3,读取网页内的'result'字串,赋值给 res . 这个 result 其实就是自己传给网页的请求头
func setheaders(host string, headers map[string]interface{}, res *string) chromedp.Tasks {
	return chromedp.Tasks{
		network.Enable(),
		network.SetExtraHTTPHeaders(network.Headers(headers)),	//组装自己的请求头
		chromedp.Navigate(host),				//向服务器请求网页
		chromedp.Text(`#result`, res, chromedp.ByID, chromedp.NodeVisible),//取得网页中result内容
	}
}

const indexHTML = `<!doctype html>
<html>
<body>
  <div id="result">%s</div>
</body>
</html>`
