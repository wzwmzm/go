package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"time"

	"github.com/chromedp/chromedp"
//	"github.com/chromedp/cdproto/cdp"

)

func main() {
	var err error

        // create chrome instance
        ctx, cancel := chromedp.NewContext(
                context.Background(),
                chromedp.WithLogf(log.Printf),
        )
        defer cancel()

        // create a timeout
        ctx, cancel = context.WithTimeout(ctx, 15*time.Second)
        defer cancel()

	// create context
	//ctxt, cancel := context.WithCancel(context.Background())
	//defer cancel()

	// create chrome instance
	//c, err := c.New(ctxt)
	//if err != nil {
	//	log.Fatal(err)
	//}

	// run task list
	var site, res string
	err = chromedp.Run(ctx, googleSearch("site:brank.as", "Easy Money Management", &site, &res))
	
        if err != nil {
                log.Fatal(err)
        }
        log.Printf("saved screenshot of #testimonials from search result listing `%s` (%s)", res, site)
}

func googleSearch(q, text string, site, res *string) chromedp.Tasks {
	var buf []byte
	sel := fmt.Sprintf(`//a[text()[contains(., '%s')]]`, text)
	return chromedp.Tasks{
		chromedp.Navigate(`file:///home/wzw/project/go/src/html/14spider/1chromedp/Google.html`),
		chromedp.Sleep(2 * time.Second),
		chromedp.WaitVisible(`#hplogo`, chromedp.ByID),
		chromedp.SendKeys(`#lst-ib`, q+"\n", chromedp.ByID),
		chromedp.WaitVisible(`#res`, chromedp.ByID),
		chromedp.Text(sel, res),
		chromedp.Click(sel),
		chromedp.Sleep(2 * time.Second),
		chromedp.WaitVisible(`#footer`, chromedp.ByQuery),
		chromedp.WaitNotVisible(`div.v-middle > div.la-ball-clip-rotate`, chromedp.ByQuery),
		chromedp.Location(site),
		chromedp.Screenshot(`#testimonials`, &buf, chromedp.ByID),
		chromedp.ActionFunc(func(context.Context) error {
			return ioutil.WriteFile("testimonials.png", buf, 0644)
		}),
	}
}
