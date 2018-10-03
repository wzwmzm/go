Go http2 和 h2c: https://colobu.com/2018/09/06/Go-http2-%E5%92%8C-h2c/#more


报错:
“listen tcp :443: bind: permission denied”
处理:
//在linux中,缺省状态下应用程序不能监听小号端口,必须先给应用程序提权后才行
sudo setcap CAP_NET_BIND_SERVICE=+eip /path/to/caddy


证书:
$ openssl genrsa -out rootCA.key 2048
$ openssl req -x509 -new -nodes -key rootCA.key -days 1024 -out rootCA.pem
//然后把rootCA.pem加到你的浏览器的证书中


$ openssl genrsa -out server.key 2048
$ openssl req -new -key server.key -out server.csr
$ openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 500
