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
//定义配置文件解析后的结构
type MongoConfig struct {
    MongoAddr      string
    MongoPoolLimit int
    MongoDb        string
    MongoCol       string
}

type Config struct {
    Addr  string
    Mongo MongoConfig
}

func main() {
    JsonParse := NewJsonStruct()
    v := Config{}
    //下面使用的是相对路径，config.json文件和main.go文件处于同一目录下
    JsonParse.Load("./config.json", &v)//读取文件到v，是字节码

    fmt.Println("下面是对结构的显示－－－－－－－－－－－－－－－－－－")
    fmt.Println(v.Addr)
    fmt.Println(v.Mongo.MongoDb)
    fmt.Printf("%v\n",v)
    fmt.Printf("%+v\n",v)

    //下面是修改结构体值，并写回文件
    v.Mongo.MongoDb = v.Mongo.MongoDb + "吴志伟"//必修结构变量值
    fmt.Println(v.Mongo.MongoDb)
    b, err := json.Marshal(v)	//将结构变回json字节码
    if err != nil {
        fmt.Println("error:", err)
    }
    fmt.Println(string(b))

    err = ioutil.WriteFile("./config-1.json", b, 0666) 
    if err != nil {
        fmt.Println("error:", err)
    }


}



type JsonStruct struct {
}

func NewJsonStruct() *JsonStruct {
    return &JsonStruct{}
}

func (jst *JsonStruct) Load(filename string, v interface{}) {
    //ReadFile函数会读取文件的全部内容，并将结果以[]byte类型返回
    data, err := ioutil.ReadFile(filename)
    if err != nil {
        return
    }

    fmt.Println("这是读取的config.json字节码data")
    fmt.Println(data)//这是字节码
    fmt.Println("这是string(data)后")
    fmt.Println(string(data))

    //读取的数据为json格式，需要进行解码
    err = json.Unmarshal(data, v)
    if err != nil {
        return
    }
}

