//1,程序功能：读取json文件，并解码到数据结构，修改数据结构值，写回到文件
//2,data中为读取的字节数组[]byte
//3,json.Unmarshal(data,v)实现将json字节码data解码到结构体v中
//4,依靠结构体修改变量值
//5,结构变回在json依靠json.Marshal
//总结：1，文件的存取都是字节码；2，字节码与结构的转换需使用Marshal和Unmarshal；3，如果不想用结构体而直接修改可以string(json字节码),这样就是字符串拼接了

package main

import (
    "io/ioutil"
    "encoding/json"
    "fmt"
)

type Config struct {
    Begin	int64
    Add		int64
    Id		[]int64
    //Df		string
}

func main() {
    config := &Config{}

    data, err := ioutil.ReadFile("./config.json")
    if err != nil {
        return
    }

    err = json.Unmarshal(data, config)
    if err != nil {
        return
    }


    fmt.Println("下面是对结构的显示－－－－－－－－－－－－－－－－－－")
    fmt.Println(config.Begin)
    fmt.Println(config.Add)
    //fmt.Println(config.Df)
    fmt.Printf("%v\n",config.Id)
    fmt.Printf("%+v\n",config)



}



