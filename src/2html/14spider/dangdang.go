// Command click is a chromedp example demonstrating how to use a selector to
// click on an element.
/*
使用方法:
1,config.json文件中可人为设置如下值:
	begin:起始编号;(也就是在当当找到某本书时地址栏显示字串中的数字)
	end:结束编号;(在begin基础上再增加一些,程序会逐个测试这些网页,如果确是一本书则下载相关信息)
	ids:是一个组数,记录需要获取的页编号(这一项目前没有启用)
2,books.json:文件中是一个json数组, 由程序记录获取的每本书的资料
3,wrongid.json:文件中是一个json数组, 由程序记录获取失败的编号
*/
package main

import (
	"io/ioutil"
	"encoding/json"
        "context"
        "log"
        "time"
	"fmt"
        "github.com/chromedp/chromedp"
	"os"
	"strconv"
)

/*
BEGIN	是开始页
ADD	是连续获取的页数
IDS	是单个页
*/
type Config struct {
    Begin       int64
    End         int64
    Ids          []int64
}

type Book struct {
	ID	string	`json:"编号"`
	SM	string	`json:"书名"`
	ZZ	string	`json:"作者"`
	CBS	string	`json:"出版社"`
	CBSJ	string	`json:"出版时间"`
	NRJJ	string	`json:"内容简介"`
	ISBN	string	`json:"ISBN号"`
	ML	string	`json:"目录"`
	JG	string	`json:"价格"`
	PICADDR	string	`json:"封面图片地址"`
}


