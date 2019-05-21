// Command click is a chromedp example demonstrating how to use a selector to
// click on an element.
package main

import (
        "context"
        "log"
        "time"

        "github.com/chromedp/chromedp"
)

func main() {
        // create chrome instance
        ctx, cancel := chromedp.NewContext(
                context.Background(),
                chromedp.WithLogf(log.Printf),
        )
        defer cancel()

        // create a timeout
        ctx, cancel = context.WithTimeout(ctx, 10*time.Second)
        defer cancel()

        // navigate to a page, wait for an element, click
	//书名,作者,译者,丛书信息,出版信息,内容简介,标签,ISBN号,定价,页数,封面图
	var shuming string		//书名
	var zuozhe string		//作者
//	var yizhe string		//译者
//	var congshuxingxi string	//丛书信息
	var chubanshe string		//出版社
	var chubanshijian string	//出版时间
//	var neirongjianjie string	//内容简介
//	var biaoqian string		//标签
//	var isbn string        		//ISBN
	var mulu string			//目录
//	var dingjia string		//定价
//	var yeshu string		//页数
//	var fengmian 			//封面图
        err := chromedp.Run(ctx,
                //chromedp.Navigate(`http://product.dangdang.com/20003044.html`),
		//chromedp.Navigate(`http://product.dangdang.com/1439904136.html`),
                chromedp.Navigate(`http://product.dangdang.com/23273491.html`),
		// wait for footer element is visible (ie, page is loaded)
                chromedp.WaitVisible(`#footer`),
                // find and click "Expand All" link
                chromedp.Click(`#catalog-btn`, chromedp.NodeVisible),
                // retrieve the value of the textarea
                //chromedp.Value(`#example_After .play .input textarea`, &example),
                //chromedp.Value(`#catalog-show-all`, &example),
		//chromedp.Text(`#catalog-show-all`, &mulu, chromedp.NodeVisible, chromedp.ByID),
		chromedp.Title(&shuming),
		chromedp.Text(`#author > a`, &zuozhe, chromedp.NodeVisible,chromedp.ByID),
		chromedp.Text(`#product_info > div.messbox_info > span:nth-child(2) > a`, &chubanshe, chromedp.NodeVisible,chromedp.ByID),
		chromedp.Text(`#product_info > div.messbox_info > span:nth-child(3)`, &chubanshijian, chromedp.NodeVisible,chromedp.ByID),
		//chromedp.Text(`#author > a:nth-child(1)`, &zuozhe, chromedp.NodeVisible,chromedp.ByID),
		//chromedp.Text(`#author > a:nth-child(1)`, &zuozhe, chromedp.NodeVisible,chromedp.ByID),
		//chromedp.Text(`#author > a:nth-child(1)`, &zuozhe, chromedp.NodeVisible,chromedp.ByID),
		//chromedp.Text(`#author > a:nth-child(1)`, &zuozhe, chromedp.NodeVisible,chromedp.ByID),
		//chromedp.Text(`#author > a:nth-child(1)`, &zuozhe, chromedp.NodeVisible,chromedp.ByID),
		//chromedp.Text(`#author > a:nth-child(1)`, &zuozhe, chromedp.NodeVisible,chromedp.ByID),

		chromedp.OuterHTML(`#catalog-show-all`, &mulu, chromedp.NodeVisible, chromedp.ByID),
        )
        if err != nil {
                log.Fatal(err)
        }
        log.Printf("Go's time.After 作者:\t%s\n", zuozhe)
	log.Printf("Go's time.After 书名:\t%s\n", shuming)
	log.Printf("Go's time.After 出版社:\t%s\n", chubanshe)
	log.Printf("Go's time.After 出版时间:\t%s\n", chubanshijian)
	//log.Printf("Go's time.After 书名:\t%s\n", shuming)
	//log.Printf("Go's time.After 书名:\t%s\n", shuming)
	//log.Printf("Go's time.After 书名:\t%s\n", shuming)
	//log.Printf("Go's time.After 书名:\t%s\n", shuming)
	//log.Printf("Go's time.After 书名:\t%s\n", shuming)
	//log.Printf("Go's time.After 书名:\t%s\n", shuming)





        log.Printf("Go's time.After 目录:\t%s\n", mulu)

}




