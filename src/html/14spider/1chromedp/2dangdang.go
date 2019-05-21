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
		chromedp.ActionFunc(func(context.Context) error {
			log.Printf("0,正在打开网页...............")
			return nil
		}),
		//打开网页
		chromedp.Navigate(`http://product.dangdang.com/20003044.html`),	//(第一本)
		//chromedp.Navigate(`http://product.dangdang.com/1439904136.html`),	//(预售版)
		//chromedp.Navigate(`http://product.dangdang.com/23273491.html`),	//(标准版)
		//chromedp.Navigate(`http://product.dangdang.com/26921715.html`),	//(最新版)
		chromedp.ActionFunc(func(context.Context) error {
			log.Printf("1,已打开网页...")
			return nil
		}),
		//拉到页底
		chromedp.WaitVisible(`#footer`),
		chromedp.ActionFunc(func(context.Context) error {
			log.Printf("2,网页到底(#footer)...")
			return nil
		}),
		//点击目录展开键
		chromedp.Click(`#catalog-btn`, chromedp.ByID),
		chromedp.ActionFunc(func(context.Context) error {
			log.Printf("3,已点击目录下拉键...,正在读取书名...")
			return nil
		}),
		//获取书名
		chromedp.Title(&shuming),
		chromedp.ActionFunc(func(context.Context) error {
			log.Printf("4,正在读取作者...")
			return nil
		}),
		//获取作者
		chromedp.Text(`#author > a:nth-child(1)`, &zuozhe, chromedp.NodeVisible,chromedp.ByID),
		chromedp.ActionFunc(func(context.Context) error {
			log.Printf("5,正在读取出版社...")
			return nil
		}),
		//获取出版社
		chromedp.Text(`#product_info > div.messbox_info > span:nth-child(2) > a`, &chubanshe, chromedp.NodeVisible,chromedp.ByID),
		chromedp.ActionFunc(func(context.Context) error {
			log.Printf("6,正在读取出版时间...")
			return nil
		}),
		//获取出版时间
		chromedp.Text(`#product_info > div.messbox_info > span:nth-child(3)`, &chubanshijian, chromedp.NodeVisible,chromedp.ByID),
		chromedp.ActionFunc(func(context.Context) error {
			log.Printf("10, 正在读取目录...")
			return nil
		}),


		//获取目录
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



























