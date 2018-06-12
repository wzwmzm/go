package mylib

import (
	//	"math"
	//	"math/cmplx"
	"testing"

	"github.com/cpmech/gosl/chk"
	"github.com/cpmech/gosl/fun/fftw"
	"github.com/cpmech/gosl/io"
)

// tests ///////////////////////////////////////////////////////////////////////////////////////////

func Test(tst *testing.T) {

	//verbose()
	chk.PrintTitle("OneDver01a.")

	// set input data
	N := 4
	x := make([]complex128, N)
	for i := 0; i < N; i++ {
		ii := float64(i * 2)
		x[i] = complex(ii+1, ii+2)
	}

	// flags
	inverse := false
	measure := false

	// allocate plan
	plan := fftw.NewPlan1d(x, inverse, measure)

	defer plan.Free()

	// check plan.data
	//chk.ArrayC(tst, "plan.data", 1e-15, plan.data, []complex128{1 + 2i, 3 + 4i, 5 + 6i, 7 + 8i})

	// perform Fourier transform
	plan.Execute()

	// print output
	io.Pf("X = %v\n", x)

	// check output
	chk.ArrayC(tst, "X", 1e-14, x, test1Xref)
}