func main() {
	config := &Config{}
	BOOK := &Book{}
//books.json
        f, err := os.Create("./books.json")//以读写方式建立文件,如果存在则清空,用来保存获取的资料
        if err != nil {
                fmt.Println("创建文件books.json失败,..." + err.Error())
                return
        }
	defer func(){
		f.WriteString("]")//json数组的结束" ] "
		f.Close()
	}()
        _, err = f.WriteString("[")//json数组的开始" [ "
	B_first := true	//用来判断JSON数组间加入逗号
//wrongids.json
        wrongfile, err := os.Create("./wrongids.json")//以读写方式建立文件,如果存在则清空,用来保存获取失败的编号
        if err != nil {
                fmt.Println("创建文件wrongids.json失败,..." + err.Error())
                return
        }
        defer func(){
                wrongfile.WriteString("]")//json数组的结束" ] "
                wrongfile.Close()
        }()
        _, err = wrongfile.WriteString("[")//json数组的开始" [ "
        B_firstwrong := true //用来判断JSON数组间加入逗号
//config.json
	data, err := ioutil.ReadFile("./config.json")
	if err != nil {
		fmt.Println("读取config.json文件失败...")
        	return
   	}

    	err = json.Unmarshal(data, config)
    	if err != nil {
		fmt.Println("json文件转结构体失败...")
        	return
    	}

    	fmt.Println("下面是对结构的显示－－－－－－－－－－－－－－－－－－")
    	fmt.Println("从   ", config.Begin, " 开始－－－")
    	fmt.Println("结束 ", config.End, " ")
    	fmt.Printf("%+v\n",config)

// create chrome instance
	var ctx context.Context
	var cancel context.CancelFunc

	url_begin := config.Begin
	url_end := config.End
	url_ids := config.Ids
	_ = url_ids

LOOP :
        // navigate to a page, wait for an element, click
        //书名,作者,译者,丛书信息,出版信息,内容简介,标签,ISBN号,定价,页数,封面图
        shuming := ""              //书名
        zuozhe := ""               //作者
        chubanshe := ""            //出版社
        chubanshijian := ""        //出版时间
        neirongjianjie := ""       //内容简介
        isbn := ""                 //ISBN
        mulu := ""                 //目录
        jiage := ""                //价格
        picaddr := ""              //封面图片地址
	B_SM, B_CBS, B_CBSJ, B_ZZ, B_NRJJ, B_ML, B_ISBN, B_JG, B_PICADDR := true, true, true, true, true,true, true, true, true

	BOOK.ID = strconv.FormatInt(url_begin,10)
	url := fmt.Sprintf("http://product.dangdang.com/%v.html", url_begin)
	fmt.Println(url)
	if url_begin > url_end { return }//任务是否完成的判断
	url_begin += 1
BEGIN :
        ctx, cancel = chromedp.NewContext(context.Background(), chromedp.WithLogf(log.Printf),)
        defer cancel()

        ctx, cancel = context.WithTimeout(ctx, 20*time.Second)
        defer cancel()

	fmt.Println("   开始----------------------------")
//打开网页
                //chromedp.Navigate(`http://product.dangdang.com/20003044.html`),(第一本)
		//chromedp.Navigate(`http://product.dangdang.com/1439904136.html`),(预售版)
		//chromedp.Navigate(`http://product.dangdang.com/23273491.html`),(标准版)
		//http://product.dangdang.com/26921715.html                      (最新版)
        if err := chromedp.Run(ctx, chromedp.Navigate(url)); err != nil {
		fmt.Printf("1, 打不开网页: %v\n", err)
        	if ! B_firstwrong { wrongfile.WriteString(",") }//JSON字串的每本书之间加入逗号---wrongids.json
		book_json, _ :=json.Marshal(BOOK.ID)//写入错误的编号
		 _, err = wrongfile.Write(book_json)
                if err != nil {
                        fmt.Println("写入wrongids.json文件失败...")
                        return
                }
		B_firstwrong = false
		goto LOOP
	}
//拉到网页底部
	fmt.Printf("1, 网页已打开, 正在展开网页...\n") 
	if err := chromedp.Run(ctx, chromedp.WaitVisible(`#footer`)); err != nil {
		fmt.Printf("2,不能拉到网页底部(#footer): %v\n", err)
                if ! B_firstwrong { wrongfile.WriteString(",") }//JSON字串的每本书之间加入逗号---wrongids.json
		book_json, _ :=json.Marshal(BOOK.ID)//写入错误的编号
                _, err = wrongfile.Write(book_json)
                if err != nil {
                        fmt.Println("写入wrongids.json文件失败...")
                        return
                }
                 B_firstwrong = false
		goto LOOP
 	}
//点击目录展开键
	fmt.Printf("2, 正在点击目录展开键...\n")
	if err := chromedp.Run(ctx, chromedp.Click(`#catalog-btn`, chromedp.NodeVisible)); err != nil {
		fmt.Printf("3, 不能点击目录展开键: %v\n", err)
                if ! B_firstwrong { wrongfile.WriteString(",") }//JSON字串的每本书之间加入逗号---wrongids.json
                book_json, _ :=json.Marshal(BOOK.ID)//写入错误的编号
                _, err = wrongfile.Write(book_json)
        	if err != nil {
                	fmt.Println("写入wrongids.json文件失败...")
        	        return
	        }
                B_firstwrong = false
		goto LOOP
	}
//获取书名
if B_SM {
	fmt.Printf("3, 正在获取书名...\n")
	if err := chromedp.Run(ctx, chromedp.Text(`#product_info > div.name_info > h1`, &shuming,chromedp.NodeVisible, chromedp.ByID)); err != nil {
		fmt.Printf("4, 不能获取书名: %v\n", err)
		B_SM = false
		goto BEGIN
	}
}
//获取目录
if B_ML {
	fmt.Printf("4, 正在获取目录...\n")
	if err := chromedp.Run(ctx, chromedp.OuterHTML(`#catalog-show-all`, &mulu, chromedp.NodeVisible, chromedp.ByID)); err != nil {
		fmt.Printf("5, 不能获取目录: %v\n", err)
		B_ML = false
		goto BEGIN
	}
}
//获取作者
if B_ZZ {
	fmt.Printf("5, 正在获取作者...\n")
	if err := chromedp.Run(ctx, chromedp.Text(`#author > a`, &zuozhe, chromedp.NodeVisible, chromedp.ByID)); err != nil {
		fmt.Printf("6, 不能获取作者: %v\n", err)
		B_ZZ = false
		goto BEGIN
	}
}
//获取出版社
if B_CBS {
	fmt.Printf("6, 正在获取出版社...\n",)
	if err := chromedp.Run(ctx, chromedp.Text(`#product_info > div.messbox_info > span:nth-child(2) > a`, &chubanshe, chromedp.NodeVisible, chromedp.ByID)); err != nil {
		fmt.Printf("7, 不能获取出版社: %v\n", err)
		B_CBS = false
		goto BEGIN
	}
}
//获取出版时间
if B_CBSJ {
	fmt.Printf("7, 正在获取出版时间...\n",)
	if err := chromedp.Run(ctx, chromedp.Text(`#product_info > div.messbox_info > span:nth-child(3)`, &chubanshijian, chromedp.NodeVisible, chromedp.ByID)); err != nil {
		fmt.Printf("8, 不能获取出版时间: %v\n", err)
		B_CBSJ = false
		goto BEGIN
		//return
	}
}
//获取内容简介
if B_NRJJ {
	fmt.Printf("8, 正在获取内容简介\n",)
	if err := chromedp.Run(ctx, chromedp.Text(`#content > div.descrip`, &neirongjianjie, chromedp.NodeVisible, chromedp.ByQuery)); err != nil {
		fmt.Printf("9, 不能获取内容简介: %v\n", err)
		B_NRJJ = false
		goto BEGIN
		//return
	}
}
//获取内容简介
if B_ISBN {
	fmt.Printf("9, 正在获取ISBN\n",)
	if err := chromedp.Run(ctx, chromedp.Text(`#detail_describe > ul > li:nth-child(5)`, &isbn, chromedp.NodeVisible, chromedp.ByQuery)); err != nil {
		fmt.Printf("10, 不能获取ISBN %v\n", err)
		B_ISBN = false
		goto BEGIN
	}
}
//获取价格
if B_JG {
	fmt.Printf("10, 正在获取价格\n",)
	if err := chromedp.Run(ctx, chromedp.Text(`#dd-price`, &jiage, chromedp.NodeVisible, chromedp.ByQuery)); err != nil {
		fmt.Printf("11, 不能获取价格 %v\n", err)
		B_JG = false
		goto BEGIN
	}
}
//获取封面图片地址    #largePic
if B_PICADDR {
	fmt.Printf("11, 正在获取封面图片地址\n",)
	if err := chromedp.Run(ctx, chromedp.OuterHTML(` #largePic`, &picaddr, chromedp.NodeVisible, chromedp.ByQuery)); err != nil {
		fmt.Printf("11, 不能获取封面图片地址 %v\n", err)
		B_PICADDR = false
		goto BEGIN
	}
}

	log.Println("---------------------------------------------------------")
        log.Printf("Go's time.After 作者:\t%s\n", zuozhe)
	log.Printf("Go's time.After 书名:\t%s\n", shuming)
	log.Printf("Go's time.After 出版社:\t%s\n", chubanshe)
	log.Printf("Go's time.After 出版时间:\t%s\n", chubanshijian)
	log.Printf("Go's time.After ISBN:\t%s\n", isbn)
	log.Printf("Go's time.After 价格:\t%s\n", jiage)
	log.Printf("Go's time.After 封面图片地址:\t%s\n", picaddr)
	log.Printf("Go's time.After 内容简介:\t%s\n\n", neirongjianjie)
        log.Printf("Go's time.After 目录:\t%s\n", mulu)

	BOOK.SM = shuming
	BOOK.ZZ = zuozhe
	BOOK.CBS = chubanshe
	BOOK.CBSJ = chubanshijian
	BOOK.ISBN = isbn
	BOOK.JG = jiage
	BOOK.PICADDR = picaddr
	BOOK.NRJJ = neirongjianjie
	BOOK.ML = mulu

        if ! B_first { f.WriteString(",") }//JSON字串的每本书之间加入逗号---books.json
        B_first = false

	book_json,err :=json.MarshalIndent(BOOK,"   ","   ")//MarshalIndent是带縮进的格式; Marshal是紧凑格式
	if err != nil {
		fmt.Println("BOOK结构体转JSON字串失败")
		return
	}
	_, err = f.Write(book_json)


	goto LOOP
}



