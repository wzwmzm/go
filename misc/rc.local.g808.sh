sudo hostname -b g808;
"/home/wzw/project/go/src/html/9fileserver(net.http)/"fileserver-arm &
#cd "/home/wzw/project/go/src/laboratory/"
#./arm-laboratory &

#     sudo setcap CAP_NET_BIND_SERVICE=+eip /usr/local/bin/caddy
caddy -port 44444 -conf  /home/wzw/project/go/src/html/8iris/7proxy-caddy/Caddyfile &
