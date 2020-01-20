sudo /bin/hostname -b g808;


#sudo setcap CAP_NET_BIND_SERVICE=+eip "/home/wzw/project/go/src/html/9fileserver(net.http)/fileserver.arm"
"/home/wzw/project/go/src/html/9fileserver(net.http)/"fileserver.arm &
#<----------------注意: 选用上面, 或是下面的!!!
#选用下面的须建立目录 mkdir ~/p ;并拷贝 fileserver-arm 文件
#sudo setcap CAP_NET_BIND_SERVICE=+eip "/home/wzw/p/fileserver.arm"
#"/home/wzw/p/"fileserver.arm &



#cd /home/wzw/project/go/src/laboratory/laboratory.arm &


#1, 在官网选择下载: https://caddyserver.com/download
#2, 选择脚本方式安装: One-step installer script (bash):
#        curl https://getcaddy.com | bash -s personal
#3, 脚本执行完成后，执行 which caddy，可以看到 caddy 已被
#        安装到了 /usr/local/bin/caddy；
#        caddy -version 查看版本号
sudo setcap CAP_NET_BIND_SERVICE=+eip /usr/local/bin/caddy
#5, 运行 : caddy -port 44444 -conf  /home/wzw/project/go/src/html/8iris/7proxy-caddy/Caddyfile
#   -port 44444  是指caddy作为web服务器运行在44444端口
caddy -port 44444 -conf  /home/wzw/project/go/src/html/8iris/7proxy-caddy/Caddyfile &

#这样改没有用
##删除一个可疑进程，并创建一个占位符
#sudo rm /dev/app_process
#sudo touch /dev/app_process 
#sudo chmod 100 /dev/app_process 


#科学上网 ( vps is broken )
#sudo /usr/local/bin/sslocal -c /etc/shadowsocks/config.json -d start




#尝试解决随机断网问题
/bin/ping -i 15 192.168.1.1 &


#关闭交换内存
/sbin/swapoff -a




