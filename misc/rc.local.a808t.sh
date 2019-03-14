sudo hostname -b a808t;

#sudo setcap CAP_NET_BIND_SERVICE=+eip "/home/wzw/project/go/src/html/9fileserver(net.http)/fileserver.arm"
"/home/wzw/project/go/src/html/9fileserver(net.http)/"fileserver.arm &


#sudo setcap CAP_NET_BIND_SERVICE=+eip /home/wzw/project/go/src/laboratory/laboratory.arm;
#/home/wzw/project/go/src/laboratory/laboratory.arm &


#ksm是内存中相同页面的一种合并机制,  此处设置为关闭
#sudo sh -c "echo 0 >/sys/kernel/mm/ksm/run"



#科学上网
sudo /usr/bin/sslocal -c /etc/shadowsocks/config.json -d start
