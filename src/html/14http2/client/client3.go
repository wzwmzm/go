package main

import (
	"fmt"
	"net/http"
)

const url = "http://localhost:8000"

func main() {
	_, err := http.Get(url)
	fmt.Println(err)
}
