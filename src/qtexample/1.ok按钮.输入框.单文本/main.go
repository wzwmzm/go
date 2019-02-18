// main
package main

import (
	"os"

	//"github.com/therecipe/qt/core"
	"github.com/therecipe/qt/widgets"
)

func main() {
	widgets.NewQApplication(len(os.Args), os.Args)

	window := widgets.NewQMainWindow(nil, 0)
	window.SetWindowTitle("你好吴志伟")
	window.SetMinimumSize2(300, 300)

	layout := widgets.NewQVBoxLayout()
	widget := widgets.NewQWidget(nil, 0)
	widget.SetLayout(layout)

	input := widgets.NewQLineEdit(nil)
	input.SetPlaceholderText("1, 请输入")
	layout.AddWidget(input, 0, 0)

	button := widgets.NewQPushButton2("2, 输入后按我", nil)
	button.ConnectClicked(func(checked bool) {
		widgets.QMessageBox_Information(nil, "OK", input.Text(), widgets.QMessageBox__Ok, widgets.QMessageBox__Ok)
	})
	layout.AddWidget(button, 0, 0)

	window.SetCentralWidget(widget)

	window.Show()

	widgets.QApplication_Exec()

}
