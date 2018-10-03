package main

import (
	"fmt"
	"net/http"
)

const url = "https://localhost:8000"

func main() {
	_, err := http.Get(url)
	fmt.Println(err)
}
