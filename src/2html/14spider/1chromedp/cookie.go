// Command cookie is a chromedp example demonstrating how to set a HTTP cookie
// on requests.
package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/cdproto/network"
	"github.com/chromedp/chromedp"
)

var (
	flagPort = flag.Int("port", 8544, "port")
)

func main() {
	flag.Parse()

	// start cookie server
	go cookieServer(fmt.Sprintf(":%d", *flagPort))

	// create context
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	// run task list
	var res string
	err := chromedp.Run(ctx, setcookies(
		fmt.Sprintf("http://localhost:%d", *flagPort), &res,
		"cookie1", "value1",
		"cookie2", "value2",
	))
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("chrome received cookies(假,只是网页变量): %s", res)
}

// cookieServer creates a simple HTTP server that logs any passed cookies.
func cookieServer(addr string) error {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(res http.ResponseWriter, req *http.Request) {
		cookies := req.Cookies()
		for i, cookie := range cookies {
			log.Printf("from %s, server received cookie(服务器收到的cookie,只是客户端选择发送的部分) %d: %v", req.RemoteAddr, i, cookie)				//服务器端收到的客户端cookie
		}	
		buf, err := json.MarshalIndent(req.Cookies(), "", "  ")
		if err != nil {
			http.Error(res, err.Error(), http.StatusInternalServerError)
			return
		}
		fmt.Fprintf(res, indexHTML, string(buf))//将cookie写入网页
	})
	return http.ListenAndServe(addr, mux)
}

// setcookies returns a task to navigate to a host with the passed cookies set
// on the network request.
func setcookies(host string, res *string, cookies ...string) chromedp.Tasks {
	if len(cookies)%2 != 0 {
		panic("length of cookies must be divisible by 2")
	}
	return chromedp.Tasks{
		chromedp.ActionFunc(func(ctx context.Context) error {
			//此段是将cookie写入请求头并发送给服务器
			// create cookie expiration
			expr := cdp.TimeSinceEpoch(time.Now().Add(180 * 24 * time.Hour))
			// add cookies to chrome
			for i := 0; i < len(cookies); i += 2 {
				success, err := network.SetCookie(cookies[i], cookies[i+1]).
					WithExpires(&expr).
					WithDomain("localhost").
					WithHTTPOnly(true).
					Do(ctx)
				if err != nil {
					return err
				}
				if !success {
					return fmt.Errorf("could not set cookie %q to %q", cookies[i], cookies[i+1])
				}
			}
			return nil
		}),
		// navigate to site
		chromedp.Navigate(host),
		// read the returned values
		chromedp.Text(`#result`, res, chromedp.ByID, chromedp.NodeVisible),//这里是取到网页的变量,不是真的cookie
		// read network values
		chromedp.ActionFunc(func(ctx context.Context) error {
			//这里是客户端取得的cookie
			cookies, err := network.GetAllCookies().Do(ctx)
			if err != nil {
				return err
			}

			for i, cookie := range cookies {
				log.Printf("chrome cookie(真,客户端保存的所有cookie) %d: %+v", i, cookie)
			}

			return nil
		}),
	}
}

const (
	indexHTML = `<!doctype html>
<html>
<body>
  <div id="result">%s</div>
</body>
</html>`
)
