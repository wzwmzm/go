#!/bin/sh
#for i in `seq 1 1`; do dd if=/dev/zero of=/dev/null & done; pid=$!;sleep 1;echo "开核($(date +%H:%M:%S)) pid=$pid";
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
	echo "进入IP地址合法性检测第一段++++++++++++++++++++++++++++++++++++++++++++"
	echo "$IDSTR $(date +%H:%M:%S)  --- IP地址非法" 
        echo "前次地址: $LAST_IP   "
	echo "本次地址: $IP"

	ping -c2 gofans.ga
	echo "gofans.ga     返回码=$?******"
	ping -c2 192.168.2.1
	echo "192.168.2.1   返回码=$?******"
	ping -c2 192.168.2.2
	echo "192.168.2.2   返回码=$?******"
	ping -c2 127.0.0.1
	echo "127.0.0.1     返回码=$?******"


        echo "重启WIFI连接....sudo ip link set wlan0 down...."
        sudo ip link set wlan0 down
        sleep 10
        echo "$IDSTR $(date +%H:%M:%S) --- 重启WIFI后IP=$(curl -s ip.xdty.org) "
        echo ""
	echo ""
        return 1
fi

if [ "$IP" = "$LAST_IP" ];then
    echo "$IDSTR $(date +%H:%M:%S) ---$RETRY--- Already updated.($IP)"
    exit 0
fi

