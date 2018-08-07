package main

import "github.com/kataras/iris"

func main() {
	app := iris.Default()

	app.Get("/pong", func(ctx iris.Context) {
		ctx.JSON(iris.Map{
			"message": "pong吴志伟",
		})
	})
	// http://localhost:8080/pong

	//Parameters in path
	// This handler will match /user/kataras but will not match neither /user/ or /user.
	app.Get("/user/{name}", func(ctx iris.Context) {
		name := ctx.Params().Get("name")
		ctx.Writef("<H1>Hello %s<H1>", name)
	})
	// http://localhost:8080/user/吴志伟

	// This handles the /user/kataras/42
	// and fires 400 bad request if /user/kataras/string.
	// The "else 400" is optionally:
	// by-default it will fire 404 not found if alphanumeric instead
	// of number passed on the "age" parameter.
	app.Get("/user/{name:string}/{age:int else 400}", func(ctx iris.Context) {
		name := ctx.Params().Get("name")
		age, _ := ctx.Params().GetInt("age")
		ctx.Writef("%s is %d years old", name, age)
	})
	// http://localhost:8080/user/吴志伟/26

	// However, this one will match /action/{user}/star and also /action/{user}/stars
	// or even /action/{user}/likes/page/2.
	// It should match anything after the /action/{user}/
	// except the /action/{user}/static which is handled by the below route.
	app.Get("/action/{user:string}/{action:path}", func(ctx iris.Context) {
		user := ctx.Params().Get("user")
		action := ctx.Params().Get("action")
		ctx.Writef("user: %s | action: %s", user, action)
	})
	// http://localhost:8080/action/吴志伟/26/上海/江苏

	// Unlike other frameworks and routers,
	// Iris is smart enough to understand that this is not the previous,
	// wildcard of type path route, it should only match the /action/{user}/static.
	app.Get("/action/{user:string}/static", func(ctx iris.Context) {
		user := ctx.Params().Get("user")
		ctx.Writef("static path for user: %s", user)
	})
	// http://localhost:8080/user/kataras
	// http://localhost:8080/user/kataras/25
	// http://localhost:8080/action/kataras/upgrade
	// http://localhost:8080/action/kataras/static

	//Querystring parameters
	// Query string parameters are parsed using the existing underlying request object.
	// The request responds to a url matching:  /welcome?firstname=Jane&lastname=Doe.
	app.Get("/welcome", func(ctx iris.Context) {
		firstname := ctx.URLParamDefault("firstname", "Guest")
		// shortcut for ctx.Request().URL.Query().Get("lastname").
		lastname := ctx.URLParam("lastname")

		ctx.Writef("Hello %s %s", firstname, lastname)
	})
	//http://localhost:8080/welcome?firstname=Jane&lastname=Doe

	//////////////////////////////////////////////////////////////////////////////////////////////////
	//Multipart/Urlencoded Form
	app.Get("/testpost", func(ctx iris.Context) {
		ctx.Writef(`
		<html>
			<form action='/form_post' method='post'>
			    message: <input type="text" name="message">
   				nick: <input type="text" name="nick">
	 
	   			 <input type='submit' id='submit'>
			</form>
		</html>`)
	})
	app.Post("/form_post", func(ctx iris.Context) {
		message := ctx.FormValue("message")
		nick := ctx.FormValueDefault("nick", "anonymous")

		ctx.JSON(iris.Map{
			"status":  "posted",
			"message": message,
			"nick":    nick,
		})
	})
	//http://localhost:8080/testpost

	//Another example: query + post form
	app.Get("/testpostquery", func(ctx iris.Context) {
		ctx.Writef(`
		<html>
			<form action='/form_postquery?id=123&page=321' method='post'>
			    message: <input type="text" name="message">
   				name: <input type="text" name="name">
	 
	   			 <input type='submit' id='submit'>
			</form>
		</html>`)
	})
	app.Post("/form_postquery", func(ctx iris.Context) {
		id := ctx.URLParam("id")
		page := ctx.URLParamDefault("page", "0")
		name := ctx.FormValue("name")
		message := ctx.FormValue("message")
		// or `ctx.PostValue` for POST, PUT & PATCH-only HTTP Methods.

		app.Logger().Infof("id: %s; page: %s; name: %s; message: %s", id, page, name, message)
	})
	//http://localhost:8080/testpostquery

	// Listen and serve on http://localhost:8080.
	app.Run(iris.Addr(":8080"))
}
