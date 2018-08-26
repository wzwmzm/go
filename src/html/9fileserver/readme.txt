交叉编译命令:目标windows32位:隐藏终端窗口: env GOOS=windows GOARCH=386 go build  -ldflags -H=windowsgui fileserver.go

增加文件信息: ServeHTTP-->serveFile-->dirList-->fmt.Fprint(w,r...)    file.Stat().Size()