package main

import (
	"github.com/kataras/iris"

	"fmt"

	"github.com/kataras/iris/middleware/logger"
	"github.com/kataras/iris/middleware/recover"
)

func main() {
	app := iris.New()
	app.Logger().SetLevel("debug")
	app.Use(recover.New())
	app.Use(logger.New())

	// Method:   GET
	// Resource: http://localhost:8080
	//app.Handle("GET", "/", func(ctx iris.Context) {
	//	ctx.HTML("<h1>Welcome</h1>")
	//})

	app.Any("*", func(ctx iris.Context) {

		path := ctx.Path()
		host := ctx.Host()

		fmt.Println("..." + host + path + "...")

		ctx.Redirect(host + spath)

	})

	app.Run(iris.Addr(":8080"), iris.WithoutServerError(iris.ErrServerClosed))
}
