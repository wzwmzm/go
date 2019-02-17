package logf

import (
	"fmt"
	"net/http"
	_ "unsafe"
)

//导入 http 包的私有函数 logf,并以大写首字母导出 Logf
//go:linkname  Logf http.logf
func Logf(r *http.Request, format string, args ...interface{})

//导入 http 包的私有函数 logf,并以大写首字母导出 Logf
//go:linkname  DirList http.dirList
func DirList(w http.ResponseWriter, r *http.Request, f http.File)

func DDD() int {
	fmt.Println("monkey1")
	return 1
}
