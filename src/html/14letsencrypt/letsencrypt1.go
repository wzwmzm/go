// Package main provide one-line integration with letsencrypt.org
package main

import (
	"fmt"

	"github.com/kataras/iris"
)

//sudo setcap CAP_NET_BIND_SERVICE=+eip ./letsencrypt1

func main() {
	app := iris.New()

	app.Get("/", func(ctx iris.Context) {
		ctx.Writef("Hello from SECURE SERVER!")
	})

	app.Get("/test2", func(ctx iris.Context) {
		ctx.Writef("Welcome to secure server from /test2!")
	})

	app.Get("/redirect", func(ctx iris.Context) {
		ctx.Redirect("/test2")
	})

	// NOTE: This will not work on domains like this,
	// use real whitelisted domain(or domains split by whitespaces)
	// and a non-public e-mail instead.
	fmt.Println("http://gofans.ga...  将要自动生成的证书在 letscache 目录")
	app.Run(iris.AutoTLS("gofans.ga:443", "gofans.ga www.gofans.ga", "wzwmzm41@gmail.com"))
}
