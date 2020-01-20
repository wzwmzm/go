package main

import (
	"github.com/therecipe/qt/charts"
	"github.com/therecipe/qt/core"
)

//图表显示输出设备
type XYSeriesIODevice struct {
	core.QIODevice

	//TODO: custom constructors
	//_ func(series *charts.QXYSeries) `constructor:"init"`

	m_series *charts.QXYSeries //需要显示的数据，audioInput的输入数据即在此
}

func (d *XYSeriesIODevice) init(series *charts.QXYSeries) {
	d.m_series = series

	d.ConnectReadData(d.readData)
	d.ConnectWriteData(d.writeData)
}

func (d *XYSeriesIODevice) readData(data *string, maxSize int64) int64 {
	return -1
}

//将data的数据添加到d.m_series的后面. data的数据变换为X(0,2000) Y(-1,+1)
func (d *XYSeriesIODevice) writeData(data string, maxSize int64) int64 {
	var rang = 2000 //X轴长2000
	var oldPoints = d.m_series.PointsVector()
	var points []*core.QPointF
	var resolution int64 = 4

	if len(oldPoints) < rang {
		points = d.m_series.PointsVector()
	} else {
		for i := int64(maxSize / resolution); i < int64(len(oldPoints)); i++ {
			points = append(points, core.NewQPointF3(float64(i-maxSize/resolution), oldPoints[i].Y()))
		}
	}

	var size = int64(len(points))
	for k := int64(0); k < int64(maxSize/resolution); k++ {
		var y = float64([]byte(data)[resolution*k]-128) / 128.0 //Y值变换(-1,1)
		if y > 1 {
			y -= 2
		}
		points = append(points, core.NewQPointF3(float64(k+size), y)) //将data的数据添加到d.m_series的后面
	}

	d.m_series.Replace5(points) //老的点用新的点替换(坐标变换)
	return maxSize
}
