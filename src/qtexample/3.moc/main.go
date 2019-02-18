package main

import (
	"fmt"
	"os"
	"time"

	"github.com/therecipe/qt/core"
	"github.com/therecipe/qt/widgets"
)

//go:generate qtmoc
type MocLabel struct {
	widgets.QLabel
	_ func(int) `signal:"updateLabel"`
}

func main() {
	widgets.NewQApplication(len(os.Args), os.Args)

	//create a window
	window := widgets.NewQMainWindow(nil, 0)
	window.SetWindowTitle("Hello World Example")
	window.SetMinimumSize2(200, 200)

	//create a layout
	layout := widgets.NewQVBoxLayout()

	//create a widget and set the layout
	widget := widgets.NewQWidget(nil, 0)
	widget.SetLayout(layout)

	//create a moc label
	label := NewMocLabel(nil, 0)
	label.SetAlignment(core.Qt__AlignCenter)

	//wrap the setText function with a custom signal
	label.ConnectUpdateLabel(func(s int) {
		//we are back in the main thread
		//so it's safe to update the label now
		label.SetText(fmt.Sprintf("%v second(s)", s))
	})

	//setup a ticker to update the label in the background
	t := time.Now()
	ticker := time.NewTicker(1 * time.Second)
	go func() {
		for _ = range ticker.C {
			label.UpdateLabel(int(time.Since(t).Seconds()))
		}
	}()

	//add the label to the layout
	layout.AddWidget(label, 0, 0)

	//create a button and add it to the layout
	button := widgets.NewQPushButton2("reset ticker", nil)
	button.ConnectClicked(func(checked bool) {
		label.UpdateLabel(0)
		t = time.Now()
	})
	layout.AddWidget(button, 0, 0)

	//add the widget as the central widget to the window
	window.SetCentralWidget(widget)

	//show the window
	window.Show()

	//enter the main event loop
	widgets.QApplication_Exec()
}
