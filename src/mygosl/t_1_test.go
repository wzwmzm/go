package mygosl

import (
	"testing"
)

func TestMylib(tst *testing.T) {
	res := SayHello()
	if !res {
		tst.Errorf("test failed\n")
	}
}
