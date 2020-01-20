// Command click is a chromedp example demonstrating how to use a selector to
// click on an element.
package main

import (
        "context"
        "log"
        "time"
	"fmt"
        "github.com/chromedp/chromedp"
)

func main() {
        // navigate to a page, wait for an element, click
	//书名,作者,译者,丛书信息,出版信息,内容简介,标签,ISBN号,定价,页数,封面图
	var shuming string		//书名
	var zuozhe string		//作者
//	var yizhe string		//译者
//	var congshuxingxi string	//丛书信息
	var chubanshe string		//出版社
	var chubanshijian string	//出版时间
	var neirongjianjie string	//内容简介
//	var biaoqian string		//标签
	var isbn string        		//ISBN
	var mulu string			//目录
	var jiage string		//价格
//	var yeshu string		//页数
	var picaddr string		//封面图片地址

// create chrome instance
var ctx context.Context
var cancel context.CancelFunc

LOOP :
	B_SM, B_CBS, B_CBSJ, B_ZZ, B_NRJJ, B_ML, B_ISBN, B_JG, B_PICADDR := true, true, true, true, true,true, true, true, true
//
BEGIN :
//begin := func(ctx *context.Context, cancel *context.CancelFunc){
        ctx, cancel = chromedp.NewContext(context.Background(), chromedp.WithLogf(log.Printf),)
        defer cancel()

        // create a timeout
        ctx, cancel = context.WithTimeout(ctx, 5*time.Second)
        defer cancel()


	fmt.Println("   开始----------------------------")

	 if err := chromedp.Run(ctx,chromedp.ActionFunc(func(context.Context) error {
		fmt.Println("0, 测试chromedp.Run...............")
		return nil	//ActionFunc的返回码
	})); err!= nil { 
		fmt.Printf("0, chromedp.Run测试失败........")
		goto LOOP
		//return 1	//head()的返回码
	}

//打开网页
	// navigate
                //chromedp.Navigate(`http://product.dangdang.com/20003044.html`),(第一本)
		//chromedp.Navigate(`http://product.dangdang.com/1439904136.html`),(预售版)
		//chromedp.Navigate(`http://product.dangdang.com/23273491.html`),(标准版)
		//http://product.dangdang.com/26921715.html                      (最新版)
	if err := chromedp.Run(ctx, chromedp.Navigate(`http://product.dangdang.com/20003044.html`)); err != nil {
	//if err := chromedp.Run(ctx, chromedp.Navigate(`http://product.dangdang.com/26921715.html`)); err != nil {
	//if err := chromedp.Run(ctx, chromedp.Navigate(`http://product.dangdang.com/1439904136.html`)); err != nil {
	//if err := chromedp.Run(ctx, chromedp.Navigate(`http://product.dangdang.com/23273491.html`)); err != nil {
	//if err := chromedp.Run(ctx, chromedp.Navigate(`http://www.google.com`)); err != nil {
		fmt.Printf("1, 打不开网页: %v\n", err)
		goto LOOP
		//return 2	//head()的返回码
	}
//拉到网页底部
	fmt.Printf("1, 网页已打开, 正在展开网页...\n") 
	if err := chromedp.Run(ctx, chromedp.WaitVisible(`#footer`)); err != nil {
		fmt.Printf("2,不能拉到网页底部(#footer): %v\n", err)
		goto LOOP
		//return 3 	//head()的返回码
	}
//点击目录展开键
	fmt.Printf("2, 正在点击目录展开键...\n")
	if err := chromedp.Run(ctx, chromedp.Click(`#catalog-btn`, chromedp.NodeVisible)); err != nil {
		fmt.Printf("3, 不能点击目录展开键: %v\n", err)
		goto LOOP		
		//return 4	//head()的返回码
	}
//}//BEGIN()





//	begin(&ctx, &cancel)
//获取书名
if B_SM {
	fmt.Printf("3, 正在获取书名...\n")
	if err := chromedp.Run(ctx, chromedp.Text(`#product_info > div.name_info > h1`, &shuming,chromedp.NodeVisible, chromedp.ByID)); err != nil {
		fmt.Printf("4, 不能获取书名: %v\n", err)
		B_SM = false
		goto BEGIN
		//return
	}
}
//获取目录
if B_ML {
	fmt.Printf("4, 正在获取目录...\n")
	if err := chromedp.Run(ctx, chromedp.OuterHTML(`#catalog-show-all`, &mulu, chromedp.NodeVisible, chromedp.ByID)); err != nil {
		fmt.Printf("5, 不能获取目录: %v\n", err)
		B_ML = false
		goto BEGIN
		//return
	}
}
//获取作者
if B_ZZ {
	fmt.Printf("5, 正在获取作者...\n")
	if err := chromedp.Run(ctx, chromedp.Text(`#author > a`, &zuozhe, chromedp.NodeVisible, chromedp.ByID)); err != nil {
		fmt.Printf("6, 不能获取作者: %v\n", err)
		B_ZZ = false
		goto BEGIN
		//return
	}
}
//获取出版社
if B_CBS {
	fmt.Printf("6, 正在获取出版社...\n",)
	if err := chromedp.Run(ctx, chromedp.Text(`#product_info > div.messbox_info > span:nth-child(2) > a`, &chubanshe, chromedp.NodeVisible, chromedp.ByID)); err != nil {
		fmt.Printf("7, 不能获取出版社: %v\n", err)
		B_CBS = false
		goto BEGIN
		//return
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
		//return
	}
}
//获取价格
if B_JG {
	fmt.Printf("10, 正在获取价格\n",)
	if err := chromedp.Run(ctx, chromedp.Text(`#dd-price`, &jiage, chromedp.NodeVisible, chromedp.ByQuery)); err != nil {
		fmt.Printf("11, 不能获取价格 %v\n", err)
		B_JG = false
		goto BEGIN
		//return
	}
}
//获取封面图片地址    #largePic
if B_PICADDR {
	fmt.Printf("11, 正在获取封面图片地址\n",)
	if err := chromedp.Run(ctx, chromedp.OuterHTML(` #largePic`, &picaddr, chromedp.NodeVisible, chromedp.ByQuery)); err != nil {
		fmt.Printf("11, 不能获取封面图片地址 %v\n", err)
		B_PICADDR = false
		goto BEGIN
		//return
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
	//log.Printf("Go's time.After 书名:\t%s\n", shuming)
	//log.Printf("Go's time.After 书名:\t%s\n", shuming)
	log.Printf("Go's time.After 内容简介:\t%s\n\n", neirongjianjie)
        log.Printf("Go's time.After 目录:\t%s\n", mulu)


}



