// Command eval is a chromedp example demonstrating how to evaluate javascript
// and retrieve the result.
package main

import (
	"context"
	"log"
	"time"
	"github.com/chromedp/chromedp"
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
        ctx, cancel = context.WithTimeout(ctx, 5*time.Second)
        defer cancel()


	// run task list
	var res []string
	err = chromedp.Run(ctx,
		//chromedp.Navigate(`https://www.google.com/`),

                chromedp.Navigate(`http://product.dangdang.com/23273491.html`),
                // wait for footer element is visible (ie, page is loaded)
                chromedp.WaitVisible(`#footer`),


//		chromedp.Navigate(`file:///home/wzw/project/go/src/html/14spider/1chromedp/Google.html`),
//		chromedp.WaitVisible(`#footer`, chromedp.ByID),




		chromedp.Evaluate(`Object.keys(window);`, &res),
	)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("window object keys: %v", res)
}
