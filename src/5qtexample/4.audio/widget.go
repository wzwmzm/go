package main

import (
	"github.com/therecipe/qt/charts"
	"github.com/therecipe/qt/core"
	"github.com/therecipe/qt/multimedia"
	"github.com/therecipe/qt/widgets"
)

type Widget struct {
	widgets.QWidget

	_ func() `constructor:"init"`

	m_device     *XYSeriesIODevice       //可以显示二维图表的设备
	m_chart      *charts.QChart          //图表数据结构QChart
	m_series     *charts.QLineSeries     //需要图表显示的数据QLineSeries
	m_audioInput *multimedia.QAudioInput //声音输入设备
	//整个过程是:
	//1,声音输入设备m_audioInput的输入数据写入到图表显示输出设备m_device中
	//2,图表显示输出设备m_device关联图表显示数据指针m_series
	//3,图表显示的数据m_series,X坐标axisX,Y坐标axisY包含在图表数据结构m_chart中
	//4,m_chart放入chartView图表显示控件中,chartView放入mainLayout主程序显示设计中完成整个显示!!!
}

func (w *Widget) init() {
	w.m_chart = charts.NewQChart(nil, 0)                //图表数据结构QChart
	var chartView = charts.NewQChartView2(w.m_chart, w) //将图表加入图表视图  QChart->QChartView
	chartView.SetMinimumSize2(800, 600)
	w.m_series = charts.NewQLineSeries(nil) //需要图表显示的数据QLineSeries,现在只是初始化为nil
	w.m_chart.AddSeries(w.m_series)         //将数据加入图表数据结构   QLineSeries->QChart
	//设置X坐标
	var axisX = charts.NewQValueAxis(nil)
	axisX.SetRange(0, 2000)				//X轴长2000
	axisX.SetLabelFormat("%g")
	axisX.SetTitleText("Samples")
	//设置Y坐标
	var axisY = charts.NewQValueAxis(nil)
	axisY.SetRange(-1, 1)
	axisY.SetTitleText("Audio level")
	w.m_chart.SetAxisX(axisX, w.m_series) //给图表设置X坐标
	w.m_chart.SetAxisY(axisY, w.m_series) //给图表设置Y坐标
	w.m_chart.Legend().Hide()
	w.m_chart.SetTitle("Data from the microphone")

	//////将图表视图加入主程序的显示中////////////////////////
	var mainLayout = widgets.NewQVBoxLayout()
	mainLayout.AddWidget(chartView, 0, 0)
	w.SetLayout(mainLayout)

	//设置声音输入
	var formatAudio = multimedia.NewQAudioFormat() //设置声音格式
	formatAudio.SetSampleRate(8000)
	formatAudio.SetChannelCount(1)
	formatAudio.SetSampleSize(8)
	formatAudio.SetCodec("audio/pcm")
	formatAudio.SetByteOrder(multimedia.QAudioFormat__LittleEndian)
	formatAudio.SetSampleType(multimedia.QAudioFormat__UnSignedInt)
	//获取格式化后的声音输入设备
	var inputDevices = multimedia.QAudioDeviceInfo_DefaultInputDevice()       //获取声音输入设备
	w.m_audioInput = multimedia.NewQAudioInput2(inputDevices, formatAudio, w) //取得设置了声音格式后的输入设备. 经常最后一个参数是父窗口,只为了数据回收

	//将显示器看作一个图表显示输出设备
	w.m_device = NewXYSeriesIODevice2(w)        //创建一个图表输出设备
	w.m_device.init(w.m_series.QXYSeries_PTR()) //将图表输出设备与要显示的数据结构关联	QXYSeries->XYSeriesIODevice
	w.m_device.Open(core.QIODevice__WriteOnly)

	w.m_audioInput.Start(w.m_device) //!!!最终,声音输入设备开始往图表显示设备输出数据

	w.ConnectDestroyed(w.destroyed)
}

func (w *Widget) destroyed(*core.QObject) {
	w.m_audioInput.Stop()
	w.m_device.Close()
}
