package main

import (
	//           FFTW 的使用可能需要安装: sudo apt-get install fftw3 fftw3-dev pkg-config

	//	"math"
	//	"math/cmplx"
	"mygosl"
	//"testing"

	//"github.com/cpmech/gosl/chk"
	"github.com/cpmech/gosl/fun/fftw"
	"github.com/cpmech/gosl/io"
)

// tests ///////////////////////////////////////////////////////////////////////////////////////////
//时域数组经过傅里叶正变化后得到频域数组, 这个频域数组再经过傅里叶逆变化后得到的数组除以N可以还原得到原先的时域数组.
func myfft() {

	// set input data
	N := 4                     //采样个数
	x := make([]complex128, N) //采样数据的数组
	for i := 0; i < N; i++ {   //设定采样的数据,在x[i]中, 长度为N, 怎么为复数?
		ii := float64(i * 2)
		x[i] = complex(ii+1, ii+2)
	}
	io.Pf("x = %v\n", x)

	// flags
	inverse := false //false:傅里叶正变换; true:傅里叶逆变换
	measure := false //以测量的方式,比较慢

	// allocate plan
	plan := fftw.NewPlan1d(x, inverse, measure) //得到一种实际方案

	defer plan.Free() //使用完毕必须释放

	// check plan.data
	//chk.ArrayC(tst, "plan.data", 1e-15, plan.data, []complex128{1 + 2i, 3 + 4i, 5 + 6i, 7 + 8i})

	// perform Fourier transform
	plan.Execute() //实际进行傅里叶变量,可以多次执行

	// print output
	io.Pf("正变换后的结果 X = %v\n", x)

	// check output
	//chk.ArrayC(tst, "X", 1e-14, x, test1Xref)
	iplan := fftw.NewPlan1d(x, true, measure)
	defer iplan.Free()
	iplan.Execute()
	for i := 0; i < N; i++ {
		x[i] /= complex(float64(N), 0)
	}
	io.Pf("逆变换后的结果(已除N) X = %v\n", x)
}

func main() {
	mygosl.SayHello()
	myfft()

}
