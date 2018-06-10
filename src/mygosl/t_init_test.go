// Copyright 2016 The Gosl Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package mylib

import (
	"github.com/cpmech/gosl/chk"
	"github.com/cpmech/gosl/io"
)

func init() { //这个init()初始化函数会被一次性执行
	io.Verbose = true
	chk.Verbose = true
}

func verbose() { //这个函数调用时才被执行
	io.Verbose = false
	chk.Verbose = false

}
