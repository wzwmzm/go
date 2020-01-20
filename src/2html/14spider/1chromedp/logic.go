// Command logic is a chromedp example demonstrating more complex logic beyond
// simple actions.
package main

import (
	"context"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/chromedp"
)

func main() {
	// create context
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	// list awesome go projects for the "Selenium and browser control tools."
	res, err := listAwesomeGoProjects(ctx, "Selenium and browser control tools.")
	if err != nil {
		log.Fatalf("could not list awesome go projects: %v", err)
	}

	// output the values
	for k, v := range res {
		log.Printf("project %s (%s): '%s'", k, v.URL, v.Description)
	}
}

// projectDesc contains a url, description for a project.
type projectDesc struct {
	URL, Description string
}

// listAwesomeGoProjects is the highest level logic for browsing to the
// awesome-go page, finding the specified section sect, and retrieving the
// associated projects from the page.

//程序正常输出:
/*
正在打开网页...
网页打开完毕.....
2019/05/20 21:03:05 project chromedp (https://github.com/knq/chromedp): 'a way to drive/test Chrome, Safari, Edge, Android Webviews, and other browsers supporting the Chrome Debugging Protocol.'
2019/05/20 21:03:05 project ggr (https://github.com/aerokube/ggr): 'a lightweight server that routes and proxies Selenium Wedriver requests to multiple Selenium hubs.'
2019/05/20 21:03:05 project selenoid (https://github.com/aerokube/selenoid): 'alternative Selenium hub server that launches browsers within containers.'
2019/05/20 21:03:05 project cdp (https://github.com/mafredri/cdp): 'Type-safe bindings for the Chrome Debugging Protocol that can be used with browsers or other debug targets that implement it.'
*/



func listAwesomeGoProjects(ctx context.Context, sect string) (map[string]projectDesc, error) {
	// force max timeout of 15 seconds for retrieving and processing the data
	var cancel func()
	ctx, cancel = context.WithTimeout(ctx, 20*time.Second)
	defer cancel()

	sel := fmt.Sprintf(`//p[text()[contains(., '%s')]]`, sect)

	// navigate
	fmt.Println("正在打开网页...")
	if err := chromedp.Run(ctx, chromedp.Navigate(`https://github.com/avelino/awesome-go`)); err != nil {
		fmt.Println("无法打开网页........")
		return nil, fmt.Errorf("could not navigate to github: %v", err)
	}
	fmt.Println("网页打开完毕.....")
	// wait visible
	if err := chromedp.Run(ctx, chromedp.WaitVisible(sel)); err != nil {
		return nil, fmt.Errorf("could not get section: %v", err)
	}

	sib := sel + `/following-sibling::ul/li`

	// get project link text
	var projects []*cdp.Node
	if err := chromedp.Run(ctx, chromedp.Nodes(sib+`/child::a/text()`, &projects)); err != nil {
		return nil, fmt.Errorf("could not get projects: %v", err)
	}

	// get links and description text
	var linksAndDescriptions []*cdp.Node
	if err := chromedp.Run(ctx, chromedp.Nodes(sib+`/child::node()`, &linksAndDescriptions)); err != nil {
		return nil, fmt.Errorf("could not get links and descriptions: %v", err)
	}

	// check length
	if 2*len(projects) != len(linksAndDescriptions) {
		return nil, fmt.Errorf("projects and links and descriptions lengths do not match (2*%d != %d)", len(projects), len(linksAndDescriptions))
	}

	// process data
	res := make(map[string]projectDesc)
	for i := 0; i < len(projects); i++ {
		res[projects[i].NodeValue] = projectDesc{
			URL:         linksAndDescriptions[2*i].AttributeValue("href"),
			Description: strings.TrimPrefix(strings.TrimSpace(linksAndDescriptions[2*i+1].NodeValue), "- "),
		}
	}

	return res, nil
}
