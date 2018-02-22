package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

func main() {
	////////读入参数
	fmt.Println("比较两个js文件,忽略变量名的不同. 用法: diffjs  文件名1   文件名2")
	if len(os.Args) != 3 {
		fmt.Println("参数错误!")
		return
	}
	s := "   文件1: " + os.Args[1] + "       文件2: " + os.Args[2]
	fmt.Println(s)
	fmt.Println()

	////////测试打开文件
	files := os.Args[1:]
	for _, filename := range files {
		f, err := os.Open(filename)
		if err != nil {
			fmt.Fprintf(os.Stderr, "%v\n", err)
			return
		}
		f.Close()
	}
	///////读取文件内容,ss[]中是读取的文件内容
	fmt.Println("////////////读取文件内容,ss[]中是读取的文件内容///////////////////")
	var ss [2]string
	for i, filename := range files {
		data, err := ioutil.ReadFile(filename)
		if err != nil {
			fmt.Fprintln(os.Stderr, "%v", err)
			return
		}
		fmt.Println("文件" + filename)
		//fmt.Print(string(data))
		ss[i] = string(data)
		fmt.Println(ss[i][:120])
		fmt.Println()
	}

	///////取得较小文件的长度i
	fmt.Println("////////////取得较小文件的长度i///////////////////")
	var i int //较小文件的长度
	if len(ss[0]) > len(ss[1]) {
		i = len(ss[1])
	} else {
		i = len(ss[0])
	}
	fmt.Println(i)

	/////////////////////////
	fmt.Println("///////////////////////////////")
	for ii := 0; ii < i; ii++ {
		//fmt.Print(string(ss[0][ii]))
		if string(ss[0][ii]) == "(" && string(ss[1][ii]) != "(" { //ss[0][ii]即为不相同的地方
			//fmt.Print(string(ss[0][ii]))

			fmt.Println(string(ss[0][ii-300 : ii+300]))
			fmt.Println("///////////////////////////////")
			fmt.Println("///////////////////////////////")
			fmt.Println("///////////////////////////////")
			fmt.Println(string(ss[1][ii-300 : ii+300]))

			fmt.Println()
			return
		}
		//fmt.Print(string(ss[0][ii]))
	}

	fmt.Println()

}
