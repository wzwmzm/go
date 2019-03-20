sudo hostname -b a808t;

#sudo setcap CAP_NET_BIND_SERVICE=+eip "/home/wzw/project/go/src/html/9fileserver(net.http)/fileserver.arm"
"/home/wzw/project/go/src/html/9fileserver(net.http)/"fileserver.arm &


#sudo setcap CAP_NET_BIND_SERVICE=+eip /home/wzw/project/go/src/laboratory/laboratory.arm;
#/home/wzw/project/go/src/laboratory/laboratory.arm &


#ksm是内存中相同页面的一种合并机制,  此处设置为关闭
#sudo sh -c "echo 0 >/sys/kernel/mm/ksm/run"



#科学上网
sudo /usr/bin/sslocal -c /etc/shadowsocks/config.json -d start



#尝试解决随机断网问题
/bin/ping -i 15 192.168.2.1 &


#关闭交换内存
sudo /sbin/swapoff -a



