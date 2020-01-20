// Copyright 2016 The Gosl Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
//package fftw
package mygosl

import (
	"math"
	"math/cmplx"
	"testing"

	"github.com/cpmech/gosl/chk"
	"github.com/cpmech/gosl/fun/fftw"
	"github.com/cpmech/gosl/io"
)

// reference results
var test1Xref []complex128
var test2Xref []complex128

// expmix uses Euler's formula to compute exp(-i⋅x) = cos(x) - i⋅sin(x)
func expmix(x float64) complex128 {
	return complex(math.Cos(x), -math.Sin(x))
}

// initialise reference results
func init() {

	x1 := []complex128{1 + 2i, 3 + 4i, 5 + 6i, 7 + 8i}
	test1Xref = dft1d(x1)

	x2 := []complex128{1 + 0i, 2 + 0i, 3 + 0i, 4 + 0i, 5 + 0i, 6 + 0i, 7 + 0i, 8 + 0i}
	test2Xref = dft1d(x2)
}

// tests ///////////////////////////////////////////////////////////////////////////////////////////

func TestOneDver01a(tst *testing.T) {
	//verbose()
	chk.PrintTitle("OneDver01a.  inverse := false   measure := false  非周期函数")

	// set input data
	N := 4
	x := make([]complex128, N)
	for i := 0; i < N; i++ {
		ii := float64(i * 2)
		x[i] = complex(ii+1, ii+2)
	}
	io.Pf("x = %v\n", x)

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

func TestOneDver01b(tst *testing.T) {

	//verbose()
	chk.PrintTitle("OneDver01b. inverse := false   measure := true  非周期函数")

	// set input data
	N := 4
	x := make([]complex128, N)
	for i := 0; i < N; i++ {
		ii := float64(i * 2)
		x[i] = complex(ii+1, ii+2)
	}
	io.Pf("x = %v\n", x)

	// flags
	inverse := false
	measure := true

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

func TestOneDver02(tst *testing.T) {

	//verbose()
	chk.PrintTitle("OneDver02   inverse := false   measure := true 非周期函数")

	// set input data
	N := 8
	x := make([]complex128, N)
	for i := 0; i < N; i++ {
		ii := float64(i)
		x[i] = complex(ii+1, 0)
	}
	io.Pf("x = %v\n", x)

	// flags
	inverse := false
	measure := true

	// allocate plan
	plan := fftw.NewPlan1d(x, inverse, measure)
	defer plan.Free()

	// check plan.data
	//chk.ArrayC(tst, "plan.data", 1e-15, plan.data, []complex128{1, 2, 3, 4, 5, 6, 7, 8})

	// perform Fourier transform
	plan.Execute()

	// print output
	io.Pf("X = %v\n", x)

	// check output
	chk.ArrayC(tst, "X", 1e-13, x, test2Xref)
}

func TestOneDver03(tst *testing.T) {

	//verbose()
	chk.PrintTitle("OneDver03  inverse := false   measure := false  周期函数")

	// set input data
	N := 16
	x := make([]complex128, N)
	for i := 0; i < N; i++ {
		ibyN := float64(i) / float64(N)
		x[i] = complex(math.Cos(ibyN*math.Pi*2), 0)
	}
	io.Pf("复数的实数部分为余弦 x = %v\n", x)

	// allocate plan
	plan := fftw.NewPlan1d(x, false, false)
	defer plan.Free()

	// perform Fourier transform
	plan.Execute()

	// print output and check
	// the real cosine should result in two nonzero frequencies, one at x[1] and one at x[N-1]
	// these frequencies should be real and have amplitude equal to N/2 (fftw doesn't normalize)
	// from: https://github.com/runningwild/go-fftw/blob/master/fftw/fftw_test.go
	for i, v := range x {
		if cmplx.Abs(v) > 1e-14 {
			io.Pf("%g\n", v)
		} else {
			io.Pf("%g\n", 0.0+0.0i)
			i = i + 1 - 1
		}
		//		if i == 1 || i == N-1 {
		//			chk.Complex128(tst, "x[1]", 1e-14, v, complex(float64(N)/2.0, 0))
		//		} else {
		//			chk.Complex128(tst, "x[:]", 1e-14, v, 0.0+0.0i)
		//		}
	}
}

func TestOneDver04(tst *testing.T) {

	//verbose()
	chk.PrintTitle("OneDver04. forward and inverse transforms  非周期")

	// set input data
	N := 4
	x := make([]complex128, N)
	for i := 0; i < N; i++ {
		ii := float64(i * 2)
		x[i] = complex(ii+1, ii+2)
	}
	io.Pf("x = %v\n", x)

	// allocate plan
	inverse := false
	measure := false
	plan := fftw.NewPlan1d(x, inverse, measure)
	defer plan.Free()

	// perform Fourier transform
	plan.Execute()
	io.Pf("正变换的结果 X = %v\n", x)
	chk.ArrayC(tst, "X", 1e-14, x, test1Xref)

	// allocate plan for inverse transform
	inverse = true
	planInv := fftw.NewPlan1d(x, inverse, measure)
	defer planInv.Free()

	// perform inverse Fourier transform
	planInv.Execute()
	io.Pf("逆变换的结果(未除N) X = %v  需要除以N可以得到正确的值\n", x)
	for i := 0; i < N; i++ {
		x[i] /= complex(float64(N), 0)
	}
	io.Pf("逆变换的结果(已除N) X = %v  此为正确的值\n", x)
	chk.ArrayC(tst, "x", 1e-17, x, []complex128{1 + 2i, 3 + 4i, 5 + 6i, 7 + 8i})
}

func TestOneDver05(tst *testing.T) {

	//verbose()
	chk.PrintTitle("OneDver05. forward and inverse transforms  周期函数")

	// function
	π := math.Pi
	f := func(x float64) float64 { return math.Sin(x / 2.0) }

	// constants
	N := 16 // number of terms

	// f @ points
	X := make([]float64, N)
	U := make([]complex128, N)
	Ucopy := make([]complex128, N)
	for i := 0; i < N; i++ {
		X[i] = 2.0 * π * float64(i) / float64(N)
		U[i] = complex(f(X[i]), 0)
		Ucopy[i] = U[i]
	}
	io.Pf("before: U = %.4f\n", U)

	// allocate plan
	inverse := false
	measure := false
	plan := fftw.NewPlan1d(U, inverse, measure)
	defer plan.Free()

	// perform Fourier transform
	plan.Execute()
	io.Pf("正变换后的结果 U = %v\n", U)

	test1Xref = dft1d(Ucopy)
	io.Pf("dft1d的结果 U=%v\n", test1Xref)

	// allocate plan for inverse transform
	inverse = true
	planInv := fftw.NewPlan1d(U, inverse, measure)
	defer planInv.Free()

	// perform inverse Fourier transform
	planInv.Execute()
	for i := 0; i < N; i++ {
		U[i] /= complex(float64(N), 0)
	}
	io.Pf("逆变换后(已除N) U = %v\n", U)
	chk.ArrayC(tst, "U", 1e-15, U, Ucopy)
}

func TestOneDver05_b(tst *testing.T) {

	//verbose()
	chk.PrintTitle("OneDver05_b. forward and inverse transforms  周期函数")

	// function
	π := math.Pi
	f := func(x float64) float64 { return math.Sin(x / 2.0) }

	// constants
	N := 16 // number of terms

	// f @ points
	X := make([]float64, N)
	U := make([]complex128, N)
	Ucopy := make([]complex128, N)
	for i := 0; i < N; i++ {
		X[i] = 2.0 * π * float64(i) / float64(N)
		U[i] = complex(f(X[i]), 0)
		Ucopy[i] = U[i]
	}
	U[N-7] = complex(0, 0)
	Ucopy[N-7] = U[N-7]
	U[N-6] = complex(0, 0)
	Ucopy[N-6] = U[N-6]
	U[N-5] = complex(0, 0)
	Ucopy[N-5] = U[N-5]
	U[N-4] = complex(0, 0)
	Ucopy[N-4] = U[N-4]
	U[N-3] = complex(0, 0)
	Ucopy[N-3] = U[N-3]
	U[N-2] = complex(0, 0)
	Ucopy[N-2] = U[N-2]
	U[N-1] = complex(0, 0)
	Ucopy[N-1] = U[N-1]
	io.Pf("before: U = %.4f\n", U)

	// allocate plan
	inverse := false
	measure := false
	plan := fftw.NewPlan1d(U, inverse, measure)
	defer plan.Free()

	// perform Fourier transform
	plan.Execute()
	io.Pf("正变换后的结果 U = %v\n", U)

	test1Xref = dft1d(Ucopy)
	io.Pf("dft1d的结果 U=%v\n", test1Xref)

	// allocate plan for inverse transform
	inverse = true
	planInv := fftw.NewPlan1d(U, inverse, measure)
	defer planInv.Free()

	// perform inverse Fourier transform
	planInv.Execute()
	for i := 0; i < N; i++ {
		U[i] /= complex(float64(N), 0)
	}
	io.Pf("逆变换后(已除N) U = %v\n", U)
	chk.ArrayC(tst, "U", 1e-15, U, Ucopy)
}

// solution ////////////////////////////////////////////////////////////////////////////////////////

// dft1d compute the discrete Fourier Transform of x (very slow: for testing only)
func dft1d(x []complex128) (X []complex128) {
	N := len(x)
	X = make([]complex128, N)
	for n := 0; n < N; n++ {
		for k := 0; k < N; k++ {
			a := 2.0 * math.Pi * float64(k*n) / float64(N)
			X[n] += x[k] * expmix(a) // x[k]⋅exp(-a)
		}
	}
	return
}
