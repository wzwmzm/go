交叉编译命令:目标windows32位:隐藏终端窗口: env GOOS=windows GOARCH=386 go build  -ldflags -H=windowsgui fileserver.go

增加文件信息: ServeHTTP-->serveFile-->dirList-->fmt.Fprint(w,r...)    file.Stat().Size()

logf/logf.go 文件中有 go:linkname, 包级私有函数的导出示范用法

fileserver.go 文件开头有猴子补丁的示范用法