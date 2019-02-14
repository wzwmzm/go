sudo hostname -b a808t;

"/home/wzw/project/go/src/html/9fileserver(net.http)/"fileserver-arm &

cd "/home/wzw/project/go/src/laboratory/"
./arm-laboratory &


#ksm是内存中相同页面的一种合并机制,  此处设置为关闭
sudo sh -c "echo 0 >/sys/kernel/mm/ksm/run"
