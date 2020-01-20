package main

import "github.com/kataras/iris"

func newApp() *iris.Application {
    app := iris.New()

    // Set A Cookie.
    app.Get("/cookies/{name}/{value}", func(ctx iris.Context) {
        name := ctx.Params().Get("name")
        value := ctx.Params().Get("value")

        ctx.SetCookieKV(name, value)

        ctx.Writef("cookie added: %s = %s", name, value)
    })

    // Retrieve A Cookie.
    app.Get("/cookies/{name}", func(ctx iris.Context) {
        name := ctx.Params().Get("name")

        value := ctx.GetCookie(name)

        ctx.WriteString(value)
    })

    // Delete A Cookie.
    app.Delete("/cookies/{name}", func(ctx iris.Context) {
        name := ctx.Params().Get("name")

        ctx.RemoveCookie(name)

        ctx.Writef("cookie %s removed", name)
    })

    return app
}

func main() {
    app := newApp()

    // GET:    http://localhost:8080/cookies/my_name/my_value
    // GET:    http://localhost:8080/cookies/my_name
    // DELETE: http://localhost:8080/cookies/my_name
    app.Run(iris.Addr(":8080"))
}