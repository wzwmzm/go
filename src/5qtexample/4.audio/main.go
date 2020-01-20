//source: http://doc.qt.io/qt-5/qtcharts-audio-example.html
//TODO: leaks memory, probably *_newList

package main

import (
	"os"

	"github.com/therecipe/qt/widgets"
)

func main() {
	var app = widgets.NewQApplication(len(os.Args), os.Args)

	var w = NewWidget(nil, 0) //NewWidget()是moc.go文件自动生成的,是Widget数据结构的接口函数(类Widget的成员函数),这里是初始化了Widget数据结构
	w.Show()

	app.Exec()
}
