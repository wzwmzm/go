package main

import (
	"crypto/tls"
	"log"
	"net/http"

	"golang.org/x/crypto/acme/autocert"
)

//sudo setcap CAP_NET_BIND_SERVICE=+eip ./letsencrypt2
func main() {
	certManager := autocert.Manager{
		Prompt:     autocert.AcceptTOS,
		HostPolicy: autocert.HostWhitelist("gofans.ga www.gofans.ga"),
		Cache:      autocert.DirCache("certs"),
	}
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello world"))
	})
	server := &http.Server{
		Addr: ":443",
		TLSConfig: &tls.Config{
			GetCertificate: certManager.GetCertificate,
		},
	}
	go http.ListenAndServe(":80", certManager.HTTPHandler(nil))
	log.Fatal(server.ListenAndServeTLS("gofans.ga.cer", "gafans.ga.key")) //Key and cert are coming from Let's Encrypt
}
