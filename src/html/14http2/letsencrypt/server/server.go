package main

import (
	"crypto/tls"
	"log"
	"net/http"

	"golang.org/x/crypto/acme/autocert"
)

//		报错:
//		“listen tcp :443: bind: permission denied”
//		处理:
//		//在linux中,缺省状态下应用程序不能监听小号端口,必须先给应用程序提权后才行
//		sudo setcap CAP_NET_BIND_SERVICE=+eip /home/wzw/project/go/src/html/14http2/letsencrypt/server/server
func main() {
	certManager := autocert.Manager{
		Prompt:     autocert.AcceptTOS,
		HostPolicy: autocert.HostWhitelist("gofans.ga"), //("example.com"),
		Cache:      autocert.DirCache("certs"),
	}
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello world 吴志伟"))
	})

	server := &http.Server{
		Addr: ":443",
		TLSConfig: &tls.Config{
			GetCertificate: certManager.GetCertificate,
		},
	}
	go http.ListenAndServe(":80", certManager.HTTPHandler(nil))
	log.Fatal(server.ListenAndServeTLS("", "")) //Key and cert are coming from Let's Encrypt

}
