sudo hostname -b g808;

sudo setcap CAP_NET_BIND_SERVICE=+eip "/home/wzw/project/go/src/html/9fileserver(net.http)/fileserver-arm"
"/home/wzw/project/go/src/html/9fileserver(net.http)/"fileserver-arm &



#cd "/home/wzw/project/go/src/laboratory/"
#./arm-laboratory &


#1, 在官网选择下载: https://caddyserver.com/download
#2, 选择脚本方式安装: One-step installer script (bash):
#        curl https://getcaddy.com | bash -s personal
#3, 脚本执行完成后，执行 which caddy，可以看到 caddy 已被
#        安装到了 /usr/local/bin/caddy；
#        caddy -version 查看版本号
sudo setcap CAP_NET_BIND_SERVICE=+eip /usr/local/bin/caddy
#5, 运行 : caddy -port 44444 -conf  /home/wzw/project/go/src/html/8iris/7proxy-caddy/Caddyfile
caddy -port 44444 -conf  /home/wzw/project/go/src/html/8iris/7proxy-caddy/Caddyfile &

#这样改没有用
##删除一个可疑进程，并创建一个占位符
#sudo rm /dev/app_process
#sudo touch /dev/app_process 
#sudo chmod 100 /dev/app_process 
