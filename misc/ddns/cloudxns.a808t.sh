#!/bin/sh
#for i in `seq 1 1`; do dd if=/dev/zero of=/dev/null & done; pid=$!;sleep 1;echo "开核($(date +%H:%M:%S)) pid=$pid";
/usr/sbin/arp -s 192.168.2.3  00:08:22:31:20:76
/usr/sbin/arp -s 192.168.2.1  cc:81:da:4e:2e:a1
#/usr/sbin/arp -n
echo -n "arp -n   返回码=$?******"


IDSTR="(ID=$(date +%H:%M:%S))"

CONFIG=$1

if [ ! -f "$CONFIG" ];then
    echo "ERROR, CONFIG NOT EXIST."
    exit 1
fi 

. "$CONFIG"

if [ -f "$LAST_IP_FILE" ];then
    . "$LAST_IP_FILE"
fi

IP=""
RETRY="0"
while [ $RETRY -lt 3 ]; do
    IP=$(curl -s ip.xdty.org)
    echo -n "$(date +%H:%M:%S)[$RETRY]---"
    RETRY=$((RETRY+1))
    echo "$IP"|grep "^[0-9]\{1,3\}\.\([0-9]\{1,3\}\.\)\{2\}[0-9]\{1,3\}$" > /dev/null;
    if [ $? -ne 0 ]
    then
	sleep 15
    else
        break
    fi
done

#IP地址合法性检测
echo "$IP"|grep "^[0-9]\{1,3\}\.\([0-9]\{1,3\}\.\)\{2\}[0-9]\{1,3\}$" > /dev/null;
if [ $? -ne 0 ]
then
	echo "" 
	echo "进入IP地址合法性检测第一段++++++++++++++++++++++++++++++++++++++++++++"
        echo "前次地址: $LAST_IP   "
        echo "本次地址: $IP"
	/usr/sbin/arp -n

        ping -c2  $DOMAIN  > /dev/null
        echo "$DOMAIN           返回码=$?******"
        ping -c2 192.168.2.1 > /dev/null
        echo "192.168.2.1       返回码=$?******"
        ping -c2 192.168.2.2 > /dev/null
        echo "192.168.2.2       返回码=$?******"
        ping -c2 192.168.2.3 > /dev/null
        echo "192.168.2.3       返回码=$?******"
        ping -c2  $DOMAIN  > /dev/null
        echo "$DOMAIN           返回码=$?******"
        ping -c2 192.168.2.1 > /dev/null
        echo "192.168.2.1       返回码=$?******"
        ping -c2 192.168.2.2 > /dev/null
        echo "192.168.2.2       返回码=$?******"
        ping -c2 192.168.2.3 > /dev/null
        echo "192.168.2.3       返回码=$?******"

        sudo ip link set wlan0 down
        sleep 10

        echo "$IDSTR $(date +%H:%M:%S) --- 重启WIFI后IP=$(curl -s ip.xdty.org) "
        echo ""
	echo ""
        return 1
fi


if [ "$IP" = "$LAST_IP" ];then
	echo "$IDSTR $(date +%H:%M:%S) ---$RETRY--- Already updated.($IP) ip neigh show|wc -l = `ip neigh show|wc -l` "

    exit 0
fi

echo "当前IP($IP)   上次IP($LAST_IP)   $(date) -- 需要更新域名IP."

#更新DNS
dnsupdate(){
	echo "$(date) -- Update success"
	echo "LAST_IP=\"$IP\"" > "$LAST_IP_FILE"
	echo ""
}

#执行上面修改过的更新程序
dnsupdate

