package main

import (
	"fmt"
	"net/url"

	"github.com/kataras/iris"

	"github.com/kataras/iris/core/host"
)

//     sudo setcap CAP_NET_BIND_SERVICE=+eip ./main
func main() {
	app := iris.New()
        n := 0
	app.Get("/", func(ctx iris.Context) {
		n = n + 1
		ctx.Writef("欢迎访问 https://gafans.ga  : %d\n", n)
		fmt.Printf("欢迎访问 https://gafans.ga  : %d\n", n)
	})

	app.Get("/mypath", func(ctx iris.Context) {
		ctx.Writef("Hello from the SECURE server on path /mypath")
	})

	// to start a new server listening at :80 and redirects
	// to the secure address, then:
	target, _ := url.Parse("https://gofans.ga:443")           ////
	go host.NewProxy("gofans.ga:80", target).ListenAndServe() ////

	// start the server (HTTPS) on port 443, this is a blocking func
	app.Run(iris.TLS("192.168.2.2:443", "mycert.cer", "mykey.key")) ////<---
	//mycert.cer === fullchain.cer

}
